// controllers/bookController.js
import { books } from "../database/memory.js";

export const borrowBook = (req, res) => {
  const bookId = Number(req.params.id);
  const user = req.user;          // set by auth middleware

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Only members can borrow (admins just manage books)
  if (user.role !== "member") {
    return res.status(403).json({ message: "Only members can borrow books" });
  }

  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Admin should set availability = "available" when publishing the book
  if (book.availability !== "available") {
    return res.status(400).json({ message: "Book is not available to borrow" });
  }

  // Simple: just mark it as borrowed
  book.availability = "borrowed";
  book.borrowedBy = user.id;   // optional extra info

  return res.json({
    message: "Book borrowed successfully",
    book,
  });
};