import { setup, teardown } from '../../server/db/db';

before(() => teardown().then(setup));
after(teardown);
