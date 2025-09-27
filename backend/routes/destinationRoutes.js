const express = require('express');
const router = express.Router();
const { 
  getDestinations, 
  getDestinationById, 
  createDestination, 
  updateDestination, 
  deleteDestination,
  uploadImage
} = require('../controllers/destinationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getDestinations)
  .post(protect, admin, createDestination);

router.route('/upload')
  .post(protect, admin, uploadImage);

router.route('/:id')
  .get(getDestinationById)
  .put(protect, admin, updateDestination)
  .delete(protect, admin, deleteDestination);

module.exports = router;