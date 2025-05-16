import express, { Express, Request, Response, NextFunction } from 'express';
var router = express.Router({ caseSensitive: process.env.CASE_SENSITIVE === 'true' || false });

/* GET home page. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.render('index', { title: 'Express' });
});

export default router;
