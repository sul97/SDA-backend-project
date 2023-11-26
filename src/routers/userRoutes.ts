import { Router } from "express";

import {
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  processRegisterUserController,
  activateUser,
  banUser,
  unbanUser,
} from '../controllers/userControllers'
import { uploadusers } from "../middlewares/uploadFile";

const userRoutes = Router();

userRoutes.post('/process-register', uploadusers.single('image'), processRegisterUserController)
userRoutes.post("/activate",activateUser)
userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getSingleUser);
userRoutes.put("/:id", updateSingleUser);
userRoutes.delete("/:id", deleteSingleUser);
userRoutes.put('/ban/:id', banUser)
userRoutes.put('/unban/:id', unbanUser)


export default userRoutes;
