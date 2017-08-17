//user.js文件负责用户注册的新增操作以及用户查询操作
var mongo = require("./db");
//构造函数 读取user信息 （这里指的是接口一端的信息，即网页页面的信息）
function User(user){
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}
module.exports = User;

User.prototype.save = function(callback){
    //收集数据
    var user = {
        name :this.name,
        password:this.password,
        email:this.email
    }
    //打开数据库
    mongo.open(function(err,db){
        //判断数据库打开是否有错，如果有错的话将返回的结果给回调函数
        if(err){
            return callback(err);
        }
        db.collection("users",function(err,collection){
            //如果在读取结合的时间有错，关闭数据库，并将错误结果返
            // 回给回调函数
            if(err){
                //关掉数据库
                mongo.close();
                //将错误结果返回给回调函数
                return callback(err);
            }
            //将数据插入到users集合中
            collection.insert(user,{safe:true},function(err,user){
            //  关闭数据库
                mongo.close();
                //如果有错的话，返回得是错误结果
                if(err){
                    return callback(err);
                }
                //如果没有错的话反回的是插入的那条数据的第一个字段
                // -- name一个用户名
                callback(null,user[0]);
            })
        })
    })
}
//获取注册用户信息方法 name：查询的用户名
User.get = function(name,callback){
    mongo.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection("users",function(err,collection){
            if(err){
                mongo.close();
                return callback(err);
            }
            //查询name为指定名称的用户信息，返回用户信息
            collection.findOne({name:name},function(err,user){
                mongo.close();
                if(err){
                    return callback(err);
                }
                return callback(null,user);
            })
        })
    })
}