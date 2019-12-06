const express = require('express');

const ex1Ctrl = require('../controllers/ex1.ctrl');
const ex4Ctrl = require('../controllers/ex4.ctrl');

const router = express.Router();

// Todo: protected route
// rotation matrix
router.get("/rotation/:K", ex1Ctrl.rotatioMatrix);
// Get status of rooms
router.post("/getStatusRoom", ex4Ctrl.getStatusRoom);

module.exports = router;