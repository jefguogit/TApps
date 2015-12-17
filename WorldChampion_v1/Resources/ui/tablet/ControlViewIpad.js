function ControlView(width, height) {
	
Ti.API.log("control view :"+width+"  "+height);

	var ConstantClass = require('ui/common/Constant');
	var constant = new ConstantClass();
	
	var buttonSize = width/5-12;	
		
	var self = Ti.UI.createView({
		bottom:0,
		right:0,
		width:width,
		height:height,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/chessControl0.png"
	});
	
	initButtons(buttonSize, self);

	
//	outputArray(boardView.grids);
//	outputArray(boardView.pieces);
//	Ti.API.info('end control:'+self);
	
	  //
	// BASIC SLIDER
	//
	var basicSliderLabel = Titanium.UI.createLabel({
		text:'Speed:' ,
		color:'#000',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:13
		},
		textAlign:'center',
		bottom:0,
		right:40,
		width:100,
		height:'auto'
	});
	
	var valueLabel = Titanium.UI.createLabel({
		text:myChess.chessObj.playingSpeed ,
		color:'#000',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:15
		},
		textAlign:'center',
		bottom:0,
		right:5,
		width:80,
		boardWidth:1,
		height:'auto'
	});
	
	var basicSlider = Titanium.UI.createSlider({
		min:1000,
		max:5000,
		width:120,
		bottom:15,
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
      		width:size+8,
      		height:size*2/3,
      		left:0,
      		backgroundImage:null
      	});
      	
   resetButton.addEventListener('click',function(e){
//   	    Ti.API.info('Click Reset');

   	    if(myChess.chessObj.playModeInProgress){
   	    	myChess.chessObj.playModeInProgress = false;	    	
   	    	control.backgroundImage = Ti.Filesystem.resourcesDirectory+"mydata/icon/chessControl0.png";
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
      		left:size*2+8,
      		backgroundImage:null
      	});
      	
   forwardButton.addEventListener('click',function(e){
 //  	    Ti.API.info('Click Forward');
   	    myChess.f.moveForward();
   });   	
   
   control.add(forwardButton);
   control.forward = forwardButton;
   myChess.chessObj.forwardButton = forwardButton;

	var playButton = Ti.UI.createButton({
			bottom:0,
      		width:size,
      		height:size*2/3,
      		left:size*3+8,
      		backgroundImage:null
      	});
      	
  playButton.addEventListener('click',function(e){
//   	    Ti.API.info('Click Play');
   	    myChess.reset = false;
   	    if(myChess.chessObj.playModeInProgress){
			myChess.chessObj.playModeInProgress = false;
   	    	control.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/chessControl0.png";
  // 	    	myChess.f.pause();
   	    } else{
   	    	myChess.chessObj.playModeInProgress = true;
   	    	control.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/chessControl.png";
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
      		left:size+8,
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



