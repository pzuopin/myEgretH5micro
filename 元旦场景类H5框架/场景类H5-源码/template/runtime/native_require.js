
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/particle/particle.js",
	"bin-debug/App.js",
	"bin-debug/base/BaseClass.js",
	"bin-debug/event/LEvent.js",
	"bin-debug/event/LListener.js",
	"bin-debug/loadUI/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/other/AssetAdapter.js",
	"bin-debug/other/ThemeAdapter.js",
	"bin-debug/page/PageBase.js",
	"bin-debug/page/PageA.js",
	"bin-debug/page/PageB.js",
	"bin-debug/page/PageC.js",
	"bin-debug/page/PageD.js",
	"bin-debug/page/PageE.js",
	"bin-debug/Scene.js",
	"bin-debug/utils/DeviceUtils.js",
	"bin-debug/utils/EffectUtils.js",
	"bin-debug/utils/GetDataUtils.js",
	"bin-debug/utils/UtilsClass/BitmapBlink.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "noBorder",
		contentWidth: 640,
		contentHeight: 1007,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:14,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};