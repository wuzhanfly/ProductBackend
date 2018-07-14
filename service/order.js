
let Order = require('../modle/order');
let productService = require('../service/product');
let Big = require('big.js');
let config = require('../config');

async function addOrder(order) {
    let p = await productService.getProductById(order.productId);
    if (p.stack<order.count){
        throw Error('商品库存不足')
    }
    order.productName=p.name
    order.productPrice=p.price
    order.totalPrice=Big(order.productPrice).times(order.count)

    let orders = await Order.create(order);
    return orders
}
async function findByPage(page=1){
    return await Order.find().skip((page-1)*config.PageCount).limit(config.PageCount)
        .sort('crested').select('-__v')
}
module.exports = {
    addOrder,
    findByPage

}
