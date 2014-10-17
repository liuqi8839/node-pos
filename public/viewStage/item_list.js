$(function () {
    $('#item-list').addClass('active');
});

$('.addGood').click(function () {
    var temp = [];
    $($(this).parent().siblings()).each(function () {
        temp.push($(this).text());
    });
    var good = {
        _id: temp[0],
        kind: temp[1],
        name: temp[2],
        price: temp[3],
        unit: temp[4],
        twosendone: temp[5]
    };
    $.post('/addGood', {good: good}, function (data) {
        $('#cart').find('#item-numbers').text(data);
    });
});
