var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.sW = egret.MainContext.instance.stage.stageWidth;
        this.sH = egret.MainContext.instance.stage.stageHeight;
        // this.addEventListener(eui.UIEvent.COMPLETE, this.loadProgress, this);
        this.skinName = RES.getRes("LoadingUISkin_exml");
        // this.createSnow();
        this.createCircleSnow();
        this.loadProgress();
        // this.drawText();
    }
    var d = __define,c=LoadingUI,p=c.prototype;
    // loadProgress
    p.loadProgress = function () {
        this.maskBg = new eui.Rect(this.loadPg.width, this.loadPg.height, 0xffffff);
        this.addChild(this.maskBg);
        this.maskBg.x = this.loadPg.x;
        this.maskBg.y = this.loadPg.y;
        this.loadPg.mask = this.maskBg; // 等号后面是形状 即阴影面积区
    };
    p.applyIpsAni = function (n) {
        egret.Tween.removeTweens(this.maskBg);
        egret.Tween.removeTweens(this.ip);
        egret.Tween.get(this.maskBg).to({ x: this.maskBg.width * n + this.loadPg.x }, 500, egret.Ease.sineOut);
        egret.Tween.get(this.ip).to({ x: this.maskBg.width * n }, 500, egret.Ease.sineOut);
    };
    p.drawText = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.text = 'loading ...';
        this.textField.width = this.sW;
        this.textField.y = this.sH - 100;
        this.textField.size = 24;
        this.textField.textColor = 0xf9924d;
        this.textField.textAlign = "center";
    };
    p.setProgress = function (current, total) {
        // this.textField.text = Math.ceil(current / total * 100) + '%';
        this.applyIpsAni((current / total));
        // console.log((current / total));
        // this.drawLine(Math.ceil(current / total * this.sW * 0.5) + this.sW * 0.25);
    };
    // 雪花
    // private createSnow(): void {
    //     let snowParticle = new particle.GravityParticleSystem(RES.getRes("snow_png"), RES.getRes("snow_json"));
    //     this.addChild(snowParticle);
    //     snowParticle.start();
    // }
    // 漂落的圆
    p.createCircleSnow = function () {
        var snowParticle = new particle.GravityParticleSystem(RES.getRes("circle_png"), RES.getRes("snow_json"));
        snowParticle['startSize'] = 30;
        this.addChild(snowParticle);
        snowParticle.start();
    };
    return LoadingUI;
}(eui.Component));
egret.registerClass(LoadingUI,'LoadingUI');
//# sourceMappingURL=LoadingUI.js.map