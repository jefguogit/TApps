//Master View Component Constructor
function MasterView(width, height) {

//Ti.API.info('Masterview -- '+width+'  '+height);
	var self = Ti.UI.createView({
		width:width,
		height:height,
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/remotecontrol.png',
		borderWidth:0,
		borderColor:'transparent'
	});
	
//	require(Ti.Filesystem.getResourcesDirectory()+'html/games/g.js');
//	alert(games);
	
	//some dummy data for our table view
/*	var tableData = [
		{title:'Apples', price:'1.25', hasChild:true, color: '#000'},
		{title:'Grapes', price:'1.50', hasChild:true, color: '#000'},
		{title:'Oranges', price:'2.50', hasChild:true, color: '#000'},
		{title:'Bananas', price:'1.50', hasChild:true, color: '#000'},
		{title:'Pears', price:'1.40', hasChild:true, color: '#000'},
		{title:'Kiwis', price:'1.00', hasChild:true, color: '#000'}
	];
*/
/*
	var tableData = [];	
	
	tableData = getTableData();
*/	

	var tdata = [];
	for(li=0; li<15;li++){
		var row = Ti.UI.createTableViewRow({
			backgroundColor:'#cc6666',
			title:" ",
			font:{fontSize:15,fontWeight:'bold', fontFamily:'Arial'},
			color:'black'
		});
		tdata.push(row);
	}
	tdata[6].title=" ... Loading ...";
	
	var table1 = Ti.UI.createTableView({
		data:tdata,
		left:3,
		top:80,
		width:width-6,
		height:height-100,
		rowHeight:50,
		backgroundColor:'transparent'
	});
	self.add(table1);
	self.table = table1;
	
	//add behavior
	table1.addEventListener('click', function(e) {
//		Ti.API.log('master table click'+e+e.rowData.title+e.rowData.game);
		Ti.API.log('master table click'+e+e.row.title+e.row.game);
		self.fireEvent('opengame', {
			name:e.row.title,
			game:e.row.game
		});
	});
	
	
	self.addEventListener('display',function(e){
//		Ti.API.info("select player:"+myChess.PlayerIndex);
		if(self.table){
			self.remove(self.table);
			self.table = null;	
		}
		var tabDat = getTableData();
		table1.setData(tabDat);
		self.add(table1);
		self.table = table1;
	});
	
	var backButton = Ti.UI.createButton({
		top:30,
		left:20,
		width:90,
		height:48,
		backgroundImage:null
	})
	
	backButton.addEventListener('click',function(e){
		self.fireEvent('backToList');
	})
	
	var introButton = Ti.UI.createButton({
		top:30,
		left:160,
		width:90,
		height:48,
		backgroundImage:null
	})
	
	introButton.addEventListener('click',function(e){
		self.fireEvent('showIntro');
	})	

	self.add(backButton);
	self.add(introButton);	
	return self;
};

module.exports = MasterView;


function getRowData(no){
	
	var game = myChess.Games[myChess.PlayerIndex].games[no];
	
	var row = Ti.UI.createTableViewRow({
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/selection.png',
		borderWidth:0,
		height:40,
		game:no
	});

	
/*	var photo = Ti.UI.createView({
		backgroundImage:'../images/custom_tableview/user.png',
		top:5,
		left:10,
		width:50,
		height:50,
		clickName:'photo'
	});
	row.add(photo);
*/
    
	var desc = Ti.UI.createLabel({
		color:'#001122',
		font:{fontSize:11,fontWeight:'normal', fontFamily:'Arial'},
		left:20,
		top:32,
		height:12,
		width:240,
		backgroundColor:'transparent',
		text:game.Site+',  '+(game.Date).substr(0,4),
		textAlign:'center'
	});

	row.add(desc);

	var fontSize = 13;
	if (Titanium.Platform.name == 'android') {
		fontSize = 12;
	}
	var whiteu = Ti.UI.createLabel({
		color:'#112266',
		font:{fontSize:fontSize,fontWeight:'board', fontFamily:'Arial'},
		left:23,
		top:5,
		height:32,
		width:120,
		backgroundColor:'transparent',
		text:(game.White.length<16)?game.White:(game.White).substr(0,15)
	});
	row.add(whiteu);
	
	var blacku = Ti.UI.createLabel({
		color:'#112266',
		font:{fontSize:fontSize,fontWeight:'board', fontFamily:'Arial'},
		left:160,
		top:5,
		height:32,
		width:120,
		backgroundColor:'transparent',
		text:(game.Black.length<16)?game.Black:(game.Black).substr(0,15)
	});
	row.add(blacku);

	var result = Ti.UI.createLabel({
		color:'black',
		font:{fontSize:15,fontWeight:'bold', fontFamily:'Arial'},
		left:130,
		top:12,
		height:20,
		width:40,
		backgroundColor:'transparent',
		text:game.Result
	});
	row.add(result);
	
	return row;

}

function getTableData(){
	var tableData = new Array();
	for(i=0; i<myChess.Games[myChess.PlayerIndex].games.length; i++){		
		var row = getRowData(i);	
		tableData.push(row);
	}
	return tableData;
}	


