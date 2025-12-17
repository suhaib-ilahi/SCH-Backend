import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
} from "../controllers/product.controller.js";
import { logoutAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.route("/publish").post(addProduct);

router.route("/edit/:id").put(editProduct);

router.route("/delete/:id").delete(deleteProduct);

router.route("/logout").post(logoutAdmin);

export default router;
