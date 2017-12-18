/**
 * 场景
 */
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=Scene,p=c.prototype;
    // 初始化场景
    p.init = function () {
        var view = new PageA();
        this.addChild(view);
    };
    return Scene;
}(eui.Component));
egret.registerClass(Scene,'Scene');
//# sourceMappingURL=Scene.js.map