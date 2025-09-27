// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  ENDPOINTS: {
    AUTH: {
      SIGNUP: "/auth/signup",
      SIGNIN: "/auth/signin",
      ME: "/auth/me",
      SIGNOUT: "/auth/signout",
    },
    USERS: "/users",
    DESTINATIONS: "/destinations",
    TOURS: "/tours",
    BOOKINGS: "/bookings",
  },
};

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
