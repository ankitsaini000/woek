const Package = require('../models/packageModel');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
const getPackages = async (req, res) => {
  try {
    console.log('GET /api/packages called');
    const packages = await Package.find();
    console.log(`Found ${packages.length} packages`);
    res.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single package
// @route   GET /api/packages/:id
// @access  Public
const getPackageById = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    
    if (package) {
      res.json(package);
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a package
// @route   POST /api/packages
// @access  Private/Admin
const createPackage = async (req, res) => {
  try {
    console.log('Received package data:', req.body);
    const {
      // Basic Information
      title,
      subtitle,
      duration,
      nights,
      location,
      description,
      
      // Pricing
      currentPrice,
      originalPrice,
      discount,
      totalPrice,
      currency,
      
      // Media
      mainImage,
      gallery,
      
      // Activities and Highlights
      activities,
      highlights,
      
      // Itinerary
      itinerary,
      
      // Inclusions
      inclusions,
      
      // Hotels
      hotels,
      
      // Terms and Conditions
      termsAndConditions,
      
      // Package Details
      packageDetails,
      detailedActivities,
      detailedHighlights,
      detailedItinerary,
      detailedTermsAndConditions,
      
      // Status
      featured
    } = req.body;
    
    // Validate required fields
    if (!title || !subtitle || !duration || !nights || !location || !description || 
        !currentPrice || !originalPrice || !discount || !totalPrice || !mainImage) {
      return res.status(400).json({ 
        message: 'Missing required fields: title, subtitle, duration, nights, location, description, currentPrice, originalPrice, discount, totalPrice, mainImage' 
      });
    }

    // Create new package
    const packageData = await Package.create({
      // Basic Information
      title,
      subtitle,
      duration,
      nights,
      location,
      description,
      
      // Pricing
      currentPrice,
      originalPrice,
      discount,
      totalPrice,
      currency: currency || 'USD',
      
      // Media
      mainImage,
      gallery: Array.isArray(gallery) ? gallery : [],
      
      // Activities and Highlights
      activities: Array.isArray(activities) ? activities : [],
      highlights: Array.isArray(highlights) ? highlights : [],
      
      // Itinerary
      itinerary: Array.isArray(itinerary) ? itinerary : [],
      
      // Inclusions
      inclusions: Array.isArray(inclusions) ? inclusions : [],
      
      // Hotels
      hotels: Array.isArray(hotels) ? hotels : [],
      
      // Terms and Conditions
      termsAndConditions: Array.isArray(termsAndConditions) ? termsAndConditions : [],
      
      // Package Details
      packageDetails: packageDetails || {},
      detailedActivities: Array.isArray(detailedActivities) ? detailedActivities : [],
      detailedHighlights: Array.isArray(detailedHighlights) ? detailedHighlights : [],
      detailedItinerary: Array.isArray(detailedItinerary) ? detailedItinerary : [],
      detailedTermsAndConditions: detailedTermsAndConditions || {},
      
      // Status
      featured: featured || false
    });
    
    res.status(201).json({
      message: 'Package created successfully',
      package: packageData
    });
  } catch (error) {
    console.error('Create package error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      if (error.message.includes('title')) {
        return res.status(400).json({ 
          message: 'A package with this title already exists. Please choose a different title.',
          error: 'DUPLICATE_TITLE'
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

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Private/Admin
const updatePackage = async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);
    
    if (!packageData) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      message: 'Package updated successfully',
      package: updatedPackage
    });
  } catch (error) {
    console.error('Update package error:', error);
    res.status(400).json({ 
      message: error.message,
      error: error.name
    });
  }
};

// @desc    Delete a package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
const deletePackage = async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);
    
    if (!packageData) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    await Package.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Delete package error:', error);
    res.status(400).json({ 
      message: error.message,
      error: error.name
    });
  }
};

module.exports = {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
};
