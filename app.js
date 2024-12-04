import express from 'express';
import session from 'express-session';
import studentRoutes from './routes/studentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import path from 'path';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose'; // Importing mongoose for MongoDB connection
import subscriptionRoutes from './routes/subscriptionRoutes.js';

dotenv.config(); // Load environment variables

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,  // Secret for signing the session ID cookie
  resave: false,                      // Don't save session if unmodified
  saveUninitialized: false,           // Don't create a session until something is stored
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,  // MongoDB URI for storing sessions
    collectionName: 'sessions',       // Collection name for sessions
  }),
  cookie: {
    secure: false,                    // Set true if using HTTPS
    httpOnly: true,                   // Prevents JavaScript access to cookies
    maxAge: 24 * 60 * 60 * 1000,      // Cookie expiry time (1 day)
  }
}));

// Setting up view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));
app.use('/api/subscriptions', subscriptionRoutes);  // Routes for subscription-related actions

// Serve static files
app.use(express.static(path.join(process.cwd(), 'public')));

// Define API routes
app.use('/api/students', studentRoutes); // Student routes, including new enrollment route
app.use('/api/users', userRoutes);

// Route for rendering register page
app.get("/register", (req, res) => {
  res.render("register");
});

// Route for rendering login page
app.get("/login", (req, res) => {
  res.render("login");
});

// Route for home page (requires session)
app.get("/home", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("home", { username: req.session.user.username });
});

// 404 Page not found
app.use((req, res) => {
  res.status(404).render("404", { message: "Page not found!" });
});

// MongoDB connection setup (No longer using deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((error) => console.log('MongoDB Connection Error:', error));

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
