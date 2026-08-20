import Place from '../models/Place.js';

// @desc    Get all historical tourism places from MongoDB
// @route   GET /api/places
// @access  Public
export const getPlaces = async (req, res) => {
  try {
    const places = await Place.find({}).sort({ createdAt: -1 });
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single place by ID
// @route   GET /api/places/:id
// @access  Public
export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (place) {
      res.json(place);
    } else {
      res.status(404).json({ message: 'Place not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new tourist place
// @route   POST /api/places
// @access  Private (Admin only)
export const createPlace = async (req, res) => {
  try {
    const {
      name,
      category,
      tag,
      rating,
      reviews,
      location,
      image,
      description,
      bestTime,
      host,
      highlights,
    } = req.body;

    const newPlace = new Place({
      name,
      category: category || 'ancient',
      tag,
      rating: rating || 4.8,
      reviews: reviews || 100,
      location,
      image,
      description,
      bestTime,
      host: host || 'Nashik Municipal Tourism Board',
      highlights: highlights || [],
      createdBy: req.admin._id,
    });

    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a tourist place
// @route   PUT /api/places/:id
// @access  Private (Admin only)
export const updatePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);

    if (place) {
      place.name = req.body.name || place.name;
      place.category = req.body.category || place.category;
      place.tag = req.body.tag || place.tag;
      place.rating = req.body.rating || place.rating;
      place.reviews = req.body.reviews || place.reviews;
      place.location = req.body.location || place.location;
      place.image = req.body.image || place.image;
      place.description = req.body.description || place.description;
      place.bestTime = req.body.bestTime || place.bestTime;
      place.host = req.body.host || place.host;
      place.highlights = req.body.highlights || place.highlights;

      const updatedPlace = await place.save();
      res.json(updatedPlace);
    } else {
      res.status(404).json({ message: 'Place not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a tourist place
// @route   DELETE /api/places/:id
// @access  Private (Admin only)
export const deletePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);

    if (place) {
      await place.deleteOne();
      res.json({ message: 'Place removed successfully' });
    } else {
      res.status(404).json({ message: 'Place not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
