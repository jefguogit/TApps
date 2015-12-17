function startView() {

	var disptop = 0;
		var cpwidth = 50;
	
	var self = Ti.UI.createView({
//		backgroundColor:'blue',
		bottom:0,
		left:0,
		width:myChess.width,
		height:myChess.height-20,
//		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/ttb5.png'
//		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/ttnb.png'
	});
	
	var help = Ti.UI.createView({
		backgroundColor:'green'
	});
	var lhelp = Ti.UI.createLabel({
		text:'help',
		color:'#fff',
		width:'auto',
		height:'auto'
	});
	help.add(lhelp);
	
//	refreshGates();
	
	
	var scrollView = Titanium.UI.createScrollableView({
		views:[help],
//		showVerticalScrollIndicator:true,
		pagingControlHeight:30,
		maxZoomScale:2.0,
		currentPage:1
	});
	
	self.add(scrollView);
/*	
	scrollView.addView(new MenuView(1910, 'blue'));	
	scrollView.addView(new MenuView(1920, 'yellow'));
	scrollView.addView(new MenuView(1930, 'red'));
	scrollView.addView(new MenuView(1940, 'purple'));
	scrollView.addView(new MenuView(1950, 'black'));
	scrollView.addView(new MenuView(1960, 'grey'));
	scrollView.addView(new MenuView(1970, 'orange'));
	scrollView.addView(new MenuView(1980, 'pink'));
	scrollView.addView(new MenuView(1990, 'yellow'));
	scrollView.addView(new MenuView(2000, 'blue'));
	scrollView.addView(new MenuView(2010, 'brown'));
*/
    addMenu(scrollView);	
	
	var displayPanel = Ti.UI.createView({
		height:30,
		width:myChess.width,
//		bottom:glist.bottom+glist.height+6,
		left:0,
		top:disptop,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/displaybar.png"	
	});
	
	var starLabel = Ti.UI.createLabel({
		text:myChess.record.star,
		bottom:5,
		left:15,
		width:60,
		height:20,
		color:"blue",
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/starlabel.png",
		textAlign:"center"
	});
	
	var tokenLabel = Ti.UI.createLabel({
		text:myChess.record.token,
		bottom:5,
		right:5,
		width:80,
		height:20,
		color:"blue",
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/gemlabel.png",
		textAlign:"center",
	});	
	tokenLabel.addEventListener('click', function(){
		alert("add token");
		myChess.record.token += 10;
		myChess.JDBR.saveFile(myChess.record);	
					
		self.setStatus();
	});
		
	displayPanel.add(starLabel);
	displayPanel.add(tokenLabel);
	self.add(displayPanel);
	self.star = starLabel;
	self.token = tokenLabel;
	

/*		
	var ChessGate = require('ui/common/object/ChessGate');
	
	myChess.Gates = new Array();
	var i=0;
	for(var y=1900; y<2000; y++){	
  		if(myChess.record['y'+y]){	
			var cButton = new ChessGate(y,cbwidth);
			
			cButton.top=Math.floor(i/5)*cbwidth+cbwidth;
			cButton.left=cbwidth/4+(i%5)*cbwidth;
			cButton.pv = self;
			
			self.add(cButton);
			
			myChess.Gates['y'+y] = cButton;
			i++;
		}
	}		
*/

	var controlPanel = Ti.UI.createView({
		width:myChess.width,
		height:cpwidth,
		bottom:55,
		borderColor:'red',
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/controlbar.png"
	});
	
	var settingButton = Ti.UI.createButton({
		title:'setting',
		borderColor:'green',
		bottom:0,
		right:10,
		width:100,
		height:cpwidth
	});
	settingButton.addEventListener('click', function(){
		myChess.tabGroup.setActiveTab(3);
	});
		
	var instructionButton = Ti.UI.createButton({
		title:'?',
		borderColor:'green',
		bottom:0,
		right:110,
		width:100,
		height:cpwidth
	});
	instructionButton.addEventListener('click', function(){
		myChess.tabGroup.setActiveTab(2);
		myChess.archieve.refresh();
	});
	
	var leaderButton = Ti.UI.createButton({
		title:'leaderboard',
		borderColor:'green',
		bottom:0,
		width:100,
		right:210,
		height:cpwidth
	});
	
	leaderButton.addEventListener('click', function(){
//		myChess.tabGroup.setActiveTab(2);
	
		myChess.gamekit.showLeaderboard('SGT.chesstimetravel.stars');
	});
	

	
	controlPanel.add(settingButton);
	controlPanel.add(leaderButton);
	controlPanel.add(instructionButton);

	self.add(controlPanel);
	
	var transView = Ti.UI.createImageView({
		top:0,
		left:0,
		width:myChess.width,
		height:myChess.height/5,
		image:Ti.Filesystem.resourcesDirectory+"images/ltrans.png"
	});
			
//	self.add(transView);
//	self.transv = transView;

	var adView = Ti.UI.iOS.createAdView({
		 width: 'auto',
		 height: 50,
		 bottom:0
	});
	self.add(adView);
	if(myChess.device == 'iPhone4') {
		adView.bottom = -50;
	}	
	
	
	self.openYear = function(){
		var y = myChess.year+1;

		while(!myChess.record['y'+y]){
			y++;
		}
Ti.API.info("year:"+y);		
	
		if(myChess.record['o'+y]>0){
			return;
		}

		myChess.record.iter = y;
		Ti.API.info("Iterator:"+myChess.record.iter);
		myChess.JDBR.saveFile(myChess.record);
		

		
		refreshGates(y);
		
		myChess.Gates['y'+y].enabled  = true;
		myChess.Gates['y'+y].ly.text = y;
		myChess.Gates['y'+y].starback(0);
		
		myChess.record['o'+y] = 1;
		
		
		if(y<1920){
			var p = 100-(1920-y)*5;
			myChess.gamekit.submitAchievement('SGT.chesstimetravel.pawn',p);
		}else if(y<1940){
			var p = 100-(1940-y)*5;
			myChess.gamekit.submitAchievement('SGT.chesstimetravel.night',p);
		}
		

		
	};
	
	self.winGame = function(){
		var y = myChess.year;

		myChess.record.token += 5; 
		
		if(myChess.record['o'+y] < 6){
			myChess.record.star += 1;
			myChess.record['o'+y] += 1;
		}	
		var sn = myChess.record['o'+y] - 1;
		if(sn>0){
			myChess.Gates['y'+y].starback(sn);
//			myChess.Gates['y'+y].ls.color = '#000000';
		}

		myChess.JDBR.saveFile(myChess.record);	
					
		this.setStatus();		
		
		myChess.JDBA.saveAchieveData(y, "won", myChess.chessObj.game.Gid, myChess.NotationText, myChess.chessObj.game.End);

		
		myChess.gamekit.submitScore('SGT.chesstimetravel.stars', myChess.record.star);	
		this.openYear();		
	};
	
	self.failGame = function(){
		var y = myChess.year;
		myChess.record['y'+y].unshift(myChess.chessObj.gameIndex);
		
//		myChess.record.token += 1; 		

		myChess.JDBR.saveFile(myChess.record);
		this.setStatus();
		
		myChess.JDBA.saveAchieveData(y, "failed", myChess.chessObj.game.Gid, myChess.NotationText, myChess.chessObj.game.End);
	};
	
	self.setStatus = function(){
		this.token.text = myChess.record.token;
		this.star.text = myChess.record.star;
		
		
	};
	
	self.left = function(year){
	
		myChess.year = year;
		myChess.record.token += 1;
		myChess.gameView.setStatus();
		var iidx = year%3+1;
		//myChess.gameView.mview.backgroundImage = Ti.Filesystem.resourcesDirectory+'images/bk'+iidx+'.png';
				
		myChess.gameView.initAGame(year);
//				myChess.tabGroup.setActiveTab(tabid);

//			var TransView = require('ui/common/TransView');
//			var transv = new TransView();
//			self.add(transv);
		var transv = Ti.UI.createImageView({
			top:-4000,
			left:0,
			width:myChess.width,
			height:4000,
			image:Ti.Filesystem.resourcesDirectory+'images/trans.png'
		});
		self.add(transv);
		Ti.API.info('trans:'+transv);
					
		var slide_it_down = Titanium.UI.createAnimation();
		slide_it_down.top = -200; // to put it back to the left side of the window
		slide_it_down.duration = 600;
		slide_it_down.addEventListener('complete', function () {   		
    		myChess.tabGroup.setActiveTab(1);	
    		self.remove(transv);
			myChess.gameView.mview.control.think();
			myChess.gameView.board.oneMove();
			myChess.gameView.mview.control.play();
		});
		
		transv.animate(slide_it_down);
    };
		
	return self;
};

