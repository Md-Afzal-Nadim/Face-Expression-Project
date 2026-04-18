const express= require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173",
}));



// Router
const authRouter = require("./routes/auth.router");
const songRouter = require("./routes/song.router");
app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);







module.exports = app