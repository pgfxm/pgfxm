var pageObj = {
    bindEvent:function(){
        var self = this;
        //查看协议
        $('#yhxy a').on('click',function(e){
            if($(this).hasClass('reg-yhxy')){
                $(this).removeClass('reg-yhxy')
                $('#regi-yhxytc').fadeOut();
            }else{
                $(this).addClass('reg-yhxy')
                $('#regi-yhxytc').fadeIn();
            }
        });

        $('#close-bt').on('click',function(e){
            $('#regi-yhxytc').fadeOut();
        });

        $('#login-jrbs').on('click',function(e){
            var phone = $('#regi-phone').val(),
                password = $('#regi-password').val(),
                repasswd = $('#regi-aginpassword').val(),
                code = $('#regi-yzm').val();
            if(!phone){
                dialog.floatDivTip('手机号不能为空');
                return false;
            }
            if(!password){
                dialog.floatDivTip('密码不能为空');
                return false;
            }
            if(password!=repasswd){
                dialog.floatDivTip('两次密码不一致');
                return false;
            }
            if(!code){
                dialog.floatDivTip('验证码不能为空');
                return false;
            }
            //后端数据验证。。。
        })
    },
    init:function(){
        this.bindEvent();
    }
}
pageObj.init();
