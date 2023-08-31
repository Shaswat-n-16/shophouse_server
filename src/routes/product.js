import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getSingleProduct,
  productPhoto,
  updateProduct,
  productList,
  productCount,
  productFilters,
  searchProduct,
  relatedProduct,
  productCategory,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProduct
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProduct
);

//get products
router.get("/get-product", getProduct);

//single product
router.get("/get-product/:slug", getSingleProduct);

//get photo
router.get("/product-photo/:pid", productPhoto);

//delete rproduct
router.delete("/delete-product/:pid", deleteProduct);

//filter product

router.post("/product-filters", productFilters);

//product count
router.get("/product-count", productCount);

//product per page
router.get("/product-list/:page", productList);

router.get("/search/:keyword", searchProduct);

//similar products
router.get("/related-product/:pid/:cid", relatedProduct);

router.get("/product-category/:slug", productCategory);
export default router;
