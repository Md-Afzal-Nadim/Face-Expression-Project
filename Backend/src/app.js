const express= require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ["http://localhost:5173", "https://face-expression-project-1.onrender.com"],
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