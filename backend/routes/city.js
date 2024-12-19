// impot express
const express = require('express');

// import router module
const router = express.Router();

const cityCtrl = require('../controllers/city');

router.get('/', cityCtrl.getAllCity);
router.post('/', cityCtrl.createCity);
router.get('/:id', cityCtrl.getOneCity);
router.put('/:id', cityCtrl.updateCity);
router.delete('/:id', cityCtrl.deleteCity);

module.exports = router;
