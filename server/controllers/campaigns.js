import campaignsService from '../db/services/campaigns';
import callsService from '../db/services/calls';
import contactListsService from '../db/services/contact_lists';

export function saveNewCampaign(req, res) {
  const { name, title, description, status, script_id, contact_lists_id } = req.body;
  return campaignsService.saveNewCampaign(
    {
      name,
      title,
      description,
      status,
      script_id,
      contact_lists_id
    })
    .then((campaign) => {
      if (campaign) {
        if (campaign.attributes.status === 'active') {
          const id = campaign.attributes.id;
          contactListsService.getContactsInContactListById({ id: contact_lists_id })
            .then((contacts) => {
              contacts.map(contact => ({
                contact_id: contact.id,
                do_not_call: JSON.parse(contact.attributes.do_not_call),
                is_invalid_number: JSON.parse(contact.attributes.is_invalid_number)
              }))
                .forEach((mappedContact) => {
                  const { do_not_call, is_invalid_number } = mappedContact;
                  if (!do_not_call && !is_invalid_number) {
                    callsService.populateCall({
                      campaign_id: id,
                      contact_id: mappedContact.contact_id
                    })
                      .catch((err) => {
                        res.status(500).json({ message: 'Unable to add call entry for this campaign ID or contact ID', error: err });
                      });
                  }
                });
              res.status(201).json({ message: 'Active Campaign successfully created' });
            })
            .catch((err) => {
              res.status(500).json({ message: 'Invalid Contact lists ID', error: err });
            });
        } else {
          res.status(201).json({ message: 'Draft Campaign successfully created' });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Campaign creation unsuccessful',
        error: err
      });
    });
}

export function getAllCampaigns(req, res) {
  const reqStatus = req.query.status;
  const statuses = ['active', 'completed', 'draft', 'pause'];
  const status = statuses.includes(reqStatus) ? reqStatus : 'all';
  return campaignsService.getAllCampaigns(status)
    .then((campaigns) => {
      res.status(200).send(campaigns);
    })
    .catch((err) => {
      res.status(500).json({
        message: `Cannot retrieve campaigns with status: ${status}`,
        error: err
      });
    });
}

