Titanium.Flurry = Ti.Flurry = require('com.inzori.flurrymodule');

Ti.Flurry.setAppCircleEnabled();
Ti.Flurry.startSession('YOURKEYHERE');

Ti.Flurry.reportOnClose(false);
Ti.Flurry.reportOnPause( false);
Ti.Flurry.secureTransport(false);
Ti.Flurry.logUncaughtExceptions(true);

Ti.Flurry.setAge( 0);
Ti.Flurry.setUserID( 'nothing' );
Ti.Flurry.setGender( 'm');

// open a single window
var win = Ti.UI.createWindow({
	backgroundColor:'black'
});

// create view where banner will be placed
var appCircleBanner = Ti.Flurry.createView({
  top:0,left:0
});

win.add(appCircleBanner);

btnTakeover = Ti.UI.createButton({
	bottom: 30,
	left:10,
	height: 30,
	width: 100,
	title: 'Takeover'	
});
btnTakeover.addEventListener('click',function(){
	appCircleBanner.setTakeover('STORE_APP_RECOMMEND_TAKEOVER');	
});

btnCanvas = Ti.UI.createButton({
	bottom: 30,
	right:10,
	height: 30,
	width: 100,
	title: 'Canvas'	
});
btnCanvas.addEventListener('click',function(){
	appCircleBanner.setCanvas('STORE_APP_RECOMMEND_CANVAS');	
});

win.add(btnTakeover);
win.add(btnCanvas);
win.open();

// refresh the banner each 10 seconds.
setTimeout(function(){
	appCircleBanner.setHook('STORE_APP_RECOMMEND_BANNER');
	setInterval(function(){
		appCircleBanner.setHook('STORE_APP_RECOMMEND_BANNER');
		
	},10000);	
},1000);

