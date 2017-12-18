/**
 * Created by yangsong on 2014/11/22.
 */
var App = (function () {
    function App() {
    }
    var d = __define,c=App,p=c.prototype;
    d(App, "EffectUtils"
        /**
         * Effect工具类
         */
        ,function () {
            return EffectUtils.getInstance();
        }
    );
    d(App, "GetDataUtils"
        /**
         * Data工具类
         */
        ,function () {
            return GetDataUtils.getInstance();
        }
    );
    d(App, "DeviceUtils"
        /**
         * 设备工具类
         */
        ,function () {
            return DeviceUtils.getInstance();
        }
    );
    /**
     * 初始化函数
     * @constructor
     */
    App.Init = function () {
    };
    return App;
}());
egret.registerClass(App,'App');
//# sourceMappingURL=App.js.map