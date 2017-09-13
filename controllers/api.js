const models = require('../models/');

const ApiController = {
  list: function(req, res) {
    models.Snacks.findAll().then(function(items){
      res.json(items);
    });

  },
  buy: function(req, res) {
    let itemId = req.params.id;
    let money = req.body.money;
    let change = 0;
    let message = '';

    models.Snacks.findById(itemId).then(function(snack){
      //perform snack math calculation per money entered
      if(money >= snack.cost && snack.quantity > 0) {
          snack.quantity -= 1;
          snack.purchased += 1;
          snack.save();
          change = (money - snack.cost);
          message = "Change: " + change;

            const newTranscation = models.Transaction.create({
            date: Date.now(),
            amountPaid: money - snack.cost,
            itemId: itemId
            });

          return res.json({message: message, data: snack})
      } else if (snack.quantity === 0){
          message = 'Item out of stock';
          return res.json({message:message, data: snack});
      } else if (money < snack.cost) {
          message = "Not enough funds to purchase item.";
          return res.json({message: message, data: snack})
      }
    });
  },
  buyList: function(req, res) {
    models.Transaction.findAll({
      include: [
        {model: models.Snacks}
      ]}).then(function(transactions){
        res.json({Information: transactions});
      });
  },
  //add this table later
  money: function(req, res) {
    models.Transaction.sum('amountPaid').then(function(total) {
      res.json({totalMoneyPaid: total});
    });
  },
  add: function(req, res) {
    const newItem = models.Snacks.create({
      item: req.body.name,
      description: req.body.description,
      cost: req.body.cost,
      quantity: req.body.quantity,
      purchased: 0,
      paid: null,
      purchasedTime: null,
    });
    models.Snacks.findAll().then(function(snacks){
      res.json(snacks);
    });
  },
  update: function(req, res) {
    itemId = req.params.id;
    models.Snacks.findById(itemId).then(function(snack){
      snack.quantity = req.body.quantity;
      snack.cost = req.body.cost;
      snack.description = req.body.description;
      snack.save();
      return;
    });
  }

};

module.exports = ApiController;
