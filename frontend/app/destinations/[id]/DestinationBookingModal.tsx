"use client";

import { useState, useEffect } from "react";
import { api } from "../../../lib/api";

interface DestinationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationId: string;
}

interface Destination {
  _id: string;
  name: string;
  startingPrice: number;
  currency: string;
}

export default function DestinationBookingModal({ isOpen, onClose, destinationId }: DestinationBookingModalProps) {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    travelDate: '',
    numberOfTravelers: 1,
    specialRequests: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    dietaryRequirements: '',
    medicalConditions: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [bookingReference, setBookingReference] = useState('');

  // Fetch destination data when modal opens
  useEffect(() => {
    if (isOpen && destinationId) {
      const fetchDestination = async () => {
        try {
          const response = await fetch(api.destinations.getById(destinationId));
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched destination for booking:', data);
            setDestination(data);
          }
        } catch (error) {
          console.error('Error fetching destination:', error);
        }
      };
      fetchDestination();
    }
  }, [isOpen, destinationId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const pricePerPerson = destination?.startingPrice || 999;
      const totalAmount = pricePerPerson * formData.numberOfTravelers;
      
      const bookingData = {
        destinationId,
        ...formData,
        totalAmount: totalAmount
      };

      console.log('Sending destination booking data:', bookingData);

      const response = await fetch(api.destinationBookings.create(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        setBookingReference(result.bookingReference);
        setSubmitMessage(`Destination booking created successfully! Your booking reference is: ${result.bookingReference}`);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          nationality: '',
          travelDate: '',
          numberOfTravelers: 1,
          specialRequests: '',
          emergencyContactName: '',
          emergencyContactPhone: '',
          emergencyContactRelation: '',
          dietaryRequirements: '',
          medicalConditions: ''
        });
      } else {
        setSubmitMessage(result.message || 'Failed to create destination booking. Please try again.');
      }
    } catch (error) {
      console.error('Destination booking error:', error);
      setSubmitMessage('An error occurred while creating your destination booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black">
              Book {destination?.name || 'Destination'}
            </h2>
            <button
              onClick={onClose}
              className="text-black hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Destination Info */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-black mb-2">Destination Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-black">Destination ID:</span>
                <span className="text-black ml-2">{destinationId}</span>
              </div>
              <div>
                <span className="text-black">Booking Type:</span>
                <span className="text-black ml-2">Destination</span>
              </div>
              <div>
                <span className="text-black">Price per person:</span>
                <span className="text-black ml-2">
                  {destination?.currency || 'USD'} {destination?.startingPrice?.toLocaleString() || '999'}
                </span>
              </div>
              <div>
                <span className="text-black">Total Amount:</span>
                <span className="text-black ml-2 font-semibold">
                  {destination?.currency || 'USD'} {((destination?.startingPrice || 999) * formData.numberOfTravelers).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {bookingReference ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <h3 className="font-bold">Booking Confirmed!</h3>
              <p>Your booking reference is: <strong>{bookingReference}</strong></p>
              <p className="text-sm mt-2">We will contact you soon with more details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Nationality *</label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Enter your nationality"
                    />
                  </div>
                </div>
              </div>

              {/* Travel Information */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Travel Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Travel Date *</label>
                    <input
                      type="date"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Number of Travelers *</label>
                    <select
                      name="numberOfTravelers"
                      value={formData.numberOfTravelers}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-black mb-2">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Any special requests or requirements?"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Contact Name *</label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Emergency contact name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Contact Phone *</label>
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Emergency contact phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Relation *</label>
                    <input
                      type="text"
                      name="emergencyContactRelation"
                      value={formData.emergencyContactRelation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Relationship"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Dietary Requirements</label>
                    <input
                      type="text"
                      name="dietaryRequirements"
                      value={formData.dietaryRequirements}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Any dietary requirements?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Medical Conditions</label>
                    <input
                      type="text"
                      name="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Any medical conditions?"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating Destination Booking...' : 'Create Destination Booking'}
                </button>
              </div>

              {/* Status Message */}
              {submitMessage && (
                <div className={`mt-4 p-3 rounded-md ${
                  submitMessage.includes('successfully') 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
