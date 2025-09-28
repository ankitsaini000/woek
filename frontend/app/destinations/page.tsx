"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../lib/api";

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
  createdAt: string;
  updatedAt: string;
}

export default function Destinations() {
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch destinations from backend
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const response = await fetch(api.destinations.getAll());
        
        if (!response.ok) {
          throw new Error('Failed to fetch destinations');
        }
        
        const data = await response.json();
        console.log('Fetched destinations data:', data);
        setDestinations(data);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError('Failed to load destinations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Component for individual destination card with enhanced modern design
  const DestinationCard = ({ destination }: { destination: Destination }) => {
    
    return (
      <div 
        className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-700"
        onClick={() => router.push(`/destinations/${destination._id}`)}
      >
        {/* Image container with gradient overlay */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={destination.mainImage}
            alt={destination.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
          
          {/* Destination name overlay */}
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
            <div className="flex items-center">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="text-sm font-medium text-white">{destination.averageRating?.toFixed(1) || '4.8'}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <p className="text-sm text-gray-300 mb-4 line-clamp-2 h-10">{destination.shortDescription}</p>
          
          <div className="flex items-center text-gray-400 text-sm mb-4">
            <div className="flex items-center mr-4">
              <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{destination.duration || '5-7 days'}</span>
            </div>
            
            {destination.highlights && destination.highlights.length > 0 && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{destination.highlights.length} Highlights</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">From</span>
              <p className="text-xl font-bold text-blue-400">
                {destination.currency || 'USD'} {destination.startingPrice?.toLocaleString() || '999'}
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md">
              Explore
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen text-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 mb-8">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-300">Loading destinations...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen text-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 mb-8">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-200 mb-2">Error Loading Destinations</h2>
                <p className="text-gray-300 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      {/* Hero Section */}
      <div className="relative h-[30vh] bg-blue-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-blue-800 opacity-90"></div>
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Discover Amazing Places</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Explore the world&apos;s most breathtaking destinations
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                Discover Amazing Places
              </h1>
              <p className="text-gray-300 text-lg">Explore the world&apos;s most breathtaking destinations</p>
            </div>
            
            <div className="mt-6 md:mt-0 flex space-x-3">
              <div className="relative">
                <select className="appearance-none pl-4 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-xl text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Sort by: Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Duration: Short to Long</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              
              <button className="p-3 bg-gray-700 border border-gray-600 rounded-xl text-blue-400 hover:bg-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          {destinations.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">No Destinations Found</h3>
              <p className="text-gray-400">Check back later for amazing destinations!</p>
            </div>
          ) : (
            <div className="relative">
              {/* Navigation Buttons */}
              <div className="absolute top-0 right-0 z-10 flex space-x-2 mb-4">
                <button 
                  onClick={() => {
                    const container = document.getElementById('destinations-page-slider');
                    if (container) {
                      container.scrollBy({ left: -400, behavior: 'smooth' });
                    }
                  }}
                  className="bg-gray-700/90 hover:bg-gray-600 shadow-md rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => {
                    const container = document.getElementById('destinations-page-slider');
                    if (container) {
                      container.scrollBy({ left: 400, behavior: 'smooth' });
                    }
                  }}
                  className="bg-gray-700/90 hover:bg-gray-600 shadow-md rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              {/* Destinations Slider - Always show 3 cards */}
              <div 
                id="destinations-page-slider"
                className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {destinations.map((destination) => (
                  <div key={destination._id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3">
                    <DestinationCard destination={destination} />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-12 flex justify-center">
            <nav className="inline-flex rounded-xl shadow-sm overflow-hidden">
              <button className="px-4 py-3 bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700 transition-colors font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button className="px-5 py-3 bg-blue-600 text-white font-medium">
                1
              </button>
              <button className="px-5 py-3 bg-gray-800 border-t border-b border-gray-700 text-gray-300 hover:bg-gray-700 transition-colors font-medium">
                2
              </button>
              <button className="px-5 py-3 bg-gray-800 border-t border-b border-gray-700 text-gray-300 hover:bg-gray-700 transition-colors font-medium">
                3
              </button>
              <button className="px-4 py-3 bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 transition-colors font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}