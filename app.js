require('./bd')
require('express-async-errors')
let express = require('express');
let config = require('./config');
let bodyParser = require('body-parser');
let morgana = require('morgan');
let app = express()
//注册日志中间件
app.use(morgana('combined'))
// 注册body-parser中间件
app.use(bodyParser.json())
// 注册自定义的中间件
app.use(require('./middleware/res_mid'));
app.use(require('./middleware/token_md'));
app.use(require('./middleware/permission_md'))

// 注册路由
app.use("/user", require('./router/user'));
app.use('/category',require('./router/category'))
app.use('/product',require('./router/product'))
app.use('/order',require('./router/order'))

// 异常处理中间件
app.use((err, req, res, next) => {
    res.fail(err.toString());
});

app.listen(config.PORT);