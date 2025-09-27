# Authentication System

This document describes the complete authentication system implemented for the Tour Travel Admin Dashboard.

## Features

- **User Registration** - New admin users can sign up
- **User Login** - Secure authentication with JWT tokens
- **Protected Routes** - All admin pages require authentication
- **Automatic Redirects** - Users are redirected based on authentication status
- **Session Management** - Persistent login with token storage
- **Form Validation** - Client-side and server-side validation
- **Error Handling** - Comprehensive error messages

## Authentication Flow

### 1. User Registration (`/auth/signup`)
- Users fill out registration form with:
  - First Name
  - Last Name
  - Email
  - Phone Number
  - Password
  - Confirm Password
- Form validation ensures data integrity
- Password is hashed using bcrypt
- JWT token is generated and stored
- User is automatically logged in after registration

### 2. User Login (`/auth/signin`)
- Users enter email and password
- Credentials are validated against database
- JWT token is generated on successful login
- Token is stored in localStorage
- User is redirected to dashboard

### 3. Protected Routes
- All admin pages are protected by `ProtectedRoute` component
- Unauthenticated users are redirected to signin page
- Authenticated users can access all admin features

### 4. Logout
- Token is removed from localStorage
- User is redirected to signin page
- Session is terminated

## Backend API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/signup`
Creates a new admin user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "admin",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "token": "jwt_token_here"
}
```

#### POST `/api/auth/signin`
Authenticates an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Sign in successful",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "admin",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "token": "jwt_token_here"
}
```

#### GET `/api/auth/me`
Gets the current authenticated user's information.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "id": "user_id",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "role": "admin",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### POST `/api/auth/signout`
Logs out the current user (client-side token removal).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "message": "Sign out successful"
}
```

## Frontend Components

### AuthContext (`/contexts/AuthContext.tsx`)
- Manages authentication state globally
- Provides authentication methods
- Handles token storage and retrieval
- Manages user session

### ProtectedRoute (`/components/auth/ProtectedRoute.tsx`)
- Wraps protected pages
- Redirects unauthenticated users
- Shows loading state during authentication check

### SignInForm (`/components/auth/SignInForm.tsx`)
- Login form with validation
- Password visibility toggle
- Error handling and display
- Loading states

### SignUpForm (`/components/auth/SignUpForm.tsx`)
- Registration form with validation
- Password confirmation
- Terms and conditions agreement
- Error handling and display

## Security Features

### Password Security
- Passwords are hashed using bcrypt with salt rounds
- Minimum 6 character requirement
- Password confirmation on registration

### JWT Tokens
- Tokens expire after 7 days
- Secure token generation with secret key
- Token validation on protected routes
- Automatic token refresh on app load

### Form Validation
- Client-side validation for immediate feedback
- Server-side validation for security
- Email format validation
- Password strength requirements

### Error Handling
- Comprehensive error messages
- Network error handling
- Authentication failure handling
- Form validation errors

## Environment Configuration

### Frontend Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Backend Environment Variables
```env
JWT_SECRET=your-secret-key-here
MONGODB_URI=mongodb://localhost:27017/tour-travel
```

## Usage Instructions

### 1. Start the Backend Server
```bash
cd backend
npm install
npm run dev
```

### 2. Start the Admin Frontend
```bash
cd admin
npm install
npm run dev
```

### 3. Access the Application
- Navigate to `http://localhost:3000`
- You'll be redirected to the signin page
- Create a new account or sign in with existing credentials
- After authentication, you'll be redirected to the dashboard

## Database Schema

### User Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  phone: String (required),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Check if backend server is running
   - Verify API URL in environment variables
   - Check network connectivity

2. **Token Expired**
   - User will be automatically redirected to signin
   - Clear localStorage and try again

3. **Form Validation Errors**
   - Check all required fields are filled
   - Ensure email format is correct
   - Verify password meets requirements

4. **Database Connection Issues**
   - Ensure MongoDB is running
   - Check connection string in environment variables
   - Verify database permissions

## Security Best Practices

1. **Environment Variables**
   - Use strong JWT secrets in production
   - Never commit secrets to version control
   - Use different secrets for different environments

2. **Password Security**
   - Enforce strong password policies
   - Use HTTPS in production
   - Implement password reset functionality

3. **Token Security**
   - Use short token expiration times
   - Implement token refresh mechanism
   - Store tokens securely (httpOnly cookies in production)

4. **Input Validation**
   - Validate all user inputs
   - Sanitize data before database storage
   - Use proper error messages without exposing sensitive information
