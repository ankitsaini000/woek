"use client";

import { useState, useEffect } from "react";
import { X, MapPin, Calendar, DollarSign, Star, Globe, Users, Camera } from "lucide-react";
import { ImageUpload } from "@/components/destinations/ImageUpload";

interface Destination {
  _id: string;
  title: string;
  name: string;
  country: string;
  region: string;
  description: string;
  shortDescription: string;
  latitude: string;
  longitude: string;
  timezone: string;
  language: string;
  localCurrency: string;
  bestTimeToVisit: string;
  duration: string;
  difficulty: string;
  groupSize: string;
  startingPrice: number;
  currency: string;
  mainImage: string;
  gallery: string[];
  highlights: string[];
  activities: string[];
  reviews: Array<{
    id: string;
    name: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  featured: boolean;
}

interface EditDestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  destination: Destination | null;
}

export function EditDestinationModal({ isOpen, onClose, onSuccess, destination }: EditDestinationModalProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    country: "",
    region: "",
    description: "",
    shortDescription: "",
    latitude: "",
    longitude: "",
    timezone: "",
    language: "",
    localCurrency: "",
    bestTimeToVisit: "",
    duration: "",
    difficulty: "",
    groupSize: "",
    startingPrice: "",
    currency: "USD",
    mainImage: "",
    gallery: [] as string[],
    highlights: [] as string[],
    activities: [] as string[],
    reviews: [] as Array<{
      id: string;
      name: string;
      rating: number;
      comment: string;
      date: string;
    }>,
    featured: false
  });

  const tabs = [
    { id: "basic", label: "Basic Info", icon: MapPin },
    { id: "location", label: "Location", icon: Globe },
    { id: "travel", label: "Travel Info", icon: Calendar },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "media", label: "Media", icon: Camera },
    { id: "highlights", label: "Highlights", icon: Star },
    { id: "additional", label: "Reviews", icon: Users }
  ];

  // Populate form when destination changes
  useEffect(() => {
    if (destination) {
      setFormData({
        title: destination.title || "",
        name: destination.name || "",
        country: destination.country || "",
        region: destination.region || "",
        description: destination.description || "",
        shortDescription: destination.shortDescription || "",
        latitude: destination.latitude || "",
        longitude: destination.longitude || "",
        timezone: destination.timezone || "",
        language: destination.language || "",
        localCurrency: destination.localCurrency || "",
        bestTimeToVisit: destination.bestTimeToVisit || "",
        duration: destination.duration || "",
        difficulty: destination.difficulty || "",
        groupSize: destination.groupSize || "",
        startingPrice: destination.startingPrice?.toString() || "",
        currency: destination.currency || "USD",
        mainImage: destination.mainImage || "",
        gallery: Array.isArray(destination.gallery) ? destination.gallery : [],
        highlights: Array.isArray(destination.highlights) ? destination.highlights : [],
        activities: Array.isArray(destination.activities) ? destination.activities : [],
        reviews: Array.isArray(destination.reviews) ? destination.reviews : [],
        featured: destination.featured || false
      });
    }
  }, [destination]);

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGalleryChange = (urls: string[]) => {
    setFormData(prev => ({
      ...prev,
      gallery: urls
    }));
  };

  const handleArrayInputChange = (field: keyof typeof formData, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [field]: items
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem('authToken');
      
      // Ensure arrays are properly formatted
      const sanitizedData = {
        ...formData,
        startingPrice: parseFloat(formData.startingPrice) || 0,
        gallery: Array.isArray(formData.gallery) ? formData.gallery : [],
        highlights: Array.isArray(formData.highlights) ? formData.highlights : [],
        activities: Array.isArray(formData.activities) ? formData.activities : [],
      };
      
      console.log('Updating destination data:', sanitizedData);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/destinations/${destination._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.message || 'Failed to update destination');
      }

      onSuccess();
      onClose();
    } catch (err: unknown) {
      console.error('Update error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !destination) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden text-black" style={{ color: '#000' }}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Edit Destination</h2>
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
          <form key={destination?._id || 'new'} onSubmit={handleSubmit} className="p-6 max-h-[60vh] overflow-y-auto text-black" style={{ color: '#000' }}>
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
                    Destination Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="e.g., Amazing Bali Adventure"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="e.g., Bali, Indonesia"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="e.g., Indonesia"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="e.g., Southeast Asia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Brief description for cards and listings"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Detailed description of the destination"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                    Featured Destination
                  </label>
                </div>
              </div>
            )}

            {/* Location Tab */}
            {activeTab === "location" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Latitude
                    </label>
                    <input
                      type="text"
                      value={formData.latitude}
                      onChange={(e) => handleInputChange('latitude', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="e.g., -8.3405"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Longitude
                    </label>
                    <input
                      type="text"
                      value={formData.longitude}
                      onChange={(e) => handleInputChange('longitude', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="e.g., 115.0920"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <input
                      type="text"
                      value={formData.timezone}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="e.g., UTC+8"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <input
                      type="text"
                      value={formData.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="e.g., Indonesian, Balinese"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <input
                      type="text"
                      value={formData.localCurrency}
                      onChange={(e) => handleInputChange('localCurrency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="e.g., Indonesian Rupiah (IDR)"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Travel Information Tab */}
            {activeTab === "travel" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Best Time to Visit
                    </label>
                    <input
                      type="text"
                      value={formData.bestTimeToVisit}
                      onChange={(e) => handleInputChange('bestTimeToVisit', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="e.g., April to October"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="e.g., 7-10 days"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => handleInputChange('difficulty', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    >
                      <option value="">Select difficulty</option>
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Challenging">Challenging</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Group Size
                    </label>
                    <input
                      type="text"
                      value={formData.groupSize}
                      onChange={(e) => handleInputChange('groupSize', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="e.g., 2-12 people"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === "pricing" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Starting Price *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.startingPrice}
                      onChange={(e) => handleInputChange('startingPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="e.g., 1299"
                    />
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
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                      <option value="IDR">IDR (Rp)</option>
                      <option value="INR">INR (₹)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === "media" && (
              <div className="space-y-4">
                <ImageUpload
                  onImageUpload={(url) => handleInputChange('mainImage', url)}
                  onGalleryUpload={handleGalleryChange}
                  existingImage={formData.mainImage}
                  existingGallery={formData.gallery}
                />
              </div>
            )}

            {/* Highlights Tab */}
            {activeTab === "highlights" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Highlights (comma-separated)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.highlights.join(', ')}
                    onChange={(e) => handleArrayInputChange('highlights', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Sacred Monkey Forest, Ubud Rice Terraces, Uluwatu Temple, Kuta Beach"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activities (comma-separated)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.activities.join(', ')}
                    onChange={(e) => handleArrayInputChange('activities', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Mount Batur Sunrise Trek, Ubud Cultural Tour, Bali Swing Experience"
                  />
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "additional" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newReview = {
                        id: Date.now().toString(),
                        name: "",
                        rating: 5,
                        comment: "",
                        date: new Date().toISOString().split('T')[0]
                      };
                      setFormData(prev => ({
                        ...prev,
                        reviews: [...prev.reviews, newReview]
                      }));
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Add Review
                  </button>
                </div>

                {formData.reviews.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No reviews added yet. Click &quot;Add Review&quot; to add customer reviews.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.reviews.map((review, index) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-gray-900">Review #{index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                reviews: prev.reviews.filter(r => r.id !== review.id)
                              }));
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Customer Name
                            </label>
                            <input
                              type="text"
                              value={review.name}
                              onChange={(e) => {
                                const updatedReviews = formData.reviews.map(r => 
                                  r.id === review.id ? { ...r, name: e.target.value } : r
                                );
                                setFormData(prev => ({ ...prev, reviews: updatedReviews }));
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                              placeholder="Customer name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Rating
                            </label>
                            <select
                              value={review.rating}
                              onChange={(e) => {
                                const updatedReviews = formData.reviews.map(r => 
                                  r.id === review.id ? { ...r, rating: parseInt(e.target.value) } : r
                                );
                                setFormData(prev => ({ ...prev, reviews: updatedReviews }));
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                            >
                              <option value={1}>1 Star</option>
                              <option value={2}>2 Stars</option>
                              <option value={3}>3 Stars</option>
                              <option value={4}>4 Stars</option>
                              <option value={5}>5 Stars</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Review Comment
                          </label>
                          <textarea
                            rows={3}
                            value={review.comment}
                            onChange={(e) => {
                              const updatedReviews = formData.reviews.map(r => 
                                r.id === review.id ? { ...r, comment: e.target.value } : r
                              );
                              setFormData(prev => ({ ...prev, reviews: updatedReviews }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                            placeholder="Customer review comment..."
                          />
                        </div>
                        
                        <div className="mt-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Review Date
                          </label>
                          <input
                            type="date"
                            value={review.date}
                            onChange={(e) => {
                              const updatedReviews = formData.reviews.map(r => 
                                r.id === review.id ? { ...r, date: e.target.value } : r
                              );
                              setFormData(prev => ({ ...prev, reviews: updatedReviews }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Updating...' : 'Update Destination'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
