const Destination = require('../models/destinationModel');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
const getDestinations = async (req, res) => {
  try {
    console.log('GET /api/destinations called');
    const destinations = await Destination.find();
    console.log(`Found ${destinations.length} destinations`);
    res.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single destination
// @route   GET /api/destinations/:id
// @access  Public
const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    
    if (destination) {
      res.json(destination);
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a destination
// @route   POST /api/destinations
// @access  Private/Admin
const createDestination = async (req, res) => {
  try {
    console.log('Received destination data:', req.body);
    const {
      // Basic Information
      title,
      name,
      country,
      region,
      description,
      shortDescription,
      
      // Location & Geography
      latitude,
      longitude,
      timezone,
      language,
      localCurrency: locationCurrency,
      
      // Travel Information
      bestTimeToVisit,
      duration,
      difficulty,
      groupSize,
      
      // Pricing
      startingPrice,
      currency: priceCurrency,
      
      // Media
      mainImage,
      gallery,
      
      // Highlights & Activities
      highlights,
      activities,
      
      // Reviews
      reviews,
      
      // Legacy fields
      featured
    } = req.body;
    
    // Validate required fields
    if (!title || !name || !country || !description || !shortDescription || !startingPrice || !mainImage) {
      return res.status(400).json({ 
        message: 'Missing required fields: title, name, country, description, shortDescription, startingPrice, mainImage' 
      });
    }

    // Create new destination with the comprehensive structure
    const destination = await Destination.create({
      // Basic Information
      title,
      name,
      country,
      region,
      description,
      shortDescription,
      
      // Location & Geography
      latitude,
      longitude,
      timezone,
      language,
      localCurrency: locationCurrency,
      
      // Travel Information
      bestTimeToVisit,
      duration,
      difficulty,
      groupSize,
      
      // Pricing
      startingPrice,
      currency: priceCurrency,
      
      // Media
      mainImage,
      gallery: Array.isArray(gallery) ? gallery : [],
      
      // Highlights & Activities
      highlights: Array.isArray(highlights) ? highlights : [],
      activities: Array.isArray(activities) ? activities : [],
      
      // Reviews
      reviews: Array.isArray(reviews) ? reviews.map(review => ({
        id: review.id || Date.now().toString(),
        name: review.name || '',
        rating: parseInt(review.rating) || 5,
        comment: review.comment || '',
        date: review.date || new Date().toISOString().split('T')[0]
      })) : [],
      
      // Legacy fields for backward compatibility
      featured: featured || false,
      image: mainImage
    });
    
    res.status(201).json({
      message: 'Destination created successfully',
      destination
    });
  } catch (error) {
    console.error('Create destination error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      if (error.message.includes('title_1')) {
        return res.status(400).json({ 
          message: 'Database index error: Please contact administrator to fix database indexes. The title field index needs to be removed.',
          error: 'DUPLICATE_KEY_ERROR',
          details: 'There is a conflicting index on the title field that needs to be removed from the database.'
        });
      } else if (error.message.includes('name')) {
        return res.status(400).json({ 
          message: 'A destination with this name already exists. Please choose a different name.',
          error: 'DUPLICATE_NAME'
        });
      }
    }
    
    res.status(400).json({ 
      message: error.message,
      error: error.name,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// @desc    Update a destination
// @route   PUT /api/destinations/:id
// @access  Private/Admin
const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    
    if (destination) {
      // Process reviews data if present
      const updateData = { ...req.body };
      if (updateData.reviews && Array.isArray(updateData.reviews)) {
        updateData.reviews = updateData.reviews.map(review => ({
          id: review.id || Date.now().toString(),
          name: review.name || '',
          rating: parseInt(review.rating) || 5,
          comment: review.comment || '',
          date: review.date || new Date().toISOString().split('T')[0]
        }));
      }
      
      const updatedDestination = await Destination.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );
      res.json(updatedDestination);
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    console.error('Update destination error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a destination
// @route   DELETE /api/destinations/:id
// @access  Private/Admin
const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    
    if (destination) {
      await destination.deleteOne();
      res.json({ message: 'Destination removed' });
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload image to Cloudinary
// @route   POST /api/destinations/upload
// @access  Private/Admin
const uploadImage = async (req, res) => {
  try {
    if (!req.body.image) {
      return res.status(400).json({ message: 'Please provide an image' });
    }

    const result = await cloudinary.uploader.upload(req.body.image, {
      folder: 'destinations',
    });

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
};

module.exports = {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  uploadImage,
};