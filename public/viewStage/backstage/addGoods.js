
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

