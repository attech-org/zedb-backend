import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req: any, res: any, next: any) => {
  res.send({ title: 'Our ZEDB project!!!' });
});

export default router;
