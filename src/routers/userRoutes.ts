import { Router } from "express";

import {
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  createSingleUser,
  updateSingleUser,
  registerUser,
} from "../controllers/userControllers";
import { uploadusers } from "../middlewares/uploadFile";

const userRoutes = Router();

userRoutes.post('/register', uploadusers.single('image'), registerUser)
//userRoutes.get(activate,createSingleUser)
userRoutes.get("/", getAllUsers);
userRoutes.post("/", createSingleUser);
userRoutes.get("/:slug", getSingleUser);
userRoutes.put("/:slug", updateSingleUser);
userRoutes.delete("/:slug", deleteSingleUser);

export default userRoutes;
