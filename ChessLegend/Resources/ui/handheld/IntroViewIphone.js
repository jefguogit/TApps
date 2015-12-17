function IntroView(width, height) {
	
	var self = Ti.UI.createView({
		width:width,
		height:height,
		backgroundColor:'green',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/introbackh.png'
	});
	
	var head = Ti.UI.createView({
//		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/intro_head.png',
		top:0,
		left:0,
		width:width,
		height:50
	})
	
	var body = Ti.UI.createView({
//		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/introbackh.png',
		left:0,
		top:50,
		width:width,
		height:height-60
	})
	
	self.add(head);
	self.add(body);
//	var player = myChess.Players[myChess.PlayerIndex];
//Ti.API.info("NAME:"+player[0]);	

	var backButton = Ti.UI.createButton({
		top:0,
		left:0,
		width:80,
		height:50,
//		borderColor:'red',
//		title:'back'
		backgroundImage:null
	})
	
	backButton.addEventListener('click',function(e){
		myChess.tabGroup.fireEvent('showPlayer');
	})
	
	self.add(backButton);
/*
	var listButton = Ti.UI.createButton({
		width:60,
		height:45,
		top:2,
		right:1,
		backgroundImage:null
	})
	
	listButton.addEventListener('click',function(){
		myChess.tabGroup.fireEvent('showMaster');
	})
	
	self.add(listButton);

	var pName=Ti.UI.createLabel({
		text:" " ,
		top:12,
		left:75,
		width:180,
		color:'white',
		font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial',color:'white'},
		textAlign:'center'
	})
	self.add(pName);
*/
	
	var pDesc=Ti.UI.createWebView({
//		width:width-80,
		top:60,
		left:20,
		right:20,
//		left:50,
		backgroundColor:'transparent'
	})
	pDesc.html = " ";
//	pDesc.html = player[5]+"<div><img src='../../../mydata/gallery/"+player[6]+".png'></div>";
	
	self.add(pDesc);
	
	
	self.addEventListener('refresh',function(e){
			var pinfo = myChess.Players[myChess.PlayerIndex];
//			pName.text=pinfo[0];
			if(e.idx==0){
				pDesc.html = pinfo[5];
			}else{
				pDesc.html = pinfo[7];
			}
	});
	

	return self;
};

module.exports = IntroView;




