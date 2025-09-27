# 🔧 Fix MongoDB Duplicate Key Error

## 🚨 **Problem:**
```
E11000 duplicate key error collection: test.destinations index: title_1 dup key: { title: null }
```

## 🎯 **Root Cause:**
There's an old index on a `title` field in the MongoDB database, but the current schema uses a `name` field. This creates a conflict.

## ✅ **Solution:**

### **Option 1: Fix via MongoDB Compass (Recommended)**

1. **Open MongoDB Compass**
2. **Connect to your database** (usually `mongodb://localhost:27017`)
3. **Navigate to:** `test` database → `destinations` collection
4. **Go to:** "Indexes" tab
5. **Find and delete:** The `title_1` index
6. **Verify:** Only `name_1` unique index exists

### **Option 2: Fix via MongoDB Shell**

1. **Open MongoDB Shell** (mongosh)
2. **Connect to database:**
   ```bash
   use test
   ```
3. **List current indexes:**
   ```bash
   db.destinations.getIndexes()
   ```
4. **Drop the problematic index:**
   ```bash
   db.destinations.dropIndex("title_1")
   ```
5. **Verify indexes:**
   ```bash
   db.destinations.getIndexes()
   ```

### **Option 3: Fix via Node.js Script**

1. **Start MongoDB server**
2. **Run the fix script:**
   ```bash
   cd backend
   node fixDatabaseIndexes.js
   ```

## 🎯 **Expected Result:**

After fixing, you should have:
- ✅ **No `title_1` index** - The problematic index is removed
- ✅ **Only `name_1` unique index** - The correct index for the name field
- ✅ **Working destination creation** - No more duplicate key errors

## 🧪 **Test After Fix:**

1. **Go to:** http://localhost:3000/destinations
2. **Click:** "Add Destination"
3. **Fill required fields** and upload image
4. **Submit form** - Should work without errors
5. **Check:** Destination appears in list

## 📋 **Current Schema:**

The destination model uses:
- `name` field with `unique: true` constraint
- No `title` field in the current schema
- The old `title_1` index is causing conflicts

## 🚀 **Quick Fix Commands:**

```bash
# Connect to MongoDB
mongosh

# Use the database
use test

# Drop the problematic index
db.destinations.dropIndex("title_1")

# Verify the fix
db.destinations.getIndexes()
```

**After running these commands, your destination creation should work perfectly!**
