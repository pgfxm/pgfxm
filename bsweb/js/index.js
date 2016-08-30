var index = {
    bindEvent:function(){
        var self = this;
        $(window).on('scroll',function(){
            if(self.getScroll().t>100){
                $('.index_float_callback').css('display','inline-block');
            }else{
                $('.index_float_callback').hide();
            }
        });
        $('.index_float_callback').on('click',function(e){
            var posY = self.getScroll().t;
            window.requestAnimationFrame(function(t){
                posY -= 50;
                window.scrollTo(0,Math.max(0,posY));
                if(posY>0){
                    window.requestAnimationFrame(arguments.callee);
                }
            })
        });

        $('#index-sdjx-nrid dl').click(function () {
            $("#index-shaidantc").fadeIn();
            //$('html,body').animate({scrollTop:0},0);
            $('html,body').css({height:'100%', overflow:'hidden'})
        });
        $(".index-shaidantc-close").click(function () {
            $("#index-shaidantc").fadeOut();
            $('html,body').css('overflow','visible' )
        });

    },
    getScroll:function () {
        var o = document.documentElement,
            k = document.body;
        var m, j, g, n;
        if (o && o.scrollTop) {
            m = o.scrollTop;
            j = o.scrollLeft;
            g = o.scrollWidth;
            n = o.scrollHeight
        } else {
            if (k) {
                m = k.scrollTop;
                j = k.scrollLeft;
                g = k.scrollWidth;
                n = k.scrollHeight
            }
        }
        return {
            t: m || window.pageYOffset,
            l: j || window.pageXOffset,
            w: g,
            h: n
        }
    },
    sliderBox:function (obj){
        var sbObj = obj.find('ul.index-main-image'),
            tbLi = obj.find('.flicking-con li'),
            step = obj.width(),//obj.attr('data-step'),
            size = tbLi.length,//obj.attr('data-size'),
            sliderBoxObj = new SliderBox({
                sliderBox: sbObj,
                step: step,
                size: size,
                duration: 3000,
                thumbs: tbLi
            }),
            slider = new TouchPanel({
                infinate:true,
                touchPanel: obj,
                sliderBox: sliderBoxObj
            });
        tbLi.css('width',step*1/40 + 'px').css('height',step*1/40 + 'px');
        sbObj.find('li').css('width',step+'px');
        sbObj.css('position', 'absolute').css('width',step*size+'px').css('left','0px');
    },
    init:function(){
        this.sliderBox($('.index-visual'));
        this.bindEvent();
    }
}
index.init();
