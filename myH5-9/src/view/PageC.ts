class PageC extends PageBase {
    public constructor (){
        super();
        this.skinName = "PageCSkin";
    }

    public sc:eui.Scroller;
    private image:eui.Image;
    private image0:eui.Image;
    private image1:eui.Image;
    private nextBtn:eui.Button;
    private textBox:eui.Group;
    private label:eui.Label;
    private label0:eui.Label;
    private label1:eui.Label;
    private label2:eui.Label;
    private pageCAnim:egret.tween.TweenGroup;
    private pageCAnim2:egret.tween.TweenGroup;
    private group:eui.Group;

    protected createChildren(): void {
        super.createChildren();
		this.bindScrollerEvent();
        this.pageCAnim.play(1);
        this.pageCAnim2.play(1)
        this.pageCAnim2.addEventListener("complete", ()=>{
            this.pageCAnim2.play(1);
        },this)

        eval(App.EffectUtils.macIconShake("this.group", 0, false, [
			// 上下抖
			[15, 300],
            [10, 300],
            [5, 300],
            [2, 300],
            [0, 300]
		], 300));

        App.EffectUtils.blinkEffect(this.nextBtn, 0.2, 500);
		this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.initNextPage(new PageD());
		}, this);

        // 音符
		let musicParticle = new particle.GravityParticleSystem(RES.getRes("p3_music_2_png"), RES.getRes("xin_json"));
		musicParticle.emitterX = this.image1.x + 30;
		musicParticle.emitterY = this.image1.y + 20;
		musicParticle.width = 0;
        musicParticle.x = this.image1.x + 120;
        musicParticle.y = this.image1.y + 150;
		musicParticle.maxParticles = 2;
        this.addChild(musicParticle);
        musicParticle.start();
	}

    public gotoPrevPage(v): void {
		if (v > - 100) return;
		if (this.onceLoaded) return;
		this.onceLoaded = true;
		this.initNextPage(new PageB());
	}

	private onceLoaded: boolean = false;
	public gotoNextPage(v): void {
		if (v < 100) return;
		if (this.onceLoaded) return;
		this.onceLoaded = true;
		this.initNextPage(new PageD());
	}

}