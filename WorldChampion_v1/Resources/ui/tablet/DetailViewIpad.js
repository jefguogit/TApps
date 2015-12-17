function DetailView(width, height) {
	
	var GameView = require('ui/tablet/GameViewIpad');
	var IntroView = require('ui/tablet/IntroViewIpad');
//Ti.API.info("required");
	var self = Ti.UI.createView({
		width:width,
		height:height
		});

		
	
	var gameView = new GameView(width, height);
	gameView.addEventListener('backToList', function(){
		self.fireEvent('backToList');
	});
	
	var introView = new IntroView(width, height);
	

	self.add(gameView);
	self.add(introView);
	
	self.addEventListener('opengame', function(e) {
		Ti.API.log("fire detail"+e.game);
//		self.title.text = myChess.Games[e.game][0]+' vs '+myChess.Games[e.game][1];

		this.fireEvent('hideIntro',e);
		gameView.fireEvent('openAgame',e);		

//		self.board.reload();
	});

	self.addEventListener('hideIntro',function(e){
//		this.backgroundImage=Ti.Filesystem.resourcesDirectory+'images/gameback.png';
		introView.left=-2000;
		gameView.left=0;
		introView.fireEvent('clean',e);
	})
	
	self.addEventListener('showIntro',function(e){
		introView.fireEvent('refresh',e);
//		this.backgroundImage=Ti.Filesystem.resourcesDirectory+'mydata/icon/introback.png';		
		introView.left=0;
		gameView.left=-2000;		
	})

	
//	self.fireEvent('opengame',{game:0});
	
	return self;
};

module.exports = DetailView;
