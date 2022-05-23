import express from 'express';
import { isAuthorised } from '../middlewares/auth.middleware';
import {
  getListUsers,
  addUser,
  findUserById,
  changeUserById,
  deleteUserById,
} from '../services/user.service';

const router = express.Router();

/* GET users listing. */
router.get('/', isAuthorised, async (req: any, res: any, next: any) => {
  try {
    const result = await getListUsers();
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

/* GET users by id */
router.get('/:id', isAuthorised, async (req: any, res: any, next: any) => {
  try {
    const result = await findUserById(req.params.id)
    res.send(result)
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

/* add user */
router.post('/', isAuthorised, async (req: any, res: any, next: any) => {
  try {
    const result = await addUser(req.body)
    res.send(result)
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

/* change users by id */
router.put('/:id', isAuthorised, async (req: any, res: any, next: any) => {
  try {
    const result = changeUserById(req.params.id, req.body)
    res.send(result)
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

/* delete users by id */
router.delete('/:id', isAuthorised, async (req: any, res: any, next: any) => {
  try {
    const result = await deleteUserById(req.params.id);
    res.send(result)
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

export default router;
