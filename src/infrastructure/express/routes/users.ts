import express, { Express, Request, Response, NextFunction } from 'express';
import { loginUser } from '../../../interfaces/controllers/userController';
var router = express.Router({ caseSensitive: process.env.CASE_SENSITIVE === 'true' || false });
import { validationCredentials } from '../../../interfaces/validators/validateCredentials';


/* GET users listing. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.send('respond with a resource');
});

router.post('/login', [validationCredentials], loginUser);
/* router.post('/login', loginUser); */

export default router;
