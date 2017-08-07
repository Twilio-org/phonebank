# phonebank
A phone banking solution powered by Twilio

# local development (Mac)

## dev prerequisites
- node v6.11.1
- npm v3.10.10
- postgres v9.6.3

## npm commands
- `npm install` - install deps
- `npm run lint` - lint code 
- `npm test` - lint + run tests
- `npm start` - start webserver

## postgres setup
Add the following to your ~/.bash_profile, ~/.bashrc or other environment variable store.
``` 
export PGDATA="/usr/local/var/postgres/"
export PG_USER="phonebank"
export PG_PASSWORD="foobar"
export PG_DB="phonebank"
export PG_DB_TEST="${PG_DB}_test"
export PG_PORT="5432"
export PG_CONNECTION_STRING="postgres://$PG_USER:$PG_PASSWORD@localhost:$PG_PORT/$PG_DB"
export PG_CONNECTION_STRING_TEST="${PG_CONNECTION_STRING}_test"
export secretOrKey="a secret key should be entered here"
```

Set up the database.
```
# *WARNING: this will wipe your $PGDATA directory*
rm -rf $PGDATA && initdb -E utf8 -U $PG_USER -W
# enter PG_PASSWORD
# if Postgres is not already running
pg_ctl start -D $PGDATA
createdb $PG_DB -U $PG_USER
createdb $PG_DB_TEST -U $PG_USER
```

Optionally set up Postgres to launch at startup.
```
mkdir -p ~/Library/LaunchAgents
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```
