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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isThemeLoadEnd = false;
        _this.isResourceLoadEnd = false;
        // 全局音乐部分
        _this.bgSound = null;
        _this.bgSoundChannel = null;
        /**
         * 音乐开关状态
         */
        _this.isPlay = true;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
    };
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    Main.prototype.onThemeLoadComplete = function () {
        // 确保loadingUISkin 皮肤加载完成
        RES.loadGroup("loading");
        this.isThemeLoadEnd = true;
        this.createScene();
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            // this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
        else if (event.groupName == "loading") {
            //Config loading process interface
            //设置加载进度界面
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);
            RES.loadGroup("preload");
        }
    };
    Main.prototype.createScene = function () {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.startCreateScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.startCreateScene = function () {
        var _this = this;
        // 机型判断 手机无边  电脑定大小
        if (!egret.Capabilities.isMobile) {
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
        this.addChild(new Scene());
        App.EffectUtils.fadeOut(this.loadingView, 300, 0, function () {
            if (_this.loadingView.parent) {
                _this.loadingView.parent.removeChild(_this.loadingView);
            }
        });
        this.createSnow();
        this.createCircleSnow();
        // 播放音乐
        this.createMusic();
    };
    /**
     * 全局飘雪花
     */
    Main.prototype.createSnow = function () {
        var snowParticle = new particle.GravityParticleSystem(RES.getRes("snow_png"), RES.getRes("snow_json"));
        this.addChild(snowParticle);
        snowParticle.start();
    };
    // 漂落的圆
    Main.prototype.createCircleSnow = function () {
        var snowParticle = new particle.GravityParticleSystem(RES.getRes("circle_png"), RES.getRes("snow_json"));
        snowParticle['startSize'] = 30;
        this.addChild(snowParticle);
        snowParticle.start();
    };
    Main.prototype.createMusic = function () {
        var musicIcon = new eui.Image();
        musicIcon.texture = RES.getRes("p0_music_png");
        musicIcon.anchorOffsetX = musicIcon.width >> 1;
        musicIcon.anchorOffsetY = musicIcon.height >> 1;
        musicIcon.x = 40 + musicIcon.width / 2;
        musicIcon.y = 40 + musicIcon.height / 2;
        musicIcon.alpha = 0.8;
        this.addChild(musicIcon);
        egret.Tween.get(musicIcon, { loop: true }).to({ rotation: 360 }, 5000);
        musicIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMusicIconHandle, this);
        this.playMusic();
    };
    Main.prototype.onMusicIconHandle = function (e) {
        var obj = e.target;
        if (this.isPlay) {
            egret.Tween.removeTweens(obj);
            this.pauseMusic();
            this.isPlay = false;
        }
        else {
            egret.Tween.get(obj, { loop: true }).to({ rotation: obj.rotation + 360 }, 5000);
            this.playMusic();
            this.isPlay = true;
        }
    };
    /**
     * play
     */
    Main.prototype.playMusic = function () {
        var media = document.getElementById("musicBox");
        if (!media.src) {
            media.src = "resource/assets/sound/bgm.mp3";
            media.loop = true;
            media.play();
        }
        else {
            media.play();
        }
    };
    /**
     * pause
     */
    Main.prototype.pauseMusic = function () {
        var media = document.getElementById("musicBox");
        media.pause();
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map