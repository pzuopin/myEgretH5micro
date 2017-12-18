var PageBase = (function (_super) {
    __extends(PageBase, _super);
    function PageBase() {
        _super.call(this);
    }
    var d = __define,c=PageBase,p=c.prototype;
    /**
     * scroller事件监听
     */
    p.bindScrollerEvent = function () {
        this.sc.addEventListener(egret.Event.CHANGE, this.moveScrollerPos, this);
        this.sc.addEventListener(eui.UIEvent.CHANGE_START, this.moveScrollerPos, this);
        this.sc.addEventListener(eui.UIEvent.CHANGE_END, this.moveScrollerPos, this);
    };
    p.rmBindScrollerEvent = function () {
        this.sc.removeEventListener(egret.Event.CHANGE, this.moveScrollerPos, this);
        this.sc.removeEventListener(eui.UIEvent.CHANGE_START, this.moveScrollerPos, this);
        this.sc.removeEventListener(eui.UIEvent.CHANGE_END, this.moveScrollerPos, this);
    };
    /**
     * 页面滑动
     */
    p.moveScrollerPos = function (e) {
        switch (e.type) {
            case egret.Event.CHANGE:
                this.gotoPage(this.sc.viewport.scrollV);
                break;
            case eui.UIEvent.CHANGE_START:
                // egret.Tween.get(this).to({ alpha: 0.86 }, 200, egret.Ease.sineOut);
                break;
            case eui.UIEvent.CHANGE_END:
                // egret.Tween.get(this).to({ alpha: 1 }, 200, egret.Ease.sineIn);
                break;
        }
    };
    /**
     * 切换页面
     */
    p.gotoPage = function (v) {
        if (v < 0)
            this.gotoPrevPage(v); // 下滑
        if (v > 0)
            this.gotoNextPage(v); // 上滑
    };
    ;
    /**
     * 上一页
     */
    p.gotoPrevPage = function (v) { };
    ;
    /**
     * 下一页
     */
    p.gotoNextPage = function (v) { };
    ;
    p.initNextPage = function (pageObj) {
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
egret.registerClass(PageBase,'PageBase');
//# sourceMappingURL=PageBase.js.map