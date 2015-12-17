function ListWindow(url) {
	
	var winheight = (myTest.height-0)*2;
	var titleheight = winheight*1/40;
	var screenheight = winheight*15/80;
	var tableheight = winheight*19/80;
	if(myTest.showAd == false){
		tableheight = winheight*19/80+20;
	}
	
	
	var self = Ti.UI.createWindow({
		height:winheight,
		width:myTest.width,
		backgroundImage:'images/back2.png',
		left:0,
		top:-winheight/2,
		top1:-winheight/2,
		navBarHidden:true
//		tabBarHidden:true
	});
	
	var TopMenu = require('/ui/handheld/TopMenuView');
	var topMenu = new TopMenu();
//	topMenu.top = 0;
	self.add(topMenu);
	
	var titlebar = Ti.UI.createView({
		backgroundColor:'transparent',
		height:titleheight,
		top:winheight/2
	})
	
	var showMenu = Ti.UI.createLabel({
		text:'class room',
		font:{fontSize:15},
		backgroundColor:'transparent',
		top:5,
		left:12,
		width:myTest.width*2/5,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	titlebar.addEventListener('click',function(){
	
/*	
		if(self.top == 0){
			self.animate({
				top:-winheight/2,
				duration:1000
			},function(){
				self.top=-winheight/2;
				topMenu.videoPlayer.pause();
			});
			
		}else{	
*/			

//			myTest.mainWin.top = 0;
			
			self.animate({
				top:0,
				duration:1000
			},function(){
				self.top=0;
				if(myTest.showAd){
					topMenu.videoPlayer.play();
				}	
			});
			
//		}	
			
	});
	
	titlebar.add(showMenu);
	myTest.label = showMenu;
	
	self.add(titlebar);
	

	
	var ScreenView = require('/ui/handheld/ScreenView');
	var screenView = new ScreenView(myTest.width,screenheight);
	screenView.top = titlebar.top+titlebar.height;
	self.add(screenView);
	self.scrn = screenView;
	myTest.scrn = screenView;
	
	
	
	var vl = getVideoList(null);
	vl.height=tableheight;
	vl.top = screenView.top+screenView.height+5;
	self.add(vl);	
	self.listview = vl;
	

	
	if(myTest.showAd){
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
	    self.adv = iAdView;
	}    
	
//	vl.fireEvent('search');
	self.addEventListener('show', function(e){

	    	self.animate({
	    		visible:true,
	    		duration:600
	    	},function(){
	    		self.visible = true;
	    	});
    	
    });
/*
	self.addEventListener('show', function(){
    	self.animate({
    		top:-myTest.height,
    		duration:1000
    	});
    });
	
	self.addEventListener('hide', function(){
		alert("main hide");
		self.animate({
    		visible:false,
    		duration:500
    	});
    });
*/	
	return self;
};

module.exports = ListWindow;

function getVideoList(url){
	VideoList = require('/ui/handheld/VideoListView');
	
	var view =  new VideoList(url);
	
	return  view;	
}

