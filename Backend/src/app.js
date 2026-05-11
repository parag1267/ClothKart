const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const indexRoute = require('./routes/indexRoute');
const app = express();

app.set("trust proxy", 1);

app.use(cors({
    origin: ["https://clothing-e-commerce-web-application-kappa.vercel.app","http://localhost:5173"],
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(passport.initialize());

app.use('/api',indexRoute);

module.exports = app;