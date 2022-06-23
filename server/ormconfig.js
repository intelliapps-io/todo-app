require('dotenv').config();

// From docker-compose
const postgresConfig = {
  "name": "default",
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "postgres",
  "database": "postgres",
  "synchronize": true,
  "logging": false,
  "entities": [
    "src/entity/*.*"
  ]
};

// From docker-compose
const mysqlConfig = {
  "name": "default",
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "user",
  "password": "password",
  "database": "db",
  "insecureAuth": true,
  "synchronize": true,
  "logging": false,
  "entities": [
    "src/entity/*.ts"
  ]
};

module.exports = mysqlConfig;