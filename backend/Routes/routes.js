const express = require("express");
const {register, login, get_user, transactions, incomes, expenses, add_transaction, delete_transaction} = require("../controller/routesController");
const authorize = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register)
    .post("/login", login)
    .get("/user", authorize, get_user)
    .get("/transactions", authorize, transactions)
    .get("/incomes", authorize, incomes)
    .get("/expenses", authorize, expenses)
    .post("/add-transaction", authorize, add_transaction)
    .delete("/delete-transaction/:id", authorize, delete_transaction);
module.exports = router;
