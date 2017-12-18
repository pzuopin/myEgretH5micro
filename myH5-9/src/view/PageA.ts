class PageA extends PageBase {
    public constructor (){
        super();
        this.skinName = "PageASkin";
    }

    public sc:eui.Scroller;
    public pagea:eui.Group;
    public bg:eui.Image;
    public title:eui.Image;
    public group:eui.Group;
    public image:eui.Image;
    private pageAAnim:egret.tween.TweenGroup;
    private pageAAnim2:egret.tween.TweenGroup;
    private nextBtn:eui.Button;
    private nextBtnAnim: egret.tween.TweenGroup;

    protected createChildren(): void {
        super.createChildren();
		this.bindScrollerEvent();
        // this.pageAAnim.play(1);
        this.pageAAnim2.play(1);
        this.nextBtnAnim.play(1);
        this.pageAAnim2.addEventListener("complete", ()=>{
            this.pageAAnim2.play(1);
        },this)
        this.nextBtnAnim.addEventListener("complete", ()=>{
            this.nextBtnAnim.play(1);
        },this)

        eval(App.EffectUtils.macIconShake("this.group", 0, false, [
			// 上下抖
			[15, 300],
            [10, 300],
            [5, 300],
            [2, 300],
            [0, 300]
		], 300));

        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.initNextPage(new PageB());
		}, this);
	}

    public gotoPrevPage(v): void {
		this.sc.viewport.scrollV = 0;
	}

	private onceLoaded: boolean = false;
	public gotoNextPage(v): void {
		if (v < 100) return;
		if (this.onceLoaded) return;
		this.onceLoaded = true;
		this.initNextPage(new PageB());
	}

}