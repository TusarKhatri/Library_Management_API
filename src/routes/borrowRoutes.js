// routes/borrowRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import { borrowBook } from "../controllers/bookController.js";

const router = express.Router();

// POST /api/borrow/:id
router.post("/:id", auth, role(["member"]), borrowBook);

export default router;
