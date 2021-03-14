// Dotenv import to access to .env variable
require('dotenv').config();

// MongoDB import package
const MongoClient = require('mongodb').MongoClient;

// DB host
const url = process.env.MONGODB_HOST;

// DB name
const dbName = process.env.MONGODB_DBNAME;

// Database connection
const clientPromise = MongoClient.connect(url, { useUnifiedTopology: true });

module.exports = clientPromise.then(client => client.db(dbName));