// Optional for your frontend
/**
 * @file Custom JavaScript for GOV.UK Frontend Express.
 * Displays an ASCII art displayAsciiBanner.js and job availability information in the console.
 *
 * ASCII Art created by: https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20
 */

/**
 * Messages to display in the console.
 * @type {string[]}
 */
const messages = [
    "Welcome to GOVUK Frontend Express.",
    "Like what you see? Want to work with us?",
    "View our job availabilities or sign up for alerts:",
    "{URL link to your departments jobs}" // Update this dynamically if needed
];

/**
 * Joins messages into a single formatted string with line breaks.
 * @returns {string} Formatted message string
 */
const getFormattedMessage = () => messages.join("\n");

/**
 * Displays an ASCII Art displayAsciiBanner.js with department name in the console.
 */
const displayConsoleBanner = () => {
    console.log(`
  __  __  ____       _ 
 |  \\/  |/ __ \\     | |
 | \\  / | |  | |    | |
 | |\\/| | |  | |_   | |
 | |  | | |__| | |__| |
 |_|  |_|\\____/ \\____/  

${getFormattedMessage()}
`);
};

// Run displayAsciiBanner.js display when the script loads
displayConsoleBanner();

export { displayConsoleBanner };