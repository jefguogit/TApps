function ApplicationWindow() {
	
	var self = Ti.UI.createWindow({width:320, height:465, top:0, left:0});
		
	var titleView = Ti.UI.createImageView({
		id:'titleView',
		image:'images/background/mainTitleView.png',
		width:320,
		height:30,
		left:0,
		top:1
	})
	
	myApp.titleView = titleView;
	
	var main_title = Titanium.UI.createLabel({id:'titleText',text:'Recipes',font:{fontSize:22},color:'#ffccc99',height:'auto',left:150,top:2});

	myApp.title = main_title;
	
	
	var tabView = Ti.UI.createImageView({
		id:'tabView',
		image:'images/background/tabView1.png',
		width:320,
		height:40,
		left:0,
		bottom:50
	})
	
	myApp.tabView = tabView;
	
	myApp.button={};
	
	var b1 = Titanium.UI.createButton({
		id:'b1',
	    backgroundImage:null,
	    width:50,
	    height:38,
	    bottom:51,
	    left:18
	});
	b1.addEventListener('click', function()
	{
		showWindow(0);
	
	});
	
	myApp.button.b1 = b1;
	
	var b2 = Titanium.UI.createButton({
		id:'b2',
	    backgroundImage:null,
	    width:50,
	    height:38,
	    bottom:51,
	    left:106
	    });
	
	b2.addEventListener('click', function()
	{
		showWindow(1);
	});
	
	myApp.button.b2 = b2;
	
	var b3 = Titanium.UI.createButton({
		id:'b3',
	    backgroundImage:null,
	    width:50,
	    height:38,
	    bottom:51,
	    left:160
	    });
	
	b3.addEventListener('click', function()
	{
		if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
			alert("No network connectivity now. The restaurants locations may not be available. ");		
		}	
	    showWindow(2);
	});
	
	myApp.button.b3 = b3;
	
	var b4 = Titanium.UI.createButton({
		id:'b4',
		backgroundImage:null,
	    width:50,
	    height:38,
	    bottom:51,
	    left:270
	    });
	
	b4.addEventListener('click', function()
	{
		if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
			alert("No network connectivity now. The restaurants locations may not be available. ");		
		}	
		showWindow(3);
	});

	myApp.button.b4 = b4;
	
		
	close = Titanium.UI.createButton({
		id:'close',
	    backgroundImage:null,
	    width:270,
	    height:36,
	    top:1,
	    left:10
	});
	close.addEventListener('click', function()
	{
		Ti.API.info('last tab:');
		showWindow(myApp.lastTabIndex);
		myApp.titleView.image = 'images/background/mainTitleView.png';
		var main_title = myApp.title;
		main_title.top=2;
		main_title.left=150;
		main_title.font={fontSize:22};
	    myApp.tabView.animate({bottom:50});
	});
	
	myApp.button.close = close;	
		
	var footerView = Ti.UI.createButton({
		title:'footerView',
		width:320,
		height:50,
		left:0,
		bottom:0,
		backgroundColor:'red'
	});
	footerView.addEventListener('click', function(){
		Ti.API.info("footer clicked:");
//		showWindow(1);
//		myApp.revmob.showFullscreen();
		myApp.revmob.openAdLink();
	});	
	
	myApp.footer = footerView;
	
	addiAd();
		
	return self;
};

module.exports = ApplicationWindow;


function showWindow(index){
	var group = myApp.group;
	
	group.fireEvent('showWindow',{index:index});
	
}



function iAdMovein(){
	Ti.API.info('iAd move in');
	myApp.iAd.bottom = 0;
}

function iAdMoveout(){
	Ti.API.info('iAd move out');
	myApp.iAd.bottom = -100;
}
	
function addiAd(){
Ti.API.info('require iAd');	
	iAdView = Ti.UI.iOS.createAdView({
	    width: 'auto',
	    height: 'auto',
	    bottom: -100,
	    borderColor: '#000000',
	    backgroundColor: '#000000'});
	
	myApp.iAd = iAdView;    
	 

 
    iAdView.addEventListener('load', function(e){
		Ti.API.info('receive iAd ');	 
   	
    	iAdMovein();
    	
 	    
    });
    
    iAdView.addEventListener('error', function(e){
		Ti.API.info('error iAd '+e.message);	
	
		iAdMoveout();
		

   });    
 
   myApp.footer.add(iAdView);	
}

