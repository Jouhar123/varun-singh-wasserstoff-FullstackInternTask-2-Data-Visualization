const express = require('express');
const router = express.Router();
const dashboardController = require('./Dash-controller');

router.post('/Dashboard', dashboardController.createDashboardEntry);
router.get('/Dashboard', dashboardController.getDashboardEntries);
router.get('/filtered/Dashboard', dashboardController.getDashboardEntriesWithFilters);
router.get('/unique/:key', dashboardController.getKeyval);
module.exports = router;
