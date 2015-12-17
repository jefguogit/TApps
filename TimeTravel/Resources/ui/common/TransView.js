function TransView() {
	
	var self = Ti.UI.createImageView({
		top:0,
		left:-1000,
		width:myChess.width,
		height:myChess.height
//		image:Ti.Filesystem.resourcesDirectory+'images/trans1.png'
	});
	
	self.show = function(pinx){
		Ti.API.info("Trans Show "+pinx);
		pinx++;
		if(pin>>4){
			this.left = -1000;
			Ti.API.info("Trans hide "+pinx);
			myChess.startview.showGame();
		}else{	
			fb.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/trans"+pinx+".png";
			setTimeout(this.show(pinx),300);
		}	
			
	};	
	
	self.addEventListener('showTrans', function(){
		self.show(0);
	});
	
	
		
	return self;
};

module.exports = TransView;

