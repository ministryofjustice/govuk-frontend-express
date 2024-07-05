const config = require('../config');

/**
 * Middleware setup function to attach configuration settings to response locals.
 * This makes config values accessible in all templates rendered by the app.
 *
 * @param {object} app - The Express application instance.
 */
const setupConfig = (app) => {
    /**
     * Middleware to add config to response locals.
     *
     * @param {object} req - The Express request object.
     * @param {object} res - The Express response object.
     * @param {function} next - The next middleware function in the stack.
     */
    const configMiddleware = (req, res, next) => {
        res.locals.config = config;
        next();
    };
    app.use(configMiddleware);
};

module.exports = setupConfig;