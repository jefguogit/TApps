function ApplicationWindow() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	//construct UI
	var masterView = new MasterView(),
		detailView = new DetailView();
		
	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title:'List',
		bottom:50,
		navBarHidden:true
	});
	masterContainerWindow.add(masterView);
	
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'Appcelerator API v2.1.0',
		barImage: 'navbar_background.png',
		navBarHidden:false
	});
	detailContainerWindow.add(detailView);
	
	//create iOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);
	
	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		detailView.fireEvent('itemSelected',e);
//		detailContainerWindow.title=e.name;
		navGroup.open(detailContainerWindow);
	});
	
	var adView = Ti.UI.createView({
		backgroundImage: Ti.Filesystem.resourcesDirectory+'image/adView.png',
		width:320,
		height:53,
		bottom:-5,
		left:0
	})
	
	showAd(adView);
	
	self.add(adView);
	
	return self;
};

module.exports = ApplicationWindow;




function iAdMovein(){
	Ti.API.info('iAd move in');
	iAdView.bottom = 0;
}

function iAdMoveout(){
	Ti.API.info('iAd move out');
	iAdView.bottom = -100;
}
	
function addiAd(view){
//Ti.API.info('require iAd');	
	iAdView = Ti.UI.iOS.createAdView({
	    width: 'auto',
	    height: 'auto',
	    bottom: -100,
	    borderColor: '#000000',
	    backgroundColor: '#000000'});
 
    iAdView.addEventListener('load', function(e){
  	
    	iAdMovein();
    		    
    });
    
    iAdView.addEventListener('error', function(e){

		iAdMoveout();
		
   });    
 
    view.add(iAdView);	
}



function addAdmob(view){
	var Admob = require('ti.admob');

	admobView = Admob.createView({
	    bottom: 0, left: 0,
	    width: 320, height: 50,
	    publisherId: 'a1500da55e6b34c', // You can get your own at http: //www.admob.com/
	    adBackgroundColor: 'transparent',
	    test:false
	});
	

	view.add(admobView);
}

function showAd(view){
	addAdmob(view);
	addiAd(view);
}
