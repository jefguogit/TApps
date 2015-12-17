function ChessObject(size) {
	
	myChess.chessObj = {};
	
	myChess.chessObj.gameIndex = 0;
	myChess.chessObj.currentMove = 0;
	myChess.chessObj.typesOfPieces = ['p','p','p','p','p','p','p','p','R','N','B','Q','K','B','N','R'];
	
//	myChess.chessObj.game = myChess.Games[myChess.PlayerIndex].games[myChess.chessObj.gameIndex]; 

//	Ti.API.info("chess widget:"+myChess.width+"   "+myChess.chessObj.game);
	
	var boardSize = myChess.boardSize;

//	Ti.API.info("boardSize:"+boardSize);
	var gridSize = boardSize/9;
//	Ti.API.info("grid size:"+gridSize);	
	
	myChess.chessObj.board = Ti.UI.createView({
		left:0,
		top:7,
		width:boardSize,
		height:boardSize,
//		backgroundColor:'orange'
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/chessboard.png"
	});
	
	var gridArea = Ti.UI.createView({
		backgroundColor:'yellow',
		width: 8*gridSize,
		height:8*gridSize,
		left:1/2*gridSize,
		top:1/2*gridSize
	})
		
	myChess.chessObj.board.add(gridArea);
	myChess.chessObj.board.area = gridArea;
//		game: game,
	myChess.chessObj.playModeInProgress = false;
	myChess.chessObj.playingSpeed = 2000;

	
// create boardPieces
	myChess.chessObj.boardPieces = new Array(2);
	myChess.chessObj.boardPieces[0] = new Array(16);
	myChess.chessObj.boardPieces[1] = new Array(16);
	var types =  ['p','p','p','p','p','p','p','p','R','N','B','Q','K','B','N','R'];
	var ConstantClass = require('ui/common/Constant');
	myChess.Constant = new ConstantClass();
	var pa = myChess.Constant.pieces;
	
//create boardGrids

	myChess.chessObj.grids = new Array(8);
	for (i = 0; i < 8; ++i) {
	  myChess.chessObj.grids[i] = new Array(8);
      for (j = 0; j < 8; ++j) {
    	
      	var aGrid = Ti.UI.createView({
      		width:gridSize+1,
      		height:gridSize,
      		left:j*gridSize,
      		top:i*gridSize,
      		pleft:j*gridSize+gridSize/16,
      		ptop:i*gridSize+gridSize/16,
			left1:j*gridSize,
			top1:i*gridSize,
			left2:j*gridSize+3,
			top2:i*gridSize+3,			
      		size1:gridSize+1,
      		size2:gridSize-6,			
      		piece:null
      	});
      	if((i+j)%2 == 0){
			aGrid.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/gridLight.png";
		}else{
			aGrid.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/gridDark.png";
		}
// 		Ti.API.info("init board:"+size+"   "+aGrid.left+"   "+aGrid.top+"   "+aGrid.backgroundImage);       	

       	myChess.chessObj.grids[i][j]=aGrid;
       	gridArea.add(aGrid);
      }
    }	
	
	
	var pieceSize = gridSize*7/8;
	
//	addmark(pieceSize)
	
//Ti.API.info("piece size:"+pieceSize);	
	for(var type=0;type<2;type++){
		if(type==0)color = 'w'; else color = 'b';
				
		for(var no=0;no<types.length;no++){

			var apa = pa[type][no];
//Ti.API.info('apa:'+apa.pf+' '+apa.pr+' '+types[no]);			
			var aPiece = createPiece(apa.pf,apa.pr,pieceSize,apa.picType,apa.name);
			
			myChess.chessObj.boardPieces[type][no] = new Array();
			myChess.chessObj.boardPieces[type][no]['x'] = apa.pf;					
			myChess.chessObj.boardPieces[type][no]['y'] = apa.pr;
			myChess.chessObj.boardPieces[type][no]['obj'] = aPiece;
			myChess.chessObj.boardPieces[type][no]['pieceType'] = types[no];
			myChess.chessObj.boardPieces[type][no]['onboard'] = true;
			
			if(type==0){
				myChess.chessObj.boardPieces[type][no]['picType'] = 'w'+types[no];
			}else{
				myChess.chessObj.boardPieces[type][no]['picType'] = 'b'+types[no];
			}
			
//			setPieceImage(myChess.chessObj.boardPieces[type][no]);
			gridArea.add(aPiece);
			
//Ti.API.info("PICTYPE:"+myChess.chessObj.boardPieces[type][no]['picType']);			
		}	
		
	}			

	myChess.chessObj.focus = new Array(2);
	myChess.chessObj.focus[0] = null;
	myChess.chessObj.focus[1] = null;
	
	
	var resultlabel = Ti.UI.createButton({
		height:50,
		width:boardSize/2,
		left:boardSize/4,
		top:-500,
		backgroundColor:'white',
		opacity:0.5,
		color:'black'
	});
	
	resultlabel.addEventListener('click',function(){
		this.fireEvent('hide');
	});
	
	resultlabel.addEventListener('hide',function(){
//		Ti.API.info("to hide");
		this.top = -500;
	});	

	resultlabel.addEventListener('show', function(){
//		Ti.API.info("the end");
		if(myChess.chessObj.game.Result == '1-0'){
			this.title = 'White Won   '+myChess.chessObj.game.Result;
		}else if(myChess.chessObj.game.Result == '0-1'){
			this.title = 'Black Won   '+myChess.chessObj.game.Result;
		}else{
			this.title = 'Draw   '+myChess.chessObj.game.Result;
		}	
		this.top = boardSize/2-25;
	});	
	
	myChess.chessObj.board.add(resultlabel);
	myChess.chessObj.resultV = resultlabel;
	
	return true;
};

module.exports = ChessObject;


function addmark(size){
//Ti.API.info("pic:"+pic);
//	var base64 = pic.replace(/^data:image\/(png|jpg);base64,/, "") ;
//	var blob = Ti.Utils.base64decode(base64);           

	for(i=0;i<8;i++){
		var num = Ti.UI.createLabel({
			width:size/2,
			height:size,
			left:10,
			top:10,
			text:i
		});
		myChess.chessObj.board.add(num);
	}	

}


