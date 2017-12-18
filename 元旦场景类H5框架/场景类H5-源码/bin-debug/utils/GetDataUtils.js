/**
 * 获取数据工具
 */
var GetDataUtils = (function (_super) {
    __extends(GetDataUtils, _super);
    /**
     * 构造函数
     */
    function GetDataUtils() {
        _super.call(this);
    }
    var d = __define,c=GetDataUtils,p=c.prototype;
    /**
     * 获取网址参数
     */
    p.getQueryName = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    };
    /**
     * 随机数范围[min,max)
     */
    p.rdNum = function (Min, Max) {
        var range = Max - Min;
        var rand = Math.random();
        var num = Min + Math.floor(rand * range);
        return num;
    };
    return GetDataUtils;
}(BaseClass));
egret.registerClass(GetDataUtils,'GetDataUtils');
//# sourceMappingURL=GetDataUtils.js.map