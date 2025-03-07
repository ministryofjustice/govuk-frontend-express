import { csrfSync } from "csrf-sync";

/**
 * Sets up CSRF protection for an Express application.
 *
 * - Protects against CSRF attacks using `csrfSync`.
 * - Ensures CSRF tokens are available in views for forms.
 *
 * @param {import('express').Application} app - The Express application instance.
 */
export const setupCsrf = (app) => {
    const {csrfSynchronisedProtection} = csrfSync({
        /**
         * Extracts the CSRF token from the request body.
         *
         * @param {import('express').Request} req - The incoming request object.
         * @returns {string|undefined} The CSRF token if present, otherwise undefined.
         */
        getTokenFromRequest: (req) => req.body._csrf,
    });

    /**
     * Middleware to enforce CSRF protection on incoming requests.
     * This applies the `csrfSynchronisedProtection` middleware globally.
     */
    app.use(csrfSynchronisedProtection);

    /**
     * Middleware to expose the CSRF token to views.
     * Adds `res.locals.csrfToken`, making it accessible in templates.
     *
     * @param {import('express').Request} req - The incoming request object.
     * @param {import('express').Response} res - The response object.
     * @param {import('express').NextFunction} next - Callback to pass control to the next middleware.
     */
    app.use((req, res, next) => {
        if (typeof req.csrfToken === "function") {
            res.locals.csrfToken = req.csrfToken(); // Makes CSRF token available in views
        }
        next();
    });
};