import multer from 'multer';
import express from 'express';
import * as ctls from '../controllers/product.controller.js';
import * as mdws from '../middlewares/index.js';
import * as vlds from '../validations/product.validation.js';

const router = express.Router();

router.post(
  '/create',
  [
    mdws.handleToken,
    // upload+multer must be placed before validate, with multipart/form-data, server cannot get data json from the client
    mdws.uploadCloud.fields([
      { name: 'thumb', maxCount: 1 },
      { name: 'images', maxCount: 10 },
    ]),
    mdws.validate(vlds.create),
  ],
  ctls.create
);

router.put(
  '/update/:id',
  [
    mdws.handleToken,
    // upload+multer must be placed before validate, with multipart/form-data, server cannot get data json from the client
    mdws.uploadCloud.fields([
      { name: 'thumb', maxCount: 1 },
      { name: 'images', maxCount: 10 },
    ]),
    mdws.validate(vlds.update),
  ],
  ctls.update
);

router.delete('/delMany', [mdws.handleToken], ctls.delMany);

router.get('/get-all', ctls.getAll);
router.get('/get-one/:slug', ctls.getOne);
router.get('/get-one-by-id/:id', ctls.getOneById);
router.get('/filter', ctls.filter);
router.patch('/rate/:id', [mdws.handleToken], ctls.rate);

export default router;
