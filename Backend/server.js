require('dotenv').config();

const app = require("./src/app");
const connectToDB = require('./src/config/db');

connectToDB();

const PORT = process.env.PORT || 5000;

app.listen(5000,() => {
    console.log(`Server start on port ${PORT}`);
})