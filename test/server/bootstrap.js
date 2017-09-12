import { setup, teardown, truncateAllTables } from '../../server/db/db';

before(() => teardown().then(setup));
after(teardown);
export default function cleanUp(done) {
  truncateAllTables()
    .then(() => {
      done();
    });
}
