import express from "express";
import {handleuserSignup, handleuserLogin} from "../controllers/user.js";
const router = express.Router();

router.post('/', handleuserSignup);
router.post('/login', handleuserLogin);

export default router;