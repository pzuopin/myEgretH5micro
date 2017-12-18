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
var PageD = (function (_super) {
    __extends(PageD, _super);
    function PageD() {
        var _this = _super.call(this) || this;
        _this.onceLoaded = false;
        _this.skinName = "PageDSkin";
        return _this;
    }
    PageD.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.bindScrollerEvent();
        this.pageDAnim.play(1);
        this.pageDAnim3.play(1);
        this.pageDAnim3.addEventListener("complete", function () {
            _this.pageDAnim3.play(1);
        }, this);
        // 不能很好的效果
        // this.pageDAnim2.play()
        // this.pageDAnim2.addEventListener("complete", ()=>{
        //     this.pageDAnim2.play();
        // },this)
        // this.pageDAnim4.play();
        // this.pageDAnim4.addEventListener("complete", ()=>{
        //     this.pageDAnim4.play();
        // },this)
        // 烟花
        for (var i = 0; i < this.yanhuagroup.$children.length || 0; i++) {
            this.yanhuagroup.$children[i].scaleX = this.yanhuagroup.$children[i].scaleY = 0.5;
            egret.Tween.get(this.yanhuagroup.$children[i], { loop: true })
                .to({ rotation: 360 }, 5000);
            egret.Tween.get(this.yanhuagroup.$children[i], { loop: true })
                .wait(App.GetDataUtils.rdNum(500, 2000))
                .to({ scaleX: 1.2, scaleY: 1.2 }, 2000, egret.Ease.sineOut)
                .to({ scaleX: 0.5, scaleY: 0.5 }, 3000, egret.Ease.sineOut);
        }
        // 先隐藏
        for (var i = 0; i < this.textBox.$children.length || 0; i++) {
            this.textBox.$children[i].alpha = 0;
            this.textBox.$children[i].anchorOffsetY = 20;
        }
        // 再淡入
        this.textBox.visible = true;
        for (var i = 0; i < this.textBox.$children.length || 0; i++) {
            App.EffectUtils.fadeIn(this.textBox.$children[i], 400, i * 300);
            egret.Tween.get(this.textBox.$children[i]).wait(i * 300).to({ anchorOffsetY: 0 }, 500, egret.Ease.backOut);
        }
        eval(App.EffectUtils.macIconShake("this.group", 0, false, [
            // 上下抖
            [15, 300],
            [10, 300],
            [5, 300],
            [2, 300],
            [0, 300]
        ], 300));
        App.EffectUtils.blinkEffect(this.shareBtn, 0.2, 500);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.sharemask.visible = true;
        }, this);
        this.sharemask.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.sharemask.visible = false;
        }, this);
    };
    PageD.prototype.gotoPrevPage = function (v) {
        if (v > -100)
            return;
        if (this.onceLoaded)
            return;
        this.onceLoaded = true;
        this.initNextPage(new PageB());
    };
    PageD.prototype.gotoNextPage = function (v) {
    };
    return PageD;
}(PageBase));
__reflect(PageD.prototype, "PageD");
//# sourceMappingURL=PageD.js.map