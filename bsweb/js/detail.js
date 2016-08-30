var pageObj = {
    bindEvent:function(){
        var self = this;
        //$('#wrapper').on('touchmove', function (e) { e.preventDefault(); });
        $('#wrapper').on('click','#scroller li',function(e){
            $('#scroller li.bord').removeClass('bord');
            $(this).addClass('bord');
            $('.detail-spt img').attr('src',$(this).attr('data-src'));
        });
        $('.comment-btn a').on('click',function(e){
            $('a.comment-btn-clo').removeClass('comment-btn-clo');
            $(this).addClass('comment-btn-clo');

        });
        $('.user-hfnr a,.user-hfnr2 a').on('click', function(e){//评论回复
            if($(this).parent().parent().find('.hfh-text').length){
                $(this).parent().parent().find('.hfh-text').fadeIn();
            }else{
                $(this).parent().parent().append($('.hfh-text').fadeIn());
            }
            $(this).parent().parent().find('.hfh-text textarea').trigger('focus');
            scrollTo(0,$(this).parent().parent().find('.hfh-text').offset().top);
        });
        $('#detail-info-btn1').on('click', function(e){
            dialog.floatDivTip('加入购物车成功！');
        });
        $('#J-submit').on('click', function(e){
            var content = $('#J-content').val();
            if(!content){
                dialog.floatDivTip('内容不能为空！');
                return false;
            }else if(content.length<15){
                dialog.floatDivTip('请至少输入15个字！');
                return false;
            }
        })
    },
    init:function(){
        var scrollerWidth = 0,
            wrapperWidth = $('#wrapper').width();
        $('#scroller li').each(function(i, li){
            scrollerWidth += li.offsetWidth;
        });
        if(scrollerWidth>wrapperWidth){
            $('#scroller').css('width',scrollerWidth+'px');
            new IScroll('#wrapper', { scrollX: true,mouseWheel: true, preventDefault: false,vScroll:false });
        }
        this.bindEvent();
    }
}
pageObj.init();
