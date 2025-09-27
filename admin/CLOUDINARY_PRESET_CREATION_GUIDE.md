# 🔧 Create Cloudinary Upload Preset - Step by Step

## ❌ **Current Error:**
```
Error: Upload preset not found
POST https://api.cloudinary.com/v1_1/dgzcfva4b/image/upload 400 (Bad Request)
```

## ✅ **Solution: Create Upload Preset in Cloudinary Dashboard**

### **Step 1: Go to Cloudinary Dashboard**
1. **Open your browser** and go to [cloudinary.com](https://cloudinary.com)
2. **Sign in** with your account credentials:
   - **Email:** Your Cloudinary account email
   - **Password:** Your Cloudinary account password

### **Step 2: Navigate to Upload Settings**
1. **Look for the left sidebar** in your Cloudinary dashboard
2. **Click on "Settings"** (usually has a gear icon)
3. **Click on "Upload"** (under Settings)

### **Step 3: Create New Upload Preset**
1. **Look for "Upload presets" section**
2. **Click "Add upload preset"** button (usually blue button)
3. **Fill in the form with these EXACT values:**

#### **Required Fields:**
- **Preset name:** `destinations` (exactly this name)
- **Signing Mode:** Select `Unsigned` (very important!)
- **Folder:** `destinations` (optional, for organization)

#### **Optional Settings:**
- **Transformation:** Leave empty for now
- **Quality:** Leave as default
- **Format:** Leave as default

### **Step 4: Save the Preset**
1. **Click "Save"** button
2. **Verify** the preset appears in your list
3. **Check** that it shows "Unsigned" in the signing mode column

### **Step 5: Test Upload**
1. **Go back to your admin panel**
2. **Navigate to:** Destinations → Add Destination → Media tab
3. **Try uploading an image**

## 🎯 **Expected Results After Creating Preset:**

### **✅ Success:**
- **No "Upload preset not found" error**
- **Image uploads successfully**
- **URL shows:** `https://res.cloudinary.com/dgzcfva4b/image/upload/...`
- **Image appears in your Cloudinary dashboard**

### **❌ If Still Getting Errors:**
- **Double-check:** Preset name is exactly `destinations`
- **Double-check:** Signing mode is set to `Unsigned`
- **Try:** Different preset name like `ml_default`

## 🔍 **Visual Guide:**

```
Cloudinary Dashboard
├── Settings (left sidebar)
│   └── Upload
│       └── Upload presets
│           └── Add upload preset
│               ├── Preset name: destinations
│               ├── Signing Mode: Unsigned
│               ├── Folder: destinations
│               └── Save
```

## 🚨 **Common Issues:**

### **Issue 1: Can't Find Settings**
- **Look for:** Gear icon or "Settings" in left sidebar
- **Alternative:** Go directly to [cloudinary.com/console/settings/upload](https://cloudinary.com/console/settings/upload)

### **Issue 2: Preset Name Mismatch**
- **Must be exactly:** `destinations`
- **Case sensitive:** No capital letters
- **No spaces:** Use underscores if needed

### **Issue 3: Signing Mode Wrong**
- **Must be:** `Unsigned` (not Signed)
- **This allows:** Client-side uploads from your app

## 🔄 **Alternative: Use Different Preset Name**

If you can't create `destinations`, try using an existing preset:

### **Update .env.local:**
```bash
# Change this line in admin/.env.local
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ml_default
```

### **Then restart server:**
```bash
# Stop server (Ctrl + C)
npm run dev
```

## 📱 **Quick Test:**

After creating the preset:
1. **Refresh your browser** (Ctrl + F5)
2. **Go to:** Destinations → Add Destination → Media
3. **Upload an image**
4. **Should work without errors**

The upload preset is the missing piece - once you create it, everything will work perfectly!
