function IntroView(width, height, notation) {
	
Ti.API.log("intro view :"+width+"  "+height);

//	var games = myChess.Games;
//	game = games[0];
	var notationWidth = (myChess.width-50)*7/10*1/3;
	var boardSize = Math.floor((myChess.width)*7/10*2/3-50);
	var gridSize = boardSize/9;
	var pieceSize = gridSize*2/3;

/*	
	var notationContainer  = Ti.UI.createView({
		top:30,
		left:10,
		width:notationWidth,
		height:height - 20
	});
*/	

	var self = Ti.UI.createView({
		width:width,
		height:height,
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/introback.png'
	});
	
//	var player = myChess.Players[myChess.PlayerIndex];
/*	
	var pName=Ti.UI.createLabel({
//		text:player[0],
		font:{fontSize:30,fontWeight:'bold', font:'Helvetica-Oblique'},
		left:180,
		width:480,
		top:20
	})
	self.add(pName);
*/	
/*	
	var pGallery = Ti.UI.createImageView({
//		image:Ti.Filesystem.resourcesDirectory+'mydata/gallery/'+player[6]+'.png',
		left:10,
		width:136,
		height:560,
		top:110
	})
	self.add(pGallery);
*/	
	var pDesc=Ti.UI.createWebView({
		backgroundColor:'transparent',
		top:108,
		bottom:10,
		left:20,
		right:20
	})
//	pDesc.html = player[5]+"<div style='float:right'><img src='../../../mydata/icon/icon"+player[6]+".png'></div>";
//	pDesc.html = player[5];
	self.add(pDesc);

	
	
	var backButton = Ti.UI.createButton({
		top:15,
		left:10,
		width:100,
		height:55,
		backgroundImage:null
	})
	
	backButton.addEventListener('click',function(e){
		self.fireEvent('backToList');
	})
	
	self.add(backButton);

	
	
	
	self.addEventListener('refresh',function(e){
			var pinfo = myChess.Players[myChess.PlayerIndex];
			if(e.idx ==0){
				pDesc.html="<div>"+pinfo[5]+"</div>";
			}else{
				pDesc.html="<div>"+pinfo[7]+"</div>";
			}	
//			pName.text=pinfo[0];
			
//			pGallery.image = Ti.Filesystem.resourcesDirectory+'mydata/gallery/'+pinfo[6]+'.png';
	});
	
	self.addEventListener('clean',function(e){
//			pName.text="";
			pDesc.html="<div></div>";
//			pGallery.image = Ti.Filesystem.resourcesDirectory+'mydata/gallery/clear.png';;
	});

	return self;
};

module.exports = IntroView;




