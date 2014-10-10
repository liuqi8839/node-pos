
$('.deleteHas').click(function() {
    var id = $(this).closest('.subAttribute').find('a').first().next().text();
    var attrName = $(this).parent().prev().prev().text();
    var tip = '确定要删除此商品属性？';
    if(confirm(tip)) {
        $.post('/subAttribute', {id: id, attrName: attrName, status: 'has'}, function () {
            location.href='/goodsInfo/?id=' + id;
        });
    }
});

$('.deleteNew').click(function() {
    var attrName = $(this).parent().prev().prev().text();
    var tip = '确定要删除此商品属性？';
    if(confirm(tip)) {
        $.post('/subAttribute', {attrName: attrName, status: 'new'}, function () {
            location.href='/addGoods';
        });
    }
});
