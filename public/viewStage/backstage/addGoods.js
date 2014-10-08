
$(function(){


    if(thisInfo != ''){
        $('#name').val(thisInfo.name);
        $('#price').val(thisInfo.price);
        $('#count').val(thisInfo.count);
        $('#unit').val(thisInfo.unit);
        $('#kind').val(thisInfo.kind);
    }

    if(newAttr != []) {
        _.some(newAttr,function(oneAttr) {
            var addNewAttr = $(
                    "<div class='form-group col-md-6'>" +
                    "<label class='col-sm-2 control-label'>" + oneAttr.attrName + ": &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
                    "<div class='col-sm-10'>" +
                    "<input type='text' class='form-control'  placeholder='请输入类型' value=' " + oneAttr.attrValue + "'>" +
                    "</div>" +
                    "</div>");
            $('form').children('div').last().append(addNewAttr);
        });
    }
});

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
    $.post('/saveThisInfo',{good: good},function(data){});
});
