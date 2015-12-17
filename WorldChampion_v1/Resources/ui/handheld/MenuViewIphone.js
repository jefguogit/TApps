//Master View Component Constructor
function MenuView(width, height) {
	//create object instance, parasitic subclass of Observable
	
	var self = Ti.UI.createView({
		width:myChess.width,
		height:myChess.height-10,
		top:0,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/chessbacks1.png"
	});
	
	var playerNum = myChess.Players.length;
	
	var images = [];
	for (var c=0;c<playerNum;c++){
		var player = myChess.Players[c];
		images[c]={
			image:"/mydata/icon/icon"+player[6]+".png",
			width:200,
			height:200
		};	
	}	

	// create coverflow view with images
	var view = Titanium.UI.iOS.createCoverFlowView({
		images:images
//		backgroundImage:Ti.Filesystem.resourcesDirectory+"mydata/icon/chessbackss1.png",
	});

	// click listener - when image is clicked
	view.addEventListener('click',function(e)
	{
		Titanium.API.info("image clicked: "+e.index+', selected is '+view.selected);
		myChess.refresh = true;
		
		myChess.PlayerIndex = view.selected;
		
		myChess.tabGroup.fireEvent('showIntro');
	});
	

	self.add(view);

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
