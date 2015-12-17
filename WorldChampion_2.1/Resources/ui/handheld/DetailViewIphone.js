function DetailView(width, height) {
	
	var GameView = require('ui/handheld/GameViewIphone');

//Ti.API.info("required");
	var self = Ti.UI.createView({
		width:width,
		height:height
		});

		
	
	var gameView = new GameView(width, height-10);
	
	self.add(gameView);
	self.gv = gameView;
//	self.add(introView);

	var listButton = Ti.UI.createButton({
		width:65,
		height:45,
		top:2,
		left:5,
		backgroundImage:null
	})
	
	listButton.addEventListener('click',function(){
		
//		myChess.refresh = false;
		myChess.chessObj.playModeInProgress = false;
   	    gameView.control.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/chessControlPlay.png";
		myChess.tabGroup.fireEvent('showMaster');
	})
	
	self.add(listButton);

	
	self.addEventListener('opengame', function(e) {
		Ti.API.log("fire detail "+myChess.chessObj.gameIndex);
//		self.title.text = myChess.Games[e.game][0]+' vs '+myChess.Games[e.game][1];
//		self.fireEvent('hideIntro',e);
		gameView.fireEvent('openAgame');		

//		self.board.reload();
	});

	

	
//	self.fireEvent('opengame',{game:0});
	
	return self;
};

module.exports = DetailView;
