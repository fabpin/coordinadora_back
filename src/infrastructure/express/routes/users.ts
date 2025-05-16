import express, { Express, Request, Response, NextFunction } from 'express';
var router = express.Router({ caseSensitive: process.env.CASE_SENSITIVE === 'true' || false });

/* GET users listing. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.send('respond with a resource');
});

export default router;
