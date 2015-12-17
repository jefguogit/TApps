function MenuWindow() {

	var self = Ti.UI.createWindow({
		backgroundImage:'images/chesscastle1.png',
		left:0,
		bottom:0,
		navBarHidden:true,
		tabBarHidden:true
	});
	
	var buttonHeight = (myTest.height-myTest.bmagin)*1/4;
	var buttonWidth = (myTest.width)*2/5;
	
	var button = Ti.UI.createButton({
		height:buttonHeight,
		width:buttonWidth,
		title:L('open a Window'),
		borderColor:'blue',
		top:20
	});
//	self.add(button);
	

	
	var openingButton = Ti.UI.createButton({
		height:buttonHeight,
		width:buttonWidth,
//		title:L('open'),
		bottom:buttonHeight/2,
		left:buttonWidth/4,
//		borderColor:'blue',
		backgroundImage:null
	});
	self.add(openingButton);
	
	openingButton.addEventListener('click', function() {
//		self.fireEvent('hide');
		myTest.mainWin.fireEvent('gotoClassroom',{idx:1});

	});
	
	var endgameButton = Ti.UI.createButton({
		height:buttonHeight,
		width:buttonWidth,
//		title:L('end'),
		bottom:buttonHeight/2,
		right:buttonWidth/4,
//		borderColor:'blue',
		backgroundImage:null
	});
	self.add(endgameButton);
	
	endgameButton.addEventListener('click', function() {
//		self.fireEvent('hide');
		myTest.mainWin.fireEvent('gotoClassroom',{idx:2});
	});	
	
	
	var tacticButton = Ti.UI.createButton({
		height:buttonHeight,
		width:buttonWidth,
//		title:L('tactic'),
		bottom:buttonHeight/2+buttonHeight,
		left:buttonWidth/4,
//		borderColor:'blue',
		backgroundImage:null
	});
	self.add(tacticButton);
	
	tacticButton.addEventListener('click', function() {
//		self.fireEvent('hide');
		myTest.mainWin.fireEvent('gotoClassroom',{idx:3});
	});

	var mistakeButton = Ti.UI.createButton({
		height:buttonHeight,
		width:buttonWidth,
//		title:L('mistake'),
		bottom:buttonHeight/2+buttonHeight,
		right:buttonWidth/4,
//		borderColor:'blue',
		backgroundImage:null
	});
	self.add(mistakeButton);
	
	mistakeButton.addEventListener('click', function() {
//		self.fireEvent('hide');
		myTest.mainWin.fireEvent('gotoClassroom',{idx:4});
	});		
	
	var puzzleButton = Ti.UI.createButton({
		height:buttonHeight,
		width:buttonWidth,
//		title:L('puzzle'),
		bottom:buttonHeight/2+2*buttonHeight,
		left:buttonWidth/4,
//		borderColor:'blue',
		backgroundImage:null
	});
	self.add(puzzleButton);
	
	puzzleButton.addEventListener('click', function() {
//		self.fireEvent('hide');
		myTest.mainWin.fireEvent('gotoClassroom',{idx:5});
	});	
	
	var gameButton = Ti.UI.createButton({
		height:buttonHeight,
		width:buttonWidth,
//		title:L('game'),
		bottom:buttonHeight/2+2*buttonHeight,
		right:buttonWidth/4,
//		borderColor:'blue',
		backgroundImage:null
	});
	self.add(gameButton);
	
	gameButton.addEventListener('click', function() {
//		self.fireEvent('hide');
		myTest.mainWin.fireEvent('gotoClassroom',{idx:6});
	});	
		
	var NwAlert = require('ui/common/NetworkAlert');
	var nwAlert =  new NwAlert();
	self.add(nwAlert);
    
	nwAlert.fireEvent('click');
	
	

	
	
/*		
	var	iAdView = Ti.UI.iOS.createAdView({
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
*/    
    self.addEventListener('show', function(){
    	nwAlert.fireEvent('click');
    	
    	self.animate({
    		visible:true,
    		duration:300
    	});
    	if(myTest.showAd){
			myTest.moreButton.visible = true;
		}	
    	
    });
	
	self.addEventListener('hide', function(){
		nwAlert.fireEvent('click');
				
		if(myTest.network){
			myTest.moreButton.visible = false;
			
	    	self.animate({
	    		visible:false,
	    		duration:500
	    	});
	    }	
    });
    
	return self;
};

module.exports = MenuWindow;
