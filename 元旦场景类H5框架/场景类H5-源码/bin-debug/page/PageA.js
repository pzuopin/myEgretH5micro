var PageA = (function (_super) {
    __extends(PageA, _super);
    function PageA() {
        _super.call(this);
        this.onceLoaded = false;
        this.addEventListener(eui.UIEvent.COMPLETE, this.loadedUI, this);
        this.skinName = "PageASkin";
        this.alpha = 0;
        this.anchorOffsetY = -30;
        eval(App.EffectUtils.macIconShake("this", 0, false, [[0, 500]]));
        App.EffectUtils.fadeIn(this, 500);
    }
    var d = __define,c=PageA,p=c.prototype;
    p.loadedUI = function () {
        var _this = this;
        // this.ip.anchorOffsetY = -20;
        this.title.anchorOffsetY = 50;
        eval(App.EffectUtils.macIconShake("this.title", 0, false, [[0, 300]], 200));
        // eval(App.EffectUtils.macIconShake("this.star", 0, false, [[0, 300]], 300));
        eval(App.EffectUtils.macIconShake("this.ip", 0, false, [
            // 上下抖
            [15, 300],
            [10, 300],
            [5, 300],
            [2, 300],
            [0, 300]
        ], 300));
        // pao		
        egret.Tween.get(this.pao, { loop: true })
            .to({ rotation: 15 }, 500, egret.Ease.sineInOut)
            .to({ rotation: 0 }, 500, egret.Ease.sineOut);
        // arrow
        App.EffectUtils.blinkEffect(this.arrow, 0.2, 500);
        this.arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.initNextPage(new PageB());
        }, this);
        this.createSnow(); // 红色雪花
    };
    p.gotoPrevPage = function (v) {
        this.sc.viewport.scrollV = 0;
    };
    p.gotoNextPage = function (v) {
        if (v < 100)
            return;
        if (this.onceLoaded)
            return;
        this.onceLoaded = true;
        this.initNextPage(new PageB());
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.bindScrollerEvent();
        // egret.setTimeout(() => {
        // 	this.initNextPage();
        // }, this, 2000);
    };
    // 雪花
    p.createSnow = function () {
        var snowParticle = new particle.GravityParticleSystem(RES.getRes("p1_snow_red_png"), RES.getRes("snow_json"));
        this.addChild(snowParticle);
        snowParticle.start();
    };
    return PageA;
}(PageBase));
egret.registerClass(PageA,'PageA');
//# sourceMappingURL=PageA.js.map