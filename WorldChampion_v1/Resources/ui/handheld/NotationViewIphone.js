//Notation View Component Constructor
function NotationView(width,height) {
	//create object instance, parasitic subclass of Observable
	var game = myChess.chessObj.game;
	
	var self = Ti.UI.createView({
		top:0
	});

	var tournament = "";
	if(game.Event && (game.Event.indexOf('?')==-1)){
		tournament = game.Event;
	}else if((game.Site)&&(game.Site.indexOf('?')==-1)){
		tournament = game.Site;
	}
	var eventl = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
		left:100,
		top:100,
		height:20,
		width:50,
		text:'EVENT:'
	});	
	var eventu = Ti.UI.createLabel({
		font:{fontSize:15,fontWeight:'normal', fontFamily:'Arial',},
		color:'blue',
		left:148,
		top:100,
		height:20,
		width:150,
		text:tournament
	});
	
	var siteu = Ti.UI.createLabel({
		font:{fontSize:15,fontWeight:'normal', fontFamily:'Arial',},
		left:100,
		top:120,
		height:20,
		width:180,
		text:game.Site
	});	
	
	var edate = game.Year;
	if((game.Date)&&(game.Date.length>0)){
		edate = game.Year+"."+game.Date
	}	
	var datel = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
		left:100,
		top:125,
		height:20,
		width:45,
		text:'DATE:'
	});	
	var dateu = Ti.UI.createLabel({
		font:{fontSize:15,fontWeight:'normal', fontFamily:'Arial',},
		color:'blue',
		left:142,
		top:125,
		height:20,
		width:100,
		text:edate
	});
	

	var ecol = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
		left:100,
		top:150,
		height:20,
		width:38,
		text:'ECO:'
	});	
	var ecou = Ti.UI.createLabel({
		font:{fontSize:15,fontWeight:'normal', fontFamily:'Arial',},
		color:'blue',
		left:135,
		top:150,
		height:20,
		width:100,
		text:game.ECO
	});

	var resultl = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
		left:245,
		top:130,
		height:20,
		width:55,
		text:'RESULT:'
	});				
	var resultu = Ti.UI.createLabel({
		font:{fontSize:15,fontWeight:'normal', fontFamily:'Arial',},
		color:'blue',
		left:245,
		top:150,
		height:20,
		width:60,
		text:game.Result
	});
	self.add(eventl);
	self.add(eventu);
//	self.add(siteu);
	self.add(datel);
	self.add(dateu);
//	self.add(whitel);
//	self.add(whiteu);
//	self.add(blackl);			
//	self.add(blacku);
	self.add(ecol);
	self.add(ecou);
	self.add(resultl);
	self.add(resultu);
//	self.add(welou);	
//	self.add(belou);	
/*	
	self.white = whiteu;
	self.black = blacku;
	self.result = resultu;
	self.welo = welou;
	self.belo = belou;
	self.eventu = eventu;
//	self.round = roundu;
	self.date = dateu;
	self.eco = ecou;
*/	
	var tableData = [];	
	
	for(i=0; i<myChess.chessObj.moves.length; i++){
		var row = getRowData(myChess.chessObj.moves[i]);
		row.move=i;
		row.no.text = i;
		row.w.index = i*2+1;
		row.b.index = i*2+2;
		row.w.backgroundColor='white';
		row.b.backgroundColor='white';
		
		row.w.addEventListener('click', function(e) {
			var num = e.source.index;
			Ti.API.log('notation white click'+num);
			
			myChess.f.moveTo(num);
		});	
		row.b.addEventListener('click', function(e) {
			var num = e.source.index;
			Ti.API.log('notation black click'+num);
			
			myChess.f.moveTo(num);
		});
		
		tableData.push(row);
	}
	
	for(i=0; i<8; i++){
		var row = getBlankRowData();
		tableData.push(row);
	}
	

	myChess.chessObj.notations = tableData;
	
	var tableWidth = 85;

	var table1 = Ti.UI.createTableView({
		data:tableData,
		width:tableWidth,
		top:5,
		height:165,
		left:8,
		backgroundColor:'transparent',
		separatorColor:'transparent',
		allowsSelection:false
	});
	self.add(table1);
	self.table = table1;
	

	
	table1.addEventListener('show',function(e){
		table1.scrollToIndex(e.index);
	});
	
	myChess.chessObj.notation = table1;	

			
	return self;
};

module.exports = NotationView;


function getRowData(game){
	
	var row = Ti.UI.createTableViewRow({backgroundColor:'white'});
	row.backgroundColor = 'transparent';
	//row.selectedBackgroundColor = '#9cf';


	var fontSize = 9;
	if (Titanium.Platform.name == 'android') {
		fontSize = 8;
	}
	
	var nol = Ti.UI.createLabel({
		color:'black',
		font:{fontSize:7,fontWeight:'normal', fontFamily:'Arial'},
		left:35,
		top:0,
		height:15,
		width:12,
		text:1,
		borderWidth:1,
		borderColor:'#666666',
		backgroundColor:'ccddee',
		textAlign:'center'
	});
	row.add(nol);
	row.no = nol;
	
	var whitem = Ti.UI.createButton({
		color:'purple',
		font:{fontSize:fontSize,fontWeight:'bold', fontFamily:'Arial'},
		left:0,
		top:0,
		height:15,
		width:36,
		clickName:'whitem',
		title:game[0],
		borderWidth:1,
		borderColor:'#666666',
		textAlign:'center',
		backgroundImage:null
	});
	row.add(whitem);
	
	var blackm = Ti.UI.createButton({
		color:'black',
		font:{fontSize:fontSize,fontWeight:'bold', fontFamily:'Arial'},
		left:46,
		right:10,
		top:0,
		height:15,
		width:36,
		clickName:'blackm',
		title:game[1],
		borderWidth:1,
		borderColor:'#666666',
		textAlign:'center',
		backgroundImage:null
	});
	row.add(blackm);
	
	row.w = whitem;
	row.b = blackm;
	
	return row;

}

function getBlankRowData(){
	
	var row = Ti.UI.createTableViewRow({backgroundColor:'white'});
	row.backgroundColor = 'transparent';
	//row.selectedBackgroundColor = '#9cf';


	var fontSize = 9;
	if (Titanium.Platform.name == 'android') {
		fontSize = 8;
	}
	
	var nol = Ti.UI.createLabel({
		color:'black',
		font:{fontSize:7,fontWeight:'normal', fontFamily:'Arial'},
		left:35,
		top:0,
		height:15,
		width:12,
		text:' ',
		borderWidth:1,
		borderColor:'#666666',
		backgroundColor:'ccddee',
		textAlign:'center'
	});
	row.add(nol);
	row.no = nol;
	
	var whitem = Ti.UI.createButton({
		color:'purple',
		font:{fontSize:fontSize,fontWeight:'bold', fontFamily:'Arial'},
		left:0,
		top:0,
		height:15,
		width:36,
		clickName:'whitem',
		title:' ',
		borderWidth:1,
		borderColor:'#666666',
		textAlign:'center',
		backgroundImage:null
	});
	row.add(whitem);
	
	var blackm = Ti.UI.createButton({
		color:'black',
		font:{fontSize:fontSize,fontWeight:'bold', fontFamily:'Arial'},
		left:46,
		right:10,
		top:0,
		height:15,
		width:36,
		clickName:'blackm',
		title:' ',
		borderWidth:1,
		borderColor:'#666666',
		textAlign:'center',
		backgroundImage:null
	});
	row.add(blackm);
	
	row.w = whitem;
	row.b = blackm;
	
	return row;

}
