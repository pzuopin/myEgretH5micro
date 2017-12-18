var PageC = (function (_super) {
    __extends(PageC, _super);
    function PageC() {
        _super.call(this);
        this.onceLoaded = false;
        this.addEventListener(eui.UIEvent.COMPLETE, this.loadedUI, this);
        this.skinName = "PageCSkin";
        this.alpha = 0;
        // this.scaleX = this.scaleY = 2;
        // this.rotation = 15;
        // egret.Tween.get(this).to({ rotation: 0, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.backOut);
        this.anchorOffsetY = -30;
        eval(App.EffectUtils.macIconShake("this", 0, false, [[0, 500]]));
        App.EffectUtils.fadeIn(this, 500);
    }
    var d = __define,c=PageC,p=c.prototype;
    p.loadedUI = function () {
        /**
         * 元素动画
         */
        var _this = this;
        // title
        this.title.anchorOffsetY = 50;
        eval(App.EffectUtils.macIconShake("this.title", 0, false, [[0, 300]], 200));
        // 汗
        this.han.alpha = 0;
        App.EffectUtils.fadeIn(this.han, 1000, 1000);
        // 话筒
        egret.Tween.get(this.huaTong, { loop: true })
            .to({ rotation: -10 }, 500, egret.Ease.sineOut)
            .to({ rotation: 0 }, 500, egret.Ease.sineInOut);
        // 音符
        this.musicFlag.alpha = 0;
        var musicParticle = new particle.GravityParticleSystem(RES.getRes("p3_music_2_png"), RES.getRes("xin_json"));
        musicParticle.emitterX = this.huaTong.x + 30;
        musicParticle.emitterY = this.musicFlag.y + 20;
        musicParticle.width = 0;
        musicParticle.maxParticles = 2;
        this.addChild(musicParticle);
        musicParticle.start();
        // textBox
        var textLine = this.textBox.$children || [];
        for (var i = 0; i < textLine.length; ++i) {
            textLine[i].alpha = 0;
            App.EffectUtils.fadeIn(textLine[i], 1000, 600 * i);
        }
        // arrow
        App.EffectUtils.blinkEffect(this.arrow, 0.2, 500);
        this.arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.initNextPage(new PageD());
        }, this);
    };
    p.gotoPrevPage = function (v) {
        if (v > -100)
            return;
        if (this.onceLoaded)
            return;
        this.onceLoaded = true;
        this.initNextPage(new PageB());
    };
    p.gotoNextPage = function (v) {
        if (v < 100)
            return;
        if (this.onceLoaded)
            return;
        this.onceLoaded = true;
        this.initNextPage(new PageD());
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.bindScrollerEvent();
    };
    return PageC;
}(PageBase));
egret.registerClass(PageC,'PageC');
//# sourceMappingURL=PageC.js.map