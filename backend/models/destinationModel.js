const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an activity title']
  },
  image: {
    type: String,
    required: [true, 'Please add an activity image']
  },
  description: {
    type: String,
    required: [true, 'Please add an activity description']
  },
  price: {
    type: Number,
    required: [true, 'Please add an activity price']
  },
  time: {
    type: String,
    required: [true, 'Please add activity duration']
  }
});

const reviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const destinationSchema = mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: [true, 'Please add a destination title'],
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, 'Please add a destination name'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Please add a country']
    },
    region: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    },
    shortDescription: {
      type: String,
      required: [true, 'Please add a short description']
    },
    
    // Location & Geography
    latitude: {
      type: String,
      trim: true
    },
    longitude: {
      type: String,
      trim: true
    },
    timezone: {
      type: String,
      trim: true
    },
    language: {
      type: String,
      trim: true
    },
    localCurrency: {
      type: String,
      trim: true
    },
    
    // Travel Information
    bestTimeToVisit: {
      type: String,
      trim: true
    },
    duration: {
      type: String,
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Moderate', 'Challenging', 'Expert'],
      trim: true
    },
    groupSize: {
      type: String,
      trim: true
    },
    
    // Pricing
    startingPrice: {
      type: Number,
      required: [true, 'Please add a starting price']
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
    
    // Highlights & Activities
    highlights: [String],
    activities: [String],
    
    // Additional Information
    climate: {
      type: String,
      trim: true
    },
    visaRequirements: {
      type: String,
      trim: true
    },
    healthRequirements: {
      type: String,
      trim: true
    },
    packingTips: {
      type: String,
      trim: true
    },
    localTransportation: {
      type: String,
      trim: true
    },
    accommodation: {
      type: String,
      trim: true
    },
    dining: {
      type: String,
      trim: true
    },
    shopping: {
      type: String,
      trim: true
    },
    nightlife: {
      type: String,
      trim: true
    },
    safety: {
      type: String,
      trim: true
    },
    tips: {
      type: String,
      trim: true
    },
    
    // Legacy fields for backward compatibility
    reviews: [reviewSchema],
    featured: {
      type: Boolean,
      default: false
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Destination', destinationSchema);