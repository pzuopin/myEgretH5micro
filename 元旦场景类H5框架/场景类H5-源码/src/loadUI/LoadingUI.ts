
class LoadingUI extends eui.Component {
    public loadPg: eui.Image;
    private ip: eui.Image;
    private maskBg: eui.Rect;


    constructor() {
        super();
        // this.addEventListener(eui.UIEvent.COMPLETE, this.loadProgress, this);
        this.skinName = RES.getRes("LoadingUISkin_exml");
        // this.createSnow();
        this.createCircleSnow();
        this.loadProgress();
        // this.drawText();
    }

    private sW: number = egret.MainContext.instance.stage.stageWidth;
    private sH: number = egret.MainContext.instance.stage.stageHeight;
    private textField: egret.TextField;
    private ipObj: egret.Bitmap;

    // loadProgress
    private loadProgress(): void {
        this.maskBg = new eui.Rect(this.loadPg.width, this.loadPg.height, 0xffffff);
        this.addChild(this.maskBg);
        this.maskBg.x = this.loadPg.x;
        this.maskBg.y = this.loadPg.y;
        this.loadPg.mask = this.maskBg; // 等号后面是形状 即阴影面积区

    }

    private applyIpsAni(n: number): void {
        egret.Tween.removeTweens(this.maskBg);
        egret.Tween.removeTweens(this.ip);
        egret.Tween.get(this.maskBg).to({ x: this.maskBg.width * n + this.loadPg.x }, 500, egret.Ease.sineOut);
        egret.Tween.get(this.ip).to({ x: this.maskBg.width * n }, 500, egret.Ease.sineOut);
    }

    private drawText() {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.text = 'loading ...';
        this.textField.width = this.sW;
        this.textField.y = this.sH - 100;
        this.textField.size = 24;
        this.textField.textColor = 0xf9924d;
        this.textField.textAlign = "center";
    }

    public setProgress(current, total): void {
        // this.textField.text = Math.ceil(current / total * 100) + '%';
        this.applyIpsAni((current / total));
        // console.log((current / total));
        // this.drawLine(Math.ceil(current / total * this.sW * 0.5) + this.sW * 0.25);
    }

    // 雪花
    // private createSnow(): void {
    //     let snowParticle = new particle.GravityParticleSystem(RES.getRes("snow_png"), RES.getRes("snow_json"));
    //     this.addChild(snowParticle);
    //     snowParticle.start();
    // }

    // 漂落的圆
    private createCircleSnow(): void {
        let snowParticle = new particle.GravityParticleSystem(RES.getRes("circle_png"), RES.getRes("snow_json"));
        snowParticle['startSize'] = 30;
        this.addChild(snowParticle);
        snowParticle.start();
    }

}