# 🔧 Fix Cloudinary Error - Quick Solution

## The Error You're Seeing:
```
Cloudinary not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your environment variables.
```

## ✅ **Quick Fix (2 minutes):**

### Step 1: Create Environment File
Create a file named `.env.local` in your `admin` directory with this content:

```bash
# Cloudinary Configuration (Demo Account - Works Immediately)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=demo
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ml_default

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Step 2: Restart Your Server
```bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 3: Test Upload
1. Go to Destinations page
2. Click "Add Destination"
3. Go to "Media" tab
4. Try uploading an image

## 🎯 **What This Does:**
- **Uses Cloudinary Demo Account** - No setup required
- **Enables Image Uploads** - Drag & drop functionality works
- **Fixes the Error** - No more configuration errors
- **Works Immediately** - No account creation needed

## 🔄 **Alternative: Manual URLs**
If you don't want to set up Cloudinary, the system now shows a prominent manual URL input field where you can paste image URLs directly.

## 📁 **File Location:**
Make sure the `.env.local` file is in the `admin` directory:
```
admin/
├── .env.local          ← Create this file here
├── components/
├── app/
└── ...
```

## ✅ **After the Fix:**
- ✅ No more console errors
- ✅ Image upload works
- ✅ Professional drag & drop interface
- ✅ Real-time image previews
- ✅ Gallery management

The error will be completely resolved and you'll have full image upload functionality!
