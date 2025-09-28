"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TourCard from "./components/TourCard";
import MobileSlider from "./components/MobileSlider";
import { api } from "../lib/api";

// Interface for package data from backend
interface Package {
  _id: string;
  title: string;
  location: string;
  duration: string;
  currentPrice: number;
  currency: string;
  mainImage: string;
  highlights: string[];
  activities: string[];
  inclusions: string[];
  discountPercentage?: number;
  description?: string;
}

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
  averagePrice: number;
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
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);
  const [destinationsLoading, setDestinationsLoading] = useState(true);
  const [packagesError, setPackagesError] = useState<string | null>(null);
  const [destinationsError, setDestinationsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setPackagesLoading(true);
        const response = await fetch(api.packages.getAll());

        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }

        const data = await response.json();
        setPackages(data);
      } catch (err) {
        console.error('Error fetching packages:', err);
        setPackagesError('Failed to load packages. Please try again later.');
      } finally {
        setPackagesLoading(false);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setDestinationsLoading(true);
        const response = await fetch(api.destinations.getAll());

        if (!response.ok) {
          throw new Error('Failed to fetch destinations');
        }

        const data = await response.json();
        setDestinations(data);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setDestinationsError('Failed to load destinations. Please try again later.');
      } finally {
        setDestinationsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Beautiful travel destination"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 z-10 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1 border border-blue-400 text-blue-400 rounded-full text-sm mb-4 tracking-wider">DISCOVER THE WORLD</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
              <span className="block">KEEP TRAVEL ON</span>
              <span className="block text-blue-400 mt-2 text-3xl md:text-4xl lg:text-5xl">Explore. Dream. Discover.</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto text-gray-200">Discover amazing places at exclusive deals with our premium travel packages</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/destinations" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md text-center transition-all duration-300 transform hover:scale-105 shadow-lg">
                Explore Now
              </Link>
              <Link href="/packages" className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-8 rounded-md text-center transition-all duration-300 transform hover:scale-105">
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tour Packages */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl md:text-3xl font-bold">Popular Tour Packages</h2>
            <Link href="/packages" className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md">View All</Link>
          </div>
          
          {packagesLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">Loading packages...</span>
            </div>
          ) : packagesError ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{packagesError}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : packages.length > 0 ? (
            <div className="relative">
              {/* Navigation Buttons */}
              <div className="absolute top-0 right-0 z-10 flex space-x-2 mb-4">
                <button 
                  onClick={() => {
                    const container = document.getElementById('popular-packages-slider');
                    if (container) {
                      container.scrollBy({ left: -400, behavior: 'smooth' });
                    }
                  }}
                  className="bg-white/90 hover:bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => {
                    const container = document.getElementById('popular-packages-slider');
                    if (container) {
                      container.scrollBy({ left: 400, behavior: 'smooth' });
                    }
                  }}
                  className="bg-white/90 hover:bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              {/* Popular Packages Slider - Always show 3 cards */}
              <div 
                id="popular-packages-slider"
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {packages.map((pkg) => (
                  <div key={pkg._id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3">
                    <TourCard 
                      title={pkg.title}
                      location={pkg.location}
                      duration={pkg.duration}
                      nights={parseInt(pkg.duration.split('N')[0]) || 0}
                      days={parseInt(pkg.duration.split('/')[1]?.split('D')[0]) || 0}
                      price={pkg.currentPrice}
                      totalPrice={pkg.currentPrice * 2}
                      image={pkg.mainImage}
                      inclusions={pkg.inclusions || []}
                      activities={pkg.activities || []}
                      id={pkg._id}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No packages available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Explore Top Destinations */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-black">Explore Top Destinations</h2>
            <p className="text-gray-600 text-sm md:text-base">Discover the world&apos;s most exciting places</p>
          </div>
          
          {destinationsLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">Loading destinations...</span>
            </div>
          ) : destinationsError ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{destinationsError}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : destinations.length > 0 ? (
            <div className="relative">
              {/* Navigation Buttons */}
              <div className="absolute top-0 right-0 z-10 flex space-x-2 mb-4">
                <button 
                  onClick={() => {
                    const container = document.getElementById('destinations-slider');
                    if (container) {
                      container.scrollBy({ left: -400, behavior: 'smooth' });
                    }
                  }}
                  className="bg-white/90 hover:bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => {
                    const container = document.getElementById('destinations-slider');
                    if (container) {
                      container.scrollBy({ left: 400, behavior: 'smooth' });
                    }
                  }}
                  className="bg-white/90 hover:bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              {/* Destinations Slider - Always show 3 cards */}
              <div 
                id="destinations-slider"
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {destinations.map((destination) => (
                  <div key={destination._id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3">
                    <Link 
                      href={`/destinations/${destination._id}`} 
                      className="relative h-40 md:h-48 rounded-lg overflow-hidden group cursor-pointer transform transition-transform duration-300 hover:scale-105 block"
                    >
                      <Image
                        src={destination.mainImage}
                        alt={destination.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <h3 className="font-bold text-lg">{destination.name}</h3>
                        <p className="text-sm text-gray-200">{destination.country}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No destinations available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Discount Offer */}
      <section className="py-12 md:py-16 bg-blue-800 relative">
        <div className="container mx-auto px-4 sm:px-6 text-white text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Get 20% OFF Your First Trip</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">Limited time offer for new customers. Book your dream vacation today and save!</p>
          <Link href="/packages" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md text-center transition duration-300">
            Book Now
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium">300+ Destinations</h3>
            </div>
            
            <div className="p-4">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium">Best Prices</h3>
            </div>
            
            <div className="p-4">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium">24/7 Support</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Holiday Offers */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-black">Choose Holiday Offer</h2>
            <p className="text-gray-600 text-sm md:text-base">Special deals for unforgettable experiences</p>
          </div>
          
          {packagesLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">Loading packages...</span>
            </div>
          ) : packagesError ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{packagesError}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : packages.length > 0 ? (
            <div className="relative">
              {/* Navigation Buttons */}
              <div className="absolute top-0 right-0 z-10 flex space-x-2 mb-4">
                <button 
                  onClick={() => {
                    const container = document.getElementById('packages-slider');
                    if (container) {
                      container.scrollBy({ left: -400, behavior: 'smooth' });
                    }
                  }}
                  className="bg-white/90 hover:bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => {
                    const container = document.getElementById('packages-slider');
                    if (container) {
                      container.scrollBy({ left: 400, behavior: 'smooth' });
                    }
                  }}
                  className="bg-white/90 hover:bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              {/* Packages Slider - Always show 3 cards */}
              <div 
                id="packages-slider"
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {packages.map((pkg) => (
                  <div key={pkg._id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md h-full">
                      <div className="relative h-48">
                        <Image
                          src={pkg.mainImage || "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"}
                          alt={pkg.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        {pkg.discountPercentage && pkg.discountPercentage > 0 && (
                          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            {pkg.discountPercentage}% OFF
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{pkg.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{pkg.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-500 font-bold">${pkg.currentPrice}</span>
                          <Link href={`/packages/${pkg._id}`} className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No packages available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">What Our Clients Say About Us</h2>
            <p className="text-gray-600 text-sm md:text-base">Trusted by thousands of travelers worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">J</div>
                <div>
                  <h3 className="font-semibold text-black">John Smith</h3>
                  <div className="flex text-yellow-400 text-xs">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">&ldquo;Amazing experience! The tour was well organized and our guide was knowledgeable and friendly. Will definitely book with them again.&rdquo;</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">S</div>
                <div>
                  <h3 className="font-semibold text-black">Sarah Johnson</h3>
                  <div className="flex text-yellow-400 text-xs">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">&ldquo;The best travel agency I&apos;ve ever used. They took care of everything and made our family vacation stress-free and memorable.&rdquo;</p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">M</div>
                <div>
                  <h3 className="font-semibold text-black">Michael Brown</h3>
                  <div className="flex text-yellow-400 text-xs">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">&ldquo;Excellent service and great value for money. The accommodations were top-notch and the itinerary was perfect for our needs.&rdquo;</p>
            </div>
          </div>
        </div>
      </section>


      {/* Latest News */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Latest News</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Stay updated with travel tips, destination guides, and industry insights</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* News 1 */}
            <article className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80"
                  alt="Travel Tips"
                  fill
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Travel Tips</span>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  June 15, 2023
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">10 Essential Travel Tips for 2023</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">Learn how to make the most of your travels with these expert tips and insider knowledge from seasoned travelers.</p>
                <div className="flex items-center justify-between">
                  <Link href="/blog/travel-tips" className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors duration-300">
                    Read More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  <div className="flex items-center text-xs text-gray-400">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    2.5k views
                  </div>
                </div>
              </div>
            </article>
            
            {/* News 2 */}
            <article className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Hidden Gems"
                  fill
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Destinations</span>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  May 28, 2023
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">5 Hidden Gems in Southeast Asia</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">Discover lesser-known destinations that offer authentic experiences away from the tourist crowds.</p>
                <div className="flex items-center justify-between">
                  <Link href="/blog/hidden-gems" className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors duration-300">
                    Read More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  <div className="flex items-center text-xs text-gray-400">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    1.8k views
                  </div>
                </div>
              </div>
            </article>
            
            {/* News 3 */}
            <article className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Sustainable Travel"
                  fill
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Sustainability</span>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  April 10, 2023
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Guide to Sustainable Travel</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">How to minimize your environmental impact while exploring the world responsibly.</p>
                <div className="flex items-center justify-between">
                  <Link href="/blog/sustainable-travel" className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors duration-300">
                    Read More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  <div className="flex items-center text-xs text-gray-400">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    3.2k views
                  </div>
                </div>
              </div>
            </article>
          </div>
          
        </div>
      </section>
    </div>
  );
}
