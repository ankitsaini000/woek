const mongoose = require('mongoose');

const itinerarySchema = mongoose.Schema({
  day: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const packageSchema = mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: [true, 'Please add a package title'],
      unique: true,
      trim: true
    },
    subtitle: {
      type: String,
      required: [true, 'Please add a package subtitle'],
      trim: true
    },
    duration: {
      type: String,
      required: [true, 'Please add package duration'],
      trim: true
    },
    nights: {
      type: String,
      required: [true, 'Please add number of nights'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Please add package location'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please add package description']
    },
    
    // Pricing
    currentPrice: {
      type: Number,
      required: [true, 'Please add current price']
    },
    originalPrice: {
      type: Number,
      required: [true, 'Please add original price']
    },
    discount: {
      type: Number,
      required: [true, 'Please add discount percentage']
    },
    totalPrice: {
      type: Number,
      required: [true, 'Please add total price']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    
    // Media
    mainImage: {
      type: String,
      required: [true, 'Please add a main image']
    },
    gallery: [String],
    
    // Activities and Highlights
    activities: [String],
    highlights: [String],
    
    // Itinerary
    itinerary: [itinerarySchema],
    
    // Inclusions
    inclusions: [String],
    
    // Hotels
    hotels: [{
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      location: {
        type: String,
        required: true
      }
    }],
    
    // Terms and Conditions
    termsAndConditions: [String],
    
    // Package Details
    packageDetails: {
      dateChangePolicy: {
        type: String,
        trim: true
      },
      cancellationPolicy: {
        type: String,
        trim: true
      },
      refundPolicy: {
        type: String,
        trim: true
      },
      bookingPolicy: {
        type: String,
        trim: true
      }
    },
    
    // Enhanced Activities
    detailedActivities: [{
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      duration: {
        type: String,
        required: true
      },
      included: {
        type: Boolean,
        default: true
      }
    }],
    
    // Enhanced Trip Highlights
    detailedHighlights: [{
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        default: 'star'
      }
    }],
    
    // Enhanced Detailed Itinerary
    detailedItinerary: [{
      day: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      activities: [String],
      meals: [String],
      accommodation: {
        type: String,
        trim: true
      },
      transportation: {
        type: String,
        trim: true
      },
      highlights: [String],
      tips: {
        type: String,
        trim: true
      }
    }],
    
    // Enhanced Terms and Conditions
    detailedTermsAndConditions: {
      general: [String],
      booking: [String],
      cancellation: [String],
      refund: [String],
      travel: [String],
      health: [String],
      insurance: [String],
      liability: [String]
    },
    
    // Status
    featured: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Package', packageSchema);
