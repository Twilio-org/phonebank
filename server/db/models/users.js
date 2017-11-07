import db from '../db';
import Campaign from './campaigns';
import Call from './calls';

export default db.Model.extend({
  tableName: 'users',
  bcrypt: { field: 'password_hash' },
  hasTimestamps: true,
  subjectCall: null,
  subjectCampaign: null,
  campaigns() {
    return this.belongsToMany(Campaign);
  },
  calls() {
    return this.hasMany(Call);
  },
  hasCall(checkCallId) {
    const userCalls = this.relations.calls.models;
    if (userCalls.length === 0) {
      return false;
    }
    const subjectCall = userCalls.filter(call => call.id === checkCallId)[0];
    if (!subjectCall) {
      return false;
    }
    this.subjectCall = subjectCall;
    return !!subjectCall;
  },
  hasCampaign(checkCampaignId) {
    const userCampaings = this.relations.campaigns.models;
    if (userCampaings.length === 0) {
      return false;
    }
    const subjectCampaign = userCampaings.filter(campaign => campaign.id === checkCampaignId)[0];
    if (!subjectCampaign) {
      return false;
    }
    this.subjectCampaign = subjectCampaign;
    return !!subjectCampaign;
  }
});
