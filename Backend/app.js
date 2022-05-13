const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
require('dotenv').config()

const usersRoutes = require("./src/modules/routes/usersRoutes");
const receptionRoutes = require("./src/modules/routes/receptionsRoutes");
const verifyRefreshTokenRoutes = require("./src/modules/routes/verifyRefreshTokenRoutes")


const uri = process.env.URL_MONGO;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());

app.use(bodyParser.json());
app.use("/", usersRoutes);
app.use("/", receptionRoutes);
app.use("/", verifyRefreshTokenRoutes)


app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});