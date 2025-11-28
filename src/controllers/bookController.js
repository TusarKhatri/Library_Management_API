import { books } from "../database/memory.js";

export const createBook = (req, res) => {
  const { name, author, genre, availability } = req.body;

  const newBook = {
    id: books.length + 1,
    name,
    author,
    genre,
    availability,
  };

  books.push(newBook);

  res.status(201).json({ message: "Book added", book: newBook });
};

export const getBooks = (req, res) => {
  let result = [...books];

  const { availability, genre, author } = req.query;

  // Filter by availability
  if (availability) {
    result = result.filter(
      (b) =>
        String(b.availability).toLowerCase() ===
        String(availability).toLowerCase()
    );
  }

  // Filter by genre
  if (genre) {
    result = result.filter(
      (b) => b.genre?.toLowerCase() === genre.toLowerCase()
    );
  }

  // (Optional) Filter by author
  if (author) {
    result = result.filter(
      (b) => b.author?.toLowerCase() === author.toLowerCase()
    );
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const start = (page - 1) * limit;
  const end = page * limit;

  res.json({
    page,
    total: result.length,
    books: result.slice(start, end),
  });
};

export const getBookById = (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book)
    return res.status(404).json({ message: "Book not found" });

  res.json(book);
};

export const updateBook = (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  Object.assign(book, req.body);

  res.json({ message: "Updated", book });
};

export const deleteBook = (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1)
    return res.status(404).json({ message: "Book not found" });

  books.splice(index, 1);

  res.json({ message: "Book deleted" });
};

export const borrowBook = (req, res) => {
  const bookId = Number(req.params.id);
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (user.role !== "member") {
    return res.status(403).json({ message: "Only members can borrow books" });
  }

  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (book.availability !== "available") {
    return res
      .status(400)
      .json({ message: "Book is not available to borrow" });
  }

  // Mark as borrowed
  book.availability = "borrowed";
  book.borrowedBy = user.id;
  
  res.json({
    message: "Book borrowed successfully",
    book,
  });
};
