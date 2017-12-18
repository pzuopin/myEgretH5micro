class PageD extends PageBase {
    public constructor (){
        super();
        this.skinName = "PageDSkin";
    }

    public sc:eui.Scroller;
    public image:eui.Image;
    public textBox:eui.Group;
    public group:eui.Group;
    public lightgroup:eui.Group;
    public image3:eui.Image;
    public image4:eui.Image;
    public shareBtn:eui.Button;
    public yanhuagroup:eui.Group;
    public image0:eui.Image;
    public image2:eui.Image;
    public image1:eui.Image;
    public sharemask:eui.Image;
    private pageDAnim:egret.tween.TweenGroup;
    private pageDAnim2:egret.tween.TweenGroup;
    private pageDAnim3:egret.tween.TweenGroup;
    private pageDAnim4:egret.tween.TweenGroup;

    protected createChildren(): void {
        super.createChildren();
		this.bindScrollerEvent();
        this.pageDAnim.play(1);
        

        this.pageDAnim3.play(1);
        this.pageDAnim3.addEventListener("complete", ()=>{
            this.pageDAnim3.play(1);
        },this)

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
		for (let i = 0; i < this.yanhuagroup.$children.length || 0; i++) {
			this.yanhuagroup.$children[i].scaleX = this.yanhuagroup.$children[i].scaleY = 0.5;
			egret.Tween.get(this.yanhuagroup.$children[i], { loop: true })
				.to({ rotation: 360 }, 5000);
			egret.Tween.get(this.yanhuagroup.$children[i], { loop: true })
				.wait(App.GetDataUtils.rdNum(500, 2000))
				.to({ scaleX: 1.2, scaleY: 1.2 }, 2000, egret.Ease.sineOut)
				.to({ scaleX: 0.5, scaleY: 0.5 }, 3000, egret.Ease.sineOut)

		}

        // 先隐藏
		for (let i = 0; i < this.textBox.$children.length || 0; i++) {
			this.textBox.$children[i].alpha = 0;
			this.textBox.$children[i].anchorOffsetY = 20;
		}
		// 再淡入
		this.textBox.visible = true;
		for (let i = 0; i < this.textBox.$children.length || 0; i++) {
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
		this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.sharemask.visible = true;
		}, this);

        this.sharemask.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.sharemask.visible = false;
        },this);


	}

    public gotoPrevPage(v): void {
		if (v > - 100) return;
		if (this.onceLoaded) return;
		this.onceLoaded = true;
		this.initNextPage(new PageB());
	}

	private onceLoaded: boolean = false;
	public gotoNextPage(v): void {
		
	}

}