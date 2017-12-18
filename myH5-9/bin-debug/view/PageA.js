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
var PageA = (function (_super) {
    __extends(PageA, _super);
    function PageA() {
        var _this = _super.call(this) || this;
        _this.onceLoaded = false;
        _this.skinName = "PageASkin";
        return _this;
    }
    PageA.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.bindScrollerEvent();
        // this.pageAAnim.play(1);
        this.pageAAnim2.play(1);
        this.nextBtnAnim.play(1);
        this.pageAAnim2.addEventListener("complete", function () {
            _this.pageAAnim2.play(1);
        }, this);
        this.nextBtnAnim.addEventListener("complete", function () {
            _this.nextBtnAnim.play(1);
        }, this);
        eval(App.EffectUtils.macIconShake("this.group", 0, false, [
            // 上下抖
            [15, 300],
            [10, 300],
            [5, 300],
            [2, 300],
            [0, 300]
        ], 300));
        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.initNextPage(new PageB());
        }, this);
    };
    PageA.prototype.gotoPrevPage = function (v) {
        this.sc.viewport.scrollV = 0;
    };
    PageA.prototype.gotoNextPage = function (v) {
        if (v < 100)
            return;
        if (this.onceLoaded)
            return;
        this.onceLoaded = true;
        this.initNextPage(new PageB());
    };
    return PageA;
}(PageBase));
__reflect(PageA.prototype, "PageA");
//# sourceMappingURL=PageA.js.map