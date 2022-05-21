var express = require('express');
var router = express.Router();
import { isAuthorised } from '../middlewares/auth.middleware';
import {
  getListUsers,
  addUser,
  findUserById,
  changeUserById,
  deleteUserById,
} from '../services/user.service';

/* GET users listing. */
router.get('/', isAuthorised, function (req: any, res: any, next: any) {
  getListUsers((error: any, result: any) => {
    if (error) {
      return res.status(400).send(`Some error`);
    }
    res.send(result);
  })
});

/* GET users by id */
router.get('/:id', isAuthorised, function (req: any, res: any, next: any) {
  findUserById(req.params.id, (error: any, result: any) => {
    if (error) {
      console.log(error);
      res.status(400).send(error);
    } else {
      res.send(result)
    }
  });

});

/* add user */
router.post('/', isAuthorised, function (req: any, res: any, next: any) {
  addUser(req.body, (error: any, result: any) => {
    if (error) {
      console.log(error);
      res.status(400).send(error);
    } else {
      res.send(result)
    }
  });
});

/* change users by id */
router.put('/:id', isAuthorised, function (req: any, res: any, next: any) {
  changeUserById(req.params.id, req.body, (error: any, result: any) => {
    if (error) {
      console.log(error);
      res.status(400).send(error);
    } else {
      res.send(result)
    }
  });

});

/* delete users by id */
router.delete('/:id', isAuthorised, function (req: any, res: any, next: any) {
  deleteUserById(req.params.id, (error: any, result: any) => {
    if (error) {
      console.log(error);
      res.status(400).send(error);
    } else {
      res.send(result)
    }
  });

});

module.exports = router;
