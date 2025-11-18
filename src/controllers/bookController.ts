import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Request, Response } from 'express';

// Recreate __dirname and __filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to JSON file
const dataFile = path.join(__dirname, '../data/books.json');

// Define TypeScript interface for Book
interface Book {
  id: number;
  title: string;
  author: string;
  year?: number;
}

// Add Book Controller
export const addBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, author, year } = req.body;

    // Basic validation
    if (
      typeof title !== 'string' ||
      typeof author !== 'string' ||
      !title.trim() ||
      !author.trim()
    ) {
      res.status(400).json({ error: 'Invalid book data' });
      return;
    }

    if (year !== undefined && typeof year !== 'number') {
      res.status(400).json({ error: 'Invalid book data' });
      return;
    }

    // Read existing data
    const data = await fs.readFile(dataFile, 'utf-8');
    const books: Book[] = JSON.parse(data);

    // Create new book
    const newBook: Book = {
      id: books.length ? books[books.length - 1].id + 1 : 1,
      title: title.trim(),
      author: author.trim(),
      year,
    };

    books.push(newBook);
    await fs.writeFile(dataFile, JSON.stringify(books, null, 2));

    res.status(201).json(newBook);
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
