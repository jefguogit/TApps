function Piece() {
	
//	var types =  ['p','p','p','p','p','p','p','p','R','N','B','Q','K','B','N','R'];
	var types =  [1,1,1,1,1,1,1,1,4,2,3,5,6,3,2,4];

	
	self = Ti.UI.createImageView({
			width:ChessPuzzle.PieceSize,
			height:ChessPuzzle.PieceSize,
			left:0,
			top:0,
			isTarget:false,
			isMark:false
	});

	self.putImage = function(){
		if(this.isMark){
			this.image = this.img3;
			return;
		}
		if(this.isTarget){
			this.image = this.img2;
			return;
		}
		this.image = this.img;	
	};
	
	self.target = function(flag){
		if(flag == true){
			this.image = this.img2;
			this.isTarget = true;
		}else{
			if(this.isMark){
				this.image = this.img3;
			}else{	
				this.image = this.img;
			}	
			this.isTarget = false;
		}	
	};
	
	self.mark = function(flag){
//Ti.API.info("Mark  "+this.image+"   "+this.img3);	
		if(flag == true){
//			this.image = this.img3;
			this.isMark = true;
		}else{
			if(this.isTarget){
				this.image = this.img2;
			}else{
				this.image = this.img;
			}	
			this.isMark = false;
		}	
	};
	
	self.setPiece = function(picType){
		var pa = ChessPuzzle.Constant.pieceImage;
		this.picType = picType;
		var pic = pa[this.picType];
		this.img = Ti.Filesystem.resourcesDirectory+"images/piece60/"+pic+".png";
		this.img1 = Ti.Filesystem.resourcesDirectory+"images/piece60/"+pic+"1.png";
		this.img2 = Ti.Filesystem.resourcesDirectory+"images/piece60/"+pic+"2.png";
		this.img3 = Ti.Filesystem.resourcesDirectory+"images/piece60/"+pic+"3.png";			
		
//Ti.API.info("piece:"+this.picType+"  "+pic+" |||    "+this.img);		
		this.putImage();
		
		if(picType == 0){
			this.color = 'none';
		}else if(picType<15){
			this.color = 'white';
		}else{
			this.color = 'black';
		}
	};
	
	self.focus = function(){
		if(this.color == ChessPuzzle.GameData.playerColor && this.color == ChessPuzzle.GameData.turnColor){
			
			if(ChessPuzzle.FocusPiece){
				ChessPuzzle.FocusPiece.putImage();
			}

			this.image = this.img1;
			ChessPuzzle.FocusPiece = this;	
			
			myChess.gameView.playerPiece = this;
			ChessPuzzle.Pickpiece = true;
		}						
	};	
	
	self.getPosition = function(e){
//			var point = this.convertPointToView({x:e.x,y:e.y}, ChessPuzzle.Game.board.area);
			
			var sx = Math.floor(e.x/ChessPuzzle.GridSize);
			var sy = Math.floor(e.y/ChessPuzzle.GridSize);
						
			return {x:e.x, y:e.y, col:sx, row:sy };
	};
	
	self.pick = function(e){
//		Ti.API.info("pick piece"+this.picType);		

		if(this.color == ChessPuzzle.GameData.playerColor && this.color == ChessPuzzle.GameData.turnColor){
			this.offx = e.x%ChessPuzzle.GridSize;
			this.offy = e.y%ChessPuzzle.GridSize;
			myChess.gameView.playerPiece = this;			
			ChessPuzzle.Pickpiece = true;
			ChessPuzzle.dragable = true;
		}else if(this.color != ChessPuzzle.GameData.playerColor && this.color != ChessPuzzle.GameData.turnColor){
			ChessPuzzle.dragable = false;	
			var point = this.getPosition(e);	
			myChess.gameView.playerPiece.dropPiece(point.col,point.row);
		}
	};
	
	self.position = function(x,y){				
		if(x<9 && y<9){
			var grid = ChessPuzzle.Grids[y*8+x];
		    this.left = grid.pleft;
			this.top = grid.ptop;
			this.onboard = true;
			this.file = x;
			this.rank = y;
						
			grid.piece = this;
		}		
	};
	
	self.getout = function(){			
//Ti.API.info("PIECE P:"+this.rank+" "+this.file);			
		if(this.rank>-1 && this.rank<8 && this.file>-1 && this.file<8){
						
			var grid = ChessPuzzle.Grids[this.rank*8+this.file];
			grid.piece = null;
			
//			Ti.API.info("Clear Piece:"+this.file+" "+this.rank+" "+this.picType);		    
			this.onboard = false;
			this.left = -200;
			this.top = -200;
			this.file = -1;
			this.rank = -1;
		}			
	};
	
	self.update = function(x,y){	
		
		var grid = ChessPuzzle.Grids[y*8+x];
		
		var np = grid.piece;
			
	    if(np){
	    	if(np.picType == this.picType){
	    		return;
	    	}else{
	    		np.getout();  //remove piece
	    	}
	    }			
		this.position(x,y);
			
	};
	
	self.addNotation = function(move, no){
		
//Ti.API.info("Len == "+ChessPuzzle.GameData.SANs.length+" "+move);	
//	var san = ChessPuzzle.Engine.GetMoveSAN(move);
Ti.API.info("addNotation >> "+move+">"+no);
var san = move;
		if(no == 1){		
			var row = [];
			row[0]=san;
			row[1]="";
			ChessPuzzle.GameData.SANs.push(row);
		}else{
			var row = ChessPuzzle.GameData.SANs.pop();
			row[1]=san;
			ChessPuzzle.GameData.SANs.push(row);				
		}						
		
		var len = ChessPuzzle.GameData.SANs.length;
//Ti.API.info("len = "+len+"  "+ChessPuzzle.GameData.SANs[len-1][0]+" "+ChessPuzzle.GameData.SANs[len-1][1]);
		
		myChess.gameView.addNotation();
	};
	
	self.getMove = function(startPiece, endPiece){
		
/*		ChessPuzzle.Game.board.clearMarks();

		var gridstart = ChessPuzzle.Grids[piece.file+8*piece.rank];
		gridstart.piece.isMark = true;
		var gridend = ChessPuzzle.Grids[ex+8*ey];
		gridend.piece.isMark = true;
		
		if(gridend.piece){			
			gridend.piece.getout();
		}
				
		piece.left = gridend.pleft;
		piece.top = gridend.ptop;
			
		piece.file = ex;
		piece.rank = ey;
		
		gridend.piece = piece;
		gridstart.piece = null;	
*/		
		myChess.gameView.board.markGrid(startPiece, endPiece);
		
		myChess.gameView.board.updatePieces();
//Ti.API.info("Mark --- "+startPiece.image+"    "+endPiece.image);		
		
		
//		piece.putImage();
		
	};
	

		
	
	self.getPromote = function(piece, ex, ey, promote){
		var gridstart = ChessPuzzle.Grids[piece.file+8*piece.rank];
		var gridend = ChessPuzzle.Grids[ex+8*ey];
		
		if(gridend.piece){			
			gridend.piece.getout();
		}
				
		piece.left = gridend.pleft;
		piece.top = gridend.ptop;
			
		piece.file = ex;
		piece.rank = ey;
		
		gridend.piece = piece;
		gridstart.piece = null;	
		
		piece.setPiece(promote);
		myChess.gameView.board.updatePieces();
		
		myChess.gameView.board.markGrid(gridstart, gridend);
		
	};	
	
	self.ComputerMove = function(timeout,maxPly){
		
		myChess.gameView.mview.control.think();
		
		ChessPuzzle.Engine.g_timeout = timeout;
//Ti.API.info("g_board1:"+ChessPuzzle.Engine.g_board[155]);
//Ti.API.info("g_pieceList::::"+ChessPuzzle.Engine.g_pieceList); 			
        var movePosition = ChessPuzzle.Engine.Search(maxPly);
        
//        Ti.API.info("movePosition:"+movePosition.sx+" "+movePosition.sy+" "+movePosition.ex+" "+movePosition.ey);

        var gridstart = ChessPuzzle.Grids[movePosition.sy*8+movePosition.sx];
        var gridend = ChessPuzzle.Grids[movePosition.ey*8+movePosition.ex];
        
        this.getMove(gridstart.piece, gridend.piece);
        
        ChessPuzzle.GameData.Marks.push({g1:gridstart, g2:ChessPuzzle.Grids[8*movePosition.ey+movePosition.ex]});
				
		ChessPuzzle.GameData.turnColor = ChessPuzzle.GameData.playerColor;    
		
		var fen = ChessPuzzle.Engine.GetFen();
//		var ufen = ((movePosition.sy*8+movePosition.sx)*100+movePosition.ey*8+movePosition.ex)+" "+fen;
//		Ti.API.info("push fenu ==== "+fen+" "+ChessPuzzle.GameData.FENs);
		ChessPuzzle.GameData.FENs.push({p1:gridstart.piece,p2:gridend.piece,fen:fen});
//	Ti.API.info("push fens:"+ChessPuzzle.GameData.FENs);	
		myChess.gameView.mview.control.play();
				
		return movePosition.move;    
	};
	
	self.dropPiece = function(endPiece){
		
		var cEngine = ChessPuzzle.Engine;

		myChess.gameView.undoButton.enabled = false;
		myChess.gameView.undoButton.hide();
//		myChess.gameView.undoButton.backgroundImage = Ti.Filesystem.resourcesDirectory+'images/undobi.png';
		
		var startx = this.file;
		var starty = this.rank;
		var endx = endPiece.file;
		var endy = endPiece.rank;
Ti.API.info("drop:"+startx+" "+starty+" "+endx+" "+endy);	


//Ti.API.info("g_board:"+cEngine.g_board);		
		

		var moves = cEngine.GenerateValidMoves();
        var move = null;
        var promote = null;
Ti.API.info("moves:"+moves+"  "+cEngine.g_toMove);    
Ti.API.info(startx+" "+starty+" "+endx+" "+endy+"  "+ChessPuzzle.Engine.MakeSquare(starty, startx) +"  "+ChessPuzzle.Engine.MakeSquare(endy, endx));     
 		var nm = [];       
        for (var i = 0; i < moves.length; i++) {
     Ti.API.info("move"+i+": "+cEngine.GetMoveSAN(moves[i])+moves[i]+" "+(moves[i] & 0xFF)+" "+((moves[i] >> 8) & 0xFF));   	       	
            if ((moves[i] & 0xFF) == ChessPuzzle.Engine.MakeSquare(starty, startx) &&
                ((moves[i] >> 8) & 0xFF) == ChessPuzzle.Engine.MakeSquare(endy, endx)) {
                //move = moves[i];
                nm.push(moves[i]);               
            }            
        }
        if(nm.length==1){
        	move = nm[0];
        	this.dropPieceMove(move, endPiece);
        	
        }else if(nm.length>1){

 			myChess.promotePiece = this; 
 			myChess.promoteMoves = nm;    	
 			myChess.endPiece = endPiece;
 			
 			if(this.color=='white'){
 				this.promoteV = myChess.gameView.pvW;
 			}else{
 				this.promoteV = myChess.gameView.pvB;
 			}	
        	myChess.gameView.mview.add(this.promoteV);
        }
	
	};
	
	self.promoteAction = function(type){
		myChess.gameView.mview.remove(this.promoteV);
		var nm = myChess.promoteMoves;
		if(nm!=null){
			    for(var j=0; j<nm.length;j++){
        			var mov = nm[j];
        			var moveSan = ChessPuzzle.Engine.GetMoveSAN(mov);
Ti.API.info("PROMOTE"+j+":"+mov+'  '+moveSan);   
        			if(moveSan.indexOf('='+type)>0){
        				this.dropPieceMove(mov, myChess.endPiece);
        				return;
        			}
        		}
//        	this.dropPieceMove(mov, myChess.endPiece);
//        	return;	
		}
		return;		
	}; 
	
	self.dropPieceMove = function(move, endPiece){
		
			var cEngine = ChessPuzzle.Engine;
		            
          	var movSan = cEngine.GetMoveSAN(move);
 Ti.API.info("movSan == "+movSan);         	
           	cEngine.g_allMoves[cEngine.g_allMoves.length] = move;
           	cEngine.MakeMove(move);
//Ti.API.info("g_board::::"+cEngine.g_board); 
            var fen = cEngine.GetFen();
            Ti.API.info("FEN==="+fen+"   "+cEngine.g_castleRights);

           
				this.getMove(this, endPiece);
				if(movSan.indexOf("~")>0){
 Ti.API.info("add Ano 1 == "+movSan+this);  					
					self.addNotation(movSan.substring(0,movSan.length-1),1);
				}else{
 Ti.API.info("add  Ano2 == "+movSan+this); 
 if(movSan=="Qh2+"){
 	Ti.API.info("CHECK THIS");
 } 
					self.addNotation(movSan,1);
				}
					
				myChess.gameView.undoButton.clicked = false;
				myChess.gameView.undoButton.enabled = false;
				myChess.gameView.undoButton.hide();
//				myChess.gameView.undoButton.backgroundImage = Ti.Filesystem.resourcesDirectory+'images/undobi.png';
				
//				ChessPuzzle.Grids[8*starty+startx].piece = null;
				
				ChessPuzzle.GameData.turnColor = (ChessPuzzle.GameData.playerColor == 'white')?'black':'white';				
				
				if(movSan.indexOf("#")>0){
					ChessPuzzle.ResultView.win();
					return;
				}else if(movSan.indexOf("~")>0){
					ChessPuzzle.ResultView.draw();
					return;
				}
				
				var cmove = this.ComputerMove(2000,99);
 Ti.API.info("add Ano3 == "+cmove);  
				self.addNotation(cmove,2);
				

				myChess.gameView.undoButton.clicked = false;
	
//Ti.API.info("check?? "+ChessPuzzle.Engine.GenerateValidMoves().length+" - "+ChessPuzzle.Engine.g_inCheck);				
/*				if (ChessPuzzle.Engine.GenerateValidMoves().length == 0) {
	       			 if(ChessPuzzle.Engine.g_inCheck){
	       			 	ChessPuzzle.ResultView.lost();
	       			 }else{
	       			 	ChessPuzzle.ResultView.draw();
	       			 }	
	   			 } 
*/	   			 
				var moves = ChessPuzzle.Engine.GenerateValidMoves();
				if((moves==null)||(moves.length==0)){
					if(ChessPuzzle.Engine.g_inCheck){
	       			 	ChessPuzzle.ResultView.lost();
	       			 }else{
	       			 	ChessPuzzle.ResultView.draw();
	       			 }		       			 
				}

			myChess.gameView.board.updatePieces();	

		myChess.gameView.undoButton.enabled = true;	
		myChess.gameView.undoButton.show();
		
	};
	
	self.getMovePositions = function(piece){
		var movePositions = new Array();
		var moves = ChessPuzzle.Engine.GenerateValidMoves();	
//Ti.API.info('GenerateAllMoves:'+moves+"   "+ChessPuzzle.Engine.g_toMove);			
		var count = moves.length;	
		for(var mi=0; mi<count; mi++) {	
			
				var from = moves[mi] % 256;
		    	var to = (Math.floor(moves[mi]/256) % 256);
		    	
		    	var sx = (from & 0xF) - 4;
			    var sy = (from >> 4)-2;
			    
			    var ex = (to & 0xF) - 4;
			    var ey = (to >> 4)-2;
//		   }
		   
		    if(sx==piece.file && sy==piece.rank){
				movePositions.push({sx:sx,sy:sy,ex:ex,ey:ey});
//				Ti.API.info(mi+"  "+moves[mi]+"   "+ChessPuzzle.Engine.GetMoveSAN(moves[mi]));
			}	
		}      	 
		return movePositions;
	};	
		
	self.addEventListener('click', function(e){	
//Ti.API.info("CLICK --- "+this.color+" "+this.picType+" "+ChessPuzzle.GameData.playerColor+" "+ChessPuzzle.GameData.turnColor+" "+this.file+" "+this.rank+" "+this.isTarget+" "+ChessPuzzle.Pickpiece);
		
//Ti.API.info("flag:"+ChessPuzzle.Engine.moveflagEPC+" "+ChessPuzzle.Engine.moveflagCastleKing+" "+ChessPuzzle.Engine.moveflagCastleQueen+" "+ChessPuzzle.Engine.moveflagPromotion+" "+ChessPuzzle.Engine.moveflagPromoteKnight+" "+ChessPuzzle.Engine.moveflagPromoteQueen+" "+ChessPuzzle.Engine.moveflagPromoteBishop);

		if(ChessPuzzle.GameData.playerColor == ChessPuzzle.GameData.turnColor){
			
			if(ChessPuzzle.GameData.playerColor == this.color){
				
				ChessPuzzle.board.clearTargets();
				
				var mps = this.getMovePositions(this);
				for (var i = 0; i < mps.length; i++) {
                	this.focus();
                	var grid = ChessPuzzle.Grids[8*mps[i].ey+mps[i].ex];
// Ti.API.info(i+"  "+mps[i]+"   "+mps[i].ex+"  "+mps[i].ey+"  "+grid);               	
                	var piece = grid.piece;
                	piece.target(true);
                	//grid.backgroundImage = grid.bg2;
                }		              
            }else if(ChessPuzzle.Pickpiece && this.isTarget){
//	            Ti.API.info("target:::"+this.file+" "+this.rank);
	            myChess.gameView.playerPiece.dropPiece(this);                	
            }   
        }
	});
	
	self.addEventListener('movestart', function(e){
//		Ti.API.info("movestart --- movestart");
	});		
	
	self.setPiece(self.picType);		

	return self;
}

module.exports = Piece;


