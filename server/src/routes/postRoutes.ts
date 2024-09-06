import { Router } from "express";
import {
  addPost,
  editPost,
  getPostsWithTwoLevelOfComments,
  likePost,
  unlikePost,
} from "../controllers/postController";
import { verifyJWT } from "../middleware/verifyJWT";
import upload from "../config/multer";

const router = Router();

router.use(verifyJWT);

router.get("/posts", getPostsWithTwoLevelOfComments);
router.post("/posts", verifyJWT, upload.single("image"), addPost);
router.put("/posts/:postId", verifyJWT, upload.single("image"), editPost);
router.post("/posts/:postId/like", verifyJWT, likePost);
router.post("/posts/:postId/unlike", verifyJWT, unlikePost);

export default router;
