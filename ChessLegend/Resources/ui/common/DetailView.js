function DetailView(width, height) {
	
	var GameView = require('ui/common/GameView');
	var IntroView = require('ui/common/IntroView');
//Ti.API.info("required");
	var self = Ti.UI.createView({
		width:width,
		height:height,
//		babackgroundImage:Ti.Filesystem.resourcesDirectory+'mydata/icon/chessback.png'
		});

		
	
	var gameView = new GameView(width, height-10);
	
//	var introView = new IntroView(width, height-10);
	

	

	self.add(gameView);
//	self.add(introView);
	
	self.addEventListener('opengame', function(e) {
		Ti.API.log("fire detail"+e.game);
//		self.title.text = myChess.Games[e.game][0]+' vs '+myChess.Games[e.game][1];
		self.fireEvent('hideIntro',e);
		gameView.fireEvent('openAgame',e);		

//		self.board.reload();
	});

	

	
//	self.fireEvent('opengame',{game:0});
	
	return self;
};

module.exports = DetailView;
