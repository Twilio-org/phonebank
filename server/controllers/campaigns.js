import campaignsService from '../db/services/campaigns';

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
  console.log('req.body for getAllCampaigns is: ', req.body);
  const { params } = req.body;
  return campaignsService.getAllCampaigns(campaign_status)
    .then((campaigns) => {
      res.status(200).send(campaigns);
    })
    .catch((err) => {
      res.status(500).json({
        message: `Cannot retrieve campaigns with status: ${campaign_status}`,
        error: err
      });
    });
}

