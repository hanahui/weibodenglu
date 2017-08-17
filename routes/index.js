// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: '首页' });
// });
//
// module.exports = router;
module.exports = function(app){
    //首页路由
    app.get("/",function(req,res){
       res.render('index',{title:'首页'});
    })
    //注册页面
    app.get("/reg",function(req,res){
        res.render("reg",{title:"注册"});
    })
    //注册行为
    app.post("/reg",function(req,res){

    })
//    登录页面
    app.get("/login",function(req,res){
        res.render("login",{
            title:"登录"
        })
    })
    //登录行为
    app.post("/longin",function(req,res){

    })
    app.get("/post",function(req,res){
        res.render("post",{
            title:"发布文章"
        })
    })
    app.post("/post",function(req,res){

    })
    app.get("/logout",function(req,res){

    })
}
