"use client";

import { useState } from "react";
import { X, MapPin, Calendar, DollarSign, Star, Image, Globe, Clock, Users, Plus, Trash2 } from "lucide-react";
import { ImageUpload } from "@/components/destinations/ImageUpload";

interface PackageData {
  // Basic Information
  title: string;
  subtitle: string;
  duration: string;
  nights: string;
  location: string;
  description: string;
  
  // Pricing
  currentPrice: string;
  originalPrice: string;
  discount: string;
  totalPrice: string;
  currency: string;
  
  // Media
  mainImage: string;
  gallery: string[];
  
  // Activities and Highlights
  activities: string[];
  highlights: string[];
  
  // Itinerary
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  
  // Inclusions
  inclusions: string[];
  
  // Hotels
  hotels: Array<{
    name: string;
    rating: number;
    location: string;
  }>;
  
  // Terms and Conditions
  termsAndConditions: string[];
  
  // Package Details
  packageDetails: {
    dateChangePolicy: string;
    cancellationPolicy: string;
    refundPolicy: string;
    bookingPolicy: string;
  };
  detailedActivities: Array<{
    name: string;
    description: string;
    duration: string;
    included: boolean;
  }>;
  detailedHighlights: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  detailedItinerary: Array<{
    day: number;
    title: string;
    description: string;
    activities: string[];
    meals: string[];
    accommodation: string;
    transportation: string;
    highlights: string[];
    tips: string;
  }>;
  detailedTermsAndConditions: {
    general: string[];
    booking: string[];
    cancellation: string[];
    refund: string[];
    travel: string[];
    health: string[];
    insurance: string[];
    liability: string[];
  };
  
  // Status
  featured: boolean;
}

