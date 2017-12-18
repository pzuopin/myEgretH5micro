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
var PageBase = (function (_super) {
    __extends(PageBase, _super);
    function PageBase() {
        return _super.call(this) || this;
    }
    /**
     * scroller事件监听
     */
    PageBase.prototype.bindScrollerEvent = function () {
        this.sc.addEventListener(egret.Event.CHANGE, this.moveScrollerPos, this);
        this.sc.addEventListener(eui.UIEvent.CHANGE_START, this.moveScrollerPos, this);
        this.sc.addEventListener(eui.UIEvent.CHANGE_END, this.moveScrollerPos, this);
    };
    /**
     * 解绑监听事件
     */
    PageBase.prototype.rmBindScrollerEvent = function () {
        this.sc.removeEventListener(egret.Event.CHANGE, this.moveScrollerPos, this);
        this.sc.removeEventListener(eui.UIEvent.CHANGE_START, this.moveScrollerPos, this);
        this.sc.removeEventListener(eui.UIEvent.CHANGE_END, this.moveScrollerPos, this);
    };
    PageBase.prototype.moveScrollerPos = function (e) {
        switch (e.type) {
            case egret.Event.CHANGE:
                this.gotoPage(this.sc.viewport.scrollV);
                break;
            case eui.UIEvent.CHANGE_START:
                break;
            case eui.UIEvent.CHANGE_END:
                break;
        }
    };
    PageBase.prototype.gotoPage = function (v) {
        if (v < 0) {
            this.gotoPrevPage(v); // 下滑
        }
        if (v > 0) {
            this.gotoNextPage(v); // 上滑
        }
    };
    /**
     * 上一页
     */
    PageBase.prototype.gotoPrevPage = function (v) { };
    /**
     * 下一页
     */
    PageBase.prototype.gotoNextPage = function (v) { };
    PageBase.prototype.initNextPage = function (pageObj) {
        var _this = this;
        App.EffectUtils.fadeOut(this, 200, 0, function () {
            if (_this.parent) {
                _this.parent.addChild(pageObj);
                _this.parent.removeChild(_this);
            }
        });
    };
    return PageBase;
}(eui.Component));
__reflect(PageBase.prototype, "PageBase");
//# sourceMappingURL=PageBase.js.map