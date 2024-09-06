import { Router } from "express";
import {
  addComment,
  editComment,
  likeComment,
  unlikeComment,
} from "../controllers/commentController";
import { verifyJWT } from "../middleware/verifyJWT";

const router = Router();

router.use(verifyJWT);

router.post("/comments", addComment);
router.put("/comments/:commentId", editComment);
router.post("/comments/:commentId/like", likeComment);
router.post("/comments/:commentId/unlike", unlikeComment);

export default router;
