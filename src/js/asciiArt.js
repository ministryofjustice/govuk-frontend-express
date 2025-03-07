// Custom JS goes in here.
const messages = [
    "Welcome to GOVUK Frontend Express.",
    "Like what you see? Want to work with us?",
    "View our job availabilities or sign up for alerts:",
    "{{Department jobs page}}"
];

// Join messages with spaces
const formattedMessage = messages.join("\n");

// ASCII Art for your department.
//Art created by: https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20
console.log(`
  __  __  ____       _ 
 |  \\/  |/ __ \\     | |
 | \\  / | |  | |    | |
 | |\\/| | |  | |_   | |
 | |  | | |__| | |__| |
 |_|  |_|\\____/ \\____/  

${formattedMessage}`);