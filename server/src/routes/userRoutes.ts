import { Router } from "express";
import {
  acceptFriendRequest,
  sendFriendRequest,
} from "../controllers/userController";

const router = Router();

router.post("/accept-request/:friendId", acceptFriendRequest);
router.post("/send-request/:friendId", sendFriendRequest);

export default router;
