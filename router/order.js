let order = require('../service/order');
let router = require('express').Router();
router.get('/find',async(req,res)=>{
    let order = await order.findByPage(req.query.page);
    res.success(order)
})


router.post('/add',async(req,res)=>{
      let newOrder = await order.addOrder(req.body);
      res.success(newOrder)
})

module.exports = router