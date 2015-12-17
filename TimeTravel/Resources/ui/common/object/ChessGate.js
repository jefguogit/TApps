function ChessGate(year, width) {
		
	var self = Ti.UI.createView({
		width:width,
		height:width,
//		title:year+":"+myChess.games['y'+year].length,
		year:year,
//		backgroundColor:'#ee9966',
		pass:false,
		star:0,
		enabled:false,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/nsg1.png"
	});
	
	var ly = Ti.UI.createLabel({
		top:12,
		color:'#000000',
		font:{fontSize:15,fontWeight:'normal', fontFamily:'Arial'}
	});

	var sn = myChess.record['o'+year];
	if(sn&&sn>0){
			sn = sn-1;
			self.backgroundImage = Ti.Filesystem.resourcesDirectory+'images/nsg1'+sn+'.png';
	}
	self.add(ly);
	self.ly = ly;

	
	if(myChess.record['o'+year]){
		self.pass = true;
		self.enabled = true;
		ly.text = year;
	}

	self.addEventListener('click',function(){
		
		if(!self.enabled) return;
		
		myChess.gameView.board.clearMarks();
		myChess.year = this.year;
		myChess.startview.left(this.year);
	//myChess.tabGroup.setActiveTab(1);
		
		
	});		
	
	self.getGame = function(year){
//		var games = myChess.games['y'+year];
		var record = myChess.record['y'+year];
		if(record.length==0){
			myChess.record['y'+year] = myChess.record['g'+year];
			record = myChess.record['y'+year];
		}	
		
		var gindex = record.pop();
		
		return gindex;
	};
	
	self.starback = function(n){
		self.backgroundImage = Ti.Filesystem.resourcesDirectory+'images/nsg1'+n+'.png';
	};
	
//	myChess.record['y'+year].button = self;


/*	
	self.simulate = function(){

		
		var fen = myChess.chessObj.game.End;
		if(!fen) return;
		
		ChessPuzzle.Engine.ResetGame();
		var result = ChessPuzzle.Engine.InitializeFromFen(fen);
		if(result) return;
		
		var ncount = 1;
		var cc=0;
		//var notation = myChess.chessObj.game.Gid+":";
		var notation = ""; 
		while(true){
			try{
					ChessPuzzle.Engine.g_timeout = 3600;
					var movePosition = ChessPuzzle.Engine.Search(99);
        			var cmove = movePosition.move;

					notation+=cmove+" ";
					cc++;
//					Ti.API.info(cc+":"+cmove);
					if(cmove.indexOf("#")>0){
						break;
					}else if(cmove.indexOf("~")>0){
						Ti.API.info("DRAW!!!!");
						cc=100;
					}
			}catch(e){
					Ti.API.info("error:"+e);
					break;
			}	
			if(cc>50){
				break;
			}
		}	
		if(cc>50){
//			Ti.API.info("Fail("+cc+")  "+notation);
			return 0;
		}else{
//			Ti.API.info("Pass("+cc+")  "+notation);
			myChess.chessObj.game.Simulate=notation;
			return cc;
		}
	}
*/	
	
	
	return self;
};

module.exports = ChessGate;
