function GameView(width, height) {
	
Ti.API.log("game view :"+width+"  "+height);

//	var games = myChess.Games;
//	game = games[0];
	var notationWidth = width - myChess.boardSize - 20;
	var notationHeight = height-50;
	var boardSize = myChess.boardSize;	
//	var gridSize = boardSize/9;
//	var pieceSize = gridSize*2/3;

	var backButton = Ti.UI.createButton({
		top:15,
		left:10,
		width:100,
		height:50,
		backgroundImage:null
	})
	
	backButton.addEventListener('click',function(e){
		self.fireEvent('backToList');
	})
	
	var controlContainer = Ti.UI.createView({
		bottom:15,
		right:40,
		width:boardSize-80,
		height:45
	});

	var notationContainer  = Ti.UI.createView({
		top:60,
		left:5,
		width:notationWidth,
		height:notationHeight
	});
	
	var NotationView = require('ui/tablet/NotationViewIpad');
	
	
	var NameView = require('ui/tablet/NameViewIpad');
	var nameView = new NameView(boardSize,120);

	var nameContainer = Ti.UI.createView({
		top:10,
		left:70+notationWidth,
		width:boardSize,
		height:110
	});
	nameContainer.add(nameView);
		
	var boardContainer = Ti.UI.createView({
		bottom:50,
		right:8,
		width:boardSize,
		height:boardSize
	});
	
	
	boardContainer.add(myChess.chessObj.board);
	
	
	var self = Ti.UI.createView({
		width:width,
		height:height,
		right:0,
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/gameback.png'
		});
	
	var ControlView = require('ui/tablet/ControlViewIpad');
	var controlView = new ControlView(boardSize-80, 45);
	controlContainer.add(controlView);
	
		
	self.add(backButton);
	
	self.add(boardContainer);
	
	self.add(notationContainer);
	
	self.add(controlContainer);
	self.control = controlView;
	
	self.add(nameContainer);
	self.nameView = nameView;
	


	self.addEventListener('openAgame',function(e){
		
		
//		Ti.API.info('Open Game '+e.game);
		myChess.chessObj.gameIndex = e.game;
		myChess.chessObj.game = myChess.Games[myChess.PlayerIndex].games[myChess.chessObj.gameIndex];

		myChess.f.getPiecesStatus();
//Ti.API.info("status:"+myChess.chessObj.piecesStatus);		
		


		if(this.notation){
			notationContainer.remove(this.notation);
			self.noation = null;
		}	
		
		var notationView = new NotationView(notationWidth,boardSize);
		self.notation = notationView;
		notationContainer.add(self.notation);	

/*
		if(this.notation){
			notationContainer.remove(self.notation);
			games = myChess.Games;
			game = games[e.game];
			self.notation = new NotationView(notationWidth,notationHeight);
			notationContainer.add(self.notation);		
		}
*/		
		if(this.nameView){
			var game = myChess.chessObj.game;
			this.nameView.white.text = game.White;
			this.nameView.black.text = game.Black;
			
			this.nameView.welo.text = game.WhiteElo;
			this.nameView.belo.text = game.BlackElo;

			var tournament = game.Event;
			if((tournament == null) || (tournament.indexOf('?')>-1)){
				tournament = game.Site;
				if((tournament == null)||(tournament.indexOf('?')>-1)){
					tournament = " ";
				}	
			}		
			this.nameView.eventu.text = tournament;
	
			var round = game.Round;
			if(round == null || (round.indexOf('?')>-1)){
				round = "";
			}
			this.nameView.round.text = round;

  
			var edate = game.Year;
			if((game.Date)&&(game.Date.length>0)){
				edate = game.Year+"."+game.Date
			}
			this.nameView.date.text = edate;
			
			this.nameView.eco.text = game.ECO;
			
			this.nameView.result.text = game.Result;
		}
		
		myChess.f.resetPieces();

		var exportButton = Ti.UI.createButton({
			bottom:15,
			left:60,
			width:100,
			height:50,
			backgroundImage:null
		});
		
		exportButton.addEventListener('click',function(e){
			myChess.f.emailPGN();
		});
		self.add(exportButton);

		
		if(myChess.chessObj.playModeInProgress){
			myChess.chessObj.currentMove = 0;
   	    	myChess.chessObj.playModeInProgress = false;
   	    	self.control.backgroundImage = Ti.Filesystem.resourcesDirectory+"mydata/icon/chessControl0.png";
   	    }
		
	});
	
	
	
	
	
	self.fireEvent('openAgame',{game:myChess.chessObj.gameIndex});
//	Ti.API.info("open gameview");
	return self;
};

module.exports = GameView;


