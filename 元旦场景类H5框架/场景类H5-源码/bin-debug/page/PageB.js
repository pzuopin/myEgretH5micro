var PageB = (function (_super) {
    __extends(PageB, _super);
    function PageB() {
        _super.call(this);
        this.onceLoaded = false;
        this.addEventListener(eui.UIEvent.COMPLETE, this.loadedUI, this);
        this.skinName = "PageBSkin";
        this.alpha = 0;
        // this.scaleX = this.scaleY = 2;
        // this.rotation = 15;
        // egret.Tween.get(this).to({ rotation: 0, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.backOut);
        this.anchorOffsetY = -30;
        eval(App.EffectUtils.macIconShake("this", 0, false, [[0, 500]]));
        App.EffectUtils.fadeIn(this, 500);
    }
    var d = __define,c=PageB,p=c.prototype;
    p.loadedUI = function () {
        /**
         * 元素动画
         */
        var _this = this;
        // 心
        var xinParticle = new particle.GravityParticleSystem(RES.getRes("p2_xin_png"), RES.getRes("xin_json"));
        xinParticle.emitterX = this.eye2.x;
        xinParticle.y = this.ip.y;
        this.addChild(xinParticle);
        xinParticle.start();
        // textBox
        var textLine = this.textBox.$children || [];
        for (var i = 0; i < textLine.length; ++i) {
            textLine[i].alpha = 0;
            App.EffectUtils.fadeIn(textLine[i], 1000, 600 * i);
        }
        // ip
        eval(App.EffectUtils.macIconShake("this.ip", 0, false, [
            // 上下抖
            [15, 300],
            [10, 300],
            [5, 300],
            [2, 300],
            [0, 300]
        ], 300));
        // eye0
        var eyes = [this.eye0, this.eye1, this.eye2, this.eye3];
        for (var i = 0; i < eyes.length; ++i) {
            var sX = eyes[i].scaleX, sy = eyes[i].scaleY;
            egret.Tween.get(eyes[i], { loop: true })
                .to({ scaleX: sX + 0.2, scaleY: sy + 0.2 }, 300, egret.Ease.sineIn)
                .to({ scaleX: sX, scaleY: sy }, 300, egret.Ease.sineIn).wait(i > 1 ? 100 : 0);
        }
        // arrow
        App.EffectUtils.blinkEffect(this.arrow, 0.2, 500);
        this.arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.initNextPage(new PageC());
        }, this);
    };
    p.gotoPrevPage = function (v) {
        if (v > -100)
            return;
        if (this.onceLoaded)
            return;
        this.onceLoaded = true;
        this.initNextPage(new PageA());
    };
    p.gotoNextPage = function (v) {
        if (v < 100)
            return;
        if (this.onceLoaded)
            return;
        this.onceLoaded = true;
        this.initNextPage(new PageC());
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.bindScrollerEvent();
    };
    return PageB;
}(PageBase));
egret.registerClass(PageB,'PageB');
//# sourceMappingURL=PageB.js.map