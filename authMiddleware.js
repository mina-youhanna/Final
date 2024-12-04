import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  let token;

  // Check for token in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;  // Get token from cookies
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the request object
    req.user = { id: decoded.id };

    next();  // Continue to the next middleware/route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
