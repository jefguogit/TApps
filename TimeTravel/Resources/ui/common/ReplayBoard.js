function Board() {
	
	var gridSize = ChessPuzzle.GridSize;
//Ti.API.info("Board   gridSize>>>>>>>>>>>>"+gridSize);		
	
	var Grids = require('ui/common/Grids');
	myChess.Grids = new Grids();
	
	var Piece = require('ui/common/Piece');
	
//Ti.API.info("Board   init>>>>>>>>>>>>"+myChess.Grids +"  "+myChess.Pieces);		
	
	var board = Ti.UI.createView({
		width:gridSize*9,
		height:gridSize*9,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/chessboard.png",
		isFlip:false,
		borderColor:'green'
	});
	
	var gridArea = Ti.UI.createView({
		backgroundColor:'transparent',
		width: 8*gridSize,
		height:8*gridSize,
		left:1/2*gridSize,
		top:1/2*gridSize
	});

	board.add(gridArea);
	board.area = gridArea;
	
//Ti.API.info("Board gridArea  >>>>>>>>>>>>"+board.area);
	
	for(i=0; i<8; i++){
		for(j=0;j<8;j++){
			var apiece = new Piece();
			apiece.file = j;
			apiece.rank = i;
			myChess.Grids[i*8+j].piece = apiece;
			myChess.Grids[i*8+j].add(apiece);
			gridArea.add(myChess.Grids[i*8+j]);				
		}
	}
	
	myChess.board = board;
/*
	board.clear = function(){
		for(i=0; i<8; i++){
			for(j=0;j<8;j++){
				var piece1 = (myChess.Grids[i*8+j]).piece ;	
				if(piece1){			
					piece1.left = -200;
					piece1.top = -200;
					piece1.onboard = false;
					(myChess.Grids[i*8+j]).piece = null;
				}	
			}
		}
	};
*/	
	board.clearTargets = function(){
//Ti.API.info("clear Targers");		
		for(i=0; i<8; i++){
			for(j=0;j<8;j++){
				var piece = (myChess.Grids[i*8+j]).piece;	
				if(piece.isTarget){								
					piece.target(false);
				}	
			}
		}		
	};
	
	board.clearMarks = function(){
//Ti.API.info("clear Marks");		
		for(i=0; i<8; i++){
			for(j=0;j<8;j++){
				var piece = (myChess.Grids[i*8+j]).piece;	
				if(piece.isMark){								
					piece.mark(false);
				}	
			}
		}
	}	;
	
	board.getAPiece = function(pieceType){		
		for(var type=0;type<2;type++){					
			for(var no=0;no<16;no++){
				var p = myChess.Pieces[type][no];	
				if(p){										
					if(p.picType == pieceType){
						if(p.onboard == false){
							return p;
						}	
					}
				}else{
					Ti.API.error("piece not available -- "+type+" "+no);
				}						
			}					
		}		
		return null;	
	};
	
	board.getAnyPiece = function(){
		var ap = null;
		for(i=0; i<8; i++){
			for(j=0;j<8;j++){
				var ap = (myChess.Grids[i*8+j]).piece;	
				if(ap!=null){	
					break;
				}	
			}					
		}				
		return ap;	
	};
		
	board.getPieceOnBoard = function(x,y){			
		var piece = null;
		if(x<9 && y<9){
			var grid = myChess.Grids[y*8+x];
		    if(grid){		    	
		    	piece = grid.piece;
//		    	Ti.API.info("get piece =="+x+" "+y+" "+piece);
		    }			    
		}
		
		if(!piece){
//			Ti.API.error("Grid not available:"+x+"  "+y);
		}	
		
		return piece;
	};
	

	board.putPiece = function(x,y,gbv){		
		var grid = myChess.Grids[y*8+x];
		var np = grid.piece;
//Ti.API.info("BOARD putPiece("+x+" "+y+"):"+gbv+"  "+np);			
		np.setPiece(gbv);

//Ti.API.info("BOARD putPiece("+x+" "+y+"):"+np.image);		
	};
	
	board.putPieces = function(){

		var g_board = ChessPuzzle.Engine.g_board;
	    
	    for(var r=0; r<8; r++){
	    	for(var c=0; c<8; c++){
	    		var i = (r+2)*16+4+c;
	    		var gbv = g_board[i];
//Ti.API.info(r+" "+c+" : "+gbv);
	    		if(gbv==0 || (gbv>8 && gbv<23)){
		    		this.putPiece(c,r,gbv);
		    	}else{
		    		Ti.API.error('g_board error on '+r+"/"+c);
		    	}
	    	}
	    }
	};
	
	board.updatePieces = function(){
 
	    this.putPieces();
//Ti.API.info("put pieces ... ");	 
	};
	
	board.setPiecesFromFen = function(fen){
//		this.clear();
Ti.API.info("set fen");
		ChessPuzzle.Engine.ResetGame();
		var result = ChessPuzzle.Engine.InitializeFromFen(fen);
		Ti.API.info(">> g_toMove:"+ChessPuzzle.Engine.g_toMove+"    fen:"+fen+"   "+this.isFlip);
		
		if(result) {
//			alert(result);
			return false;
		}
				    
		this.putPieces();

	    myChess.gameView.undoButton.clicked = true;	
	    
	    if(ChessPuzzle.Engine.g_toMove==8){
			ChessPuzzle.GameData.turnColor = 'white';
			ChessPuzzle.GameData.playerColor = 'white';
			if(!this.isFlip){
				this.flip();
			}	
		}else{
			ChessPuzzle.GameData.turnColor = 'black';
			ChessPuzzle.GameData.playerColor = 'black';
			if(this.isFlip){
				this.unflip();
			}	
		}
		return true;
	};	
	
	board.setPiecesFromFen1 = function(fen){
//		this.clear();
Ti.API.info("set fen1");		
		ChessPuzzle.Engine.ResetGame();
		var result = ChessPuzzle.Engine.InitializeFromFen(fen);
		
		if(result) {
//			alert(result);
			return false;
		}
				    
		this.putPieces();

	    myChess.gameView.undoButton.clicked = true;	
	    
	    if(ChessPuzzle.Engine.g_toMove==8){
			ChessPuzzle.GameData.turnColor = 'white';
			ChessPuzzle.GameData.playerColor = 'white';
//			this.flip();
		}else{
			ChessPuzzle.GameData.turnColor = 'black';
			ChessPuzzle.GameData.playerColor = 'black';
//			this.flip();
		}
		return true;
	};		
	
	board.markGrid = function(p1, p2){
		
		this.clearMarks();
	
		this.clearTargets();
					
		p1.mark(true);
		p2.mark(true);

	};
	
	
	board.flip = function(){
		this.setTransform(Ti.UI.create2DMatrix({ rotate: 180 }));
		for(i=0; i<8; i++){
			for(j=0;j<8;j++){
				var apiece = myChess.Grids[i*8+j].piece;
//				Ti.API.info(i+" "+j+apiece);
				apiece.setTransform(Ti.UI.create2DMatrix({ rotate: 180 }));				
			}
		}
		this.backgroundImage = 'images/chessboard1.png';
		Ti.API.info("FLIP --- "+this.backgroundImage);		
		
		this.isFlip = true;

	}	;	
	
	board.unflip = function(){
		this.setTransform(Ti.UI.create2DMatrix({ rotate: 0 }));
		for(i=0; i<8; i++){
			for(j=0;j<8;j++){
				var apiece = myChess.Grids[i*8+j].piece;
//				Ti.API.info(i+" "+j+apiece);
				apiece.setTransform(Ti.UI.create2DMatrix({ rotate: 0 }));				
			}
		}
		this.backgroundImage = 'images/chessboard.png';
		Ti.API.info("FLIP --- "+this.backgroundImage);		
		
		this.isFlip = false;

	}	;	
	
	board.oneMove = function(){
Ti.API.info("one move");		
		var ncount = 1;
		var cc=0;
		var notation = myChess.chessObj.game.Gid+":";
		{
			var piece = this.getAnyPiece();
			if(piece){
				try{
					ChessPuzzle.Engine.g_timeout = 5000;
//					var movePosition = ChessPuzzle.Engine.Search(99);
					var cmove = piece.ComputerMove(5000,99);
									
					piece.addNotation(cmove,1);
					
					if(ChessPuzzle.Engine.g_toMove==8){
						ChessPuzzle.GameData.turnColor = 'white';
						ChessPuzzle.GameData.playerColor = 'white';
//						this.flip();
					}else{
						ChessPuzzle.GameData.turnColor = 'black';
						ChessPuzzle.GameData.playerColor = 'black';
//						this.flip();
					}

					if(cmove.indexOf("#")>0){
						Ti.API.info("Mate!!!!");
					}else if(cmove.indexOf("~")>0){
						Ti.API.info("DRAW!!!!");
					}
				}catch(e){
					Ti.API.info("error:"+e);
				}	
			}else{
				Ti.API.info("PIECE not available.");
			}	
		}	
	};
	
	board.MoveOne = function(moveStr, count){
Ti.API.info(" move one:"+moveStr);		
		
		var move = ChessPuzzle.Engine.GetMoveFromSAN(moveStr);
Ti.API.info(" move one   :"+move);		

if(!move){
	Ti.API.error("move not available");
	return;
}


//		 	ChessPuzzle.Engine.g_allMoves[cEngine.g_allMoves.length] = move;
           	ChessPuzzle.Engine.MakeMove(move);

		var me = ChessPuzzle.Engine.g_toMove >> 3;
		var otherColor = 8 - ChessPuzzle.Engine.g_toMove; 
	    
	    var flags = move & 0xFF0000;
	    var to = (move >> 8) & 0xFF;
	    var from = move & 0xFF;
	    
	    var sx = (from & 0xF) - 4;
	    var sy = (from >> 4)-2;
	    
	    var ex = (to & 0xF) - 4;
	    var ey = (to >> 4)-2;
	    
	    
	    
  //Ti.API.info("g_board:"+this.g_board.length+"  "+this.g_board);  
	    
	    var captured = ChessPuzzle.Engine.g_board[to];
	    var piece = ChessPuzzle.Engine.g_board[from];
	    
Ti.API.info("<<<< "+move+"  "+from+" "+to+" "+captured+" "+piece+"  "+sx+"|"+sy+"   "+ex+"|"+ey);
	
//		ChessPuzzle.Engine.MakeMove(move);
		
//		var movePosition = ChessPuzzle.Engine.FinishPlay(move);
		
		var gridstart = myChess.Grids[sy*8+sx];
        var gridend = myChess.Grids[ey*8+ex];
//Ti.API.info("grids:"+gridstart.piece.image+"  "+gridend.piece.image);   

		this.markGrid(gridstart.piece, gridend.piece);
Ti.API.info("marked");	  

		this.updatePieces();
Ti.API.info("Updated");		
    	  				
		setTimeout(function(){			
				myChess.Replay.step++;	
    			myChess.Replay.nextMove();
		},2000);	
	};
	
	
	board.autoPly = function(){
		var ncount = 1;
		var cc=0;
		var notation = myChess.chessObj.game.Gid+":";
		while(true){
			var piece = this.getAnyPiece();
			if(piece){
				try{
					ChessPuzzle.Engine.g_timeout = 3000;
					var movePosition = ChessPuzzle.Engine.Search(99);
        			var cmove = movePosition.move;
        			
 
					
		/*		
				piece.addNotation(cmove,ncount);
				if(ncount==1){
					ncount=2;
				}else{
					ncount=1;
				}
		*/		
					notation+=cmove+" ";
					cc++;
					Ti.API.info(cc+":"+cmove);
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
			}else{
				Ti.API.info("PIECE not available.");
				cc=100;
			}	
			if(cc>50){
				break;
			}
		}	
	};
	
	return board;
}

module.exports = Board;



