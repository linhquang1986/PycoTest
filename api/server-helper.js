const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const routes = require('./routes');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// mount api routes
app.use('/api', routes);
const HTTP_PORT = process.env.PORT || 8000
const server =  app.listen(HTTP_PORT, () => {
    //don't show the log when it is test
    if(process.env.NODE_ENV !== 'test') {
        console.log('Worker', process.env.id, "listening on port %PORT%".replace("%PORT%", HTTP_PORT));
    }
});

module.exports = server;