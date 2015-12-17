//Master View Component Constructor
function MasterView(width, height) {

	var gameEventCount = 0;
	
//	Ti.API.info('Masterview iphone -- '+width+'  '+height);
	var self = Ti.UI.createView({
		width:width,
		height:height,
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/masterbackh.png'
//		borderWidth:3
//		borderColor:'transparent'
	});
	var head = Ti.UI.createView({
//		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/master_head.png',
		top:0,
		left:0,
		width:width,
		height:50
	})
	self.add(head);
	
	var tdata = getInitData();
	
	var table1 = Ti.UI.createTableView({
		data:tdata,
		left:8,
		top:53,
		width:width-6,
		height:height-60,
		rowHeight:30,
		backgroundColor:'transparent',
		separatorColor:'transparent'
	});
	table1.addEventListener('click', function(e) {

//		Ti.API.log('master table click'+e+e.rowData.title+e.rowData.game);
//		Ti.API.log('master table click '+e.row.index);
		myChess.chessObj.gameIndex = e.row.index;
		myChess.tabGroup.fireEvent('showGame');

//		myChess.Flurry.logEvent('enter game', {iPhone:(++gameEventCount)+':'+e.row.index});
	});
	

	
	self.add(table1);
	self.table = table1;
	myChess.chessObj.gameTable = table1;
	
	//add behavior

	
	
	self.addEventListener('display',function(e){
		Ti.API.info(myChess.PlayerIndex+"  "+e.index);

//		self.pName.text = myChess.Players[myChess.PlayerIndex][0];
		
		self.table.setData(getInitData());
		self.table.setIndex([]);

		var tabDat = getTableData(null);
Ti.API.info("tabDat:"+tabDat);		
		self.table.setData(tabDat.tableData);
		self.table.setIndex(tabDat.index);
		
		myChess.chessObj.PlayerList = tabDat;
		
	});
	
	var backButton = Ti.UI.createButton({
		top:2,
		left:10,
		width:90,
		height:30,
		backgroundImage:null
	})
	
	backButton.addEventListener('click',function(e){
		search.blur();
		search.top = -100;
		search.fireEvent('cancel');
		myChess.tabGroup.fireEvent('showPlayer');
	})
	
	var searchButton = Ti.UI.createButton({
		top:2,
		right:0,
		width:40,
		height:52,
		backgroundImage:null
	})
	
	searchButton.addEventListener('click',function(e){
		search.top=45;
		self.sb.focus();
		table1.top = 93;
	})	

	self.add(backButton);
	self.add(searchButton);	

	var player = myChess.Players[myChess.PlayerIndex];	

	var search = Titanium.UI.createSearchBar({
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/searchBar.png',
		barColor:'transparent',
		showCancel:true,
		size:20,
		height:40,
		top:-100
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
		search.top=-100;
		table1.top = 53;
	});


	var cancelButton = Ti.UI.createButton({
		width:70,
		height:40,
		right:2,
		backgroundImage:null
	})
	cancelButton.addEventListener('click', function(){
		search.fireEvent('cancel');
	})
	
	
	search.add(cancelButton);
	
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
	self.sb = search;
	
	
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
	if(result.indexOf('0')==-1){
		result = '1/2';
	}
	
//	name2 = name2+" ("+game.Result+")"
	result = "("+result+")";
	
	var row = Ti.UI.createTableViewRow({
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/babooItemh.png',
		height:39,
		borderWidth:0,
		index:no,
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
	
	var resultD = Ti.UI.createLabel({
		text:result,
		textAlign:'left',
		height:12,
		width:50,
		font:{fontSize:13,fontWeight:'normal', fontFamily:'Arial'},
		color:'#113322',
		top:2,
		left:80
	})
	
	var event = Ti.UI.createLabel({
		text:eventStr,
		textAlign:'right',
		height:12,
		width:180,
		font:{fontSize:13,fontWeight:'normal', fontFamily:'Arial'},
		color:'#112233',
		top:2,
		right:15
	})
	
	var title = Ti.UI.createLabel({
		text:name2,
		textAlign:'bottom',
		height:30,
		width:238,
		font:{fontSize:15,fontWeight:'normal', fontFamily:'Arial'},
		color:color,
		bottom:1,
		left:20
	})
	
	row.add(year);
	row.add(resultD);
	row.add(event);
	row.add(title);


	row.year = game.Year;
	
	return row;

}

function getTableData(str){
	Ti.API.info("index:"+myChess.PlayerIndex);
		
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

function getInitData(){
	var tdata = [];
	for(li=0; li<9;li++){
		var row = Ti.UI.createTableViewRow({
			backgroundColor:'#transparent',
			title:" ",
			font:{fontSize:18,fontWeight:'bold', fontFamily:'Arial'},
			color:'black'
		});
		tdata.push(row);
	}
	tdata[5].title=" ... Loading game list ...";
	
//	tdata[5].height = 120;
//	tdata[5].width=270;
	
//	randomnumber=Math.floor(Math.random()*5)+1;
//	tdata[5].backgroundImage=Ti.Filesystem.resourcesDirectory+"mydata/quote/q"+randomnumber+".png";

	return tdata;
}	


	
	


