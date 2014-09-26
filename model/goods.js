
var mongodb = require('./db');

function Goods(good){
    this.kind = good.kind;
    this.name = good.name;
    this.price = good.price;
    this.unit = good.unit;
    this.count = good.count;
}

module.exports = Goods;

//存入商品信息
Goods.prototype.save = function(callback){
    //要存入数据库的商品
    var good = {
        kind:this.kind,
        name:this.name,
        price:this.price,
        unit:this.unit,
        count:this.count
    };
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        //读取shops集合
        db.collection('goods',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //将商品信息插入goods集合
            collection.insert(good,{
                safe:true
            },function(err){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

Goods.get = function(name, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取  goods 集合
        db.collection('goods', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            //查找商品名称（name键）值为 name 一个文档
            collection.findOne({
                name: name
            }, function (err, good) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err 信息
                }
                callback(null, good);//成功！返回查询的商品信息
            });
        });
    });
};

Goods.getTen = function(page,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        //读取goods集合
        db.collection('goods',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //使用count返回特定查询的文档数total
            collection.count(function(err,total){
                if(err){
                    mongodb.close();
                    return callback(err);
                }
                //根据对象查询,并跳过(page-1)*10个结果,返回之后的10个结果
                collection.find({},{
                    skip: (page - 1)*10,
                    limit: 10
                }).sort({
                    time: -1
                }).toArray(function(err,goods){
                    mongodb.close();
                    if(err){
                        return callback(err);
                    }
                    callback(null,goods,total);
                })
            });
        });
    });
};