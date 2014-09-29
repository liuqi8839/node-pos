
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
        if(req.query.pay == "sure"){
            req.session.total = 0;
            req.session.cart = [];
        }
        res.render('index',{
            title:"主页",
            total:req.session.total
        });
    });

    app.get('/item_list', function (req, res) {

        Goods.getAll(function(err,goods){
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


    //backStage

    app.get('/admin',function(req,res){
        Goods.getAll(function (err, goods) {
            if (err) {
                goods = [];
            }
            res.render('backstageViews/goodsManage', {
                title: '商品管理',
                goods: goods,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.get('/goodsInfo', function (req, res) {
        Goods.getName( req.query.name,  function (err, good) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }
            res.render('goodsInfo', {
                title: '商品详情',
                good: good,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.post('/goodsInfo/:name/:count/:price/:unit/:kind', function (req, res) {
        var goods = {name: req.params.name, count: req.params.count, price: req.params.price, unit: req.params.unit, kind: req.params.kind};
        Goods.update(req.params.name, goods, function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/goodsInfo');//出错！返回文章页
            }
            req.flash('success', '修改成功!');
            res.redirect('/goodsInfo');//成功！返回文章页
        });
    });
};

    app.get('/addGoods',function(req,res){
        res.render('backstageViews/addGoods',{
            title:" 添加商品",
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/addGoods', function(req,res){
        var newGood = new Goods({
            kind:req.body.kind,
            name:req.body.name,
            price:req.body.price,
            unit:req.body.unit,
            count:req.body.count
        });
        if (newGood.kind == '' || newGood.name == '' || newGood.price == '' || newGood.unit == '' || newGood.count == '') {
            req.flash('error', '信息都不能为空!');
            return res.redirect('/addGoods');//返回添加商品页页
        }
        //检查商品名称是否已经存在
        Goods.getName(newGood.name, function (err,good) {

            newGood.save(function (err) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/addGoods');//添加失败失败返回添加商品页
                }
                req.flash('success', '添加成功!');
                res.redirect('/admin');//添加成功后返回商品管理页
            });
        });
    });

    app.get('/addAttribute',function(req,res){
        res.render('backstageViews/addAttribute',{
            title:" 添加属性"
        });
    });

    app.get('/subAttribute',function(req,res){
        res.render('backstageViews/subAttribute',{
            title:" 删除属性"
        });
    });

    app.post('/updateCount',function(req, res) {
        var change = req.body.change;
        var name = req.body.name;
        var count = parseInt(req.body.count);
        if(change == 'add') {
            count = count + 1;
        }
        if(change == 'sub') {
            count = count - 1;
        }
        Goods.updateCount(name, count, function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/admin');//添加失败失败返回添加商品页
            }
            req.flash('success', '添加成功!');
            res.redirect('/admin');//添加成功后返回商品管理页
        });
        res.writeHead(200,{'Content-type':'text/plain'});
        res.write(count + "");
        res.end();
    });

    app.post('/deleteGoods', function (req, res) {
        var name = req.body.name;
        Goods.remove(name, function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }
            req.flash('success', '删除成功!');
            res.redirect('/admin');
        });
        res.writeHead(200,{'Content-type':'text/plain'});
        res.end();
    });




