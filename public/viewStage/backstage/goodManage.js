$('.addNum').click(function() {
    var THIS = this;
    var count = +$(this).parent().prev().val();
    var _id = $('._id').text();
    $.post('/updateCount',{change: 'add', _id: _id, count: count},function(data){
        $(THIS).parent().prev().val(data);
    });
});

$('.subNum').on('click', function() {
    var THIS = this;
    var count = +$(this).parent().next().val();
    if(count >= 1){
        var _id = $('._id').text();
        $.post('/updateCount',{change: 'sub', _id: _id, count: count},function(data){
            $(THIS).parent().next().val(data);
        });
    }
});

$('.delete').on('click', function() {
    var name = $(this).closest('tr').children().first().next().text();
    var _id = $('._id').text();
    var tip = '确定要删除商品'+ name +'？';
    if(confirm(tip)) {
        $.post('/deleteGoods', {_id: _id}, function () {
            alert('删除成功！');
            location.href='/admin';
        });
    }
});
