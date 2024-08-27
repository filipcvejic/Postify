import { Router } from "express";
import {
  addPost,
  editPost,
  getPostsWithTwoLevelOfComments,
} from "../controllers/postController";
import { verifyJWT } from "../middleware/verifyJWT";

const router = Router();

router.use(verifyJWT);

router.get("/posts", getPostsWithTwoLevelOfComments);
router.post("/add-post", addPost);
router.put("/posts/:postId", editPost);

export default router;
