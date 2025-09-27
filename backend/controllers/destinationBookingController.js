const DestinationBooking = require('../models/destinationBookingModel');

// @desc    Create a new destination booking
// @route   POST /api/destination-bookings
// @access  Public
const createDestinationBooking = async (req, res) => {
  console.log('Destination booking creation request received:', req.body);
  try {
    const {
      destinationId,
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
      medicalConditions,
      totalAmount
    } = req.body;

    // Validate required fields
    if (!destinationId || !firstName || !lastName || !email || !phone || !dateOfBirth || 
        !nationality || !travelDate || !numberOfTravelers || !emergencyContactName || 
        !emergencyContactPhone || !emergencyContactRelation) {
      console.log('Missing required fields:', {
        destinationId: !!destinationId,
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
          destinationId: !!destinationId,
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

    // Validate and convert dates
    const dateOfBirthDate = new Date(dateOfBirth);
    const travelDateDate = new Date(travelDate);
    
    if (isNaN(dateOfBirthDate.getTime())) {
      console.log('Invalid date of birth format:', dateOfBirth);
      return res.status(400).json({ 
        message: 'Invalid date of birth format' 
      });
    }
    
    if (isNaN(travelDateDate.getTime())) {
      console.log('Invalid travel date format:', travelDate);
      return res.status(400).json({ 
        message: 'Invalid travel date format' 
      });
    }

    // Create destination booking
    console.log('Creating destination booking with data:', {
      destinationId,
      firstName,
      lastName,
      email,
      totalAmount
    });
    
    const booking = await DestinationBooking.create({
      destinationId,
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth: dateOfBirthDate,
      nationality,
      travelDate: travelDateDate,
      numberOfTravelers,
      specialRequests,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation,
      dietaryRequirements,
      medicalConditions,
      totalAmount: totalAmount || 999 * numberOfTravelers
    });

    console.log('Destination booking created successfully:', booking.bookingReference);

    res.status(201).json({
      message: 'Destination booking created successfully',
      bookingReference: booking.bookingReference,
      bookingId: booking._id,
      status: booking.bookingStatus
    });

  } catch (error) {
    console.error('Error creating destination booking:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

// @desc    Get all destination bookings
// @route   GET /api/destination-bookings
// @access  Private/Admin
const getDestinationBookings = async (req, res) => {
  try {
    const bookings = await DestinationBooking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching destination bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Get destination booking by ID
// @route   GET /api/destination-bookings/:id
// @access  Private/Admin
const getDestinationBookingById = async (req, res) => {
  try {
    const booking = await DestinationBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Destination booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error fetching destination booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Get destination booking by reference
// @route   GET /api/destination-bookings/reference/:reference
// @access  Public
const getDestinationBookingByReference = async (req, res) => {
  try {
    const booking = await DestinationBooking.findOne({ bookingReference: req.params.reference });
    if (!booking) {
      return res.status(404).json({ message: 'Destination booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error fetching destination booking by reference:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Update destination booking status
// @route   PUT /api/destination-bookings/:id/status
// @access  Private/Admin
const updateDestinationBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await DestinationBooking.findByIdAndUpdate(
      req.params.id,
      { bookingStatus: status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Destination booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error updating destination booking status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Update destination booking payment status
// @route   PUT /api/destination-bookings/:id/payment
// @access  Private/Admin
const updateDestinationBookingPaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const booking = await DestinationBooking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Destination booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error updating destination booking payment status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Delete destination booking
// @route   DELETE /api/destination-bookings/:id
// @access  Private/Admin
const deleteDestinationBooking = async (req, res) => {
  try {
    const booking = await DestinationBooking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Destination booking not found' });
    }
    res.json({ message: 'Destination booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting destination booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Get destination booking statistics
// @route   GET /api/destination-bookings/stats
// @access  Private/Admin
const getDestinationBookingStats = async (req, res) => {
  try {
    const stats = await DestinationBooking.aggregate([
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
          averageBookingValue: { $avg: '$totalAmount' }
        }
      }
    ]);

    const statusStats = await DestinationBooking.aggregate([
      {
        $group: {
          _id: '$bookingStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      overview: stats[0] || { totalBookings: 0, totalRevenue: 0, averageBookingValue: 0 },
      statusBreakdown: statusStats
    });
  } catch (error) {
    console.error('Error fetching destination booking stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createDestinationBooking,
  getDestinationBookings,
  getDestinationBookingById,
  getDestinationBookingByReference,
  updateDestinationBookingStatus,
  updateDestinationBookingPaymentStatus,
  deleteDestinationBooking,
  getDestinationBookingStats
};
