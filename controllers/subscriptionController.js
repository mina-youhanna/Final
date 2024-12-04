import Subscription from '../models/subscriptionModel.js';
import Student from '../models/studentModel.js'; // Import the Student model

// Create a new subscription
export const createSubscription = async (req, res) => {
  const { name, type, price } = req.body;  // Use the student's name instead of id

  const now = new Date();
  let endDate;

  // Calculate the end date based on the subscription type
  if (type === 'Per-Class') {
    endDate = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour
  } else if (type === 'Monthly') {
    endDate = new Date(now.setMonth(now.getMonth() + 1)); // 1 month
  } else if (type === 'Yearly') {
    endDate = new Date(now.setFullYear(now.getFullYear() + 1)); // 1 year
  } else {
    return res.status(400).json({ message: 'Invalid subscription type' });
  }

  try {
    // Find the student by name using a case-insensitive search
    const student = await Student.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Create the new subscription using the found student's ID
    const newSubscription = new Subscription({
      studentId: student._id,  // Use the found student's ID
      type,
      startDate: new Date(),
      endDate,
      price
    });

    // Save the subscription in the database
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};







// Get the current logged-in student's subscription
export const getStudentSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      studentId: req.user.id,
      endDate: { $gte: new Date() }  // Ensure the subscription is still active
    });

    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription found' });
    }

    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription', error: error.message });
  }
};
