
class PageB extends PageBase {

	public sc: eui.Scroller;
	private ip: eui.Group;
	private eye1: eui.Image;
	private eye0: eui.Image;
	private eye2: eui.Image;
	private eye3: eui.Image;
	private textBox: eui.Group;
	private arrow: eui.Image;


	constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadedUI, this);
		this.skinName = "PageBSkin";
		this.alpha = 0;
		// this.scaleX = this.scaleY = 2;
		// this.rotation = 15;
		// egret.Tween.get(this).to({ rotation: 0, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.backOut);
		this.anchorOffsetY = -30;
		eval(App.EffectUtils.macIconShake("this", 0, false, [[0, 500]]));
		App.EffectUtils.fadeIn(this, 500);
	}

	private loadedUI(): void {

		/**
		 * 元素动画
		 */

		// 心
		let xinParticle = new particle.GravityParticleSystem(RES.getRes("p2_xin_png"), RES.getRes("xin_json"));
		xinParticle.emitterX = this.eye2.x;
		xinParticle.y = this.ip.y;
        this.addChild(xinParticle);
        xinParticle.start();

		// textBox
		let textLine: any[] = this.textBox.$children || [];
		for (let i = 0; i < textLine.length; ++i) {
			textLine[i].alpha = 0;
			App.EffectUtils.fadeIn(textLine[i], 1000, 600 * i);
		}

		// ip
		eval(App.EffectUtils.macIconShake("this.ip", 0, false, [
			// 上下抖
			[15, 300],
            [10, 300],
            [5, 300],
            [2, 300],
            [0, 300]
		], 300));

		// eye0
		let eyes: eui.Image[] = [this.eye0, this.eye1, this.eye2, this.eye3];
		for (let i = 0; i < eyes.length; ++i) {
			let sX = eyes[i].scaleX, sy = eyes[i].scaleY;
			egret.Tween.get(eyes[i], { loop: true })
				.to({ scaleX: sX + 0.2, scaleY: sy + 0.2 }, 300, egret.Ease.sineIn)
				.to({ scaleX: sX, scaleY: sy }, 300, egret.Ease.sineIn).wait(i > 1 ? 100 : 0);
		}

		// arrow
		App.EffectUtils.blinkEffect(this.arrow, 0.2, 500);
		this.arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.initNextPage(new PageC());
		}, this);
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

	protected createChildren(): void {
		super.createChildren();
		this.bindScrollerEvent();
	}
}