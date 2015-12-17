function IntroView(width, height, notation) {
	
Ti.API.log("intro view :"+width+"  "+height);

//	var games = myChess.Games;
//	game = games[0];
	var notationWidth = (myChess.width-50)*7/10*1/3;
	var boardSize = Math.floor((myChess.width)*7/10*2/3-50);
	var gridSize = boardSize/9;
	var pieceSize = gridSize*2/3;

	
	var notationContainer  = Ti.UI.createView({
		top:30,
		left:10,
		width:notationWidth,
		height:height - 20
	});
	
	var player = myChess.Players[myChess.PlayerIndex];
	
	var pName=Ti.UI.createLabel({
		text:player[0]
	})
	notationContainer.add(pName);
	
	var boardContainer = Ti.UI.createView({
		top:70,
		left:10+notationWidth,
		width:boardSize,
		height:boardSize
	});
	
	var pDesc=Ti.UI.createLabel({
		width:boardSize-50,
		top:50,
		left:50,
		text:player[5]
	})
	
	boardContainer.add(pDesc);
	
	
	var self = Ti.UI.createView({
		width:width,
		height:height,
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/clb.png'
	});
	

	
	self.add(boardContainer);
//	self.board = chessObj;
	
	self.add(notationContainer);
	
	
	self.addEventListener('refresh',function(e){
			var pinfo = myChess.Players[myChess.PlayerIndex];
			pName.text=pinfo[0];
			pDesc.text=pinfo[5];
	});
	

	return self;
};

module.exports = IntroView;




