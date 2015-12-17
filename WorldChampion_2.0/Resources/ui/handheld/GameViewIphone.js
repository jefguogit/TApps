function GameView() {
	
//Ti.API.log("game view :"+myChess.width);

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
		left:0
	});

	
	var controlContainer = Ti.UI.createView({
		bottom:90,
		right:6,
		width:boardSize-125,
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
		left:0,
		top:0,
		height:16,
		width:210
	})
	var blacku = Ti.UI.createLabel({
		font:{fontSize:13,fontWeight:'bold', fontFamily:'Arial',},
		color:'black',
		left:0,
		top:0,
		height:16,
		width:210,
		text:'',
		textAlign:'right'
	});	
		
	var whitev = Ti.UI.createView({
		right:0,
		top:myChess.boardSize+12-16,
		height:16,
		width:210,
		backgroundColor:'black',
		opacity:0.5
	});	
	var whiteu = Ti.UI.createLabel({
		font:{fontSize:13,fontWeight:'bold', fontFamily:'Arial',},
		color:'white',
		right:0,
		top:myChess.boardSize+12-16,
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
	var controlView = new ControlView(boardSize-125, 80);
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
	
	
	var exportView = Ti.UI.createView({
		height:150,
		width:200,
		right:10,
		top:-500,
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
		exportView.top = -500;
	});	
	
	var clipboardButton = Ti.UI.createButton({
		height:30,
		width:150,
		title:'Copy to Clipboard',
		top:50
	});
	clipboardButton.addEventListener('click',function(){
		myChess.f.copyPGN();
		exportView.top = -500;
	});	
	
	var cancelButton = Ti.UI.createButton({
		height:30,
		width:150,
		title:'Cancel',
		top:90
	});
	cancelButton.addEventListener('click',function(){
		exportView.top = -500;
	});	
	
	exportView.add(emailButton);
	exportView.add(clipboardButton);
	exportView.add(cancelButton);

	var exportButton = Ti.UI.createButton({
		width:30,
		height:20,
		top:0,
		right:5,
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/exportButton.png'
	})
	
	exportButton.addEventListener('click',function(){
		exportView.top = 30;
	})	

	self.add(exportButton);	
	
	var soundButton = Ti.UI.createButton({
		width:25,
		height:32,
		bottom:136,
		right:10,
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
		width:24,
		height:36,
		top:45+myChess.boardSize/2-12,
		left:0,
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
			whitev.top = 0;
			whiteu.top = 0;
			whitev.right = myChess.boardSize-whitev.width;
			whiteu.right = myChess.boardSize-whiteu.width;
			blackv.top = myChess.boardSize+12-16;
			blacku.top = myChess.boardSize+12-16;
			blackv.left = myChess.boardSize-blackv.width;
			blacku.left = myChess.boardSize-blacku.width;
			matrix = matrix.rotate(180);
			
			myChess.chessObj.board.animate({
		    	transform: matrix,
		   		duration:500
		   	});
		   	
			myChess.f.flipPieces(180);
			myChess.chessObj.board.backgroundImage = 'images/chessboard1.png';
			myChess.chessObj.resultV.setTransform(Ti.UI.create2DMatrix({ rotate: 180 }));
  		}else{
			whitev.top = myChess.boardSize+12-16;
			whiteu.top = myChess.boardSize+12-16;
			whitev.right = 0;
			whiteu.right = 0;
			blackv.top = 0;
			blacku.top = 0;
			blackv.left = 0;
			blacku.left = 0;
  			matrix = matrix.rotate(0)
  			
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
	
	var challengeButton = Ti.UI.createButton({
		width:36,
		height:38,
		top:25,
		right:5,
//		title:'Off',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/ctb.png'
	})


	challengeButton.addEventListener('click',function(){
		
		ChessPuzzle.GridSize = 36;
		ChessPuzzle.PieceSize = 36; 
				
		var cwin = Ti.UI.createView({
			backgroundImage:Ti.Filesystem.resourcesDirectory+'images/overlay.png'
		});

		var resetButton = Ti.UI.createButton({
			backgroundImage:Ti.Filesystem.resourcesDirectory+'images/closebutton.png',
			left:5,
			top:57,
			width:30,
			height:30
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
			right:20,
			top:58,
			height:27
		});
		
		undoButton.addEventListener("click",function(){
			ChessPuzzle.Pickpiece = false;
		
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

	
		game.board.top=resetButton.top+resetButton.height;							
		cwin.add(game.board);
		
		game.notation.top = game.board.top + game.board.height;
		cwin.add(game.notation);
		
		var resultView = Ti.UI.createImageView({
			width:180,
			height:100,
			left:-1000,
			top:180
		})
		
		resultView.win = function(){
			this.image = Ti.Filesystem.resourcesDirectory+'images/resultwon.png';
			this.left = 70;
		}
		resultView.lost = function(){
			this.image = Ti.Filesystem.resourcesDirectory+'images/resultfail.png';
			this.left = 70;
		}
		resultView.draw = function(){
			this.image = Ti.Filesystem.resourcesDirectory+'images/resultdraw.png';
			this.left = 70;
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
	
	self.add(exportView);

	self.addEventListener('openAgame',function(e){
//		Ti.API.info('Open Game '+myChess.chessObj.gameIndex);
		var player = myChess.Players[myChess.PlayerIndex];
		myChess.chessObj.game = myChess.Games[myChess.PlayerIndex].games[myChess.chessObj.gameIndex];

		myChess.f.getPiecesStatus();		

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

	return self;
};

module.exports = GameView;


