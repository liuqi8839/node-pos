
$(function(){
    $('#item-list').addClass('active');
});

$('.addGood').click(function(){
    var temp = [];
    $($(this).parent().siblings()).each(function(){
        temp.push($(this).text());
    });
    var good = {
        kind:temp[0],
        name:temp[1],
        price:temp[2],
        unit:temp[3],
        twosendone:temp[4]
    };
    $.post('/addGood',{good: good},function(data){
        $('#cart').find('#item-numbers').text(data);
    });
});
