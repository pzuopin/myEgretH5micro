/**
 * 各种效果工具类
 */
class EffectUtils extends BaseClass {
    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    /**
     * 类似mac上图标上下抖动的效果
     * @param obj 要抖动的对象，使用
     * @param initY 要抖动的对象的初始Y值，原始位置
     * @example eval(App.EffectUtils.macIconShake("this.tree", 0, false, [[0, 300]], 200));
     * @returns {string} 返回的是一个要执行代码的字符串，通过eval执行
     * @loop 循环 optionArr 自定义配置 waitTime 等待时间
     * @Fx 2016-12-15
     */
    public macIconShake(obj: string, initY: number, loop: boolean = false, optionArr: any[] = [], waitTime: number = 0): string {
        //抖动频率[时间，移动距离]，可修改
        var arr: Array<any> = [
            [20, 300],
            [15, 300],
            [10, 300],
            [5, 300]
        ];
        if (optionArr.length) arr = optionArr;
        var str: string = "egret.Tween.get(" + obj + ", {loop: " + loop + "}).wait(" + waitTime + ")";
        for (var i: number = 0, len: number = arr.length; i < len; i++) {
            str += ".to({'anchorOffsetY':" + initY + "-" + arr[i][0] + "}, " + arr[i][1] + ")";
            str += ".to({'anchorOffsetY':" + initY + "}, " + arr[i][1] + ")";
        }
        str += ";";
        return str;
    }

    /**
     * 开始闪烁
     * @param obj
     */
    public startFlicker(obj: egret.DisplayObject, alphaTime: number): void {
        obj.alpha = 1;
        egret.Tween.get(obj).to({ "alpha": 0 }, alphaTime).to({ "alpha": 1 }, alphaTime).call(this.startFlicker, this, [obj]);
    }

    /**
     * 停止闪烁
     * @param obj
     */
    public stopFlicker(obj: egret.DisplayObject): void {
        egret.Tween.removeTweens(obj);
    }

    /**
      *  动画函数 fadeIn fx
      */
    public fadeIn(el: any, dt: number, waitTime: number = 0, cb?: Function): void {
        var myTween = egret.Tween.get(el).wait(waitTime).to({
            alpha: 1
        }, dt, egret.Ease.sineIn);
        cb && myTween.call(cb);
    }

    /**
     *  动画函数 fadeOut fx
     */
    public fadeOut(el: any, dt: number, waitTime: number = 0, cb?: Function): void {
        var myTween = egret.Tween.get(el).wait(waitTime).to({
            alpha: 0
        }, dt, egret.Ease.circOut);
        cb && myTween.call(cb);
    }

    /**
     * 中心弹出 zoomInBig
     */

    public zoomInBig(el: any, dt: number, cb?: Function): void {
        var myTween = egret.Tween.get(el).to({ scaleX: 1, scaleY: 1 }, dt, egret.Ease.backOut);
        cb && myTween.call(cb);
    }

    /**
     * 对象闪烁特效
     *@param obj 闪烁对象
     *@alpha 最小亮度
     *@param interval 闪烁总工时间
     *@param delay 延迟时间
     */

    public blinkEffect(obj, alpha: number = 0, time: number = 500, delay: number = 100): void {
        egret.Tween.get(obj, { loop: true }).to({ alpha: alpha }, time, egret.Ease.sineOut)
            .to({ alpha: 1 }, time, egret.Ease.sineIn).wait(delay);
    }

    // 2016-12-15 19:23:57
}
