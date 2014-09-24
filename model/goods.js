
var mongodb = require('./db');

function Goods(good){
    this.kind = good.kind;
    this.name = good.name;
    this.price = good.price;
    this.unit = good.unit;
}

module.exports = Goods;

//存入商品信息
Goods.prototype.save = function(callback){
    //要存入数据库的商品
    var good = {
        kind:this.kind,
        name:this.name,
        price:this.price,
        unit:this.unit
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

Goods.get = function(callback){
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
            collection.find({}).sort({
                time:-1
            }).toArray(function(err,goods){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,goods);
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