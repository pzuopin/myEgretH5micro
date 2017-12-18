class App {
    /**
     * Effect工具类
     */
    public static get EffectUtils():EffectUtils{
        return EffectUtils.getInstance();
    }

    /**
     * Data工具类
     */
    public static get GetDataUtils():GetDataUtils{
        return GetDataUtils.getInstance();
    }

    public static get DeviceUtils():DeviceUtils{
        return DeviceUtils.getInstance();
    }
}