
/**
 * use by addGoods,goodManage
 */
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

/**
 * use by addAttribute
 */
var checkName = function() {
    checkNull();
};
var checkValue = function() {
    checkNull();
};

var checkNull = function() {
    var flag = true;
    $("input").each(function(){
        if($(this).val()==""){
            flag = false;
        }
    });
    if(flag){
        $('.save').attr("disabled",false);
    }
    else{
        $('.save').attr("disabled",true)
    }
};

/**
 * use by goodManage
 */
var updateCount = function(THIS){
    var count = +THIS.val();
    var name = THIS.closest('tr').children().first().next().text();
    $.post('/updateCount',{change: 'update', name: name, count: count},function(data){
        THIS.val(data);
    });
};