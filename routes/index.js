
/*
 * GET home page.
 */
var Goods = require('../model/goods.js');
var _ = require('../public/underscore');

module.exports = function(app) {
    app.get('/', function (req, res) {
        if(!req.session.cart){
            req.session.cart = [];
        }
        if(!req.session.total){
            req.session.total = 0;
        }
        res.render('index',{title:"主页",total:req.session.total});
    });
    app.get('/item_list', function (req, res) {
        Goods.get(function(err,goods){
            if(err){
                goods = [];
            }
            res.render('item_list',{
                title:"商品列表",
                total:req.session.total,
                goods:goods
            });
        });
    });
    app.get('/cart', function (req, res) {
        res.render('cart',{
            title:"购物清单",
            total:req.session.total,
            goods:req.session.cart
        });
    });
    app.get('/pay', function (req, res) {
        var goods = req.session.cart;
        var promotions = [];
        _.each(goods,function(good){
            if(good.twosendone == "true" && good.num > 2){
                var promotion = _.clone(good);
                promotion.num = parseInt(promotion.num/3);
                promotions.push(promotion);
            }
        });
        res.render('pay',{
            title:"付款",
            total:req.session.total,
            goods:goods,
            promotions:promotions
        });
    });
    app.post('/pay', function (req, res) {
    });

    app.post('/addGood', function(req,res){
        var good = req.body.good;
        var cart = req.session.cart;
        var hadGood = _.findWhere(cart,{name:good.name});
        if(hadGood){
            good.num = hadGood.num + 1;
            var index = _.indexOf(cart,hadGood);
            cart[index] = good;
        }
        else{
            good.num = 1;
            cart.push(good);
        }
        req.session.cart = cart;
        var total = req.session.total + 1;
        req.session.total = total;
        res.writeHead(200,{'Content-type':'text/plain'});
        res.write(total + "");
        res.end();
    });
    app.get('/subCart',function(req,res){
        var goods = req.session.cart;
        var good = _.findWhere(goods,{name:req.query.goodName});
        var index = _.indexOf(goods,good);
        good.num = good.num - 1;
        if(good.num == 0){
            goods.splice(index,1);
        }else{
            goods[index] = good;
        }
        req.session.total = req.session.total - 1;
        req.session.cart = goods;

        if(req.session.total == 0){
            res.redirect('/item_list');
        }else{
            res.redirect('/cart');
        }
    });
    app.get('/addCart',function(req,res){
        var goods = req.session.cart;
        var good = _.findWhere(goods,{name:req.query.goodName});
        var index = _.indexOf(goods,good);
        good.num = good.num + 1;
        goods[index] = good;
        req.session.total = req.session.total + 1;
        req.session.cart = goods;
        res.redirect('/cart');
    });
};
