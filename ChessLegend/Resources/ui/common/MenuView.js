//Master View Component Constructor
function MenuView(width, height) {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		width:width,
		height:height,
		backgroundImage:null
	});
	
	var coverLayer = Ti.UI.createView({
		width:width,
		height:height,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"mydata/icon/chessback1.png",
		item:null
		
	});


	var micw = Math.floor(myChess.width*1/6);
	var mich = Math.floor(myChess.height*1/4);
	var leftMargin = Math.floor(myChess.width*1/60);
	var topMargin = Math.floor(myChess.height*1/60);
	var micspacew = Math.floor(myChess.width*1/100);
	var micspaceh = Math.floor(myChess.height*1/100);

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
			borderWidth:2,
			borderColor:'red',
			backgroundImage:Ti.Filesystem.resourcesDirectory+"mydata/icon/"+player[6]+".png"
		})
		
//	Ti.API.info("menu "+i+":"+mic.left+"  "+mic.top+mic.backgroundImage);		

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
//	Ti.API.info('event:'+e.source.index);
			myChess.PlayerIndex = e.source.index;
			
			self.fireEvent('itemSelected',e);
			var item = self.mics[myChess.PlayerIndex];

			l = item.left;
			t = item.top;
			coverLayer.add(item);
			self.add(coverLayer);
			
			item.animate({
				left:width*3/8,
				top:height*3/8,
				duration:1000
			}, function(){
//	Ti.API.info(item.left+":"+item.top);				
				self.add(item);
				item.left = l;
				item.top = t;
				coverLayer.remove(item);
				self.remove(coverLayer);
//	Ti.API.info(item.left+":"+item.top);
			});
         }); 
         self.add(items);
	}			
	
	return self;
};

module.exports = MenuView;

function goPlayer(obj,index){
	obj.fireEvent('itemSelected', {
		name:player[0],
		game:index
	});
}
function getMenuData(player){
	
	var row = Ti.UI.createTableViewRow();
	row.selectedBackgroundColor = '#fff';
	row.className = 'datarow';
	row.clickName = 'row';
	row.backgroundImage = 'images/playerback.png';
	row.height = 120;
	row.name = player[0];


/*	var photo = Ti.UI.createView({
		backgroundImage:'../images/custom_tableview/user.png',
		top:5,
		left:10,
		width:50,
		height:50,
		clickName:'photo'
	});
	row.add(photo);
*/
	var picpath = Ti.Filesystem.resourcesDirectory+player[6];
	var picture = Ti.UI.createImageView({
		image : picpath,
		width : 'auto',
		height : 100,
		top : 6,
		left : 20
	});
//Ti.API.info("image:"+picture.image);	
	row.add(picture);

	var title = Ti.UI.createLabel({
		color:'#ffffff',
		font:{fontSize:18,fontWeight:'bold', fontFamily:'Arial'},
		left:200,
		top:2,
		height:30,
		width:'auto',
		text:player[0]+',  '+player[2]+' | '+player[1]
	});

	row.add(title);

	var fontSize = 16;
	if (Titanium.Platform.name == 'android') {
		fontSize = 14;
	}
	var subtitle = Ti.UI.createLabel({
		color:'blue',
		font:{fontSize:fontSize,fontWeight:'normal', fontFamily:'Arial'},
		left:180,
		top:31,
		height:'auto',
		width:'auto',
		clickName:'subtitle',
		text:player[4]
	});
	row.add(subtitle);
		
	return row;

}

function getMenuItem(player){
	var iv = Ti.UI.createView({
		width:myChess.width*1/4,
		height:myChess.height*1/4
	})
	
	var leftv = Ti.UI.createView({
		top:0,
		left:0,
		width:myChess.width*1/10,
		height:myChess.height*1/4
	})
	var picpath = Ti.Filesystem.resourcesDirectory+"mydata/pic/"+player[6]+".jpg";
	var picture = Ti.UI.createImageView({
		image : picpath,
		width : myChess.width*2/25,
		height: myChess.height*1/6,
		top : 1,
		left:1
	});
	leftv.add(picture);
	var title = Ti.UI.createLabel({
		color:'#000000',
		font:{fontSize:15,fontWeight:'bold', fontFamily:'Arial'},
		left:1,
		top:myChess.height*1/6+3,
		height:myChess.height*1/12,
		width:myChess.width*2/25,
		text:player[0]+',  '+player[2]+' | '+player[1]
	});
	leftv.add(title);
	
	var rightv = Ti.UI.createView({
		width:myChess.width*3/20,
		height:myChess.width*1/4,
		left:myChess.width*1/10,
		top:0
	})
		var fontSize = 12;
	if (Titanium.Platform.name == 'android') {
		fontSize = 11;
	}
	var subtitle = Ti.UI.createLabel({
		color:'blue',
		font:{fontSize:fontSize,fontWeight:'normal', fontFamily:'Arial'},
		left:1,
		top:1,
		height:myChess.height*1/4,
		width:myChess.width*3/20,
		text:player[4]
	});
	rightv.add(subtitle);
	
	iv.add(leftv);
	iv.add(rightv);
	
		var row = Ti.UI.createTableViewRow();
		row.add(iv);
	return iv;
}
