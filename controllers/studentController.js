import Student from '../models/studentModel.js';
import Teacher from '../models/teacherModel.js';
import Subscription from '../models/subscriptionModel.js';

// Function to enroll a student in a subject and show teachers
export const enrollInSubject = async (req, res) => {
  const { name, subject } = req.body;  // Use the student's name and subject from the request body

  try {
    // Find the student by name using a case-insensitive search
    const student = await Student.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if the student has an active subscription
    const subscription = await Subscription.findOne({
      studentId: student._id,  // Use the found student's ID
      endDate: { $gte: new Date() }  // Ensure the subscription is still active
    });

    if (!subscription) {
      return res.status(403).json({ message: 'No active subscription found. Please subscribe to enroll in this subject.' });
    }

    // Fetch teachers who teach the selected subject
    const teachers = await Teacher.find({ subject });
    if (teachers.length === 0) {
      return res.status(404).json({ message: 'No teachers available for this subject' });
    }

    // Add the subject to the student's enrolled subjects if not already enrolled
    if (!student.enrolledSubjects) {
      student.enrolledSubjects = [];
    }

    // Check if the student is already enrolled in the subject
    if (student.enrolledSubjects.includes(subject)) {
      return res.status(400).json({ message: 'Already enrolled in this subject' });
    }

    // Enroll the student in the subject
    student.enrolledSubjects.push(subject);
    await student.save();

    // Return a list of teachers along with their channel links
    const teacherList = teachers.map(teacher => ({
      name: teacher.name,
      subject: teacher.subject,
      channelLink: teacher.channelLink,
    }));

    res.status(200).json({ message: 'Enrolled successfully', teachers: teacherList });
  } catch (error) {
    res.status(500).json({ message: 'Error during enrollment', error: error.message });
  }
};
