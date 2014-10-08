
$('.addNum').click(function() {
    var findNum = $('.number').find('input');
    var number = +findNum.val();
    findNum.val(number + 1);
});

$('.subNum').on('click', function() {
    var findNum = $('.number').find('input');
    var number = +findNum.val();
    if(number != 0){
        findNum.val(number - 1);
    }
});

$('.addAttr').click(function() {
    var good = {
        name: $('#name').val(),
        price: $('#price').val(),
        count: $('#count').val(),
        unit: $('#unit').val(),
        kind: $('#kind').val()
    };
    $.post('/saveThisInfo',{good: good});
});
