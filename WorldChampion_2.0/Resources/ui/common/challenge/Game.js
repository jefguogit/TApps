function Game() {

	ChessPuzzle.GameData = {};
	
	ChessPuzzle.GameData.turnColor = 'white';
	ChessPuzzle.GameData.playerColor = 'white';
	
	ChessPuzzle.GameData.FENs = new Array();
//	ChessPuzzle.GameData.FENs[0] = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
	
	ChessPuzzle.GameData.SANs = new Array();	
	ChessPuzzle.GameData.Marks = new Array();
	
	var BoardView = require('ui/common/challenge/Board');
	board = new BoardView();
		
	self.board = board;
	
	var notationView = Ti.UI.createView({
		width:ChessPuzzle.GridSize*8,
		height:ChessPuzzle.GridSize*5/4,
		right:ChessPuzzle.GridSize/2,
		borderColor:'red'
	});

	var nt = Ti.UI.createTextArea({
		value:'notation',
		borderColor:'green',
		width:ChessPuzzle.GridSize*8,
		height:ChessPuzzle.GridSize*5/4,
		top:0,
		editable:false,
		focusable:true,
		verticalAlign:Ti.UI. TEXT_VERTICAL_ALIGNMENT_BOTTOM,
		backgroundColor:'transparent'
	});	

	var table1 = Ti.UI.createTableView({
		data:[],
		width:ChessPuzzle.GridSize*9,
		top:0,
		height:ChessPuzzle.GridSize*5/4,
		left:0,
		backgroundColor:'transparent',
		separatorColor:'transparent',
		allowsSelection:false
	});

	notationView.add(table1);
	

	table1.top = board.top + ChessPuzzle.GridSize*(8);
	
	self.notation = table1;

	var lbl = Ti.UI.createLabel({
    	text : "I have a very small textarea, only 300x65, but with a very long text. I would like the text to auto scroll up based on timer or event, but I am not able to find any solution. Tried with Scrollview scrollTo and setOffset but not really what I was looking for.Anyone has a solution for having a text to auto-scroll?,I have a very small textarea, only 300x65, but with a very long text. I would like the text to auto scroll up based on timer or event, but I am not able to find any solution. Tried with Scrollview scrollTo and setOffset but not really what I was looking for.Anyone has a solution for having a text to auto-scroll?",
   		top : 0,
    	height : 'auto',
    	width : 'auto'
	});
	
	self.addNotation = function(){
		var notationData = [];		
		var len = ChessPuzzle.GameData.SANs.length;
		var text="";
		var count = 0;
		
		while(true){
			if(count>=len) break;
			var trow = Ti.UI.createTableViewRow({
				backgroundColor:'transparent',
				font:{fontSize:ChessPuzzle.FontSize,fontWeight:'normal', fontFamily:'Arial'},
				height:ChessPuzzle.FontSize+ChessPuzzle.FontSize/4
			});
			var text = "";
			for(var i=0;i<4;i++){
				if(count>=len) break;
				if(text.length>40) break;
				row = ChessPuzzle.GameData.SANs[count];
				text += (++count)+"."+row[0]+" "+row[1]+"    ";				
			}	 
			trow.title = text;
			notationData.push(trow);
		}	

		this.notation.setData(notationData);
		this.notation.scrollToIndex(notationData.length-1);
	}
			
	return self;
};

module.exports = Game;
