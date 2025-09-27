# CORS Fix for Production Deployment

## Problem
Your frontend (hosted on Vercel at `https://woek.vercel.app`) cannot communicate with your backend (hosted on Render at `https://woek.onrender.com`) due to CORS policy restrictions.

## What I Fixed

### 1. Updated CORS Configuration
- Added your Vercel frontend URL (`https://woek.vercel.app`) to the allowed origins
- Added fallback for all Vercel deployments in production
- Added debug logging to help troubleshoot requests

### 2. Enhanced Server Configuration
- Added health check endpoint at `/health`
- Improved error handling and logging
- Added timestamp to responses for debugging

## Next Steps

### 1. Deploy the Updated Backend
You need to redeploy your backend on Render with the updated CORS configuration:

1. **Commit and push your changes**:
   ```bash
   git add .
   git commit -m "Fix CORS configuration for Vercel frontend"
   git push origin main
   ```

2. **Redeploy on Render**:
   - Go to your Render dashboard
   - Find your backend service
   - Click "Manual Deploy" or it will auto-deploy from the git push

### 2. Verify the Fix
After deployment, test these endpoints:

- **Health Check**: `https://woek.onrender.com/health`
- **API Test**: `https://woek.onrender.com/api/destinations`
- **API Test**: `https://woek.onrender.com/api/packages`

### 3. Environment Variables (Optional)
You can also set these environment variables in Render for better control:

- `FRONTEND_URL=https://woek.vercel.app`
- `ADMIN_URL=https://woek-admin.vercel.app` (if you have an admin panel)
- `NODE_ENV=production`

## Testing the Fix

### 1. Test from Browser Console
Open your Vercel frontend and run this in the browser console:
```javascript
fetch('https://woek.onrender.com/health')
  .then(response => response.json())
  .then(data => console.log('Backend is working:', data))
  .catch(error => console.error('Error:', error));
```

### 2. Test API Endpoints
```javascript
fetch('https://woek.onrender.com/api/destinations')
  .then(response => response.json())
  .then(data => console.log('Destinations:', data))
  .catch(error => console.error('Error:', error));
```

## Common Issues and Solutions

### Issue 1: Double Slash in URL
If you see URLs like `https://woek.onrender.com//api/destinations`, check your frontend API configuration. Make sure you're not adding an extra slash.

### Issue 2: Still Getting CORS Errors
1. Clear your browser cache
2. Check the browser's Network tab to see the actual request headers
3. Verify the backend is running and accessible

### Issue 3: 404 Errors
If you're getting 404 errors, check:
1. The backend is deployed and running
2. The API routes are properly configured
3. The database connection is working

## Debug Information

The updated server now logs:
- Request origin
- Request URL
- Request method

Check your Render logs to see these debug messages and verify requests are reaching your backend.

## Production Considerations

For production, consider:
1. Removing debug logging for better performance
2. Setting up proper environment variables
3. Adding rate limiting
4. Setting up monitoring and alerts
