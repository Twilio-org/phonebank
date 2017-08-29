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
              contacts.map(contact => contact.id)
                .forEach((contactId) => {
                  callsService.populateCalls({ campaign_id: id, contact_id: contactId });
                });
              res.status(201).json({ message: 'Active Campaign successfully created' });
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

