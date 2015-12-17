function Setting() {
	var self = Ti.UI.createView();
	
	var hbtn = Ti.UI.createButton({
		title: 'home',
		bottom: 20,
		left: 50,
		width: 200
	});
	hbtn.addEventListener('click', function(e){
		myChess.tabGroup.setActiveTab(0);	
	});
	self.add(hbtn);
	
	
	var lbl = Ti.UI.createLabel({
    	text : "Setting ..... ",
   		top : 10,
    	height : 'auto',
    	width : 'auto'
	});
	self.add(lbl);
	
	return self;
};

module.exports = Setting;
