var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    GameData.init = function () {
        // this.stageH = egret.MainContext.instance.stage.stageHeight;
    };
    GameData.stageW = 0;
    GameData.stageH = 0;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map