function setPieces(size){

	var types =  ['p','p','p','p','p','p','p','p','r','n','b','q','k','b','n','r'];
	var ConstantClass = require('ui/common/Constant');
	var constant = new ConstantClass();
	var pa = constant.pieces;
	
	var size = board.width/9;
	
	var boardPieces = new Array();
	boardPieces[0] = new Array();	// Array of white chess pieces
	boardPieces[1] = new Array();	// Array of black chess pieces


	for(var type=0;type<2;type++){
		if(type==0)color = 'w'; else color = 'b';

//Ti.API.info("typesOfPieces:"+types.length);				
		for(var no=0;no<types.length;no++){
				//	if(no==8)row=1;
				//	var xPos = (no*csp) - (row*csp*8);
				//	var yPos = (row*posMultiply) * csp + yOffset;	
				
			var apa = pa[type][no];
//Ti.API.info('apa:'+apa.pf+' '+apa.pr+' '+types[no]);			
			var aPiece = createPiece(apa.pf,apa.pr,size,apa.img,apa.name);
			myChess.chessObj.board.add(aPiece);
			
			boardPieces[type][no] = new Array();
			boardPieces[type][no]['x'] = apa.pf + 1;					
			boardPieces[type][no]['y'] = apa.pr;
			boardPieces[type][no]['obj'] = aPiece;
			if(type=0){
				boardPieces[type][no]['pieceType'] = types[no];
			}
			boardPieces[type][no]['pieceType'] = types[no];
			boardPieces[type][no]['onboard'] = true;

//			setaPiece(apa.pf,apa.pr,aPiece,board);
		}	
		
	}				
	
	outputBoardPieces(boardPieces,"in");
	
	return boardPieces;

	


}

function createPiece(f,r,size,picType,name){
//Ti.API.info("pic:"+pic);
//	var base64 = pic.replace(/^data:image\/(png|jpg);base64,/, "") ;
//	var blob = Ti.Utils.base64decode(base64);           

	var piece = Ti.UI.createImageView({
			width:size,
			height:size,
			left:-200,
			top:-200,
			file:f,
			rank:r,
			picType:picType,
			name:name,
			onboard:true
	});

	
	return piece;
}

function setPieceImage(piece){
	var picType = piece['picType'];
	
	var pa = myChess.Constant.pieceImage;
	var pic = pa[picType];
	
//Ti.API.info("SET IMAGE:"+picType+"  "+pic);	

//	var base64 = pic.replace(/^data:image\/(png|jpg);base64,/, "") ;
//	var blob = Ti.Utils.base64decode(base64);           

//	piece['obj'].image = blob;
	piece['obj'].image = Ti.Filesystem.resourcesDirectory+"images/piece60/"+pic+".png";
//Ti.API.info("image:"+piece['obj'].image+"   "+piece+"   "+picType);
}



myChess.f.resetPieces = function(){
	putPieces(0);
	myChess.reset = false;
}	
	
myChess.f.moveBackward = function(){
	var moves = myChess.chessObj.moves;
//	Ti.API.info("move:"+moves);
	if(!moves) return;
	
	newMove = myChess.chessObj.currentMove/1 - 1;
//	Ti.API.info('newMove:'+newMove);
	if(newMove<0) {
		newMove = 0;
	}
	
	putPieces(newMove);
	focusMoves(false);
}
	
	
myChess.f.moveForward = function(){
	
	if(myChess.chessObj.currentMove < 0){
		return;
	}

	var moves = myChess.chessObj.moves;
//	alert("move:"+moves);
	if(!moves) return;
	
//	var maxMoves = moves.length * 2 - (moves[moves.length-1].length==1?1:0);
	newMove = myChess.chessObj.currentMove/1 + 1;
	if(newMove>myChess.chessObj.maxMoves) return;

//		Ti.API.info('new move:'+newMove+"  "+myChess.chessObj.pieceStatus[newMove]);
//	moveOnBoard(newMove);
	movePieces(newMove);
}

myChess.f.moveTo = function(mt){
	var moves = myChess.chessObj.moves;
//	alert("move:"+moves);
	if(!moves) return;
	
	var maxMoves = moves.length * 2 - (moves[moves.length-1].length==1?1:0);

	if(mt>maxMoves) return;

//		Ti.API.info('new move:'+newMove);
//	moveOnBoard(newMove);
	movePieces(mt);
}

		

myChess.f.play = function(){
//	Ti.API.info("start play");
	myChess.chessObj.playModeInProgress = true;
	processPlay();
			
}
	
myChess.f.pause = function (){
	myChess.chessObj.playModeInProgress = false;
}


	
function processPlay(){
	
//			Ti.API.info(myChess.chessObj.playingSpeed);
	if(myChess.chessObj.playModeInProgress){
		myChess.f.moveForward();
//				alert(myChess.chessObj.playingSpeed);
		myChess.chessObj.pTimer = setTimeout(function(){
			processPlay();
		},myChess.chessObj.playingSpeed);		
	}	
	

}
			

function resetBoard(){
//	Ti.API.info("reset Board");
	
	for(var type=0;type<2;type++){
		for(var no=0;no<16;no++){
//Ti.API.info(type+"-"+no);
			var pf = myChess.chessObj.boardPieces[type][no]['obj'].file;					
			var pr = myChess.chessObj.boardPieces[type][no]['obj'].rank;
	//		var aPiece = myChess.chessObj.boardPieces[type][no]['obj'];

	//		setaPiece(pf,pr,aPiece);
			
			myChess.chessObj.boardPieces[type][no]['x']=pf;
			myChess.chessObj.boardPieces[type][no]['y']=pr;
			myChess.chessObj.boardPieces[type][no]['pieceType'] = myChess.chessObj.typesOfPieces[no];
			if(type==0){
				myChess.chessObj.boardPieces[type][no]['picType'] = 'w'+myChess.chessObj.typesOfPieces[no];
			}else{
				myChess.chessObj.boardPieces[type][no]['picType'] = 'b'+myChess.chessObj.typesOfPieces[no];
			}						
			myChess.chessObj.boardPieces[type][no]['obj']['picType'] = myChess.chessObj.boardPieces[type][no]['picType'];			
			myChess.chessObj.boardPieces[type][no]['onboard']=true;			
		}
	}
	myChess.chessObj.currentMove = 0;	

//	resetNotation();	
}

function setBoard(){
//	Ti.API.info("set Board");
//	cleanPieces();

	
	for(var type=0;type<2;type++){
		for(var no=0;no<16;no++){
			if(myChess.chessObj.boardPieces[type][no]['onboard']==false){
				continue;
			}

			var pf = myChess.chessObj.boardPieces[type][no]['x'];					
			var pr = myChess.chessObj.boardPieces[type][no]['y'];

//Ti.API.info(type+"-"+no+"   "+pf+"  "+pr);			
			
			var grid = myChess.chessObj.grids[pr][pf-1];
			
			var piece = myChess.chessObj.boardPieces[type][no]['obj'];

//Ti.API.info(grid+":"+grid.left+"   "+grid.top+"  "+piece+":"+piece.left+"  "+piece.top);
			piece.left = grid.pleft;
			piece.top = grid.ptop;
			
		}
	}	
		
}

