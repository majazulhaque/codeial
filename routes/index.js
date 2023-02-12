const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

// console.log('router loader');

router.get('/', homeController.home);
// router.get('/', homeController.showImage);
router.use('/users',require('./users'));
router.use('/post',require('./post'));




module.exports = router;