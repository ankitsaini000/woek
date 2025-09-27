const express = require('express');
const router = express.Router();
const {
  createDestinationBooking,
  getDestinationBookings,
  getDestinationBookingById,
  getDestinationBookingByReference,
  updateDestinationBookingStatus,
  updateDestinationBookingPaymentStatus,
  deleteDestinationBooking,
  getDestinationBookingStats
} = require('../controllers/destinationBookingController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes - NO AUTHENTICATION REQUIRED
router.post('/', createDestinationBooking);
router.get('/reference/:reference', getDestinationBookingByReference);

// Admin routes - AUTHENTICATION REQUIRED
router.get('/admin/stats', protect, admin, getDestinationBookingStats);
router.get('/admin/all', protect, admin, getDestinationBookings);
router.get('/admin/:id', protect, admin, getDestinationBookingById);
router.put('/admin/:id/status', protect, admin, updateDestinationBookingStatus);
router.put('/admin/:id/payment', protect, admin, updateDestinationBookingPaymentStatus);
router.delete('/admin/:id', protect, admin, deleteDestinationBooking);

module.exports = router;
