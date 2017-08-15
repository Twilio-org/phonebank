import { bookshelf, teardown } from './db';

teardown().then(() => bookshelf.knex.destroy());
