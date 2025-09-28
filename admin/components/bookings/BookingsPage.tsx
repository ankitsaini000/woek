"use client";

import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Search, Eye, CheckCircle, XCircle, RefreshCw, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { BookingDetailsModal } from "./BookingDetailsModal";
import { DestinationBookingDetailsModal } from "./DestinationBookingDetailsModal";

interface Booking {
  _id: string;
  bookingReference: string;
  packageId: {
    _id: string;
    title: string;
    currentPrice: number;
    currency: string;
    duration: string;
    location: string;
  };
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  travelDate: string;
  numberOfTravelers: number;
  totalAmount: number;
  bookingStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  bookingDate: string;
  createdAt: string;
  updatedAt: string;
}

interface DestinationBooking {
  _id: string;
  bookingReference: string;
  destinationId: {
    _id: string;
    name: string;
    title: string;
    country: string;
    region?: string;
    description: string;
    mainImage: string;
    startingPrice: number;
    currency: string;
    bestTimeToVisit?: string;
    duration?: string;
    difficulty?: string;
    highlights?: string[];
    activities?: string[];
  };
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  travelDate: string;
  numberOfTravelers: number;
  specialRequests?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  dietaryRequirements?: string;
  medicalConditions?: string;
  totalAmount: number;
  bookingStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export function BookingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [destinationBookings, setDestinationBookings] = useState<DestinationBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [destinationBookingsLoading, setDestinationBookingsLoading] = useState(true);
  const [error, setError] = useState("");
  const [destinationBookingsError, setDestinationBookingsError] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'packages' | 'destinations'>('packages');
  const { authToken } = useAuth();

  // Fetch bookings from backend
  const fetchBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      
      console.log('Fetching bookings from:', `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/bookings/admin/all`);
      console.log('Auth token present:', !!authToken);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/bookings/admin/all`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to fetch bookings: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('Bookings data received:', data);
      setBookings(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching bookings:', err);
    } finally {
      setIsLoading(false);
    }
  }, [authToken]);

  // Fetch destination bookings from backend
  const fetchDestinationBookings = useCallback(async () => {
    try {
      setDestinationBookingsLoading(true);
      setDestinationBookingsError("");
      
      console.log('Fetching destination bookings from:', `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/destination-bookings/admin/all`);
      console.log('Auth token present:', !!authToken);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/destination-bookings/admin/all`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      console.log('Destination bookings response status:', response.status);
      console.log('Destination bookings response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Destination bookings API Error Response:', errorText);
        throw new Error(`Failed to fetch destination bookings: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('Destination bookings data received:', data);
      setDestinationBookings(data);
    } catch (err: unknown) {
      setDestinationBookingsError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching destination bookings:', err);
    } finally {
      setDestinationBookingsLoading(false);
    }
  }, [authToken]);

  useEffect(() => {
    if (authToken) {
      fetchBookings();
      fetchDestinationBookings();
    } else {
      setIsLoading(false);
      setDestinationBookingsLoading(false);
      setError("Please log in to view bookings");
      setDestinationBookingsError("Please log in to view destination bookings");
    }
  }, [authToken, fetchBookings, fetchDestinationBookings]);

  const filteredBookings = bookings.filter(booking =>
    (booking.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (booking.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (booking.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (booking.packageId?.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (booking.packageId?.location?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (booking.bookingReference?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const filteredDestinationBookings = destinationBookings.filter(booking =>
    (booking.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (booking.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (booking.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (booking.destinationId?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (booking.destinationId?.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (booking.destinationId?.country?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (booking.bookingReference?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case "pending":
        return <div className="h-4 w-4 rounded-full bg-yellow-400"></div>;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(amount);
  };

  const handleViewBooking = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedBookingId(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
                <p className="text-gray-600">Manage customer bookings and reservations</p>
              </div>
              <button
                onClick={() => {
                  fetchBookings();
                  fetchDestinationBookings();
                }}
                disabled={isLoading || destinationBookingsLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${(isLoading || destinationBookingsLoading) ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          {destinationBookingsError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {destinationBookingsError}
            </div>
          )}

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('packages')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'packages'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Package Bookings ({bookings.length})
                </button>
                <button
                  onClick={() => setActiveTab('destinations')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'destinations'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Destination Bookings ({destinationBookings.length})
                </button>
              </nav>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab === 'packages' ? 'package' : 'destination'} bookings...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {activeTab === 'packages' 
                    ? `${filteredBookings.length} booking${filteredBookings.length !== 1 ? 's' : ''} found`
                    : `${filteredDestinationBookings.length} booking${filteredDestinationBookings.length !== 1 ? 's' : ''} found`
                  }
                </div>
              </div>
            </div>

            {(activeTab === 'packages' && isLoading) || (activeTab === 'destinations' && destinationBookingsLoading) ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading {activeTab} bookings...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {activeTab === 'packages' ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Package
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Travel Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booking Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                            {searchTerm ? 'No package bookings found matching your search.' : 'No package bookings found.'}
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((booking) => (
                          <tr key={booking._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {booking.firstName} {booking.lastName}
                                </div>
                                <div className="text-sm text-gray-500">{booking.email}</div>
                                <div className="text-xs text-gray-400">Ref: {booking.bookingReference}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {booking.packageId?.title || 'N/A'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {booking.packageId?.location || 'N/A'}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {booking.numberOfTravelers} traveler{booking.numberOfTravelers !== 1 ? 's' : ''}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatDate(booking.travelDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatCurrency(booking.totalAmount, booking.packageId?.currency || 'USD')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {getStatusIcon(booking.bookingStatus)}
                                <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.bookingStatus)}`}>
                                  {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                                {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(booking.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button 
                                onClick={() => handleViewBooking(booking._id)}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                                title="View booking details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Destination
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Travel Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booking Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDestinationBookings.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                            {searchTerm ? 'No destination bookings found matching your search.' : 'No destination bookings found.'}
                          </td>
                        </tr>
                      ) : (
                        filteredDestinationBookings.map((booking) => (
                          <tr key={booking._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {booking.firstName} {booking.lastName}
                                </div>
                                <div className="text-sm text-gray-500">{booking.email}</div>
                                <div className="text-xs text-gray-400">Ref: {booking.bookingReference}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {booking.destinationId?.name || 'N/A'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {booking.destinationId?.country || 'N/A'}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {booking.numberOfTravelers} traveler{booking.numberOfTravelers !== 1 ? 's' : ''}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatDate(booking.travelDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ${booking.totalAmount.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {getStatusIcon(booking.bookingStatus)}
                                <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.bookingStatus)}`}>
                                  {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                                {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(booking.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button 
                                onClick={() => handleViewBooking(booking._id)}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                                title="View booking details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Booking Details Modal */}
      {isDetailsModalOpen && selectedBookingId && activeTab === 'packages' && (
        <BookingDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseModal}
          bookingId={selectedBookingId}
        />
      )}

      {/* Destination Booking Details Modal */}
      {isDetailsModalOpen && selectedBookingId && activeTab === 'destinations' && (
        <DestinationBookingDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseModal}
          bookingId={selectedBookingId}
        />
      )}
    </div>
  );
}
