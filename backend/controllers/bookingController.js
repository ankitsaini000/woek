const Booking = require('../models/bookingModel');
const Package = require('../models/packageModel');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  console.log('Booking creation request received:', req.body);
  try {
    const {
      packageId,
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      nationality,
      travelDate,
      numberOfTravelers,
      specialRequests,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation,
      dietaryRequirements,
      medicalConditions
    } = req.body;

    // Validate required fields
    if (!packageId || !firstName || !lastName || !email || !phone || !dateOfBirth || 
        !nationality || !travelDate || !numberOfTravelers || !emergencyContactName || 
        !emergencyContactPhone || !emergencyContactRelation) {
      console.log('Missing required fields:', {
        packageId: !!packageId,
        firstName: !!firstName,
        lastName: !!lastName,
        email: !!email,
        phone: !!phone,
        dateOfBirth: !!dateOfBirth,
        nationality: !!nationality,
        travelDate: !!travelDate,
        numberOfTravelers: !!numberOfTravelers,
        emergencyContactName: !!emergencyContactName,
        emergencyContactPhone: !!emergencyContactPhone,
        emergencyContactRelation: !!emergencyContactRelation
      });
      return res.status(400).json({ 
        message: 'Missing required fields',
        details: {
          packageId: !!packageId,
          firstName: !!firstName,
          lastName: !!lastName,
          email: !!email,
          phone: !!phone,
          dateOfBirth: !!dateOfBirth,
          nationality: !!nationality,
          travelDate: !!travelDate,
          numberOfTravelers: !!numberOfTravelers,
          emergencyContactName: !!emergencyContactName,
          emergencyContactPhone: !!emergencyContactPhone,
          emergencyContactRelation: !!emergencyContactRelation
        }
      });
    }

    // Get package information
    console.log('Looking for package with ID:', packageId);
    const packageData = await Package.findById(packageId);
    if (!packageData) {
      console.log('Package not found for ID:', packageId);
      return res.status(404).json({ 
        message: 'Package not found',
        packageId: packageId
      });
    }
    console.log('Package found:', packageData.title);

    // Calculate total amount
    const totalAmount = packageData.currentPrice * numberOfTravelers;
    
    // Validate and convert dates
    const dateOfBirthDate = new Date(dateOfBirth);
    const travelDateDate = new Date(travelDate);
    
    if (isNaN(dateOfBirthDate.getTime())) {
      return res.status(400).json({ 
        message: 'Invalid date of birth format' 
      });
    }
    
    if (isNaN(travelDateDate.getTime())) {
      return res.status(400).json({ 
        message: 'Invalid travel date format' 
      });
    }

    // Create booking
    console.log('Creating booking with data:', {
      packageId,
      firstName,
      lastName,
      email,
      totalAmount
    });
    
    const booking = await Booking.create({
      packageId,
      packageTitle: packageData.title,
      packagePrice: packageData.currentPrice,
      packageCurrency: packageData.currency,
      packageDuration: packageData.duration,
      packageLocation: packageData.location,
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth: dateOfBirthDate,
      nationality,
      travelDate: travelDateDate,
      numberOfTravelers,
      specialRequests,
      totalAmount,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation,
      dietaryRequirements,
      medicalConditions
    });
    
    console.log('Booking created successfully:', booking.bookingReference);

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
      bookingReference: booking.bookingReference
    });
  } catch (error) {
    console.error('Create booking error:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    res.status(400).json({ 
      message: error.message,
      error: error.name,
      details: error.stack
    });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('packageId', 'title currentPrice currency duration location')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private/Admin
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('packageId', 'title currentPrice currency duration location mainImage');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get booking by reference
// @route   GET /api/bookings/reference/:reference
// @access  Public
const getBookingByReference = async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingReference: req.params.reference })
      .populate('packageId', 'title currentPrice currency duration location mainImage');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    console.error('Get booking by reference error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status. Must be: pending, confirmed, cancelled, or completed' 
      });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.bookingStatus = status;
    
    if (status === 'confirmed') {
      booking.confirmationDate = new Date();
    } else if (status === 'cancelled') {
      booking.cancellationDate = new Date();
    }

    await booking.save();

    res.json({
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(400).json({ 
      message: error.message,
      error: error.name
    });
  }
};

// @desc    Update payment status
// @route   PUT /api/bookings/:id/payment
// @access  Private/Admin
const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    
    if (!['pending', 'paid', 'failed', 'refunded'].includes(paymentStatus)) {
      return res.status(400).json({ 
        message: 'Invalid payment status. Must be: pending, paid, failed, or refunded' 
      });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.paymentStatus = paymentStatus;
    await booking.save();

    res.json({
      message: 'Payment status updated successfully',
      booking
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(400).json({ 
      message: error.message,
      error: error.name
    });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    await Booking.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(400).json({ 
      message: error.message,
      error: error.name
    });
  }
};

// @desc    Get booking statistics
// @route   GET /api/bookings/stats/overview
// @access  Private/Admin
const getBookingStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ bookingStatus: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ bookingStatus: 'confirmed' });
    const cancelledBookings = await Booking.countDocuments({ bookingStatus: 'cancelled' });
    const totalRevenue = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0
    });
  } catch (error) {
    console.error('Get booking stats error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  getBookingByReference,
  updateBookingStatus,
  updatePaymentStatus,
  deleteBooking,
  getBookingStats
};