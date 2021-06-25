const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PostRoute = require("./Routes/PostRoute");
const UserRoute = require("./Routes/UserRoute");
const Auth = require("./Routes/Auth");
require("dotenv").config();

const uri =process.env.URI;

  
//Middleware
app.use(cors({origin:"http://localhost"}))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/posts", PostRoute);
app.use("/api/user", UserRoute);
app.use("/api/auth", Auth);

//Once db connects start server


mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  );
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
    app.get("/", (req, res) => {
      res.send("<h1>Welcome to your server</h1>");
    });
  
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`server listening on port ${process.env.SERVER_PORT}`);
    });
})