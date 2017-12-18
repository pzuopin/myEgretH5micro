/**
* 设备判断
*/
var DeviceUtils = (function (_super) {
    __extends(DeviceUtils, _super);
    /**
     * 构造函数
     */
    function DeviceUtils() {
        _super.call(this);
    }
    var d = __define,c=DeviceUtils,p=c.prototype;
    p.isWeixin = function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) && (ua.match(/MicroMessenger/i)[0] == "micromessenger")) {
            return true;
        }
        else {
            return false;
        }
    };
    return DeviceUtils;
}(BaseClass));
egret.registerClass(DeviceUtils,'DeviceUtils');
//# sourceMappingURL=DeviceUtils.js.map