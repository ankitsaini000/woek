# Admin Dashboard Startup Guide

## Quick Start

### 1. Start Backend Server
```bash
cd backend
npm install
npm run dev
```
The backend will run on `http://localhost:5001`

### 2. Start Admin Frontend
```bash
cd admin
npm install
npm run dev
```
The admin dashboard will run on `http://localhost:3000`

### 3. Access the Application
- Navigate to `http://localhost:3000`
- You'll be redirected to the signin page
- Create a new account or sign in

## Environment Setup

### Backend Environment
Create a `.env` file in the `backend` folder:
```env
JWT_SECRET=your-secret-key-here
MONGODB_URI=mongodb://localhost:27017/tour-travel
PORT=5001
```

### Admin Frontend Environment
Create a `.env.local` file in the `admin` folder:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## Troubleshooting

### Common Issues

1. **"Cannot find the middleware module" Error**
   - This has been fixed by removing the problematic middleware
   - Authentication is now handled client-side with AuthContext

2. **Backend Connection Issues**
   - Ensure MongoDB is running
   - Check if backend server is running on port 5001
   - Verify API URL in environment variables

3. **Authentication Not Working**
   - Check browser console for error messages
   - Verify backend server is running
   - Check network tab for API calls

4. **Database Connection Issues**
   - Ensure MongoDB is installed and running
   - Check connection string in backend .env file
   - Verify database permissions

### Debug Steps

1. **Check Backend Server**
   ```bash
   curl http://localhost:5001
   ```
   Should return: `{"message":"Welcome to Tour & Travel API"}`

2. **Check API Endpoints**
   ```bash
   curl http://localhost:5001/api/auth/signup
   ```
   Should return a method not allowed error (this is expected)

3. **Check Frontend Console**
   - Open browser developer tools
   - Check console for error messages
   - Check network tab for failed requests

## Features Available

- ✅ User Registration
- ✅ User Login
- ✅ Protected Routes
- ✅ Dashboard Overview
- ✅ User Management
- ✅ Destination Management
- ✅ Tour Management
- ✅ Booking Management
- ✅ Settings

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/signout` - User logout

## Next Steps

1. **Create your first admin account**
2. **Explore the dashboard features**
3. **Add destinations and tours**
4. **Manage bookings**
5. **Configure settings**

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all services are running
3. Check the network tab for API calls
4. Ensure environment variables are set correctly
