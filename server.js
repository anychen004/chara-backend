//get the things we need
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const database = require('./my-database'); //require() obtains the module.export of a file (and here we assign it to a variable).

const app = express();
app.use(express.json());
const port = 3000;

app.use(cors())
app.use(bodyParser.json())
//moved all API stuff to routes/routes.js
app.use(routes)






app.listen(port, () => console.log(`Example app listening on port ${port}!`))
