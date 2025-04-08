import axios from 'axios';
import https from 'https';
import { create } from 'middleware-axios';

/**
 * Creates and returns an Axios instance with middleware applied.
 *
 * @returns {object} Axios instance with middleware
 */
export const configureAxios = () => {
  // Create a custom Axios instance
  const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // Set the base URL for all requests
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    // Disable SSL verification in development mode
    httpsAgent: new https.Agent({
      rejectUnauthorized: process.env.NODE_ENV !== 'production', // Verify certificates only in production
    }),
  });

  // Create middleware using the `create` function from `middleware-axios`
  const middleware = create(instance);

  // Add request middleware using the `use` method
  middleware.use({
    /**
     * Intercepts and modifies the request configuration before sending it.
     *
     * @param {object} config - The Axios request configuration object.
     * @returns {object} The modified request configuration object.
     */
    request: (config) => {
      // Add any request interceptors here
return config;
    },
    /**
     * Handles errors that occur during the request phase.
     *
     * @param {object} error - The error object from the request.
     * @returns {Promise} A rejected promise with the error.
     */
    requestError: (error) => {
      return Promise.reject(error);
    },
/**
 * Intercepts and processes the response before it is returned.
 *
 * @param {object} response - The Axios response object.
 * @returns {object} The processed response object.
 */
response: (response) => {
      // Add any response interceptors here
return response;
    },
    /**
     * Handles errors that occur during the response phase.
     *
     * @param {object} error - The error object from the response.
     * @returns {Promise} A rejected promise with the error.
     */
    responseError: (error) => {
      // Handle errors globally
return Promise.reject(error);
    },
  });

  return instance;
};

/**
 * Export the axios middleware instance for use in routes
 * This matches what's being imported in index.js
 */
export const axiosMiddleware = configureAxios();

export default configureAxios;