// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://woek.onrender.com';

// Helper function to ensure proper URL construction
const buildUrl = (endpoint: string) => {
  // Remove trailing slash from base URL
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  
  // Ensure endpoint starts with a single slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // Construct final URL
  const finalUrl = `${baseUrl}${cleanEndpoint}`;
  
  // Debug logging
  console.log(`API URL constructed: ${finalUrl}`);
  
  return finalUrl;
};

export const api = {
  auth: {
    signup: () => buildUrl('/api/auth/signup'),
    signin: () => buildUrl('/api/auth/signin'),
    logout: () => buildUrl('/api/auth/logout'),
    profile: () => buildUrl('/api/auth/profile'),
  },
  packages: {
    getAll: () => buildUrl('/api/packages'),
    getById: (id: string) => buildUrl(`/api/packages/${id}`),
  },
  destinations: {
    getAll: () => buildUrl('/api/destinations'),
    getById: (id: string) => buildUrl(`/api/destinations/${id}`),
  },
  tours: {
    getAll: () => buildUrl('/api/tours'),
    getById: (id: string) => buildUrl(`/api/tours/${id}`),
  },
  bookings: {
    create: () => buildUrl('/api/bookings'),
    getByReference: (reference: string) => buildUrl(`/api/bookings/reference/${reference}`),
  },
  destinationBookings: {
    create: () => buildUrl('/api/destination-bookings'),
    getByReference: (reference: string) => buildUrl(`/api/destination-bookings/reference/${reference}`),
  },
};

export default api;
