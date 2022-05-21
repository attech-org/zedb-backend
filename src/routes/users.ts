import express from 'express';
import { isAuthorised } from '../middlewares/auth.middleware';
import {
  getListUsers,
  addUser,
  findUserById,
  changeUserById,
  deleteUserById,
} from '../services/user.service';

export const router = express.Router();

/* GET users listing. */
router.get('/', isAuthorised, (req: any, res: any, next: any) => {
  getListUsers()
    .then((result) => {
      res.send(result);
    }).catch((error) => {
      return res.status(400).send(`Some error`);
    })
});

/* GET users by id */
router.get('/:id', isAuthorised, (req: any, res: any, next: any) => {
  findUserById(req.params.id)
    .then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
});

/* add user */
router.post('/', isAuthorised, (req: any, res: any, next: any) => {
  addUser(req.body)
    .then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })

});

/* change users by id */
router.put('/:id', isAuthorised, (req: any, res: any, next: any) => {
  changeUserById(req.params.id, req.body)
    .then((result) => {
      res.send(result)
    }).catch((error: any) => {
      console.log(error);
      res.status(400).send(error);
    })
});

/* delete users by id */
router.delete('/:id', isAuthorised, (req: any, res: any, next: any) => {
  deleteUserById(req.params.id)
    .then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(400).send(error);
    })
});