module.exports = startView;

function getGates(end){
	
	var ChessGate = require('ui/common/object/ChessGate');
	
	myChess.Gates = new Array();
	var gateList = new Array();
	
	var cbwidth = myChess.width/4;
	
	var grow = Ti.UI.createTableViewRow({
		height:this.cbwidth
	});
	
	var i=0;
	for(var y=1900; y<=end; y++){	

  		if(myChess.record['y'+y]){	
			var cButton = new ChessGate(y,cbwidth);
			
//				cButton.top=Math.floor(i/5)*cbwidth+cbwidth;
			cButton.top=0;
			cButton.left=(i%4)*cbwidth;
//				cButton.pv = self;
			
			grow.add(cButton);
			
			myChess.Gates['y'+y] = cButton;
			i++;
			
			if(y==end){
				gateList.push(grow);
			}else if(i%4==0){
				gateList.push(grow);
				grow = Ti.UI.createTableViewRow({height:this.cbwidth});
			}			
		}
	}
	
	grow = Ti.UI.createTableViewRow({height:this.cbwidth});
	gateList.push(grow);
	
	return gateList;		
}

function refreshGates(){
	var y = myChess.record.iter;
	
	var gdata = getGates(1920);
	
	if(y>1920 && y<1941){
		gdata = getGates(1940);
	}else if(y>1940 && y<1961){
		gdata = getGates(1960);
	}else if(y>1960 && y<1981){
		gdata = getGates(1980);
	}else if(y>1980 && y<1981){
		gdata = getGates(2000);
	}else if(y>2000){
		gdata = getGates(2014);
	}	
Ti.API.info("REF:"+y+"  "+gdata+"  >>"+myChess.gates);	
	myChess.gates = gdata;
}

function addMenu(sv){
	var y = myChess.record.iter;
	
	var MenuView = require('ui/common/MenuView');
	
	sv.addView(new MenuView(1900, 'blue'));	
	
	if(y>1910) sv.addView(new MenuView(1910, 'yellow'));
	if(y>1920) sv.addView(new MenuView(1920, 'red'));
	if(y>1930) sv.addView(new MenuView(1930, 'purple'));
	if(y>1940) sv.addView(new MenuView(1940, 'black'));
	if(y>1950) sv.addView(new MenuView(1950, 'grey'));
	if(y>1960) sv.addView(new MenuView(1960, 'orange'));
	if(y>1970) sv.addView(new MenuView(1970, 'pink'));
	if(y>1980) sv.addView(new MenuView(1980, 'yellow'));
	if(y>1990) sv.addView(new MenuView(1990, 'blue'));
	if(y>2000) sv.addView(new MenuView(2000, 'brown'));
}
