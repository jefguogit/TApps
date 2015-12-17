function ControlView(width, height) {
	
Ti.API.log("control view :"+width+"  "+height);

	var ConstantClass = require('ui/common/Constant');
	var constant = new ConstantClass();
	
	var buttonSize = width/6;	
		
	var self = Ti.UI.createView({
		width:width,
		height:height,
		backgroundColor:'pink'
	});
	
	initButtons(buttonSize, self);


//	Ti.API.info('end control:'+self);
	
	  //
	// BASIC SLIDER
	//
	var basicSliderLabel = Titanium.UI.createLabel({
		text:'Playing Speed:' ,
		color:'#000',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:13
		},
		textAlign:'center',
		bottom:10,
		left:10,
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
		bottom:10,
		left:120,
		width:80,
		boardWidth:1,
		height:'auto'
	});
	
	var basicSlider = Titanium.UI.createSlider({
		min:500,
		max:2000,
		width:160,
		height:'auto',
		bottom:10,
		left:210
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
			top:2,
      		width:size,
      		height:size/2,
      		title:'Reset',
      		left:size/4
      	});
      	
   resetButton.addEventListener('click',function(e){
//   	    Ti.API.info('Click Reset');
   	    if(myChess.chessObj.playModeInProgress){
   	    	myChess.chessObj.playModeInProgress = false;
   	    	playButton.title = 'Play';
   	    }
   	    	
   	    myChess.f.resetPieces();
   });   	
   
   

   
   control.add(resetButton);
   control.reset = resetButton;
   myChess.chessObj.resetButton = resetButton;
	
	var forwardButton = Ti.UI.createButton({
			top:2,
      		width:size,
      		height:size/2,
      		title:'Forward',
      		left:size*(1/4+1/2+1)
      	});
      	
   forwardButton.addEventListener('click',function(e){
//   	    Ti.API.info('Click Forward');
   	    myChess.f.moveForward();
   });   	
   
   control.add(forwardButton);
   control.forward = forwardButton;
   myChess.chessObj.forwardButton = forwardButton;

	var playButton = Ti.UI.createButton({
			top:2,
      		width:size,
      		height:size/2,
      		title:'Play',
      		left:size*(1/4+1+2)
      	});
      	
   playButton.addEventListener('click',function(e){
//   	    Ti.API.info('Click Play');
   	    if(myChess.chessObj.playModeInProgress){
			myChess.chessObj.playModeInProgress = false;
   	    	playButton.title = 'Play';
   	    	myChess.f.pause();
   	    } else{
   	    	myChess.chessObj.playModeInProgress = true;
   	    	playButton.title = 'Pause';
   	    	myChess.f.play();
   	    }
   	    
   });   	
   
   control.add(playButton);
   control.play = playButton;
	myChess.chessObj.playButton = playButton;
	
	var backwardButton = Ti.UI.createButton({
			top:2,
      		width:size,
      		height:size/2,
      		title:'Backward',
      		left:size*(1/4+3/2+3)
      	});
      	
   backwardButton.addEventListener('click',function(e){
//   	    Ti.API.info('Click Backward');
   	    myChess.f.moveBackward();
   });   	
   
   control.add(backwardButton);
   control.backward = backwardButton;
   myChess.chessObj.backwardButton = backwardButton;
   
}




