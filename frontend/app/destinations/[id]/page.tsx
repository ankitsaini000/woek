"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../lib/api";
import DestinationBookingModal from "./DestinationBookingModal";

// Interface for destination data from backend
interface Destination {
  _id: string;
  title: string;
  name: string;
  country: string;
  region?: string;
  description: string;
  shortDescription: string;
  mainImage: string;
  gallery: string[];
  highlights: string[];
  activities: string[];
  bestTimeToVisit: string;
  averageRating: number;
  totalReviews: number;
  startingPrice: number;
  currency: string;
  duration: string;
  featured: boolean;
  active: boolean;
  location?: string;
  language?: string;
  localCurrency?: string;
  timezone?: string;
  latitude?: string;
  longitude?: string;
  reviews: Array<{
    id: string;
    name: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

// Fetch destination data from backend API
const fetchDestinationData = async (id: string): Promise<Destination> => {
  const response = await fetch(api.destinations.getById(id));
  
  if (!response.ok) {
    throw new Error('Failed to fetch destination');
  }
  
  const data = await response.json();
  console.log('Fetched destination data:', data);
  return data;
};

export default function DestinationDetail() {
  const params = useParams();
  const router = useRouter();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchDestination = async () => {
      if (params.id) {
        try {
          setIsLoading(true);
          setError(null);
          const id = Array.isArray(params.id) ? params.id[0] : params.id;
          const data = await fetchDestinationData(id);
          setDestination(data);
        } catch (err) {
          console.error('Error fetching destination:', err);
          setError('Failed to load destination. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchDestination();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading destination...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-4 text-black">Error Loading Destination</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mr-4"
          >
            Try Again
          </button>
          <button 
            onClick={() => router.push('/destinations')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🌍</div>
          <h1 className="text-2xl font-bold mb-4 text-black">Destination not found</h1>
          <p className="text-gray-600 mb-6">The destination you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <button 
            onClick={() => router.push('/destinations')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={destination.mainImage}
            alt={destination.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 container mx-auto">
          <button 
            onClick={() => router.push('/destinations')}
            className="absolute top-8 left-8 flex items-center text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/50 transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <span className="text-white text-sm uppercase tracking-wider mb-2 inline-block">Destination</span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{destination.name}</h1>
              <div className="flex items-center text-white mb-4">
                <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="mr-4">{destination.averageRating?.toFixed(1) || '4.8'} Rating</span>
                <span className="mr-4">|</span>
                <span>{destination.duration}</span>
              </div>
              <p className="text-white max-w-2xl">{destination.description}</p>
            </div>
            
            <div className="mt-6 md:mt-0">
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 text-black shadow-lg">
                <p className="text-sm uppercase tracking-wider mb-1 text-black">Starting from</p>
                <p className="text-3xl font-bold text-black mb-4">
                  {destination.currency || 'USD'} {destination.startingPrice?.toLocaleString() || '999'}
                </p>
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg">
                  Book This Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white shadow-md z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button 
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 ${activeTab === 'activities' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('activities')}
            >
              Activities
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 ${activeTab === 'gallery' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 ${activeTab === 'reviews' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-black mb-6">About {destination.name}</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                {destination.description}
              </p>
              
              {/* Destination Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Location</h3>
                      <p className="text-gray-600">{destination.country}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Best Time to Visit</h3>
                      <p className="text-gray-600">{destination.bestTimeToVisit || 'Year-round'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Language</h3>
                      <p className="text-gray-600">{destination.language || 'Local language'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Currency</h3>
                      <p className="text-gray-600">{destination.localCurrency || destination.currency || 'Local currency'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Highlights Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-black">Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                      <div className="bg-indigo-100 p-2 rounded-full mr-4">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-gray-800">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Booking Widget */}
            <div>
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4 text-black">Ready to Experience {destination.name.split(',')[0]}?</h3>
                <p className="text-gray-600 mb-6">Book your dream vacation today and get exclusive deals!</p>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Travel Dates</label>
                    <div className="flex space-x-2">
                      <input type="date" className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      <input type="date" className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Travelers</label>
                    <select className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>1 Adult</option>
                      <option>2 Adults</option>
                      <option>2 Adults, 1 Child</option>
                      <option>2 Adults, 2 Children</option>
                      <option>More options</option>
                    </select>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg mb-4"
                >
                  Book Now
                </button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">Secure booking with instant confirmation</p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800">Price</span>
                    <span className="font-bold text-xl text-black">
                      {destination.currency || 'USD'} {destination.startingPrice?.toLocaleString() || '999'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'activities' && (
          <div>
            <h2 className="text-2xl font-bold text-black mb-8">Popular Activities in {destination.name.split(',')[0]}</h2>
            {destination.activities && destination.activities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destination.activities.map((activity, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{activity}</h3>
                        <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                          <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="text-sm font-medium text-black">{destination.averageRating?.toFixed(1) || '4.8'}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">Experience this amazing activity in {destination.name}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-gray-500 text-sm">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>{destination.duration}</span>
                        </div>
                        <span className="font-bold text-indigo-600">
                          {destination.currency || 'USD'} {destination.startingPrice?.toLocaleString() || '999'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Activities Listed</h3>
                <p className="text-gray-600">Activity information will be added soon!</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'gallery' && (
          <div>
            <h2 className="text-2xl font-bold text-black mb-8">Photo Gallery</h2>
            {destination.gallery && destination.gallery.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {destination.gallery.map((image, index) => (
                  <div key={index} className="aspect-video relative overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`${destination.name} gallery ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📸</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Gallery Available</h3>
                <p className="text-gray-600">Gallery images will be added soon!</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-2xl font-bold text-black mb-8">Traveler Reviews</h2>
            {destination.reviews && destination.reviews.length > 0 ? (
              <div className="space-y-6">
                {destination.reviews.map((review, index) => (
                  <div key={review.id || index} className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                        <span className="text-gray-600 font-medium text-lg">
                          {review.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-black">{review.name}</h3>
                        <div className="flex items-center">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'fill-none stroke-current'}`} 
                                viewBox="0 0 20 20" 
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">Visited {review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                <p className="text-gray-600">Be the first to share your experience at this destination!</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for an Unforgettable Adventure?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">Book your trip to Bali today and create memories that will last a lifetime.</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg">
            Start Planning Your Trip
          </button>
        </div>
      </div>

      {/* Destination Booking Modal */}
      <DestinationBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        destinationId={params.id as string}
      />
    </div>
  );
}