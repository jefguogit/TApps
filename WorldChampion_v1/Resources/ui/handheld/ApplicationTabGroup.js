function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();

	//declare module dependencies
	var MenuView = require('ui/handheld/MenuViewIphone');
	var	MasterView = require('ui/handheld/MasterViewIphone');
	var	DetailView = require('ui/handheld/DetailViewIphone');
	var	IntroView = require('ui/handheld/IntroViewIphone');
	//construct UI
	var menuView = new MenuView();
	var	masterView = new MasterView();
	var	detailView = new DetailView();
	var introView = new IntroView();
		
	
	
	//create app tabs
	var winPlayers = Ti.UI.createWindow({
		backgroundImage:Ti.Filesystem.resourcesDirectory+'mydata/icon/chessback.png',
		navBarHidden:true,
		tabBarHidden:true,
		fullscreen:false
	});
	var MenuView = require
	winPlayers.add(menuView);
	
	
	var winIntro = Ti.UI.createWindow({
		backgroundImage:Ti.Filesystem.resourcesDirectory+'mydata/icon/chessback.png',
		navBarHidden:true,
		tabBarHidden:true
	});
	winIntro.add(introView);
	self.iv = introView;
	
	
	var winGames = Ti.UI.createWindow({
		backgroundImage:Ti.Filesystem.resourcesDirectory+'mydata/icon/chessback.png',
		navBarHidden:true,
		tabBarHidden:true
	});
	winGames.add(masterView);
	self.mv = masterView;
	
	
	var winDetail = Ti.UI.createWindow({
		backgroundImage:Ti.Filesystem.resourcesDirectory+'mydata/icon/chessback.png',
		navBarHidden:true,
		tabBarHidden:true	
	});
	winDetail.add(detailView);
	self.gv = detailView;
		
	
	var tab1 = Ti.UI.createTab({
		title: L('player List'),
		icon: '/images/KS_nav_ui.png',
		window: winPlayers
	});
	winPlayers.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('introduction'),
		icon: '/images/KS_nav_views.png',
		window: winIntro
	});
	winIntro.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: L('game List'),
		icon: '/images/KS_nav_ui.png',
		window: winGames
	});
	winGames.containingTab = tab3;
	
	var tab4 = Ti.UI.createTab({
		title: L('game detail'),
		icon: '/images/KS_nav_views.png',
		window: winDetail
	});
	winDetail.containingTab = tab4;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	self.addTab(tab4);	

/*	
	var actInd = Ti.UI.createActivityIndicator({
  color: 'blue',
  font: {fontFamily:'Helvetica Neue', fontSize:16, fontWeight:'bold'},
  message: 'Loading...',
  style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
  top:150,
  height:'auto',
  width:'auto'
});
	self.add(actInd);
	self.act = actInd;
*/	
	
	self.addEventListener('showPlayer', function(){
		
		this.setActiveTab(0);
	})
	
	self.addEventListener('showIntro', function(){
//Ti.API.info("ShowIntro:"+myChess.PlayerIndex)
		this.iv.fireEvent('refresh');
				
		this.setActiveTab(1);
	});
	
	self.addEventListener('showMaster', function(){
		this.setActiveTab(2);
//Ti.API.info("ShowGames:"+myChess.PlayerIndex);
		if(myChess.refresh){
			this.mv.fireEvent('display');
		}	
						
	});
	
	self.addEventListener('showGame', function(){
//		this.act.style = Titanium.UI.iPhone.ActivityIndicatorStyle.BIG;
//		this.act.show();
	
		this.setActiveTab(3);
	
		this.gv.fireEvent('opengame');
		
		
	})

	
	return self;
};

module.exports = ApplicationTabGroup;
