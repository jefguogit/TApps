function Engine() {

	self = {
		g_debug : true,
		g_timeout : 40,
		g_startTime : 0,
		g_nodeCount : 0,
		g_qNodeCount: 0,
		g_searchValid: true,
		g_globalPly : 0,
		minEval : -2000000,
		maxEval : 2000000,
		minMateBuffer : this.minEval + 2000,
		maxMateBuffer : this.maxEval - 2000,
		materialTable : [0, 800, 3350, 3450, 5000, 9750, 600000],
		pawnAdj : [
			  0, 0, 0, 0, 0, 0, 0, 0,
			  -25, 105, 135, 270, 270, 135, 105, -25,
			  -80, 0, 30, 176, 176, 30, 0, -80,
			  -85, -5, 25, 175, 175, 25, -5, -85,
			  -90, -10, 20, 125, 125, 20, -10, -90,
			  -95, -15, 15, 75, 75, 15, -15, -95, 
			  -100, -20, 10, 70, 70, 10, -20, -100, 
			  0, 0, 0, 0, 0, 0, 0, 0
			],
		knightAdj : [-200, -100, -50, -50, -50, -50, -100, -200,
			      -100, 0, 0, 0, 0, 0, 0, -100,
			      -50, 0, 60, 60, 60, 60, 0, -50,
			      -50, 0, 30, 60, 60, 30, 0, -50,
			      -50, 0, 30, 60, 60, 30, 0, -50,
			      -50, 0, 30, 30, 30, 30, 0, -50,
			      -100, 0, 0, 0, 0, 0, 0, -100,
			      -200, -50, -25, -25, -25, -25, -50, -200
			     ],
			
		bishopAdj : [ -50,-50,-25,-10,-10,-25,-50,-50,
			      -50,-25,-10,  0,  0,-10,-25,-50,
			      -25,-10,  0, 25, 25,  0,-10,-25,
			      -10,  0, 25, 40, 40, 25,  0,-10,
			      -10,  0, 25, 40, 40, 25,  0,-10,
			      -25,-10,  0, 25, 25,  0,-10,-25,
			      -50,-25,-10,  0,  0,-10,-25,-50,
			      -50,-50,-25,-10,-10,-25,-50,-50
			     ],
			
		rookAdj : [ -60, -30, -10, 20, 20, -10, -30, -60,
			       40,  70,  90,120,120,  90,  70,  40,
			      -60, -30, -10, 20, 20, -10, -30, -60,
			      -60, -30, -10, 20, 20, -10, -30, -60,
			      -60, -30, -10, 20, 20, -10, -30, -60,
			      -60, -30, -10, 20, 20, -10, -30, -60,
			      -60, -30, -10, 20, 20, -10, -30, -60,
			      -60, -30, -10, 20, 20, -10, -30, -60
			     ],
			
		kingAdj : [  50, 150, -25, -125, -125, -25, 150, 50,
			       50, 150, -25, -125, -125, -25, 150, 50,
			       50, 150, -25, -125, -125, -25, 150, 50,
			       50, 150, -25, -125, -125, -25, 150, 50,
			       50, 150, -25, -125, -125, -25, 150, 50,
			       50, 150, -25, -125, -125, -25, 150, 50,
			       50, 150, -25, -125, -125, -25, 150, 50,
			      150, 250, 75, -25, -25, 75, 250, 150
			     ],
			
		emptyAdj : [0, 0, 0, 0, 0, 0, 0, 0, 
			        0, 0, 0, 0, 0, 0, 0, 0, 
			        0, 0, 0, 0, 0, 0, 0, 0, 
			        0, 0, 0, 0, 0, 0, 0, 0, 
			        0, 0, 0, 0, 0, 0, 0, 0, 
			        0, 0, 0, 0, 0, 0, 0, 0, 
			        0, 0, 0, 0, 0, 0, 0, 0, 
			        0, 0, 0, 0, 0, 0, 0, 0, 
			     ],
			
		pieceSquareAdj : new Array(8),
			
		// Returns the square flipped
		flipTable : new Array(256),
		
		needsReset : true,
		
		// This somewhat funky scheme means that a piece is indexed by it's lower 4 bits when accessing in arrays.  The fifth bit (black bit)
		// is used to allow quick edge testing on the board.
		colorBlack : 0x10,
		colorWhite : 0x08,
		
		pieceEmpty : 0x00,
		piecePawn : 0x01,
		pieceKnight : 0x02,
		pieceBishop : 0x03,
		pieceRook : 0x04,
		pieceQueen : 0x05,
		pieceKing : 0x06,
		
		g_vectorDelta : new Array(256),
		
		g_bishopDeltas : [-15, -17, 15, 17],
		g_knightDeltas : [31, 33, 14, -14, -31, -33, 18, -18],
		g_rookDeltas : [-1, +1, -16, +16],
		g_queenDeltas : [-1, +1, -15, +15, -17, +17, -16, +16],
		
		g_castleRightsMask : [
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 7,15,15,15, 3,15,15,11, 0, 0, 0, 0,
				0, 0, 0, 0,15,15,15,15,15,15,15,15, 0, 0, 0, 0,
				0, 0, 0, 0,15,15,15,15,15,15,15,15, 0, 0, 0, 0,
				0, 0, 0, 0,15,15,15,15,15,15,15,15, 0, 0, 0, 0,
				0, 0, 0, 0,15,15,15,15,15,15,15,15, 0, 0, 0, 0,
				0, 0, 0, 0,15,15,15,15,15,15,15,15, 0, 0, 0, 0,
				0, 0, 0, 0,15,15,15,15,15,15,15,15, 0, 0, 0, 0,
				0, 0, 0, 0,13,15,15,15,12,15,15,14, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		
		moveflagEPC : 0x2 << 16,
		moveflagCastleKing : 0x4 << 16,
		moveflagCastleQueen : 0x8 << 16,
		moveflagPromotion : 0x10 << 16,
		moveflagPromoteKnight : 0x20 << 16,
		moveflagPromoteQueen : 0x40 << 16,
		moveflagPromoteBishop : 0x80 << 16,
		
		// Position variables
		g_board : new Array(256), // Sentinel 0x80, pieces are in low 4 bits, 0x8 for color, 0x7 bits for piece type
		g_toMove : 8, // side to move, 0 or 8, 0 = black, 8 = white
	    g_castleRights:0, // bitmask representing castling rights, 1 = wk, 2 = wq, 4 = bk, 8 = bq
	    g_enPassentSquare:0,
	    g_baseEval:0,
	    g_hashKeyLow:0,
	    g_hashKeyHigh:0,
	    g_inCheck:0,
	
	// Utility variables
	    g_moveCount : 0,
	    g_moveUndoStack : new Array(),
	
	    g_move50 : 0,
	    g_repMoveStack : new Array(),
	
	    g_hashSize : 1 << 22,
	    g_hashMask : this.g_hashSize - 1,
	    g_hashTable:0,
	
	    g_killers:0,
	    historyTable : new Array(32),
	
	    g_zobristLow:0,
	    g_zobristHigh:0,
	    g_zobristBlackLow:0,
	    g_zobristBlackHigh:0,
	
	// Evaulation variables
	    g_mobUnit:0,
	
	    hashflagAlpha : 1,
	    hashflagBeta : 2,
	    hashflagExact : 3,
	    
	    
	   	g_startOffset : null,
		g_selectedPiece : null,
		moveNumber : 1,
		g_allMoves : [],
		g_playerWhite : true,
		g_changingFen : false,
		g_analyzing : false
	};
	
 	self.GetFen = function(){
	    var result = "";
	    for (var row = 0; row < 8; row++) {
	        if (row != 0) 
	            result += '/';
	        var empty = 0;
	        for (var col = 0; col < 8; col++) {
	            var piece = this.g_board[((row + 2) << 4) + col + 4];
	            if (piece == 0) {
	                empty++;
	            }
	            else {
	                if (empty != 0) 
	                    result += empty;
	                empty = 0;
	                
	                var pieceChar = [" ", "p", "n", "b", "r", "q", "k", " "][(piece & 0x7)];
	                result += ((piece & this.colorWhite) != 0) ? pieceChar.toUpperCase() : pieceChar;
	            }
	        }
	        if (empty != 0) {
	            result += empty;
	        }
	    }
	    
	    result += this.g_toMove == this.colorWhite ? " w" : " b";
	    result += " ";
	    if (this.g_castleRights == 0) {
	        result += "-";
	    }
	    else {
	        if ((this.g_castleRights & 1) != 0) 
	            result += "K";
	        if ((this.g_castleRights & 2) != 0) 
	            result += "Q";
	        if ((this.g_castleRights & 4) != 0) 
	            result += "k";
	        if ((this.g_castleRights & 8) != 0) 
	            result += "q";
	    }
	    
	    result += " ";
	    
	    if (this.g_enPassentSquare == -1) {
	        result += '-';
	    }
	    else {
	        result += this.FormatSquare(this.g_enPassentSquare);
	    }
	    
	    return result;
	};
	
	self.GetMoveSAN = function (move, validMoves) {
		var from = move & 0xFF;
		var to = (move >> 8) & 0xFF;
		
		if (move & this.moveflagCastleKing) return "O-O";
		if (move & this.moveflagCastleQueen) return "O-O-O";
		
		var pieceType = this.g_board[from] & 0x7;
		var result = ["", "", "N", "B", "R", "Q", "K", ""][pieceType];
		
		var dupe = false, rowDiff = true, colDiff = true;
		if (validMoves == null) {
			validMoves = this.GenerateValidMoves();
		}
		for (var i = 0; i < validMoves.length; i++) {
			var moveFrom = validMoves[i] & 0xFF;
			var moveTo = (validMoves[i] >> 8) & 0xFF; 
			if (moveFrom != from &&
				moveTo == to &&
				(this.g_board[moveFrom] & 0x7) == pieceType) {
				dupe = true;
				if ((moveFrom & 0xF0) == (from & 0xF0)) {
					rowDiff = false;
				}
				if ((moveFrom & 0x0F) == (from & 0x0F)) {
					colDiff = false;
				}
			}
		}
		
		if (dupe) {
			if (colDiff) {
				result += this.FormatSquare(from).charAt(0);
			} else if (rowDiff) {
				result += this.FormatSquare(from).charAt(1);
			} else {
				result += this.FormatSquare(from);
			}
		} else if (pieceType == this.piecePawn && (this.g_board[to] != 0 || (move & this.moveflagEPC))) {
			result += this.FormatSquare(from).charAt(0);
		}
		
		if (this.g_board[to] != 0 || (move & this.moveflagEPC)) {
			result += "x";
		}
		
		result += this.FormatSquare(to);
		
		if (move & this.moveflagPromotion) {
			if (move & this.moveflagPromoteBishop) result += "=B";
			else if (move & this.moveflagPromoteKnight) result += "=N";
			else if (move & this.moveflagPromoteQueen) result += "=Q";
			else result += "=R";
		}
	
		this.MakeMove(move);
		if (this.g_inCheck) {
		    result += this.GenerateValidMoves().length == 0 ? "#" : "+";
		}else{
			 result += this.GenerateValidMoves().length == 0 ? "~" : "";
		}
		this.UnmakeMove(move);
	
		return result;
	};
	
	self.FormatSquare = function(square) {
	    var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
	    return letters[(square & 0xF) - 4] + ((9 - (square >> 4)) + 1);
	};
	
	self.FormatMove = function(move) {
	    var result = this.FormatSquare(move & 0xFF) + this.FormatSquare((move >> 8) & 0xFF);
	    
	    if (move & this.moveflagPromotion) {
	        if (move & this.moveflagPromoteBishop) result += "b";
	        else if (move & this.moveflagPromoteKnight) result += "n";
	        else if (move & this.moveflagPromoteQueen) result += "q";
	        else result += "r";
	    }
	    return result;
	};
	
	self.GetMoveFromString = function(moveString) {
//Ti.API.info("GetMoveFromString:"+moveString)		
	    var moves = this.GenerateValidMoves();
	    for (var i = 0; i < moves.length; i++) {
//Ti.API.info(i+":"+moves[i]+"    "+this.FormatMove(moves[i]))	;    	
	        if (this.FormatMove(moves[i]) == moveString) {
	            return moves[i];
	        }
	    }
	    alert("busted! ->" + moveString + " fen:" + this.GetFen());
	};
	
	self.PVFromHash = function(move, ply) {
	    if (ply == 0) 
	        return "";
	
	    if (move == 0) {
		if (this.g_inCheck) return "checkmate";
		return "stalemate";
	    }
	    
	    var pvString = " " + this.GetMoveSAN(move);
	    this.MakeMove(move);
	    
	    var hashNode = this.g_hashTable[this.g_hashKeyLow & this.g_hashMask];
	    if (hashNode != null && hashNode.lock == this.g_hashKeyHigh && hashNode.bestMove != null) {
	        pvString += this.PVFromHash(hashNode.bestMove, ply - 1);
	    }
	    
	    this.UnmakeMove(move);
	    
	    return pvString;
	};
	//
	// Searching code
	//
	
	
	
	self.Search = function(maxPly) {
//Ti.API.info("InitializePieceList3:"+this.g_pieceList);	   		
	    var lastEval;
	    var alpha = this.minEval;
	    var beta = this.maxEval;
	    
		this.g_globalPly++;
	    this.g_nodeCount = 0;
	    this.g_qNodeCount = 0;
	    this.g_searchValid = true;
	    
	    var bestMove = 0;
	    var value;
	    
	    this.g_startTime = (new Date()).getTime();

	    var i;
	    for (i = 1; i <= maxPly && this.g_searchValid; i++) {
	    	
	        var tmp = this.AlphaBeta(i, 0, alpha, beta);


	        if (!this.g_searchValid) break;
	
	        value = tmp;
	
	        if (value > alpha && value < beta) {
	            alpha = value - 500;
	            beta = value + 500;
	
	            if (alpha < this.minEval) alpha = this.minEval;
	            if (beta > this.maxEval) beta = this.maxEval;
	        } else if (alpha != this.minEval) {
	            alpha = this.minEval;
	            beta = this.maxEval;
	            i--;
	        }
	
	        if (this.g_hashTable[this.g_hashKeyLow & this.g_hashMask] != null) {
	            bestMove = this.g_hashTable[this.g_hashKeyLow & this.g_hashMask].bestMove;
	        }
//Ti.API.info("search bestmove:"+bestMove);	        

	      //  this.FinishMoveLocalTesting(bestMove, value, (new Date()).getTime() - this.g_startTime, i);
		     
	    }

	    return this.FinishPlyCallback(bestMove, value, (new Date()).getTime() - this.g_startTime, i - 1);

	};
	
	
	
	self.PawnEval = function(color) {
	    var pieceIdx = (color | 1) << 4;
	    var from = this.g_pieceList[pieceIdx++];
	    while (from != 0) {
	        from = this.g_pieceList[pieceIdx++];
	    }
	};
	
	self.Mobility = function(color) {
	    var result = 0;
	    var from, to, mob, pieceIdx;
	    var enemy = color == 8 ? 0x10 : 0x8;
	    var mobUnit = color == 8 ? this.g_mobUnit[0] : this.g_mobUnit[1];
	
	    // Knight mobility
	    mob = -3;
	    pieceIdx = (color | 2) << 4;
	    from = this.g_pieceList[pieceIdx++];
	    while (from != 0) {
	        mob += mobUnit[this.g_board[from + 31]];
	        mob += mobUnit[this.g_board[from + 33]];
	        mob += mobUnit[this.g_board[from + 14]];
	        mob += mobUnit[this.g_board[from - 14]];
	        mob += mobUnit[this.g_board[from - 31]];
	        mob += mobUnit[this.g_board[from - 33]];
	        mob += mobUnit[this.g_board[from + 18]];
	        mob += mobUnit[this.g_board[from - 18]];
	        from = this.g_pieceList[pieceIdx++];
	    }
	    result += 65 * mob;
	
	    // Bishop mobility
	    mob = -4;
	    pieceIdx = (color | 3) << 4;
	    from = this.g_pieceList[pieceIdx++];
	    while (from != 0) {
	        to = from - 15; while (this.g_board[to] == 0) { to -= 15; mob++; }
	        if (this.g_board[to] & enemy) {
	          mob++;
	          if (!(this.g_board[to] & this.piecePawn)) {
	            to -= 15; while (this.g_board[to] == 0) to -= 15;
	            mob += mobUnit[this.g_board[to]] << 2;
	          }
	        }
	
	        to = from - 17; while (this.g_board[to] == 0) { to -= 17; mob++; }
	        if (this.g_board[to] & enemy) {
	          mob++;
	          if (!(this.g_board[to] & this.piecePawn)) {
	            to -= 17; while (this.g_board[to] == 0) to -= 17;
	            mob += mobUnit[this.g_board[to]] << 2; 
	          }
	        }
	
	        to = from + 15; while (this.g_board[to] == 0) { to += 15; mob++; }
	        if (this.g_board[to] & enemy) {
	          mob++;
	          if (!(this.g_board[to] & this.piecePawn)) {
	            to += 15; while (this.g_board[to] == 0) to += 15;
	            mob += mobUnit[this.g_board[to]] << 2; 
	          }
	        }
	
	        to = from + 17; while (this.g_board[to] == 0) { to += 17; mob++; }
	        if (this.g_board[to] & enemy) {
	          mob++;
	          if (!(this.g_board[to] & this.piecePawn)) {
	            to += 17; while (this.g_board[to] == 0) to += 17;
	            mob += mobUnit[this.g_board[to]] << 2;
	          }
	        }
	
	        from = this.g_pieceList[pieceIdx++];
	    }
	    result += 44 * mob;
	
	    // Rook mobility
	    mob = -4;
	    pieceIdx = (color | 4) << 4;
	    from = this.g_pieceList[pieceIdx++];
	    while (from != 0) {
	        to = from - 1; while (this.g_board[to] == 0) { to--; mob++;}  if (this.g_board[to] & enemy) mob++;
	        to = from + 1; while (this.g_board[to] == 0) { to++; mob++; } if (this.g_board[to] & enemy) mob++;
	        to = from + 16; while (this.g_board[to] == 0) { to += 16; mob++; } if (this.g_board[to] & enemy) mob++;
	        to = from - 16; while (this.g_board[to] == 0) { to -= 16; mob++; } if (this.g_board[to] & enemy) mob++;
	        from = this.g_pieceList[pieceIdx++];
	    }
	    result += 25 * mob;
	
	    // Queen mobility
	    mob = -2;
	    pieceIdx = (color | 5) << 4;
	    from = this.g_pieceList[pieceIdx++];
	    while (from != 0) {
	        to = from - 15; while (this.g_board[to] == 0) { to -= 15; mob++; } if (this.g_board[to] & enemy) mob++;
	        to = from - 17; while (this.g_board[to] == 0) { to -= 17; mob++; } if (this.g_board[to] & enemy) mob++;
	        to = from + 15; while (this.g_board[to] == 0) { to += 15; mob++; } if (this.g_board[to] & enemy) mob++;
	        to = from + 17; while (this.g_board[to] == 0) { to += 17; mob++; } if (this.g_board[to] & enemy) mob++;
	        to = from - 1; while (this.g_board[to] == 0) { to--; mob++; } if (this.g_board[to] & enemy) mob++;
	        to = from + 1; while (this.g_board[to] == 0) { to++; mob++; } if (this.g_board[to] & enemy) mob++;
	        to = from + 16; while (this.g_board[to] == 0) { to += 16; mob++; } if (this.g_board[to] & enemy) mob++;
	        to = from - 16; while (this.g_board[to] == 0) { to -= 16; mob++; } if (this.g_board[to] & enemy) mob++;
	        from = this.g_pieceList[pieceIdx++];
	    }
	    result += 22 * mob;
	
	    return result;
	};
	
	self.Evaluate = function() {
	    var curEval = this.g_baseEval;
	
	    var evalAdjust = 0;
	    // Black queen gone, then cancel white's penalty for king movement
	    if (this.g_pieceList[this.pieceQueen << 4] == 0)
	        evalAdjust -= this.pieceSquareAdj[this.pieceKing][this.g_pieceList[(this.colorWhite | this.pieceKing) << 4]];
	    // White queen gone, then cancel black's penalty for king movement
	    if (this.g_pieceList[(this.colorWhite | this.pieceQueen) << 4] == 0) 
	        evalAdjust += this.pieceSquareAdj[this.pieceKing][this.flipTable[this.g_pieceList[this.pieceKing << 4]]];
	
	    // Black bishop pair
	    if (this.g_pieceCount[this.pieceBishop] >= 2)
	        evalAdjust -= 500;
	    // White bishop pair
	    if (this.g_pieceCount[this.pieceBishop | this.colorWhite] >= 2)
	        evalAdjust += 500;
	
	    var mobility = this.Mobility(8) - this.Mobility(0);
	
	    if (this.g_toMove == 0) {
	        // Black
	        curEval -= mobility;
	        curEval -= evalAdjust;
	    }
	    else {
	        curEval += mobility;
	        curEval += evalAdjust;
	    }
	    
	    return curEval;
	};
	
	self.ScoreMove = function(move){
	    var moveTo = (move >> 8) & 0xFF;
	    var captured = this.g_board[moveTo] & 0x7;
	    var piece = this.g_board[move & 0xFF];
	    var score;
	    if (captured != 0) {
	        var pieceType = piece & 0x7;
	        score = (captured << 5) - pieceType;
	    } else {
	        score = this.historyTable[piece & 0xF][moveTo];
	    }
	    return score;
	};
	
	self.QSearch = function (alpha, beta, ply) {
	    this.g_qNodeCount++;
	
	    var realEval = this.g_inCheck ? (this.minEval + 1) : this.Evaluate();
	    
	    if (realEval >= beta) 
	        return realEval;
	
	    if (realEval > alpha)
	        alpha = realEval;
	
	    var moves = new Array();
	    var moveScores = new Array();
	    var wasInCheck = this.g_inCheck;
	
	    if (wasInCheck) {
	        this.GenerateCaptureMoves(moves, null);
	        this.GenerateAllMoves(moves);
	
	        for (var i = 0; i < moves.length; i++) {
	            moveScores[i] = this.ScoreMove(moves[i]);
	        }
	    } else {
	        this.GenerateCaptureMoves(moves, null);
	
	        for (var i = 0; i < moves.length; i++) {
	            var captured = this.g_board[(moves[i] >> 8) & 0xFF] & 0x7;
	            var pieceType = this.g_board[moves[i] & 0xFF] & 0x7;
	
	            moveScores[i] = (captured << 5) - pieceType;
	        }
	    }
	
	    for (var i = 0; i < moves.length; i++) {
	        var bestMove = i;
	        for (var j = moves.length - 1; j > i; j--) {
	            if (moveScores[j] > moveScores[bestMove]) {
	                bestMove = j;
	            }
	        }
	        {
	            var tmpMove = moves[i];
	            moves[i] = moves[bestMove];
	            moves[bestMove] = tmpMove;
	            
	            var tmpScore = moveScores[i];
	            moveScores[i] = moveScores[bestMove];
	            moveScores[bestMove] = tmpScore;
	        }
	
	        if (!wasInCheck && !this.See(moves[i])) {
	            continue;
	        }
	
	        if (!this.MakeMove(moves[i])) {
	            continue;
	        }
	
	        var value = -this.QSearch(-beta, -alpha, ply - 1);
	        
	        this.UnmakeMove(moves[i]);
	        
	        if (value > realEval) {
	            if (value >= beta) 
	                return value;
	            
	            if (value > alpha)
	                alpha = value;
	            
	            realEval = value;
	        }
	    }
	
	    return realEval;
	};
	
	self.StoreHash = function(value, flags, ply, move, depth) {
		if (value >= this.maxMateBuffer)
			value += depth;
		else if (value <= this.minMateBuffer)
			value -= depth;
		this.g_hashTable[this.g_hashKeyLow & this.g_hashMask] = new HashEntry(this.g_hashKeyHigh, value, flags, ply, move);
	};
	
	self.IsHashMoveValid = function(hashMove) {
	    var from = hashMove & 0xFF;
	    var to = (hashMove >> 8) & 0xFF;
	    var ourPiece = this.g_board[from];
	    var pieceType = ourPiece & 0x7;
	    if (pieceType < this.piecePawn || pieceType > this.pieceKing) return false;
	    // Can't move a piece we don't control
	    if (this.g_toMove != (ourPiece & 0x8))
	        return false;
	    // Can't move to a square that has something of the same color
	    if (this.g_board[to] != 0 && (this.g_toMove == (this.g_board[to] & 0x8)))
	        return false;
	    if (pieceType == this.piecePawn) {
	        if (hashMove & this.moveflagEPC) {
	            return false;
	        }
	
	        // Valid moves are push, capture, double push, promotions
	        var dir = to - from;
	        if ((this.g_toMove == this.colorWhite) != (dir < 0))  {
	            // Pawns have to move in the right direction
	            return false;
	        }
	
	        var row = to & 0xF0;
	        if (((row == 0x90 && !this.g_toMove) ||
	             (row == 0x20 && this.g_toMove)) != (hashMove & this.moveflagPromotion)) {
	            // Handle promotions
	            return false;
	        }
	
	        if (dir == -16 || dir == 16) {
	            // White/Black push
	            return this.g_board[to] == 0;
	        } else if (dir == -15 || dir == -17 || dir == 15 || dir == 17) {
	            // White/Black capture
	            return this.g_board[to] != 0;
	        } else if (dir == -32) {
	            // Double white push
	            if (row != 0x60) return false;
	            if (this.g_board[to] != 0) return false;
	            if (this.g_board[from - 16] != 0) return false;
	        } else if (dir == 32) {
	            // Double black push
	            if (row != 0x50) return false;
	            if (this.g_board[to] != 0) return false;
	            if (this.g_board[from + 16] != 0) return false;
	        } else {
	            return false;
	        }
	
	        return true;
	    } else {
	        // This validates that this piece type can actually make the attack
	        if (hashMove >> 16) return false;
	        return this.IsSquareAttackableFrom(to, from);
	    }
	};
	
	self.IsRepDraw = function() {
	    var stop = this.g_moveCount - 1 - this.g_move50;
	    stop = stop < 0 ? 0 : stop;
	    for (var i = this.g_moveCount - 5; i >= stop; i -= 2) {
	        if (this.g_repMoveStack[i] == this.g_hashKeyLow)
	            return true;
	    }
	    return false;
	};
	

	
	self.AllCutNode = function(ply, depth, beta, allowNull) {
	    if (ply <= 0) {
	        return this.QSearch(beta - 1, beta, 0);
	    }
	
	    if ((this.g_nodeCount & 127) == 127) {
	        if ((new Date()).getTime() - this.g_startTime > this.g_timeout) {
	            // Time cutoff
	            this.g_searchValid = false;
	            return beta - 1;
	        }
	    }
	
	    this.g_nodeCount++;
	
	    if (this.IsRepDraw())
	        return 0;
	
	    // Mate distance pruning
	    if (this.minEval + depth >= beta)
	       return beta;
	
	    if (this.maxEval - (depth + 1) < beta)
		return beta - 1;
	
	    var hashMove = null;
	    var hashNode = this.g_hashTable[this.g_hashKeyLow & this.g_hashMask];
	    if (hashNode != null && hashNode.lock == this.g_hashKeyHigh) {
	        hashMove = hashNode.bestMove;
	        if (hashNode.hashDepth >= ply) {
	            var hashValue = hashNode.value;
	
	            // Fixup mate scores
	            if (hashValue >= this.maxMateBuffer)
			hashValue -= depth;
	            else if (hashValue <= this.minMateBuffer)
	                hashValue += depth;
	
	            if (hashNode.flags == this.hashflagExact)
	                return hashValue;
	            if (hashNode.flags == this.hashflagAlpha && hashValue < beta)
	                return hashValue;
	            if (hashNode.flags == this.hashflagBeta && hashValue >= beta)
	                return hashValue;
	        }
	    }

	
	    if (!this.g_inCheck &&
	        allowNull &&
	        beta > this.minMateBuffer && 
	        beta < this.maxMateBuffer) {
	        // Try some razoring
	        if (hashMove == null &&
	            ply < 4) {
	            var razorMargin = 2500 + 200 * ply;
	            if (this.g_baseEval < beta - razorMargin) {
	                var razorBeta = beta - razorMargin;
	                var v = this.QSearch(razorBeta - 1, razorBeta, 0);
	                if (v < razorBeta)
	                    return v;
	            }
	        }

	
	        // Null move
	        if (ply > 1 &&
	            this.g_baseEval >= beta - (ply >= 4 ? 2500 : 0) &&
	            // Disable null move if potential zugzwang (no big pieces)
	            (this.g_pieceCount[this.pieceBishop | this.g_toMove] != 0 ||
	             this.g_pieceCount[this.pieceKnight | this.g_toMove] != 0 ||
	             this.g_pieceCount[this.pieceRook | this.g_toMove] != 0 ||
	             this.g_pieceCount[this.pieceQueen | this.g_toMove] != 0)) {
	            var r = 3 + (ply >= 5 ? 1 : ply / 4);
	            if (this.g_baseEval - beta > 1500) r++;
	
		        this.g_toMove = 8 - this.g_toMove;
		        this.g_baseEval = -this.g_baseEval;
		        this.g_hashKeyLow ^= this.g_zobristBlackLow;
		        this.g_hashKeyHigh ^= this.g_zobristBlackHigh;
				
		        var value = -this.AllCutNode(ply - r, depth + 1, -(beta - 1), false);
	
		        this.g_hashKeyLow ^= this.g_zobristBlackLow;
		        this.g_hashKeyHigh ^= this.g_zobristBlackHigh;
		        this.g_toMove = 8 - this.g_toMove;
		        this.g_baseEval = -this.g_baseEval;
	
	            if (value >= beta)
		            return beta;
	        }
	    }
	
	    var moveMade = false;
	    var realEval = this.minEval - 1;
	    var inCheck = this.g_inCheck;
	
	    var movePicker = new MovePicker(hashMove, depth, this.g_killers[depth][0], this.g_killers[depth][1],this);
	
var ai=0;	
	    for (;;) {
	    	ai++;
 	
	        var currentMove = movePicker.nextMove();

	        if (currentMove == 0) {
	            break;
	        }
	
	        var plyToSearch = ply - 1;

	        if (!this.MakeMove(currentMove)) {

        	
	            continue;
	        }
	
	        var value;
	        var doFullSearch = true;
	
	        if (this.g_inCheck) {
	            // Check extensions
	            plyToSearch++;
	        } else {
	            var reduced = plyToSearch - (movePicker.atMove > 14 ? 2 : 1);
	
	            // Futility pruning

//Ti.API.info("before AllCutNode >>>"+this.g_pieceList[32]); 	
	            // Late move reductions
	            if (movePicker.stage == 5 && movePicker.atMove > 5 && ply >= 3) {
	                value = -this.AllCutNode(reduced, depth + 1, -(beta - 1), true);
	                doFullSearch = (value >= beta);
	            }
//Ti.API.info("AllCutNode 1>>>"+this.g_pieceList[32]); 	            
	        }
	
	        if (doFullSearch) {
	            value = -this.AllCutNode(plyToSearch, depth + 1, -(beta  - 1), true);
	        }
//Ti.API.info("AllCutNode >>>"+this.g_pieceList[32]); 	
	        moveMade = true;
	
	        this.UnmakeMove(currentMove);
//Ti.API.info("unmakeMove >>>"+this.g_pieceList[32]); 	
	        if (!this.g_searchValid) {
	            return beta - 1;
	        }
	
	        if (value > realEval) {
	            if (value >= beta) {
					var histTo = (currentMove >> 8) & 0xFF;
					if (this.g_board[histTo] == 0) {
					    var histPiece = this.g_board[currentMove & 0xFF] & 0xF;
					    this.historyTable[histPiece][histTo] += ply * ply;
					    if (this.historyTable[histPiece][histTo] > 32767) {
					        this.historyTable[histPiece][histTo] >>= 1;
					    }
	
					    if (this.g_killers[depth][0] != currentMove) {
					        this.g_killers[depth][1] = this.g_killers[depth][0];
					        this.g_killers[depth][0] = currentMove;
					    }
					}
	
	                this.StoreHash(value, this.hashflagBeta, ply, currentMove, depth);
//Ti.API.info("storeHash >>>"+this.g_pieceList[32]); 	                
	                return value;
	            }
	
	            realEval = value;
	            hashMove = currentMove;
	        }
	    }
	
	    if (!moveMade) {
	        // If we have no valid moves it's either stalemate or checkmate
	        if (this.g_inCheck)
	            // Checkmate.
	            return this.minEval + depth;
	        else 
	            // Stalemate
	            return 0;
	    }
	
	    this.StoreHash(realEval, this.hashflagAlpha, ply, hashMove, depth);
	    
	    return realEval;
	};
	
	self.AlphaBeta = function(ply, depth, alpha, beta) {
//Ti.API.info("AlphaBeta 1 -"+ply+" : "+this.g_board[155]);
	    if (ply <= 0) {
	        return this.QSearch(alpha, beta, 0);
	    }
	
	    this.g_nodeCount++;
	
	    if (depth > 0 && this.IsRepDraw())
	        return 0;
	
	    // Mate distance pruning
	    var oldAlpha = alpha;
	    alpha = alpha < this.minEval + depth ? alpha : this.minEval + depth;
	    beta = beta > this.maxEval - (depth + 1) ? beta : this.maxEval - (depth + 1);
	    if (alpha >= beta)
	       return alpha;
	
	    var hashMove = null;
	    var hashFlag = this.hashflagAlpha;
	    var hashNode = this.g_hashTable[this.g_hashKeyLow & this.g_hashMask];
	    if (hashNode != null && hashNode.lock == this.g_hashKeyHigh) {
	        hashMove = hashNode.bestMove;
	    }
	    
	    var inCheck = this.g_inCheck;
	
	    var moveMade = false;
	    var realEval = this.minEval;
	
	    var movePicker = new MovePicker(hashMove, depth, this.g_killers[depth][0], this.g_killers[depth][1],this);
//Ti.API.info("AlphaBeta 2 -"+ply+" : "+this.g_board[155]);	
	    for (;;) {
	        var currentMove = movePicker.nextMove();
	        if (currentMove == 0) {
	            break;
	        }
	
	        var plyToSearch = ply - 1;
	
	        if (!this.MakeMove(currentMove)) {
	            continue;
	        }
	
	        if (this.g_inCheck) {
	            // Check extensions
	            plyToSearch++;
	        }
	
	        var value;
	        if (moveMade) {
//Ti.API.info("AlphaBeta before cut -"+ply+" : "+this.g_board[155]);		        	
	            value = -this.AllCutNode(plyToSearch, depth + 1, -alpha, true);
//Ti.API.info("AlphaBeta after cut -"+ply+" : "+this.g_board[155]);		            
	            if (value > alpha) {
	                value = -this.AlphaBeta(plyToSearch, depth + 1, -beta, -alpha);
	            }
	        } else {
	            value = -this.AlphaBeta(plyToSearch, depth + 1, -beta, -alpha);
	        }
	
	        moveMade = true;
	
	        this.UnmakeMove(currentMove);
	
	        if (!this.g_searchValid) {
	            return alpha;
	        }
	
	        if (value > realEval) {
	            if (value >= beta) {
	                var histTo = (currentMove >> 8) & 0xFF;
	                if (this.g_board[histTo] == 0) {
	                    var histPiece = this.g_board[currentMove & 0xFF] & 0xF;
	                    this.historyTable[histPiece][histTo] += ply * ply;
	                    if (this.historyTable[histPiece][histTo] > 32767) {
	                        this.historyTable[histPiece][histTo] >>= 1;
	                    }
	
	                    if (this.g_killers[depth][0] != currentMove) {
	                        this.g_killers[depth][1] = this.g_killers[depth][0];
	                        this.g_killers[depth][0] = currentMove;
	                    }
	                }
	
	                this.StoreHash(value, this.hashflagBeta, ply, currentMove, depth);
	                return value;
	            }
	
	            if (value > oldAlpha) {
	                hashFlag = this.hashflagExact;
	                alpha = value;
	            }
	
	            realEval = value;
	            hashMove = currentMove;
	        }
	    }
//Ti.API.info("AlphaBeta 3 -"+ply+" : "+this.g_board[155]);	
	    if (!moveMade) {
	        // If we have no valid moves it's either stalemate or checkmate
	        if (inCheck) 
	            // Checkmate.
	            return this.minEval + depth;
	        else 
	            // Stalemate
	            return 0;
	    }
	
	    this.StoreHash(realEval, hashFlag, ply, hashMove, depth);
//Ti.API.info("AlphaBeta 4 -"+ply+" : "+this.g_board[155]);	    
	    return realEval;
	};
	


	
	self.MakeSquare = function(row, column) {

	    return ((row + 2) << 4) | (column + 4);
	};
	
	self.MakeTable = function(table) {
	    var result = new Array(256);
	    for (var i = 0; i < 256; i++) {
	        result[i] = 0;
	    }
	    for (var row = 0; row < 8; row++) {
	        for (var col = 0; col < 8; col++) {
	            result[this.MakeSquare(row, col)] = table[row * 8 + col];
	        }
	    }
	    return result;
	};
	
	self.ResetGame = function() {
	    this.g_killers = new Array(128);
	    for (var i = 0; i < 128; i++) {
	        this.g_killers[i] = [0, 0];
	    }
	
	    this.g_hashTable = new Array(this.g_hashSize);
	
	    for (var i = 0; i < 32; i++) {
	        this.historyTable[i] = new Array(256);
	        for (var j = 0; j < 256; j++)
	            this.historyTable[i][j] = 0;
	    }
	
	    var mt = new MT(0x1badf00d);
	
	    this.g_zobristLow = new Array(256);
	    this.g_zobristHigh = new Array(256);
	    for (var i = 0; i < 256; i++) {
	        this.g_zobristLow[i] = new Array(16);
	        this.g_zobristHigh[i] = new Array(16);
	        for (var j = 0; j < 16; j++) {
	            this.g_zobristLow[i][j] = mt.next(32);
	            this.g_zobristHigh[i][j] = mt.next(32);
	        }
	    }
	    this.g_zobristBlackLow = mt.next(32);
	    this.g_zobristBlackHigh = mt.next(32);
	
	    for (var row = 0; row < 8; row++) {
	        for (var col = 0; col < 8; col++) {
	            var square = this.MakeSquare(row, col);
	            this.flipTable[square] = this.MakeSquare(7 - row, col);
	        }
	    }
	
	    this.pieceSquareAdj[this.piecePawn] = this.MakeTable(this.pawnAdj);
	    this.pieceSquareAdj[this.pieceKnight] = this.MakeTable(this.knightAdj);
	    this.pieceSquareAdj[this.pieceBishop] = this.MakeTable(this.bishopAdj);
	    this.pieceSquareAdj[this.pieceRook] = this.MakeTable(this.rookAdj);
	    this.pieceSquareAdj[this.pieceQueen] = this.MakeTable(this.emptyAdj);
	    this.pieceSquareAdj[this.pieceKing] = this.MakeTable(this.kingAdj);
	
	    var pieceDeltas = [[], [], this.g_knightDeltas, this.g_bishopDeltas, this.g_rookDeltas, this.g_queenDeltas, this.g_queenDeltas];
	
	    for (var i = 0; i < 256; i++) {
	        this.g_vectorDelta[i] = new Object();
	        this.g_vectorDelta[i].delta = 0;
	        this.g_vectorDelta[i].pieceMask = new Array(2);
	        this.g_vectorDelta[i].pieceMask[0] = 0;
	        this.g_vectorDelta[i].pieceMask[1] = 0;
	    }
	    
	    // Initialize the vector delta table    
	    for (var row = 0; row < 0x80; row += 0x10) 
	        for (var col = 0; col < 0x8; col++) {
	            var square = row | col;
	            
	            // Pawn moves
	            var index = square - (square - 17) + 128;
	            this.g_vectorDelta[index].pieceMask[this.colorWhite >> 3] |= (1 << this.piecePawn);
	            index = square - (square - 15) + 128;
	            this.g_vectorDelta[index].pieceMask[this.colorWhite >> 3] |= (1 << this.piecePawn);
	            
	            index = square - (square + 17) + 128;
	            this.g_vectorDelta[index].pieceMask[0] |= (1 << this.piecePawn);
	            index = square - (square + 15) + 128;
	            this.g_vectorDelta[index].pieceMask[0] |= (1 << this.piecePawn);
	            
	            for (var i = this.pieceKnight; i <= this.pieceKing; i++) {
	                for (var dir = 0; dir < pieceDeltas[i].length; dir++) {
	                    var target = square + pieceDeltas[i][dir];
	                    while (!(target & 0x88)) {
	                        index = square - target + 128;
	                        
	                        this.g_vectorDelta[index].pieceMask[this.colorWhite >> 3] |= (1 << i);
	                        this.g_vectorDelta[index].pieceMask[0] |= (1 << i);
	                        
	                        var flip = -1;
	                        if (square < target) 
	                            flip = 1;
	                        
	                        if ((square & 0xF0) == (target & 0xF0)) {
	                            // On the same row
	                            this.g_vectorDelta[index].delta = flip * 1;
	                        } else if ((square & 0x0F) == (target & 0x0F)) {
	                            // On the same column
	                            this.g_vectorDelta[index].delta = flip * 16;
	                        } else if ((square % 15) == (target % 15)) {
	                            this.g_vectorDelta[index].delta = flip * 15;
	                        } else if ((square % 17) == (target % 17)) {
	                            this.g_vectorDelta[index].delta = flip * 17;
	                        }
	
	                        if (i == this.pieceKnight) {
	                            this.g_vectorDelta[index].delta = pieceDeltas[i][dir];
	                            break;
	                        }
	
	                        if (i == this.pieceKing)
	                            break;
	
	                        target += pieceDeltas[i][dir];
	                    }
	                }
	            }
	        }
	
	    this.InitializeEval();
	    this.InitializeFromFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
	    
	    g_allMoves = [];
	    
	    
	};
	
	self.InitializeEval = function() {
	    this.g_mobUnit = new Array(2);
	    for (var i = 0; i < 2; i++) {
	        this.g_mobUnit[i] = new Array();
	        var enemy = i == 0 ? 0x10 : 8;
	        var friend = i == 0 ? 8 : 0x10;
	        this.g_mobUnit[i][0] = 1;
	        this.g_mobUnit[i][0x80] = 0;
	        this.g_mobUnit[i][enemy | this.piecePawn] = 1;
	        this.g_mobUnit[i][enemy | this.pieceBishop] = 2;
	        this.g_mobUnit[i][enemy | this.pieceKnight] = 2;
	        this.g_mobUnit[i][enemy | this.pieceRook] = 4;
	        this.g_mobUnit[i][enemy | this.pieceQueen] = 6;
	        this.g_mobUnit[i][enemy | this.pieceKing] = 6;
	        this.g_mobUnit[i][friend | this.piecePawn] = 0;
	        this.g_mobUnit[i][friend | this.pieceBishop] = 0;
	        this.g_mobUnit[i][friend | this.pieceKnight] = 0;
	        this.g_mobUnit[i][friend | this.pieceRook] = 0;
	        this.g_mobUnit[i][friend | this.pieceQueen] = 0;
	        this.g_mobUnit[i][friend | this.pieceKing] = 0;
	    }
	};
	
	self.SetHash = function() {
	    var result = new Object();
	    result.hashKeyLow = 0;
	    result.hashKeyHigh = 0;
	
	    for (var i = 0; i < 256; i++) {
	        var piece = this.g_board[i];
	        if (piece & 0x18) {
	            result.hashKeyLow ^= this.g_zobristLow[i][piece & 0xF];
	            result.hashKeyHigh ^= this.g_zobristHigh[i][piece & 0xF];
	        }
	 }
	
	    if (!this.g_toMove) {
	        result.hashKeyLow ^= this.g_zobristBlackLow;
	        result.hashKeyHigh ^= this.g_zobristBlackHigh;
	    }
	
	    return result;
	};
	
	self.InitializeFromFen = function(fen) {
//Ti.API.info("Engine==InitializeFromFen : "+fen);		
	    var chunks = fen.split(' ');
	    
	    for (var i = 0; i < 256; i++) 
	        this.g_board[i] = 0x80;
	    
	    var row = 0;
	    var col = 0;
	    
	    var pieces = chunks[0];
	    for (var i = 0; i < pieces.length; i++) {
	        var c = pieces.charAt(i);
	        
	        if (c == '/') {
	            row++;
	            col = 0;
	        }
	        else {
	            if (c >= '0' && c <= '9') {
	                for (var j = 0; j < parseInt(c); j++) {
	                    this.g_board[this.MakeSquare(row, col)] = 0;
	                    col++;
	                }
	            }
	            else {
	                var isBlack = c >= 'a' && c <= 'z';
	                var piece = isBlack ? this.colorBlack : this.colorWhite;
	                if (!isBlack) 
	                    c = pieces.toLowerCase().charAt(i);
	                switch (c) {
	                    case 'p':
	                        piece |= this.piecePawn;
	                        break;
	                    case 'b':
	                        piece |= this.pieceBishop;
	                        break;
	                    case 'n':
	                        piece |= this.pieceKnight;
	                        break;
	                    case 'r':
	                        piece |= this.pieceRook;
	                        break;
	                    case 'q':
	                        piece |= this.pieceQueen;
	                        break;
	                    case 'k':
	                        piece |= this.pieceKing;
	                        break;
	                }
	                
	                this.g_board[this.MakeSquare(row, col)] = piece;
	                
	                col++;
	            }
	        }
	    }
	    
	    this.InitializePieceList();
	    
	    this.g_toMove = chunks[1].charAt(0) == 'w' ? this.colorWhite : 0;
//Ti.API.info("g_toMove:"+this.g_toMove+"    "+this.colorWhite);	    
	    var them = 8 - this.g_toMove;
	    
	    this.g_castleRights = 0;
	    if (chunks[2].indexOf('K') != -1) { 
	        if (this.g_board[this.MakeSquare(7, 4)] != (this.pieceKing | this.colorWhite) ||
	            this.g_board[this.MakeSquare(7, 7)] != (this.pieceRook | this.colorWhite)) {
	            Ti.API.info('Invalid FEN: White kingside castling not allowed');
	        }else{
	        	this.g_castleRights |= 1;
	        }	
	    }
	    if (chunks[2].indexOf('Q') != -1) {
	        if (this.g_board[this.MakeSquare(7, 4)] != (this.pieceKing | this.colorWhite) ||
	            this.g_board[this.MakeSquare(7, 0)] != (this.pieceRook | this.colorWhite)) {
	            Ti.API.info('Invalid FEN: White queenside castling not allowed');
	        }else{
	       		this.g_castleRights |= 2;
	       	} 
	    }
	    if (chunks[2].indexOf('k') != -1) {
	        if (this.g_board[this.MakeSquare(0, 4)] != (this.pieceKing | this.colorBlack) ||
	            this.g_board[this.MakeSquare(0, 7)] != (this.pieceRook | this.colorBlack)) {
	            Ti.API.info('Invalid FEN: Black kingside castling not allowed');
	        }else{
	        	this.g_castleRights |= 4;
	        }	
	    }
	    if (chunks[2].indexOf('q') != -1) {
	        if (this.g_board[this.MakeSquare(0, 4)] != (this.pieceKing | this.colorBlack) ||
	            this.g_board[this.MakeSquare(0, 0)] != (this.pieceRook | this.colorBlack)) {
	            Ti.API.info('Invalid FEN: Black queenside castling not allowed');
	        }else{
	        	this.g_castleRights |= 8;
	        }
	    }
	    
	    this.g_enPassentSquare = -1;
	    if (chunks[3].indexOf('-') == -1) {
			var col = chunks[3].charAt(0).charCodeAt() - 'a'.charCodeAt();
			var row = 8 - (chunks[3].charAt(1).charCodeAt() - '0'.charCodeAt());
			this.g_enPassentSquare = this.MakeSquare(row, col);
	    }
		
	    var hashResult = this.SetHash();
	    this.g_hashKeyLow = hashResult.hashKeyLow;
	    this.g_hashKeyHigh = hashResult.hashKeyHigh;
	
	    this.g_baseEval = 0;
	    for (var i = 0; i < 256; i++) {
	        if (this.g_board[i] & this.colorWhite) {
	            this.g_baseEval += this.pieceSquareAdj[this.g_board[i] & 0x7][i];
	            this.g_baseEval += this.materialTable[this.g_board[i] & 0x7];
	        } else if (this.g_board[i] & this.colorBlack) {
	            this.g_baseEval -= this.pieceSquareAdj[this.g_board[i] & 0x7][this.flipTable[i]];
	            this.g_baseEval -= this.materialTable[this.g_board[i] & 0x7];
	        }
	    }
		    
	    if (!this.g_toMove) this.g_baseEval = -this.g_baseEval;
	
	    this.g_move50 = 0;
	    this.g_inCheck = this.IsSquareAttackable(this.g_pieceList[(this.g_toMove | this.pieceKing) << 4], them);
	
	    // Check for king capture (invalid FEN)
	    if (this.IsSquareAttackable(this.g_pieceList[(them | this.pieceKing) << 4], this.g_toMove)) {
	        return 'Invalid FEN: Can capture king';
	    }
	
	    // Checkmate/stalemate
	    if (this.GenerateValidMoves().length == 0) {
	        return this.g_inCheck ? 'Checkmate' : 'Stalemate';
	    } 
	
	    return '';
	};
	
	self.g_pieceIndex = new Array(256);
	self.g_pieceList = new Array(2 * 8 * 16);
	self.g_pieceCount = new Array(2 * 8);
	
	self.InitializePieceList = function() {
	    for (var i = 0; i < 16; i++) {
	        this.g_pieceCount[i] = 0;
	        for (var j = 0; j < 16; j++) {
	            // 0 is used as the terminator for piece lists
	            this.g_pieceList[(i << 4) | j] = 0;
	        }
	    }
	        
	
	    for (var i = 0; i < 256; i++) {
	        this.g_pieceIndex[i] = 0;
	        if (this.g_board[i] & (this.colorWhite | this.colorBlack)) {
				var piece = this.g_board[i] & 0xF;
	
				this.g_pieceList[(piece << 4) | this.g_pieceCount[piece]] = i;
				this.g_pieceIndex[i] = this.g_pieceCount[piece];
				this.g_pieceCount[piece]++;
	        }
	    }

	};
	
	self.MakeMove = function(move){
	    var me = this.g_toMove >> 3;
		var otherColor = 8 - this.g_toMove; 
	    
	    var flags = move & 0xFF0000;
	    var to = (move >> 8) & 0xFF;
	    var from = move & 0xFF;
	    
  //Ti.API.info("g_board:"+this.g_board.length+"  "+this.g_board);  
	    
	    var captured = this.g_board[to];
	    var piece = this.g_board[from];
	    
//Ti.API.info("<<<< "+move+"  "+this.GetMoveSAN(move)+"  "+from+" "+to+" "+captured+" "+piece);

	    
	    var epcEnd = to;
	
	    if (flags & this.moveflagEPC) {
	        epcEnd = me ? (to + 0x10) : (to - 0x10);
	        captured = this.g_board[epcEnd];
	        this.g_board[epcEnd] = this.pieceEmpty;
	    }
	
	    this.g_moveUndoStack[this.g_moveCount] = new UndoHistory(this.g_enPassentSquare, this.g_castleRights, this.g_inCheck, this.g_baseEval, this.g_hashKeyLow, this.g_hashKeyHigh, this.g_move50, captured);
	    this.g_moveCount++;
	
	    this.g_enPassentSquare = -1;
	
	    if (flags) {
	        if (flags & this.moveflagCastleKing) {
	            if (this.IsSquareAttackable(from + 1, otherColor) ||
	            	this.IsSquareAttackable(from + 2, otherColor)) {
	                this.g_moveCount--;
	                return false;
	            }
	            
	            var rook = this.g_board[to + 1];
	            
	            this.g_hashKeyLow ^= this.g_zobristLow[to + 1][this.rook & 0xF];
	            this.g_hashKeyHigh ^= this.g_zobristHigh[to + 1][this.rook & 0xF];
	            this.g_hashKeyLow ^= this.g_zobristLow[to - 1][this.rook & 0xF];
	            this.g_hashKeyHigh ^= this.g_zobristHigh[to - 1][this.rook & 0xF];
	            
	            this.g_board[to - 1] = rook;
	            this.g_board[to + 1] = this.pieceEmpty;
	            
	            this.g_baseEval -= this.pieceSquareAdj[rook & 0x7][me == 0 ? this.flipTable[to + 1] : (to + 1)];
	            this.g_baseEval += this.pieceSquareAdj[rook & 0x7][me == 0 ? this.flipTable[to - 1] : (to - 1)];
	
	            var rookIndex = this.g_pieceIndex[to + 1];
	            this.g_pieceIndex[to - 1] = rookIndex;
	            this.g_pieceList[((rook & 0xF) << 4) | rookIndex] = to - 1;
	        } else if (flags & this.moveflagCastleQueen) {
	            if (this.IsSquareAttackable(from - 1, this.otherColor) ||
	            	this.IsSquareAttackable(from - 2, this.otherColor)) {
	                this.g_moveCount--;
	                return false;
	            }
	            
	            var rook = this.g_board[to - 2];
	
	            this.g_hashKeyLow ^= this.g_zobristLow[to -2][this.rook & 0xF];
	            this.g_hashKeyHigh ^= this.g_zobristHigh[to - 2][this.rook & 0xF];
	            this.g_hashKeyLow ^= this.g_zobristLow[to + 1][this.rook & 0xF];
	            this.g_hashKeyHigh ^= this.g_zobristHigh[to + 1][this.rook & 0xF];
	            
	            this.g_board[to + 1] = rook;
	            this.g_board[to - 2] = this.pieceEmpty;
	            
	            this.g_baseEval -= this.pieceSquareAdj[rook & 0x7][me == 0 ? this.flipTable[to - 2] : (to - 2)];
	            this.g_baseEval += this.pieceSquareAdj[rook & 0x7][me == 0 ? this.flipTable[to + 1] : (to + 1)];
	
	            var rookIndex = this.g_pieceIndex[to - 2];
	            this.g_pieceIndex[to + 1] = rookIndex;
	            this.g_pieceList[((rook & 0xF) << 4) | rookIndex] = to + 1;
	        }
	    }
	
	    if (captured) {
	        // Remove our piece from the piece list
	        var capturedType = captured & 0xF;
	        this.g_pieceCount[capturedType]--;
	        var lastPieceSquare = this.g_pieceList[(capturedType << 4) | this.g_pieceCount[capturedType]];
	        this.g_pieceIndex[lastPieceSquare] = this.g_pieceIndex[epcEnd];
	        this.g_pieceList[(capturedType << 4) | this.g_pieceIndex[lastPieceSquare]] = lastPieceSquare;
	        this.g_pieceList[(capturedType << 4) | this.g_pieceCount[capturedType]] = 0;
	
	        this.g_baseEval += this.materialTable[captured & 0x7];
	        this.g_baseEval += this.pieceSquareAdj[captured & 0x7][me ? this.flipTable[epcEnd] : epcEnd];
	
	        this.g_hashKeyLow ^= this.g_zobristLow[epcEnd][capturedType];
	        this.g_hashKeyHigh ^= this.g_zobristHigh[epcEnd][capturedType];
	        this.g_move50 = 0;
	    } else if ((piece & 0x7) == this.piecePawn) {
	        var diff = to - from;
	        if (diff < 0) diff = -diff;
	        if (diff > 16) {
	            this.g_enPassentSquare = me ? (to + 0x10) : (to - 0x10);
	        }
	        this.g_move50 = 0;
	    }
	
	    this.g_hashKeyLow ^= this.g_zobristLow[from][piece & 0xF];
	    this.g_hashKeyHigh ^= this.g_zobristHigh[from][piece & 0xF];
	    this.g_hashKeyLow ^= this.g_zobristLow[to][piece & 0xF];
	    this.g_hashKeyHigh ^= this.g_zobristHigh[to][piece & 0xF];
	    this.g_hashKeyLow ^= this.g_zobristBlackLow;
	    this.g_hashKeyHigh ^= this.g_zobristBlackHigh;
	    
	    this.g_castleRights &= this.g_castleRightsMask[from] & this.g_castleRightsMask[to];
/*	    
	    Ti.API.info("piece ="+piece);
	    Ti.API.info("from:"+from);
	    Ti.API.info("this.flipTable[from]:"+this.flipTable[from]);
	    Ti.API.info("this.pieceSquareAdj:"+this.pieceSquareAdj);
	    
	    Ti.API.info("aaa:"+this.pieceSquareAdj[piece & 0x7]);
	    Ti.API.info("aaa:"+this.pieceSquareAdj[piece & 0x7][133]);
*/	    	    
	    this.g_baseEval -= this.pieceSquareAdj[piece & 0x7][me == 0 ? this.flipTable[from] : from];
	    
	    // Move our piece in the piece list
	    this.g_pieceIndex[to] = this.g_pieceIndex[from];
	    this.g_pieceList[((piece & 0xF) << 4) | this.g_pieceIndex[to]] = to;
	
	    if (flags & this.moveflagPromotion) {
	        var newPiece = piece & (~0x7);
	        if (flags & this.moveflagPromoteKnight) 
	            newPiece |= this.pieceKnight;
	        else if (flags & this.moveflagPromoteQueen) 
	            newPiece |= this.pieceQueen;
	        else if (flags & this.moveflagPromoteBishop) 
	            newPiece |= this.pieceBishop;
	        else 
	            newPiece |= this.pieceRook;
	
	        this.g_hashKeyLow ^= this.g_zobristLow[to][piece & 0xF];
	        this.g_hashKeyHigh ^= this.g_zobristHigh[to][piece & 0xF];
	        this.g_board[to] = newPiece;
	        this.g_hashKeyLow ^= this.g_zobristLow[to][newPiece & 0xF];
	        this.g_hashKeyHigh ^= this.g_zobristHigh[to][newPiece & 0xF];
	        
	        this.g_baseEval += this.pieceSquareAdj[newPiece & 0x7][me == 0 ? this.flipTable[to] : to];
	        this.g_baseEval -= this.materialTable[this.piecePawn];
	        this.g_baseEval += this.materialTable[newPiece & 0x7];
	
	        var pawnType = piece & 0xF;
	        var promoteType = newPiece & 0xF;
	
	        this.g_pieceCount[pawnType]--;
	
	        var lastPawnSquare = this.g_pieceList[(pawnType << 4) | this.g_pieceCount[pawnType]];
	        this.g_pieceIndex[lastPawnSquare] = this.g_pieceIndex[to];
        
	        this.g_pieceList[(pawnType << 4) | this.g_pieceIndex[lastPawnSquare]] = lastPawnSquare;
	        this.g_pieceList[(pawnType << 4) | this.g_pieceCount[pawnType]] = 0;
	        this.g_pieceIndex[to] = this.g_pieceCount[promoteType];
	        this.g_pieceList[(promoteType << 4) | this.g_pieceIndex[to]] = to;
	        this.g_pieceCount[promoteType]++;
	    } else {
	        this.g_board[to] = this.g_board[from];
	        
	        this.g_baseEval += this.pieceSquareAdj[piece & 0x7][me == 0 ? this.flipTable[to] : to];
	    }
	    this.g_board[from] = this.pieceEmpty;
	
	    this.g_toMove = otherColor;
	    this.g_baseEval = -this.g_baseEval;
	    
	    if ((piece & 0x7) == this.pieceKing || this.g_inCheck) {
	        if (this.IsSquareAttackable(this.g_pieceList[(this.pieceKing | (8 - this.g_toMove)) << 4], otherColor)) {
	            this.UnmakeMove(move);
	            return false;
	        }
	    } else {
	        var kingPos = this.g_pieceList[(this.pieceKing | (8 - this.g_toMove)) << 4];
	        
	        if (this.ExposesCheck(from, kingPos)) {
	            this.UnmakeMove(move);
	            return false;
	        }
	        
	        if (epcEnd != to) {
	            if (this.ExposesCheck(epcEnd, kingPos)) {
	                this.UnmakeMove(move);
	                return false;
	            }
	        }
	    }
	    
	    this.g_inCheck = false;
	    
	    if (flags <= this.moveflagEPC) {
	        var theirKingPos = this.g_pieceList[(this.pieceKing | this.g_toMove) << 4];
	        
	        // First check if the piece we moved can attack the enemy king
	        this.g_inCheck = this.IsSquareAttackableFrom(theirKingPos, to);
	        
	        if (!this.g_inCheck) {
	            // Now check if the square we moved from exposes check on the enemy king
	            this.g_inCheck = this.ExposesCheck(from, theirKingPos);
	            
	            if (!this.g_inCheck) {
	                // Finally, ep. capture can cause another square to be exposed
	                if (epcEnd != to) {
	                    this.g_inCheck = this.ExposesCheck(epcEnd, theirKingPos);
	                }
	            }
	        }
	    }
	    else {
	        // Castle or promotion, slow check
	        this.g_inCheck = this.IsSquareAttackable(this.g_pieceList[(this.pieceKing | this.g_toMove) << 4], 8 - this.g_toMove);
	    }
	
	    this.g_repMoveStack[this.g_moveCount - 1] = this.g_hashKeyLow;
	    this.g_move50++;
	
	    return true;
	};
	
	self.UnmakeMove = function(move){
	    this.g_toMove = 8 - this.g_toMove;
	    this.g_baseEval = -this.g_baseEval;
	    
	    this.g_moveCount--;
	    this.g_enPassentSquare = this.g_moveUndoStack[this.g_moveCount].ep;
	    this.g_castleRights = this.g_moveUndoStack[this.g_moveCount].castleRights;
	    this.g_inCheck = this.g_moveUndoStack[this.g_moveCount].inCheck;
	    this.g_baseEval = this.g_moveUndoStack[this.g_moveCount].baseEval;
	    this.g_hashKeyLow = this.g_moveUndoStack[this.g_moveCount].hashKeyLow;
	    this.g_hashKeyHigh = this.g_moveUndoStack[this.g_moveCount].hashKeyHigh;
	    this.g_move50 = this.g_moveUndoStack[this.g_moveCount].move50;
	    
	    var otherColor = 8 - this.g_toMove;
	    var me = this.g_toMove >> 3;
	    var them = otherColor >> 3;
	    
	    var flags = move & 0xFF0000;
	    var captured = this.g_moveUndoStack[this.g_moveCount].captured;
	    var to = (move >> 8) & 0xFF;
	    var from = move & 0xFF;
	    
	    var piece = this.g_board[to];
	    
	    if (flags) {
	        if (flags & this.moveflagCastleKing) {
	            var rook = this.g_board[to - 1];
	            this.g_board[to + 1] = rook;
	            this.g_board[to - 1] = this.pieceEmpty;
				
	            var rookIndex = this.g_pieceIndex[to - 1];
	            this.g_pieceIndex[to + 1] = rookIndex;
	            this.g_pieceList[((rook & 0xF) << 4) | rookIndex] = to + 1;
	        }
	        else if (flags & this.moveflagCastleQueen) {
	            var rook = this.g_board[to + 1];
	            this.g_board[to - 2] = rook;
	            this.g_board[to + 1] = this.pieceEmpty;
				
	            var rookIndex = this.g_pieceIndex[to + 1];
	            this.g_pieceIndex[to - 2] = rookIndex;
	            this.g_pieceList[((rook & 0xF) << 4) | rookIndex] = to - 2;
	        }
	    }
	    
	    if (flags & this.moveflagPromotion) {
	        piece = (this.g_board[to] & (~0x7)) | this.piecePawn;
	        this.g_board[from] = piece;
	
	        var pawnType = this.g_board[from] & 0xF;
	        var promoteType = this.g_board[to] & 0xF;
	
	        this.g_pieceCount[promoteType]--;
	
	        var lastPromoteSquare = this.g_pieceList[(promoteType << 4) | this.g_pieceCount[promoteType]];
	        this.g_pieceIndex[lastPromoteSquare] = this.g_pieceIndex[to];
	        this.g_pieceList[(promoteType << 4) | this.g_pieceIndex[lastPromoteSquare]] = lastPromoteSquare;
	        this.g_pieceList[(promoteType << 4) | this.g_pieceCount[promoteType]] = 0;
	        this.g_pieceIndex[to] = this.g_pieceCount[pawnType];
	        this.g_pieceList[(pawnType << 4) | this.g_pieceIndex[to]] = to;
	        this.g_pieceCount[pawnType]++;
	    }
	    else {
	        this.g_board[from] = this.g_board[to];
	    }
	
	    var epcEnd = to;
	    if (flags & this.moveflagEPC) {
	        if (this.g_toMove == this.colorWhite) 
	            epcEnd = to + 0x10;
	        else 
	            epcEnd = to - 0x10;
	        this.g_board[to] = this.pieceEmpty;
	    }
	    
	    this.g_board[epcEnd] = captured;
	
		// Move our piece in the piece list
	    this.g_pieceIndex[from] = this.g_pieceIndex[to];
	    this.g_pieceList[((piece & 0xF) << 4) | this.g_pieceIndex[from]] = from;
	
	    if (captured) {
			// Restore our piece to the piece list
	        var captureType = captured & 0xF;
	        this.g_pieceIndex[epcEnd] = this.g_pieceCount[captureType];
	        this.g_pieceList[(captureType << 4) | this.g_pieceCount[captureType]] = epcEnd;
	        this.g_pieceCount[captureType]++;
	    }
	};
	
	self.ExposesCheck = function(from, kingPos){
	    var index = kingPos - from + 128;
	    
//Ti.API.info('ExposesCheck == '+kingPos+"  "+from);	    
	    // If a queen can't reach it, nobody can!
	    if ((this.g_vectorDelta[index].pieceMask[0] & (1 << (this.pieceQueen))) != 0) {
	        var delta = this.g_vectorDelta[index].delta;
	        var pos = kingPos + delta;
	        while (this.g_board[pos] == 0) pos += delta;
	        
	        var piece = this.g_board[pos];
	        if (((piece & (this.g_board[kingPos] ^ 0x18)) & 0x18) == 0)
	            return false;
	
	        // Now see if the piece can actually attack the king
	        var backwardIndex = pos - kingPos + 128;
	        return (this.g_vectorDelta[backwardIndex].pieceMask[(piece >> 3) & 1] & (1 << (piece & 0x7))) != 0;
	    }
	    return false;
	};
	
	self.IsSquareOnPieceLine = function(target, from) {
	    var index = from - target + 128;
	    var piece = this.g_board[from];
	    return (this.g_vectorDelta[index].pieceMask[(piece >> 3) & 1] & (1 << (piece & 0x7))) ? true : false;
	};
	
	self.IsSquareAttackableFrom = function(target, from){
	    var index = from - target + 128;
	    var piece = this.g_board[from];
    
	    if (this.g_vectorDelta[index].pieceMask[(piece >> 3) & 1] & (1 << (piece & 0x7))) {
	        // Yes, this square is pseudo-attackable.  Now, check for real attack
			var inc = this.g_vectorDelta[index].delta;
	        do {
				from += inc;
				if (from == target)
					return true;
			} while (this.g_board[from] == 0);
	    }
	    
	    return false;
	};
	
	self.IsSquareAttackable = function(target, color) {
		// Attackable by pawns?
		var inc = color ? -16 : 16;
		var pawn = (color ? this.colorWhite : this.colorBlack) | 1;
		if (this.g_board[target - (inc - 1)] == pawn)
			return true;
		if (this.g_board[target - (inc + 1)] == pawn)
			return true;
		
		// Attackable by pieces?
		for (var i = 2; i <= 6; i++) {
	        var index = (color | i) << 4;
	        var square = this.g_pieceList[index];
	               
			while (square != 0) {
				if (this.IsSquareAttackableFrom(target, square))
					return true;
				square = this.g_pieceList[++index];
			}
	    }
	    return false;
	};
	
	self.GenerateMove = function(from, to) {
	    return from | (to << 8);
	};
	
	self.GenerateMove = function(from, to, flags){		
//Ti.API.info("%%%%%%%%%"+from+" "+to+" "+flags+"  "+(from | (to << 8) | flags));		
	    return from | (to << 8) | flags;
	};
	
	self.GenerateValidMoves = function() {
//Ti.API.info('generate valid moves.'+this.g_toMove);		
	    var moveList = new Array();
	    var allMoves = new Array();
	    
	    this.GenerateCaptureMoves(allMoves, null);
//Ti.API.info('GenerateCaptureMoves:'+allMoves+"  "+this.g_toMove);
	    
	    this.GenerateAllMoves(allMoves);
	    
	    
	    for (var i = allMoves.length - 1; i >= 0; i--) {
//Ti.API.info(i+'GenerateAllMoves:'+allMoves[i]+'   '+this.GetMoveSAN(allMoves[i]));	    	
	        if (this.MakeMove(allMoves[i])) {
	            moveList[moveList.length] = allMoves[i];
	            this.UnmakeMove(allMoves[i]);
	        }
	    }
	    
	    return moveList;
	};
	
	self.GenerateAllMoves = function(moveStack) {
		
	    var from, to, piece, pieceIdx;
//Ti.API.info("this.g_toMove:"+this.g_toMove);	
		// Pawn quiet moves
	    pieceIdx = (this.g_toMove | 1) << 4;
	    from = this.g_pieceList[pieceIdx++];
//Ti.API.info(pieceIdx+"   "+from);	    
	    while (from != 0) {
	        this.GeneratePawnMoves(moveStack, from);
	        from = this.g_pieceList[pieceIdx++];        
	    }
	    // Knight quiet moves
		pieceIdx = (this.g_toMove | 2) << 4;
		from = this.g_pieceList[pieceIdx++];
		while (from != 0) {
			to = from + 31; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from + 33; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from + 14; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from - 14; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from - 31; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from - 33; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from + 18; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from - 18; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);
			from = this.g_pieceList[pieceIdx++];
		}

		// Bishop quiet moves
		pieceIdx = (this.g_toMove | 3) << 4;
		from = this.g_pieceList[pieceIdx++];
		while (from != 0) {
			to = from - 15; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to -= 15; }
			to = from - 17; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to -= 17; }
			to = from + 15; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to += 15; }
			to = from + 17; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to += 17; }
			from = this.g_pieceList[pieceIdx++];
		}
	
		// Rook quiet moves
		pieceIdx = (this.g_toMove | 4) << 4;
		from = this.g_pieceList[pieceIdx++];
