function Replay() {
	var self = Ti.UI.createView({
		width:myChess.width,
		height:myChess.height,
		nc:new Array(),
		step:0
	});
	
	var BoardView = require('ui/common/ReplayBoard');
	board = new BoardView();
//Ti.API.info("BOARD:"+board);
	board.top = 80;			
	self.board = board;
	
	self.add(board);
	
	
	
	var hbtn = Ti.UI.createButton({
		title: 'home',
		bottom: 20,
		left: 50,
		width: 200
	});
	hbtn.addEventListener('click', function(e){
		myChess.tabGroup.setActiveTab(2);	
		myChess.Replay.step = myChess.Replay.nc.length;
	});
	self.add(hbtn);
	
	
	var lbl = Ti.UI.createLabel({
    	text : "Replay ..... ",
   		top : 10,
    	height : 'auto',
    	width : 'auto'
	});
	self.add(lbl);
	self.label = lbl;
	
	var glabel = Ti.UI.createLabel({
		top:board.top+board.height+10,
		left:20,
		font:{fontSize:12,fontWeight:'bold', fontFamily:'Arial'},
	});
	self.notation = glabel;
	self.add(glabel);
	
	self.setLabel = function(lbl){
		this.label = lbl;
	};
		
	self.setNotation = function(notation){
		this.notation.text = "";
		
		var ma = notation.split('  ');
		var moves = new Array();
		for(i=0;i<ma.length-1;i++){
			var moa = ma[i].split('.');
			if(moa[1]){
				var mov = moa[1].split(' ');
				if(mov[0]) moves.push(mov[0]);
				if(mov[1]) moves.push(mov[1]);
			}
		}	
		this.nc = moves;	
		Ti.API.info("Moves:::"+moves);
		
	};
	
	self.oneMove = function(moveStr){
		board.MoveOne(moveStr);
		
	};
	
	self.nextMove = function(){
		var count = this.step;
Ti.API.info("----> next move:"+count);		
		if(count<this.nc.length){
			var move = board.moves[count];
		
			if(Math.floor(count/2)*2 == count){
				var no = Math.floor(count/2)+1;
				this.notation.text += no+". "+move+"  ";
			}else{
				this.notation.text += move+" ";
			}	
		
			board.MoveOne(move);
		}
	};
	
	self.startMove = function(){
		board.moves = this.nc;
		this.step = 0;
		this.nextMove();
		
		
	};
		
/*	
	self.startMove = function(){
		var moves = this.nc;
		var no = 0;
		for(var si=0;si<moves.length;si++){
			var move = moves[si];
//			alert(si+"->->"+move);
			if(Math.floor(si/2)+1>no){
				no = Math.floor(si/2)+1;
				this.notation.text += no+". "+move+"  ";
			}else{
				this.notation.text += move+" ";
			}	
			this.oneMove(move);
		}	
	};
*/	
	
	return self;
};

module.exports = Replay;
