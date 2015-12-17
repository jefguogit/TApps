function NetworkAlert() {
	
	var nwidth = myTest.width;
	if(myTest.width>640){
		nwidth = myTest.width/2;
	}
	
	var nheight = nwidth/4;

	var self = Ti.UI.createView({
		backgroundImage:'images/networkerror.png',
		height:nheight,
		width:nwidth,
		left:(myTest.width-nwidth)/2,
		bottom:myTest.height
	});
	


	self.addEventListener('click', function(){
		self.bottom = myTest.height;
		
		if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
			myTest.network = false;
		}else{
			myTest.network = true;
		}

//		myTest.network = true;		
		if(!myTest.network){
			self.animate({
				bottom:0,
				duration:1000
			}, function(){
				
			});
		}
	})
	
	
	
	return self;
};

module.exports = NetworkAlert;
