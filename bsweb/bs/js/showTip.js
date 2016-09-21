/*
 * showTip。
 * */
(function(){
    var floatDivTip = null,
        showLoading = null,
        confirmTip = null,
        alertTip = null,
        showGuide = null;
    function showTip(config){
        config = config || {};
        this.tipBoxStyle = config.tipBoxStyle || 'bg-black-loading';
        this.tipContentStyle = config.tipContentStyle || 'loadingBox';
        this.parentId = config.parentId || null;
        if(this.parentId && $('#'+this.parentId).length==0)this.parentId = null;
        this.parentSelecter = this.parentId ? '#'+this.parentId:'body';
        this.tipContent = config.tipContent || '<img src="http://static.koudai.com/glmi/resources/v3/img/loadimg.gif" />';
        this.tipBox = null;
        this.tipContentBox = null;
        this.tipContentTitleBox = null;
        //this.tipSelecter = this.parentSelecter+' .'+this.tipBoxStyle;
        //this.tipBox = $(this.tipSelecter);
    }
    showTip.prototype = {
        setMessage: function(msg){
            this.tipContentTitleBox = null;
            this.tipContentBox.html(msg);
            return this;
        },
        setTitle: function(t){
            if(!t)return;
            if(this.tipContentTitleBox){
                $(this.tipContentTitleBox).html(t);
            }else{
                this.tipContentTitleBox = $("<h1>"+t+"</h1>").get(0);
                this.tipContentBox.prepend(this.tipContentTitleBox);
            }
        },
        delTitle: function(){
            this.tipContentBox.find('h1').remove();
        },
        show: function(timer){
            if (this.tipBox) {
                this.tipBox.show();
            } else {
                var tipBoxId = 'tipBox'+(new Date().getTime());
                $('<div id="'+tipBoxId+'" class="'+this.tipBoxStyle+'"><div class="'+this.tipContentStyle+'">'+this.tipContent+'</div></div>').appendTo(this.parentSelecter);

                this.tipBox = $('#'+tipBoxId);
                this.tipContentBox = this.tipBox.find('.'+this.tipContentStyle);
            }
            if(timer && timer>0){
                var that = this;
                setTimeout(function(){
                    that.hide();
                }, timer);
            }
            return this;
        },
        hide: function(isDel){
            if(this.tipBox && this.tipBox.length){
                if(isDel){
                    this.tipBox.remove();
                }else{
                    this.tipBox.hide();
                }
            }
            $('.bg-black-loading').hide();
            return this;
        },
        showMask: function(config){
            if($('.bg-black-loading').length){
                $('.bg-black-loading').show();
            }else{
                $('<div style="position: fixed;" class="bg-black-loading"></div>').appendTo('body');
            }
        }
    };
    var dialog = {};
    dialog.instance = function(config){
        return new showTip(config);
    }
    dialog.alert = function(msg, bttext,callback){
        if(!bttext)bttext = '确定';
        if(!msg)return;
        if(!alertTip){
            msg = '<p>'+msg+'</p><button>'+bttext+'</button>';
            alertTip = new showTip({
                tipBoxStyle:'alert-tip',
                tipContentStyle:'alert-text',
                tipContent:msg
            });
            alertTip.show().tipBox.find('button').bind('click', function(){
                if($.isFunction(callback))callback.call(this);
                alertTip.hide();
            });

        }else{
            alertTip.tipBox.find('button').val(bttext);
            alertTip.tipBox.find('p').html(msg);
            alertTip.show();
        }

        return alertTip;
    }
    dialog.confirm = function(opts){
        if(!opts || !opts.msg)return;

        var ok_text = opts.ok_text || '确定',
        cannel_text = opts.cannel_text || '取消',
        succ = opts.succ || function(){},
        faill = opts.faill || function(){};

        msg = '<p>'+opts.msg+'</p><div class="bt-box"> <button>'+cannel_text+'</button> <button>'+ok_text+'</button></div>';
        if(!confirmTip){
            confirmTip = new showTip({
                tipBoxStyle:'confirm-tip',
                tipContentStyle:opts.contentStyle || 'confirm-text',
                tipContent:msg
            });
        }else{
            confirmTip.tipBox.find('button').unbind('click');
            confirmTip.setMessage(msg);
        }
        confirmTip.show();
        confirmTip.showMask();
        if(opts.title){
            confirmTip.setTitle(opts.title);
        }
        confirmTip.tipBox.find('button:last-child').bind('click', function(){
            succ.call(this);
            confirmTip.hide();
        });
        confirmTip.tipBox.find('button:first-child').bind('click', function(){
            faill.call(this);
            confirmTip.hide();
        });
        return confirmTip;
    }
    dialog.floatDivTip = function(msg,timer){
        if(!floatDivTip){
            floatDivTip = new showTip({
                tipBoxStyle:'err-tip',
                tipContentStyle:'err-text',
                tipContent:msg || '网络似乎有问题，请检查后重试'
            });
        }else{
            if(msg){
                floatDivTip.setMessage(msg);
            }
        }
        if(timer==undefined)timer = 2000;
        floatDivTip.show(timer);
        return floatDivTip;
    }
    dialog.showLoading = function(msg){
        if(!msg)msg = '';
        if(!showLoading){
            showLoading = new showTip({
                tipBoxStyle:'err-tip',
                tipContentStyle:'text-align',
                tipContent:'<img class="tip-loading" width="20" style="display: inline-block;" src="http://static.koudai.com/glmi/resources/v3/img/loading2.gif" />'+msg
            });
        }else{
            showLoading.setMessage('<img class="tip-loading" width="20" style="display: inline-block;" src="http://static.koudai.com/glmi/resources/v3/img/loading2.gif" />'+msg);
        }
        showLoading.show();
        return showLoading;
    }
    dialog.showGuide = function(msg){
        if(!msg)msg = '';
        if(!showGuide){
            showGuide = new showTip({
                tipBoxStyle:'guide-tip',
                tipContentStyle:'guide-text',
                tipContent:'<img class="tip-loading" src="http://static.koudai.com/glmi/resources/vdian/images/tipline.png" /><p>'+msg+'</p>'
            });
            showGuide.show();
            showGuide.showMask();
            $('.bg-black-loading').bind('click', function(){
                showGuide.hide();
            });
        }else{
            showGuide.setMessage('<img class="tip-loading" src="http://static.koudai.com/glmi/resources/vdian/images/tipline.png" /><p>'+msg+'</p>');
            showGuide.show();
            showGuide.showMask();
        }
        return showGuide;
    }
    window.dialog = dialog;
})()
