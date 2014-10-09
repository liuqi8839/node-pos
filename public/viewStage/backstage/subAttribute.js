
$('.delete').click(function() {
    var name = $('.subAttribute').find('a').first().next().text();
    var attrName = $('.newAttr').children().first().text();
    var tip = '确定要删除此商品属性？';
    if(confirm(tip)) {
        $.post('/deleteAttr', {name: name, attrName: attrName}, function () {
            location.href='/goodsInfo/?name='+name;
        });
    }
});
