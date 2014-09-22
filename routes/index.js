
/*
 * GET home page.
 */

module.exports = function(app) {
    app.get('/', function (req, res) {
        res.render('index', { title: '主页' });
    });
    app.get('/item_list', function (req, res) {
        res.render('item_list', { title: '商品列表' });
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