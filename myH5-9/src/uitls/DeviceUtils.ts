
/**
 * 
 * 设备判别
 */
class DeviceUtils extends BaseClass {
    public constructor(){
        super();
    }

    /**
     * 判别是不是微信内置浏览器
     */
    public static isWeixin():boolean {
        let ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) && (ua.match(/MicroMessenger/i)[0] == "micromessenger")){
            return true;
        } else {
            return false;
        }
    }
}