var pageObj = {
    pageSize:10,
    pageNum:1,
    bindEvent:function(){
        var self = this;
        //晒单分享
        $('#select-bt').on('click',function(e){//全选
            $('#shaidan-xltc').fadeIn();

        });

        $('#shaidan-xltc-close').on('click',function(e){
            $('#shaidan-xltc').fadeOut();
        });

        $('#shaidan-selecttc-close').on('click',function(e){//全选
            $('#shaidan-selecttc').fadeOut();
            $('#shaidan-selecttc ul').hide();
        });

        $('.shaidan-xltc-ul li').on('click',function(e){
            $('#shaidan-xltc').fadeOut();
            var cid = $(this).attr('cid');
            $('#shaidan-selecttc').fadeIn();
            $('#shaidan-selecttc ul[cid="'+cid+'"]').show();
        });

        $('.shaidan-xztc-ul li').on('click',function(e){
            var cid = $(this.parentNode).attr('cid'),
                img = $(this).find('img').attr('src'),
                title = $(this).attr('title')||'',
                desc = $(this).attr('desc');
            $('#shaidan-selecttc').fadeOut();
            $('#shaidan-selecttc ul[cid="'+cid+'"]').hide();
            $('#select-bt').html('<img src="'+img+'"><p class="shaidan-xz-p">'+title+'</p>');
            $('#desc').val(desc);
        });

        //晒单福利
        $('.shaidan-banner-sdfl').on('click',function(e){
            $('#shaidan-dy-tc').fadeIn();

        });
        $('#shaidan-fl-close').on('click',function(e){
            $('#shaidan-dy-tc').fadeOut();
        });



        var scrollCallBack = function(){
            clearTimeout(self.timeHd);
            self.timeHd = setTimeout(function(){
                var wz = self.getScroll();
                if(wz.h - wz.t -window.innerHeight>800){
                    return;
                }
                self.pageNum++;
                self.loadData();
            },100);
        }
        $(window).on('scroll', scrollCallBack);
        if(/iph/i.test(navigator.userAgent)){
            $(document.body).on('touchend', scrollCallBack);
        }

        $('.sd-upimg').on('change',function(e){
            var docObj=this;
            var html = '',
                imgObjPreview=$('#shaidan-tp-ul'),
                upimgs = docObj.files;
            var filters = {
                "jpeg" : "/9j/4",
                "gif" : "R0lGOD",
                "png" : "iVBORw"
            };

            function validateImg(data) {
                var pos = data.indexOf(",") + 1;
                for (var e in filters) {
                    if (data.indexOf(filters[e]) === pos) {
                        return e;
                    }
                }
                return null;
            }

            function showPrvImg(src) {
                imgObjPreview.append('<li><span class="remove-img"></span><img src="'+src+'"></li>');
            }


            if(upimgs && upimgs.length)
            {
                for(var i=0; i<upimgs.length; i++){
                    var fr = new FileReader();
                    fr.onload = function(e) {
                        var src = e.target.result;
                        if (!validateImg(src)) {
                            dialog.floatDivTip('只允许上传jpeg/gif/png格式的图');
                        } else {
                            showPrvImg(src);
                        }
                    }
                    fr.readAsDataURL(upimgs[i]);
                }
            }

        });
    },

    getScroll:function () {
        var docElement = document.documentElement,
            body = document.body;
        var t, l, w, h;
        if (docElement && docElement.scrollTop) {
            t = docElement.scrollTop;
            l = docElement.scrollLeft;
            w = docElement.scrollWidth;
            h = docElement.scrollHeight
        } else {
            if (body) {
                t = body.scrollTop;
                l = body.scrollLeft;
                w = body.scrollWidth;
                h = body.scrollHeight
            }
        }
        return {
            t: t || window.pageYOffset,
            l: l || window.pageXOffset,
            w: w,
            h: h
        }
    },
    loadData:function(){
        var self = this;
        //后端在这通过ajax实现获取数据并展示
        /*伪代码如下
        var options = {
            url: "/xxxx?page="+self.pageNum,
            type: 'get',
            success: function (rt) {
                if (rt) {

                    ;
                }else{
                    dialog.floatDivTip("网络繁忙，获取数据失败！");
                }
            },
            error:function(){
                dialog.floatDivTip("网络繁忙，获取数据失败！");
            }//,
            //dataType: 'jsonp'
        }
        $.ajax(options);*/
        var success = function(data){
            if(data && data.length){
                var contentStr = '';
                for(var i=0; i<data.length; i++){
                    if(!(i%2)){
                        contentStr += '<dl class="index-sdjx-left"> <dt><img src="'+data[i].img+'"></dt> <dd> <img class="index-sd-ti" src="images/index-sd-ti.jpg"> <p class="index-sd-p1">'+data[i].content+'</p> <p class="index-sd-p2"> <img src="'+data[i].headImg+'"> <b>'+data[i].name+'</b> </p> </dd> </dl>';
                    }else{
                        contentStr += '<dl class="index-sdjx-right"> <dt><img src="'+data[i].img+'"></dt> <dd> <img class="index-sd-ti" src="images/index-sd-ti.jpg"> <p class="index-sd-p1">'+data[i].content+'</p> <p class="index-sd-p2"> <img src="'+data[i].headImg+'"> <b>'+data[i].name+'</b> </p> </dd> </dl>';
                    }
                }
                $('#shaidan-sdjx-nrid').append(contentStr);
            }

        }
        //假数据执行回调
        success([
            {
                img:'images/index-sd.jpg',
                content:'压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会',
                name:'陈然',
                headImg:'images/index-sd.jpg'
            },
            {
                img:'images/index-sd.jpg',
                content:'压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会',
                name:'陈然',
                headImg:'images/index-sd.jpg'
            },
            {
                img:'images/index-sd.jpg',
                content:'压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会',
                name:'陈然',
                headImg:'images/index-sd.jpg'
            },
            {
                img:'images/index-sd.jpg',
                content:'压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会',
                name:'陈然',
                headImg:'images/index-sd.jpg'
            },
            {
                img:'images/index-sd.jpg',
                content:'压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会',
                name:'陈然',
                headImg:'images/index-sd.jpg'
            },
            {
                img:'images/index-sd.jpg',
                content:'压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会',
                name:'陈然',
                headImg:'images/index-sd.jpg'
            },
            {
                img:'images/index-sd.jpg',
                content:'压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会',
                name:'陈然',
                headImg:'images/index-sd.jpg'
            },
            {
                img:'images/index-sd.jpg',
                content:'压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会',
                name:'陈然',
                headImg:'images/index-sd.jpg'
            },
            {
                img:'images/index-sd.jpg',
                content:'压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会',
                name:'陈然',
                headImg:'images/index-sd.jpg'
            },
            {
                img:'images/index-sd.jpg',
                content:'压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会压制自己选择了克制会',
                name:'陈然',
                headImg:'images/index-sd.jpg'
            }
        ]);

    },
    init:function(){
        this.bindEvent();
        this.loadData();
    }
}
pageObj.init();
