import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Add the password field here
  subject: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  channelLink: { type: String, required: true }
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
