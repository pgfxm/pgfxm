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

        //购物车编辑
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

        $('#ziliao-newadd,.shdz-top-new').on('click', function(e){//新增地址
            //show 可接受二个参数，参1：data为表单初始数据，（可选参数，编辑地址的时候可用）;参2：为点击确定按钮后的回调函数
            addressObj.show({provinceId:'130000',cityId:'130400',areaId:'130404',name:'张三','emscode':'100101',address:'中关村理想国际大厦'},function(data){//新增地址回调函数 data 为 {province:{value:'130000',text:'xxx'},city:{value:'130000',text:'xxx'},area:{value:'130000',text:'xxx'},name:'xx','emscode':'xx',address:'xx'}

                //后端同学可以在这里通过ajax把data保存到库里
                var address = data.province.text+data.city.text+data.area.text+data.address;
                $('<dl class="font-Light shop-shdz-xx"> <dt> <h4 class="shop-shdz-add">'+address+'</h4> <p><span>'+data.name+'</span><span>'+data.emscode+'</span></p> </dt> <dd> <label for="checkbox2" addrId="" class="shop-allselectno shop-selec"></label> </dd> </dl>').appendTo('#addr-list');
            });
        });
        $('#addr-list').on('click', 'dl', function(e){//选择地址
            if($(this).find('.shop-selec').hasClass('shop-allselect'))return;
            $('#addr-list .shop-allselect').removeClass('shop-allselect');
            $(this).find('.shop-selec').addClass('shop-allselect');
        });

        $('#email').on('click', function(e){
            $('#bdemail').fadeIn();
        });
        $('#bdemail .new-addtc-close').on('click',function(e){
            $('#bdemail').fadeOut();
        });
        $('#bdemail-btn').on('click',function(e){
            var email = $('#add-email').val();
            if(!email){
                dialog.floatDivTip('邮箱不能为空');
                return false;
            }
            //后端在这增加保存email的操作
            dialog.floatDivTip('保存成功');

        });

        $('#telephone').on('click',function(e){
            $('#username').removeClass('ziliao-username-edit').attr('readonly','true');
            $(this).removeAttr('readonly').addClass('ziliao-username-edit');
            $(this).trigger('focus');
            e.preventDefault();
            e.stopPropagation();
        });
        $('#telephone').on('blur', function(e){
            //后端在这增加保存手机号的操作
            dialog.floatDivTip('保存成功');
        })

        $('#ziliao-usernamexg').on('click', function(e){
            $('#telephone').removeClass('ziliao-username-edit').attr('readonly','true');
            $('#username').removeAttr('readonly').addClass('ziliao-username-edit');
            $('#username').trigger('focus');
            e.preventDefault();
            e.stopPropagation();
        });
        $('#username').on('blur', function(e){
            //后端在这增加保存用户名的操作
            dialog.floatDivTip('保存成功');
        })

        $('body').on('click',function(e){
            if(event.target && ['ziliao-usernamexg','username'].indexOf(event.target.id)<0){
                $('#username,#telephone').removeClass('ziliao-username-edit').attr('readonly','true');
            }
        });
    },
    init:function(){
        this.bindEvent();
    }
}
pageObj.init();
