import sqlite3 from "sqlite3";
import { open } from "sqlite";

sqlite3.verbose();

/**
 * Initializes and returns an SQLite database connection.
 *
 * @returns {Promise<sqlite3.Database>} A promise that resolves to the SQLite database connection.
 */
export const initializeDB = async () => {
    const db = await open({
    filename: ":memory:", // Using in-memory database for simplicity, use a file path for persistent storage
    driver: sqlite3.Database,
    });

  // Initialize your database schema here.
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )
  `);

  return db;
};
