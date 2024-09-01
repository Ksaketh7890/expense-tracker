const db = require("../db/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const maxAge = 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'expense tracker secret', {
        expiresIn: maxAge
    });
}

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const database = await db.connect();
        const usersCollection = database.collection('users');

        const result = await usersCollection.insertOne({ username, password: hashedPassword });
        console.log(result);
        res.status(201).json();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const database = await db.connect();
        const usersCollection = database.collection('users');

        const user = await usersCollection.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = createToken(user._id);
            res.status(200).json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const get_user = async (req, res) => {
    try {
        const database = await db.connect();
        const usersCollection = database.collection('users');

        const user = await usersCollection.findOne({ _id: new ObjectId(req.user.id) }, { projection: { username: 1 } });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).send('User not found');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const transactions = async (req, res) => {
    try {
        const database = await db.connect();
        const transactionsCollection = database.collection('transactions');

        const transactions = await transactionsCollection.find({ user_id: new ObjectId(req.user.id) }).sort({ transaction_date: -1 }).toArray();

        res.status(200).json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const incomes = async (req, res) => {
    try {
        const database = await db.connect();
        const transactionsCollection = database.collection('transactions');

        const incomes = await transactionsCollection.find({ user_id: new ObjectId(req.user.id), transaction_type: 'income' }).toArray();

        res.status(200).json(incomes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const expenses = async (req, res) => {
    try {
        const database = await db.connect();
        const transactionsCollection = database.collection('transactions');

        const expenses = await transactionsCollection.find({ user_id: new ObjectId(req.user.id), transaction_type: 'expense' }).toArray();

        res.status(200).json(expenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const add_transaction = async (req, res) => {
    const { title, amount, transaction_type, date, category } = req.body;
    try {
        const database = await db.connect();
        const transactionsCollection = database.collection('transactions');

        const result = await transactionsCollection.insertOne({
            user_id: new ObjectId(req.user.id),
            title,
            amount,
            transaction_type,
            transaction_date: new Date(date),
            category
        });
        const insertedDocument = await transactionsCollection.findOne({ _id: result.insertedId });

        res.status(201).json(insertedDocument);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const delete_transaction = async (req, res) => {
    try {
        const database = await db.connect();
        const transactionsCollection = database.collection('transactions');

        const result = await transactionsCollection.deleteOne({
            _id: new ObjectId(req.params.id),
            user_id: new ObjectId(req.user.id)
        });

        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(401).send('Transaction not found or not authorized');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
module.exports = {register, login, get_user, transactions, incomes, expenses, add_transaction, delete_transaction};
