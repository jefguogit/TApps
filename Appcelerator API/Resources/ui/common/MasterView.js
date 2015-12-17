//Master View Component Constructor
function MasterView() {
	
	var list = getApiList();
	
//	Ti.API.info("Title -->"+list.title);
	
	var moduleArray = list.modules;
//	Ti.API.info("Modules -->"+moduleArray.length);
	var objectArray = list.objects;
//	Ti.API.info("Objects -->"+objectArray.length);
	
	
	var tableData1 = new Array();
	for(i=0; i<moduleArray.length; i++){
		var mitem = moduleArray[i];
		tableData1.push(getRowData(mitem));
//		Ti.API.info("("+i+") "+mitem.html);
	}
	

	var table1 = Ti.UI.createTableView({
		data:tableData1,
//		backgroundImage:Ti.Filesystem.resourcesDirectory+'image/tableback.png',
		borderWidth:0
	});
	table1.addEventListener('click', function(e) {
		Ti.API.info("CLICK:"+e.row+"  "+e.row.fname);
		self.fireEvent('itemSelected', {
			name:e.row.title,
			fname:e.row.fname
		});
	});
	
	var moduleList = Ti.UI.createView({
		left:0,
		width:320
	});
	moduleList.add(table1);
	
	var tableData2 = new Array();
	for(i=0; i<objectArray.length; i++){
		var mitem = objectArray[i];
		tableData2.push(getRowData(mitem));	
//		Ti.API.info("("+i+") "+mitem.html);
	}
	

	var table2 = Ti.UI.createTableView({
		data:tableData2
//		backgroundImage:Ti.Filesystem.resourcesDirectory+'image/tableback.png'
	});
	table2.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			name:e.row.title,
			fname:e.row.fname
		});
	});
	
	var objectList = Ti.UI.createView({
		left:0,
		width:320
	});
	objectList.add(table2);
	
	
	var searchView = Ti.UI.createView({
		left:0,
		width:320
	});
	

	var scrollView = Ti.UI.createScrollableView({
//		backgroundImage: Titanium.Filesystem.resourcesDirectory + '/image/leftpan.png',
		scrollingEnabled:false,
		views:[moduleList, objectList, searchView],
		showPagingControl:false,
		top:39,
		left:0,
		bottom:0,
		search:searchView,
		borderWidth:0
	});
	
	var titlebar = Ti.UI.createImageView({
		image: '../../image/titlebar_module.png',
		height:40,
		top:0,
		left:0
	});
	
	
	var moduleButton = Ti.UI.createButton({
		height:40,
		width:80,
		top:0,
		left:3,
//		title:'MODULE'
		backgroundImage:null,
		backgroundColor:'transparent'
	});
	moduleButton.addEventListener('click',function(){
		scrollView.scrollToView(0);
		titlebar.image = '../../image/titlebar_module.png';
		search.height = 38;
		search.top=5;
		search.backgroundImage = '../../image/navbar_background.png';
	});
	
	var objectButton = Ti.UI.createButton({
		height:40,
		width:75,
		top:0,
		left:88,
//		title:'OBJECT'
		backgroundImage:null,
		backgroundColor:'transparent'
	});
	objectButton.addEventListener('click',function(){
		scrollView.scrollToView(1);
		titlebar.image = '../../image/titlebar_object.png';
		search.height = 36;
		search.top=5;
		search.backgroundImage = '../../image/navbar_background.png';
		//Ti.API.info('titleBar:'+titlebar.backgroundImage);
	});
	
	var search = Titanium.UI.createSearchBar({
//		barColor:'#771111',
//		backgroundImage:'../../image/navbar_background.png',
		showCancel:false,
		height:36,
		top:5,
		left:175
	});
	search.addEventListener('return', function(e)
	{
//		Titanium.UI.createAlertDialog({title:'Search Bar', message:'You typed ' + e.value }).show();
		search.blur();
		var sv = getSearchResult(e.value, moduleArray, objectArray, self);
		scrollView.search.add(sv);
		scrollView.scrollToView(2);
		titlebar.image = '../../image/titlebar_search.png';
		search.height = 33;
		search.top=8;
		search.backgroundImage = '../../image/navbar_background_w.png';
	});
	

	
	var self = Ti.UI.createView({
		backgroundColor:'transparent',
		borderWidth:0,
		first:getRowData(moduleArray[0])
	});
	
	self.add(titlebar);
	self.add(moduleButton);
	self.add(objectButton);
	self.add(search);	
	
	self.add(scrollView);
		
	return self;
};

