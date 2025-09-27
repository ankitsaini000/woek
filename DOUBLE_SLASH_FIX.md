# Fix Double Slash Issue in API URLs

## Problem
Your frontend is making requests to URLs with double slashes:
- `//api/destinations` (should be `/api/destinations`)
- `//api/packages` (should be `/api/packages`)

This is causing 404 errors because the backend doesn't recognize these malformed URLs.

## Root Cause
The issue is likely caused by:
1. **Frontend deployment cache** - Vercel is serving the old version
2. **URL construction logic** - Somewhere in the code, an extra slash is being added
3. **Environment variable issues** - The API_BASE_URL might have a trailing slash

## Solution

### Step 1: Deploy Updated Frontend
You need to redeploy your frontend with the updated API configuration:

```bash
git add .
git commit -m "Fix double slash issue in API URLs"
git push origin main
```

### Step 2: Verify Environment Variables
Make sure your Vercel deployment has the correct environment variable:

**In Vercel Dashboard:**
1. Go to your project settings
2. Go to Environment Variables
3. Add/Update: `NEXT_PUBLIC_API_URL=https://woek.onrender.com`
4. Redeploy

### Step 3: Test the Fix
After deployment, check your browser console for the debug logs:
- You should see: `API URL constructed: https://woek.onrender.com/api/packages`
- You should NOT see: `API URL constructed: https://woek.onrender.com//api/packages`

### Step 4: Clear Browser Cache
1. Open your Vercel frontend
2. Open browser developer tools (F12)
3. Right-click the refresh button
4. Select "Empty Cache and Hard Reload"

## Debugging

### Check Current API URLs
Open your Vercel frontend and run this in the browser console:

```javascript
// Test the API URL construction
console.log('API Base URL:', process.env.NEXT_PUBLIC_API_URL || 'https://woek.onrender.com');

// Test the actual URLs being generated
import api from './lib/api';
console.log('Packages URL:', api.packages.getAll());
console.log('Destinations URL:', api.destinations.getAll());
```

### Expected Output
```
API Base URL: https://woek.onrender.com
Packages URL: https://woek.onrender.com/api/packages
Destinations URL: https://woek.onrender.com/api/destinations
```

### If Still Getting Double Slashes
If you're still seeing double slashes, check:

1. **Browser Network Tab**: Look at the actual requests being made
2. **Console Logs**: Check for the debug messages I added
3. **Environment Variables**: Verify `NEXT_PUBLIC_API_URL` is set correctly

## Alternative Fix

If the issue persists, you can also try this simpler approach:

```typescript
// In frontend/lib/api.ts
const API_BASE_URL = 'https://woek.onrender.com'; // Hardcoded for now

export const api = {
  packages: {
    getAll: () => `${API_BASE_URL}/api/packages`,
    getById: (id: string) => `${API_BASE_URL}/api/packages/${id}`,
  },
  destinations: {
    getAll: () => `${API_BASE_URL}/api/destinations`,
    getById: (id: string) => `${API_BASE_URL}/api/destinations/${id}`,
  },
  // ... rest of the API
};
```

## Verification

After the fix, your backend logs should show:
```
GET /api/packages 200 0.420 ms - 152
GET /api/destinations 200 0.372 ms - 156
```

Instead of:
```
GET //api/packages 404 0.420 ms - 152
GET //api/destinations 404 0.372 ms - 156
```

## Next Steps

1. **Deploy the updated frontend**
2. **Check browser console** for debug logs
3. **Verify API calls** are working
4. **Remove debug logging** once confirmed working
