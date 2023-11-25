import { Router } from "express";

import {
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  createSingleUser,
  updateSingleUser,
  processRegisterUser,
  activateUser,
} from '../controllers/userControllers'
import { uploadusers } from "../middlewares/uploadFile";

const userRoutes = Router();

userRoutes.post('/process-register', uploadusers.single('image'), processRegisterUser)
userRoutes.post("/activate",activateUser)
userRoutes.get("/", getAllUsers);
userRoutes.post("/", createSingleUser);
userRoutes.get("/:slug", getSingleUser);
userRoutes.put("/:slug", updateSingleUser);
userRoutes.delete("/:slug", deleteSingleUser);

export default userRoutes;
