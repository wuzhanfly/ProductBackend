let Product = require('../modle/product');
let config = require('../config');
//add
async function addProd(product) {
    return await Product.create(product)

}
//findbypage
async function getProductsByPage(page=1){
    return await Product.find().skip((page-1)*config.PageCount).limit(config.PageCount)
        .sort('created').select('-__v')
}
async function isIdExist(id) {
    let res = await Product.findOne({_id: id});
    if(!res){
        throw Error(`id为${id}的商品不存在`)
    }
}
//update
async function updateProduct(id,update) {
    await isIdExist(id)
    let newProd = await Product.updateOne({_id:id},update);

    if (newProd.n<1){
        throw Error('更新失败！！！！！！！！！！！！')
    }

}
//delete
async function deleteProd(id){
    await isIdExist(id)
    let res = await Product.deleteOne({_id:id});
    if (res.n<1){
        throw Error('删除失败！！！！！！！！！！！')
    }
}
async function getProductById(id) {
    await isIdExist(id)

    return await Product.findOne({_id: id});
}
module.exports={
    addProd,
    getProductsByPage,
    updateProduct,
    deleteProd,
    getProductById
}
