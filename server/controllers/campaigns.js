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


function validCampaignStatusUpdate(prevStatus, currStatus) {
  const validCampaignStatusTransitions = {
    draft: 'active',
    active: ['pause', 'completed'],
    pause: ['active', 'completed'],
    completed: 1
  };
  const validStatusOptions = Object.keys(validCampaignStatusTransitions);
  let validTransitionForStatus;
  if (prevStatus === 'completed') {
    throw new Error('Campaigns with status set to "completed" may not be changed.');
  }
  if (!validCampaignStatusTransitions[currStatus]) {
    throw new Error(`Status update to: ${currStatus} is invalid, valid status options: ${validStatusOptions.join(', ')}.`);
  }
  if (prevStatus === 'active' || prevStatus === 'pause') {
    validTransitionForStatus = validCampaignStatusTransitions[prevStatus].join(', ');
    if (!validCampaignStatusTransitions[prevStatus].includes(currStatus)) {
      throw new Error(`Invalid campaign status transition. Status ${prevStatus} can only transition to ${validTransitionForStatus} `);
    }
  } else if (validCampaignStatusTransitions[prevStatus] !== currStatus) {
    validTransitionForStatus = validCampaignStatusTransitions[prevStatus];
    throw new Error(`Invalid campaign status transition. Status ${prevStatus} can only transition to ${validTransitionForStatus} `);
  }
  return true;
}

export function updateCampaignById(req, res) {
  const campaign_id = parseInt(req.params.id, 10);
  const { status: newStatus, name, title, description, contact_lists_id, script_id } = req.body;
  return campaignsService.getCampaignById({ id: campaign_id })
    .then((campaignObj) => {
      const { status: previousStatus, id } = campaignObj.attributes;
      try {
        validCampaignStatusUpdate(previousStatus, newStatus);
      } catch (error) {
        return res.status(400).json({ message: `Invalid status transition, campaign status not updated: ${error}` });
      }
      return campaignsService.updateCampaignById(
        { id, status: newStatus, name, title, description, contact_lists_id, script_id }
        )
        .then((updatedCampaignObj) => {
          if (updatedCampaignObj) {
            const { status: updatedStatus } = updatedCampaignObj.attributes;
            res.status(200).json({ message: `Campaign status updated successfully to: ${updatedStatus}` });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: `Campaign status not updated successfully, problem with updateCampaignById service: ${err}` });
        });
    })
    .catch(err => res.status(500).json({ message: `Campaign status not updated successfully, campaign could not be found by id: ${err}` }));
}
