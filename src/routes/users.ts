var express = require('express');
var router = express.Router();
import { isAuthorised } from '../middlewares/auth.middleware';
import {
  getListUsers,
  addUser,
} from '../services/user.service';

/* GET users listing. */
router.get('/', isAuthorised, function (req: any, res: any, next: any) {
  getListUsers((error:any, result:any) => {
    if (error) {
      return res.status(400).send(`Some error`);
    }
    res.send(result);
  })
});

/* add user */
router.post('/', isAuthorised, function (req:any, res:any, next:any) {
  addUser(req.body, (error:any, result:any) => {
    if (error) {
      console.log(error);
      res.status(400).send(error);
    } else {
      res.send(result)
    }
  });

});

module.exports = router;
