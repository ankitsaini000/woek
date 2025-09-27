const mongoose = require('mongoose');

const destinationBookingSchema = mongoose.Schema(
  {
    // Destination Information
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: [true, 'Destination ID is required']
    },

    // User Information
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/.+@.+\..+/, 'Please use a valid email address'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    nationality: {
      type: String,
      required: [true, 'Nationality is required'],
      trim: true
    },

    // Travel Information
    travelDate: {
      type: Date,
      required: [true, 'Travel date is required']
    },
    numberOfTravelers: {
      type: Number,
      required: [true, 'Number of travelers is required'],
      min: [1, 'At least 1 traveler is required'],
      max: [20, 'Maximum 20 travelers allowed']
    },
    specialRequests: {
      type: String,
      trim: true,
      maxlength: [500, 'Special requests cannot exceed 500 characters']
    },

    // Booking Details
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required']
    },
    bookingStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    bookingReference: {
      type: String,
      unique: true
    },

    // Emergency Contact
    emergencyContactName: {
      type: String,
      required: [true, 'Emergency contact name is required'],
      trim: true
    },
    emergencyContactPhone: {
      type: String,
      required: [true, 'Emergency contact phone is required'],
      trim: true
    },
    emergencyContactRelation: {
      type: String,
      required: [true, 'Emergency contact relation is required'],
      trim: true
    },

    // Additional Information
    dietaryRequirements: {
      type: String,
      trim: true,
      maxlength: [200, 'Dietary requirements cannot exceed 200 characters']
    },
    medicalConditions: {
      type: String,
      trim: true,
      maxlength: [200, 'Medical conditions cannot exceed 200 characters']
    }
  },
  {
    timestamps: true
  }
);

// Generate unique booking reference before saving
destinationBookingSchema.pre('save', async function(next) {
  if (this.isNew && !this.bookingReference) {
    try {
      const count = await mongoose.model('DestinationBooking').countDocuments();
      this.bookingReference = `DB${String(count + 1).padStart(6, '0')}`;
    } catch (error) {
      console.error('Error generating destination booking reference:', error);
      // Fallback to timestamp-based reference
      this.bookingReference = `DB${Date.now()}`;
    }
  }
  next();
});

// Index for better query performance
destinationBookingSchema.index({ destinationId: 1 });
destinationBookingSchema.index({ email: 1 });
destinationBookingSchema.index({ bookingStatus: 1 });
destinationBookingSchema.index({ bookingReference: 1 });

module.exports = mongoose.model('DestinationBooking', destinationBookingSchema);
