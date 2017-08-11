import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import campaignsService from '../db/services/campaigns';
import { development as devconfig } from '../../knexfile';
import Campaign from '../db/models/campaigns';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
const campaignModel = Campaign(bookshelf);

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
    }, campaignModel)
    .then((campaign) => {
      if (campaign) {
        res.status(201).json({ message: 'Campaign successfully created' });
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
  return campaignsService.getAllCampaigns(null, campaignModel)
    .then((campaigns) => {
      res.status(200).send(campaigns);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Cannot retrieve campaigns',
        error: err
      });
    });
}

