var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GetDataUtils = (function (_super) {
    __extends(GetDataUtils, _super);
    function GetDataUtils() {
        return _super.call(this) || this;
    }
    /**
     * 获取网址参数
     */
    GetDataUtils.prototype.getQueryName = function (name) {
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
    GetDataUtils.prototype.rdNum = function (Min, Max) {
        var range = Max - Min;
        var rand = Math.random();
        var num = Min + Math.floor(rand * range);
        return num;
    };
    return GetDataUtils;
}(BaseClass));
__reflect(GetDataUtils.prototype, "GetDataUtils");
//# sourceMappingURL=GetDataUtils.js.map