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

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
/*
Titanium.App.addEventListener('open', function (e) {
    Ti.API.info('app.js: Open event on '+Ti.Platform.osname);
}); 
    
Titanium.App.addEventListener('close', function (e) {
    Ti.API.info('app.js: Close event on '+Ti.Platform.osname);
});     
Titanium.App.addEventListener('pause', function (e) {
    Ti.API.info('app.js: Pause event on '+Ti.Platform.osname);
});
*/     
Titanium.App.addEventListener('resume', function (e) {
//    Ti.API.info('app.js: Resume event on '+Ti.Platform.osname);
//    showAd();
});


var myChess = {};    // 'myChess' is the app's namespace
myChess.f = {};
myChess.form = {};
myChess.sound = {};
myChess.isSound == false;
myChess.flip = false;

myChess.Flurry = require('com.inzori.flurrymodule');
myChess.Flurry.startSession('CJNBB57VN4D34KTXCSVH');

myChess.Flurry.reportOnClose(false);
myChess.Flurry.reportOnPause( false);
myChess.Flurry.secureTransport(false);
myChess.Flurry.logUncaughtExceptions(true);

var ChessPuzzle = {};    // 'myChess' is the app's namespace
var ConstantClass = require('ui/common/challenge/Constant');
ChessPuzzle.Constant = new ConstantClass();

var EngineClass = require('ui/common/challenge/Engine');
var engineObj = new EngineClass();

//engineObj.ResetGame();
ChessPuzzle.Engine  = engineObj;


// This is a single context application with mutliple windows in a stack
(function() {
	Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_AMBIENT;
	
	var count = 0;

	myChess.sound.play = Titanium.Media.createSound({url:'/sound/chesspiece.mp3'});
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
		
		myChess.width = width;
		myChess.height = height;
		
		myChess.refresh = false;

		
		var pdata = loadPlayers();
//	Ti.API.info("loaded player:"+pdata.players.length);		
		if(pdata){
			myChess.Players = pdata.players;
			var len = myChess.Players.length;
//			Ti.API.info("lll:"+len);			
			myChess.Games = new Array(len);
						
			for(pi=0;pi<len;pi++){
				myChess.Games[pi] = loadGames(myChess.Players[pi][6]);
			}			
//			Ti.API.info("ggg:"+myChess.Games.length);			
		}
	
		myChess.PlayerIndex = 0;

		

		
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
//	myChess.Flurry.logEvent('open:'+isTablet?'iPad':'iPhone'); 
	
	if (isTablet) {
		
		ChessPuzzle.FontSize = 18;
		
		if(myChess.width<myChess.height){
			var s = myChess.width;
			myChess.width = myChess.height;
			myChess.height = s;
		}
		
		var boardSize = myChess.width*6/11;
		myChess.boardSize = (Math.floor(boardSize/9))*9;
		ChessObj = require('/ui/common/ChessObject');
		new ChessObj();
 
				
		var Window = require('ui/tablet/ApplicationWindow');
	
		(new Window()).open({fullscreen:false});
		
//		Ti.UI.iPhone.setStatusBarStyle(Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK);
	}
	else {
		if(myChess.height<myChess.width){
			var s = myChess.height;
			myChess.height = myChess.width;
			myChess.width = s;
		}
		
		ChessPuzzle.FontSize = 12;
		
		boardSize = myChess.width;
		myChess.boardSize = (Math.floor(boardSize/9))*9+9;
			
		ChessObj = require('/ui/common/ChessObject');
		new ChessObj();

/*				
for(pi=15;pi<myChess.Players.length;pi++){
	myChess.PlayerIndex = pi;
	Ti.API.info("<"+pi+">");
	myChess.f.validPiecesStatus();  	
}		
*/
		var ApplicationTabGroup = require('ui/handheld/ApplicationTabGroup');
		myChess.tabGroup = new ApplicationTabGroup();
		
		myChess.tabGroup.open();
		
	}


})();



function loadPlayers(){
	var data = null;
	
//Ti.API.info("Language: "+Ti.Locale.currentLanguage);	
	
//	var fileName = 'mydata/chess/Players_'+Ti.Locale.currentLanguage+'.json';
	var fileName = 'mydata/chess/Players.json';
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, fileName);
 
	if (file.exists()) {
  		var dataSrc = Ti.Platform.osname==='android'? ''+file.read():file.read();
//		Ti.API.info(dataSrc);
  		data = JSON.parse(dataSrc); 
  		
//  		Ti.API.info(data);
  		
  		
	}else{
		Ti.API.info("players info not existed:");
	}
	
	return data;
	
	
}

function loadGames(fileName){

	var data = null;
	fileName = "mydata/chess/"+fileName+".json";
//Ti.API.info("file:"+fileName);	
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, fileName);
 
	if (file.exists()) {
  		var dataSrc = Ti.Platform.osname==='android'? ''+file.read():file.read();
//  		Ti.API.info(dataSrc);
  		data = JSON.parse(dataSrc); 
  		  		
	}	
	return data;	
}

