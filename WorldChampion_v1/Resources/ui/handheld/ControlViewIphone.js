function ControlView(width, height) {
	
Ti.API.log("control view :"+width+"  "+height);

	var ConstantClass = require('ui/common/Constant');
	var constant = new ConstantClass();
	
	var buttonSize = width/3;	
		
	var self = Ti.UI.createView({
		width:width,
		height:height,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/chessControlPlay.png"
	});
	
	initButtons(buttonSize, self);

	
//	outputArray(boardView.grids);
//	outputArray(boardView.pieces);
//	Ti.API.info('end control:'+self);
	
	  //
	// BASIC SLIDER
	//
	var basicSliderLabel = Titanium.UI.createLabel({
		text:'speed:' ,
		color:'#000',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:10
		},
		textAlign:'center',
		top:1,
		right:60,
		width:40,
		height:'auto'
	});
	
	var valueLabel = Titanium.UI.createLabel({
		text:myChess.chessObj.playingSpeed ,
		color:'#000',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:10
		},
		textAlign:'center',
		top:1,
		right:20,
		width:40,
		height:'auto'
	});
	
	var basicSlider = Titanium.UI.createSlider({
		min:1000,
		max:5000,
		width:100,
		height:16,
		top:12,
		right:5
//		selectedThumbImage:'../images/slider_thumb.png',
//		highlightedThumbImage:'../images/chat.png'
	});
	basicSlider.value = myChess.chessObj.playingSpeed,
	basicSlider.addEventListener('change',function(e)
	{
		valueLabel.text = Math.round(basicSlider.value);
		myChess.chessObj.playingSpeed = Math.round(basicSlider.value);
	});
	// For #806
	basicSlider.addEventListener('touchstart', function(e)
	{
//		Ti.API.info('Touch started: '+e.value);
	});
	basicSlider.addEventListener('touchend', function(e)
	{
//		Ti.API.info('Touch ended: '+e.value);
	});
//	basicSlider.value = 0; // For regression test purposes
	
	self.add(basicSliderLabel);
	self.add(valueLabel);
	self.add(basicSlider);
	

	
	
	return self;
};

module.exports = ControlView;


function initButtons(size, control){    
//	Ti.API.info("size:"+size);
	
	var resetButton = Ti.UI.createButton({
			bottom:0,
      		width:size,
      		height:size*2/3,
      		left:0,
      		backgroundImage:null
      	});
      	
   resetButton.addEventListener('click',function(e){
//   	    Ti.API.info('Click Reset');
   	    if(myChess.chessObj.playModeInProgress){
   	    	myChess.chessObj.playModeInProgress = false;
   	    	control.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/chessControlPlay.png";
   	    }
   	    	
   	    setTimeout(function(){
			myChess.f.resetPieces();
		},myChess.chessObj.playingSpeed);
   });   	
     
   control.add(resetButton);
   control.reset = resetButton;
   myChess.chessObj.resetButton = resetButton;
	
	var forwardButton = Ti.UI.createButton({
			bottom:0,
      		width:size,
      		height:size*2/3,
      		left:size*2,
      		backgroundImage:null
      	});
      	
   forwardButton.addEventListener('click',function(e){
//   	    Ti.API.info('Click Forward');
   	    myChess.f.moveForward();
   });   	
   
   control.add(forwardButton);
   control.forward = forwardButton;
   myChess.chessObj.forwardButton = forwardButton;

	var playButton = Ti.UI.createButton({
			top:0,
      		width:size,
      		height:size*2/3,
      		left:0,
      		backgroundImage:null
      	});
      	
   playButton.addEventListener('click',function(e){
 //  	    Ti.API.info('Click Play');
   	    if(myChess.chessObj.playModeInProgress){
			myChess.chessObj.playModeInProgress = false;
   	    	control.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/chessControlPlay.png";
   	    	myChess.f.pause();
   	    } else{
   	    	myChess.chessObj.playModeInProgress = true;
   	    	control.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/chessControlPause.png";
   	    	myChess.f.play();
   	    }
   	    
   });   	
   
   control.add(playButton);
   control.play = playButton;
	myChess.chessObj.playButton = playButton;
	
	var backwardButton = Ti.UI.createButton({
			bottom:0,
      		width:size,
      		height:size*2/3,
      		left:size,
      		backgroundImage:null
      	});
      	
   backwardButton.addEventListener('click',function(e){
//   	    Ti.API.info('Click Backward');
   	    myChess.f.moveBackward();
   });   	
   
   control.add(backwardButton);
   control.backward = backwardButton;
   myChess.chessObj.backwardButton = backwardButton;
   
}




