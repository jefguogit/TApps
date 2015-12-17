//Notation View Component Constructor
function NotationView(width,height) {
	//create object instance, parasitic subclass of Observable
	var game = myChess.chessObj.game;
	
	var self = Ti.UI.createView({
		bottom:20
	});
	
	var whitel = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial',},
		left:20,
		top:2,
		height:20,
		width:60,
		text:'WHITE: '
	});
//	self.add(whitel);
	
	var whiteu = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'bold', fontFamily:'Arial',},
		left:45,
		top:20,
		height:20,
		width:180,
		text:game.White
	});
	self.add(whiteu);
	self.white = whiteu;
	
	var blackl = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial',},
		left:30,
		top:30,
		height:20,
		width:60,
		text:'BLACK: '
	});	
//	self.add(blackl);
	var blacku = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'bold', fontFamily:'Arial'},
		left:220,
		top:20,
		height:20,
		width:180,
		text:game.Black
	});
	self.add(blacku);
	self.black = blacku;
	
	var site = Ti.UI.createLabel({
		color:'#001122',
		font:{fontSize:12,fontWeight:'bold', fontFamily:'Arial'},
		left:45,
		top:3,
		height:20,
		width:180,
		text:game.Site
	});

	self.add(site);
	
	var date = Ti.UI.createLabel({
		color:'#001122',
		font:{fontSize:12,fontWeight:'bold', fontFamily:'Arial'},
		left:200,
		top:3,
		height:20,
		width:180,
		text:game.Date
	});

	self.add(date);

	var result = Ti.UI.createLabel({
		color:'black',
		font:{fontSize:12,fontWeight:'bold', fontFamily:'Arial'},
		left:300,
		top:3,
		height:20,
		width:180,
		clickName:'result',
		text:game.Result
	});
	self.add(result);
	self.result = result;
	
	var tableData = [];	
	
	for(i=0; i<myChess.chessObj.moves.length; i++){
		var row = getRowData(myChess.chessObj.moves[i]);
		row.move=i;
		row.no.text = i;
		row.w.index = i*2+1;
		row.b.index = i*2+2;
		
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
	
	var tableWidth = 95;

	var table1 = Ti.UI.createTableView({
		data:tableData,
		width:tableWidth,
		top:50,
		bottom:10,
		right:0,
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
	
	var row = Ti.UI.createTableViewRow({backgroundColor:'transparent'});
	row.backgroundColor = 'transparent';
	//row.selectedBackgroundColor = '#9cf';


	var fontSize = 9;
	if (Titanium.Platform.name == 'android') {
		fontSize = 8;
	}
	
	var nol = Ti.UI.createLabel({
		color:'black',
		font:{fontSize:6,fontWeight:'normal', fontFamily:'Arial'},
		left:37,
		top:0,
		height:20,
		width:15,
		text:1,
		borderWidth:1,
		borderColor:'#666666',
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
		width:38,
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
		left:52,
		right:10,
		top:0,
		height:20,
		width:40,
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