interface AddPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddPackageModal({ isOpen, onClose, onSuccess }: AddPackageModalProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState<PackageData>({
    title: "",
    subtitle: "",
    duration: "",
    nights: "",
    location: "",
    description: "",
    currentPrice: "",
    originalPrice: "",
    discount: "",
    totalPrice: "",
    currency: "USD",
    mainImage: "",
    gallery: [],
    activities: [],
    highlights: [],
    itinerary: [],
    inclusions: [],
    hotels: [],
    termsAndConditions: [],
    packageDetails: {
      dateChangePolicy: "",
      cancellationPolicy: "",
      refundPolicy: "",
      bookingPolicy: ""
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

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Globe },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "media", label: "Media", icon: Image },
    { id: "activities", label: "Activities", icon: Star },
    { id: "itinerary", label: "Itinerary", icon: Calendar },
    { id: "inclusions", label: "Inclusions", icon: Users },
    { id: "hotels", label: "Hotels", icon: MapPin },
    { id: "details", label: "Package Details", icon: Clock },
    { id: "terms", label: "Terms", icon: Clock }
  ];

  const handleInputChange = (field: keyof PackageData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (field: keyof PackageData, nestedField: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...(prev[field] as Record<string, unknown>),
        [nestedField]: value
      }
    }));
  };

  const handleArrayInputChange = (field: keyof PackageData, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [field]: items
    }));
  };

  const addItineraryItem = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, title: "", description: "" }]
    }));
  };

  const updateItineraryItem = (index: number, field: 'title' | 'description', value: string) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeItineraryItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  const addHotel = () => {
    setFormData(prev => ({
      ...prev,
      hotels: [...prev.hotels, { name: "", rating: 4, location: "" }]
    }));
  };

  const updateHotel = (index: number, field: 'name' | 'rating' | 'location', value: string | number) => {
    setFormData(prev => ({
      ...prev,
      hotels: prev.hotels.map((hotel, i) => 
        i === index ? { ...hotel, [field]: value } : hotel
      )
    }));
  };

  const removeHotel = (index: number) => {
    setFormData(prev => ({
      ...prev,
      hotels: prev.hotels.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Client-side validation for required fields
    const requiredFields = ['title', 'subtitle', 'duration', 'nights', 'location', 'description', 'currentPrice', 'originalPrice', 'discount', 'totalPrice', 'mainImage'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData] || formData[field as keyof typeof formData] === '');
    
    if (missingFields.length > 0) {
      setError(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      
      // Ensure arrays are properly formatted
      const sanitizedData = {
        ...formData,
        currentPrice: parseFloat(formData.currentPrice),
        originalPrice: parseFloat(formData.originalPrice),
        discount: parseFloat(formData.discount),
        totalPrice: parseFloat(formData.totalPrice),
        gallery: Array.isArray(formData.gallery) ? formData.gallery : [],
        activities: Array.isArray(formData.activities) ? formData.activities : [],
        highlights: Array.isArray(formData.highlights) ? formData.highlights : [],
        inclusions: Array.isArray(formData.inclusions) ? formData.inclusions : [],
        termsAndConditions: Array.isArray(formData.termsAndConditions) ? formData.termsAndConditions : [],
      };
      
      console.log('Sending package data:', sanitizedData);
      console.log('Auth token:', token ? 'Present' : 'Missing');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/packages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.message || 'Failed to create package');
      }

      onSuccess();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error("Form submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden text-black" style={{ color: '#000' }}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Add New Package</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 max-h-[60vh] overflow-y-auto text-black" style={{ color: '#000' }}>
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Basic Information Tab */}
            {activeTab === "basic" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ${
                      !formData.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Magical Bali Experience"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Subtitle *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ${
                      !formData.subtitle ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 4N Kuta • 2N Ubud"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ${
                        !formData.duration ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 7 Days"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nights *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nights}
                      onChange={(e) => handleInputChange('nights', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ${
                        !formData.nights ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 6 Nights"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ${
                        !formData.location ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Bali, Indonesia"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ${
                      !formData.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Detailed description of the package"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                    Mark as Featured Package
                  </label>
                </div>
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === "pricing" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Price *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.currentPrice}
                      onChange={(e) => handleInputChange('currentPrice', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ${
                        !formData.currentPrice ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 48500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.originalPrice}
                      onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ${
                        !formData.originalPrice ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 58200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Percentage *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.discount}
                      onChange={(e) => handleInputChange('discount', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ${
                        !formData.discount ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Price *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.totalPrice}
                      onChange={(e) => handleInputChange('totalPrice', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ${
                        !formData.totalPrice ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 97000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                    <option value="AED">AED</option>
                  </select>
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === "media" && (
              <div className="space-y-4">
                <ImageUpload
                  onImageUpload={(url) => handleInputChange('mainImage', url)}
                  onGalleryUpload={(urls) => setFormData(prev => ({ ...prev, gallery: urls }))}
                  existingImage={formData.mainImage}
                  existingGallery={formData.gallery}
                />
              </div>
            )}

            {/* Activities Tab */}
            {activeTab === "activities" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activities (comma-separated)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.activities.join(', ')}
                    onChange={(e) => handleArrayInputChange('activities', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Ubud Tour, Tanah Lot Temple, Water Sports Package"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Highlights (comma-separated)
                  </label>
                  <textarea
                    rows={6}
                    value={formData.highlights.join(', ')}
                    onChange={(e) => handleArrayInputChange('highlights', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Experience thrilling water sports at Kuta Beach, Watch the mesmerizing Kecak dance at Uluwatu Temple"
                  />
                </div>
              </div>
            )}

            {/* Itinerary Tab */}
            {activeTab === "itinerary" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Daily Itinerary</h3>
                  <button
                    type="button"
                    onClick={addItineraryItem}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Day</span>
                  </button>
                </div>

                {formData.itinerary.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-900">Day {item.day}</h4>
                      <button
                        type="button"
                        onClick={() => removeItineraryItem(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateItineraryItem(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Day title (e.g., Arrival in Bali)"
                      />
                      <textarea
                        rows={3}
                        value={item.description}
                        onChange={(e) => updateItineraryItem(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Day description"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Inclusions Tab */}
            {activeTab === "inclusions" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Inclusions (comma-separated)
                  </label>
                  <textarea
                    rows={6}
                    value={formData.inclusions.join(', ')}
                    onChange={(e) => handleArrayInputChange('inclusions', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Round Trip Flights, Airport Transfers, Selected Meals, 4 Star Hotels, 6 Activities"
                  />
                </div>
              </div>
            )}

            {/* Hotels Tab */}
            {activeTab === "hotels" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Hotels</h3>
                  <button
                    type="button"
                    onClick={addHotel}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Hotel</span>
                  </button>
                </div>

                {formData.hotels.map((hotel, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-900">Hotel {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeHotel(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={hotel.name}
                        onChange={(e) => updateHotel(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Hotel name"
                      />
                      <input
                        type="number"
                        value={hotel.rating}
                        onChange={(e) => updateHotel(index, 'rating', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Rating (1-5)"
                        min="1"
                        max="5"
                      />
                      <input
                        type="text"
                        value={hotel.location}
                        onChange={(e) => updateHotel(index, 'location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Location"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Package Details Tab */}
            {activeTab === "details" && (
              <div className="space-y-6">
                {/* Package Policies */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Package Policies</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Change Policy
                    </label>
                    <textarea
                      rows={3}
                      value={formData.packageDetails.dateChangePolicy}
                      onChange={(e) => handleNestedInputChange('packageDetails', 'dateChangePolicy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Policy for changing travel dates..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cancellation Policy
                    </label>
                    <textarea
                      rows={3}
                      value={formData.packageDetails.cancellationPolicy}
                      onChange={(e) => handleNestedInputChange('packageDetails', 'cancellationPolicy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Policy for package cancellation..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Refund Policy
                    </label>
                    <textarea
                      rows={3}
                      value={formData.packageDetails.refundPolicy}
                      onChange={(e) => handleNestedInputChange('packageDetails', 'refundPolicy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Refund terms and conditions..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booking Policy
                    </label>
                    <textarea
                      rows={3}
                      value={formData.packageDetails.bookingPolicy}
                      onChange={(e) => handleNestedInputChange('packageDetails', 'bookingPolicy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Booking terms and conditions..."
                    />
                  </div>
                </div>

                {/* Enhanced Activities */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Detailed Activities</h3>
                  <div className="text-sm text-gray-600">
                    Add detailed activities with descriptions, duration, and inclusion status.
                  </div>
                  <div className="text-sm text-gray-500">
                    Note: This will be used alongside the basic activities list for enhanced package details.
                  </div>
                </div>

                {/* Enhanced Trip Highlights */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Detailed Trip Highlights</h3>
                  <div className="text-sm text-gray-600">
                    Add detailed trip highlights with titles, descriptions, and icons.
                  </div>
                  <div className="text-sm text-gray-500">
                    Note: This will be used alongside the basic highlights list for enhanced package details.
                  </div>
                </div>

                {/* Enhanced Detailed Itinerary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Enhanced Detailed Itinerary</h3>
                  <div className="text-sm text-gray-600">
                    Add comprehensive daily itinerary with activities, meals, accommodation, transportation, and tips.
                  </div>
                  <div className="text-sm text-gray-500">
                    Note: This will be used alongside the basic itinerary for enhanced package details.
                  </div>
                </div>

                {/* Enhanced Terms and Conditions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Detailed Terms and Conditions</h3>
                  <div className="text-sm text-gray-600">
                    Add comprehensive terms and conditions organized by category.
                  </div>
                  <div className="text-sm text-gray-500">
                    Note: This will be used alongside the basic terms for enhanced package details.
                  </div>
                </div>
              </div>
            )}

            {/* Terms Tab */}
            {activeTab === "terms" && (
              <div className="space-y-6">
                {/* Package Cancellation Policy */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Package Cancellation Policy</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cancellation Policy *
                    </label>
                    <textarea
                      rows={6}
                      value={formData.packageDetails.cancellationPolicy}
                      onChange={(e) => handleNestedInputChange('packageDetails', 'cancellationPolicy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Enter detailed cancellation policy including timeframes, fees, and conditions..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Include cancellation timeframes, fees, and any special conditions
                    </p>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Terms and Conditions</h3>
                  
                  {/* General Terms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      General Terms
                    </label>
                    <textarea
                      rows={4}
                      value={formData.detailedTermsAndConditions.general.join(', ')}
                      onChange={(e) => handleNestedInputChange('detailedTermsAndConditions', 'general', e.target.value.split(',').map(item => item.trim()).filter(item => item))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Package prices are subject to availability and change without prior notice, Passport must be valid for at least 6 months from the date of return"
                    />
                  </div>

                  {/* Booking Terms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booking Terms
                    </label>
                    <textarea
                      rows={4}
                      value={formData.detailedTermsAndConditions.booking.join(', ')}
                      onChange={(e) => handleNestedInputChange('detailedTermsAndConditions', 'booking', e.target.value.split(',').map(item => item.trim()).filter(item => item))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Booking confirmation required, Payment terms, Booking modifications"
                    />
                  </div>

                  {/* Travel Terms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Travel Terms
                    </label>
                    <textarea
                      rows={4}
                      value={formData.detailedTermsAndConditions.travel.join(', ')}
                      onChange={(e) => handleNestedInputChange('detailedTermsAndConditions', 'travel', e.target.value.split(',').map(item => item.trim()).filter(item => item))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Travel insurance requirements, Health requirements, Visa requirements"
                    />
                  </div>

                  {/* Basic Terms and Conditions (Legacy) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Terms and Conditions (comma-separated)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.termsAndConditions.join(', ')}
                      onChange={(e) => handleArrayInputChange('termsAndConditions', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Additional terms and conditions..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This is a legacy field for backward compatibility
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Package"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