function translateAMove(whichMove,playerIndex){
/*	
	if(whichMove=='c3'){
		Ti.API.info(whichMove);
	}
*/	
	whichMove = whichMove.replace('#','');
	whichMove = whichMove.replace('+','');	
			
	var piecei=-1;		
			if(playerIndex==1) otherPlayerIndex = 0; else otherPlayerIndex = 1;
			if(whichMove=='O-O') {
				doCastle(true,playerIndex);
				return 16;
			}	
			if(whichMove=='O-O-O') {
				doCastle(false,playerIndex);
				return 17;
			}	
		
			var piecePromotion = false;
			var promoteTo = false;
					
			var takeAPiece = whichMove.indexOf('x')>0?true:false;		
			
			whichMove = whichMove.replace('x','');
			if(whichMove.indexOf('8=')>=0){
				piecePromotion = true;
				promoteTo = whichMove.replace(/.*?8=([A-Z])/gi,'$1');
				whichMove = whichMove.replace(/8=[A-Z]/gi,'8');	
			}
			if(whichMove.indexOf('1=')>=0){
				piecePromotion = true;
				promoteTo = whichMove.replace(/.*?1=([A-Z])/gi,'$1');
				whichMove = whichMove.replace(/1=[A-Z]/gi,'1');	
			}			
			
			var moveTo = whichMove.substr(whichMove.length-2,2);
			if(whichMove.length>2) pieceType = whichMove.substr(0,1); else pieceType = 'p';

			var colToMove = false;
			var rowToMove = false;

						
			if(whichMove.length>3){
				var colOrRow = whichMove.substr(1,1);
				if(colOrRow.match(/[a-z]/gi))colToMove = colOrRow; else colToMove = false;
				if(colOrRow.match(/[0-9]/gi)){
					rowToMove = colOrRow; 
				}else rowToMove = false;			
			}
						
			if(!pieceType.match(/p|K|N|Q|R|B/)){
				colToMove = pieceType;
				rowToMove = pieceType;
				pieceType = 'p';				
			}

			if(takeAPiece){
				var tmpCol = whichMove.substr(0,1);
				if(tmpCol.match(/[a-h]/g)) colToMove = tmpCol;				
			}
						
			if(colToMove) colToMove = baseConverter(colToMove,16,10) - 9;
			
			var moveToX = baseConverter(moveTo.substr(0,1),16,10) - 9;
			var moveToY = 8 - moveTo.substr(1,1);
			var objectToMove = false;
			var objectToRemove = false;
			var pieceToMoveIndex = false;		

			var pawnSpace = 3;
//Ti.API.info("moveTo:"+moveToX+"  "+moveToY+"  "+pieceType);
			
			for(var no=0;no<myChess.chessObj.boardPieces[playerIndex].length;no++){	// Looping through board pieces
				var obj = myChess.chessObj.boardPieces[playerIndex][no];	// Short reference
//Ti.API.info(no+":"+obj['x']+"  "+obj['y']+"  "+obj['obj'].name);				


//				if(!obj['onboard'])continue;
				if(colToMove && colToMove!=obj['x']){
					continue;
				}
				if(rowToMove && rowToMove!=(8-obj['y']) && obj['pieceType']!='p'){
					continue;
				}
				if(!obj['onboard']){
					continue;
				}
				if(obj['pieceType']==pieceType){	// Piece matched
					
					switch(pieceType){
						
						case "p":	// pawn
							var pawnDirection = playerIndex%2==0?-1:1;
							if(!takeAPiece && obj['x']==moveToX && Math.abs(obj['y']-moveToY)<pawnSpace&&(moveToY-obj['y'])*pawnDirection>0){
								objectToMove = obj['obj'];
								pieceToMoveIndex = no;
								pawnSpace = Math.abs(obj['y']-moveToY);
							}

							if(takeAPiece && obj['y'] == moveToY-pawnDirection && (obj['x']==(moveToX-1) || obj['x']==(moveToX+1))){
								objectToMove = obj['obj'];	
								pieceToMoveIndex = no;
								
								opIndex = playerIndex%2==0?1:0;
								if(!getObjectAtPosition(moveToX,moveToY,opIndex)){
									//Ti.API.info('EnPass:'+no+' '+whichMove);
									obj = getObjectAtPosition(moveToX,moveToY-pawnDirection,opIndex);
									//Ti.API.info(moveToX+' '+(moveToY-pawnDirection)+' '+opIndex+' '+obj);
									if(obj){
										obj['onboard']=false;
										obj['x'] = -1;
										obj['y'] = -1;	
									}
								}
							}
							break;	
						case "N":	// Knight
							var diffX = Math.abs(obj['x'] - moveToX);
							var diffY = Math.abs(obj['y'] - moveToY);
							if((diffX==1 && diffY==2) || (diffX==2 && diffY==1)){
								objectToMove = obj['obj'];
								pieceToMoveIndex = no;
							}
						
							break;
							
						case "B":
							var diffX = Math.abs(obj['x'] - moveToX);
							var diffY = Math.abs(obj['y'] - moveToY);							
							if(diffX==diffY){
								objectToMove = obj['obj'];
								pieceToMoveIndex = no;
							}
							break;
						case "R":
							var diffX = Math.abs(obj['x'] - moveToX);
							var diffY = Math.abs(obj['y'] - moveToY);	
									
							if(diffX== 0 || diffY==0){
								var occupied = false;
								if(diffY==0){
									for(var ocNo=Math.min(obj['x']+1,moveToX);ocNo<=Math.max(obj['x']-1,moveToX);ocNo++){
										var tmpObj = getObjectAtPosition(ocNo,moveToY,playerIndex);	
										var tmpObj1 = false;									
										if(ocNo!=moveToX){
											tmpObj1 = getObjectAtPosition(ocNo,moveToY,otherPlayerIndex);
										}	
																			
										if(tmpObj || tmpObj1){
											occupied = true;
											break;
										}
									}
								
								}								
								if(diffX==0){
									for(var ocNo=Math.min(obj['y']+1,moveToY);ocNo<=Math.max(obj['y']-1,moveToY);ocNo++){
										var tmpObj = getObjectAtPosition(moveToX,ocNo,playerIndex);
										var tmpObj1 = false;									
										if(ocNo!=moveToY){
											tmpObj1 = getObjectAtPosition(moveToX,ocNo,otherPlayerIndex);
										}	

										if(tmpObj || tmpObj1){
											occupied = true;
											break;
										}										
									}	
								}
								
								if(!occupied){
									
									objectToMove = obj['obj'];
									pieceToMoveIndex = no;
								}
							}						
							break;	
						case "Q":	// Queen
							objectToMove = obj['obj'];
							pieceToMoveIndex = no;
							break;
														
						case "K":
							objectToMove = obj['obj'];
							pieceToMoveIndex = no;
							break;
					}
				}

				if(objectToMove && pieceType!='p')break;			
			}
			
			if(promoteTo){

				var piece  = myChess.chessObj.boardPieces[playerIndex][pieceToMoveIndex];

				if(piece) {
					if(playerIndex==0){
						piece['pieceType'] = promoteTo;
						piece['picType'] = 'w'+promoteTo;
						piece['obj']['picType'] = 'w'+promoteTo;
					}else{
						piece['pieceType'] = promoteTo;
						piece['picType'] = 'b'+promoteTo;
						piece['obj']['picType'] = 'b'+promoteTo;
					}
				}						
			}

			
			if(objectToMove){				
	//			objectToMove.style.left = (moveToX - 1) * csp + 'px';
	//			objectToMove.style.top = ((8 - moveToY) * csp) + 'px';	
	
				obj = getObjectAtPosition(moveToX,moveToY,otherPlayerIndex);
				if(obj){
					obj['onboard']=false;
					obj['x'] = -1;
					obj['y'] = -1;
//					Ti.API.info("TAKEAPIECE ..."+obj['pieceType']);		
				}		
				
//				this.setPieceBg(objectToMove,moveToX,moveToY);
				var moveFromX = myChess.chessObj.boardPieces[playerIndex][pieceToMoveIndex]['x'];
				var moveFromY = myChess.chessObj.boardPieces[playerIndex][pieceToMoveIndex]['y'];

//Ti.API.info("to move"+objectToMove.image+" "+moveFromX+" "+moveFromY+" "+moveToX+" "+moveToY+"  "+playerIndex+"  "+pieceToMoveIndex);

				piecei = pieceToMoveIndex;
				
		//		moveAPiece(moveFromX, moveFromY, moveToX, moveToY, objectToMove);
				
				myChess.chessObj.boardPieces[playerIndex][pieceToMoveIndex]['x'] = moveToX;
				myChess.chessObj.boardPieces[playerIndex][pieceToMoveIndex]['y'] = moveToY;
			}
/*			
			if(objectToRemove['obj']){
//				objectToRemove['obj'].left=-200;
//				objectToRemove['obj'].top = -200;
				objectToRemove['onboard'] = false;
				objectToRemove['x'] = -1;
				objectToRemove['y'] = -1;
			}
*/			
	return piecei;		
}
		
		
		


