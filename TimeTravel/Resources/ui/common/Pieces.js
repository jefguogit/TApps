function Pieces(gridSize) {
	
	var ConstantClass = require('ui/common/Constant');
	var Piece = require('ui/common/Piece');
	
	var types =  ['p','p','p','p','p','p','p','p','R','N','B','Q','K','B','N','R'];

	var pa = ChessPuzzle.Constant.pieces;
	
	var pieceSize = gridSize*3/4;
//Ti.API.info("piece size:"+pieceSize);	

	var boardPieces = new Array(2);
	
	for(var type=0;type<2;type++){		
		
		var piecesArr = new Array(16);
		
		for(var no=0;no<types.length;no++){

			var apa = pa[type][no];
			
			piecesArr[no] = new Piece(apa,type,no);
					
		}	
		
		boardPieces[type] = piecesArr;
		
	}	
	

	
			
	return boardPieces;
}

module.exports = Pieces;



