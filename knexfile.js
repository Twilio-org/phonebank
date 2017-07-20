module.exports = {

  test: {
    client: 'pg',
    connection: `postgres://${process.env.PG_USER}@localhost/phonebank_test`,
    migrations: {
      directory: __dirname + '/server/src/db/migrations'
    },
    seeds: {
      directory: __dirname + '/server/src/db/seeds/test'
    }
  },

  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: __dirname + '/server/src/db/migrations'
    },
    seeds: {
      directory: __dirname + '/server/src/db/seeds/development'
    }
  }
  // Will be added once there is a production DB
  // production: {
  //   client: 'pg',
  //   connection: process.env.DATABASE_URL,
  //   migrations: {
  //     directory: __dirname + '/db/migrations'
  //   },
  //   seeds: {
  //     directory: __dirname + '/db/seeds/production'
  //   }
  // }
};