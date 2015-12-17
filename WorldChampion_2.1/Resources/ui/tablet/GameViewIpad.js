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
		right:70,
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
		width:boardSize-100,
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
	
	var soundButton = Ti.UI.createButton({
		width:45,
		height:45,
		bottom:17,
		right:20,
//		title:'Off',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/soundoff.png'
	})
	
	soundButton.addEventListener('click',function(){
		if(myChess.isSound == true){
			myChess.isSound = false;
//			this.title = "Off";
			this.backgroundImage=Ti.Filesystem.resourcesDirectory+'images/soundoff.png'
		}else{
			myChess.isSound = true;
//			this.title = 'On';
			this.backgroundImage=Ti.Filesystem.resourcesDirectory+'images/soundon.png'
		}
	})	

	self.add(soundButton);	
	
	
	var flipButton = Ti.UI.createButton({
		width:38,
		height:57,
		bottom:50+myChess.boardSize/2-30,
		right:0,
//		title:'Off',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/flipButton.png'
	})


	flipButton.addEventListener('click',function(){
		if(myChess.flip){
			myChess.flip = false;
		}else{
			myChess.flip = true;
		}
		var matrix = Ti.UI.create2DMatrix();
		if(myChess.flip){
			matrix = matrix.rotate(180);
			
			myChess.chessObj.board.animate({
		    	transform: matrix,
		   		duration:500
		   	});
		   	
			myChess.f.flipPieces(180);
			myChess.chessObj.board.backgroundImage = 'images/chessboard1.png';			
			myChess.chessObj.resultV.setTransform(Ti.UI.create2DMatrix({ rotate: 180 }));
  		}else{
  			matrix = matrix.rotate(0);
  			
  			myChess.chessObj.board.animate({
		    	transform: matrix,
		   		duration:500
		   	});	
  			
  			myChess.f.flipPieces(0);
  			myChess.chessObj.board.backgroundImage = 'images/chessboard.png';
			myChess.chessObj.resultV.setTransform(Ti.UI.create2DMatrix({ rotate: 0 }));
  		}	

	});	

	self.add(flipButton);	

	var favoriteButton = Ti.UI.createButton({
		width:45,
		height:45,
		top:25,
		right:27,
//		title:'Off',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/favorbutton.png'
	})	
	
	favoriteButton.addEventListener("click",function(){
		Ti.API.info('adding');;
		myChess.JDB.addFavorite();
		
		var l = Ti.UI.createLabel({
			text: 'favorite!',
			top:30,
			right:270,
			color:'991133',
			font:{fontSize: 27}
		})
		self.add(l);
		l.animate({
			top:40,
			right:-100,
			duration:1500
		},function(){
			self.remove(l);
		});			
	})
	
	self.add(favoriteButton);
	
	var challengeButton = Ti.UI.createButton({
		width:50,
		height:50,
		top:80,
		right:20,
//		title:'Off',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/ctb.png'
	})
	
	challengeButton.addEventListener('click',function(){
		
		ChessPuzzle.GridSize = boardSize/9;
		ChessPuzzle.PieceSize = boardSize/9;
				
		var cwin = Ti.UI.createView({
			backgroundImage:Ti.Filesystem.resourcesDirectory+'images/overlay2.png',
			width:width,
			height:height
		});

		var resetButton = Ti.UI.createButton({
			backgroundImage:Ti.Filesystem.resourcesDirectory+'images/closebutton.png',
			left:88,
			top:20,
			width:38,
			height:38
		});
		
		resetButton.addEventListener("click",function(){
			ChessPuzzle.Engine.ResetGame();
			if(self.cwin){
				self.remove(self.cwin);
			}	
		});
		
		cwin.add(resetButton);
		
		var undoButton = Ti.UI.createButton({
			title:'undo',
			color:'#0033FF',
			right:100,
			top:20,
			height:38
		});
		
		undoButton.addEventListener("click",function(){
			ChessPuzzle.Pickpiece = false;
//Ti.API.info(ChessPuzzle.Game.undoButton.clicked+" undo fen:"+ChessPuzzle.GameData.FENs);			
			if(ChessPuzzle.GameData.FENs.length==0){
				this.enabled = false;
				return;
			}	
			ChessPuzzle.GameData.FENs.pop();

			if(ChessPuzzle.GameData.FENs.length==0){
				this.enabled = false;
				return;
			}else{
				this.enabled = true;
			}
						
			var ufen = ChessPuzzle.GameData.FENs.pop();
//Ti.API.info("ufen>>>"+ufen.fen);
			if(ChessPuzzle.GameData.FENs.length==0){
				this.enabled = false;
			}	

			var fen = ufen.fen;	
			ChessPuzzle.Game.board.setPiecesFromFen(fen);
			ChessPuzzle.Game.undoButton.clicked = true;	
			ChessPuzzle.Game.board.clearMarks();				
			ChessPuzzle.Game.board.delNotation();				
			if(ufen.p1 && ufen.p2){			
				ufen.p1.mark(true);
				ufen.p2.mark(true);
			}
			
			ChessPuzzle.GameData.FENs.push(ufen);
//Ti.API.info("undo FEN >>>"+ChessPuzzle.GameData.FENs);
			

		});
		
		cwin.add(undoButton);

		
		var Game = require('ui/common/challenge/Game');
		var game = new Game();
		
		game.undoButton = undoButton;
		
		ChessPuzzle.Game = game;

//Ti.API.info("GAME DATA >>>>>>>>>>>>"+ChessPuzzle.GameData.turnColor);
//		game.board.resetPieces();		
				
		var fen = self.getFen();
		
		game.board.setPiecesFromFen(fen);
		ChessPuzzle.GameData.FENs = [];
		ChessPuzzle.GameData.FENs.push({fen:fen});
		
//		ChessPuzzle.GameData.SANs = [];
//Ti.API.info("sans -- "+ChessPuzzle.GameData.SANs);	
	
		game.board.top=resetButton.top+resetButton.height;							
		cwin.add(game.board);
		
		game.notation.top = game.board.top + game.board.height;
		game.notation.left = resetButton.left;
		cwin.add(game.notation);
		
		var resultView = Ti.UI.createImageView({
			width:300,
			height:200,
			left:-1000,
			top:200
		})
		
		resultView.win = function(){
			this.image = Ti.Filesystem.resourcesDirectory+'images/resultwon.png';
			this.left = 200;
		}
		resultView.lost = function(){
			this.image = Ti.Filesystem.resourcesDirectory+'images/resultfail.png';
			this.left = 200;
		}
		resultView.draw = function(){
			this.image = Ti.Filesystem.resourcesDirectory+'images/resultdraw.png';
			this.left = 200;
		}
		resultView.addEventListener('click',function(){
			this.left = -1000;
		})
		cwin.add(resultView);
		ChessPuzzle.ResultView = resultView;
		
		self.add(cwin);
		self.cwin = cwin;

	});	
	
	self.add(challengeButton);
	

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
		
		var exportView = Ti.UI.createView({
			height:150,
			width:200,
			left:80,
			bottom:-500,
			backgroundColor:'white',
			opacity:0.8,
			color:'black'
		});
		
		var emailButton = Ti.UI.createButton({
			height:30,
			width:150,
			title:'Email PGN file',
			top:10
		});
		emailButton.addEventListener('click',function(){
			myChess.f.emailPGN();
			exportView.bottom = -500;
		});	
		
		var clipboardButton = Ti.UI.createButton({
			height:30,
			width:150,
			title:'Copy to Clipboard',
			top:50
		});
		clipboardButton.addEventListener('click',function(){
			myChess.f.copyPGN();
			exportView.bottom = -500;
		});	
		
		var cancelButton = Ti.UI.createButton({
			height:30,
			width:150,
			title:'Cancel',
			top:90
		});
		cancelButton.addEventListener('click',function(){
			exportView.bottom = -500;
		});	
		
		exportView.add(emailButton);
		exportView.add(clipboardButton);
		exportView.add(cancelButton);
		
		self.add(exportView);

		var exportButton = Ti.UI.createButton({
			bottom:15,
			left:60,
			width:100,
			height:50,
			backgroundImage:null
		});
		
		exportButton.addEventListener('click',function(e){
			exportView.bottom = 60;
		});
		self.add(exportButton);

		
		if(myChess.chessObj.playModeInProgress){
			myChess.chessObj.currentMove = 0;
   	    	myChess.chessObj.playModeInProgress = false;
   	    	self.control.backgroundImage = Ti.Filesystem.resourcesDirectory+"mydata/icon/chessControl0.png";
   	    }
		
	});
	
	self.getFen = function(){
		var newMove = myChess.chessObj.currentMove;
		var boardpiece = new Array(8*8);
		for(var i = 0;i<64;i++){
			boardpiece[i] = "#";
		}
		
		for(var type=0;type<2;type++){
			for(var no=0;no<16;no++){
				var piece = myChess.chessObj.piecesStatus[newMove][type][no];
//		Ti.API.info(type+"/"+no+"  "+piece.x+":"+piece.y+"  "+piece.picType+"   "+piece.onboard);		
				if(piece && piece.picType.length==2){
					var pt = piece.picType;
//			Ti.API.info("piece--"+pt+" "+pt.substring(0,1)+" "+pt.substring(1,2));		
					if(pt.substring(0,1) == 'b'){
						pt = pt.substring(1,2).toLowerCase();
					}else if(pt.substring(0,1) == 'w'){
						pt = pt.substring(1,2).toUpperCase();
					}
					boardpiece[piece.x-1+8*piece.y] = pt;
					
				}	
			}
		}			
		
		var fen = "";
		var bcount = 0;
		for(i=0;i<64;i++){
			if(i>0 && i%8==0){
				if(bcount > 0){
					fen += bcount;
				}
				fen += "/";
				bcount = 0;
			}
			if(boardpiece[i]=='#'){
				bcount++;
			}else{
				if(bcount > 0){
					fen += bcount;
				}
				fen += boardpiece[i];
				bcount = 0;
			}			
		}
		if(bcount>0){
			fen += bcount;
		}
		
		if(newMove%2 == 0){
			fen += ' w ';
		}else{
			fen += ' b ';
		}
		
		fen += myChess.chessObj.piecesStatus[newMove][3]+' ';
		fen += myChess.chessObj.piecesStatus[newMove][4]+' ';
		fen += myChess.chessObj.piecesStatus[newMove][5]+' '+(Math.floor(newMove/2)+1);
		
//		Ti.API.info("FEN >> "+fen);
		return fen;
	}
	
	
	
	self.fireEvent('openAgame',{game:myChess.chessObj.gameIndex});
//	Ti.API.info("open gameview");
	return self;
};

module.exports = GameView;


