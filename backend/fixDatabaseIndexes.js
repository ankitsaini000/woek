const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tour-travel');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Fix database indexes
const fixIndexes = async () => {
  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    const collection = db.collection('destinations');
    
    console.log('Checking existing indexes...');
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes);
    
    // Drop the problematic title index if it exists
    try {
      await collection.dropIndex('title_1');
      console.log('✅ Dropped title_1 index');
    } catch (error) {
      console.log('ℹ️  title_1 index not found or already dropped');
    }
    
    // Ensure the name field has a unique index
    try {
      await collection.createIndex({ name: 1 }, { unique: true });
      console.log('✅ Created unique index on name field');
    } catch (error) {
      console.log('ℹ️  name index already exists or error:', error.message);
    }
    
    // List final indexes
    const finalIndexes = await collection.indexes();
    console.log('Final indexes:', finalIndexes);
    
    console.log('✅ Database indexes fixed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error fixing indexes:', error);
    process.exit(1);
  }
};

fixIndexes();
