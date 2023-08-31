import express from "express";
import {
  isAdmin,
  requireSignIn,
} from "../../src/middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  getallCategory,
  getsingleCategory,
  deleteCategory,
} from "../controllers/categorycontroller.js";

const router = express.Router();

router.post("/create-category", requireSignIn, isAdmin, createCategory);
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategory);

router.get("/get-all-category", getallCategory);
router.get("/get-single-category/:id", getsingleCategory);

//delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategory);

export default router;
