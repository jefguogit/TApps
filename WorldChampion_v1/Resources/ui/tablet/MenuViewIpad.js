//Master View Component Constructor
function MenuView(width, height) {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		width:width,
		height:height
	});
	
	var coverLayer = Ti.UI.createView({
		left:0,
		top:0,
		width:width,
		height:height,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"mydata/icon//chessback1.png",
		item:null
		
	});
	

	var micw = Math.floor(myChess.width*1/5)-6;
	var mich = Math.floor(myChess.height*1/4);
	var leftMargin = 5;
	var topMargin = 80;
	var micspacew = 4;
	var micspaceh = 10;

    var playerNum = myChess.Players.length;
    var mics = new Array(playerNum);
	for(i=0; i<playerNum; i++){
		var player = myChess.Players[i];
		
		var row=Math.floor(i/5);
		var col=i%5;
		var mic = Ti.UI.createButton({
			width:micw,
			height:mich,
			left:leftMargin+col*micw+col*micspacew,
			top:topMargin+row*mich+row*micspaceh,
			index:i,
			backgroundImage:Ti.Filesystem.resourcesDirectory+"mydata/icon/icon"+player[6]+".png"
		})
		
//Ti.API.info("menu "+i+":"+mic.left+"  "+mic.top+mic.backgroundImage);		

/*		
		var v = getMenuItem(player);
		v.index = i;
		mic.add(v);
*/        
        mics[i] = mic;

     }   
     self.mics = mics;
     
     for(i=0; i<playerNum; i++){
        var items = self.mics[i];	
		items.addEventListener('click', function(e) {
//Ti.API.info('event:'+e.source.index);
			myChess.PlayerIndex = e.source.index;
			

			var item = self.mics[myChess.PlayerIndex];

			l = item.left;
			t = item.top;
			if(self.cover){
				self.cover.left=0;
				self.cover.top=0;
				self.cover.add(item);
			}
			
			item.animate({
				left:width*3/8,
				top:height*3/8,
				duration:1600
			}, function(){
				if(self.cover){
//					self.cover.remove(item);
				}

				
				self.fireEvent('itemSelected',e);
//Ti.API.info(item.left+":"+item.top);
				
//				self.add(item);
				item.left = l;
				item.top = t;
				
				self.left = -1500;
				self.top = -900;
				coverLayer.remove(item);
//				self.remove(coverLayer);
T//i.API.info(item.left+":"+item.top);
				
			});
         }); 
         self.add(items);
	}			
	
	coverLayer.left=-1500;
	coverLayer.top=-900;
	self.add(coverLayer);
	self.cover = coverLayer;

	
	return self;
};

module.exports = MenuView;





