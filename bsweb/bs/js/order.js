var pageObj = {
    bindEvent:function(){
        var self = this;
        //$('#wrapper').on('touchmove', function (e) { e.preventDefault(); });
        $('.dd-list-qrbtn').on('click',function(e){
            dialog.confirm({
                msg:'是否确认收货',
                succ:function(){
                //执行收货操作
                }
            })
        });
        $('.dd-list-btn').on('click',function(e){
            dialog.confirm({
                title:'是否确认取消订单',
                msg:'取消订单后，如果您使用了优惠劵。优惠劵将自动退回您的账户',
                contentStyle:'confirm-body',
                succ:function(){
                    //执行取消订单操作
                }
            })
        });

    },
    init:function(){

        this.bindEvent();
    }
}
pageObj.init();
