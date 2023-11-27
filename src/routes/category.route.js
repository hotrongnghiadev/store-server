import express from 'express';
import * as ctls from '../controllers/category.controller.js';
import * as mdws from '../middlewares/index.js';

const router = express.Router();

router.post('/create', [mdws.handleToken], ctls.create);
router.get('/getAll', [mdws.handleToken], ctls.getAll);
router.delete('/delMany', [mdws.handleToken], ctls.delMany);
router.put('/update/:id', [mdws.handleToken], ctls.update);

export default router;
