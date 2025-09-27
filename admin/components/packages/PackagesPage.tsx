"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { AddPackageModal } from "@/components/packages/AddPackageModal";
import { EditPackageModal } from "@/components/packages/EditPackageModal";
import { Plus, Search, Edit, Trash2, MapPin, Calendar, Star } from "lucide-react";

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
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  inclusions: string[];
  hotels: Array<{
    name: string;
    rating: number;
    location: string;
  }>;
  termsAndConditions: string[];
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
  featured: boolean;
  active: boolean;
  createdAt: string;
}

export function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/packages`);
      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }
      const data = await response.json();
      setPackages(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Fetch packages error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPackages = packages.filter(pkg =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsEditModalOpen(true);
  };

  const handleDeletePackage = async (pkg: Package) => {
    if (!confirm(`Are you sure you want to delete "${pkg.title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/packages/${pkg._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete package');
      }

      fetchPackages(); // Refresh the list
      console.log('Package deleted successfully');
    } catch (err: unknown) {
      console.error('Delete error:', err);
      alert('Failed to delete package: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading packages...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex-1 p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Travel Packages</h1>
                <p className="text-gray-600">Manage your travel packages and itineraries</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Package</span>
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Packages Grid */}
            {filteredPackages.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Calendar className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No packages found' : 'No packages yet'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm 
                    ? 'Try adjusting your search terms' 
                    : 'Get started by creating your first travel package'
                  }
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Create Package
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <div key={pkg._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Package Image */}
                    <div className="relative h-48">
                      <Image
                        src={pkg.mainImage || '/placeholder-package.jpg'}
                        alt={pkg.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                      {pkg.featured && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                          Featured
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        {pkg.discount}% OFF
                      </div>
                    </div>

                    {/* Package Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                          {pkg.title}
                        </h3>
                        <div className="flex space-x-1 ml-2">
                          <button
                            onClick={() => handleEditPackage(pkg)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Edit package"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePackage(pkg)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete package"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                        {pkg.subtitle}
                      </p>

                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{pkg.location}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{pkg.duration}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-green-600">
                            {pkg.currency} {pkg.currentPrice.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {pkg.currency} {pkg.originalPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="h-4 w-4 mr-1" />
                          <span>{pkg.activities.length} activities</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Package Modal */}
      <AddPackageModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          fetchPackages();
          console.log("Package created successfully");
        }}
      />

      {/* Edit Package Modal */}
      <EditPackageModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPackage(null);
        }}
        onSuccess={() => {
          fetchPackages();
          console.log("Package updated successfully");
        }}
        package={selectedPackage}
      />
    </div>
  );
}
