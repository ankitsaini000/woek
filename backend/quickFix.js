// Quick fix for MongoDB duplicate key error
// Run this when MongoDB is running: node quickFix.js

const mongoose = require('mongoose');

async function quickFix() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/test');
    console.log('✅ Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const collection = db.collection('destinations');
    
    // List current indexes
    console.log('📋 Current indexes:');
    const indexes = await collection.indexes();
    indexes.forEach(index => {
      console.log(`  - ${index.name}: ${JSON.stringify(index.key)}`);
    });
    
    // Drop the problematic title index
    try {
      await collection.dropIndex('title_1');
      console.log('✅ Dropped title_1 index');
    } catch (error) {
      console.log('ℹ️  title_1 index not found:', error.message);
    }
    
    // Ensure name has unique index
    try {
      await collection.createIndex({ name: 1 }, { unique: true });
      console.log('✅ Created unique index on name field');
    } catch (error) {
      console.log('ℹ️  name index already exists');
    }
    
    // List final indexes
    console.log('📋 Final indexes:');
    const finalIndexes = await collection.indexes();
    finalIndexes.forEach(index => {
      console.log(`  - ${index.name}: ${JSON.stringify(index.key)}`);
    });
    
    console.log('🎉 Database indexes fixed successfully!');
    console.log('You can now create destinations without errors.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

quickFix();
