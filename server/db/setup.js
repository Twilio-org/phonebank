import { bookshelf, setup } from './db';

setup().then(() => bookshelf.knex.destroy());
