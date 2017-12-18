

/**
* 设备判断
*/
class DeviceUtils extends BaseClass {
    /**
     * 构造函数
     */
    public constructor() {
        super();
    }

    public isWeixin(): boolean {
        let ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) && (ua.match(/MicroMessenger/i)[0] == "micromessenger")) {
            return true;
        } else {
            return false;
        }
    }
}