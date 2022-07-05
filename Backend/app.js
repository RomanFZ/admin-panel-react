const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config()

const usersRoutes = require("./src/modules/routes/usersRoutes");
const receptionRoutes = require("./src/modules/routes/receptionsRoutes");

app.use(cors());

app.use(bodyParser.json());
app.use("/", usersRoutes);
app.use("/", receptionRoutes);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});