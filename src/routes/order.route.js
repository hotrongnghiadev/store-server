import express from 'express';
import * as ctls from '../controllers/order.controller.js';
import * as mdws from '../middlewares/index.js';
import * as vlds from '../validations/order.validation.js';

const router = express.Router();

router.post(
  '/create',
  [mdws.handleToken, mdws.validate(vlds.create)],
  ctls.create
);

router.get('/get-all', [mdws.handleToken], ctls.getAll);
router.get('/get-by-user', [mdws.handleToken], ctls.getByUser);

export default router;
