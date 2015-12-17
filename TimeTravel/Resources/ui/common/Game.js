function Game() {
	
Ti.API.info(myChess.device);	

	ChessPuzzle.GameData = {};
	
	ChessPuzzle.GameData.turnColor = 'white';
	ChessPuzzle.GameData.playerColor = 'white';
	
	ChessPuzzle.GameData.FENs = new Array();
//	ChessPuzzle.GameData.FENs[0] = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
	
	ChessPuzzle.GameData.SANs = new Array();	
	ChessPuzzle.GameData.Marks = new Array();
	
	self = Ti.UI.createView({
		width:myChess.width,
		height:myChess.height,
	});
	
	var BoardView = require('ui/common/Board');
	board = new BoardView();
//Ti.API.info("BOARD:"+board);			
	self.board = board;
/*	
	var notationView = Ti.UI.createView({
		width:ChessPuzzle.GridSize*8,
		height:ChessPuzzle.GridSize*5/4,
		right:ChessPuzzle.GridSize/2,
		borderColor:'red',
		backgroundColor:'yellow'
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
*/
	var table1 = Ti.UI.createTableView({
		data:[],
		width:ChessPuzzle.GridSize*9,
		top:0,
		height:ChessPuzzle.GridSize*2,
		left:0,
		backgroundColor:'transparent',
		separatorColor:'transparent',
		allowsSelection:false,
		borderColor:'red'
	});
	
	if(myChess.device == 'iPhone4'){
		table1.height = ChessPuzzle.GridSize;
	}	

//	notationView.add(table1);
	
//	notationView.top = board.top + ChessPuzzle.GridSize*(8);
	
	self.notation = table1;

	var lbl = Ti.UI.createLabel({
    	text : "I have a very small textarea, only 300x65, but with a very long text. I would like the text to auto scroll up based on timer or event, but I am not able to find any solution. Tried with Scrollview scrollTo and setOffset but not really what I was looking for.Anyone has a solution for having a text to auto-scroll?,I have a very small textarea, only 300x65, but with a very long text. I would like the text to auto scroll up based on timer or event, but I am not able to find any solution. Tried with Scrollview scrollTo and setOffset but not really what I was looking for.Anyone has a solution for having a text to auto-scroll?",
   		top : 0,
    	height : 'auto',
    	width : 'auto'
	});
	
	self.addNotation = function(){
		var notationData = [];		
		var notationText = "";
		var len = ChessPuzzle.GameData.SANs.length;
		var text="";
		var count = 0;
		
		while(true){
			if(count>=len) break;
			var trow = Ti.UI.createTableViewRow({
				backgroundColor:'yellow',
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
			notationText += text;
		}	

		this.notation.setData(notationData);
		this.notation.scrollToIndex(notationData.length-1);
		myChess.NotationText = notationText;
	};
	
	var cwin = Ti.UI.createView({
//		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/bk1.png'
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/ttgameback.png'
//		backgroundImage:null
	});
	
	var controlView = Ti.UI.createView({
		right:0,
		bottom:50,
		height:80,
		backgroundColor:'transparent',
		width:myChess.width,
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/cpback.png'
	});
	
	if(myChess.device == 'iPhone4') {
		controlView.bottom = 0;
	}
		
	var undoButton = Ti.UI.createView({
		right:0,
		bottom:50,
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/undoba.png',
		height:30,
		width:120,
		enabled:false
	});
	undoButton.hide = function(){
		this.left = 1000;
	//	this.tokenLabel.left = 1000;
	};
	undoButton.show = function(){
		this.left = 200;
//		this.tokenLabel.left = 200+undoButton.width;
	};	
	controlView.add(undoButton);
	
	var tokenLabel = Ti.UI.createLabel({
		text:myChess.record.token,
		left:60,
		bottom:0,
		color:'black'
	});	
	undoButton.add(tokenLabel);
	undoButton.tokenLabel = tokenLabel;
	
	var mlabel = Ti.UI.createLabel({
		text:'-1',
		right:1000,
		bottom:tokenLabel.bottom,
		rights:tokenLabel.right,
		righth:1000,
		color:'black'
	});

	undoButton.add(mlabel);
	
	
	cwin.tokenLabel = tokenLabel;
	
	cwin.minusLabel = mlabel;
	
	
	var tlabel = Ti.UI.createLabel({
		text:'thinking . . .',
		bottom:0,
		bottoms:50,
		bottomh:-500,
		rights:0,
		width:myChess.width,
		height:controlView.height/2,
		color:'#113311',
		backgroundColor:'#99ff99'
	});
		
	tlabel.show = function(){	
		this.bottom = this.bottoms;				
	};
	tlabel.hide = function(){
		this.bottom = this.bottomh;
	};
	controlView.add(tlabel);	
	controlView.thinkl = tlabel;
	
	controlView.think = function(){
Ti.API.info("control view think");		
		this.thinkl.bottom = 50;	
		this.bottom = 0;	
		this.quit.bottom = -500;
	};
	controlView.play = function(){
Ti.API.info("control view play");		
		this.thinkl.bottom = -500;
		this.quit.bottom = 50;
		if(myChess.device == 'iPhone4'){			
			this.bottom = -50;
		}	
		
	};
		
	undoButton.addEventListener("click",function(){
		if(myChess.record.token == 0){
			return;
		}
			
		ChessPuzzle.Pickpiece = false;
		
		if(ChessPuzzle.GameData.FENs.length==0){
			this.enabled = false;
			this.hide();
			return;
		}	
		ChessPuzzle.GameData.FENs.pop();

		if(ChessPuzzle.GameData.FENs.length==0){
			this.enabled = false;
			this.hide();
			return;
		}else{
			this.enabled = true;
			this.show();
		}
						
		var ufen = ChessPuzzle.GameData.FENs.pop();
//Ti.API.info("ufen>>>"+ufen.fen);
		if(ChessPuzzle.GameData.FENs.length==0){
			this.enabled = false;
			this.hide();
		}	

		var fen = ufen.fen;	
		myChess.gameView.board.setPiecesFromFen1(fen);
		myChess.gameView.undoButton.clicked = true;	
		myChess.gameView.board.clearMarks();				
		myChess.gameView.board.delNotation();				
		if(ufen.p1 && ufen.p2){			
			ufen.p1.mark(true);
			ufen.p2.mark(true);
		}
			
		ChessPuzzle.GameData.FENs.push(ufen);
			
		myChess.record.token--;
		myChess.JDBR.saveFile(myChess.record);
		myChess.gameView.setStatusM();
			
	});
	
	var quitButton = Ti.UI.createView({
		left:20,
		bottom:50,
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/quitb.png',
		height:30,
		width:80
	});
	
	quitButton.addEventListener("click",function(){
		myChess.gameView.board.clearMarks();
		myChess.gameView.board.clearTargets();
		myChess.startview.failGame();
		
		ChessPuzzle.ResultView.left=-1000;
		myChess.tabGroup.setActiveTab(0);
	});
	
	controlView.add(quitButton);
	controlView.quit = quitButton;
	
	var adView = Ti.UI.iOS.createAdView({
		 width: 'auto',
		 height: 50,
		 bottom:0
	});
	
	controlView.add(adView);
	controlView.adv = adView;
		
	cwin.add(controlView);
	cwin.control = controlView;
	
	if(myChess.record.token==0){
		undoButton.enabled = false;
		undoButton.hide();
	}
	
	self.undoButton = undoButton;
	
	var introview = Ti.UI.createView({
		width:myChess.width-50,
		height:ChessPuzzle.GridSize,
		top:5,
		left:38,
		backgroundColor:'transparent',
		borderColor:'#333366',
		borderRadius:5
	});
		
	var glabel = Ti.UI.createLabel({
		top:5,
		left:20,
		font:{fontSize:12,fontWeight:'bold', fontFamily:'Arial'},
	});
	
	var slabel = Ti.UI.createLabel({
		 top:18,
		 left:20,
		 font:{fontSize:12,fontWeight:'bold', fontFamily:'Arial'},
	});
		 
	introview.add(glabel);
	introview.add(slabel);
	self.glabel = glabel;
	self.slabel = slabel;
		
//	undoButton.top = introview.top+introview.height;	
//	tokenLabel.top=undoButton.top;
	board.top=introview.top+introview.height;							
	cwin.add(board);
	
	self.notation.top = board.top + board.height;
	cwin.add(self.notation);
	
	cwin.add(introview);
	

	var resetButton = Ti.UI.createButton({
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/closebutton.png',
		left:2,
		top:3,
		width:30,
		height:30
	});
		
	resetButton.addEventListener("click",function(){
		
		myChess.tabGroup.setActiveTab(0);
//		ChessPuzzle.Engine.ResetGame();
		myChess.startview.failGame();
	});
//	cwin.add(resetButton);

	var resultView = Ti.UI.createImageView({
		width:180,
		height:100,
		left:-1000,
		top:180
	});
	
	resultView.win = function(){
		this.image = Ti.Filesystem.resourcesDirectory+'images/resultwon.png';
		this.left = 70;
		
		myChess.chessObj.game.open = true;
		
		myChess.startview.winGame();
		
	};
	resultView.lost = function(){
		this.image = Ti.Filesystem.resourcesDirectory+'images/resultfail.png';
		this.left = 70;
		myChess.startview.failGame();
		
	};
	resultView.draw = function(){
		this.image = Ti.Filesystem.resourcesDirectory+'images/resultdraw.png';
		this.left = 70;
		myChess.startview.failGame();
	};
	resultView.addEventListener('click',function(){
//Ti.API.info("RESULT VIEW CLICK");		
		this.left = -1000;

		myChess.tabGroup.setActiveTab(0);
	});
//	cwin.add(resultView);
	ChessPuzzle.ResultView = resultView;
	
	cwin.add(ChessPuzzle.ResultView);	

	self.mview = cwin;	
Ti.API.info("TOP:"+board.top+" "+undoButton.top+" "+introview.top+" "+introview.height);	

	var promoteViewW = Ti.UI.createView({
		width:myChess.width,
		height:120,
		left:0,
		top:200,
		toph:-myChess.height,
		backgroundColor:'black',
		pieceType:null
	});
	
	var pqbw = Ti.UI.createButton({
		//title:'Queen',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/piece60/wq.png',
		left:50
	});
	pqbw.addEventListener('click',function(){
		myChess.promotePiece.promoteAction('Q');
	});
	
	var prbw = Ti.UI.createButton({
		//title:'Rook',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/piece60/wr.png',
		left:110
	});
	prbw.addEventListener('click',function(){
		myChess.promotePiece.promoteAction('R');
	});
	
	var pbbw = Ti.UI.createButton({
		//title:'Bishop',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/piece60/wb.png',
		left:170
	});
	pbbw.addEventListener('click',function(){
		myChess.promotePiece.promoteAction('B');
	});
	
	var pnbw = Ti.UI.createButton({
		//title:'Night',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/piece60/wn.png',
		left:230
	});	
	pnbw.addEventListener('click',function(){
		myChess.promotePiece.promoteAction('N');
	});
	
	promoteViewW.add(pqbw);
	promoteViewW.add(prbw);
	promoteViewW.add(pbbw);
	promoteViewW.add(pnbw);
	
	var promoteViewB = Ti.UI.createView({
		width:myChess.width,
		height:120,
		left:0,
		top:200,
		tops:200,
		toph:-myChess.height,
		backgroundColor:'white',
		pieceType:null
	});
	
	var pqbb = Ti.UI.createButton({
		//title:'Queen',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/piece60/bq.png',
		left:50
	});
	pqbb.addEventListener('click',function(){
		myChess.promotePiece.promoteAction('Q');
	});
	
	var prbb = Ti.UI.createButton({
		//title:'Rook',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/piece60/br.png',
		left:110
	});
	prbb.addEventListener('click',function(){
		myChess.promotePiece.promoteAction('R');
	});
	
	var pbbb = Ti.UI.createButton({
		//title:'Bishop',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/piece60/bb.png',
		left:170
	});
	pbbb.addEventListener('click',function(){
		myChess.promotePiece.promoteAction('B');
	});
	
	var pnbb = Ti.UI.createButton({
		//title:'Night',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/piece60/bn.png',
		left:230
	});	
	pnbb.addEventListener('click',function(){
		myChess.promotePiece.promoteAction('N');
	});
	
	promoteViewB.add(pqbb);
	promoteViewB.add(prbb);
	promoteViewB.add(pbbb);
	promoteViewB.add(pnbb);
	
	self.pvW = promoteViewW;
	self.pvB = promoteViewB;
	
	
	
	self.setStatus = function(){
		this.mview.tokenLabel.text = myChess.record.token;
	};
	self.setStatusM = function(){
		this.mview.tokenLabel.text = " ";
	
		this.mview.minusLabel.right = this.mview.minusLabel.rights;
Ti.API.info("ml:"+this.mview.minusLabel.bottom+" | "+this.mview.minusLabel.rights);			
		this.mview.minusLabel.animate({
			right:this.mview.minusLabel.righth,
			duration:1000
		});
		this.mview.tokenLabel.text = myChess.record.token;
	};
	
	self.setIntroduction = function(go){
//		this.glabel.text="referenced:"+go.White+" Vs. "+go.Black;
		this.glabel.text=go.Simulate;
		this.slabel.text="CCGC (code:"+go.Gid+")";
	};
	
	self.initAGame = function(year){
		var record = myChess.record['y'+year];
		if(!record || record.length==0){
			myChess.record['y'+year] = myChess.record['g'+year];
			record = myChess.record['y'+year];
		}	
		
		var gi = record.pop();
		
		myChess.chessObj.game = myChess.games['y'+year][gi];
		myChess.chessObj.gameIndex = gi;
				
		myChess.gameView.setIntroduction(myChess.chessObj.game);
Ti.API.info("setPiecesFromFen:::"+myChess.chessObj.game.End);
				
		myChess.gameView.board.setPiecesFromFen(myChess.chessObj.game.End);
		ChessPuzzle.GameData.FENs = [];
				
		ChessPuzzle.GameData.SANs = [];
				
		myChess.gameView.undoButton.show();
		myChess.gameView.notation.setData([]);
	};
	
	 
				
	return self;
};

module.exports = Game;
