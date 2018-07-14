module.exports=(req,res,next)=>{
    //success funcion
    res.success=(data)=>{
        res.send({
            code:0,
            data:data,
            mag:'success!!!!'
        })
    }
    // 给res对象安装fail方法
    res.fail = (msg)=>{
        res.send({
            code: -1,
            msg: msg
        })
    };

    next();
}