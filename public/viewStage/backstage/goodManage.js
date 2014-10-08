$('.addNum').click(function() {
    var THIS = this;
    var count = +$(this).parent().prev().val();
    var name = $(this).closest('tr').children().first().next().text();
    $.post('/updateCount',{change: 'add',name: name, count: count},function(data){
        $(THIS).parent().prev().val(data);
    });
});

$('.subNum').on('click', function() {
    var THIS = this;
    var count = +$(this).parent().next().val();
    if(count >= 1){
        var name = $(this).closest('tr').children().first().next().text();
        $.post('/updateCount',{change: 'sub', name: name, count: count},function(data){
            $(THIS).parent().next().val(data);
        });
    }
});



$('.delete').on('click', function() {
    var THIS = this;
    var name = $(this).closest('tr').children().first().next().text();
    var tip = '确定要删除商品'+ name +'？';
    if(confirm(tip)) {
        $.post('/deleteGoods', {name: name}, function () {
            $(THIS).closest('tr').remove();
        });
    }
});
