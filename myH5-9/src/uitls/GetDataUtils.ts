class GetDataUtils extends BaseClass {

    public  constructor(){
        super();
    }

    /**
     * 获取网址参数
     */
    public getQueryName(name:string):any{
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }

    /** 
     * 随机数范围[min,max) 
     */
    public rdNum(Min: number, Max: number): number {
        var range = Max - Min;
        var rand = Math.random();
        var num = Min + Math.floor(rand * range);
        return num;
    }
}