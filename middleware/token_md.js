'use strict'
let crypto = require('lxj-crypto');
let config = require('../config');
let userService = require('../service/user');

//1. 从header中取token，如果没有，则直接拒绝
//2. 如果有token，则校验token的正确性，如果解码解密失败，则直接拒绝

function isExcludeUrl(url) {
    // 需要排除token检查的url集合的正则
    let excludeUrls = [
        /.*\/user\/login/,
        /.*\/user\/register/
    ];

    // 遍历数组，看当前的url是否在其中
    let isExclude = false;
    excludeUrls.forEach( item=>{
        if(item.test(url)){
            isExclude = true;
        }
    });
    return isExclude;
}

module.exports = async (req, res, next) =>{
    // 先判断当前的url是否是需要token验证，登录和注册的接口是不需要token的
    if(!isExcludeUrl(req.url)){
        console.log(req.url);
        // 1. 从header中取出token
        let token = req.get('token');
        if(!token){
            throw Error("缺少token")
        }

        // 2. 对token进行解码，看是否是伪造的token
        let tokenData;
        try {
            tokenData = JSON.parse(crypto.aesDecrypt(token, config.TokenKey));
            // console.log(tokenData);
        }catch (e){
            // 说明解码失败，token是伪造的
            throw Error('token不合法')
        }

        //3. 判断token是否过期
        if(tokenData.expire < Date.now()){
            throw Error("token已过期，请重新登录")
        }

        //4. 可以根据tokenData中的username取出用户信息，为了给后续的请求使用
        let userInfo = await userService.UserInfo(tokenData.username);
        req.user = userInfo; // 给req对象安装一个userInfo变量，目的是给后面的中间件来用

    }

    next();
};