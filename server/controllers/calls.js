import callsService from '../db/services/calls';
import usersService from '../db/services/users';

export function assignCall(req, res) {
  const user_id = req.params.id;
  const user_campaign_id = req.params.campaign;

  return usersService.getUserCampaigns({ id: user_id })
    .then((campaigns) => {
      const campaignIds = campaigns.models.map(campaign => campaign.id);

      if (campaignIds.includes(user_campaign_id)) {
        return callsService.assignCall({
          campaign_id: user_campaign_id,
          user_id
        }).then((call) => {
          if (call) {
            return res.status(200).json(call);
          }

          return res.status(404).json({ message: 'no calls available' });
        }).catch(err => console.log('Could not assign call:', err));
      }

      return res.status(401).json({ message: 'User has not joined that campaign' });
    })
    .catch(err => console.log('Could not assign call:', err));
}

export function dummy(asdf) {
  return asdf + 1;
}
