function ApplicationWindow() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundImage: Ti.Filesystem.resourcesDirectory+'image/panel.png'
	});
		
	//construct UI
	var masterView = new MasterView(),
		detailView = new DetailView(1);
		
	masterView.borderColor = '#000';
	masterView.borderWidth = 1;
		
	//create master view container
	var masterContainer = Ti.UI.createView({
		top:12,
		bottom:65,
		left:13,
		width:320,
		borderColor:'#11cc33'
	});
	masterContainer.add(masterView);
	self.add(masterContainer);
	
	//create detail view container
	var detailContainer = Ti.UI.createView({
		top:20,
		bottom:10,
		right:10,
		left:350
//		height:720
	});
	detailContainer.add(detailView);
	self.add(detailContainer);

	
	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		detailView.fireEvent('itemSelected',e);
	});
	masterView.fireEvent('itemSelected', {
		name:masterView.first.title,
		fname:masterView.first.fname
	});
	
		
	var adView = Ti.UI.createView({
		backgroundImage: Ti.Filesystem.resourcesDirectory+'image/adView.png',
		width:320,
		height:50,
		bottom:12,
		left:13
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
	    publisherId: 'a1500da5eaf1ca0', // You can get your own at http: //www.admob.com/
	    adBackgroundColor: 'transparent',
	    test:false
	});
	

	view.add(admobView);
}

function showAd(view){
	addAdmob(view);
	addiAd(view);
}




