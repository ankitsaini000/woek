# Quick Cloudinary Setup Guide

## 🚨 **Error Fix: Cloudinary Not Configured**

You're seeing this error because Cloudinary environment variables are not set up. Here's how to fix it:

## Step 1: Create Environment File

**Create a file named `.env.local` in your `admin` directory with this content:**

```bash
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=destinations

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## Step 2: Get Your Cloudinary Credentials

### Option A: Quick Test (Use Demo Account)
For testing, you can use Cloudinary's demo account:
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=demo
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ml_default
```

### Option B: Create Your Own Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Get your cloud name from the dashboard
4. Create an upload preset named "destinations"

## Step 3: Restart Your Development Server

After creating the `.env.local` file:
```bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 4: Test the Upload

1. Go to Destinations page
2. Click "Add Destination"
3. Go to "Media" tab
4. Try uploading an image

## Alternative: Manual URL Input

If you don't want to set up Cloudinary right now, the ImageUpload component includes a fallback manual URL input field where you can paste image URLs directly.

## Troubleshooting

### If you still get the error:
1. **Check file location** - `.env.local` must be in the `admin` directory
2. **Check file name** - Must be exactly `.env.local` (not `.env.local.txt`)
3. **Restart server** - Environment variables only load on server start
4. **Check spelling** - Variable names must be exact

### Quick Test with Demo Account:
```bash
# In admin/.env.local
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=demo
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ml_default
```

This will work immediately for testing purposes!
