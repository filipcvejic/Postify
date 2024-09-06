import { Router } from "express";
import {
  acceptFriendRequest,
  declineFriendRequest,
  sendFriendRequest,
} from "../controllers/userController";
import { verifyJWT } from "../middleware/verifyJWT";

const router = Router();

router.use(verifyJWT);

router.post("/friends/:friendId/accept", acceptFriendRequest);
router.post("/friends/:friendId/send", sendFriendRequest);
router.post("/friends/:friendId/decline", declineFriendRequest);
router.post("/friends/:friendId/remove", declineFriendRequest);

export default router;
