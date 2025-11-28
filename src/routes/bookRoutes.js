// src/routes/bookRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/", auth, role(["admin"]), createBook);       // ✅ POST for creating
router.put("/:id", auth, role(["admin"]), updateBook);
router.delete("/:id", auth, role(["admin"]), deleteBook);


router.get("/", auth, getBooks);
router.get("/:id", auth, getBookById);


router.post("/:id/borrow", auth, role(["member"]), borrowBook);

export default router;
