const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const config = require('./config');

const app = express();
const port = 8080;
const mongoose = require('mongoose');

mongoose.connect(config.database_cloud, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(function () {
    console.log('mongoDB connected');
})
.catch(function () {
    console.log('Error :');
})

// allow body parsing for json
app.use(bodyParser.json());

// allow cross-origin requests
app.use(cors());

// use express built-in middleware function to serve static files
// this will server all the content of the client folder by using absolute path
app.use(express.static(path.join(__dirname, '..', '/client')));

// require in the routes created via express router
const people_routes = require('./api/search.js');
const history_routes = require('./api/history.js');

// first argument is a string to prefix to the URL
// second argument are the routes for our express server to use and apply this prefix to
app.use('/api', people_routes);
app.use('/api', history_routes);

// start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
