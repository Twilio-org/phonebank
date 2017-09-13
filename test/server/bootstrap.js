import { setup, teardown, truncateAllTables } from '../../server/db/db';
import { initializeTwilioClient } from '../../server/util/twilio';
import { testTwilioClient } from './util/twilio_mocks';

before(() => teardown().then(setup).then(initializeTwilioClient(testTwilioClient)));
after(teardown);
export default function cleanUp(done) {
  truncateAllTables()
    .then(() => {
      done();
    });
}
