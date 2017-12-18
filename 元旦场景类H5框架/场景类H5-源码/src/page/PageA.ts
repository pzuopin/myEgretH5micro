
class PageA extends PageBase {
	public sc: eui.Scroller;
	private ip: eui.Image;
	private title: eui.Image;
	private pao: eui.Image;
	private arrow: eui.Image;

	constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadedUI, this);
		this.skinName = "PageASkin";
		this.alpha = 0;
		this.anchorOffsetY = -30;
		eval(App.EffectUtils.macIconShake("this", 0, false, [[0, 500]]));
		App.EffectUtils.fadeIn(this, 500);
	}

	private loadedUI(): void {
		// this.ip.anchorOffsetY = -20;
		this.title.anchorOffsetY = 50;
		eval(App.EffectUtils.macIconShake("this.title", 0, false, [[0, 300]], 200));
		// eval(App.EffectUtils.macIconShake("this.star", 0, false, [[0, 300]], 300));
		eval(App.EffectUtils.macIconShake("this.ip", 0, false, [
			// 上下抖
			[15, 300],
            [10, 300],
            [5, 300],
            [2, 300],
            [0, 300]
		], 300));

		// pao		
		egret.Tween.get(this.pao, { loop: true })
			.to({ rotation: 15 }, 500, egret.Ease.sineInOut)
			.to({ rotation: 0 }, 500, egret.Ease.sineOut)

		// arrow
		App.EffectUtils.blinkEffect(this.arrow, 0.2, 500);
		this.arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.initNextPage(new PageB());
		}, this);
		this.createSnow(); // 红色雪花
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

	protected createChildren(): void {
		super.createChildren();
		this.bindScrollerEvent();
		// egret.setTimeout(() => {
		// 	this.initNextPage();
		// }, this, 2000);
	}

	// 雪花
    private createSnow(): void {
        let snowParticle = new particle.GravityParticleSystem(RES.getRes("p1_snow_red_png"), RES.getRes("snow_json"));
        this.addChild(snowParticle);
        snowParticle.start();
    }
}