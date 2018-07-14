let config = require('../config');
let Category = require('../modle/category');

async function addcategory(category) {
    return await Category.create(category)
}
//分页查询

async function getCategoryPage(page=1) {
    return await Category.find().skip(config.PageCount*(page-1)).limit(config.PageCount)
        .sort('created').select('-__v')

}
//category id 是否存在
async function isIdExist(id) {
    let res = await Category.findOne({_id: id});
    if (!res){
        throw Error (`产品id为:${id}不存在`)
    }

}
//update
async function updateCategory(id,update) {
    await isIdExist(id)
    let res = await Category.updateOne({_id:id}, update);
    if (res.n<1) {
        throw Error ('更新失败')
    }

}
async function deleteCategory(id) {
    //判断id是否存在
    await isIdExist(id)

    let res = await Category.deleteOne({_id: id});
    if (res.n < 1) {
        throw Error("删除失败")
    }
}
module.exports={
    addcategory,
    getCategoryPage,
    updateCategory,
    deleteCategory


}