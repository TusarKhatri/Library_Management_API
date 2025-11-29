import { books } from "../database/memory.js";

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
    return res.status(400).json({ message: "Book is not available to borrow" });
  }


  book.availability = "borrowed";
  book.borrowedBy = user.id; 

  return res.json({
    message: "Book borrowed successfully",
    book,
  });
};