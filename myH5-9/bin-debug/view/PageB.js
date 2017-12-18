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
var PageB = (function (_super) {
    __extends(PageB, _super);
    function PageB() {
        var _this = _super.call(this) || this;
        _this.onceLoaded = false;
        _this.skinName = "PageBSkin";
        return _this;
    }
    PageB.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.bindScrollerEvent();
        this.pageBAnim.play(1);
        this.pageBAnim.addEventListener("complete", function () {
            _this.pageBAnim.play(1);
        }, this);
        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.initNextPage(new PageB());
        }, this);
        eval(App.EffectUtils.macIconShake("this.group", 0, false, [
            // 上下抖
            [15, 300],
            [10, 300],
            [5, 300],
            [2, 300],
            [0, 300]
        ], 300));
        var that = this;
        setTimeout(function () {
            that.textBox.alpha = 1;
            that.pageBAnim2.play(1);
        }, 1000);
        App.EffectUtils.blinkEffect(this.nextBtn, 0.2, 500);
        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.initNextPage(new PageC());
        }, this);
        // 心
        var xinParticle = new particle.GravityParticleSystem(RES.getRes("p2_xin_png"), RES.getRes("xin_json"));
        xinParticle.emitterX = this.image0.x;
        xinParticle.y = this.image0.y;
        xinParticle.x = this.image.x;
        this.addChild(xinParticle);
        xinParticle.start();
    };
    PageB.prototype.gotoPrevPage = function (v) {
        if (v > -100)
            return;
        if (this.onceLoaded)
            return;
        this.onceLoaded = true;
        this.initNextPage(new PageA());
    };
    PageB.prototype.gotoNextPage = function (v) {
        if (v < 100)
            return;
        if (this.onceLoaded)
            return;
        this.onceLoaded = true;
        this.initNextPage(new PageC());
    };
    return PageB;
}(PageBase));
__reflect(PageB.prototype, "PageB");
//# sourceMappingURL=PageB.js.map