function moveAPiece(newMove){
	if(newMove<1){
		Ti.UI.info("Error:new move less one");
		return;
	}	
	
	setNotation(newMove);
	
	var index = myChess.chessObj.piecesStatus[newMove][2];
	
	if((index<0)||(index<100 && index>17)){
		Ti.API.info("Error: "+newMove+"   "+index);
		return;
	}
	
	
	var playeri = Math.floor(index/100);
	var piecei = index%100;
	
	if(piecei == 16){
		//Ti.API.info('OO');
		focusMoves(false);
		putPieces(newMove);				
		return;
	}
	if(piecei == 17){
		//Ti.API.info('OOO');
		focusMoves(false);
		putPieces(newMove);
		return;
	}

//Ti.API.info("<"+newMove+"  "+index+"   "+myChess.chessObj.piecesStatus[newMove][playeri][piecei]['pieceType']);	
	
	if(myChess.chessObj.piecesStatus[newMove-1][playeri][piecei].onboard==false){
//		alert("not on board 1");
		return;
	}
	if(myChess.chessObj.piecesStatus[newMove][playeri][piecei].onboard==false){
//		alert("not on board 2");
		return;
	}

	focusMoves(false);
	
	var f = myChess.chessObj.piecesStatus[newMove-1][playeri][piecei]['x'];					
	var r = myChess.chessObj.piecesStatus[newMove-1][playeri][piecei]['y'];
	var tf = myChess.chessObj.piecesStatus[newMove][playeri][piecei]['x'];					
	var tr = myChess.chessObj.piecesStatus[newMove][playeri][piecei]['y'];
	var obj = myChess.chessObj.piecesStatus[newMove][playeri][piecei]['obj'];

//Ti.API.info('moveAPiece:'+f+":"+r+" >> "+tf+":"+tr+"   "+obj.name);
	myChess.chessObj.focus[0] = myChess.chessObj.grids[r][f-1];				
	myChess.chessObj.focus[1] = myChess.chessObj.grids[tr][tf-1];
//	Ti.API.info('grid piece:'+grid.piece);
	if(!myChess.chessObj.focus[1]){
//		alert('Oh, error');
		return;
	}
	
	obj.animate({
      	left: myChess.chessObj.focus[1].pleft,
      	top: myChess.chessObj.focus[1].ptop,
      	duration: 500
    }, function(){
    	putPieces(newMove);
    	}
    );

	myChess.chessObj.focus[1].piece = obj;
	
	focusMoves(true);
//	grid.backgroundImage=null;
//	grid.backgroundColor = 'orange';

}

function getObjectAtPosition(x,y,playerIndex)
		{
			var cobj = myChess.chessObj;
//			alert("getObjectAtPosition:"+cobj);
			for(var no=0;no<cobj.boardPieces[playerIndex].length;no++){
				var obj = cobj.boardPieces[playerIndex][no];
//Ti.API.info(no+": "+obj+" "+obj['x']+" "+obj['y']);				
				if(obj['onboard'] && obj['x'] == x && obj['y'] == y){
					return obj;
				}		
			}	
	
			return false;	
		}
	
	
function moveOnBoard(moveTo){		

	var currentMove = myChess.chessObj.currentMove;	
	var moves = myChess.chessObj.moves;			
				
	var string = "";
	var lastMove = false;
	
	for(var no=currentMove;no<moveTo;no++){	// Loop through new moves
					
			var moveIndex = Math.floor(no/2);
			var playerIndex = no % 2;
//	Ti.API.info("move>>>:"+moves[moveIndex][playerIndex]+"  "+playerIndex);	
	
			if(no==moveTo-1){
				translateAMoveAnimate(moves[moveIndex][playerIndex],playerIndex);
			}else if(no==moveTo-2){
				translateAMove(moves[moveIndex][playerIndex],playerIndex);;
				setBoard();
			}else if(no<moveTo-2){
				translateAMove(moves[moveIndex][playerIndex],playerIndex);
			}
			
			
		
			if(playerIndex==0) prefix = 'white';else prefix = 'black';
					
			
	//				highlightRow(moveIndex+1);								


	}

		
	myChess.chessObj.currentMove = moveTo;
	
	resetNotation();
	setNotation(moveTo);	
}

