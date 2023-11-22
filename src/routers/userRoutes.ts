import { Router } from "express";

import {
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  createSingleUser,
  updateSingleUser,
} from "../controllers/userControllers";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/", createSingleUser);
userRoutes.get("/:slug", getSingleUser);
userRoutes.put("/:slug", updateSingleUser);
userRoutes.delete("/:slug", deleteSingleUser);

export default userRoutes;
