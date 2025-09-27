# Cloudinary Image Upload Setup

## Overview
This guide will help you set up Cloudinary image upload functionality for the destination management system.

## Prerequisites
- Cloudinary account (free tier available)
- Admin panel already set up

## Step 1: Create Cloudinary Account

1. **Sign up at [cloudinary.com](https://cloudinary.com)**
2. **Verify your email address**
3. **Access your dashboard**

## Step 2: Get Cloudinary Credentials

1. **Go to your Cloudinary Dashboard**
2. **Find your Cloud Name** (visible in the dashboard)
3. **Create an Upload Preset:**
   - Go to Settings → Upload
   - Click "Add upload preset"
   - Name it "destinations"
   - Set Signing Mode to "Unsigned"
   - Set Folder to "destinations" (optional)
   - Click "Save"

## Step 3: Configure Environment Variables

Create a `.env.local` file in the `admin` directory:

```bash
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=destinations

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

**Replace `your_cloud_name_here` with your actual Cloudinary cloud name.**

## Step 4: Test the Setup

1. **Start your admin panel:**
   ```bash
   cd admin
   npm run dev
   ```

2. **Navigate to Destinations page**
3. **Click "Add Destination"**
4. **Go to the "Media" tab**
5. **Try uploading an image**

## Features

### Image Upload Features:
- **Drag & Drop Interface** - Easy file selection
- **Multiple File Types** - JPEG, PNG, GIF, WebP
- **File Size Validation** - 5MB limit per image
- **Progress Indicators** - Visual feedback during upload
- **Error Handling** - Clear error messages
- **Image Preview** - See uploaded images immediately
- **Gallery Management** - Add/remove multiple images
- **Fallback URL Input** - Manual URL entry as backup

### Upload Process:
1. **Select Images** - Click upload area or drag & drop
2. **Automatic Upload** - Images upload to Cloudinary
3. **URL Generation** - Secure URLs returned automatically
4. **Form Integration** - URLs populate form fields
5. **Real-time Preview** - See images immediately

### Error Handling:
- **Configuration Errors** - Clear message if Cloudinary not set up
- **File Type Validation** - Only image files allowed
- **Size Validation** - 5MB limit enforced
- **Network Errors** - Retry options provided
- **Upload Failures** - Detailed error messages

## Troubleshooting

### Common Issues:

#### 1. "Cloudinary not configured" Error
**Solution:** Check your `.env.local` file has the correct `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

#### 2. Upload Preset Error
**Solution:** Ensure your upload preset is set to "Unsigned" mode

#### 3. CORS Errors
**Solution:** Check your Cloudinary settings allow your domain

#### 4. File Size Errors
**Solution:** Images must be under 5MB. Compress images if needed.

#### 5. Network Errors
**Solution:** Check your internet connection and Cloudinary status

### Debug Steps:

1. **Check Environment Variables:**
   ```bash
   # In your admin directory
   cat .env.local
   ```

2. **Verify Cloudinary Setup:**
   - Cloud name is correct
   - Upload preset exists and is unsigned
   - Account is active

3. **Check Browser Console:**
   - Look for JavaScript errors
   - Check network requests
   - Verify API responses

## Advanced Configuration

### Custom Upload Preset Settings:
- **Folder Structure** - Organize images in folders
- **Image Transformations** - Auto-resize, crop, optimize
- **Quality Settings** - Balance quality vs file size
- **Format Conversion** - Auto-convert to WebP for better performance

### Security Considerations:
- **Upload Preset Security** - Use unsigned presets for client-side uploads
- **File Type Restrictions** - Only allow image files
- **Size Limits** - Prevent large file uploads
- **Domain Restrictions** - Limit uploads to your domains

## Production Deployment

### Environment Variables for Production:
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_production_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=destinations
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### Security Best Practices:
1. **Use Signed Uploads** for production (more secure)
2. **Set up CORS policies** for your domains
3. **Monitor upload usage** and set limits
4. **Use CDN** for faster image delivery
5. **Set up image transformations** for optimization

## Support

### Cloudinary Resources:
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Upload Presets Guide](https://cloudinary.com/documentation/upload_presets)
- [JavaScript SDK](https://cloudinary.com/documentation/javascript_integration)

### Common Questions:

**Q: Can I use the free tier?**
A: Yes, Cloudinary free tier includes 25GB storage and 25GB bandwidth per month.

**Q: How do I optimize images?**
A: Cloudinary automatically optimizes images. You can also set up transformations in your upload preset.

**Q: Can I organize images in folders?**
A: Yes, set the "Folder" field in your upload preset to organize images.

**Q: What if I exceed the free tier limits?**
A: You can upgrade to a paid plan or implement client-side image compression.

## Example Configuration

### Complete `.env.local` file:
```bash
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=my-travel-site
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=destinations

# API Configuration  
NEXT_PUBLIC_API_URL=http://localhost:5001/api

# Optional: Development settings
NODE_ENV=development
```

### Upload Preset Configuration:
- **Preset Name:** `destinations`
- **Signing Mode:** `Unsigned`
- **Folder:** `destinations`
- **Transformation:** `q_auto,f_auto` (auto quality and format)
- **Max File Size:** `10MB`
- **Allowed Formats:** `jpg,png,gif,webp`

This setup provides a robust, scalable image upload solution for your destination management system!
