const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
  {
    // Package Information
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: [true, 'Package ID is required']
    },
    packageTitle: {
      type: String,
      required: [true, 'Package title is required']
    },
    packagePrice: {
      type: Number,
      required: [true, 'Package price is required']
    },
    packageCurrency: {
      type: String,
      required: [true, 'Package currency is required']
    },
    packageDuration: {
      type: String,
      required: [true, 'Package duration is required']
    },
    packageLocation: {
      type: String,
      required: [true, 'Package location is required']
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
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
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
    },
    
    // Admin Notes
    adminNotes: {
      type: String,
      trim: true
    },
    
    // Timestamps
    bookingDate: {
      type: Date,
      default: Date.now
    },
    confirmationDate: {
      type: Date
    },
    cancellationDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Generate unique booking reference before saving
bookingSchema.pre('save', async function(next) {
  if (this.isNew && !this.bookingReference) {
    try {
      const count = await mongoose.model('Booking').countDocuments();
      this.bookingReference = `BK${String(count + 1).padStart(6, '0')}`;
    } catch (error) {
      console.error('Error generating booking reference:', error);
      // Fallback to timestamp-based reference
      this.bookingReference = `BK${Date.now()}`;
    }
  }
  next();
});

// Index for better query performance
bookingSchema.index({ packageId: 1 });
bookingSchema.index({ email: 1 });
bookingSchema.index({ bookingStatus: 1 });
bookingSchema.index({ bookingReference: 1 });

module.exports = mongoose.model('Booking', bookingSchema);