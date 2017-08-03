import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import campaignsService from '../db/services/campaigns';
import { development as devconfig } from '../../knexfile';
import Campaign from '../db/models/campaigns';
// import bookshelfCreateTable from '../db/init';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
const campaignModel = Campaign(bookshelf);

export function saveNewCampaign(req, res, next) {
  const { name, title, description, status, script_id } = req.body;

  return campaignsService.saveNewCampaign({ name, title, description, status, script_id }, campaignModel)
    .then((campaign) => {
        res.status(201).json({ message: 'Campaign successfully created' });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ message: 'Campaign creation unsuccessful' });
    });
}
