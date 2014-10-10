
var mongodb = require('./db');

function Goods(good){
    this.kind = good.kind;
    this.name = good.name;
    this.price = good.price;
    this.unit = good.unit;
    this.count = good.count;
    this.other = good.other;
    this.date = good.date;
}

module.exports = Goods;

//存入商品信息
Goods.prototype.save = function(callback){
    //要存入数据库的商品
    var good = this;
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

//添加属性
Goods.addAttr = function(id, other, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 goods 集合
        db.collection('goods', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //通过商品名称查找商品，并添加一个数组进
            collection.update({
                _id: 'ObjectId(' + id + ')'
            }, {
                $push: {"other": other}
            } , function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

//更新商品及其相关信息
Goods.update = function(id, goods, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 goods 集合
        db.collection('goods', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //更新商品信息
            collection.update({
                _id: 'ObjectId(' + id + ')'
            }, {
                $set: goods
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

//更新商品数量
Goods.updateCount = function(id, count, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 goods 集合
        db.collection('goods', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //更新商品信息
            collection.update({
                _id: 'ObjectId(' + id + ')'
            }, {
                $set: {count: count}
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

Goods.getOne = function(id, callback) {
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
                _id: 'ObjectId(' + id + ')'
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

//读取所有商品及其相关信息
Goods.getAll = function(callback){
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

//删除一种商品
Goods.remove = function(name, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 goods 集合
        db.collection('goods', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //根据商品名称查找并删除商品
            collection.remove({
                "name": name
            }, {
                w: 1
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

Goods.deleteAttr = function(name, attrName, callback){
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
            collection.update({
                name:name
            }, {
                $pull:{
                    other:{
                        attrName: attrName
                    }
                }
            }, function(err){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

Goods.getFive = function(page,callback){
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
            //使用count返回特定查询的商品数total
            collection.count(function(err,total){
                if(err){
                    mongodb.close();
                    return callback(err);
                }
                //根据对象查询,并跳过(page-1)*10个结果,返回之后的10个结果
                collection.find({},{
                    skip: (page - 1)*5,
                    limit: 5
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