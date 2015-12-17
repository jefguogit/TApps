function Grids(gridSize) {

	var gridSize = ChessPuzzle.GridSize;
	var boardgrids = new Array(64);
	for (i = 0; i < 8; ++i) {
      for (j = 0; j < 8; ++j) {   	
      	var aGrid = Ti.UI.createView({
      		width:gridSize,
      		height:gridSize,
      		left:i*gridSize,
      		top:j*gridSize,
      		pleft:i*gridSize,
      		ptop:j*gridSize,	
      		file:i,
      		rank:j,	
      		piece:null
      	});
      	
      	if((i+j)%2 == 0){
			aGrid.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/gridLight.png";
		}else{
			aGrid.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/gridDark.png";
		}

/*
		aGrid.getPosition = function(e){
			var point = this.convertPointToView({x:e.x,y:e.y}, ChessPuzzle.Game.board.area);
			
			var sx = Math.floor(point.x/ChessPuzzle.GridSize);
			var sy = Math.floor(point.y/ChessPuzzle.GridSize);

			
			return {x:point.x, y:point.y, col:sx, row:sy};
		}

		aGrid.choose = function(){
			var col = this.file;
			var row = this.rank;
			Ti.API.info("Choose grid --- "+ChessPuzzle.Pickpiece+"  "+ChessPuzzle.Game.playerPiece+" "+col+" "+row);					
			if(ChessPuzzle.Pickpiece && ChessPuzzle.Game.playerPiece && (row!=ChessPuzzle.Game.playerPiece.rank || col!=ChessPuzzle.Game.playerPiece.file)){
				ChessPuzzle.Game.playerPiece.dropPiece(col, row);	
			}
		};

		aGrid.addEventListener('click', function(e){
			Ti.API.info("grid click --- "+this.file+" "+this.rank);
			this.choose();			
		});
*/		
       	boardgrids[i+8*j]=aGrid;

      }
    }	

	
	return boardgrids;
}

module.exports = Grids;



	

