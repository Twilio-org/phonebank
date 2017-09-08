import mockery from 'mockery';
import { setup, teardown, truncateAllTables } from '../../server/db/db';
import twilioMock from './util/mock_twilio';

before((done) => {
  teardown().then(setup);
  mockery.registerMock('twilio', twilioMock);
  console.log('twilioMock in bootstrap is: ', twilioMock);
  mockery.enable({ useCleanCache: true });
  done();
});
after((done) => {
  mockery.disable();
  teardown();
  done();
});
export default function cleanUp(done) {
  truncateAllTables()
    .then(() => {
      done();
    });
}
