
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
    app.post('/item_list', function (req, res) {
    });
    app.get('/cart', function (req, res) {
        res.render('cart', { title: ' 购物车' });
    });
    app.post('/cart', function (req, res) {
    });
    app.get('/pay', function (req, res) {
        res.render('pay', { title: ' 付款' });
    });
    app.post('/pay', function (req, res) {
    });

};