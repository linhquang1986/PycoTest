const express = require('express');
// import all the routes here
const exRoutes = require('./ex.route');

const router = express.Router();

router.use('/pyco', exRoutes);

module.exports = router;