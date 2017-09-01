import db from '../db';
import Call from './calls';
import Question from './questions';

export default db.Model.extend({
  tableName: 'responses',
  hasTimeStamps: true,
  calls() {
    return this.belongsTo(Call);
  },
  questions() {
    return this.belongsTo(Question);
  }
});
