class PageBase extends eui.Component {
    public sc: eui.Scroller;
    constructor() {
        super();
    }


    /**
     * scroller事件监听
     */
    public bindScrollerEvent(): void {
        this.sc.addEventListener(egret.Event.CHANGE, this.moveScrollerPos, this);
        this.sc.addEventListener(eui.UIEvent.CHANGE_START, this.moveScrollerPos, this);
        this.sc.addEventListener(eui.UIEvent.CHANGE_END, this.moveScrollerPos, this);
    }

    public rmBindScrollerEvent(): void {
        this.sc.removeEventListener(egret.Event.CHANGE, this.moveScrollerPos, this);
        this.sc.removeEventListener(eui.UIEvent.CHANGE_START, this.moveScrollerPos, this);
        this.sc.removeEventListener(eui.UIEvent.CHANGE_END, this.moveScrollerPos, this);
    }


    /**
     * 页面滑动
     */
    public moveScrollerPos(e: egret.Event | eui.UIEvent): void {
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
    }

    /**
     * 切换页面
     */
    private gotoPage(v: number): void {
        if (v < 0) this.gotoPrevPage(v); // 下滑
        if (v > 0) this.gotoNextPage(v); // 上滑

    };


    /**
     * 上一页
     */
    public gotoPrevPage(v?: number): void { };

    /**
     * 下一页
     */
    public gotoNextPage(v?: number): void { };

    public initNextPage(pageObj: eui.Component): void {
        App.EffectUtils.fadeOut(this, 200, 0, () => {
            if (this.parent) {
                this.parent.addChild(pageObj);
                this.parent.removeChild(this);
            }
        });
    }
}