import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct,
} from "../controllers/product.controller.js";
import { loginAdmin, setSetting } from "../controllers/admin.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/settings").get(setSetting);

//public routes
router.route("/").get(getAllProducts);

router.route("/product/:id").get(getSingleProduct);

router.route("/login").post(loginAdmin);

router.route("/verify/jwt").get(verifyToken, (req, res) => {
  console.log(req?.user?.admin);
  let loggedIn = false;
  if (req?.user?.admin) {
    loggedIn = true;
  }

  return res.status(200).json(loggedIn);
});

export default router;
