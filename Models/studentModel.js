import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  grade: { 
    type: Number, 
    required: true,
    min: 1,  // Set minimum grade to 1
    max: 6   // Set maximum grade to 6
  },
  password: { type: String, required: true },  // Add the password field here
  enrolledSubjects: {
    type: [String],  // Array of subject names the student has enrolled in
    default: []
  } , 
  category: { 
    type: String, 
    enum: ['Science', 'Math', 'English', 'Physics', 'Other'], 
    required: true 
  }
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
