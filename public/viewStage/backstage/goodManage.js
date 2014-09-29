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

var updateCount = function(THIS){
    var count = +THIS.val();
    var name = THIS.closest('tr').children().first().next().text();
    $.post('/updateCount',{change: 'update', name: name, count: count},function(data){
        THIS.val(data);
    });
};

$('.delete').on('click', function() {
    var THIS = this;
    var name = $(this).closest('tr').children().first().next().text();
    $.post('/deleteGoods',{name: name},function() {
        $(THIS).closest('tr').remove();
    });
});