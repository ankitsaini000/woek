# Troubleshooting 404 Errors

## Problem
Your frontend is getting 404 errors when trying to access API endpoints:
- `https://woek.onrender.com//api/destinations` (404)
- `https://woek.onrender.com//api/packages` (404)

## Possible Causes

### 1. Backend Not Deployed
The most likely cause is that your backend isn't properly deployed on Render.

### 2. Database Connection Issues
The backend might be running but can't connect to MongoDB.

### 3. Route Configuration Issues
The API routes might not be properly configured.

## Step-by-Step Fix

### Step 1: Verify Backend Deployment

1. **Check Render Dashboard**:
   - Go to your Render dashboard
   - Find your backend service
   - Check if it's running (should show "Live" status)
   - Check the logs for any errors

2. **Test Basic Endpoints**:
   Try these URLs in your browser:
   - `https://woek.onrender.com/` - Should show welcome message
   - `https://woek.onrender.com/health` - Should show health status
   - `https://woek.onrender.com/api/test` - Should show API test message

### Step 2: Check Environment Variables

Make sure these environment variables are set in Render:

**Required Environment Variables**:
- `MONGO_URI` - Your MongoDB connection string
- `NODE_ENV=production`
- `PORT=10000` (or let Render set it automatically)

**Optional Environment Variables**:
- `JWT_SECRET` - For authentication
- `CLOUDINARY_CLOUD_NAME` - For image uploads
- `CLOUDINARY_API_KEY` - For image uploads
- `CLOUDINARY_API_SECRET` - For image uploads

### Step 3: Redeploy Backend

1. **Commit and Push Changes**:
   ```bash
   git add .
   git commit -m "Add debugging and test endpoints"
   git push origin main
   ```

2. **Manual Deploy** (if needed):
   - Go to Render dashboard
   - Click "Manual Deploy" on your backend service

### Step 4: Test API Endpoints

After deployment, test these endpoints:

1. **Basic Test**:
   ```
   https://woek.onrender.com/api/test
   ```

2. **Destinations**:
   ```
   https://woek.onrender.com/api/destinations
   ```

3. **Packages**:
   ```
   https://woek.onrender.com/api/packages
   ```

### Step 5: Check Render Logs

1. Go to your Render dashboard
2. Click on your backend service
3. Go to "Logs" tab
4. Look for:
   - Server startup messages
   - Database connection status
   - Any error messages
   - API request logs (with the debugging I added)

## Common Issues and Solutions

### Issue 1: Backend Not Starting
**Symptoms**: 404 errors, service shows as "Failed" in Render
**Solution**: 
- Check environment variables
- Check build command: `npm install && npm run build:backend`
- Check start command: `npm run start:backend`

### Issue 2: Database Connection Failed
**Symptoms**: Backend starts but API returns empty arrays or errors
**Solution**:
- Verify `MONGO_URI` is correct
- Check if MongoDB Atlas allows connections from Render's IPs
- Add `0.0.0.0/0` to MongoDB Atlas network access

### Issue 3: Double Slash in URLs
**Symptoms**: URLs like `https://woek.onrender.com//api/destinations`
**Solution**:
- Check your frontend API configuration
- Make sure you're not adding extra slashes in the base URL

### Issue 4: CORS Still Blocking
**Symptoms**: CORS errors in browser console
**Solution**:
- The CORS fix I implemented should resolve this
- Clear browser cache
- Check if the backend is actually running

## Testing Commands

### Test from Browser Console
Open your Vercel frontend and run:

```javascript
// Test basic connectivity
fetch('https://woek.onrender.com/health')
  .then(response => response.json())
  .then(data => console.log('Health check:', data))
  .catch(error => console.error('Health check failed:', error));

// Test API endpoints
fetch('https://woek.onrender.com/api/test')
  .then(response => response.json())
  .then(data => console.log('API test:', data))
  .catch(error => console.error('API test failed:', error));
```

### Test from Terminal
```bash
# Test health endpoint
curl https://woek.onrender.com/health

# Test API endpoint
curl https://woek.onrender.com/api/test
```

## Next Steps

1. **Deploy the updated backend** with debugging
2. **Check Render logs** for any startup errors
3. **Test the endpoints** using the URLs above
4. **Verify database connection** in the logs
5. **Test from your frontend** once backend is confirmed working

The debugging I added will help identify exactly where the issue is occurring.
