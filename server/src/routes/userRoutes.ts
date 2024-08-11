import { Router } from "express";
import {
  acceptFriendRequest,
  sendFriendRequest,
} from "../controllers/userController";
import { verifyJWT } from "../middleware/verifyJWT";

const router = Router();

router.use(verifyJWT);

router.post("/accept-request/:friendId", acceptFriendRequest);
router.post("/send-request/:friendId", sendFriendRequest);

export default router;
