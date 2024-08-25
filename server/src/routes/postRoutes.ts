import { Router } from "express";
import {
  addPost,
  editPost,
  getPostsWithTwoLevelOfComments,
} from "../controllers/postController";

const router = Router();

router.get("/posts", getPostsWithTwoLevelOfComments);
router.post("/add-post", addPost);
router.put("/posts/:postId", editPost);

export default router;
