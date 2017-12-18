/**
 * 场景
 */

class Scene extends eui.Component {

    constructor() {
        super();
        this.init();
    }


    // 初始化场景
    private init(): void {
        let view: PageA = new PageA();
        this.addChild(view);        
    }    
}