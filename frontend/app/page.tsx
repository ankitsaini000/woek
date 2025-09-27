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
            <span className="inline-block px-4 py-1 border border-green-400 text-green-400 rounded-full text-sm mb-4 tracking-wider">DISCOVER THE WORLD</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
              <span className="block">KEEP TRAVEL ON</span>
              <span className="block text-green-400 mt-2 text-3xl md:text-4xl lg:text-5xl">Explore. Dream. Discover.</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto text-gray-200">Discover amazing places at exclusive deals with our premium travel packages</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/destinations" className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-md text-center transition-all duration-300 transform hover:scale-105 shadow-lg">
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
            <Link href="/packages" className="bg-green-500 text-white text-sm px-3 py-1 rounded-md">View All</Link>
          </div>
          
          {/* Mobile Slider View */}
          <div className="md:hidden">
            {packagesLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                <span className="ml-2 text-gray-600">Loading packages...</span>
              </div>
            ) : packagesError ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{packagesError}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : packages.length > 0 ? (
              <MobileSlider 
                tourPackages={packages.slice(0, 6).map(pkg => ({
                  id: pkg._id,
                  title: pkg.title,
                  location: pkg.location,
                  duration: pkg.duration,
                  nights: parseInt(pkg.duration.split('N')[0]) || 0,
                  days: parseInt(pkg.duration.split('/')[1]?.split('D')[0]) || 0,
                  price: pkg.currentPrice,
                  totalPrice: pkg.currentPrice * 2,
                  image: pkg.mainImage,
                  inclusions: pkg.inclusions || [],
                  activities: pkg.activities || [],
                  link: `/packages/${pkg._id}`
                }))}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No packages available at the moment.</p>
              </div>
            )}
          </div>
          
          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packagesLoading ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                <span className="ml-2 text-gray-600">Loading packages...</span>
              </div>
            ) : packagesError ? (
              <div className="col-span-full text-center py-12">
                <p className="text-red-600 mb-4">{packagesError}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : packages.length > 0 ? (
              packages.slice(0, 6).map((pkg) => (
                <TourCard 
                  key={pkg._id}
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
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">No packages available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Explore Top Destinations */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Explore Top Destinations</h2>
            <p className="text-gray-600 text-sm md:text-base">Discover the world&apos;s most exciting places</p>
          </div>
          
          {destinationsLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <span className="ml-2 text-gray-600">Loading destinations...</span>
            </div>
          ) : destinationsError ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{destinationsError}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : destinations.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {destinations.slice(0, 6).map((destination) => (
                <Link 
                  key={destination._id}
                  href={`/destinations/${destination._id}`} 
                  className="relative h-40 md:h-48 rounded-lg overflow-hidden group cursor-pointer transform transition-transform duration-300 hover:scale-105"
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
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No destinations available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Discount Offer */}
      <section className="py-12 md:py-16 bg-green-800 relative">
        <div className="container mx-auto px-4 sm:px-6 text-white text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Get 20% OFF Your First Trip</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">Limited time offer for new customers. Book your dream vacation today and save!</p>
          <Link href="/packages" className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md text-center transition duration-300">
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium">300+ Destinations</h3>
            </div>
            
            <div className="p-4">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium">Best Prices</h3>
            </div>
            
            <div className="p-4">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Choose Holiday Offer</h2>
            <p className="text-gray-600 text-sm md:text-base">Special deals for unforgettable experiences</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Offer 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Beach Resort"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">20% OFF</div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Luxury Beach Resort</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">All-inclusive beach resort with private cabanas and water activities.</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-500 font-bold">$1499</span>
                  <Link href="/packages/beach-resort" className="bg-green-500 text-white text-xs px-3 py-1 rounded-md">Book Now</Link>
                </div>
              </div>
            </div>
            
            {/* Offer 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Mountain Retreat"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">15% OFF</div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Mountain Retreat</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">Peaceful mountain getaway with hiking trails and spa treatments.</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-500 font-bold">$1299</span>
                  <Link href="/packages/mountain-retreat" className="bg-green-500 text-white text-xs px-3 py-1 rounded-md">Book Now</Link>
                </div>
              </div>
            </div>
            
            {/* Offer 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="City Explorer"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">25% OFF</div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">City Explorer</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">Urban adventure with guided tours, museum passes, and local cuisine.</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-500 font-bold">$999</span>
                  <Link href="/packages/city-explorer" className="bg-green-500 text-white text-xs px-3 py-1 rounded-md">Book Now</Link>
                </div>
              </div>
            </div>
          </div>
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
                  <h3 className="font-semibold">John Smith</h3>
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
                  <h3 className="font-semibold">Sarah Johnson</h3>
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
                  <h3 className="font-semibold">Michael Brown</h3>
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

      {/* Tour Guides */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Tour Guide</h2>
            <p className="text-gray-600 text-sm md:text-base">Our experienced and friendly guides</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Guide 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md text-center">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                  alt="David Wilson"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">David Wilson</h3>
                <p className="text-gray-600 text-sm">Adventure Specialist</p>
              </div>
            </div>
            
            {/* Guide 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md text-center">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80"
                  alt="Emma Davis"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Emma Davis</h3>
                <p className="text-gray-600 text-sm">Cultural Expert</p>
              </div>
            </div>
            
            {/* Guide 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md text-center">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                  alt="James Thompson"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">James Thompson</h3>
                <p className="text-gray-600 text-sm">Nature Guide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Latest News</h2>
            <p className="text-gray-600 text-sm md:text-base">Stay updated with travel tips and news</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* News 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80"
                  alt="Travel Tips"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 mb-2">June 15, 2023</div>
                <h3 className="text-lg font-semibold mb-2">10 Essential Travel Tips for 2023</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">Learn how to make the most of your travels with these expert tips.</p>
                <Link href="/blog/travel-tips" className="text-green-500 text-sm font-medium">Read More</Link>
              </div>
            </div>
            
            {/* News 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Hidden Gems"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 mb-2">May 28, 2023</div>
                <h3 className="text-lg font-semibold mb-2">5 Hidden Gems in Southeast Asia</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">Discover lesser-known destinations that offer authentic experiences.</p>
                <Link href="/blog/hidden-gems" className="text-green-500 text-sm font-medium">Read More</Link>
              </div>
            </div>
            
            {/* News 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Sustainable Travel"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 mb-2">April 10, 2023</div>
                <h3 className="text-lg font-semibold mb-2">Guide to Sustainable Travel</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">How to minimize your environmental impact while exploring the world.</p>
                <Link href="/blog/sustainable-travel" className="text-green-500 text-sm font-medium">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
