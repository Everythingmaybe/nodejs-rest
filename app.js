const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const usersRouter = require('./routes/api-routes');

app.use( bodyParser() );
// Attach the users routes
app.use('/api/users', usersRouter);

// Set default API response
app.get('/', function (req, res) {
    res.send('Hello');
});

app.listen(3000, function(){
    console.log("Server is awaiting connection");
});