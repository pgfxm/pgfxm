var pageObj = {
    bindEvent:function(){
        var self = this;

        $('.shop-top-dl .shop-selec').on('click',function(e){//全选
            $(this).toggleClass('shop-allselect');
            if($(this).hasClass('shop-allselect')){
                $('.dd-check .shop-selec').addClass('shop-allselect');

            }else{
                $('.dd-check .shop-selec').removeClass('shop-allselect');

            }
        });
        $('.dd-check .shop-selec').on('click',function(e){
            $(this).toggleClass('shop-allselect');

        });
        $('.J-edit').on('click', function(e){
            if($('.me-shop-sel .shop-allselect').length){
                location = 'me-shop-bj.html';
            }else{
                dialog.floatDivTip('请选择要编辑的商品');
                return false;
            }
        });
        $('.J-del').on('click', function(e){
            if($('.me-shop-sel .shop-allselect').length){
                dialog.confirm({
                    msg:'确定要删除你选择的商品？',
                    succ:function(){
                        //执行删除购物车商品
                        $('.shop-allselect').parents('.dd-list-dl2').remove();
                    }
                });
            }else{
                dialog.floatDivTip('请选择要删除的商品');
                return false;
            }
        });
        $('#shopqrdd-btn').on('click', function(e){
            if(!$('.me-shop-sel .shop-allselect').length){
                dialog.floatDivTip('请选择商品');
                return false;
            }
            location.href = 'me-shop-qrdd.html';
        });
        $('.me-bjlb-prev').on('click', function(e){
            var numObj = $(this).parent().find('.J_num'),
                num = numObj.text();
            if(num>0){
                numObj.html(--num);
            }
        });
        $('.me-bjlb-next').on('click', function(e){
            var numObj = $(this).parent().find('.J_num'),
                num = numObj.text();
            if(num<0){
                num = 0
            }
            numObj.html(++num);
        });
        $('.shdz-top-new').on('click', function(e){
            addressObj.show(function(data){//新增地址回调函数 data 为 {province:'xx',city:'xx',area:'xx',name:'xx','emscode':'xx',address:'xx'}
                if(data.province<1){
                    dialog.floatDivTip('请选择省份');
                    return false;//返回false可以阻止窗口消失
                }
            });
        });
    },
    init:function(){
        this.bindEvent();
    }
}
pageObj.init();
