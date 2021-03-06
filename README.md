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
- `npm run db:setup` - setup DB schema
- `npm run db:teardown` - teardown DB schema
- `npm run db:seed` - fill all tables with at least a single fake entry for testing purposes
- `npm run db:refresh` - runs `npm run db:teardown`, `npm run db:setup`, `npm run db:seed` in that order.

## environment setup
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
export TWILIO_ACCOUNT_SID="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
export TWILIO_AUTH_TOKEN="your_auth_token"
export TWILIO_CALLER_ID=""+1XXXYYYZZZZ"
export DEV_PATH="http://**********.ngrok.io"
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
npm run db:setup
npm run db:seed
```

Optionally set up Postgres to launch at startup.
```
mkdir -p ~/Library/LaunchAgents
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```

Setup a Twilio account

1. If you haven't already, sign up for an account at [twilio.com](https://www.twilio.com)
2. If you don't have one, you can [purchase a Twilio phone number](https://www.twilio.com/console/phone-numbers/search)
3. If you wish to set your TWILIO_CALLER_ID to a phone number other than a Twilio phone number, you can [add a verified caller id to your account](https://www.twilio.com/console/phone-numbers/verified)
4. If you don't have it already, [download ngrok](https://ngrok.com/)
5. Run ngrok:
`ngrok http 3000`
6. When ngrok starts up, it will assign a unique URL to your tunnel that looks something like `http://0c59c4fd.ngrok.io`.

- Export TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_CALLER_ID, and DEV_PATH in your `.bash_profile` (example below) with the appropriate values from your [account dashboard](https://www.twilio.com/user/account):
  * NOTE: You will need to update the DEV_PATH URL in your `.bash_profile` every time you restart ngrok.
```
export TWILIO_ACCOUNT_SID="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
export TWILIO_AUTH_TOKEN="your_auth_token"
export TWILIO_CALLER_ID=""+1XXXYYYZZZZ"
export DEV_PATH="http://**********.ngrok.io"
```
