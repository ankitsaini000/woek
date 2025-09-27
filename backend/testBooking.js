const mongoose = require('mongoose');
const Booking = require('./models/bookingModel');
const Package = require('./models/packageModel');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createTestBooking() {
  try {
    // First, let's check if there are any packages
    const packages = await Package.find();
    console.log('Available packages:', packages.length);
    
    if (packings.length === 0) {
      console.log('No packages found. Creating a test package first...');
      const testPackage = await Package.create({
        title: 'Test Package',
        subtitle: 'Test Subtitle',
        duration: '7 Days',
        nights: '6 Nights',
        location: 'Test Location',
        description: 'Test Description',
        currentPrice: 1000,
        originalPrice: 1200,
        discount: 20,
        totalPrice: 2000,
        currency: 'USD',
        mainImage: 'https://example.com/image.jpg',
        gallery: [],
        activities: ['Activity 1', 'Activity 2'],
        highlights: ['Highlight 1', 'Highlight 2'],
        itinerary: [],
        inclusions: ['Inclusion 1', 'Inclusion 2'],
        hotels: [],
        termsAndConditions: ['Term 1', 'Term 2'],
        packageDetails: {
          dateChangePolicy: 'Test policy',
          cancellationPolicy: 'Test policy',
          refundPolicy: 'Test policy',
          bookingPolicy: 'Test policy'
        },
        detailedActivities: [],
        detailedHighlights: [],
        detailedItinerary: [],
        detailedTermsAndConditions: {
          general: [],
          booking: [],
          cancellation: [],
          refund: [],
          travel: [],
          health: [],
          insurance: [],
          liability: []
        },
        featured: false
      });
      console.log('Test package created:', testPackage._id);
    }
    
    // Now create a test booking
    const testBooking = await Booking.create({
      packageId: packages[0]?._id || testPackage._id,
      packageTitle: 'Test Package',
      packagePrice: 1000,
      packageCurrency: 'USD',
      packageDuration: '7 Days',
      packageLocation: 'Test Location',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      dateOfBirth: new Date('1990-01-01'),
      nationality: 'American',
      travelDate: new Date('2024-03-01'),
      numberOfTravelers: 2,
      specialRequests: 'Test requests',
      totalAmount: 2000,
      bookingStatus: 'pending',
      paymentStatus: 'pending',
      emergencyContactName: 'Jane Doe',
      emergencyContactPhone: '+1234567891',
      emergencyContactRelation: 'Spouse',
      dietaryRequirements: 'None',
      medicalConditions: 'None'
    });
    
    console.log('Test booking created:', testBooking.bookingReference);
    console.log('Total bookings:', await Booking.countDocuments());
    
  } catch (error) {
    console.error('Error creating test booking:', error);
  } finally {
    mongoose.connection.close();
  }
}

createTestBooking();
