var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PageC = (function (_super) {
    __extends(PageC, _super);
    function PageC() {
        var _this = _super.call(this) || this;
        _this.onceLoaded = false;
        _this.skinName = "PageCSkin";
        return _this;
    }
    PageC.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.bindScrollerEvent();
        this.pageCAnim.play(1);
        this.pageCAnim2.play(1);
        this.pageCAnim2.addEventListener("complete", function () {
            _this.pageCAnim2.play(1);
        }, this);
        eval(App.EffectUtils.macIconShake("this.group", 0, false, [
            // 上下抖
            [15, 300],
            [10, 300],
            [5, 300],
            [2, 300],
            [0, 300]
        ], 300));
        App.EffectUtils.blinkEffect(this.nextBtn, 0.2, 500);
        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.initNextPage(new PageD());
        }, this);
        // 音符
        var musicParticle = new particle.GravityParticleSystem(RES.getRes("p3_music_2_png"), RES.getRes("xin_json"));
        musicParticle.emitterX = this.image1.x + 30;
        musicParticle.emitterY = this.image1.y + 20;
        musicParticle.width = 0;
        musicParticle.x = this.image1.x + 120;
        musicParticle.y = this.image1.y + 150;
        musicParticle.maxParticles = 2;
        this.addChild(musicParticle);
        musicParticle.start();
    };
    PageC.prototype.gotoPrevPage = function (v) {
        if (v > -100)
            return;
        if (this.onceLoaded)
            return;
        this.onceLoaded = true;
        this.initNextPage(new PageB());
    };
    PageC.prototype.gotoNextPage = function (v) {
        if (v < 100)
            return;
        if (this.onceLoaded)
            return;
        this.onceLoaded = true;
        this.initNextPage(new PageD());
    };
    return PageC;
}(PageBase));
__reflect(PageC.prototype, "PageC");
//# sourceMappingURL=PageC.js.map