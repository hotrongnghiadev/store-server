import express from 'express';
import * as ctls from '../controllers/product.controller.js';
import * as mdws from '../middlewares/index.js';
import * as vlds from '../validations/product.validation.js';

const router = express.Router();

router.post(
  '/create',
  [
    mdws.validate(vlds.create),
    mdws.uploadCloud.fields([
      { name: 'thumb', maxCount: 1 },
      { name: 'images', maxCount: 10 },
    ]),
  ],
  ctls.create
);

export default router;
