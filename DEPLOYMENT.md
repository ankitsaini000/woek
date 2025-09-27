# Deployment Guide

## Render Deployment Configuration

This project consists of three separate applications:
- **Backend**: Express.js API server
- **Admin**: Next.js admin dashboard
- **Frontend**: Next.js client application

### Build Configuration

The root `package.json` includes build scripts for all applications:

- `npm run build` - Builds both admin and frontend (for production)
- `npm run build:admin` - Builds only the admin application
- `npm run build:frontend` - Builds only the frontend application
- `npm run build:backend` - Installs backend dependencies

### Render Deployment Settings

For **Backend Deployment**:
- **Build Command**: `npm install && npm run build:backend`
- **Start Command**: `npm run start:backend`
- **Node Version**: 18.x or higher

For **Frontend Deployment**:
- **Build Command**: `npm install && npm run build:frontend`
- **Start Command**: `npm run start:frontend`
- **Node Version**: 18.x or higher

For **Admin Deployment**:
- **Build Command**: `npm install && npm run build:admin`
- **Start Command**: `npm run start:admin`
- **Node Version**: 18.x or higher

### Environment Variables

Make sure to set up the following environment variables in Render:

#### Backend Environment Variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret for authentication
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `PORT` - Server port (default: 5000)

#### Frontend/Admin Environment Variables:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name for image uploads

### Deployment Steps

1. **Deploy Backend First**:
   - Create a new Web Service on Render
   - Connect your GitHub repository
   - Set build command: `npm install && npm run build:backend`
   - Set start command: `npm run start:backend`
   - Add environment variables
   - Deploy

2. **Deploy Frontend**:
   - Create a new Web Service on Render
   - Connect your GitHub repository
   - Set build command: `npm install && npm run build:frontend`
   - Set start command: `npm run start:frontend`
   - Add environment variables (including backend URL)
   - Deploy

3. **Deploy Admin**:
   - Create a new Web Service on Render
   - Connect your GitHub repository
   - Set build command: `npm install && npm run build:admin`
   - Set start command: `npm run start:admin`
   - Add environment variables (including backend URL)
   - Deploy

### Local Development

To run all applications locally:

```bash
# Install all dependencies
npm run install:all

# Run all applications in development mode
npm run dev
```

This will start:
- Backend on http://localhost:5000
- Admin on http://localhost:3001
- Frontend on http://localhost:3000
