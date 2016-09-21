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
                var selectProv = self.provinceObj.options[self.provinceObj.selectedIndex],
                    selectCity = self.cityObj.options[self.cityObj.selectedIndex],
                    selectArea = self.areaObj.options[self.areaObj.selectedIndex],
                    address = $('#address').val(),
                    name = $('#name').val(),
                    emscode = $('#emscode').val();
                if(selectProv.value<1){
                    dialog.floatDivTip('请选择省份');
                    return false;
                }
                if(selectCity.value<1){
                    dialog.floatDivTip('请先选择城市');
                    return false;
                }
                if(!address){
                    dialog.floatDivTip('提示请输入具体地址');
                    return false;
                }
                if(!name){
                    dialog.floatDivTip('提示请输入联系人');
                    return false;
                }
                if(!emscode){
                    dialog.floatDivTip('提示请输入邮政编码');
                    return false;
                }
                var rt = self.saveCallback({
                    province:{value:selectProv.value,text:selectProv.text},
                    city:{value:selectCity.value,text:selectCity.text},
                    area:{value:selectArea.value,text:selectArea.value && selectArea.text || ''},
                    address:address,
                    name:name,
                    emscode:emscode
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
    create:function(provinceId){
        if(this.container)return;
        var self = this,
            str = '<span class="new-addtc-close"></span> <div class="new-addtc-box"> <ul class="new-selec"> <li> <span class="addtc-sleBG"> <span class="addtc-sleHid"> <select id="province" name="type" class="addtc-select"> <option value="0">选择省</option></select> </span> </span> </li> <li> <span class="addtc-sleBG"> <span class="addtc-sleHid"> <select id="city" name="type" class="addtc-select"><option value="0">选择市</option> </select> </span> </span> </li> <li> <span class="addtc-sleBG"> <span class="addtc-sleHid"> <select id="area" name="type" class="addtc-select"><option value="0">选择区/县</option> </select> </span> </span> </li> </ul> <ul class="new-inpu"> <li><input id="address" type="text" class="add-input" placeholder="填写具体地址" value=""></li> <li><input id="name" type="text" class="add-input" placeholder="联系人" value=""></li> <li><input id="emscode" type="text" class="add-input" placeholder="邮政编码" value=""></li> </ul> <div class="xiugai-btn"> <input id="cannel-bt" type="button" value="取消" class="xiugai-left-inp"> <input id="ok-bt" type="button" value="添加" class="xiugai-right-inp"> </div> </div>';
        this.container = $('<div id="add-win">');
        this.container.addClass('new-addtc');
        this.container.html(str).hide();
        $('body').append(this.container);
        this.provinceObj = document.querySelector('#province');
        this.cityObj = document.querySelector('#city');
        this.areaObj = document.querySelector('#area');
        this.getCity(0,function(rt){
            var curOption,length = rt.length,province = self.provinceObj;
            for(var i=0; i<length; i++){
                curOption = new Option(rt[i].area_name,rt[i].area_id);
                province.options.add(curOption);
                if(provinceId == rt[i].area_id){
                    curOption.selected = true;
                }
            }
        });
        this.bindEvent();
    },
    setData:function(data){
        var self = this;

        if(data.cityId){
            this.getCity(data.provinceId,function(citys){
                if(citys){
                    var curOption,cityLength = citys.length,cityObj = self.cityObj;
                    $(cityObj).find('option').remove();
                    cityObj.options.add(new Option('选择市',''));
                    $(self.areaObj).find('option').remove();
                    self.areaObj.options.add(new Option('选择区/县',''));
                    //self.cityObj.display = '';
                    for(var i=0; i<cityLength; i++){
                        curOption =new Option(citys[i].area_name,citys[i].area_id);
                        cityObj.options.add(curOption);
                        if(data.cityId == citys[i].area_id){
                            curOption.selected = true;
                        }
                    }
                    if(data.areaId){
                        self.getCity(data.cityId,function(citys){
                            if(citys){
                                var curOption,cityLength = citys.length,cityObj = self.areaObj;
                                $(self.areaObj).find('option').remove();
                                self.areaObj.options.add(new Option('选择区/县',''));
                                //self.cityObj.display = '';
                                for(var i=0; i<cityLength; i++){
                                    curOption =new Option(citys[i].area_name,citys[i].area_id);
                                    cityObj.options.add(curOption);
                                    if(data.areaId == citys[i].area_id){
                                        curOption.selected = true;
                                    }
                                }
                            }
                        });
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
        this.create(data && data.provinceId || '');
        if(data){
            this.setData(data);
        }
        this.container.fadeIn();
    }
};