function doCastle(kingSide,playerIndex){
	for(var no=0;no<myChess.chessObj.boardPieces[playerIndex].length;no++){
		var obj = myChess.chessObj.boardPieces[playerIndex][no];
		if(obj['pieceType']=='R' && obj['x']==8 && kingSide){
			newPos = 6;
			obj['x']=newPos;			
			
		}
		if(obj['pieceType']=='R' && obj['x']==1 && !kingSide){
			newPos = 4;
			obj['x']=newPos;	
		}
		if(obj['pieceType']=='K' && obj['x']==5){
			if(kingSide)newPos = 7; else newPos = 3;
			obj['x']=newPos;
		}				
	}				
			
}
	
function baseConverter (number,oldBase,newBase) {
	number = number + "";
	number = number.toUpperCase();
	var list = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var dec = 0;
	for (var i = 0; i <=  number.length; i++) {
		dec += (list.indexOf(number.charAt(i))) * (Math.pow(oldBase , (number.length - i - 1)));
	}
	number = "";
	var magnitude = Math.floor((Math.log(dec))/(Math.log(newBase)));
	for (var i = magnitude; i >= 0; i--) {
		var amount = Math.floor(dec/Math.pow(newBase,i));
		number = number + list.charAt(amount); 
		dec -= amount*(Math.pow(newBase,i));
	}
	if(number.length==0)number=0;
	return number;
}	
	

function resetNotation(){
	var notations = myChess.chessObj.notations;
	for(i=0; i<notations.length; i++){
		if(notations[i].w){
			notations[i].w.backgroundColor='white';
		}
		if(notations[i].b){
			notations[i].b.backgroundColor='white';
		}
	}
}

function setNotation(moveTo){
	resetNotation();
	var notation = myChess.chessObj.notation;
	var notations = myChess.chessObj.notations;
	if(moveTo>0){
		var no = Math.floor((moveTo-1) / 2);
		var color = (moveTo-1) % 2;
//Ti.API.info("notation:"+moveTo+'  '+no+"  "+color);		
		if(color==0){
			notations[no].w.backgroundColor = 'orange';
		}else{
			notations[no].b.backgroundColor = 'orange';
		}
		
		var min=0;
		var max=notations.length-1;
		if(no>4){
			min = no-3;
		}
		if(no+3<max){
			max = no+3;
		}
//		notation.fireEvent('show',{index:min});
//		notation.fireEvent('show',{index:max});
		notation.fireEvent('show',{index:no+6});
	}
}



myChess.f.getPiecesStatus = function(){

	resetBoard();
	
	var ma = myChess.chessObj.game.content.split('|');

	var moves = new Array(ma.length);
	for(i=0;i<ma.length-1;i++){
		var moa = ma[i].split('^');
		moves[i] = new Array(2);
		moves[i][0] = moa[0];
		moves[i][1] = moa[1];
	}	
		
	i = ma.length-1;
	var mol = ma[i].split('^');	
	if(mol[1] != "---"){
		moves[i] = new Array(2);
		moves[i][0] = mol[0];
		moves[i][1] = mol[1];
		myChess.chessObj.maxMoves = moves.length * 2;
	}else{	
		moves[i] = new Array(1);
		moves[i][0] = mol[0];
		myChess.chessObj.maxMoves = moves.length * 2-1;
	}
	
	myChess.chessObj.moves = moves;
	var lastMove = myChess.chessObj.maxMoves+1;
//Ti.API.info("last move:"+lastMove);	
	myChess.chessObj.piecesStatus = new Array(lastMove);
	for(i=0;i<lastMove;i++){
		myChess.chessObj.piecesStatus[i] = new Array(6);
		myChess.chessObj.piecesStatus[i][0] = new Array(16);
		myChess.chessObj.piecesStatus[i][1] = new Array(16);
		myChess.chessObj.piecesStatus[i][2] = null;			//pieceIndex
		myChess.chessObj.piecesStatus[i][3] = 'KQkq'		//castleRights
		myChess.chessObj.piecesStatus[i][4] = '-';
		myChess.chessObj.piecesStatus[i][5] = 0;			//fifty rules
	}


	
	var	no=0;	
	var	status = '['+myChess.chessObj.piecesStatus[no][2]+']';
	for(type=0; type<2; type++){
		for(p=0; p<16; p++){
			myChess.chessObj.piecesStatus[no][type][p] = new Array();
			myChess.chessObj.piecesStatus[no][type][p]['x'] = myChess.chessObj.boardPieces[type][p]['obj'].file;
			myChess.chessObj.piecesStatus[no][type][p]['y'] = myChess.chessObj.boardPieces[type][p]['obj'].rank;
			myChess.chessObj.piecesStatus[no][type][p]['obj'] = myChess.chessObj.boardPieces[type][p]['obj'];
			myChess.chessObj.piecesStatus[no][type][p]['onboard'] = true;
			myChess.chessObj.piecesStatus[no][type][p]['picType']=myChess.chessObj.boardPieces[type][p]['obj'].picType;
			
			status += ' ('+myChess.chessObj.piecesStatus[no][type][p]['picType']+'  '+myChess.chessObj.piecesStatus[no][type][p]['x']+','+myChess.chessObj.piecesStatus[no][type][p]['y']+') ';

		}
	}
//	Ti.API.info(no+' '+lastMove+'>>'+status);
	
	var castleRights = "KQkq";
	var fifty = 0;
	
	for(var no=1;no<lastMove;no++){	// Loop through new moves
					
		var moveIndex = Math.floor((no-1)/2);
		var playerIndex = (no-1) % 2;
//	Ti.API.info("move>>>:"+moves[moveIndex][playerIndex]+"  "+playerIndex);	
		if(!moves[moveIndex][playerIndex]){
			continue;
		}
	
		var pieceIndex = translateAMove(moves[moveIndex][playerIndex],playerIndex);
		var index = playerIndex*100+pieceIndex;
//	Ti.API.info(no+'>>'+index);		
		myChess.chessObj.piecesStatus[no][2]=index;
		
		switch(index){
			case 15:	// white Rook moved
				var ind = castleRights.indexOf('K');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				break;
			case 8:	// white 0-0
				var ind = castleRights.indexOf('Q');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				break;
			case 12:	// white 0-0
			case 16:	// white 0-0
			case 17:	// white 0-0
				var ind = castleRights.indexOf('K');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				ind = castleRights.indexOf('Q');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				break;
				
			case 115:	// black 0-0
				var ind = castleRights.indexOf('k');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				break;
			case 108:	// black 0-0
				var ind = castleRights.indexOf('q');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				break;
			case 112:	// black 0-0
			case 116:	// black 0-0
			case 117:	// black 0-0			
				var ind = castleRights.indexOf('k');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				var ind = castleRights.indexOf('q');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				break;
		}
		
		if(castleRights == '') {
			castleRights = '-';
		}
		myChess.chessObj.piecesStatus[no][3]=castleRights;
//		Ti.API.info(no+'>>'+myChess.chessObj.piecesStatus[no][3]);	
		
		var thismove = moves[moveIndex][playerIndex];
		if((thismove.length==2)&&('abcdefgh'.indexOf(thismove[0])>=0)){
			if(playerIndex==0 && thismove[1]=='4'){
				if(myChess.chessObj.piecesStatus[no-1][0][pieceIndex]['y']==6){
					myChess.chessObj.piecesStatus[no][4]=thismove[0]+'3';
				}	
//Ti.API.info("w PAWN old == "+myChess.chessObj.piecesStatus[no-1][0][pieceIndex]['y']);				
			}else if(thismove[1]=='5'){
				if(myChess.chessObj.piecesStatus[no-1][1][pieceIndex]['y'] == 1){
					myChess.chessObj.piecesStatus[no][4]=thismove[0]+'6';
				}	
//Ti.API.info("b PAWN old == "+myChess.chessObj.piecesStatus[no-1][1][pieceIndex]['y']);				
			}	
		}
		
		if((thismove.indexOf('x')>0)||(pieceIndex>=0&&pieceIndex<8)){
			fifty = 0;
		}else{
			fifty ++;
		}
		myChess.chessObj.piecesStatus[no][5]=fifty;
				
		status = '['+myChess.chessObj.piecesStatus[no][2]+']';
		for(type=0; type<2; type++){
			for(p=0; p<16; p++){
				myChess.chessObj.piecesStatus[no][type][p] = new Array();
				myChess.chessObj.piecesStatus[no][type][p]['obj'] = myChess.chessObj.boardPieces[type][p]['obj'];
				myChess.chessObj.piecesStatus[no][type][p]['x'] = myChess.chessObj.boardPieces[type][p]['x'];
				myChess.chessObj.piecesStatus[no][type][p]['y'] = myChess.chessObj.boardPieces[type][p]['y'];
				myChess.chessObj.piecesStatus[no][type][p]['onboard'] = myChess.chessObj.boardPieces[type][p]['onboard'];
			    myChess.chessObj.piecesStatus[no][type][p]['picType']=myChess.chessObj.boardPieces[type][p]['picType'];
			    myChess.chessObj.piecesStatus[no][type][p]['pieceType']=myChess.chessObj.boardPieces[type][p]['pieceType'];
			    	
			 	status += ' ('+myChess.chessObj.piecesStatus[no][type][p]['picType']+'  '+myChess.chessObj.piecesStatus[no][type][p]['x']+','+myChess.chessObj.piecesStatus[no][type][p]['y']+') ';
			}
		}
//		Ti.API.info(no+' '+lastMove+'<'+moves[moveIndex][playerIndex]+'>'+'>>'+status);

	}
	
}

