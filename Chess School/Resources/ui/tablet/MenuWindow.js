function MenuWindow() {

	var self = Ti.UI.createWindow({
		backgroundImage:'images/chesscastle1.png',
		width:myTest.width*3/5,
		height:myTest.height*8/9,
		left:(myTest.width)*1/30,
		bottom:0,
		navBarHidden:true,
		tabBarHidden:true
	});
	
	var buttonHeight = (myTest.height)*2/9;
	var buttonWidth = (myTest.width)*1/4;
	
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
		bottom:buttonHeight/3,
		left:buttonWidth/5,
//		borderColor:'blue',
		backgroundImage:null
	});
	self.add(openingButton);
	
	openingButton.addEventListener('click', function() {
		self.fireEvent('goClass',{no:1, obj:openingButton});
//		myTest.mainWin.fireEvent('gotoClassroom',{idx:1});
	});
	
	var endgameButton = Ti.UI.createButton({
		height:buttonHeight,
		width:buttonWidth,
//		title:L('end'),
		bottom:buttonHeight/3,
		left:buttonWidth/5+buttonWidth,
//		borderColor:'blue',
		backgroundImage:null
	});
	self.add(endgameButton);
	
	endgameButton.addEventListener('click', function() {
		self.fireEvent('goClass',{no:2, obj:endgameButton});
//		myTest.mainWin.fireEvent('gotoClassroom',{idx:2});
	});	
	
	
	var tacticButton = Ti.UI.createButton({
		height:buttonHeight,
		width:buttonWidth,
//		title:L('tactic'),
		bottom:buttonHeight/3+buttonHeight,
		left:buttonWidth/5,
//		borderColor:'blue',
		backgroundImage:null
	});
	self.add(tacticButton);
	
	tacticButton.addEventListener('click', function() {
		self.fireEvent('goClass',{no:3, obj:tacticButton});
//		myTest.mainWin.fireEvent('gotoClassroom',{idx:3});
	});

	var mistakeButton = Ti.UI.createButton({
		height:buttonHeight,
		width:buttonWidth,
//		title:L('mistake'),
		bottom:buttonHeight/3+buttonHeight,
		left:buttonWidth/5+buttonWidth,
//		borderColor:'blue',
		backgroundImage:null
	});
	self.add(mistakeButton);
	
	mistakeButton.addEventListener('click', function() {
		self.fireEvent('goClass',{no:4, obj:mistakeButton});
//		myTest.mainWin.fireEvent('gotoClassroom',{idx:4});
	});		
	
	var puzzleButton = Ti.UI.createButton({
		height:buttonHeight,
		width:buttonWidth,
//		title:L('puzzle'),
		bottom:buttonHeight/3+2*buttonHeight,
		left:buttonWidth/5,
//		borderColor:'blue',
		backgroundImage:null
	});
	self.add(puzzleButton);
	
	puzzleButton.addEventListener('click', function() {
		self.fireEvent('goClass',{no:5, obj:puzzleButton});
//		myTest.mainWin.fireEvent('gotoClassroom',{idx:5});
	});	
	
	var gameButton = Ti.UI.createButton({
		height:buttonHeight,
		width:buttonWidth,
//		title:L('game'),
		bottom:buttonHeight/3+2*buttonHeight,
		left:buttonWidth/5+buttonWidth,
//		borderColor:'blue',
		backgroundImage:null
	});
	self.add(gameButton);
	
	gameButton.addEventListener('click', function() {
		self.fireEvent('goClass',{no:6, obj:gameButton});
//		myTest.mainWin.fireEvent('gotoClassroom',{idx:6});
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
    
    self.addEventListener('goClass', function(e){
    	nwAlert.fireEvent('click');
				
		if(myTest.network){
			myTest.moreButton.visible = false;
			myTest.mainWin.fireEvent('gotoClassroom',{idx:e.no,obj:e.obj});
/*			
			var matrix = Ti.UI.create3DMatrix();
  			matrix = matrix.rotate(90, 0, 1, 0);
			self.animate({
	    		transform: matrix,
	    		duration:1000
	    	},function(){
				matrix = matrix.rotate(0, 0, 1, 0);
				self.animate({
	    			transform: matrix,
	    			duration:1000
	    		},function(){
	    			
	    			myTest.mainWin.fireEvent('gotoClassroom',{idx:e.no,obj:e.obj});
	    		});		
	    	});
*/	    	
		}	
    });
	

    
	return self;
};

module.exports = MenuWindow;
