class LoadingUI extends eui.Component {
    private loadPg:eui.Image;
    private ip:eui.Image;

    public constructor() {
        super();
        this.skinName = "LoadingUISkin";
    }
    public setProgress(current:number, total:number):void {
        this.ip.x = this.loadPg.width * current / total;
    }

    protected createChildren(){
        super.createChildren();
        this.createCircleSnow();
    }

    /**
     * 创建雪花
     */
    private createCircleSnow ():void {
        let snowParticle = new particle.GravityParticleSystem(RES.getRes("snow_png"), RES.getRes("snow_json"));
        this.addChild(snowParticle);
        snowParticle.start();
    }
}
