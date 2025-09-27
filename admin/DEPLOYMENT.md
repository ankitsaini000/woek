# Admin Panel Deployment Guide

## Vercel Deployment Configuration

### 1. Environment Variables
Make sure these are set in your Vercel project settings:

```
NEXT_PUBLIC_API_URL=https://woek.onrender.com
```

### 2. Build Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 3. Root Directory
If deploying from a monorepo, set the root directory to `admin/`

### 4. Node.js Version
- **Node.js Version**: 20.x (recommended)

## Manual Deployment Steps

1. **Push to GitHub**: Make sure all changes are committed and pushed
2. **Connect to Vercel**: Link your GitHub repository
3. **Set Environment Variables**: Add `NEXT_PUBLIC_API_URL`
4. **Deploy**: Vercel will automatically build and deploy

## Troubleshooting

### Build Fails with "next: command not found"
- Ensure `next` is in dependencies (not devDependencies)
- Check that `package.json` has correct scripts
- Verify Node.js version is 18+ 

### CORS Issues
- Backend must allow your Vercel domain
- Check `ADMIN_URL` environment variable in backend

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running and accessible
- Ensure CORS is properly configured
