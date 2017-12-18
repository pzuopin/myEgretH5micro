class PageB extends PageBase {
    public constructor (){
        super();
        this.skinName = "PageBSkin";
    }

    public sc:eui.Scroller;
    public group:eui.Group;
    public image1:eui.Image;
    public image:eui.Image;
    public image0:eui.Image;
    public image2:eui.Image;
    public nextBtn:eui.Button;
    public textBox:eui.Group;
    public label:eui.Label;
    public label0:eui.Label;
    public label1:eui.Label;
    public label2:eui.Label;
    private pageBAnim:egret.tween.TweenGroup;
    private pageBAnim2:egret.tween.TweenGroup;


    protected createChildren(): void {
        super.createChildren();
		this.bindScrollerEvent();
        this.pageBAnim.play(1);
        
        this.pageBAnim.addEventListener("complete", ()=>{
            this.pageBAnim.play(1);
        },this)

        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.initNextPage(new PageB());
		}, this);

        eval(App.EffectUtils.macIconShake("this.group", 0, false, [
			// 上下抖
			[15, 300],
            [10, 300],
            [5, 300],
            [2, 300],
            [0, 300]
		], 300));
        let that = this;
        setTimeout(function() {
            that.textBox.alpha = 1;
            that.pageBAnim2.play(1);
        }, 1000);

        App.EffectUtils.blinkEffect(this.nextBtn, 0.2, 500);
		this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.initNextPage(new PageC());
		}, this);

        // 心
		let xinParticle = new particle.GravityParticleSystem(RES.getRes("p2_xin_png"), RES.getRes("xin_json"));
		xinParticle.emitterX = this.image0.x;
		xinParticle.y = this.image0.y;
        xinParticle.x = this.image.x;
        this.addChild(xinParticle);
        xinParticle.start();
	}

    public gotoPrevPage(v): void {
		if (v > - 100) return;
		if (this.onceLoaded) return;
		this.onceLoaded = true;
		this.initNextPage(new PageA());
	}

	private onceLoaded: boolean = false;
	public gotoNextPage(v): void {
		if (v < 100) return;
		if (this.onceLoaded) return;
		this.onceLoaded = true;
		this.initNextPage(new PageC());
	}

}