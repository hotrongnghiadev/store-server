import express from 'express';
import * as ctls from '../controllers/user.controller.js';
import * as vlds from '../validations/user.validation.js';
import * as mdws from '../middlewares/index.js';

const router = express.Router();

router.post('/signup', [mdws.validate(vlds.signup)], ctls.signup);

router.post('/signin', [mdws.validate(vlds.signin)], ctls.signin);

router.post(
  '/update-password',
  [mdws.handleToken, mdws.validate(vlds.updatePassword)],
  ctls.updatePassword
);

router.get('/current', [mdws.handleToken], ctls.getCurrent);

export default router;
