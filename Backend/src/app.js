const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const indexRoute = require('./routes/indexRoute');

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}))

// ✅ Allowed Origins List
// const allowedOrigins = [
//     process.env.FRONTEND_URL,
//     "http://localhost:5173",
// ];


// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin) return callback(null, true);

//         if (allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             console.error("❌ CORS Blocked:", origin);
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
// }));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(passport.initialize());

app.use('/api',indexRoute);
app.use((err, req, res, next) => {
    console.error("🔥 Error:", err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;