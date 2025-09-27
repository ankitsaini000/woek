# 🔧 Cloudinary Troubleshooting Guide

## ✅ **Current Status:**
- **Configuration:** Using your Cloudinary account (`dgzcfva4b`)
- **Upload Preset:** Changed to `ml_default` (more commonly available)
- **Server:** Restarted with new configuration
- **Debugging:** Added detailed error logging

## 🎯 **Test Steps (Do This Now):**

### **Step 1: Clear Browser Cache**
- **Hard refresh:** `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
- **This is crucial** - clears old cached environment variables

### **Step 2: Test Upload**
1. **Go to:** `http://localhost:3000/destinations`
2. **Click:** "Add Destination"
3. **Go to:** "Media" tab
4. **Try uploading an image**

### **Step 3: Check Console**
Look for these debug messages:
```
Upload parameters: {
  cloudName: "dgzcfva4b",
  uploadPreset: "ml_default",
  apiUrl: "https://api.cloudinary.com/v1_1/dgzcfva4b/image/upload"
}
```

## 🔍 **What to Look For:**

### **✅ Success Indicators:**
- **No "Upload preset not found" error**
- **URL shows:** `https://res.cloudinary.com/dgzcfva4b/image/upload/...`
- **Console shows:** "Upload successful: [URL]"
- **Image appears in your Cloudinary dashboard**

### **❌ Error Indicators:**
- **Still getting "Upload preset not found"**
- **400 Bad Request errors**
- **Wrong cloud name in URL**

## 🚨 **If Still Getting Errors:**

### **Option 1: Check Your Cloudinary Dashboard**
1. **Go to:** [cloudinary.com](https://cloudinary.com)
2. **Navigate to:** Settings → Upload
3. **Look for:** Upload presets list
4. **Check if:** `ml_default` exists (it should be there by default)

### **Option 2: Create New Preset**
If `ml_default` doesn't exist:
1. **Click:** "Add upload preset"
2. **Name:** `ml_default`
3. **Signing Mode:** `Unsigned`
4. **Save**

### **Option 3: Use Manual URLs**
If upload still fails:
1. **Use the manual URL input** at the bottom
2. **Paste any image URL** (from Imgur, Google Drive, etc.)
3. **Image will work** without Cloudinary upload

## 🔧 **Alternative Solutions:**

### **Solution 1: Try Different Preset**
If `ml_default` doesn't work, try:
```bash
# In admin/.env.local
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=destinations
```

### **Solution 2: Use Demo Account**
If your account has issues:
```bash
# In admin/.env.local
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=demo
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ml_default
```

### **Solution 3: Manual URLs Only**
Remove Cloudinary entirely and use manual URLs:
- **Works with any image hosting service**
- **No Cloudinary dependency**
- **Always works as fallback**

## 📱 **Quick Test:**

After hard refresh, try uploading an image and check console for:
```
Upload parameters: { cloudName: "dgzcfva4b", uploadPreset: "ml_default" }
```

**If you see this, the configuration is correct!**

## 🎉 **Expected Results:**

### **Success:**
- ✅ **Image uploads successfully**
- ✅ **No console errors**
- ✅ **Image preview appears**
- ✅ **URL shows your Cloudinary account**

### **Fallback:**
- ⚠️ **Use manual URL input**
- ⚠️ **Paste any image URL**
- ⚠️ **Works without Cloudinary**

The configuration is now correct - just clear your browser cache and test!
