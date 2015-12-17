function MenuView(year,color) {
	
	var cbwidth = myChess.width/5;

	var self = Ti.UI.createView({
//		backgroundColor:'blue',
		top:cbwidth,
		left:0,
		width:myChess.width,
		height:myChess.width,
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/mback.png'
//		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/ttnb.png'

	});
	
	

	
	var ChessGate = require('ui/common/object/ChessGate');
	
	if(myChess.Gates){
		myChess.Gates =  new Array();
	} 
	
	var i=0;
	for(var y=year; y<year+10; y++){	
  		if(myChess.record['y'+y]){	
			var cButton = new ChessGate(y,cbwidth);
			
			var loc = getLocation(i);
			
			cButton.top=Math.floor(loc/10)*cbwidth+cbwidth;
			cButton.left=cbwidth/4+(loc%10)*cbwidth;
			cButton.pv = self;
			
			self.add(cButton);
			
//			myChess.Gates['y'+y] = cButton;
			i++;
		}
	}		
	
		
	return self;
};

module.exports = MenuView;

function getGates(end){
	
	var ChessGate = require('ui/common/object/ChessGate');
	
	myChess.Gates = new Array();
	var gateList = new Array();
	
	var cbwidth = myChess.width/4;
	
	var grow = Ti.UI.createTableViewRow({
		height:this.cbwidth
	});
	
	var i=0;
	for(var y=1900; y<=end; y++){	

  		if(myChess.record['y'+y]){	
			var cButton = new ChessGate(y,cbwidth);
			
//				cButton.top=Math.floor(i/5)*cbwidth+cbwidth;
			cButton.top=0;
			cButton.left=(i%4)*cbwidth;
//				cButton.pv = self;
			
			grow.add(cButton);
			
			myChess.Gates['y'+y] = cButton;
			i++;
			
			if(y==end){
				gateList.push(grow);
			}else if(i%4==0){
				gateList.push(grow);
				grow = Ti.UI.createTableViewRow({height:this.cbwidth});
			}			
		}
	}
	
	grow = Ti.UI.createTableViewRow({height:this.cbwidth});
	gateList.push(grow);
	
	return gateList;		
}

function refreshGates(){
	var y = myChess.record.iter;
	
	var gdata = getGates(1920);
	
	if(y>1920 && y<1941){
		gdata = getGates(1940);
	}else if(y>1940 && y<1961){
		gdata = getGates(1960);
	}else if(y>1960 && y<1981){
		gdata = getGates(1980);
	}else if(y>1980 && y<1981){
		gdata = getGates(2000);
	}else if(y>2000){
		gdata = getGates(2014);
	}	
Ti.API.info("REF:"+y+"  "+gdata+"  >>"+myChess.gates);	
	myChess.gates.data = gdata;
}

function getLocation(year){
	switch(year){
		case 0: return 0; break;
		case 1: return 21; break;
		case 2: return 33; break;
		case 3: return 14; break;
		case 4: return 2; break;
		case 5: return 23; break;
		case 6: return 44; break;
		case 7: return 32; break;
		case 8: return 20; break;
		case 9: return 12; break;
		default: return 22; break;
	}
	
	
}
