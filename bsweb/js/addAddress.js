var addressObj = {
    getCity:function(id,callback){
        var options = {
            url: "/block/area_child?aid="+(id||0),
            type: 'get',
            success: function (rt) {
                if (rt) {
                    rt = eval(rt);
                    rt.length && callback && callback(rt);
                }else{
                    dialog.floatDivTip("网络繁忙，获取城市数据失败！");
                }
            },
            error:function(){
                dialog.floatDivTip("网络繁忙，获取城市数据失败！");
            }//,
            //dataType: 'jsonp'
        }
        $.ajax(options);
    },
    bindEvent:function(){
        var self = this;
        this.container.find('.new-addtc-close,#cannel-bt').on('click', function(e){
            $('#address').val('');
            $('#name').val('');
            $('#emscode').val('');

            self.container.fadeOut();
        });
        this.container.find('#ok-bt').on('click', function(e){
            if(self.saveCallback){
                var rt = self.saveCallback({
                    province:$('#province').val(),
                    city:$('#city').val(),
                    area:$('#area').val(),
                    address:$('#address').val(),
                    name:$('#name').val(),
                    emscode:$('#emscode').val()
                });
                if(rt!==false){
                    self.container.fadeOut();
                }
            }
        });

        $(this.provinceObj).bind('change',function(e){
            var index=this.selectedIndex,
                id = this.options[index].value;

            //self.cityObj.display = 'none';
            self.getCity(id,function(citys){
                if(citys){
                    var cityLength = citys.length,cityObj = self.cityObj;
                    $(cityObj).find('option').remove();
                    cityObj.options.add(new Option('选择市',''));
                    $(self.areaObj).find('option').remove();
                    self.areaObj.options.add(new Option('选择区/县',''));
                    //self.cityObj.display = '';
                    for(var i=0; i<cityLength; i++){
                        cityObj.options.add(new Option(citys[i].area_name,citys[i].area_id));
                    }
                }
            });

        });
        $(this.cityObj).bind('change',function(e){
            var index=this.selectedIndex,
                id = this.options[index].value;

            self.getCity(id,function(citys){
                if(citys){
                    var cityLength = citys.length,cityObj = self.areaObj;
                    $(cityObj).find('option').remove();
                    cityObj.options.add(new Option('选择区/县',''));
                    for(var i=0; i<cityLength; i++){
                        cityObj.options.add(new Option(citys[i].area_name,citys[i].area_id));
                    }
                }
            });

        });
    },
    create:function(){
        if(this.container)return;
        var self = this,
            str = '<span class="new-addtc-close"></span> <div class="new-addtc-box"> <ul class="new-selec"> <li> <span class="addtc-sleBG"> <span class="addtc-sleHid"> <select id="province" name="type" class="addtc-select"> <option value="0">选择省</option></select> </span> </span> </li> <li> <span class="addtc-sleBG"> <span class="addtc-sleHid"> <select id="city" name="type" class="addtc-select"><option value="0">选择市</option> </select> </span> </span> </li> <li> <span class="addtc-sleBG"> <span class="addtc-sleHid"> <select id="area" name="type" class="addtc-select"><option value="0">选择区/县</option> </select> </span> </span> </li> </ul> <ul class="new-inpu"> <li><input id="address" type="text" class="add-input" placeholder="填写具体地址" value=""></li> <li><input id="name" type="text" class="add-input" placeholder="联系人" value=""></li> <li><input id="emscode" type="text" class="add-input" placeholder="邮政编码" value=""></li> </ul> <div class="xiugai-btn"> <input id="cannel-bt" type="button" value="取消" class="xiugai-left-inp"> <input id="ok-bt" type="button" value="添加" class="xiugai-right-inp"> </div> </div>';
        this.container = $('<div id="add-win">');
        this.container.html(str).hide();
        $('body').append(this.container);
        this.provinceObj = document.querySelector('#province');
        this.cityObj = document.querySelector('#city');
        this.areaObj = document.querySelector('#area');
        this.getCity(0,function(rt){
            var length = rt.length,province = self.provinceObj;
            for(var i=0; i<length; i++){
                province.options.add(new Option(rt[i].area_name,rt[i].area_id));
            }
        });
        this.bindEvent();
    },
    setData:function(data){
        var self = this;
        if(data.province){
            var province = this.provinceObj;
            for(var i in this.provinceObj.options){
                if(this.provinceObj.options[i].value==data.province){
                    this.provinceObj.options[i].selected = true;
                    break;
                }
            }
        }
        if(data.city){
            this.getCity(data.province,function(citys){
                if(citys){
                    var curOption,cityLength = citys.length,cityObj = self.cityObj;
                    $(cityObj).find('option').remove();
                    cityObj.options.add(new Option('选择市',''));
                    $(self.areaObj).find('option').remove();
                    self.areaObj.options.add(new Option('选择区/县',''));
                    //self.cityObj.display = '';
                    for(var i=0; i<cityLength; i++){
                        curOption = cityObj.options.add(new Option(citys[i].area_name,citys[i].area_id));
                        if(data.city == citys[i].area_id){
                            curOption.selected = true;
                        }
                    }
                }
            });
        }
        if(data.area){
            this.getCity(data.city,function(citys){
                if(citys){
                    var curOption,cityLength = citys.length,cityObj = self.areaObj;
                    $(self.areaObj).find('option').remove();
                    self.areaObj.options.add(new Option('选择区/县',''));
                    //self.cityObj.display = '';
                    for(var i=0; i<cityLength; i++){
                        curOption = cityObj.options.add(new Option(citys[i].area_name,citys[i].area_id));
                        if(data.area == citys[i].area_id){
                            curOption.selected = true;
                        }
                    }
                }
            });
        }
        $('#address').val(data.address||'');
        $('#name').val(data.name||'');
        $('#emscode').val(data.emscode||'');
    },
    show:function(data,callback){//{province:'xx',city:'xx',area:'xx',name:'xx','emscode':'xx',address:'xx'}
        if(typeof data == 'function'){
            this.saveCallback = data;
            data = '';
        }else{
            this.saveCallback = callback;
        }
        this.create();
        if(data){
            this.setData(data);
        }
        this.container.fadeIn();
    }
};
