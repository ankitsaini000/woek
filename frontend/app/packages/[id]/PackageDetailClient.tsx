"use client";

import Image from "next/image";
import { useState } from "react";
import BookingModal from "./BookingModal";

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
  // Policy and Terms data
  packageDetails: {
    dateChangePolicy: string;
    cancellationPolicy: string;
    refundPolicy: string;
    bookingPolicy: string;
  };
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
  termsAndConditions: string[];
}

export default function PackageDetailClient({ packageData }: { packageData: Package }) {
  const [activeTab, setActiveTab] = useState("cancellation");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={packageData.mainImage}
            alt={packageData.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 z-10 text-white">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 border border-blue-400 text-blue-400 rounded-full text-sm mb-4 tracking-wider">{packageData.duration}</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight leading-tight">
              {packageData.title}
            </h1>
            <p className="text-xl mb-2">{packageData.location}</p>
            <p className="text-lg text-blue-200">{packageData.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Content */}
            <div className="lg:w-2/3">
              {/* Image Gallery */}
              <div className="bg-white rounded-lg shadow-sm mb-8">
                <div className="relative h-[300px] w-full rounded-t-lg overflow-hidden">
                  <Image
                    src={packageData.mainImage}
                    alt={packageData.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                {packageData.gallery && packageData.gallery.length > 0 && (
                  <div className="p-4 flex gap-2 overflow-x-auto">
                    {packageData.gallery.map((image, index) => (
                      <div key={index} className="relative h-20 w-32 flex-shrink-0 rounded overflow-hidden border-2 border-transparent hover:border-blue-500 cursor-pointer">
                        <Image
                          src={image}
                          alt={`${packageData.title} gallery ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 128px, 128px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tabs Section */}
              <div className="bg-white rounded-lg shadow-sm mb-8">
                <div className="border-b">
                  <div className="flex">
                    <button 
                      className={`px-6 py-4 font-medium ${activeTab === 'cancellation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('cancellation')}
                    >
                      Cancellation & Date Change
                    </button>
                    <button 
                      className={`px-6 py-4 font-medium ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('details')}
                    >
                      Package Details
                    </button>
                  </div>
                </div>

                {activeTab === 'cancellation' && (
                  <div className="p-6">
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4 text-black">Package Cancellation Policy</h3>
                      {packageData.packageDetails?.cancellationPolicy ? (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-black whitespace-pre-line">{packageData.packageDetails.cancellationPolicy}</p>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <p className="text-black">Cancellation policy not specified for this package.</p>
                        </div>
                      )}
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4 text-black">Package Date Change Policy</h3>
                      {packageData.packageDetails?.dateChangePolicy ? (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-black whitespace-pre-line">{packageData.packageDetails.dateChangePolicy}</p>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <p className="text-black">Date change policy not specified for this package.</p>
                        </div>
                      )}
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4 text-black">Refund Policy</h3>
                      {packageData.packageDetails?.refundPolicy ? (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-black whitespace-pre-line">{packageData.packageDetails.refundPolicy}</p>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <p className="text-black">Refund policy not specified for this package.</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-black">Booking Policy</h3>
                      {packageData.packageDetails?.bookingPolicy ? (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-black whitespace-pre-line">{packageData.packageDetails.bookingPolicy}</p>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <p className="text-black">Booking policy not specified for this package.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4 text-black">Package Overview</h3>
                      <p className="text-black mb-6">{packageData.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-black">{packageData.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                          </svg>
                          <span className="text-black">{packageData.nights} Nights</span>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-black">{packageData.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-black">Activities</h3>
                        <ul className="text-black">
                          {packageData.activities.map((activity, index) => (
                            <li key={index} className="flex items-center mb-3">
                              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-black">Trip Highlights</h3>
                        <ul className="text-black">
                          {packageData.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start mb-3">
                              <svg className="w-5 h-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                              </svg>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-black">Package Information</h3>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-black">
                          For detailed itinerary and booking information, please contact our travel experts. 
                          This package includes all the activities and highlights mentioned above.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="bg-white rounded-lg shadow-sm mb-8">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-black">Terms and Conditions</h3>
                  
                  {/* Basic Terms and Conditions */}
                  {packageData.termsAndConditions && packageData.termsAndConditions.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-black mb-3">General Terms</h4>
                      <div className="text-sm text-black space-y-2">
                        {packageData.termsAndConditions.map((term, index) => (
                          <p key={index} className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                            {term}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Detailed Terms and Conditions */}
                  {packageData.detailedTermsAndConditions && (
                    <div className="space-y-6">
                      {packageData.detailedTermsAndConditions.general && packageData.detailedTermsAndConditions.general.length > 0 && (
                        <div>
                          <h4 className="font-medium text-black mb-3">General Conditions</h4>
                          <div className="text-sm text-black space-y-2">
                            {packageData.detailedTermsAndConditions.general.map((term, index) => (
                              <p key={index} className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                {term}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {packageData.detailedTermsAndConditions.booking && packageData.detailedTermsAndConditions.booking.length > 0 && (
                        <div>
                          <h4 className="font-medium text-black mb-3">Booking Terms</h4>
                          <div className="text-sm text-black space-y-2">
                            {packageData.detailedTermsAndConditions.booking.map((term, index) => (
                              <p key={index} className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                {term}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {packageData.detailedTermsAndConditions.cancellation && packageData.detailedTermsAndConditions.cancellation.length > 0 && (
                        <div>
                          <h4 className="font-medium text-black mb-3">Cancellation Terms</h4>
                          <div className="text-sm text-black space-y-2">
                            {packageData.detailedTermsAndConditions.cancellation.map((term, index) => (
                              <p key={index} className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                {term}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {packageData.detailedTermsAndConditions.travel && packageData.detailedTermsAndConditions.travel.length > 0 && (
                        <div>
                          <h4 className="font-medium text-black mb-3">Travel Terms</h4>
                          <div className="text-sm text-black space-y-2">
                            {packageData.detailedTermsAndConditions.travel.map((term, index) => (
                              <p key={index} className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                {term}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {packageData.detailedTermsAndConditions.health && packageData.detailedTermsAndConditions.health.length > 0 && (
                        <div>
                          <h4 className="font-medium text-black mb-3">Health & Safety</h4>
                          <div className="text-sm text-black space-y-2">
                            {packageData.detailedTermsAndConditions.health.map((term, index) => (
                              <p key={index} className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                {term}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {packageData.detailedTermsAndConditions.insurance && packageData.detailedTermsAndConditions.insurance.length > 0 && (
                        <div>
                          <h4 className="font-medium text-black mb-3">Insurance Terms</h4>
                          <div className="text-sm text-black space-y-2">
                            {packageData.detailedTermsAndConditions.insurance.map((term, index) => (
                              <p key={index} className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                {term}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {packageData.detailedTermsAndConditions.liability && packageData.detailedTermsAndConditions.liability.length > 0 && (
                        <div>
                          <h4 className="font-medium text-black mb-3">Liability Terms</h4>
                          <div className="text-sm text-black space-y-2">
                            {packageData.detailedTermsAndConditions.liability.map((term, index) => (
                              <p key={index} className="flex items-start">
                                <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                {term}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Fallback if no terms are available */}
                  {(!packageData.termsAndConditions || packageData.termsAndConditions.length === 0) && 
                   (!packageData.detailedTermsAndConditions || 
                    Object.values(packageData.detailedTermsAndConditions).every(arr => !arr || arr.length === 0)) && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-black">No specific terms and conditions available for this package.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-gray-900">{packageData.currency} {packageData.currentPrice.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 line-through">{packageData.currency} {packageData.originalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{packageData.discount}% OFF</span>
                    <span className="text-xs text-gray-500 ml-2">per person</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Total Price: <span className="font-semibold">{packageData.currency} {packageData.totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-b py-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span className="text-black font-medium">DEPARTURE</span>
                    </div>
                    <span className="text-blue-600 font-medium">Select Date</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      <span className="text-black font-medium">TRAVELERS</span>
                    </div>
                    <span className="text-blue-600 font-medium">2 Adults</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-2 text-black">INCLUSIONS</h4>
                  <ul className="text-sm text-black space-y-1">
                    {packageData.inclusions.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-2 text-black">PACKAGE DETAILS</h4>
                  <div className="space-y-2 text-sm text-black">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{packageData.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nights:</span>
                      <span className="font-medium">{packageData.nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="font-medium">{packageData.location}</span>
                    </div>
                    {packageData.featured && (
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-medium text-yellow-600">Featured Package</span>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-300 mb-3"
                >
                  Book Now
                </button>
                
                <div className="text-center">
                  <p className="text-xs text-black">Best Price Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        packageData={{
          _id: packageData._id,
          title: packageData.title,
          currentPrice: packageData.currentPrice,
          currency: packageData.currency,
          duration: packageData.duration,
          location: packageData.location
        }}
      />
    </div>
  );
}