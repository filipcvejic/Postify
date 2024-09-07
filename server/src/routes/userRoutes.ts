import { Router } from "express";
import {
  acceptFriendRequestHandler,
  declineFriendRequestHandler,
  sendFriendRequestHandler,
  removeFriendHandler,
} from "../controllers/userController";
import { verifyJWT } from "../middleware/verifyJWT";

const router = Router();

router.use(verifyJWT);

router.post("/friends/:friendId/accept", acceptFriendRequestHandler);
router.post("/friends/:friendId/send", sendFriendRequestHandler);
router.post("/friends/:friendId/decline", declineFriendRequestHandler);
router.post("/friends/:friendId/remove", removeFriendHandler);

export default router;
