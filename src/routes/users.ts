import express from 'express';
import { isAuthorised } from '../middlewares/auth.middleware';
import {
  getListUsers,
  addUser,
  findUserById,
  changeUserById,
  deleteUserById,
  authLogin,
  takeGoogleUserData,
  takeOrCreateUserByGoogleToken,
} from '../services/user.service';


const router = express.Router();

router.get('/googleCheckIdToken', async (req: any, res: any, next: any) => {
  try {
    const result = await takeGoogleUserData(req.body.token)
    res.send(result);
  } catch (err) {
    console.log(`router ${err}`);
    if (err.message.includes('Token used too late')) {
      res.status(401).send("TokenExpired");
    } else {
      res.status(400).send("" + err);
    }

  }
});

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
    if (res.loginAsUser.id !== req.params.id) {
      throw 'Access denied. You can change only your data!';
    }
    const result = await changeUserById(req.params.id, req.body)
    res.send(result)
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

/* delete users by id */
router.delete('/:id', isAuthorised, async (req: any, res: any, next: any) => {
  try {
    if (res.loginAsUser.id !== req.params.id) {
      throw 'Access denied. You can delete only your data!';
    }
    const result = await deleteUserById(req.params.id);
    res.send(result)
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post('/auth/login', async (req: any, res: any, next: any) => {
  try {

    let token = req.headers.authorization;
    let result;
    console.log(token, 'token');
    if (token && token.startsWith('Google ')) {
      token = token.slice(7, token.length);
      result = await takeOrCreateUserByGoogleToken(token);
    } else {
      result = await authLogin(req.body);
    }
    res.send(result)
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

/* create user */
router.post('/auth/signup', async (req: any, res: any, next: any) => {
  try {
    const result = await addUser(req.body)
    res.send(result)
  } catch (err) {
    console.log(`router ${err}`);
    res.status(400).send(err);
  }
});

export default router;
