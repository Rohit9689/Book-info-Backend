const express = require("express");
const dotEnv = require("dotenv");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const BookRoute = require('./Routes/routes')
PORT = process.env.PORT || 3003;
dotEnv.config();

app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGO_URL )
  .then(() => {
    console.log("Connected to DataBase");
  })
  .catch((err) => {
    console.log(err);
  });
app.use('/books',BookRoute)
app.listen(PORT, () => {
  console.log(`server is running at ${PORT} `);
});
