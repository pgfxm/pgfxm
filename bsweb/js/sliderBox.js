    function getVendor() {
        var t,
            i = 0,
            vendor = '',
            dummyStyle = document.createElement('div').style,
            vendors = 't,webkitT,MozT,msT,OT'.split(','),
            l = vendors.length;

        for (; i < l; i++) {
            t = vendors[i] + 'ransform';
            if (t in dummyStyle) {
                vendor = vendors[i].substr(0, vendors[i].length - 1);
                break;
            }
        }
        return vendor;
    }

    function prefixStyle(style) {
        var vendor = getVendor();
        if (vendor === '') return style;

        style = style.charAt(0).toUpperCase() + style.substr(1);
        return vendor + style;
    }

    function SliderBox(params) {
        if (params == null) {
            params = {};
        }
        this.element = params['sliderBox'];
        this.index = 0;
        this.size = params['size'] || 3;
        this.step = params['step'] || 640;
        this.duration = params['duration'];
        this.thumList = params['thumbs'];
        this.thumbType = params['thumbType'] || 'dot'; // slider 缩略游标的类别，dot: 点， number: 数字
        this.lazyload = params['lazyload'] === undefined ? false : params['lazyload']; //是否使用lazyload
        this.lazyloadStep = params['lazyloadStep'] || 2; // 每次lazyload加载个数，默认2个
        this.autoInterval = params['autoInterval'] === undefined ? true : params['autoInterval']; // 是否自动轮转
        this.imgLoadType = params['imgLoadType'] || 'img' //默认img load的方式，img标签或background
        this.curLoadImgs = this.lazyloadStep; //当前已经load的图片个数
        this.setThumb(this.index);
        if (this.autoInterval) {
            this.startInterval();
        }
    }

    SliderBox.prototype.startInterval = function() {
        var _this = this;
        this.enableTransition();
        if (this.duration) {
            return this.intervalId = setInterval((function() {
                return _this.next(true);
            }), this.duration);
        }
    };

    SliderBox.prototype.stopInterval = function() {
        this.disableTransition();
        if (this.duration) {
            return clearInterval(this.intervalId);
        }
    };

    SliderBox.prototype.enableTransition = function() {
        if (this.element != null) {
            this.element.css(prefixStyle('transition'), "left 0.2s linear 0s");
        }
        return this;
    };

    SliderBox.prototype.disableTransition = function() {
        this.element.css(prefixStyle('transition'), '');
        return this;
    };

    SliderBox.prototype.translate = function(xPos, reset) {
        var nPos;
        if (reset == null) {
            reset = true;
        }
        if (reset) {
            nPos = xPos + this.currentX;
        } else {
            nPos = xPos;
        }
        if (nPos > 0 || Math.abs(nPos) > (this.size - 1) * this.step) {
            return;
        }
        if (this.element != null) {
            this.element.css('left', nPos + "px");
        }
        return this;
    };

    SliderBox.prototype.reset = function() {
        return this.moveTo(this.currentX);
    };

    SliderBox.prototype.prev = function() {
        this.index = this.index - 1;
        if (this.index < 0) {
            // this.index = 0;
            this.index = this.size - 1; // 第一页向前滑，跳转到最后一页
        }
        this._lazyloadInit('backward');
        this.currentX = -(this.index * this.step);
        this.setThumb(this.index);
        return this.moveTo(this.currentX);
    };
    SliderBox.prototype._lazyloadInit = function(slideDirect) {
        var that = this;
        slideDirect = slideDirect || 'forward'; // forward 向前滑动，backward 向后滑动
        if (that.lazyload) {
            var temp = 0; //记录已经加载了多少个img
            var $sliderItems = this.element.find('.J-slider-lazy');
            if (slideDirect == 'forward') {
                $sliderItems.each(function(index, img) {
                    if (temp >= that.lazyloadStep) {
                        return;
                    }
                    if (that.imgLoadType == 'background') {
                        $(img).css({
                            'background': 'url(' + img.dataset.src + ') no-repeat',
                            'background-size': 'contain',
                            'background-position': 'center'
                        })
                    } else {
                        if (img.src != img.dataset.src) {
                            img.src = img.dataset.src;
                            temp++;
                        }
                    }
                    $(img).removeClass('J-slider-lazy');
                })
            } else {
                for (var i = $sliderItems.length - 1; i >= 0; i--) {
                    if (temp >= that.lazyloadStep) {
                        return;
                    }
                    var img = $sliderItems[i];
                    if (that.imgLoadType == 'background') {
                        $(img).css({
                            'background': 'url(' + img.dataset.src + ') no-repeat',
                            'background-size': 'contain',
                            'background-position': 'center'
                        })
                    } else {
                        if (img.src != img.dataset.src) {
                            img.src = img.dataset.src;
                            temp++;
                        }
                    }
                    $(img).removeClass('J-slider-lazy');
                };
            }
            that.curLoadImgs += this.lazyloadStep;
        }
    };
    SliderBox.prototype.next = function(infinate) {
        var that = this;
        this.index = this.index + 1;
        if (infinate === null) {
            infinate = false;
        }
        if (this.index >= this.size) {
            if (infinate) {
                this.index = 0;
            } else {
                this.index = this.size - 1;
            }
        }
        that._lazyloadInit();
        this.currentX = -(this.index * this.step);
        this.setThumb(this.index);
        return this.moveTo(this.currentX);
    };

    SliderBox.prototype.moveToIndex = function(index) {
        this.index = index;
        if (this.index >= this.size) {
            this.index = 0;
        }
        this._lazyloadInit();
        this.currentX = -(this.index * this.step);
        this.setThumb(this.index);
        return this.moveTo(this.currentX);
    };

    SliderBox.prototype.moveTo = function(slideTo) {
        this.slideTo = slideTo;
        this.enableTransition();
        return this.translate(this.slideTo, false);
    };

    SliderBox.prototype.setThumb = function(index) {
        this.index = index;
        if (this.thumList) {
            if (this.thumbType == 'dot') {
                this.thumList.removeClass("light");
                return this.thumList.eq(this.index).addClass("light");
            } else if (this.thumbType == 'number') {
                return this.thumList.html((this.index + 1) + '/' + this.size);
            }
        }
    };

    function TouchPanel(params) {
        var _this = this;
        if (params == null) {
            params = {};
        }
        this.touchTarget = params['touchPanel'] || document.body;
        this.page = params['sliderBox'];
        this.infinate = params['infinate']||false;

        if ('ontouchstart' in window && (this.touchTarget != null) && (this.page != null)) {
            this.touchTarget.bind("touchstart", (function(event) {
                return _this.touchStart(event);
            }));
            this.touchTarget.bind("touchmove", (function(event) {
                return _this.touchMove(event);
            }));
            this.touchTarget.bind("touchend", (function(event) {
                return _this.touchEnd(event);
            }));
            this.touchTarget.bind("touchcancel", (function(event) {
                return _this.touchCancel(event);
            }));
        }
    }

    TouchPanel.prototype.destroyEvents = function() {
        this.touchTarget.unbind("touchstart");
        this.touchTarget.unbind("touchmove");
        this.touchTarget.unbind("touchend");
        this.touchTarget.unbind("touchcancel");
    };

    TouchPanel.prototype.touchStart = function(event) {
        this.page.stopInterval();
        if (event.touches.length === 1) {
            this.slideStartX = event.touches[0].pageX;
            this.slideStartY = event.touches[0].pageY;
        }
    };

    TouchPanel.prototype.touchMove = function(event) {
        this.page.enableTransition();
        this.isMove = false;
        if (event.touches.length === 1) {
            this.slideTo = event.touches[0].pageX - this.slideStartX;
            this.slideToY = event.touches[0].pageY - this.slideStartY;
            if (Math.abs(this.slideToY) < Math.abs(this.slideTo)) {
                this.isMove = true;
                event.preventDefault();
                this.page.translate(this.slideTo);
                return;
            }
        }
    };

    TouchPanel.prototype.touchEnd = function(event) {
        var limit;
        limit = 20;
        if (this.isMove) {
            if (this.slideTo > 0 && Math.abs(this.slideTo) >= limit) {
                this.page.prev();
            } else if (this.slideTo < 0 && Math.abs(this.slideTo) >= limit) {
                this.page.next(this.infinate);
            } else {
                this.page.reset();
            }
        }
        this.isMove = false;
        if(this.page.autoInterval){
            return setTimeout(this.page.startInterval(), 1000);
        }
    };
