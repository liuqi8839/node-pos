$('.save').click(function() {
    var attrName =  $('input').first().val();
    var attrValue = $('input').last().val();
    if(attrName == '生产日期' && !checkDateType(attrValue)) {
        alert("请输入正确的日期");
        return;
    }
    if(attrName == '编码' && typeof(attrValue)!="number") {
        alert('编码请输入数字');
        return;
    }
    if(attrName == '电话' && !isPhone(attrValue)) {
        alert("请输入正确的电话格式");
        return;
    }
    alert("保存成功");
    $.post('/addAttribute',{attrName: attrName, attrValue: attrValue});
});