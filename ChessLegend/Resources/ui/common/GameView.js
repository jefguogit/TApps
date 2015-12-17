function GameView(width, height, notation) {
	
Ti.API.log("game view :"+width+"  "+height);

//	var games = myChess.Games;
//	game = games[0];
	var notationWidth = 150;
	var boardSize = width - notationWidth;	
	var gridSize = boardSize/9;
	var pieceSize = gridSize*2/3;
	
	var controlContainer = Ti.UI.createView({
		top:boardSize+20,
		left:10+notationWidth,
		bottom:2
	});

	var notationContainer  = Ti.UI.createView({
		top:30,
		left:10,
		width:notationWidth,
		height:height - 20
	});
	
	var NotationView = require('ui/tablet/NotationViewIpad');
	var notationView = new NotationView(notationWidth,height-22);
	notationView.addEventListener('moveToLine',function(e){
//Ti.API.info("fire nv moveTo:"+e.move);		
		var no = e.move;
		var moveIndex = no;
		var playerIndex = 0;
	
		moveForward();
	});
	notationContainer.add(notationView);
	
	
	var boardContainer = Ti.UI.createView({
		top:70,
		left:10+notationWidth,
		width:boardSize,
		height:boardSize
	});
	
//	var ChessWidget = require('ui/common/ChessWidget');
//	var chessObj = new ChessWidget(boardSize, game[5]);
//	initScript(chessObj);
//	resetBoard();
//	setBoard();
//	chessObj.loadGames();
//	chessObj.writeNotation();
	
	boardContainer.add(myChess.chessObj.board);
	
	
	var self = Ti.UI.createView({
		width:width,
		height:height
//		backgroundImage:Ti.Filesystem.resourcesDirectory+'mydata/icon/chessback.png'
		});
	
	var ControlView = require('ui/common/ControlView');
	var controlView = new ControlView(myChess.chessObj.board.width-10, 80);
	controlContainer.add(controlView);
	
	self.add(boardContainer);
//	self.board = chessObj;
	
	self.add(notationContainer);
	self.notation = notationView;
	
	self.add(controlContainer);
	self.control = controlView;
	

	


	self.addEventListener('openAgame',function(e){
//		Ti.API.info('Open Game '+e.game);
		myChess.chessObj.gameIndex = e.game;
		myChess.chessObj.game = myChess.Games[myChess.PlayerIndex].games[myChess.chessObj.gameIndex];

		myChess.f.getPiecesStatus();
//Ti.API.info("status:"+myChess.chessObj.piecesStatus);		
		
		myChess.f.resetPieces();


		if(!self.NotationView){
			notationContainer.remove(self.notation);
			games = myChess.Games;
			game = games[e.game];
			self.notation = new NotationView(notationWidth,boardSize);
			notationContainer.add(self.notation);		
		}
		
	});
	
	self.fireEvent('openAgame',{game:myChess.chessObj.gameIndex});
//	Ti.API.info("open gameview");
	return self;
};

module.exports = GameView;


