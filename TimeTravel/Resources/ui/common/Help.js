function Help() {
	var self = Ti.UI.createView();
	
	var hbtn = Ti.UI.createButton({
		title: 'home',
		top: 0,
		left: 10,
		width: 200
	});
	hbtn.addEventListener('click', function(e){
		myChess.tabGroup.setActiveTab(0);	
	});
	self.add(hbtn);
	
	
	var lbl = Ti.UI.createLabel({
    	text : "Archieve ..... ",
   		top : 10,
    	height : 'auto',
    	width : 'auto'
	});
	self.add(lbl);	
	
	var aData = myChess.JDBA.getArchieveData();
Ti.API.info(aData.length);	
	var atable = Ti.UI.createTableView({
		data : aData,
		top:50
	});
	atable.refresh = function(){
		var aData = myChess.JDBA.getArchieveData();
		this.setData(aData);
		
	};
	self.add(atable);
	myChess.archieve = atable;
	
	
	
	
	
	
	return self;
};

module.exports = Help;
