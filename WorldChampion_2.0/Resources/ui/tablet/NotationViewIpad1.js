//Notation View Component Constructor
function NotationView(width,height) {
	
	Ti.API.log("notation view :"+width+"  "+height);
	//create object instance, parasitic subclass of Observable
	var game = myChess.chessObj.game;
	
	var self = Ti.UI.createView({
		top:0
	});

	var eventu = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial',},
		left:30,
		top:0,
		height:20,
		width:180,
		text:game.Event
	});
	
	var siteu = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial',},
		left:30,
		top:20,
		height:20,
		width:120,
		text:game.Site
	});	

	var dateu = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial',},
		left:150,
		top:40,
		height:20,
		width:80,
		text:(game.Date).substr(0,4)
	});
	
	var whiteu = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial',},
		left:60,
		top:60,
		height:20,
		width:120,
		text:game.White
	});
	
	var welou = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial',},
		left:150,
		top:60,
		height:20,
		width:40,
		text:game.WhiteElo
	});	
	
	var blacku = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normarl', fontFamily:'Arial',},
		left:60,
		top:80,
		height:20,
		width:120,
		text:game.Black
	});	
	
	var belou = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial',},
		left:150,
		top:80,
		height:20,
		width:40,
		text:game.BlackElo
	});	
	
	var ecou = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial',},
		left:30,
		top:60,
		height:20,
		width:40,
		text:game.ECO
	});
	
	var resultu = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial',},
		left:110,
		top:60,
		height:20,
		width:40,
		text:game.Result
	});

	self.add(eventu);
	self.add(siteu);
	self.add(dateu);
//	self.add(whiteu);			
//	self.add(blacku);
	self.add(ecou);
//	self.add(resultu);
//	self.add(welou);	
//	self.add(belou);	
	
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

	myChess.chessObj.notations = tableData;
	
	var tableWidth = 150;

	var table1 = Ti.UI.createTableView({
		data:tableData,
		width:tableWidth,
		top:80,
		height:height-10,
		left:3,
		backgroundColor:'transparent',
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


	var fontSize = 13;
	if (Titanium.Platform.name == 'android') {
		fontSize = 12;
	}
	
	var nol = Ti.UI.createLabel({
		color:'black',
		font:{fontSize:10,fontWeight:'normal', fontFamily:'Arial'},
		left:60,
		top:0,
		height:20,
		width:25,
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
		height:20,
		width:60,
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
		left:85,
		right:10,
		top:0,
		height:20,
		width:60,
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
