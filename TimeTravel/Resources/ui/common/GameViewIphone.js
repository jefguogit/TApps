function GameView() {
	
//Ti.API.log("game view :"+myChess.width);

//	var games = myChess.Games;
//	game = games[0];
	var notationWidth = myChess.width;
	var boardSize = myChess.boardSize;	
	var gridSize = boardSize/9;
//	var pieceSize = gridSize*2/3;
	
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
		
	var self = Ti.UI.createView({
		top:0,
		left:0,
		width:320,
		height:550,
//		width:myChess.width,
//		height:myChess.width*3/2-16,
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/gamebackh5.png'
	});
	
	var NotationView = require('ui/common/NotationViewIphone');
	var ControlView = require('ui/common/ControlViewIphone');
	var controlView = new ControlView(boardSize-125, 80);
	controlContainer.add(controlView);
		
	self.add(boardContainer);
	
//	self.add(notationContainer);
	
	self.add(controlContainer);
	self.control = controlView;

	
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
			whitev.right = myChess.boardSize-whitev.width;
			blackv.top = myChess.boardSize+12-16;
			blackv.left = myChess.boardSize-blackv.width;
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
			whitev.right = 0;
			blackv.top = 0;
			blackv.left = 0;
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
		
//		self.pName.text = player[6];
		self.pName.text = myChess.chessObj.game.Gid;
				
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


