const express = require('express');
const ApiController = require('./controllers/api')

module.exports = function(app){
  const apiRouter = express.Router();

  apiRouter.get('/customer/items', ApiController.list);
  apiRouter.post('/customer/items/:id/purchases', ApiController.buy);
  apiRouter.get('/vendor/money', ApiController.money);
  apiRouter.get('/vendor/transactions', ApiController.buyList);
  apiRouter.post('/vendor/items', ApiController.add);
  apiRouter.put('/vendor/items/:id', ApiController.update);

  app.use('/api', apiRouter);
};
