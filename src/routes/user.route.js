import express from 'express';

const router = express.Router();

router.get('/hello', () => {
  console.log('Hello');
});

export default router;
