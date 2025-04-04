/**
 * Sets up Helmet middleware for the Express application to configure Content Security Policy (CSP).
 *
 * @param {object} app - The Express application instance.
 */
import helmet from 'helmet';
import crypto from 'crypto';

/**
 * Middleware to generate a unique CSP nonce for each request.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next function.
 */
export const nonceMiddleware = (req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString('base64'); // Generate a secure random nonce
  next();
};

/**
 * Sets up Helmet's Content Security Policy (CSP) with a dynamic nonce.
 *
 * @param {object} app - The Express application instance.
 */
export const helmetSetup = (app) => {
  app.use(nonceMiddleware); // Apply nonce middleware before Helmet

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          (req, res) => `'nonce-${res.locals.cspNonce}'` // Attach dynamically generated nonce
        ],
        imgSrc: ["'self'"],
        connectSrc: ["'self'"]
      }
    }
  }));
};

