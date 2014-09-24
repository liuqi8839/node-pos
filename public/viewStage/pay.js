
$(function(){
    $('#cart').addClass('active');
    var myDate = new Date();
    $("#now_time").text(myDate.toLocaleString());
});

$('.sure').click(function(){
    $.post('/clear',function(data){
        $('#cart').find('#item-numbers').text(data);
    });
});