function putPieces(newMove){
//	Ti.API.info("put Pieces "+newMove+"  "+myChess.chessObj.piecesStatus[newMove][2]);
	myChess.chessObj.resultV.fireEvent('hide');
	
	if(newMove<0) newMove=0;
	myChess.chessObj.currentMove = newMove;
	if(!myChess.chessObj.piecesStatus[newMove]){		
		return;
	}

	setNotation(newMove);
	
	for(var type=0;type<2;type++){
		for(var no=0;no<16;no++){
			var piece = myChess.chessObj.piecesStatus[newMove][type][no]['obj'];
			if(myChess.chessObj.piecesStatus[newMove][type][no].onboard==false){
				piece.left = -200;
				piece.top = -200
				continue;
			}

			var pf = myChess.chessObj.piecesStatus[newMove][type][no]['x'];					
			var pr = myChess.chessObj.piecesStatus[newMove][type][no]['y'];
			
			var grid = myChess.chessObj.grids[pr][pf-1];

//Ti.API.info(grid+":"+grid.left+"   "+grid.top+"  "+piece+":"+piece.left+"  "+piece.top);
			piece.left = grid.pleft;
			piece.top = grid.ptop;
			
			setPieceImage(myChess.chessObj.piecesStatus[newMove][type][no]);
			
		}
	}	
//	Ti.API.info("cm:"+myChess.chessObj.currentMove+" "+myChess.chessObj.maxMoves);
	if(myChess.chessObj.currentMove == myChess.chessObj.maxMoves){
		myChess.chessObj.resultV.fireEvent('show');
	}

	if(newMove == 0){
		focusMoves(false);
		myChess.chessObj.playModeInProgress = false;
	}	
	
	if(myChess.isSound){
		myChess.sound.play.play();
	}	
}

myChess.f.flipPieces = function(ang){
	
	newMove = myChess.chessObj.currentMove;
//	Ti.API.info("flip Pieces :"+newMove);
	
	for(var type=0;type<2;type++){
		for(var no=0;no<16;no++){
			var piece = myChess.chessObj.piecesStatus[newMove][type][no]['obj'];
			piece.setTransform(Ti.UI.create2DMatrix({ rotate: ang }));
		}	
	}	
}			

function movePieces(newMove){
//	Ti.API.info("animate Pieces "+newMove+"  "+myChess.chessObj.piecesStatus[newMove][2]);

	if(newMove-1>myChess.chessObj.currentMove){
		putPieces(newMove-1);
	}	
	myChess.chessObj.currentMove = newMove;
		
	moveAPiece(newMove);
}

function highlightGrid(grid, b){
	if(!grid){
//		Ti.API.info("grid is null!");
		return;
	}
	if(b){
		grid.width = grid.size2;
		grid.height = grid.size2;
		grid.left = grid.left2;
		grid.top = grid.top2;
	}else{
		grid.width = grid.size1;
		grid.height = grid.size1;
		grid.left = grid.left1;
		grid.top = grid.top1;
	}	
}

function focusMoves(b){
	highlightGrid(myChess.chessObj.focus[0],b);
	highlightGrid(myChess.chessObj.focus[1],b);
	
	if(!b){
		myChess.chessObj.focus[0] = null;
		myChess.chessObj.focus[1] = null;
	}

}


