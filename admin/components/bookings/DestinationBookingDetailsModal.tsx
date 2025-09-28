"use client";

import { useState, useEffect, useCallback } from "react";
import { X, User, Calendar, MapPin, DollarSign, Phone, Mail, Users, AlertTriangle, FileText } from "lucide-react";

interface DestinationBookingDetails {
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
  totalAmount: number;
  bookingStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  dietaryRequirements?: string;
  medicalConditions?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface DestinationBookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
}

export function DestinationBookingDetailsModal({ isOpen, onClose, bookingId }: DestinationBookingDetailsModalProps) {
  const [booking, setBooking] = useState<DestinationBookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookingDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/destination-bookings/admin/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch destination booking details');
      }

      const data = await response.json();
      setBooking(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching destination booking details:', err);
    } finally {
      setIsLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    if (isOpen && bookingId) {
      fetchBookingDetails();
    }
  }, [isOpen, bookingId, fetchBookingDetails]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Destination Booking Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading destination booking details...</span>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            ) : booking ? (
              <div className="space-y-6">
                {/* Booking Reference & Status */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Booking Reference</h3>
                      <p className="text-2xl font-bold text-blue-600">{booking.bookingReference}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(booking.bookingStatus)}`}>
                          {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                        </span>
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Booking Date: {formatDate(booking.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Customer Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <p className="text-sm text-gray-900">{booking.firstName} {booking.lastName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="text-sm text-gray-900 flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {booking.email}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-sm text-gray-900 flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {booking.phone}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <p className="text-sm text-gray-900">{formatDate(booking.dateOfBirth)}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nationality</label>
                        <p className="text-sm text-gray-900">{booking.nationality}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Travel Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Travel Date</label>
                        <p className="text-sm text-gray-900 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(booking.travelDate)}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Number of Travelers</label>
                        <p className="text-sm text-gray-900 flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {booking.numberOfTravelers} traveler{booking.numberOfTravelers !== 1 ? 's' : ''}
                        </p>
                      </div>
                      {booking.specialRequests && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Special Requests</label>
                          <p className="text-sm text-gray-900">{booking.specialRequests}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Destination Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Destination Information
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Destination Name</label>
                        <p className="text-sm font-medium text-gray-900">{booking.destinationId?.name || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Country</label>
                        <p className="text-sm text-gray-900">{booking.destinationId?.country || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Region</label>
                        <p className="text-sm text-gray-900">{booking.destinationId?.region || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Best Time to Visit</label>
                        <p className="text-sm text-gray-900">{booking.destinationId?.bestTimeToVisit || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <p className="text-sm text-gray-900">{booking.destinationId?.duration || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                        <p className="text-sm text-gray-900">{booking.destinationId?.difficulty || 'N/A'}</p>
                      </div>
                    </div>
                    {booking.destinationId?.description && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <p className="text-sm text-gray-900 mt-1">{booking.destinationId.description}</p>
                      </div>
                    )}
                    {booking.destinationId?.highlights && booking.destinationId.highlights.length > 0 && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Highlights</label>
                        <ul className="text-sm text-gray-900 mt-1 list-disc list-inside">
                          {booking.destinationId.highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {booking.destinationId?.activities && booking.destinationId.activities.length > 0 && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Activities</label>
                        <ul className="text-sm text-gray-900 mt-1 list-disc list-inside">
                          {booking.destinationId.activities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Financial Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Financial Information
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(booking.totalAmount)}</p>
                      </div>
                      <div className="text-right">
                        <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Emergency Contact
                  </h3>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                        <p className="text-sm text-gray-900">{booking.emergencyContactName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-sm text-gray-900">{booking.emergencyContactPhone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Relation</label>
                        <p className="text-sm text-gray-900">{booking.emergencyContactRelation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                {(booking.dietaryRequirements || booking.medicalConditions) && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Additional Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {booking.dietaryRequirements && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Dietary Requirements</label>
                            <p className="text-sm text-gray-900">{booking.dietaryRequirements}</p>
                          </div>
                        )}
                        {booking.medicalConditions && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Medical Conditions</label>
                            <p className="text-sm text-gray-900">{booking.medicalConditions}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Admin Notes */}
                {booking.adminNotes && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Admin Notes</h3>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-900">{booking.adminNotes}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
