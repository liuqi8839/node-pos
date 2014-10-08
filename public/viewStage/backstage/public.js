
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

function checkDateType(attrValue) {
    var result = attrValue.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (result == null)
        return false;
    var d = new Date(result[1], result[3] - 1, result[4]);
    return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4]);
}

/*判断输入是否为合法的手机号码*/
function isPhone(attrValue) {
    var checkLandline = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    var checkCellPhone = /^1[358]\d{9}$/;
    if(!checkLandline.test(attrValue) && !checkCellPhone.test(attrValue)) {
        return false;
    }
    else{
        return true;
    }
}

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