module.exports = MasterView;



function getApiList(){
	var data = null;
	
	var fileName = 'mydata/myapi.json';
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, fileName);
 
	if (file.exists()) {
  		var dataSrc = Ti.Platform.osname==='android'? ''+file.read():file.read();
//  		Ti.API.info(dataSrc);
  		data = JSON.parse(dataSrc); 
	}
	
	return data;
	
}

function getSearchResult(searchStr,moduleArray, objectArray, self){
	var data = null;
	
	searchStr = searchStr.toLowerCase();
		
	var tableData1 = new Array();
	for(i=0; i<moduleArray.length; i++){
		var mitem = moduleArray[i];
		var mtitle = mitem.title;
		mtitle = mtitle.toLowerCase();
		if(mtitle.indexOf(searchStr)>=0){
			tableData1.push(getRowData(mitem));			
			Ti.API.info("("+i+") "+mitem.title);
		}	
	}

	for(i=0; i<objectArray.length; i++){
		var mitem = objectArray[i];
		var mtitle = mitem.title;
		mtitle = mtitle.toLowerCase();
		if(mtitle.indexOf(searchStr)>=0){
			tableData1.push(getRowData(mitem));		
			Ti.API.info("("+i+") "+mitem.title);
		}	
	}
	

	var table1 = Ti.UI.createTableView({
		data:tableData1,
//		backgroundImage:Ti.Filesystem.resourcesDirectory+'image/tableback.png'		
	});
	table1.addEventListener('click', function(e) {
		Ti.API.info("Click:"+e.rowData+"  "+e.rowData.fname);
		self.fireEvent('itemSelected', {
			name:e.row.title,
			fname:e.row.fname
		});
	});
	
	return table1;
}

function getRowData(item){
	var row = Ti.UI.createTableViewRow({
//		backgroundImage:Ti.Filesystem.resourcesDirectory+'image/tablerowb.png',
		backgroundColor:'transparent',
		borderWidth:0
	});
Ti.API.info("html:"+item.html);	
	row.fname = item.html;
	row.selectedBackgroundColor = '#fff';
	row.className = 'datarow';
	row.clickName = 'row';

	var icon = Ti.UI.createImageView({
		top:2,
		left:3,
		width:20,
		height:20
	});
	
	if(item.type=="module"){
		icon.image = '../../image/moduleicon.png';
	}else{
		icon.image = '../../image/objecticon.png';
	}
	
	row.add(icon);


	var title = Ti.UI.createLabel({
		color:'#331111',
		font:{fontSize:17,fontWeight:'bold', fontFamily:'Tahoma,Arial,sans-serif'},
		shadowColor:"#ecc",
		shadowOffset:{x:1,y:1},
//		text-shadow: 2px 2px 2px #BBBBBB,
		left:25,
		top:3,
		height:20,
		width:280,
		clickName:'title',
		text:item.title
	});

	row.add(title);

	var fontSize = 13;
	if (Titanium.Platform.name == 'android') {
		fontSize = 11;
	}
	var subtitle = Ti.UI.createLabel({
		color:'#330066',
		font:{fontSize:fontSize,fontWeight:'normal', fontFamily:'Tahoma,Arial,sans-serif'},		
		left:2,
		top:19,
		height:40,
		width:300,
		clickName:'subtitle',
		text:item.summary
	});
	row.add(subtitle);
	
	return row;
	
	
	
}
