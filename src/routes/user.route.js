import express from 'express';
import * as ctrls from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', ctrls.signup);

export default router;
