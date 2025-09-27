const mongoose = require('mongoose');

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a tour name'],
      trim: true,
      maxlength: [100, 'Tour name cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    },
    summary: {
      type: String,
      trim: true
    },
    duration: {
      type: Number,
      required: [true, 'Please add tour duration in days']
    },
    price: {
      type: Number,
      required: [true, 'Please add tour price']
    },
    discount: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      default: function() {
        return this.price - (this.price * (this.discount / 100));
      }
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Please add a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'Please add a difficulty'],
      enum: ['easy', 'medium', 'difficult']
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    startDates: [Date],
    featured: {
      type: Boolean,
      default: false
    },
    isPackage: {
      type: Boolean,
      default: false
    },
    includedHotels: [{
      name: String,
      location: String,
      rating: {
        type: Number,
        min: 1,
        max: 5
      }
    }],
    activities: [String],
    includedMeals: {
      breakfast: {
        type: Boolean,
        default: false
      },
      lunch: {
        type: Boolean,
        default: false
      },
      dinner: {
        type: Boolean,
        default: false
      }
    },
    cancellationPolicy: {
      freeCancellationDays: {
        type: Number,
        default: 15
      },
      partialRefundDays: {
        type: Number,
        default: 7
      },
      noRefundDays: {
        type: Number,
        default: 0
      },
      cancellationFee: {
        type: Number,
        default: 0
      }
    },
    travelersInfo: {
      minAge: {
        type: Number,
        default: 0
      },
      requiresVisa: {
        type: Boolean,
        default: false
      },
      recommendedVaccinations: [String]
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual populate
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});

module.exports = mongoose.model('Tour', tourSchema);