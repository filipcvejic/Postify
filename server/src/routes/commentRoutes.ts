import { Router } from "express";
import { addComment, editComment } from "../controllers/commentController";
import { verifyJWT } from "../middleware/verifyJWT";

const router = Router();

router.use(verifyJWT);

router.post("/add-comment", addComment);
router.put("/comments/:commentId", editComment);

export default router;
