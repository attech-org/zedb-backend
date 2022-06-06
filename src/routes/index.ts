import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req: any, res: any, next: any) => {
  res.send({ title: 'Our ZEDB project!!!' });
});

router.get('/test', (req: any, res: any, next: any) => {
  res.render('../views/index');
});

router.get('/success', (req: any, res: any, next: any) => {
  res.render('../views/success');
});

export default router;
