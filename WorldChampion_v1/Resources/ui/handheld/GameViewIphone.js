function GameView() {
	
Ti.API.log("game view :"+myChess.width);

//	var games = myChess.Games;
//	game = games[0];
	var notationWidth = myChess.width;
	var boardSize = myChess.boardSize;	
	var gridSize = boardSize/9;
//	var pieceSize = gridSize*2/3;

	var notationContainer  = Ti.UI.createView({
		width:myChess.width-20,
		height:176,
		bottom:5,
		left:8
	});

	
	var controlContainer = Ti.UI.createView({
		bottom:90,
		right:12,
		width:boardSize-150,
		height:80
	});
		
	var boardContainer = Ti.UI.createView({
		top:45,
		left:0,
		width:boardSize,
		height:boardSize+12
	});
		
	boardContainer.add(myChess.chessObj.board);
	
	var blackv = Ti.UI.createView({
		backgroundColor:'white',
		opacity:0.5,
		right:0,
		top:0,
		height:16,
		width:210
	})
	var blacku = Ti.UI.createLabel({
		font:{fontSize:13,fontWeight:'bold', fontFamily:'Arial',},
		color:'black',
		right:0,
		top:0,
		height:16,
		width:210,
		text:'',
		textAlign:'right'
	});	
		
	var whitev = Ti.UI.createView({
		right:0,
		bottom:0,
		height:16,
		width:210,
		backgroundColor:'black',
		opacity:0.5
	});	
	var whiteu = Ti.UI.createLabel({
		font:{fontSize:13,fontWeight:'bold', fontFamily:'Arial',},
		color:'white',
		right:0,
		bottom:0,
		height:16,
		width:210,
		text:'',
		textAlign:'right'
	});

	boardContainer.add(blackv);
	boardContainer.add(whitev);
	boardContainer.add(blacku);
	boardContainer.add(whiteu);
	
	
	var self = Ti.UI.createView({
		top:0,
		left:0,
		width:320,
		height:550,
//		width:myChess.width,
//		height:myChess.width*3/2-16,
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/gamebackh5.png'
	});
	
	var NotationView = require('ui/handheld/NotationViewIphone');
	var ControlView = require('ui/handheld/ControlViewIphone');
	var controlView = new ControlView(boardSize-150, 80);
	controlContainer.add(controlView);
		
	self.add(boardContainer);
	self.blacku = blacku;
	self.whiteu = whiteu;

		
	self.add(notationContainer);
	
	self.add(controlContainer);
	self.control = controlView;

	var pName=Ti.UI.createLabel({
		text:'player[0]',
		top:12,
		left:80,
		color:'white',
		font:{fontSize:18,fontWeight:'bold', fontFamily:'Arial',color:'white'}
	})
	self.add(pName);
	self.pName = pName;



	var exportButton = Ti.UI.createButton({
		width:30,
		height:25,
		top:8,
		right:5,
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/exportButton.png'
	})
	
	exportButton.addEventListener('click',function(){
		myChess.f.emailPGN();
	})	

	self.add(exportButton);	
	

	self.addEventListener('openAgame',function(e){
//		Ti.API.info('Open Game '+myChess.chessObj.gameIndex);
		var player = myChess.Players[myChess.PlayerIndex];
		myChess.chessObj.game = myChess.Games[myChess.PlayerIndex].games[myChess.chessObj.gameIndex];

		myChess.f.getPiecesStatus();
//Ti.API.info("status:"+myChess.chessObj.piecesStatus);		

		if(self.notation){
			notationContainer.remove(self.notation);
			self.noation = null;
		}	
		
		var notationView = new NotationView(notationWidth,boardSize);
		self.notation = notationView;
		notationContainer.add(self.notation);	
		
		if(myChess.chessObj.game.BlackElo){
			self.blacku.text = myChess.chessObj.game.Black+" ("+myChess.chessObj.game.BlackElo+")     ";
		}else{
			self.blacku.text = myChess.chessObj.game.Black+"       ";
		}
		
		if(myChess.chessObj.game.WhiteElo){
			self.whiteu.text = myChess.chessObj.game.White+" ("+myChess.chessObj.game.WhiteElo+")     ";
		}else{
			self.whiteu.text = myChess.chessObj.game.White+"       ";
		}
		
		self.pName.text = player[0];
				
		myChess.f.resetPieces();	
			
	});
	
	self.addEventListener('click', function(){
		myChess.chessObj.resultV.fireEvent('hide');
	})

	return self;
};

module.exports = GameView;


