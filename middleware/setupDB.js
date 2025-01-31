import { initializeDB } from '../utils/sqliteSetup.js';

/**
 * Sets up the database and attaches it to the request object.
 * @param {object} app - The Express application instance.
 */
export const setupDB = async (app) => {
  try {
		const db = await initializeDB();
    /**
     * Middleware to attach the database to the request object.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @param {Function} next - The next middleware function.
     */
    const dbRequest = (req, res, next) => {
      req.db = db;
			next();
    };

    app.use(dbRequest);
    console.log('Database initialized and middleware set up.');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
};