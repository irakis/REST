const express = require('express');
const router = express.Router();

const WorkshopsController = require('../controllers/workshops.controller');

router.get( '/workshops', WorkshopsController.getAll);

router.get( '/workshops/:workshop', WorkshopsController.getSingle);

router.put( '/workshops/:workshop', WorkshopsController.putSingle);


module.exports = router;