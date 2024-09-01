const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'expense_tracker';
const client = new MongoClient(url);

async function connect() {
    await client.connect();
    // console.log('Connected to MongoDB');
    return client.db(dbName);
}

module.exports = { connect, client };