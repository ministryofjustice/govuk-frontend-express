/**
 * @file Displays an ASCII Art banner on application startup.
 * Uses `figlet` for ASCII rendering and `chalk` for color formatting.
 */

import figlet from 'figlet';
import chalk from 'chalk';

/**
 * Displays an ASCII Art banner with the provided service name and port.
 *
 * @param {object} config - Configuration object containing service details.
 * @param {string} config.SERVICE_NAME - The name of the service to display in ASCII Art.
 * @param {number} config.app.port - The port number where the service is running.
 */
const displayAsciiBanner = (config) => {
    figlet(config.SERVICE_NAME, (err, data) => {
        if (err) {
            console.error('❌ Error generating ASCII art:', err);
            return;
        }

        console.clear(); // Clears terminal for a fresh display
        console.log(chalk.blue.bold(data)); // Render ASCII Art in blue
        console.log(chalk.green('Server is running at:'));
        console.log(chalk.cyan.underline(`http://localhost:${config.app.port}`)); // Clickable link in most terminals
    });
};

// Export the function for use in other files
export { displayAsciiBanner };
