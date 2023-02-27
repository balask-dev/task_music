const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./auth");
const dotenv = require("dotenv");
let cors=require("cors");
 
dotenv.config();
app.use(express.json());
app.use(cors())
 
mongoose.connect(process.env.URL, {useNewUrlParser: true,useUnifiedTopology: true},
  ()=> console.log("Connected"))

app.use("/api/auth", authRoute);
 
 app.listen(process.env.PORT || 4000, () => {
  console.log("Connected");
});
