import { Router } from "express";
import {
  addComment,
  editComment,
  getPostsWithTwoLevelOfComments,
} from "../controllers/postController";

const router = Router();

router.get("/posts", getPostsWithTwoLevelOfComments);
router.post("/add-comment", addComment);
router.put("/comments/:commentId", editComment);

export default router;
