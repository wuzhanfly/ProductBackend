let Category = require('../service/category');
let router = require('express').Router();
router.get('/',async(req,res)=>{
    let category = await Category.getCategoryPage(req.query.page);
    res.success(category)
})

router.post('/add',async(req,res)=>{
    let c = await Category.addcategory(req.body)
    res.success(c)
})
router.put('/:id',async(req,res)=>{
    await Category.updateCategory(req.params.id,req.body);
    res.success()
})
router.delete('/:id',async(req,res)=>{
    await Category.deleteCategory(req.params.id)
    res.success()
})

module.exports=router