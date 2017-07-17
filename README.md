# phonebank
A phone banking solution powered by Twilio

# dev prerequisites
- node v6.11.1
- npm v3.10.10
- docker v17.06.0
- postgres v9.6.3

# `make` commands
- `make install` - install local dependencies via npm
- `make lint` - eslint the repository
- `make build` - build a Docker image
- `make run` - Run the latest Docker image

# local development
## postgres setup

```
brew install postgresql
# verify postgres v9.6.3

export PG_USER="phonebank"
export PG_PASSWORD="foobar"
export PGDATA="/usr/local/var/postgres/"
export PG_CONNECTION_STRING="postgres://$PG_USER:$PG_PASSWORD@localhost:5432/$PG_USER"

rm -rf $PGDATA && initdb -E utf8 -U $PG_USER -W
# enter password
pg_ctl -D /usr/local/var/postgres/ -l logfile start
createdb $PG_USER -U $PG_USER
psql -U $PG_USER -d $PG_USER

# initialize DB
node db/init.js
```