function DetailView(tablet) {
	var self = Ti.UI.createView({
//		backgroundImage:Ti.Filesystem.resourcesDirectory+'image/rightpan.png'
	});
/*	
	var title = Ti.UI.createLabel({
		backgroundImage: Ti.Filesystem.resourcesDirectory+'image/apititle.png',
		height:36, 
		width:300,
		right:16,
		top:1,
		text:'Appcelerator API Document  V2.0.2  ',
		textAlign:'right'
	})
*/	
	
	var content = Ti.UI.createWebView({
		bottom:50,
		left:5,
		right:10,
		backgroundColor:'transparent'
	});
	
	if(tablet){
		content.top = 50,
		content.bottomm = 5;
	//	self.add(title);
	}
	

		
	self.add(content);
	self.content = content;
	
		//add behavior for detail view
	self.addEventListener('itemSelected', function(e) {
		Ti.API.info("Selected:"+e);
		self.content.url = 'mydata/content/'+e.fname;
		self.content.reload();
	});
	
	return self;
};

module.exports = DetailView;


function getApiContent(){
	var data = null;
	
	var fileName = 'mydata/content/Titanium.json';
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, fileName);
 
	if (file.exists()) {
  		var dataSrc = Ti.Platform.osname==='android'? ''+file.read():file.read();
  		Ti.API.info(dataSrc);
  		data = JSON.parse(dataSrc);
	}else{
		Ti.API.info("FILE NOT FOUND ...");
	}
	
	return data;
	
}