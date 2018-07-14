
let config=null
if (process.env.NODE_ENV==='production'){
    //prod
    config=require('./prod')
}else {
    config=require('./dev')
}
module.exports=config