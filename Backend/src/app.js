const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");



const app = express();
app.use(express.json());
app.use(cookieParser());

// Dynamic CORS origin for production
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://face-expression-project-1.onrender.com"
];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));



// Router
const authRouter = require("./routes/auth.router");
const songRouter = require("./routes/song.router");
app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);


app.use(express.static("./public"));
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "./public/index.html"));

});





module.exports = app