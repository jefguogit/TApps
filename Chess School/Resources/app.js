/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */



Titanium.App.addEventListener('resume', function (e) {
/*	
	Ti.API.info("RESUME:"+myTest.showAd+"    "+myTest.revmob);
	if(myTest.showAd){
		if(!myTest.revmob){
			myTest.revmob = require('com.revmob.titanium');
			myTest.revmob.startSession("51d83f210780b851070000e9");
		}	
		myTest.revmob.showFullscreen();
	}
*/		
	myTest.count = 5;
	
});


var myTest = {};


myTest.Flurry = require('com.inzori.flurrymodule');
myTest.Flurry.startSession('M56TN2PK8MZDKSNC7Y96');

myTest.Flurry.reportOnClose(false);
myTest.Flurry.reportOnPause( false);
myTest.Flurry.secureTransport(false);
myTest.Flurry.logUncaughtExceptions(true);



myTest.showAd = true;
if(Ti.App.Properties.getBool('Purchased-NoAd', false) == true){
	myTest.showAd = false;
};

if(myTest.showAd){
	myTest.revmob = require('com.revmob.titanium');
	myTest.revmob.startSession("51d83f210780b851070000e9");
	myTest.revmob.printEnvironmentInformation();
}


if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
	myTest.network = false;
}else{
	myTest.network = true;
}	

myTest.count = 0;

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version;
	myTest.height = Ti.Platform.displayCaps.platformHeight-20;
	myTest.width = Ti.Platform.displayCaps.platformWidth;
	myTest.bmagin = 50;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	if (isTablet) {
		var Window = require('ui/tablet/ListWindow');
		var MenuWindow = require('ui/tablet/MenuWindow');	
	}else{
		var Window = require('ui/handheld/ListWindow');
		var MenuWindow = require('ui/handheld/MenuWindow');	
	}	

	Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_AMBIENT;


	var ApplicationWin = require('ui/common/ApplicationWindow');
	
	new ApplicationWin(MenuWindow, Window).open();
})();
