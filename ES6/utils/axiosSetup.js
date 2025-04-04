import axios from 'axios';
import { create } from 'middleware-axios';

/**
 * Axios middleware to attach Axios instance to request object.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
export const axiosMiddleware = (req, res, next) => {
  const protocol = req.protocol;
  const host = req.get('host');
  const baseURL = `${protocol}://${host}`;

  // Create wrapped instance of axios to use normal axios instance
  req.axiosMiddleware = create({
		axiosInstance: axios, // Pass in the axios instance
    baseURL: baseURL,
    timeout: 5000, // Set a timeout value if needed
    headers: {
      'Content-Type': 'application/json',
      // You can add other default headers here if needed
    },
  });
  next();
};