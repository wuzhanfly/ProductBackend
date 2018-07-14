let product = require('../service/product');
let router = require('express').Router();
router.get('/find',async(req,res)=>{
    let products = await product.getProductsByPage(req.query.page);
    res.success(products)
})
router.post('/add', async (req, res)=>{
    res.success(await product.addProd(req.body))
});

router.put('/:id', async (req, res)=>{
    await product.updateProduct(req.params.id, req.body)
    res.success()
});

router.delete('/:id', async (req, res)=>{
    await product.deleteProd(req.params.id)
    res.success()
});

module.exports = router