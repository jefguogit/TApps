// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


var EngineClass = require('ui/common/engine/Engine');
var engineObj = new EngineClass();

var myChess={};

var JDBClass = require('ui/common/object/JDB');
myChess.JDBR = new JDBClass('ttrecord.json');
myChess.JDBA = new JDBClass('ttarchive.json');

Ti.API.info("JDB --- "+myChess.JDBR+"  "+myChess.JDBA);

var ChessPuzzle = {}; 
var ConstantClass = require('ui/common/engine/Constant');
ChessPuzzle.Constant = new ConstantClass();

ChessPuzzle.Engine = engineObj;

ChessPuzzle.GridSize=36;
ChessPuzzle.FontSize=14;



myChess.f={};

myChess.height = Ti.Platform.displayCaps.platformHeight;
myChess.width = Ti.Platform.displayCaps.platformWidth;

if (Ti.Platform.osname == 'ipad') {		
	myChess.device = 'iPad';	
	if(myChess.width<myChess.height){
		var s = myChess.width;
		myChess.width = myChess.height;
		myChess.height = s;
	}		
}else {
	if(myChess.height<myChess.width){
		var s = myChess.height;
		myChess.height = myChess.width;
		myChess.width = s;
	}
	if(myChess.height>myChess.width*1.5){
		myChess.device = 'iPhone5';
	}else{
		myChess.device = 'iPhone4';
	}	
}	

Ti.API.info(myChess.device+"  "+myChess.width+"  "+myChess.height);

myChess.gamekit = require('com.obigola.gamekit');
myChess.gamekit.initGameCenter();

/*
var pdata = loadPlayers();
Ti.API.info("loaded player:"+pdata.players.length);		

	myChess.Players = pdata.players;
	var len = myChess.Players.length;
//			Ti.API.info("lll:"+len);			
	myChess.Games = new Array(len);
				
	for(pi=0;pi<len;pi++){
//		myChess.Games[pi] = loadGames(myChess.Players[pi][6]);
		myChess.Games[pi] = loadNewGames(pi);
//		Ti.API.info("GAME=="+myChess.Games[pi]);
	}			
//			Ti.API.info("ggg:"+myChess.Games.length);	


*/
        
        
ChessObj = require('/ui/common/object/ChessObject');
new ChessObj();

myChess.record = createRecord();
/*
myChess.year=1894;
myChess.gameIndex = 2;
myChess.chessObj.game = myChess.games['y'+myChess.year][myChess.gameIndex];
*/

// create tab group
var tabGroup = Titanium.UI.createTabGroup({top:20});


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff',
    tabBarHidden:true,
    navBarHidden:true
});

var Menu = require('ui/common/Menu');
var menuView = new Menu();
win1.add(menuView);
myChess.menu = menuView;

//startView.openYear(1860);


var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

//win1.add(label1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff',
    tabBarHidden:true,
    navBarHidden:true
});

var Game = require('ui/common/Game');
var gameView = new Game();
myChess.gameView = gameView;
win2.add(gameView.mview);

var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

//win2.add(label2);

var win3 = Titanium.UI.createWindow({  
    title:'Tab 3',
    backgroundColor:'#fff',
    tabBarHidden:true,
    navBarHidden:true
});

var Help = require('ui/common/Help');
var help = new Help();
win3.add(help);

var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 3',
    window:win3
});


var win4 = Titanium.UI.createWindow({  
    title:'Tab 3',
    backgroundColor:'#fff',
    tabBarHidden:true,
    navBarHidden:true
});

var Setting = require('ui/common/Setting');
var setting = new Setting();
win4.add(setting);

var tab4 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 4',
    window:win4
});

var win5 = Titanium.UI.createWindow({  
    title:'Tab 5',
    backgroundColor:'#fff',
    tabBarHidden:true,
    navBarHidden:true
});

var Replay = require('ui/common/Replay');
var rply = new Replay();
win5.add(rply);
myChess.Replay = rply;

var tab5 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 5',
    window:win5
});
//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3); 
tabGroup.addTab(tab4); 
tabGroup.addTab(tab5);

myChess.tabGroup = tabGroup;
// open tab group
tabGroup.open();



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


function loadNewGames(){

	var data = null;
	fileName = "mydata/gamesbyyear.json";
Ti.API.info("file:"+fileName);	
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, fileName);
 
	if (file.exists()) {
  		var dataSrc = Ti.Platform.osname==='android'? ''+file.read():file.read();
//  		Ti.API.info(dataSrc);
  		data = JSON.parse(dataSrc); 
  		  		
	}else{
		Ti.API.error("file not existed."+fileName);
	}	
	return data;	
}

function loadNGames(){

	var data = null;
	var fileName = "mydata/chess/ngames.json";
Ti.API.info("file:"+fileName);	
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, fileName);
 
	if (file.exists()) {
  		var dataSrc = Ti.Platform.osname==='android'? ''+file.read():file.read();
//  		Ti.API.info(dataSrc);
  		data = JSON.parse(dataSrc); 
  		  		
	}else{
		Ti.API.error("file not existed."+fileName);
	}	
	
//	myChess.games = data;
		
	return data;	
}

function createRecord(){
	myChess.games = loadNGames();
	
	var filename = 'ttrecord.json';
Ti.API.info("TTR:"+myChess.JDBR.filename);	
	myChess.JDBR.loadFile();
	var robj = myChess.JDBR.jobj;
Ti.API.info("ROBJ..."+robj.iter);	
	if(robj.iter==0){				
		for(var y=1900; y<2000; y++){	
			var games = myChess.games['y'+y];
  			if(games && games.length>0){
  				robj['y'+y] = new Array();
				robj['g'+y] = new Array();
  				for(var gi=0; gi<games.length;gi++){
  					robj['y'+y].push(gi);
  					robj['g'+y].push(gi);
  				}
  			}
  		}	
  		robj.iter = 1901;
  		robj['o1901'] = 1;
  		myChess.JDBR.saveFile(robj);	
  	}			
  							
	return robj;
}

function boardST(agame){

	var fen = agame.End;
		
	if(!fen){
		Ti.API.info("Skip>>>> fen fail:"+agame.Gid);
		return false;
	}
		
	try{
		ChessPuzzle.Engine.ResetGame();
		var result = ChessPuzzle.Engine.InitializeFromFen(fen);
		if(result){
			Ti.API.info("Skip  "+agame.Gid+"   "+result);
			return false;
		}		
		
		Ti.API.info(agame.Gid+":"+agame.Year);
	}catch(e){
		Ti.API.info("ERRO  "+agame.Gid+":"+agame.Year);
	}		

	return true;
}		
	
