const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const indexRoute = require('./routes/indexRoute');
const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL,"http://localhost:5173"],
    credentials: true
}))

// ✅ Allowed Origins List
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "https://clothing-e-commerce-web-application-kappa.vercel.app",
    "https://clothing-e-commerce-web-application-67o9to679.vercel.app",
    "http://localhost:5173",
];

app.use(cors({
    origin: function (origin, callback) {
        // Postman ya server-to-server request allow karo
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error("❌ CORS Blocked:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));

app.options('*', cors());


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(passport.initialize());

app.use('/api',indexRoute);

module.exports = app;