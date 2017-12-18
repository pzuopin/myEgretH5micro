
class PageD extends PageBase {

	public sc: eui.Scroller;
	private bg: eui.Image;
	private ipSm: eui.Group;
	private ipLg: eui.Group;
	private eyeL: eui.Image;
	private eyeR: eui.Image;
	private textBox: eui.Group;
	private arrow: eui.Image;

	// 飞机
	private planeL: eui.Image;
	private planeR: eui.Image;

	constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadedUI, this);
		this.skinName = "PageDSkin";
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

		// eyeL eyeR
		egret.Tween.get(this.eyeL, { loop: true }).to({ rotation: 360 }, 800);
		egret.Tween.get(this.eyeR, { loop: true }).to({ rotation: 360 }, 800);

		// ipLg
		egret.Tween.get(this.ipLg, { loop: true })
			.to({ rotation: -5 }, 1500, egret.Ease.sineInOut)
			.to({ rotation: 0 }, 1500, egret.Ease.sineInOut);

		// // ipSm
		egret.Tween.get(this.ipSm, { loop: true })
			.to({ rotation: -5 }, 1200, egret.Ease.sineInOut)
			.to({ rotation: 0 }, 1200, egret.Ease.sineInOut);

		// textBox
		let textLine: any[] = this.textBox.$children || [];
		for (let i = 0; i < textLine.length; ++i) {
			textLine[i].alpha = 0;
			App.EffectUtils.fadeIn(textLine[i], 1000, 600 * i);
		}

		// arrow
		App.EffectUtils.blinkEffect(this.arrow, 0.2, 500);
		this.arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.initNextPage(new PageE());
		}, this);

		// 飞机
		this.planeL = new eui.Image(RES.getRes("p4_plane_left_png"));
		this.planeR = new eui.Image(RES.getRes("p4_plane_right_png"));

		this.planeL.x = 0;
		this.planeL.y = 200;
		this.planeL.rotation = -10;
		this.addChild(this.planeL);

		this.planeR.x = this.sc.width;
		this.planeR.y = 240;
		this.planeR.rotation = 0;
		this.addChild(this.planeR);
		egret.Tween.get(this).to({ factor: 1 }, 2000, egret.Ease.sineInOut);

	}

	public get factor(): number { 
        return 0;
    }

    public set factor(value: number) {
		this.planeL.rotation += value * 0.3;
        this.planeL.x = (1 - value) * (1 - value) * -this.planeL.width + 2 * value * (1 - value) * 10 + value * value * 45;
        this.planeL.y = (1 - value) * (1 - value) * 500 + 2 * value * (1 - value) * 520 + value * value * 550;

		this.planeR.rotation -= value * 0.08;
        // this.planeR.x = (1 - value) * (1 - value) * 640 + 2 * value * (1 - value) * 640 + value * value * 600;
		this.planeR.x = this.sc.width - this.planeR.width * value + 15;
		this.planeR.y += value * 0.3;
        // this.planeR.y = (1 - value) * (1 - value) * 200 + 2 * value * (1 - value) * 170 + value * value * 200;
    }

	public gotoPrevPage(v): void {
		if (v > - 100) return;
		if (this.onceLoaded) return;
		this.onceLoaded = true;
		this.initNextPage(new PageC());
	}

	private onceLoaded: boolean = false;
	public gotoNextPage(v): void {
		if (v < 100) return;
		if (this.onceLoaded) return;
		this.onceLoaded = true;
		this.initNextPage(new PageE());
	}

	protected createChildren(): void {
		super.createChildren();
		this.bindScrollerEvent();
	}
}