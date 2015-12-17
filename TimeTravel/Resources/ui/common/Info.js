function Info() {
	var self = Ti.UI.createView();
	
	
	
	var Start = require('ui/common/startView');
	var startView = new Start();
//	scrollView.add(startView);
	myChess.startview = startView;
	
	self.add(startView);
	
	return self;
};

module.exports = Info;
