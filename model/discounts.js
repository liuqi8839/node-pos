var mongodb = require('./db');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

function Discounts(discount) {
    this._id = discount._id;
    this.startDay = discount.startDay;
    this.endDay = discount.endDay;
    this.buy = discount.buy;
    this.give = discount.give;
}

module.exports = Discounts;

Discounts.prototype.save = function () {

    var _id = this._id;
    var discount = {
        startDay: this.startDay,
        endDay: this.endDay,
        buy: this.buy,
        give: this.give
    };

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
                _id: ObjectId(_id)
            }, {
                $set: {
                    discount: discount
                }
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