//Ti.API.info(pieceIdx+" ROOK? "+this.g_pieceList[pieceIdx-1]+"   "+this.g_pieceList[pieceIdx]+"----"+this.g_board[from+1]);	
		while (from != 0) {				
			to = from - 1; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to--;}
			to = from + 1; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to++; }
			to = from + 16; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to += 16; }
			to = from - 16; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to -= 16;  }
			from = this.g_pieceList[pieceIdx++];
		}
		
		// Queen quiet moves
		pieceIdx = (this.g_toMove | 5) << 4;
		from = this.g_pieceList[pieceIdx++];
		while (from != 0) {
			to = from - 15; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to -= 15; }
			to = from - 17; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to -= 17; }
			to = from + 15; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to += 15; }
			to = from + 17; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to += 17; }
			to = from - 1; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to--; }
			to = from + 1; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to++; }
			to = from + 16; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to += 16; }
			to = from - 16; while (this.g_board[to] == 0) { moveStack[moveStack.length] = this.GenerateMove(from, to); to -= 16; }
			from = this.g_pieceList[pieceIdx++];
		}	

		// King quiet moves
		{
			pieceIdx = (this.g_toMove | 6) << 4;
			from = this.g_pieceList[pieceIdx];
			to = from - 15; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from - 17; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from + 15; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from + 17; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from - 1; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from + 1; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from - 16; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from + 16; if (this.g_board[to] == 0) moveStack[moveStack.length] = this.GenerateMove(from, to);

//Ti.API.info("#### Generate All Moves:"+this.g_inCheck+" "+this.g_castleRights+" "+this.g_toMove+" "+this.moveflagCastleQueen);    
		
	        if (!this.g_inCheck) {
	            var castleRights = this.g_castleRights;
	            if (!this.g_toMove) 
	                castleRights >>= 2;
	            if (castleRights & 1) {
	                // Kingside castle
	                if (this.g_board[from + 1] == this.pieceEmpty && this.g_board[from + 2] == this.pieceEmpty) {
	                    moveStack[moveStack.length] = this.GenerateMove(from, from + 2, this.moveflagCastleKing);
	                }
	            }	            
	            if (castleRights & 2) {
//				if(castleRights == 15){
	                // Queenside castle
//Ti.API.info("// Queenside castle:"+from+" "+this.g_board[from - 1]+" "+this.g_board[from - 2]+" "+this.g_board[from - 3]);	                
	                if (this.g_board[from - 1] == this.pieceEmpty && this.g_board[from - 2] == this.pieceEmpty && this.g_board[from - 3] == this.pieceEmpty) {	                
	                    moveStack[moveStack.length] = this.GenerateMove(from, from - 2, this.moveflagCastleQueen);
	                }
	            }
	        }
	        
		}
	};
	
	self.GenerateCaptureMoves = function(moveStack, moveScores) {
//Ti.API.info("GenerateCaptureMoves:"+moveStack+"  "+moveScores);	

	    var from, to, piece, pieceIdx;
	    var inc = (this.g_toMove == 8) ? -16 : 16;
	    var enemy = this.g_toMove == 8 ? 0x10 : 0x8;
	
	    // Pawn captures
	    pieceIdx = (this.g_toMove | 1) << 4;
//(this.g_toMove+"  "+pieceIdx+"  "+this.g_pieceList);	    
	    from = this.g_pieceList[pieceIdx++];
//Ti.API.info("from:"+from);	    
	    while (from != 0) {
	        to = from + inc - 1;
	        if (this.g_board[to] & enemy) {
	            this.MovePawnTo(moveStack, from, to);
	        }
	
	        to = from + inc + 1;
	        if (this.g_board[to] & enemy) {
	            this.MovePawnTo(moveStack, from, to);
	        }
	
	        from = this.g_pieceList[pieceIdx++];
	    }
	
	    if (this.g_enPassentSquare != -1) {
	        var inc = (this.g_toMove == this.colorWhite) ? -16 : 16;
	        var pawn = this.g_toMove | this.piecePawn;
	
	        var from = this.g_enPassentSquare - (inc + 1);
	        if ((this.g_board[from] & 0xF) == pawn) {
	            moveStack[moveStack.length] = this.GenerateMove(from, this.g_enPassentSquare, this.moveflagEPC);
	        }
	
	        from = this.g_enPassentSquare - (inc - 1);
	        if ((this.g_board[from] & 0xF) == pawn) {
	            moveStack[moveStack.length] = this.GenerateMove(from, this.g_enPassentSquare, this.moveflagEPC);
	        }
	    }
	
	    // Knight captures
		pieceIdx = (this.g_toMove | 2) << 4;
		from = this.g_pieceList[pieceIdx++];
		while (from != 0) {
			to = from + 31; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from + 33; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from + 14; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from - 14; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from - 31; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from - 33; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from + 18; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from - 18; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			from = this.g_pieceList[pieceIdx++];
		}
		
		// Bishop captures
		pieceIdx = (this.g_toMove | 3) << 4;
		from = this.g_pieceList[pieceIdx++];
		while (from != 0) {
			to = from; do { to -= 15; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from; do { to -= 17; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from; do { to += 15; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from; do { to += 17; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			from = this.g_pieceList[pieceIdx++];
		}
		
		// Rook captures
		pieceIdx = (this.g_toMove | 4) << 4;
		from = this.g_pieceList[pieceIdx++];
		while (from != 0) {
			to = from; do { to--; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from; do { to++; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from; do { to -= 16; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from; do { to += 16; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			from = this.g_pieceList[pieceIdx++];
		}
		
		// Queen captures
		pieceIdx = (this.g_toMove | 5) << 4;
		from = this.g_pieceList[pieceIdx++];
		while (from != 0) {
			to = from; do { to -= 15; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from; do { to -= 17; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from; do { to += 15; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from; do { to += 17; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from; do { to--; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from; do { to++; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from; do { to -= 16; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from; do { to += 16; } while (this.g_board[to] == 0); if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			from = this.g_pieceList[pieceIdx++];
		}
		
		// King captures
		{
			pieceIdx = (this.g_toMove | 6) << 4;
			from = this.g_pieceList[pieceIdx];
			to = from - 15; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from - 17; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from + 15; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from + 17; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from - 1; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from + 1; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from - 16; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
			to = from + 16; if (this.g_board[to] & enemy) moveStack[moveStack.length] = this.GenerateMove(from, to);
		}
	};
	
	self.MovePawnTo = function(moveStack, start, square) {
		var row = square & 0xF0;
	    if ((row == 0x90) || (row == 0x20)) {
	        moveStack[moveStack.length] = this.GenerateMove(start, square, this.moveflagPromotion | this.moveflagPromoteQueen);
	        moveStack[moveStack.length] = this.GenerateMove(start, square, this.moveflagPromotion | this.moveflagPromoteKnight);
	        moveStack[moveStack.length] = this.GenerateMove(start, square, this.moveflagPromotion | this.moveflagPromoteBishop);
	        moveStack[moveStack.length] = this.GenerateMove(start, square, this.moveflagPromotion);
	    }
	    else {
	        moveStack[moveStack.length] = this.GenerateMove(start, square, 0);
	    }
	};
	
	self.GeneratePawnMoves = function(moveStack, from) {
	    var piece = this.g_board[from];
	    var color = piece & this.colorWhite;
	    var inc = (color == this.colorWhite) ? -16 : 16;
	    
		// Quiet pawn moves
		var to = from + inc;
		if (this.g_board[to] == 0) {
			this.MovePawnTo(moveStack, from, to, this.pieceEmpty);
			
			// Check if we can do a 2 square jump
			if ((((from & 0xF0) == 0x30) && color != this.colorWhite) ||
			    (((from & 0xF0) == 0x80) && color == this.colorWhite)) {
				to += inc;
				if (this.g_board[to] == 0) {
					moveStack[moveStack.length] = this.GenerateMove(from, to);
				}				
			}
		}
	};
	
	self.g_seeValues = [0, 1, 3, 3, 5, 9, 900, 0,
	                    0, 1, 3, 3, 5, 9, 900, 0];
	
	self.See = function(move) {
	    var from = move & 0xFF;
	    var to = (move >> 8) & 0xFF;
	
	    var fromPiece = this.g_board[from];
	
	    var fromValue = this.g_seeValues[fromPiece & 0xF];
	    var toValue = this.g_seeValues[this.g_board[to] & 0xF];
	
	    if (fromValue <= toValue) {
	        return true;
	    }
	
	    if (move >> 16) {
	        // Castles, promotion, ep are always good
	        return true;
	    }
	
	    var us = (fromPiece & this.colorWhite) ? this.colorWhite : 0;
	    var them = 8 - us;
	
	    // Pawn attacks 
	    // If any opponent pawns can capture back, this capture is probably not worthwhile (as we must be using knight or above).
	    var inc = (fromPiece & this.colorWhite) ? -16 : 16; // Note: this is capture direction from to, so reversed from normal move direction
	    if (((this.g_board[to + inc + 1] & 0xF) == (this.piecePawn | them)) ||
	        ((this.g_board[to + inc - 1] & 0xF) == (this.piecePawn | them))) {
	        return false;
	    }
	
	    var themAttacks = new Array();
	
	    // Knight attacks 
	    // If any opponent knights can capture back, and the deficit we have to make up is greater than the knights value, 
	    // it's not worth it.  We can capture on this square again, and the opponent doesn't have to capture back. 
	    var captureDeficit = fromValue - toValue;
	    this.SeeAddKnightAttacks(to, them, themAttacks);
	    if (themAttacks.length != 0 && captureDeficit > this.g_seeValues[this.pieceKnight]) {
	        return false;
	    }
	
	    // Slider attacks
	    this.g_board[from] = 0;
	    for (var pieceType = this.pieceBishop; pieceType <= this.pieceQueen; pieceType++) {
	        if (this.SeeAddSliderAttacks(to, them, themAttacks, pieceType)) {
	            if (captureDeficit > this.g_seeValues[pieceType]) {
	                this.g_board[from] = fromPiece;
	                return false;
	            }
	        }
	    }
	
	    // Pawn defenses 
	    // At this point, we are sure we are making a "losing" capture.  The opponent can not capture back with a 
	    // pawn.  They cannot capture back with a minor/major and stand pat either.  So, if we can capture with 
	    // a pawn, it's got to be a winning or equal capture. 
	    if (((this.g_board[to - inc + 1] & 0xF) == (this.piecePawn | us)) ||
	        ((this.g_board[to - inc - 1] & 0xF) == (this.piecePawn | us))) {
	        this.g_board[from] = fromPiece;
	        return true;
	    }
	
	    // King attacks
	    this.SeeAddSliderAttacks(to, them, themAttacks, this.pieceKing);
	
	    // Our attacks
	    var usAttacks = new Array();
	    this.SeeAddKnightAttacks(to, us, usAttacks);
	    for (var pieceType = this.pieceBishop; pieceType <= this.pieceKing; pieceType++) {
	        this.SeeAddSliderAttacks(to, us, usAttacks, pieceType);
	    }
	
	    this.g_board[from] = fromPiece;
	
	    // We are currently winning the amount of material of the captured piece, time to see if the opponent 
	    // can get it back somehow.  We assume the opponent can capture our current piece in this score, which 
	    // simplifies the later code considerably. 
	    var seeValue = toValue - fromValue;
	
	    for (; ; ) {
	        var capturingPieceValue = 1000;
	        var capturingPieceIndex = -1;
	
	        // Find the least valuable piece of the opponent that can attack the square
	        for (var i = 0; i < themAttacks.length; i++) {
	            if (themAttacks[i] != 0) {
	                var pieceValue = this.g_seeValues[this.g_board[themAttacks[i]] & 0x7];
	                if (pieceValue < capturingPieceValue) {
	                    capturingPieceValue = pieceValue;
	                    capturingPieceIndex = i;
	                }
	            }
	        }
	
	        if (capturingPieceIndex == -1) {
	            // Opponent can't capture back, we win
	            return true;
	        }
	
	        // Now, if seeValue < 0, the opponent is winning.  If even after we take their piece, 
	        // we can't bring it back to 0, then we have lost this battle. 
	        seeValue += capturingPieceValue;
	        if (seeValue < 0) {
	            return false;
	        }
	
	        var capturingPieceSquare = themAttacks[capturingPieceIndex];
	        themAttacks[capturingPieceIndex] = 0;
	
	        // Add any x-ray attackers
	        this.SeeAddXrayAttack(to, capturingPieceSquare, us, usAttacks, themAttacks);
	
	        // Our turn to capture
	        capturingPieceValue = 1000;
	        capturingPieceIndex = -1;
	
	        // Find our least valuable piece that can attack the square
	        for (var i = 0; i < usAttacks.length; i++) {
	            if (usAttacks[i] != 0) {
	                var pieceValue = this.g_seeValues[this.g_board[usAttacks[i]] & 0x7];
	                if (pieceValue < capturingPieceValue) {
	                    capturingPieceValue = pieceValue;
	                    capturingPieceIndex = i;
	                }
	            }
	        }
	
	        if (capturingPieceIndex == -1) {
	            // We can't capture back, we lose :( 
	            return false;
	        }
	
	        // Assume our opponent can capture us back, and if we are still winning, we can stand-pat 
	        // here, and assume we've won. 
	        seeValue -= capturingPieceValue;
	        if (seeValue >= 0) {
	            return true;
	        }
	
	        capturingPieceSquare = usAttacks[capturingPieceIndex];
	        usAttacks[capturingPieceIndex] = 0;
	
	        // Add any x-ray attackers
	        this.SeeAddXrayAttack(to, capturingPieceSquare, us, usAttacks, themAttacks);
	    }
	};
	
	self.SeeAddXrayAttack = function(target, square, us, usAttacks, themAttacks) {
	    var index = square - target + 128;
	    var delta = -this.g_vectorDelta[index].delta;
	    if (delta == 0)
	        return;
	    square += delta;
	    while (this.g_board[square] == 0) {
	        square += delta;
	    }
	
	    if ((this.g_board[square] & 0x18) && this.IsSquareOnPieceLine(target, square)) {
	        if ((this.g_board[square] & 8) == us) {
	            usAttacks[usAttacks.length] = square;
	        } else {
	            themAttacks[themAttacks.length] = square;
	        }
	    }
	};
	
	// target = attacking square, us = color of knights to look for, attacks = array to add squares to
	self.SeeAddKnightAttacks = function(target, us, attacks) {
	    var pieceIdx = (us | this.pieceKnight) << 4;
	    var attackerSq = this.g_pieceList[pieceIdx++];
	
	    while (attackerSq != 0) {
	        if (this.IsSquareOnPieceLine(target, attackerSq)) {
	            attacks[attacks.length] = attackerSq;
	        }
	        attackerSq = this.g_pieceList[pieceIdx++];
	    }
	};
	
	self.SeeAddSliderAttacks = function(target, us, attacks, pieceType) {
	    var pieceIdx = (us | pieceType) << 4;
	    var attackerSq = this.g_pieceList[pieceIdx++];
	    var hit = false;
	
	    while (attackerSq != 0) {
	        if (this.IsSquareAttackableFrom(target, attackerSq)) {
	            attacks[attacks.length] = attackerSq;
	            hit = true;
	        }
	        attackerSq = this.g_pieceList[pieceIdx++];
	    }
	
	    return hit;
	};
	
	self.BuildPVMessage = function(bestMove, value, timeTaken, ply) {
	    var totalNodes = this.g_nodeCount + this.g_qNodeCount;
	    var pvM = "Ply:" + ply + " Score:" + value + " Nodes:" + totalNodes + " NPS:" + ((totalNodes / (timeTaken / 1000)) | 0) + " " + this.PVFromHash(bestMove, 15);
	
	    return pvM;
	};
	
	//////////////////////////////////////////////////
	// Test Harness
	//////////////////////////////////////////////////
	self.FinishPlyCallback = function(bestMove, value, timeTaken, ply) {
	    //postMessage("pv " + BuildPVMessage(bestMove, value, timeTaken, ply));
//Ti.API.info("bestMove --- "+bestMove);	
		var movSan = this.GetMoveSAN(bestMove);   

    //    Ti.API.info("FEN==="+this.GetFen());
    	var from = bestMove & 0xFF;
	    var to = (bestMove >> 8) & 0xFF;
	    	    
	    var sx = (from & 0xF) - 4;
	    var sy = (from >> 4)-2;
	    
	    var ex = (to & 0xF) - 4;
	    var ey = (to >> 4)-2;
	    
//        Ti.API.info('piece:'+sx+" "+sy+" "+ex+" "+ey);
  
        this.MakeMove(bestMove);
           
        return {sx:sx, sy:sy, ex:ex, ey:ey, move:movSan};
         
//	   	var pvMsg = this.BuildPVMessage(bestMove, value, timeTaken, ply);
//	   	Ti.API.info("PV Message:"+pvMsg);
//	    this.UpdatePVDisplay(pvMsg);
	};
	
	self.FinishMoveLocalTesting = function(bestMove, value, timeTaken, ply) {
	    if (bestMove != null) {
	        this.MakeMove(bestMove);
	        //postMessage(FormatMove(bestMove));
//	        Ti.API.info('format best move:'+this.FormatMove(bestMove));	        
	    }
	};
	

	self.onmessage = function (e) {
		
	    if (e.data == "go" || needsReset) {
	        ResetGame();
	        needsReset = false;
	        if (e.data == "go") return;
	    }
	    if (e.data.match("^position") == "position") {
	        ResetGame();
	        var result = this.InitializeFromFen(e.data.substr(9, e.data.length - 9));
	        if (result.length != 0) {
	            postMessage("message " + result);
	        }
	    } else if (e.data.match("^search") == "search") {
	        g_timeout = parseInt(e.data.substr(7, e.data.length - 7), 10);
	        Search(FinishMoveLocalTesting, 99, FinishPlyCallback);
	    } else if (e.data == "analyze") {
	        g_timeout = 99999999999;
	        Search(null, 99, FinishPlyCallback);
	    } else {
	        MakeMove(GetMoveFromString(e.data));
	    }
	};
	
	return self;
}

module.exports = Engine;	

function MT() {
 	var N = 624;
	var M = 397;
	var MAG01 = [0x0, 0x9908b0df];
    
    this.mt = new Array(N);
    this.mti = N + 1;

    this.setSeed = function()
	{
		var a = arguments;
		switch (a.length) {
		case 1:
			if (a[0].constructor === Number) {
				this.mt[0]= a[0];
				for (var i = 1; i < N; ++i) {
					var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
					this.mt[i] = ((1812433253 * ((s & 0xffff0000) >>> 16))
							<< 16)
						+ 1812433253 * (s & 0x0000ffff)
						+ i;
				}
				this.mti = N;
				return;
			}

			this.setSeed(19650218);

			var l = a[0].length;
			var i = 1;
			var j = 0;

			for (var k = N > l ? N : l; k != 0; --k) {
				var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
				this.mt[i] = (this.mt[i]
						^ (((1664525 * ((s & 0xffff0000) >>> 16)) << 16)
							+ 1664525 * (s & 0x0000ffff)))
					+ a[0][j]
					+ j;
				if (++i >= N) {
					this.mt[0] = this.mt[N - 1];
					i = 1;
				}
				if (++j >= l) {
					j = 0;
				}
			}

			for (var k = N - 1; k != 0; --k) {
				var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
				this.mt[i] = (this.mt[i]
						^ (((1566083941 * ((s & 0xffff0000) >>> 16)) << 16)
							+ 1566083941 * (s & 0x0000ffff)))
					- i;
				if (++i >= N) {
					this.mt[0] = this.mt[N-1];
					i = 1;
				}
			}

			this.mt[0] = 0x80000000;
			return;
		default:
			var seeds = new Array();
			for (var i = 0; i < a.length; ++i) {
				seeds.push(a[i]);
			}
			this.setSeed(seeds);
			return;
		}
	};

    this.setSeed(0x1BADF00D);

    this.next = function (bits)
	{
		if (this.mti >= N) {
			var x = 0;

			for (var k = 0; k < N - M; ++k) {
				x = (this.mt[k] & 0x80000000) | (this.mt[k + 1] & 0x7fffffff);
				this.mt[k] = this.mt[k + M] ^ (x >>> 1) ^ MAG01[x & 0x1];
			}
			for (var k = N - M; k < N - 1; ++k) {
				x = (this.mt[k] & 0x80000000) | (this.mt[k + 1] & 0x7fffffff);
				this.mt[k] = this.mt[k + (M - N)] ^ (x >>> 1) ^ MAG01[x & 0x1];
			}
			x = (this.mt[N - 1] & 0x80000000) | (this.mt[0] & 0x7fffffff);
			this.mt[N - 1] = this.mt[M - 1] ^ (x >>> 1) ^ MAG01[x & 0x1];

			this.mti = 0;
		}

		var y = this.mt[this.mti++];
		y ^= y >>> 11;
		y ^= (y << 7) & 0x9d2c5680;
		y ^= (y << 15) & 0xefc60000;
		y ^= y >>> 18;
		return (y >>> (32 - bits)) & 0xFFFFFFFF;
	};
}

function UndoHistory(ep, castleRights, inCheck, baseEval, hashKeyLow, hashKeyHigh, move50, captured) {
    this.ep = ep;
    this.castleRights = castleRights;
    this.inCheck = inCheck;
    this.baseEval = baseEval;
    this.hashKeyLow = hashKeyLow;
    this.hashKeyHigh = hashKeyHigh;
    this.move50 = move50;
    this.captured = captured;
}

function MovePicker(hashMove, depth, killer1, killer2,obj) {
	
    this.hashMove = hashMove;
    this.depth = depth;
    this.killer1 = killer1;
    this.killer2 = killer2;

    this.moves = new Array();
    this.losingCaptures = null;
    this.moveCount = 0;
    this.atMove = -1;
    this.moveScores = null;
    this.stage = 0;
    

    this.nextMove = function () {

        if (++this.atMove == this.moveCount) {
            this.stage++;
            if (this.stage == 1) {
                if (this.hashMove != null && obj.IsHashMoveValid(this.hashMove)) {
                    this.moves[0] = this.hashMove;
                    this.moveCount = 1;
                }
                if (this.moveCount != 1) {
                    this.hashMove = null;
                    this.stage++;
                }
            }
            if (this.stage == 2) {
                obj.GenerateCaptureMoves(this.moves, null);
              
                this.moveCount = this.moves.length;
                this.moveScores = new Array(this.moveCount);
                // Move ordering
                for (var i = this.atMove; i < this.moveCount; i++) {
                    var captured = obj.g_board[(this.moves[i] >> 8) & 0xFF] & 0x7;
                    var pieceType = obj.g_board[this.moves[i] & 0xFF] & 0x7;
                    this.moveScores[i] = (captured << 5) - pieceType;
                }
                // No moves, onto next stage
                if (this.atMove == this.moveCount) this.stage++;
            }
            if (this.stage == 3) {
                if (obj.IsHashMoveValid(this.killer1) &&
                    this.killer1 != this.hashMove) {
                    this.moves[this.moves.length] = this.killer1;
                    this.moveCount = this.moves.length;
                } else {
                    this.killer1 = 0;
                    this.stage++;
                }
            }
            if (this.stage == 4) {
                if (obj.IsHashMoveValid(this.killer2) &&
                    this.killer2 != this.hashMove) {
                    this.moves[this.moves.length] = this.killer2;
                    this.moveCount = this.moves.length;
                } else {
                    this.killer2 = 0;
                    this.stage++;
                }
            }
            if (this.stage == 5) {
                obj.GenerateAllMoves(this.moves);
             
                this.moveCount = this.moves.length;
                // Move ordering
                for (var i = this.atMove; i < this.moveCount; i++) this.moveScores[i] = obj.ScoreMove(this.moves[i]);
                
                // No moves, onto next stage
                if (this.atMove == this.moveCount) this.stage++;
            }

            if (this.stage == 6) {
                // Losing captures
                if (this.losingCaptures != null) {
                    for (var i = 0; i < this.losingCaptures.length; i++) {
                        this.moves[this.moves.length] = this.losingCaptures[i];
                    }
                    for (var i = this.atMove; i < this.moveCount; i++) this.moveScores[i] = ScoreMove(this.moves[i]);
                    this.moveCount = this.moves.length;
                }
                // No moves, onto next stage
                if (this.atMove == this.moveCount) this.stage++;
            }

            if (this.stage == 7)
                return 0;
        }

        var bestMove = this.atMove;
        for (var j = this.atMove + 1; j < this.moveCount; j++) {
            if (this.moveScores[j] > this.moveScores[bestMove]) {
                bestMove = j;
            }
        }

        if (bestMove != this.atMove) {
            var tmpMove = this.moves[this.atMove];
            this.moves[this.atMove] = this.moves[bestMove];
            this.moves[bestMove] = tmpMove;

            var tmpScore = this.moveScores[this.atMove];
            this.moveScores[this.atMove] = this.moveScores[bestMove];
            this.moveScores[bestMove] = tmpScore;
        }

        var candidateMove = this.moves[this.atMove];
        if ((this.stage > 1 && candidateMove == this.hashMove) ||
            (this.stage > 3 && candidateMove == this.killer1) ||
            (this.stage > 4 && candidateMove == this.killer2)) {
            return this.nextMove();
        }

        if (this.stage == 2 && !obj.See(candidateMove)) {
            if (this.losingCaptures == null) {
                this.losingCaptures = new Array();
            }
            this.losingCaptures[this.losingCaptures.length] = candidateMove;
            return this.nextMove();
        }

        return this.moves[this.atMove];
    };
    
    
}

function HashEntry(lock, value, flags, hashDepth, bestMove, globalPly) {
    this.lock = lock;
    this.value = value;
    this.flags = flags;
    this.hashDepth = hashDepth;
    this.bestMove = bestMove;
}
