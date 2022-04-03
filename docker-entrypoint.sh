#!/bin/sh

set -e

USER=${MONGO_INITDB_ROOT_USERNAME}
PASSWORD=${MONGO_INITDB_ROOT_PASSWORD}
DATABASE=${MONGO_INITDB_DATABASE}
COLLECTION=${MONGO_INITDB_COLLECTION}

if [ ! -f /data/db/storage.bson ]; then
  mongod --fork --nojournal --logpath /var/log/mongodb/setup.log
  mongo "$DATABASE" --eval "db.createUser({
      user: '$USER',
      pwd:  '$PASSWORD',
      roles: ['dbAdmin']
    });
    db.auth('$USER', '$PASSWORD');
    db.grantRolesToUser('$USER',['readWrite']);
    db.createCollection('$COLLECTION');
  "
  mongod --shutdown
  echo
  echo "Entrypoint added user '$USER' with password on database '$DATABASE'"
fi

exec "$@"
