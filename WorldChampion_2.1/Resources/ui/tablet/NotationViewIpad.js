//Notation View Component Constructor
function NotationView(width,height) {
	
	Ti.API.log("notation view :"+width+"  "+height);
	
	var game = myChess.chessObj.game;
	
	var self = Ti.UI.createView({
		top:0
	});
	

	
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
	
	for(i=myChess.chessObj.moves.length; i<29; i++){
		var row = getBlankRowData();
		row.move=i;
		row.no.text = i+1;
		row.w.index = i*2+1;
		row.b.index = i*2+2;
		row.w.backgroundColor='white';
		row.b.backgroundColor='white';
		
		tableData.push(row);
	}

	myChess.chessObj.notations = tableData;
	
	var tableWidth = 150;

	var table1 = Ti.UI.createTableView({
		data:tableData,
		width:tableWidth,
		top:25,
		height:height,
		left:3,
//		backgroundColor:'transparent',
//		backgroundColor:'red',
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

function getBlankRowData(){
	
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