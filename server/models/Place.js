import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'ancient',
    },
    tag: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    reviews: {
      type: Number,
      default: 100,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bestTime: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      default: 'Nashik Municipal Tourism Board',
    },
    highlights: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    }
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model('Place', placeSchema);

export default Place;
