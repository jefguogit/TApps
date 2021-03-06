function ApplicationWindow() {
	//position

	var MasterViewWidth = myChess.width * 3 / 10;
	var MasterViewHeight = myChess.height;
	var MasterViewLeftMargin = 5;
	var MasterViewRightMargin = 15;
	var MasterViewTopMargin = 5;
	var MasterViewBottomMargin = 5;

	var DetailViewWidth = myChess.width - MasterViewWidth;
	var DetailViewHeight = myChess.height;
	var DetailViewLeftMargin = 30;
	var DetailViewRightMargin = 5;
	var DetailViewTopMargin = 5;
	var DetailViewBottomMargin = 5;

	var MenuViewWidth = myChess.width;
	var MenuViewHeight = myChess.height;

	Ti.API.log("size:" + myChess.width + " " + myChess.height);
	Ti.API.log("detail:" + DetailViewWidth + "  " + DetailViewLeftMargin);
	Ti.API.log("master:" + MasterViewWidth + "  " + MasterViewLeftMargin);

	//declare module dependencies
	var MenuView = require('ui/tablet/MenuViewIpad');
	var MasterView = require('ui/tablet/MasterViewIpad');
	var DetailView = require('ui/tablet/DetailViewIpad');

	//create headleader container
	var winHead = Ti.UI.createView({
		title : 'Chess World Champions',
		bottom : 0,
		left : -3000,
		height : myChess.height,
		width : myChess.width,
		backgroundColor : 'black'
	});

	var actmovie = Ti.Media.createVideoPlayer({
		url : Ti.Filesystem.resourcesDirectory + 'mydata/video/ccgc.m4v',
		width : 600,
		mediaControlStyle : Ti.Media.VIDEO_CONTROL_FULLSCREEN,
		autoplay : false
	})

	var eventId = actmovie.addEventListener('complete', function() {
//		skipButton.fireEvent('click');
	})

//	actmovie.play();

	winHead.add(actmovie);
	winHead.actmovie = actmovie;

	var skipButton = Ti.UI.createButton({
		//		title:'skip video',
		right : 10,
		top : 38,
		width : 120,
		height : 90,
		backgroundImage : Ti.Filesystem.resourcesDirectory + "images/skipButton.png"
	});
	skipButton.addEventListener('click', function() {
				Ti.API.info('skip...');

		if (myChess.appWin.vcontent != null) {
			myChess.appWin.vv.remove(myChess.appWin.vcontent);
			myChess.appWin.vcontent = null;
		}
		if (myChess.appWin.vmsg != null) {
			myChess.appWin.vv.remove(myChess.appWin.vmsg);
			myChess.appWin.vmsg = null;
		}
		if (myChess.appWin.webv != null) {
			myChess.appWin.vv.remove(myChess.appWin.webv);
			myChess.appWin.webv = null;
		}

		if (myChess.appWin.vv.actmovie != null) {
			myChess.appWin.vv.actmovie.stop();
			myChess.appWin.vv.remove(self.vv.actmovie);
			myChess.appWin.vv.actmovie = null;
		}

		self.fireEvent('hideHead');
		self.fireEvent('showMenu');
	})

	winHead.add(skipButton);
	winHead.button = skipButton;

	//create menu view container
	var menuContainerWindow = Ti.UI.createView({
		title : 'Chess World Champions',
		bottom : 0,
		left : 0,
		height : myChess.height,
		width : myChess.width,
//		backgroundImage : Ti.Filesystem.resourcesDirectory + "images/chessback.png"
	});

	var contentWin = Ti.UI.createView({
		bottom : 0,
		left : 0,
		height : myChess.height,
		width : myChess.width,
		navBarHidden : true,
		backgroundImage : Ti.Filesystem.resourcesDirectory + "images/gameback.png"
	})

	//construct UI
	var menuView = new MenuView(MenuViewWidth, MenuViewHeight);
	var masterView = new MasterView(MasterViewWidth, DetailViewHeight);
	var detailView = new DetailView(DetailViewWidth, DetailViewHeight);

	menuContainerWindow.add(menuView);

	//create detail view container
	var detailContainer = Ti.UI.createView({
		left : 0,
		top : 0,
		width : DetailViewWidth,
		height : DetailViewHeight,
	});
	detailContainer.add(detailView);

	//create master view container
	var masterContainer = Ti.UI.createView({
		right : 0,
		top : 5,
		width : MasterViewWidth,
		height : MasterViewHeight,
	});
	masterContainer.add(masterView);

	/*
	 //create iOS specific NavGroup UI
	 var navGroup = Ti.UI.iPhone.createNavigationGroup({
	 window:menuContainerWindow
	 });
	 self.add(navGroup);//create object instance
	 */

	contentWin.add(masterContainer);
	contentWin.add(detailContainer);

	//add behavior for master view
	menuView.addEventListener('itemSelected', function(e) {
		//		alert(e.name);
		masterView.fireEvent('display', e);
		detailView.fireEvent('showIntro', e);
		//		detailView.fireEvent('opengame',{game:0});
		//		contentWin.title=e.name;

		self.fireEvent('hideMenu');
	});

	//add behavior for master view
	masterView.addEventListener('opengame', function(e) {
		//		Ti.API.info('master opengame  '+e.game);
		detailView.fireEvent('opengame', e);
	});

	masterView.addEventListener('showIntro', function() {
		//		Ti.API.info('show intro  ');
		detailView.fireEvent('showIntro');
	});

	masterView.addEventListener('hideIntro', function() {
		//		Ti.API.info('hide intro  ');
		detailView.fireEvent('hideIntro');
	});

	detailView.addEventListener('backToList', function() {
		//		Ti.API.info('backtolist  ');
		if (menuView.cover) {
			menuView.cover.left = -1500;
			menuView.cover.top = -900;
			menuView.left = 0;
			menuView.top = 0;
		}
		this.fireEvent('hideIntro');
		self.fireEvent('showMenu');
	});

	//create object instance
	var self = Ti.UI.createWindow({
		width : myChess.width,
		height : myChess.height,
//		backgroundImage : Ti.Filesystem.resourcesDirectory + "mydata/icon/chessback1.png"
	})

	self.add(contentWin);
	self.content = contentWin;

	self.add(menuContainerWindow);
	self.menu = menuContainerWindow;

	self.add(winHead);
	self.hv = actmovie;
	self.vv = winHead;

	self.addEventListener('hideMenu', function() {
		menuContainerWindow.left = -3000;
	})

	self.addEventListener('showMenu', function() {
		menuContainerWindow.left = 0;
	})

	self.addEventListener('hideHead', function() {
		winHead.left = -3000;
	})

	self.addEventListener('showHead', function() {
		winHead.left = 0;
	})

	myChess.appWin = self;
	self.master = masterView;

	return self;
};

module.exports = ApplicationWindow;

