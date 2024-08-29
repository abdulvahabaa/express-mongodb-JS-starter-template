import express from "express";
import pool from "../connection/db.mjs";
import { verifyToken } from "../middleware/verifyToken.mjs";
import { getUser } from "../controllers/userData.mjs";

const userRoutes = express.Router({ mergeParams: true });

userRoutes.get("/:id", getUser);

// userRoutes.get("/:id", verifyToken, getUser);

export default userRoutes;
