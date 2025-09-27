"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../lib/api";

// Interface for package data from backend
interface Package {
  _id: string;
  title: string;
  subtitle: string;
  duration: string;
  nights: string;
  location: string;
  description: string;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  totalPrice: number;
  currency: string;
  mainImage: string;
  gallery: string[];
  activities: string[];
  highlights: string[];
  inclusions: string[];
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [duration, setDuration] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch(api.packages.getAll());
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPackages(data);
        setFilteredPackages(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching packages:', err);
        setError('Failed to load packages. Please try again later.');
        // Fallback to empty array
        setPackages([]);
        setFilteredPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Get unique destinations from packages
  const allDestinations = [...new Set(packages.map(pkg => pkg.location.split('•').map(loc => loc.trim()).flat()).flat())];
  
  // Get unique durations
  const allDurations = [...new Set(packages.map(pkg => pkg.duration))];

  // Filter packages based on selected filters
  useEffect(() => {
    let result = [...packages];
    
    // Filter by price range
    result = result.filter(pkg => 
      pkg.currentPrice >= priceRange[0] && pkg.currentPrice <= priceRange[1]
    );
    
    // Filter by duration
    if (duration.length > 0) {
      result = result.filter(pkg => duration.includes(pkg.duration));
    }
    
    // Filter by destination
    if (destinations.length > 0) {
      result = result.filter(pkg => {
        const packageLocations = pkg.location.split('•').map(loc => loc.trim());
        return destinations.some(dest => packageLocations.some(loc => loc.includes(dest)));
      });
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(pkg => 
        pkg.title.toLowerCase().includes(query) || 
        pkg.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredPackages(result);
  }, [packages, priceRange, duration, destinations, searchQuery]);

  // Handle duration filter change
  const handleDurationChange = (value: string) => {
    setDuration(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  // Handle destination filter change
  const handleDestinationChange = (value: string) => {
    setDestinations(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      {/* Hero Section */}
      <div className="relative h-[30vh] bg-blue-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-blue-800 opacity-90"></div>
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore Our Tour Packages</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Find your perfect getaway from our selection of carefully curated tour packages
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-300">Loading packages...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Packages</h3>
              <p className="text-gray-300 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Main Content - Only show when not loading and no error */}
        {!loading && !error && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6 text-white">Filters</h2>
              
              {/* Search */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Price Range</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">₹{priceRange[0].toLocaleString()}</span>
                  <span className="text-sm text-gray-400">₹{priceRange[1].toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
              
              {/* Duration */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Duration</h3>
                <div className="space-y-2">
                  {allDurations.map((dur, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={`duration-${index}`}
                        type="checkbox"
                        className="h-4 w-4 text-blue-500 focus:ring-blue-600 border-gray-600 rounded bg-gray-700"
                        checked={duration.includes(dur)}
                        onChange={() => handleDurationChange(dur)}
                      />
                      <label htmlFor={`duration-${index}`} className="ml-2 text-sm text-gray-300">
                        {dur}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Destinations */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Destinations</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
                  {allDestinations.map((dest, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={`destination-${index}`}
                        type="checkbox"
                        className="h-4 w-4 text-blue-500 focus:ring-blue-600 border-gray-600 rounded bg-gray-700"
                        checked={destinations.includes(dest)}
                        onChange={() => handleDestinationChange(dest)}
                      />
                      <label htmlFor={`destination-${index}`} className="ml-2 text-sm text-gray-300">
                        {dest}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reset Filters */}
              <button
                onClick={() => {
                  setPriceRange([0, 200000]);
                  setDuration([]);
                  setDestinations([]);
                  setSearchQuery("");
                }}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Package Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">{filteredPackages.length} Packages Found</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-300 mr-2">Sort by:</span>
                <select className="bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Duration: Short to Long</option>
                  <option>Duration: Long to Short</option>
                </select>
              </div>
            </div>
            
            {filteredPackages.length === 0 ? (
              <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">No packages found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your filters to find more options.</p>
                <button
                  onClick={() => {
                    setPriceRange([0, 200000]);
                    setDuration([]);
                    setDestinations([]);
                    setSearchQuery("");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <div key={pkg._id} className="bg-gray-800 rounded-lg shadow-md border border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <Link href={`/packages/${pkg._id}`}>
                      <div className="relative h-48">
                        <Image
                          src={pkg.mainImage}
                          alt={pkg.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-xs font-medium">
                          {pkg.duration}
                        </div>
                        {pkg.featured && (
                          <div className="absolute top-0 left-0 bg-yellow-500 text-black px-3 py-1 m-2 rounded-full text-xs font-medium">
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{pkg.title}</h3>
                        <p className="text-gray-300 text-sm mb-2">{pkg.location}</p>
                        <p className="text-gray-400 text-xs mb-3 line-clamp-2">{pkg.subtitle}</p>
                        <div className="flex items-center mb-3">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">4.0 (24 reviews)</span>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs text-gray-500 line-through">{pkg.currency} {pkg.originalPrice.toLocaleString()}</p>
                            <p className="text-lg font-bold text-blue-400">{pkg.currency} {pkg.currentPrice.toLocaleString()}</p>
                            <p className="text-xs text-green-400">Save {pkg.discount}%</p>
                          </div>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1 px-3 rounded transition-colors duration-300">
                            View Details
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {filteredPackages.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded-md bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded-md bg-blue-600 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-md bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-md bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700">
                    3
                  </button>
                  <button className="px-3 py-1 rounded-md bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}