var PageE = (function (_super) {
    __extends(PageE, _super);
    function PageE() {
        _super.call(this);
        this.onceLoaded = false;
        this.addEventListener(eui.UIEvent.COMPLETE, this.loadedUI, this);
        this.skinName = "PageESkin";
        this.alpha = 0;
        // this.scaleX = this.scaleY = 2;
        // this.rotation = 15;
        // egret.Tween.get(this).to({ rotation: 0, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.backOut);
        this.anchorOffsetY = -30;
        eval(App.EffectUtils.macIconShake("this", 0, false, [[0, 500]]));
        App.EffectUtils.fadeIn(this, 500);
    }
    var d = __define,c=PageE,p=c.prototype;
    p.loadedUI = function () {
        /**
         * 元素动画
         */
        var _this = this;
        // 文字
        // 先隐藏
        for (var i = 0; i < this.desc.$children.length || 0; i++) {
            this.desc.$children[i].alpha = 0;
            this.desc.$children[i].anchorOffsetY = 20;
        }
        // 再淡入
        this.desc.visible = true;
        for (var i = 0; i < this.desc.$children.length || 0; i++) {
            App.EffectUtils.fadeIn(this.desc.$children[i], 400, i * 300);
            egret.Tween.get(this.desc.$children[i]).wait(i * 300).to({ anchorOffsetY: 0 }, 500, egret.Ease.backOut);
        }
        // logo
        this.logo.anchorOffsetY = -10;
        eval(App.EffectUtils.macIconShake("this.logo", 0, false, [[0, 300]], 500));
        // ip
        eval(App.EffectUtils.macIconShake("this.ip", 0, false, [
            // 上下抖
            [15, 300],
            [10, 300],
            [5, 300],
            [2, 300],
            [0, 300]
        ], 300));
        // 烟花
        for (var i = 0; i < this.yanhua.$children.length || 0; i++) {
            this.yanhua.$children[i].scaleX = this.yanhua.$children[i].scaleY = 0.5;
            egret.Tween.get(this.yanhua.$children[i], { loop: true })
                .to({ rotation: 360 }, 5000);
            egret.Tween.get(this.yanhua.$children[i], { loop: true })
                .wait(App.GetDataUtils.rdNum(500, 2000))
                .to({ scaleX: 1.2, scaleY: 1.2 }, 2000, egret.Ease.sineOut)
                .to({ scaleX: 0.5, scaleY: 0.5 }, 3000, egret.Ease.sineOut);
        }
        // 灯
        var dengEls = this.deng.$children || [];
        egret.Tween.get(this.deng, { loop: true })
            .to({ rotation: 5 }, 2000, egret.Ease.sineInOut)
            .to({ rotation: 0 }, 2000, egret.Ease.sineInOut);
        if (dengEls.length) {
            egret.Tween.get(dengEls[0], { loop: true }) // 灯光
                .to({ alpha: 0 }, 800, egret.Ease.sineIn)
                .to({ alpha: 1 }, 1000, egret.Ease.sineOut);
            egret.Tween.get(dengEls[2], { loop: true }) // 灯芯
                .to({ alpha: 0 }, 800, egret.Ease.sineIn)
                .to({ alpha: 1 }, 1000, egret.Ease.sineOut);
        }
        //  share
        this.share.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.shareMask.alpha = 0;
            _this.shareMask.visible = true;
            App.EffectUtils.fadeIn(_this.shareMask, 300);
            _this.shareMask.once(egret.TouchEvent.TOUCH_TAP, function () {
                _this.shareMask.visible = false;
            }, _this);
        }, this);
    };
    p.gotoPrevPage = function (v) {
        if (v > -100)
            return;
        if (this.onceLoaded)
            return;
        this.onceLoaded = true;
        this.initNextPage(new PageD());
    };
    p.gotoNextPage = function (v) {
        this.sc.viewport.scrollV = 0;
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.bindScrollerEvent();
    };
    return PageE;
}(PageBase));
egret.registerClass(PageE,'PageE');
//# sourceMappingURL=PageE.js.map