const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",router);
app.listen(PORT, ()=> {
    console.log(`listening to port ${PORT}`);
});
