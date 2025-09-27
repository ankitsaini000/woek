// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001",
  ENDPOINTS: {
    AUTH: {
      SIGNUP: "/api/auth/signup",
      SIGNIN: "/api/auth/signin",
      ME: "/api/auth/me",
      SIGNOUT: "/api/auth/signout",
    },
    USERS: "/api/users",
    DESTINATIONS: "/api/destinations",
    TOURS: "/api/tours",
    BOOKINGS: "/api/bookings",
  },
};

export const getApiUrl = (endpoint: string) => {
  const baseUrl = API_CONFIG.BASE_URL.endsWith('/') ? API_CONFIG.BASE_URL.slice(0, -1) : API_CONFIG.BASE_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};
