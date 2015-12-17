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
		text:'',
		textAlign:'left'
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
		text:'',
		textAlign:'right'
	});

	blackv.add(blacku);
	boardContainer.add(blackv);
	whitev.add(whiteu);
	boardContainer.add(whitev);
	
	var self = Ti.UI.createView({
		top:0,
		left:0,
		width:320,
		height:550,
//		width:myChess.width,
//		height:myChess.width*3/2-16,
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/gamebackh.png'
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
/*
	var pName=Ti.UI.createLabel({
		text:'player[0]',
		top:12,
		left:80,
		color:'white',
		font:{fontSize:18,fontWeight:'bold', fontFamily:'Arial',color:'white'}
	})
	self.add(pName);
	self.pName = pName;
*/	
	
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
	
	self.add(exportView);

	var exportButton = Ti.UI.createButton({
		width:30,
		height:25,
		top:8,
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
	
	
	var favoriteButton = Ti.UI.createButton({
		width:30,
		height:30,
		top:5,
		right:36,
//		title:'Off',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/favoritebutton.png'
	});
	
	favoriteButton.addEventListener("click",function(){
		Ti.API.info('adding');;
		myChess.JDB.addFavorite();
		
		var l = Ti.UI.createLabel({
			text: 'favorite!',
			top:40,
			right:60,
			color:'991133',
			font:{fontSize: 21}
		});
		self.add(l);
		l.animate({
			top:40,
			right:-100,
			duration:1500
		},function(){
			self.remove(l);
		});			
	});
	
	self.add(favoriteButton);
	
	var favoritelabel = Ti.UI.createLabel({
		width:36,
		height:10,
		top:4,
		right:50,
		text:'favorite'
	});	
	

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
		
//		self.pName.text = player[0];
				
		myChess.f.resetPieces();	
			
	});
	
	self.addEventListener('click', function(){
		myChess.chessObj.resultV.fireEvent('hide');
	})

	return self;
};

module.exports = GameView;


