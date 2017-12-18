/**
 * Created by yangsong on 2014/11/22.
 */
class App {

    /**
     * Effect工具类
     */
    public static get EffectUtils(): EffectUtils {
        return EffectUtils.getInstance();
    }

    /**
     * Data工具类
     */
    public static get GetDataUtils(): GetDataUtils {
        return GetDataUtils.getInstance();
    }

    /**
     * 设备工具类
     */
    public static get DeviceUtils(): DeviceUtils {
        return DeviceUtils.getInstance();
    }

    /**
     * 初始化函数
     * @constructor
     */
    public static Init(): void {

    }
}
