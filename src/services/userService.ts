const { ObjectId } = require('mongodb');
const connectDB = require('../config/db');

exports.fetchAllUsers = async () => {
  const db = await connectDB();
  return db.collection('users').find().toArray();
};

// This function will only get a user with that ID if the user is over 21 years old. 
exports.getUserById = async (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid user ID');
  }

  const objectId = new ObjectId(id);
  const db = await connectDB();

  return db.collection('users').findOne({ _id: objectId , age: { $gt: 21 }});
};