import dotenv from 'dotenv';
dotenv.config();

// Get environment variables
const config = {
    RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100,
    RATE_WINDOW_MS: parseInt(process.env.RATE_WINDOW_MS, 10) || 15 * 60 * 1000,
};

export default config;