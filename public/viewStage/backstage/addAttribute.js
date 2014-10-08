$('.save').click(function() {
    var attrValue = $('input').last().val();
//    if(!checkDateType(attrValue)) {
//        alert("请输入正确的日期");
//    }
    if(!isPhone(attrValue)) {
        alert("请输入正确的电话格式");
    }
});