myChess.f.validPiecesStatus = function(){
	
	var errGames = new Array();
	
	
	var gameSize = myChess.Games[myChess.PlayerIndex].games.length;
//	Ti.API.info(myChess.PlayerIndex+" : validate >>>>"+gameSize+"  "+myChess.Players[myChess.PlayerIndex][0]);	
//gameSize=100;
	for(gi=0;gi<gameSize;gi++){
// for(gi=159;gi<160;gi++){			
		myChess.chessObj.gameIndex = gi;
	
		myChess.chessObj.game = myChess.Games[myChess.PlayerIndex].games[myChess.chessObj.gameIndex]; 
//	Ti.API.info(gi+"==========="+myChess.chessObj.game.White+" "+myChess.chessObj.game.Black+" "+myChess.chessObj.game.Site+" "+myChess.chessObj.game.Date);
		resetBoard();
		
		var ma = "";
		if(myChess.chessObj.game.content){
			ma = myChess.chessObj.game.content.split('|');
		}else{
			errGames.push(gi);
			continue;
		}
		
		var moves = new Array(ma.length);
		for(i=0;i<ma.length-1;i++){
			var moa = ma[i].split('^');
			moves[i] = new Array(2);
			moves[i][0] = moa[0];
			moves[i][1] = moa[1];
		}	
			
		i = ma.length-1;
		var mol = ma[i].split('^');	
		if(mol[1] != "---"){
			moves[i] = new Array(2);
			moves[i][0] = mol[0];
			moves[i][1] = mol[1];
			myChess.chessObj.maxMoves = moves.length * 2;
		}else{	
			moves[i] = new Array(1);
			moves[i][0] = mol[0];
			myChess.chessObj.maxMoves = moves.length * 2-1;
		}
		
		myChess.chessObj.moves = moves;

		for(var type=0;type<2;type++){
			for(var no=0;no<16;no++){

				var pf = myChess.chessObj.boardPieces[type][no]['obj'].file;					
				var pr = myChess.chessObj.boardPieces[type][no]['obj'].rank;

				myChess.chessObj.boardPieces[type][no]['x']=pf;
				myChess.chessObj.boardPieces[type][no]['y']=pr;
			
				myChess.chessObj.boardPieces[type][no]['onboard']=true;
				myChess.chessObj.boardPieces[type][no]['picType'] = myChess.chessObj.boardPieces[type][no]['obj'].picTytpe;
			
			}
		}
		myChess.chessObj.currentMove = 0;	
		
		var moves = myChess.chessObj.moves;			
		var lastMove = myChess.chessObj.maxMoves+1;	
	
		for(var no=1;no<lastMove;no++){	// Loop through new moves
			var moveIndex = Math.floor((no-1)/2);
			var playerIndex = (no-1) % 2;
	//	Ti.API.info("move>>>:"+moves[moveIndex][playerIndex]+"  "+playerIndex);	
			if(!moves[moveIndex] || !moves[moveIndex][playerIndex]){
				continue;
			}
		
			var pieceIndex = translateAMove(moves[moveIndex][playerIndex],playerIndex);
			var index = playerIndex*100+pieceIndex;
			if((pieceIndex<0) || (pieceIndex>17)){
//				Ti.API.info(gi+" "+pieceIndex+"  "+no+"  "+moves[moveIndex][playerIndex]+" "+myChess.chessObj.game.content);
				errGames.push(gi);
				break;

//				Ti.API.info(gi+"        !!!!"+no+' '+lastMove+'<'+moves[moveIndex][playerIndex]+'>'+'>>'+pieceIndex);
			
			}
		}
			
	}
	Ti.API.info("error:"+errGames);
	
}	

myChess.f.getPGN = function(){
	var game = myChess.chessObj.game;
	var moves = myChess.chessObj.moves;
	
	var content = "";
		
	content += "[Event \""+game.Event+"\"]\n";
	content += "[Site \""+game.Site+"\"]\n";
	if(game.Date){
		content += "[Date \""+game.Year+"\"]\n";
	}else{
		content += "[Date \""+game.Year+".??.??\"]\n";
	}	
	content += "[Round \""+game.Round+"\"]\n";
	content += "[White \""+game.White+"\"]\n";
	content += "[Black \""+game.Black+"\"]\n";
	content += "[Result \""+game.Result+"\"]\n";
	if(game.WhiteElo){
		content += "[WhiteElo \""+game.WhiteElo+"\"]\n";
	}
	if(game.BlackElo){
		content += "[BlackElo \""+game.BlackElo+"\"]\n";
	}	
	if(game.ECO){
		content += "[ECO \""+game.ECO+"\"]\n";
	}	

	
	content += "\n \n";
	for(i=0;i<moves.length; i++){
		content += (i+1)+".";
		if(moves[i][0]){
			content += moves[i][0]+" ";
		}
		if(moves[i][1]){
			content += moves[i][1]+" ";
		}
	}
	content += game.Result+"\n";
	
	return content;
	
	
}

myChess.f.emailPGN = function(){
	
	var emailDialog = Ti.UI.createEmailDialog();
	
	emailDialog.subject = myChess.chessObj.game.White+" vs "+myChess.chessObj.game.Black+" (PNG from Chess World Champion Game Collection)";

	emailDialog.messageBody = myChess.f.getPGN();

	emailDialog.open();
}	

myChess.f.copyPGN = function(){
	
	Titanium.UI.Clipboard.clearText();
	
	Titanium.UI.Clipboard.setText(myChess.f.getPGN());
	
}	

