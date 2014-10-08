$('.save').click(function() {
    if(!checkDateType($('input').last().val())) {
        alert("请输入正确的日期");
    }
});