import express from "express";
const router = express.Router();
import {
  getAllPasswords,
  createPassword,
  getPassword,
  deletePassword,
  updatePassword,
} from "../controllers/manager.js";

router.route("/").get(getAllPasswords).post(createPassword);
router
  .route("/:id")
  .get(getPassword)
  .delete(deletePassword)
  .patch(updatePassword);

export default router;
