//Master View Component Constructor
function MasterView(width, height) {

//Ti.API.info('Masterview -- '+width+'  '+height);
	var self = Ti.UI.createView({
		width:width,
		height:height,
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/masterback.png',
		borderWidth:0,
		borderColor:'transparent'
	});
	


	var tdata = [];
	for(li=0; li<15;li++){
		var row = Ti.UI.createTableViewRow({
			backgroundColor:'transparent',
			title:" ",
			font:{fontSize:15,fontWeight:'bold', fontFamily:'Arial'},
			color:'black'
		});
		tdata.push(row);
	}
	tdata[6].title=" ... Loading ...";
	
	var table1 = Ti.UI.createTableView({
		data:tdata,
		left:5,
		top:50,
		width:width-10,
		height:height-70,
		rowHeight:40,
		backgroundColor:'transparent',
		separatorColor:'transparent'
	});
	self.add(table1);
	self.table = table1;
	
	//add behavior
	table1.addEventListener('click', function(e) {
//		Ti.API.log('master table click'+e+e.rowData.title+e.rowData.game);
		Ti.API.log('master table click'+e.row.index);
		self.fireEvent('opengame', {
			name:e.row.title,
			game:e.row.index
		});
	});
	
	
	self.addEventListener('display',function(e){
//		Ti.API.info("select player:"+myChess.PlayerIndex);

		var tabDat = getTableData(null);
		self.table.setData(tabDat.tableData);
		self.table.setIndex(tabDat.index);
		
		myChess.chessObj.PlayerList = tabDat;

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
//	self.add(introButton);	
	
	
	var search = Titanium.UI.createSearchBar({
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/searchBar.png',
		barColor:'transparent',
		showCancel:true,
		width:width-6,
		height:45,
		left:3,
		top:2
	});
/*	
	search.addEventListener('change', function(e)
	{
		Titanium.API.info('search bar: you type ' + e.value + ' act val ' + search.value);
		table1.data = searchTableData(search.value);
	
	});
*/	
	search.addEventListener('cancel', function(e)
	{
		Titanium.API.info('search bar cancel fired');
		table1.setData(myChess.chessObj.PlayerList.tableData);
		table1.setIndex(myChess.chessObj.PlayerList.index);
		search.blur();
	});
	search.addEventListener('return', function(e)
	{
//		Titanium.UI.createAlertDialog({title:'Search Bar', message:'You typed ' + e.value }).show();
//		table1.setData(searchTableData(search.value));
		var tabDat = getTableData(e.value);
		self.table.setData(tabDat.tableData);
		self.table.setIndex(tabDat.index);
		search.blur();
	});

	self.add(search);
	
	
	
	return self;
};

module.exports = MasterView;


function getRowData(no){
	
	var game = myChess.Games[myChess.PlayerIndex].games[no];
	var name1 = myChess.Players[myChess.PlayerIndex][6];
		
	var name2 = game.White;
	var color = 'white';
	
	if(name2.indexOf(name1)!=-1){
		name2 = game.Black;
		color = '#331122';
	}
	
	var result = game.Result;
	if(result.indexOf('1/2')){
		result = '1/2';
	}
	
	name2 = name2+" ("+game.Result+")"
	
	var row = Ti.UI.createTableViewRow({
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/babooItem.png',
		index:no,
		height:32,
		borderWidth:0,
		className:'game'
	});
	
	var eventStr = "";
	if(game.Event != '?'){
		eventStr = game.Event;
	}else if(game.Site != '?'){
		eventStr = game.Site;
	}
	
	var year = Ti.UI.createLabel({
		text:game.Year,
		textAlign:'left',
		height:12,
		width:50,
		font:{fontSize:13,fontWeight:'normal', fontFamily:'Arial'},
		color:'#113322',
		top:2,
		left:10
	})
	
	var event = Ti.UI.createLabel({
		text:eventStr,
		textAlign:'right',
		height:12,
		width:180,
		font:{fontSize:13,fontWeight:'normal', fontFamily:'Arial'},
		color:'#112233',
		top:2,
		right:10
	})
	
	var title = Ti.UI.createLabel({
		text:name2,
		textAlign:'bottom',
		height:20,
		width:238,
		color:color,
		bottom:6,
		left:20
	})
	
	row.add(year);
	row.add(event);
	row.add(title);


	row.year = game.Year;
	
	return row;

}

function getTableData(str){
		
	var years = myChess.Games[myChess.PlayerIndex].Years;
	
	var games_y = [];
//	var games = [];
//	for(c=0; c<years.len; c++){
//		games_y[years[i]] = [];
//	}
	
	for(i=0; i<myChess.Games[myChess.PlayerIndex].games.length; i++){	
		
		if(!query(str,i)){
			continue;
		}
			
		var row = getRowData(i);	
//		games.push(row);
		if(!games_y[row.year]){
			var section = Ti.UI.createTableViewSection({
				index:i,
				count:0
				});	
			var headerView = Ti.UI.createView({
				height:1
			})				
			games_y[row.year] = section;
		}
		games_y[row.year].add(row);
		games_y[row.year].count ++;
	}
	
	var groups = games_y;
	
	var gindex = [];
	var index = 0;
	for(i=0;i<years.length;i++){
		if(games_y[years[i]]){
			gindex.push({title:years[i], index:index});		
			index += games_y[years[i]].count;
		}	
	}

	data = {tableData:groups, index:gindex};
	
	return data;
}	


function query(str,no){
	

	if(str==null || str.length==0) {
		return true;
	}else{
		str = str.toLowerCase().replace(',',' ').replace(';', ' ');
	}

	var game = myChess.Games[myChess.PlayerIndex].games[no];
	var white = game.White;
	var black = game.Black;
	var site = game.Site;
	var year = game.Year;
	var date = game.Date;
	var event = game.Event;
	var eco = game.ECO;
		
	var value = white+" "+black;
	if(site){
		value += " "+site;
	}
	if(year){
		value += " "+year;
	}
	if(date){
		value += " "+date;
	}
	if(event){
		value += " "+event;
	}
	if(eco){
		value += " "+eco;
	}

	value = value.replace('?', ' ').replace(',',' ');
	value = value.toLowerCase();
	
	var ss =str.split(' ');
	for(si=0; si<ss.length; si++){
		var s = ss[si];
		if(value.indexOf(s) ==-1){
			return false;
		}
	}
	
	return true;

}	

