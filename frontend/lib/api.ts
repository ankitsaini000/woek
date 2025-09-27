// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export const api = {
  packages: {
    getAll: () => `${API_BASE_URL}/api/packages`,
    getById: (id: string) => `${API_BASE_URL}/api/packages/${id}`,
  },
  destinations: {
    getAll: () => `${API_BASE_URL}/api/destinations`,
    getById: (id: string) => `${API_BASE_URL}/api/destinations/${id}`,
  },
  tours: {
    getAll: () => `${API_BASE_URL}/api/tours`,
    getById: (id: string) => `${API_BASE_URL}/api/tours/${id}`,
  },
  bookings: {
    create: () => `${API_BASE_URL}/api/bookings`,
    getByReference: (reference: string) => `${API_BASE_URL}/api/bookings/reference/${reference}`,
  },
  destinationBookings: {
    create: () => `${API_BASE_URL}/api/destination-bookings`,
    getByReference: (reference: string) => `${API_BASE_URL}/api/destination-bookings/reference/${reference}`,
  },
};

export default api;
