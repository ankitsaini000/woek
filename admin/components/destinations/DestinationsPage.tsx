"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { AddDestinationModal } from "@/components/destinations/AddDestinationModal";
import { EditDestinationModal } from "@/components/destinations/EditDestinationModal";
import { Plus, Search, Edit, Trash2, MapPin } from "lucide-react";

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
  createdAt: string;
}

export function DestinationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch destinations from API
  const fetchDestinations = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('authToken');
      
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/destinations`, {
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch destinations');
      }

      const data = await response.json();
      console.log('Fetched destinations data:', data);
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setDestinations(data);
      } else {
        console.error('Expected array but got:', typeof data, data);
        setDestinations([]);
      }
      setError(""); // Clear any previous errors
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching destinations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load destinations on component mount
  useEffect(() => {
    fetchDestinations();
  }, []);

  // Handle edit destination
  const handleEditDestination = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsEditModalOpen(true);
  };

  // Handle delete destination
  const handleDeleteDestination = async (destination: Destination) => {
    if (!confirm(`Are you sure you want to delete "${destination.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/destinations/${destination._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete destination');
      }

      // Refresh the list
      fetchDestinations();
      console.log('Destination deleted successfully');
    } catch (err: unknown) {
      console.error('Delete error:', err);
      alert('Failed to delete destination: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const filteredDestinations = (destinations || []).filter(destination =>
    destination?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination?.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Destinations Management</h1>
            <p className="text-gray-600">Manage your travel destinations</p>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Destination</span>
              </button>
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-600">Loading destinations...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              ) : filteredDestinations.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No destinations found</h3>
                  <p className="text-gray-500">
                    {searchTerm ? 'No destinations match your search.' : 'Get started by adding your first destination.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDestinations.map((destination) => (
                    <div key={destination._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <Image
                          src={destination.mainImage}
                          alt={destination.name}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                          }}
                        />
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            Active
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <h3 className="text-lg font-semibold text-gray-900">{destination.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{destination.country}</p>
                        <p className="text-sm text-gray-500 mb-2">{destination.shortDescription}</p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-semibold text-blue-600">
                            ${destination.startingPrice} {destination.currency}
                          </span>
                          {destination.featured && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleEditDestination(destination)}
                            className="text-blue-600 hover:text-blue-900 p-2"
                            title="Edit destination"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteDestination(destination)}
                            className="text-red-600 hover:text-red-900 p-2"
                            title="Delete destination"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add Destination Modal */}
      <AddDestinationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          // Refresh destinations list
          fetchDestinations();
          console.log("Destination created successfully");
        }}
      />

      {/* Edit Destination Modal */}
      <EditDestinationModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedDestination(null);
        }}
        onSuccess={() => {
          // Refresh destinations list
          fetchDestinations();
          console.log("Destination updated successfully");
        }}
        destination={selectedDestination}
      />
    </div>
  );
}
