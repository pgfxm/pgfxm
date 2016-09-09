var pageObj = {
    bindEvent:function(){
        var self = this;

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
                title = $(this).attr('title'),
                desc = $(this).attr('desc');
            $('#shaidan-selecttc').fadeOut();
            $('#shaidan-selecttc ul[cid="'+cid+'"]').hide();
            $('#select-bt').html('<img src="'+img+'"><p class="shaidan-xz-p">'+title+'</p>');
            $('#desc').val(desc);
        });

        $('.shaidan-banner-sdfl').on('click',function(e){//全选
            $('#shaidan-dy-tc').fadeIn();

        });
        $('#shaidan-fl-close').on('click',function(e){
            $('#shaidan-dy-tc').fadeOut();
        });
    },
    init:function(){
        this.bindEvent();
    }
}
pageObj.init();
