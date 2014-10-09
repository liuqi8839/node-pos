
$('.deleteHas').click(function() {
    var name = $(this).closest('.subAttribute').find('a').first().next().text();
    var attrName = $(this).parent().prev().prev().text();
    var tip = '确定要删除此商品属性？';
    if(confirm(tip)) {
        $.post('/deleteAttr', {name: name, attrName: attrName, status: 'has'}, function () {
            location.href='/goodsInfo/?name='+name;
        });
    }
});

$('.deleteNew').click(function() {
    var name = $(this).closest('.subAttribute').find('a').first().next().text();
    var attrName = $(this).parent().prev().prev().text();
    var tip = '确定要删除此商品属性？';
    if(confirm(tip)) {
        $.post('/deleteAttr', {name: name, attrName: attrName, status: 'new'}, function () {
            location.href='/goodsInfo/?name='+name;
        });
    }
});
