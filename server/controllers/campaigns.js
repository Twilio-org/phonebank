import campaignsService from '../db/services/campaigns';
import callsService from '../db/services/calls';
import contactListsService from '../db/services/contact_lists';
import { validCampaignStatusUpdate, allowDraftCampaignUpdates, listUpdatedParamsMessage } from './controller_helpers/campaigns';

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

export function updateCampaignById(req, res) {
  const campaign_id = parseInt(req.params.id, 10);
  const { status: newStatus } = req.body;
  return campaignsService.getCampaignById({ id: campaign_id })
    .then((campaignObj) => {
      let updateBodyParams = null;
      const { status: previousStatus, id } = campaignObj.attributes;
      if (newStatus) {
        try {
          validCampaignStatusUpdate(previousStatus, newStatus);
        } catch (e) {
          return res.status(400).json({ message: `Invalid status transition, campaign status not updated: ${e}` });
        }
      }
      try {
        updateBodyParams = allowDraftCampaignUpdates(previousStatus, req.body);
      } catch (e) {
        return res.status(400).json({ message: `Campaign not updated: ${e}` });
      }
      const updateParams = { status: newStatus, ...updateBodyParams };
      const { keys: updateParamsNames,
              values: updateParamValues } = listUpdatedParamsMessage(updateParams);
      return campaignsService.updateCampaignById({ id, status: newStatus, ...updateParams })
        .then((updatedCampaignObj) => {
          if (updatedCampaignObj) {
            res.status(200).json({ message: `Campaign: ${updateParamsNames} updated successfully to: ${updateParamValues}` });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: `Campaign status not updated successfully, problem with updateCampaignById service: ${err}` });
        });
    })
    .catch(err => res.status(404).json({ message: `Campaign status not updated successfully, campaign could not be found by id: ${err}` }));
}
