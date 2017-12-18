class Scene extends eui.Component {
    public constructor(){
        super();
        this.init();
    }

    protected createChildren(){
        super.createChildren();
    }

    private init(){
        this.addChild(new PageA())
    }
}