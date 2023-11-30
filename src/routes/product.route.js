import multer from 'multer';
import express from 'express';
import * as ctls from '../controllers/product.controller.js';
import * as mdws from '../middlewares/index.js';
import * as vlds from '../validations/product.validation.js';

const router = express.Router();

router.post(
  '/create',
  [
    // upload+multer must be placed before validate, with multipart/form-data, server cannot get data json from the client
    mdws.uploadCloud.fields([
      { name: 'thumb', maxCount: 1 },
      { name: 'images', maxCount: 10 },
    ]),
    // mdws.validate(vlds.create),
  ],
  ctls.create
);

export default router;