myChess.f.getEndFen = function(){
	
	var player = myChess.Players[myChess.PlayerIndex];
	
	myChess.chessObj.game = myChess.Games[myChess.PlayerIndex].games[myChess.chessObj.gameIndex];
	
	if(myChess.chessObj.game.Result=='1/2-1/2'){
		Ti.API.info("DRAW ---");
		return false;
	}
	
	if(myChess.chessObj.game.content.indexOf('#')>0){
		Ti.API.info("CheckMate --- ");
		return false;
	}
	
	resetBoard();
	
	var ma = myChess.chessObj.game.content.split('|');

	var moves = new Array(ma.length);
	for(i=0;i<ma.length-1;i++){
		var moa = ma[i].split('^');
		moves[i] = new Array(2);
		moves[i][0] = moa[0];
		moves[i][1] = moa[1];
	}	
		
	i = ma.length-1;
	var mol = ma[i].split('^');	
	if(mol[1] != "---"){
		moves[i] = new Array(2);
		moves[i][0] = mol[0];
		moves[i][1] = mol[1];
		myChess.chessObj.maxMoves = moves.length * 2;
	}else{	
		moves[i] = new Array(1);
		moves[i][0] = mol[0];
		myChess.chessObj.maxMoves = moves.length * 2-1;
	}
	
	myChess.chessObj.moves = moves;
	var lastMove = myChess.chessObj.maxMoves+1;
//Ti.API.info("last move:"+lastMove);	
	myChess.chessObj.piecesStatus = new Array(lastMove);
	for(i=0;i<lastMove;i++){
		myChess.chessObj.piecesStatus[i] = new Array(6);
		myChess.chessObj.piecesStatus[i][0] = new Array(16);
		myChess.chessObj.piecesStatus[i][1] = new Array(16);
		myChess.chessObj.piecesStatus[i][2] = null;			//pieceIndex
		myChess.chessObj.piecesStatus[i][3] = 'KQkq'		//castleRights
		myChess.chessObj.piecesStatus[i][4] = '-';
		myChess.chessObj.piecesStatus[i][5] = 0;			//fifty rules
	}


	
	var	no=0;	
	var	status = '['+myChess.chessObj.piecesStatus[no][2]+']';
	for(type=0; type<2; type++){
		for(p=0; p<16; p++){
			myChess.chessObj.piecesStatus[no][type][p] = new Array();
			myChess.chessObj.piecesStatus[no][type][p]['x'] = myChess.chessObj.boardPieces[type][p]['obj'].file;
			myChess.chessObj.piecesStatus[no][type][p]['y'] = myChess.chessObj.boardPieces[type][p]['obj'].rank;
			myChess.chessObj.piecesStatus[no][type][p]['obj'] = myChess.chessObj.boardPieces[type][p]['obj'];
			myChess.chessObj.piecesStatus[no][type][p]['onboard'] = true;
			myChess.chessObj.piecesStatus[no][type][p]['picType']=myChess.chessObj.boardPieces[type][p]['obj'].picType;
			
			status += ' ('+myChess.chessObj.piecesStatus[no][type][p]['picType']+'  '+myChess.chessObj.piecesStatus[no][type][p]['x']+','+myChess.chessObj.piecesStatus[no][type][p]['y']+') ';

		}
	}
//	Ti.API.info(no+' '+lastMove+'>>'+status);
	
	var castleRights = "KQkq";
	var fifty = 0;
	
	for(var no=1;no<lastMove;no++){	// Loop through new moves
					
		var moveIndex = Math.floor((no-1)/2);
		var playerIndex = (no-1) % 2;
//	Ti.API.info("move>>>:"+moves[moveIndex][playerIndex]+"  "+playerIndex);	
		if(!moves[moveIndex][playerIndex]){
			continue;
		}
	
		var pieceIndex = translateAMove(moves[moveIndex][playerIndex],playerIndex);
		var index = playerIndex*100+pieceIndex;
//	Ti.API.info(no+'>>'+index);		
		myChess.chessObj.piecesStatus[no][2]=index;
		
		switch(index){
			case 15:	// white Rook moved
				var ind = castleRights.indexOf('K');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				break;
			case 8:	// white 0-0
				var ind = castleRights.indexOf('Q');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				break;
			case 12:	// white 0-0
			case 16:	// white 0-0
			case 17:	// white 0-0
				var ind = castleRights.indexOf('K');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				ind = castleRights.indexOf('Q');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				break;
				
			case 115:	// black 0-0
				var ind = castleRights.indexOf('k');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				break;
			case 108:	// black 0-0
				var ind = castleRights.indexOf('q');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				break;
			case 112:	// black 0-0
			case 116:	// black 0-0
			case 117:	// black 0-0			
				var ind = castleRights.indexOf('k');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				var ind = castleRights.indexOf('q');
				if(ind>=0){
					castleRights = castleRights.substr(0, ind) + castleRights.substr(ind + 1);
				}
				break;
		}
		
		if(castleRights == '') {
			castleRights = '-';
		}
		myChess.chessObj.piecesStatus[no][3]=castleRights;
//		Ti.API.info(no+'>>'+myChess.chessObj.piecesStatus[no][3]);	
		
		var thismove = moves[moveIndex][playerIndex];
		if((thismove.length==2)&&('abcdefgh'.indexOf(thismove[0])>=0)){
			if(playerIndex==0 && thismove[1]=='4'){
				if(myChess.chessObj.piecesStatus[no-1][0][pieceIndex]['y']==6){
					myChess.chessObj.piecesStatus[no][4]=thismove[0]+'3';
				}	
//Ti.API.info("w PAWN old == "+myChess.chessObj.piecesStatus[no-1][0][pieceIndex]['y']);				
			}else if(thismove[1]=='5'){
				if(myChess.chessObj.piecesStatus[no-1][1][pieceIndex]['y'] == 1){
					myChess.chessObj.piecesStatus[no][4]=thismove[0]+'6';
				}	
//Ti.API.info("b PAWN old == "+myChess.chessObj.piecesStatus[no-1][1][pieceIndex]['y']);				
			}	
		}
		
		if((thismove.indexOf('x')>0)||(pieceIndex>=0&&pieceIndex<8)){
			fifty = 0;
		}else{
			fifty ++;
		}
		myChess.chessObj.piecesStatus[no][5]=fifty;
				
		status = '['+myChess.chessObj.piecesStatus[no][2]+']';
		for(type=0; type<2; type++){
			for(p=0; p<16; p++){
				myChess.chessObj.piecesStatus[no][type][p] = new Array();
				myChess.chessObj.piecesStatus[no][type][p]['obj'] = myChess.chessObj.boardPieces[type][p]['obj'];
				myChess.chessObj.piecesStatus[no][type][p]['x'] = myChess.chessObj.boardPieces[type][p]['x'];
				myChess.chessObj.piecesStatus[no][type][p]['y'] = myChess.chessObj.boardPieces[type][p]['y'];
				myChess.chessObj.piecesStatus[no][type][p]['onboard'] = myChess.chessObj.boardPieces[type][p]['onboard'];
			    myChess.chessObj.piecesStatus[no][type][p]['picType']=myChess.chessObj.boardPieces[type][p]['picType'];
			    myChess.chessObj.piecesStatus[no][type][p]['pieceType']=myChess.chessObj.boardPieces[type][p]['pieceType'];
			    	
			 	status += ' ('+myChess.chessObj.piecesStatus[no][type][p]['picType']+'  '+myChess.chessObj.piecesStatus[no][type][p]['x']+','+myChess.chessObj.piecesStatus[no][type][p]['y']+') ';
			}
		}
//		Ti.API.info(no+' '+lastMove+'<'+moves[moveIndex][playerIndex]+'>'+'>>'+status);

	}
	
	var newMove = lastMove-1;
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
		myChess.chessObj.game.End = fen;
		
		Ti.API.info("*End Game "+myChess.chessObj.gameIndex+" *  Player:"+myChess.chessObj.game.White+" Vs "+myChess.chessObj.game.Black+"  Result:"+myChess.chessObj.game.Result)
		Ti.API.info("FEN >> "+fen);
		
//		var myJSONText = JSON.stringify(myChess.chessObj.game);
		
//		Ti.API.info("JSON:"+myJSONText);
		
		return true;

}

