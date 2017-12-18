var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
        this.isThemeLoadEnd = false;
        this.isResourceLoadEnd = false;
        this.btnAniStat = false;
        // 全局音乐部分
        this.bgSound = null;
        this.bgSoundChannel = null;
        /**
         * 音乐开关状态
         */
        this.isPlay = true;
    }
    var d = __define,c=Main,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");
    };
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    p.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        this.createScene();
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        var _this = this;
        if (event.groupName == "preload") {
            App.EffectUtils.fadeOut(this.loadingView, 300, 0, function () { _this.stage.removeChild(_this.loadingView); });
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
        else if (event.groupName == 'loading') {
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);
            RES.loadGroup("preload");
        }
    };
    p.createScene = function () {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.startCreateScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    p.onResourceLoadError = function (event) {
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
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    //
    /**
     * 创建游戏场景
     * By zhangyanxiang Time 2016-12-13 15:34:02
     */
    p.startCreateScene = function () {
        // 机型判断
        if (!egret.Capabilities.isMobile) {
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
        var scene = new Scene();
        this.addChild(scene);
        // this.createSnow();
        this.createCircleSnow();
        // 播放音乐
        this.createMusic();
    };
    // 场景结束
    /**
     * 全局飘雪花
     */
    p.createSnow = function () {
        var snowParticle = new particle.GravityParticleSystem(RES.getRes("snow_png"), RES.getRes("snow_json"));
        this.addChild(snowParticle);
        snowParticle.start();
    };
    // 漂落的圆
    p.createCircleSnow = function () {
        var snowParticle = new particle.GravityParticleSystem(RES.getRes("circle_png"), RES.getRes("snow_json"));
        snowParticle['startSize'] = 30;
        this.addChild(snowParticle);
        snowParticle.start();
    };
    p.createMusic = function () {
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
        this.playBgSound(musicIcon);
    };
    p.onMusicIconHandle = function (e) {
        var obj = e.target;
        if (this.isPlay) {
            egret.Tween.removeTweens(obj);
            // obj.texture = RES.getRes("p0_music_gray_png");
            // this.bgSoundChannel.stop();
            this.pauseMusic();
            this.isPlay = false;
        }
        else {
            // obj.texture = RES.getRes("p0_music_png");
            egret.Tween.get(obj, { loop: true }).to({ rotation: obj.rotation + 360 }, 5000);
            // this.bgSoundChannel = this.bgSound.play(this.bgSoundChannel.position, -1);
            this.playMusic();
            this.isPlay = true;
        }
    };
    /**
     * 背景音乐
     */
    p.playBgSound = function (obj) {
        this.playMusic();
        // if (App.DeviceUtils.isWeixin) {
        //     let media = document.getElementById("musicBox") as HTMLAudioElement;
        //     if (!media.src) {
        //         media.src = "resource/assets/sound/bgm.mp3";
        //         media.play();
        //     }
        //     return;
        // }
        // this.bgSound = RES.getRes("bgm_mp3");
        // this.bgSoundChannel = this.bgSound.play(0, -1);
    };
    /**
     * play
     */
    p.playMusic = function () {
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
    p.pauseMusic = function () {
        var media = document.getElementById("musicBox");
        media.pause();
    };
    return Main;
}(eui.UILayer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map