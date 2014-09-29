
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

function checkInt()
{
    if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
        if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
            event.returnValue=false;
}

function checkDecimal()
{
    if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39)&&!(event.keyCode==190))
        if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
            event.returnValue=false;
}