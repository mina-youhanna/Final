import User from '../models/userModel.js';
import Teacher from '../models/teacherModel.js';  // Teacher model import
import Student from '../models/studentModel.js';  // Student model import
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register User (Teacher or Student)
export const registerUser = async (req, res) => {
  const { name, email, password, role, grade, category, subject, rating, channelLink } = req.body;  // Destructure fields

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let newUser;

    // Register a teacher
    if (role === 'teacher') {
      if (!subject || !rating || !channelLink) {
        return res.status(400).json({ message: 'Subject, rating, and channelLink are required for teacher registration' });
      }

      newUser = new Teacher({
        name,
        email,
        password,  // Raw password before hashing
        subject,
        rating,
        channelLink
      });

      // Hash the password
      const salt = await bcrypt.genSalt(10);  // Generate salt with 10 rounds
      newUser.password = await bcrypt.hash(password, salt);  // Hash the password using the salt
      
      // Log the hashed password
      console.log('Hashed Password for Teacher:', newUser.password);

    // Register a student
    } else if (role === 'student') {
      if (!grade || !category) {
        return res.status(400).json({ message: 'Grade and category are required for student registration' });
      }

      newUser = new Student({
        name,
        email,
        password,  // Raw password before hashing
        grade,
        category
      });

      // Hash the password
      const salt = await bcrypt.genSalt(10);  // Generate salt with 10 rounds
      newUser.password = await bcrypt.hash(password, salt);  // Hash the password using the salt

      // Log the hashed password
      console.log('Hashed Password for Student:', newUser.password);

    // Invalid role
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Save the new user
    await newUser.save();
    console.log('User saved successfully:', newUser);  // Log the user object to confirm save

    // Return a JWT token
    res.status(201).json({
      token: generateToken(newUser._id),
    });

  } catch (error) {
    console.error('Registration failed:', error);  // Log any error during registration
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// Login User (Teacher or Student)
export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    // Search for the user in the correct model based on role
    if (role === 'student') {
      user = await Student.findOne({ email });
    } else if (role === 'teacher') {
      user = await Teacher.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid role provided' });
    }

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate the token
    const token = generateToken(user._id);

    // Set token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // Ensures the cookie cannot be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
      maxAge: 30 * 24 * 60 * 60 * 1000 // Cookie expiry: 30 days
    });

    // Respond with user information (excluding the password)
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: role
      }
    });

  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};