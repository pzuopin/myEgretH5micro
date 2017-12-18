/**
 * 各种效果工具类
 */
var EffectUtils = (function (_super) {
    __extends(EffectUtils, _super);
    /**
     * 构造函数
     */
    function EffectUtils() {
        _super.call(this);
    }
    var d = __define,c=EffectUtils,p=c.prototype;
    /**
     * 类似mac上图标上下抖动的效果
     * @param obj 要抖动的对象，使用
     * @param initY 要抖动的对象的初始Y值，原始位置
     * @example eval(App.EffectUtils.macIconShake("this.tree", 0, false, [[0, 300]], 200));
     * @returns {string} 返回的是一个要执行代码的字符串，通过eval执行
     * @loop 循环 optionArr 自定义配置 waitTime 等待时间
     * @Fx 2016-12-15
     */
    p.macIconShake = function (obj, initY, loop, optionArr, waitTime) {
        if (loop === void 0) { loop = false; }
        if (optionArr === void 0) { optionArr = []; }
        if (waitTime === void 0) { waitTime = 0; }
        //抖动频率[时间，移动距离]，可修改
        var arr = [
            [20, 300],
            [15, 300],
            [10, 300],
            [5, 300]
        ];
        if (optionArr.length)
            arr = optionArr;
        var str = "egret.Tween.get(" + obj + ", {loop: " + loop + "}).wait(" + waitTime + ")";
        for (var i = 0, len = arr.length; i < len; i++) {
            str += ".to({'anchorOffsetY':" + initY + "-" + arr[i][0] + "}, " + arr[i][1] + ")";
            str += ".to({'anchorOffsetY':" + initY + "}, " + arr[i][1] + ")";
        }
        str += ";";
        return str;
    };
    /**
     * 开始闪烁
     * @param obj
     */
    p.startFlicker = function (obj, alphaTime) {
        obj.alpha = 1;
        egret.Tween.get(obj).to({ "alpha": 0 }, alphaTime).to({ "alpha": 1 }, alphaTime).call(this.startFlicker, this, [obj]);
    };
    /**
     * 停止闪烁
     * @param obj
     */
    p.stopFlicker = function (obj) {
        egret.Tween.removeTweens(obj);
    };
    /**
      *  动画函数 fadeIn fx
      */
    p.fadeIn = function (el, dt, waitTime, cb) {
        if (waitTime === void 0) { waitTime = 0; }
        var myTween = egret.Tween.get(el).wait(waitTime).to({
            alpha: 1
        }, dt, egret.Ease.sineIn);
        cb && myTween.call(cb);
    };
    /**
     *  动画函数 fadeOut fx
     */
    p.fadeOut = function (el, dt, waitTime, cb) {
        if (waitTime === void 0) { waitTime = 0; }
        var myTween = egret.Tween.get(el).wait(waitTime).to({
            alpha: 0
        }, dt, egret.Ease.circOut);
        cb && myTween.call(cb);
    };
    /**
     * 中心弹出 zoomInBig
     */
    p.zoomInBig = function (el, dt, cb) {
        var myTween = egret.Tween.get(el).to({ scaleX: 1, scaleY: 1 }, dt, egret.Ease.backOut);
        cb && myTween.call(cb);
    };
    /**
     * 对象闪烁特效
     *@param obj 闪烁对象
     *@alpha 最小亮度
     *@param interval 闪烁总工时间
     *@param delay 延迟时间
     */
    p.blinkEffect = function (obj, alpha, time, delay) {
        if (alpha === void 0) { alpha = 0; }
        if (time === void 0) { time = 500; }
        if (delay === void 0) { delay = 100; }
        egret.Tween.get(obj, { loop: true }).to({ alpha: alpha }, time, egret.Ease.sineOut)
            .to({ alpha: 1 }, time, egret.Ease.sineIn).wait(delay);
    };
    return EffectUtils;
}(BaseClass));
egret.registerClass(EffectUtils,'EffectUtils');
//# sourceMappingURL=EffectUtils.js.map