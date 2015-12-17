myChess.f.resetPieces = function(){
	putPieces(newMove);
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
}
	
	
myChess.f.moveForward = function(){
	var moves = myChess.chessObj.moves;
//	alert("move:"+moves);
	if(!moves) return;
	
	var maxMoves = moves.length * 2 - (moves[moves.length-1].length==1?1:0);
	newMove = myChess.chessObj.currentMove/1 + 1;
	if(newMove>maxMoves) return;

//		Ti.API.info('new move:'+newMove);
//	moveOnBoard(newMove);
	movePieces(newMove);
}
		

myChess.f.play = function(){
//	Ti.API.info("start play");
	if(myChess.chessObj.playModeInProgress) return;
	myChess.chessObj.playModeInProgress = true;
	processPlay();
			
}
	
myChess.f.pause = function (){
	myChess.chessObj.playModeInProgress = false;
}


	
function processPlay(){
//			Ti.API.info(myChess.chessObj.playingSpeed);
	if(myChess.chessObj.playModeInProgress){
		myChess.f.processPlay.moveForward();
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
			
			myChess.chessObj.boardPieces[type][no]['onboard']=true;
			
		}
	}
	myChess.chessObj.currentMove = 0;	
	
	resetNotation();	
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
	
	if(whichMove=='fxe5'){
//		Ti.API.info(whichMove);
	}
			
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
			whichMove = whichMove.replace('+','');			
			var takeAPiece = whichMove.indexOf('x')>0?true:false;		
			
			whichMove = whichMove.replace('x','');
			if(whichMove.indexOf('8=')>=0){
				piecePromotion = true;
				promoteTo = whichMove.replace(/.*?8=([A-Z])/gi,'$1');
				whichMove = whichMove.replace(/8=[A-Z]/gi,'8');	
			}
			
			var moveTo = whichMove.substr(whichMove.length-2,2);
			if(whichMove.length>2) pieceType = whichMove.substr(0,1); else pieceType = 'p';

			var colToMove = false;
			var rowToMove = false;

						
			if(whichMove.length>3){
				var colOrRow = whichMove.substr(1,1);
				if(colOrRow.match(/[a-z]/gi))colToMove = colOrRow; else colToMove = false;
				if(colOrRow.match(/[0-9]/gi))rowToMove = colOrRow; else rowToMove = false;
			
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

			var pawnSpace = 10;
//Ti.API.info("moveTo:"+moveToX+"  "+moveToY+"  "+pieceType);
			
			for(var no=0;no<myChess.chessObj.boardPieces[playerIndex].length;no++){	// Looping through board pieces
				var obj = myChess.chessObj.boardPieces[playerIndex][no];	// Short reference
//Ti.API.info(no+":"+obj['x']+"  "+obj['y']+"  "+obj['obj'].name);				

//				if(!obj['onboard'])continue;
				if(colToMove && colToMove!=obj['x']){
					continue;
				}
				if(rowToMove && rowToMove!=obj['y'] && obj['pieceType']!='p'){
					continue;
				}
				
				if(obj['pieceType']==pieceType){	// Piece matched
					
					switch(pieceType){
						
						case "p":	// pawn
							var pawnDirection = playerIndex%2==0?-1:1;
							if(!takeAPiece && obj['x']==moveToX && Math.abs(obj['y']-moveToY)<pawnSpace){
								objectToMove = obj['obj'];
								pieceToMoveIndex = no;
								pawnSpace = Math.abs(obj['y']-moveToY);
							}

							if(takeAPiece && obj['y'] == moveToY-pawnDirection && (obj['x']==(moveToX-1) || obj['x']==(moveToX+1))){
								objectToMove = obj['obj'];	
								pieceToMoveIndex = no;
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
										if(tmpObj){
											occupied = true;
											break;
										}
									}
								}								
								if(diffX==0){
									for(var ocNo=Math.min(obj['y']+1,moveToY);ocNo<=Math.max(obj['y']-1,moveToY);ocNo++){
										var tmpObj = getObjectAtPosition(moveToX,ocNo,playerIndex);
										if(tmpObj){
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
				myChess.chessObj.boardPieces[playerIndex][pieceToMoveIndex]['pieceType'] = promoteTo;
//				var img = objectToMove.getElementsByTagName('IMG')[0];
//				var source = img.src;
//				source = source.replace(/\/([wb])p/g,'/$1' + promoteTo.toLowerCase());
				
				
//				img.src = source;
				alert("promote:"+promoteTo);
				
			}
			if(takeAPiece){
				
				objectToRemove = getObjectAtPosition(moveToX,moveToY,otherPlayerIndex);
				objectToRemove['onboard']=false;
				objectToRemove['x'] = -1;
				objectToRemove['y'] = -1;
//				Ti.API.info("TAKEAPIECE ..."+objectToRemove['pieceType']);
//			Ti.API.info("OBJ==="+objectToRemove['obj']);					

			}
			if(objectToMove){				
	//			objectToMove.style.left = (moveToX - 1) * csp + 'px';
	//			objectToMove.style.top = ((8 - moveToY) * csp) + 'px';	
	
				obj = getObjectAtPosition(moveToX,moveToY,otherPlayerIndex);
				if(obj){
					obj['onboard']=false;
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
			if(objectToRemove['obj']){
//				objectToRemove['obj'].left=-200;
//				objectToRemove['obj'].top = -200;
				objectToRemove['onboard'] = false;
				objectToRemove['x'] = -1;
				objectToRemove['y'] = -1;
			}
			
	return piecei;		
		}
		
		
		


function moveAPiece(newMove){
	if(newMove<1){
		alert("new move less one");
		return;
	}	
	
	setNotation(newMove);
	
	var index = myChess.chessObj.piecesStatus[newMove][2];
	
	if((index<0)||(index<100 && index>17)){
		alert(newMove+"   "+index);
		return;
	}
	
	
	var playeri = Math.floor(index/100);
	var piecei = index%100;
	
	if(piecei == 16){
//		alert('OO');
		focusMoves(false);
		putPieces(newMove);
		return;
	}
	if(piecei == 17){
//		alert('OOO');
		focusMoves(false);
		putPieces(newMove);
		return;
	}

//Ti.API.info("<"+newMove+"  "+index+"   "+myChess.chessObj.piecesStatus[newMove][playeri][piecei]['pieceType']);	
	
	if(myChess.chessObj.piecesStatus[newMove-1][playeri][piecei].onboard==false){
		alert("not on board 1");
		return;
	}
	if(myChess.chessObj.piecesStatus[newMove][playeri][piecei].onboard==false){
		alert("not on board 2");
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
		alert('Oh, error');
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
			min = no-5;
		}
		if(no+5<max){
			max = no+5;
		}
		notation.fireEvent('show',{index:min});
		notation.fireEvent('show',{index:max});
	}
}

myChess.f.getPiecesStatus = function(){
	var moves = myChess.chessObj.moves;			
	var lastMove = myChess.chessObj.maxMoves+1;	
	
	myChess.chessObj.piecesStatus = new Array(lastMove);
	for(i=0;i<lastMove;i++){
		myChess.chessObj.piecesStatus[i] = new Array(3);
		myChess.chessObj.piecesStatus[i][0] = new Array(16);
		myChess.chessObj.piecesStatus[i][1] = new Array(16);
		myChess.chessObj.piecesStatus[i][2] = null;
	}

	resetBoard();
	
	var	no=0;	
	var	status = '['+myChess.chessObj.piecesStatus[no][2]+']';
	for(type=0; type<2; type++){
		for(p=0; p<16; p++){
			myChess.chessObj.piecesStatus[no][type][p] = new Array();
			myChess.chessObj.piecesStatus[no][type][p]['x'] = myChess.chessObj.boardPieces[type][p]['obj'].file;
			myChess.chessObj.piecesStatus[no][type][p]['y'] = myChess.chessObj.boardPieces[type][p]['obj'].rank;
			myChess.chessObj.piecesStatus[no][type][p]['obj'] = myChess.chessObj.boardPieces[type][p]['obj'];
			myChess.chessObj.piecesStatus[no][type][p]['onboard'] = true;
			
			status += ' ('+myChess.chessObj.piecesStatus[no][type][p]['obj'].pieceType+'  '+myChess.chessObj.piecesStatus[no][type][p]['x']+','+myChess.chessObj.piecesStatus[no][type][p]['y']+') ';

		}
	}
//	Ti.API.info(no+' '+lastMove+'>>'+status);
	

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
		
		status = '['+myChess.chessObj.piecesStatus[no][2]+']';
		for(type=0; type<2; type++){
			for(p=0; p<16; p++){
				myChess.chessObj.piecesStatus[no][type][p] = new Array();
				myChess.chessObj.piecesStatus[no][type][p]['obj'] = myChess.chessObj.boardPieces[type][p]['obj'];
				myChess.chessObj.piecesStatus[no][type][p]['x'] = myChess.chessObj.boardPieces[type][p]['x'];
				myChess.chessObj.piecesStatus[no][type][p]['y'] = myChess.chessObj.boardPieces[type][p]['y'];
				myChess.chessObj.piecesStatus[no][type][p]['onboard'] = myChess.chessObj.boardPieces[type][p]['onboard'];
			 
			 	status += ' ('+myChess.chessObj.piecesStatus[no][type][p]['obj'].pieceType+'  '+myChess.chessObj.piecesStatus[no][type][p]['x']+','+myChess.chessObj.piecesStatus[no][type][p]['y']+') ';
			}
		}
//		Ti.API.info(no+' '+lastMove+'<'+moves[moveIndex][playerIndex]+'>'+'>>'+status);

	}
	
}

function putPieces(newMove){
//	Ti.API.info("put Pieces "+newMove+"  "+myChess.chessObj.piecesStatus[newMove][2]);
	myChess.chessObj.currentMove = newMove;
	if(newMove<0) newMove=0;
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
			

			
		}
	}	

	
	
}

function movePieces(newMove){
//	Ti.API.info("animate Pieces "+newMove+"  "+myChess.chessObj.piecesStatus[newMove][2]);
	myChess.chessObj.currentMove = newMove;
	if(newMove-1>myChess.chessObj.currentMove){
		putPieces(newMove-1);
	}	
	moveAPiece(newMove);
}

function highlightGrid(grid, b){
	if(!grid){
//		Ti.API.info("grid is null!");
		return;
	}
	if(b){
		grid.width -= grid.size1;
		grid.height -= grid.size1;
		grid.left = grid.left1;
		grid.top = grid.top1;
	}else{
		grid.width = grid.size2;
		grid.height = grid.size2;
		grid.left = grid.left2;
		grid.top = grid.top2;
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


