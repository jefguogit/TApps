function ChallengeView(top,bottom,left,right,pw, ph, pt, pl) {
	var self = Ti.UI.createView({
		backgroundColor:'transparent',
		top:top,
		bottom:bottom,
		left:left,
		right:right
	});

	ChessPuzzle.GridSize = 36;
	ChessPuzzle.PieceSize = 36; 
	
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});

	var resetButton = Ti.UI.createButton({
		title:'new game',
		left:20,
		top:0
	});	
	resetButton.addEventListener("click",function(){
		ChessPuzzle.Engine.ResetGame();
		myChess.gameView.board.resetPieces();
	});
	
	self.add(resetButton);
	
	var undoButton = Ti.UI.createButton({
		title:'undo',
		right:20,
		top:0
	});
	undoButton.addEventListener("click",function(){
		
		if(ChessPuzzle.GameData.FENs.length==0){
			this.enabled = false;
			return;
		}	
		if(!myChess.gameView.undoButton.clicked){
			ChessPuzzle.GameData.FENs.pop();
		}	

		if(ChessPuzzle.GameData.FENs.length==0){
			this.enabled = false;
			return;
		}
					
		var ufen = ChessPuzzle.GameData.FENs.pop();
//			Ti.API.info("fen>>>"+fen);			
		myChess.gameView.board.setPiecesFromFen(ufen);
		
		if(ChessPuzzle.GameData.FENs.length==0){
			this.enabled = false;
			return;
		}
	});	
	self.add(undoButton);

	
	var Game = require('ui/common/Game');
	var game = new Game();
	
	game.undoButton = undoButton;
	
	ChessPuzzle.Game = game;

//Ti.API.info("GAME DATA >>>>>>>>>>>>"+ChessPuzzle.GameData.turnColor);
	
	game.board.resetPieces();
	
	
			
	self.add(game.board);
	
	return self;
};

module.exports = ChallengeView;
