const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBookingById,
  getBookingByReference,
  updateBookingStatus,
  updatePaymentStatus,
  deleteBooking,
  getBookingStats
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes - NO AUTHENTICATION REQUIRED
router.post('/', createBooking);
router.get('/reference/:reference', getBookingByReference);

// Admin routes - AUTHENTICATION REQUIRED
router.get('/admin/stats', protect, admin, getBookingStats);
router.get('/admin/all', protect, admin, getBookings);
router.get('/admin/:id', protect, admin, getBookingById);
router.put('/admin/:id/status', protect, admin, updateBookingStatus);
router.put('/admin/:id/payment', protect, admin, updatePaymentStatus);
router.delete('/admin/:id', protect, admin, deleteBooking);

module.exports = router;