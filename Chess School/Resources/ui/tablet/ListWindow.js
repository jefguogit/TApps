function ListWindow(url) {
	
	var winheight = myTest.height;
	var titleheight = winheight*1/25;
	var screenheight = winheight*11/30;
	var screenwidth = myTest.width*19/30;
	var tableheight = winheight*5/12;
	
	
	var self = Ti.UI.createWindow({
		width:myTest.width*2/5,
		height:myTest.height/2,
		left:(myTest.width)/10,
		bottom:0,
		width1:myTest.width*2/5,
		height1:myTest.height/2,
		left1:(myTest.width)/10,
		bottom1:0,
		height2:winheight,
		width2:myTest.width,
		backgroundImage:'images/chesscastle2.png',
		left2:0,
		bottom2:0,
		navBarHidden:true
//		tabBarHidden:true
	});
	
	var TopMenu = require('/ui/tablet/TopMenuView');
	var topMenu = new TopMenu(self);
//	topMenu.top = 0;
	self.add(topMenu);
	
	var titlebar = Ti.UI.createView({
		backgroundColor:'transparent',
		height:titleheight,
		top:winheight*2/27,
		width:screenwidth,
		right:winheight*1/15
	})
	
	var showMenu = Ti.UI.createLabel({
		text:'class room',
		font:{fontSize:24},
		backgroundColor:'pink',
		top:3,
		left:titleheight*3/2,
		width:screenwidth*3/7,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	titlebar.add(showMenu);
	myTest.label = showMenu;
	
	self.add(titlebar);
	

	
	var ScreenView = require('/ui/tablet/ScreenView');
	var screenView = new ScreenView(screenwidth,screenheight);
	screenView.top = titlebar.top+titlebar.height+8;
	screenView.right = winheight*1/15;
	self.add(screenView);
	self.scrn = screenView;
	myTest.scrn = screenView;
	
	
	
	var vl = getVideoList(null);
	vl.height=tableheight;
	vl.width = screenwidth;
	vl.top = screenView.top+screenView.height;
	vl.right = winheight*1/15;
	self.add(vl);	
	self.listview = vl;
	

	
	
	var iAdView = Ti.UI.iOS.createAdView({
	    width: 'auto',
	    height: 'auto',
	    bottom: 0,
	    borderColor: '#000000',
	    backgroundColor: '#000000'});
 
    iAdView.addEventListener('load', function(e){
  	
    	Ti.API.info('iAd move in');    		    
    });
    
    iAdView.addEventListener('error', function(e){

		Ti.API.info('iAd error');		
   });    
 
    self.add(iAdView);	
	
//	vl.fireEvent('search');

	self.addEventListener('show', function(e){
		if(e.obj){
			self.bottom = e.obj.bottom;
			self.left = e.obj.left;
			self.height= e.obj.height;
			self.width = e.obj.width;
			
			self.visible = true;
			
	    	self.animate({
	    		width:self.width2,
	    		height:self.height2,
	    		left:self.left2,
	    		bottom:self.bottom2,
	    		duration:600
	    	});
	    }else{
	    	self.animate({
	    		visible:true,
	    		duration:600
	    	});
	    }	
    	
    });
	
	self.addEventListener('hide', function(){
		self.animate({
    		visible:false,
    		duration:500
    	});
    });
	
	return self;
};

module.exports = ListWindow;

function getVideoList(url){
	VideoList = require('/ui/tablet/VideoListView');
	
	var view =  new VideoList(url);
	
	return  view;	
}


