
/*
 * GET home page.
 */
var Goods = require('../model/goods.js');
var _ = require('../public/underscore');

module.exports = function(app) {

    app.get('/', function (req, res) {
        if(!req.session.cart) {
            req.session.cart = [];
        }
        if(!req.session.total) {
            req.session.total = 0;
        }
        if(req.query.pay == "sure") {
            req.session.total = 0;
            req.session.cart = [];
        }
        res.render('index', {
            title:"主页",
            total:req.session.total
        });
    });

    app.get('/item_list', function (req, res) {
        Goods.getAll(function(err, goods) {
            if(err) {
                goods = [];
            }
            res.render('item_list', {
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
        _.each(goods, function(good) {
            if(good.twosendone == "true" && good.num > 2) {
                var promotion = _.clone(good);
                promotion.num = parseInt(promotion.num / 3);
                promotions.push(promotion);
            }
        });
        res.render('pay', {
            title:"付款",
            total:req.session.total,
            goods:goods,
            promotions:promotions
        });
    });

    app.post('/addGood', function(req, res){
        var good = req.body.good;
        var cart = req.session.cart;
        var hadGood = _.findWhere(cart, {
            _id: good._id
        });
        if(hadGood) {
            good.num = hadGood.num + 1;
            var index = _.indexOf(cart, hadGood);
            cart[index] = good;
        }
        else {
            good.num = 1;
            cart.push(good);
        }
        req.session.cart = cart;
        var total = req.session.total + 1;
        req.session.total = total;
        res.writeHead(200, {
            'Content-type':'text/plain'
        });
        res.write(total + "");
        res.end();
    });

    app.get('/subCart',function(req, res) {
        var goods = req.session.cart;
        var good = _.findWhere(goods, {
            _id: req.query._id
        });
        var index = _.indexOf(goods, good);
        good.num = good.num - 1;
        if(good.num == 0) {
            goods.splice(index,1);
        }
        else {
            goods[index] = good;
        }
        req.session.total = req.session.total - 1;
        req.session.cart = goods;

        if(req.session.total == 0) {
            res.redirect('/item_list');
        }
        else {
            res.redirect('/cart');
        }
    });

    app.get('/addCart',function(req, res) {
        var goods = req.session.cart;
        var good = _.findWhere(goods, {
            _id: req.query._id
        });
        var index = _.indexOf(goods, good);
        good.num = good.num + 1;
        goods[index] = good;
        req.session.total = req.session.total + 1;
        req.session.cart = goods;
        res.redirect('/cart');
    });

    /**
     * backStage
    */
    app.get('/admin',function(req, res) {
        req.session.newAttr = [];
        req.session.thisInfo = {};
        //判断是否是第一页，并把请求的页数转换成 number 类型
        var page = req.query.p ? parseInt(req.query.p) : 1;
        //查询并返回第 page 页的 5 件商品
         Goods.getFive(page, function (err, goods, total) {
            if (err) {
                goods = [];
            }
            res.render('backstageViews/goodsManage', {
                title: '商品管理',
                goods: goods,
                page: page,
                isFirstPage: (page - 1) == 0,
                isLastPage: ((page - 1) * 5 + goods.length) == total,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.get('/goodsInfo', function (req, res) {
        if(!req.session.newAttr) {
            req.session.newAttr = [];
        }
        if(!req.session.thisInfo) {
            req.session.thisInfo = {};
        }
        Goods.getById( req.query._id,  function (err, good) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }
            res.render('backstageViews/goodsInfo', {
                title: '商品详情',
                good: good,
                thisInfo: req.session.thisInfo,
                newAttr: req.session.newAttr,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.post('/goodsInfo', function (req, res) {
        var _id = req.body._id;
        var goods = {
            name: req.body.name,
            count: req.body.count,
            price: req.body.price,
            unit: req.body.unit,
            kind: req.body.kind,
            other: []
        };
        for(var attr in req.body) {
            if(attr != 'kind' && attr != 'name' && attr != 'price' && attr != 'unit' && attr != 'count' && attr != '_id' && attr != 'date') {
                goods.other.push({attrName: attr, attrValue: req.body[attr]});
            }
        }
        Goods.update(_id, goods, function (err) {
            var url = '/goodsInfo/?_id=' + _id;
            if (err) {
                req.flash('error', err);
                return res.redirect(url);//出错！返回文章页
            }
            req.session.thisInfo = {};
            req.session.newAttr = [];
            req.flash('success', '保存成功!');
            res.redirect(url);//成功！返回文章页
        });
    });

    app.get('/addGoods',function(req,res){
        if(!req.session.thisInfo) {
            req.session.thisInfo = {};
        }
        if(!req.session.newAttr) {
            req.session.newAttr = [];
        }
        res.render('backstageViews/addGoods',{
            title:" 添加商品",
            thisInfo: req.session.thisInfo,
            newAttr: req.session.newAttr,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/addGoods', function(req,res){
        var myDate = new Date();
        var date = myDate.getFullYear() + '年' + (parseInt(myDate.getMonth()) + 1) + '月' + myDate.getDate() + '日' + myDate.toLocaleTimeString();
        var good = {
            kind : req.body.kind,
            name : req.body.name,
            price : req.body.price,
            unit : req.body.unit,
            count : req.body.count,
            date : date,
            other : []
        };
        for(var attr in req.body){
            if(attr != 'kind' && attr != 'name' && attr != 'price' && attr != 'unit' && attr != 'count'  && attr != '_id' && attr != 'date') {
                good.other.push({attrName: attr, attrValue: req.body[attr]});
            }
        }
        var newGood = new Goods(good);
        //检查商品名称是否已经存在
        Goods.getByAttr({name: newGood.name}, function (err,goods) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/addGoods');//添加失败失败返回添加商品页
            }
            if(goods == '') {
                return newGood.save(function (err) {
                    if (err) {
                        req.flash('error', err);
                        return res.redirect('/addGoods');//添加失败失败返回添加商品页
                    }
                    req.session.thisInfo = {};
                    req.session.newAttr = [];
                    req.flash('success', '添加成功!');
                    res.redirect('/admin');//添加成功后返回商品管理页
                });
            }
            else {
                req.flash('success', '商品重复!');
                 return res.redirect('/addGoods');//添加成功后返回商品管理页
            }
        });
    });

    app.get('/addAttribute',function(req,res){
        if(req.query.from == 'addGoods'){
            var thisInfo = req.session.thisInfo;
        }
        else{
            thisInfo = {};
        }
        res.render('backstageViews/addAttribute', {
            title: '添加属性',
            thisInfo: thisInfo,
            from : req.query.from,
            _id: req.query._id,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/addAttribute',function(req,res){
        req.session.newAttr.unshift({attrName: req.body.attrName, attrValue: req.body.attrValue});
        res.writeHead(200,{'Content-type':'text/plain'});
        res.end();
    });

    app.get('/subAttribute',function(req,res){
        Goods.getById( req.query._id,  function (err, good) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }
            res.render('backstageViews/subAttribute', {
                title: '删除属性',
                newAttr :req.session.newAttr,
                good: good,
                from: req.query.from,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.post('/subAttribute', function (req, res) {
        var status = req.body.status;
        var attrName = req.body.attrName;
        if(status == 'has'){
            Goods.deleteAttr( req.body._id, attrName, function (err) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('back');
                }
                req.flash('success', '删除成功!');
            });
        }
        if(status == 'new') {
            var newAttr = req.session.newAttr;
            for(var i = 0; i < newAttr.length; i++) {
                if(newAttr[i].attrName == attrName) {
                    newAttr.splice(i,1);
                }
            }
            req.session.newAttr = newAttr;
        }
        res.writeHead(200,{'Content-type':'text/plain'});
        res.end();
    });

    app.post('/updateCount', function(req, res) {
        var change = req.body.change;
        var count = parseInt(req.body.count);
        if(change == 'add') {
            count = count + 1;
        }
        if(change == 'sub') {
            count = count - 1;
        }
        Goods.update(req.body._id,{count: count}, function (err) {
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
        Goods.remove(req.body._id, function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/admin');
            }
            req.flash('success', '删除成功!');
        });
        res.writeHead(200,{'Content-type':'text/plain'});
        res.end();
    });

    app.post('/saveThisInfo', function(req, res) {
        req.session.thisInfo = req.body.good;
        res.end();
    });

    app.post('/reset', function(req, res) {
        req.session.thisInfo = {};
        req.session.newAttr = [];
        res.end();
    });


    /**
     * discounts
     */
    app.get('/allDiscounts', function(req, res) {
        res.render('backstageViews/allDiscounts', {
            title: '打折活动',
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.get('/addRule', function(req, res) {
        res.render('backstageViews/addRule', {
            title: '添加规则',
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        })
    });
};
