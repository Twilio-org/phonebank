module.exports = {

  test: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING_TEST,
    migrations: {
      directory: __dirname + '/server/src/db/migrations'
    },
    debug: true,
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
    debug: true,
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