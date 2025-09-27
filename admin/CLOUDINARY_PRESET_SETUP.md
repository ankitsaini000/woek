# 🔧 Cloudinary Upload Preset Setup

## ✅ **Your Configuration is Updated!**

I've updated your `.env.local` file with your Cloudinary account:
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dgzcfva4b
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=destinations
```

## 📋 **Step 1: Create Upload Preset in Cloudinary**

You need to create an upload preset in your Cloudinary dashboard:

### **Go to Cloudinary Dashboard:**
1. **Visit:** [cloudinary.com](https://cloudinary.com)
2. **Sign in** with your account
3. **Go to:** Settings → Upload

### **Create Upload Preset:**
1. **Click:** "Add upload preset"
2. **Preset name:** `destinations`
3. **Signing Mode:** `Unsigned` (important!)
4. **Folder:** `destinations` (optional)
5. **Click:** "Save"

## 📋 **Step 2: Restart Your Development Server**

**Stop current server:**
```bash
# Press Ctrl + C in your terminal
```

**Start server again:**
```bash
npm run dev
```

## 📋 **Step 3: Clear Browser Cache**

**Hard refresh your browser:**
- **Windows:** `Ctrl + F5`
- **Mac:** `Cmd + Shift + R`

## 📋 **Step 4: Test Upload**

1. **Go to:** `http://localhost:3000/destinations`
2. **Click:** "Add Destination"
3. **Go to:** "Media" tab
4. **Try uploading:** Any image file

## 🎯 **Expected Results:**

### **✅ Success:**
- **No console errors**
- **Image uploads to your Cloudinary account**
- **URL shows:** `https://res.cloudinary.com/dgzcfva4b/image/upload/...`
- **Image appears in your Cloudinary dashboard**

### **❌ If Upload Fails:**
- **Check:** Upload preset is created and set to "Unsigned"
- **Check:** Preset name is exactly `destinations`
- **Check:** Server restarted with new configuration
- **Check:** Browser cache cleared

## 🔍 **Troubleshooting:**

### **If you get "Upload preset must be whitelisted" error:**
1. **Go to:** Cloudinary Dashboard → Settings → Upload
2. **Find:** Your `destinations` preset
3. **Check:** Signing Mode is set to "Unsigned"
4. **Save:** If you made changes

### **If upload still fails:**
1. **Try different preset name:** Change to `ml_default` in `.env.local`
2. **Use manual URL input** as fallback
3. **Check console** for specific error messages

## 📁 **Your Current Configuration:**
```bash
# admin/.env.local
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dgzcfva4b
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=destinations
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## 🚀 **Benefits of Your Own Account:**

- ✅ **Full control** over your images
- ✅ **Custom transformations** available
- ✅ **Higher upload limits** than demo
- ✅ **Professional setup** for production
- ✅ **Image organization** in folders

## 📝 **Quick Setup Checklist:**

- [ ] Cloudinary account credentials added to `.env.local`
- [ ] Upload preset `destinations` created in Cloudinary dashboard
- [ ] Preset set to "Unsigned" mode
- [ ] Development server restarted
- [ ] Browser cache cleared
- [ ] Test upload works

Your Cloudinary account is now configured! Just create the upload preset and restart your server.
