import { Router } from "express";
import { addComment, editComment } from "../controllers/commentController";

const router = Router();

router.post("/add-comment", addComment);
router.put("/comments/:commentId", editComment);

export default router;
