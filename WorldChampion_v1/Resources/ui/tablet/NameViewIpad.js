//Notation View Component Constructor
function NameView(width,height) {
	
	Ti.API.log("name view :"+width+"  "+height);
	//create object instance, parasitic subclass of Observable
//	var game = myChess.chessObj.game;
		
	var self = Ti.UI.createView({
		top:0,
		left:0,
		width:width,
		height:height
	});
	
	var whitel = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
		left:0,
		top:10,
		height:20,
		width:50,
		text:'WHITE:'
	});
	var whiteu = Ti.UI.createLabel({
		font:{fontSize:16,fontWeight:'normal', fontFamily:'Arial'},
		color:'blue',
		left:50,
		top:10,
		height:20,
		width:220,
		text:"game.White"
	});
	
	var welol = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
		left:300,
		top:10,
		height:20,
		width:50,
		text:'RATING:'
	}); 
	var welou = Ti.UI.createLabel({
		font:{fontSize:16,fontWeight:'normal', fontFamily:'Arial'},
		color:'blue',
		left:350,
		top:10,
		height:20,
		width:60,
		text:"game.WhiteElo"
	});	
	
	var blackl = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
		left:0,
		top:35,
		height:20,
		width:50,
		text:'BLACK:'
	})		
	var blacku = Ti.UI.createLabel({
		font:{fontSize:16,fontWeight:'normarl', fontFamily:'Arial'},
		color:'blue',
		left:50,
		top:35,
		height:20,
		width:220,
		text:"game.Black"
	});	
	
	var belol = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
		left:300,
		top:35,
		height:20,
		width:50,
		text:'RATING:'
	}); 
	var belou = Ti.UI.createLabel({
		font:{fontSize:16,fontWeight:'normal', fontFamily:'Arial'},
		color:'blue',
		left:350,
		top:35,
		height:20,
		width:60,
		text:"game.BlackElo"
	});	
	
	var tournament = "";
/*	
	if(game.Event && (game.Event.indexOf('?')==-1)){
		tournament = game.Event;
	}else if((game.Site)&&(game.Site.indexOf('?')==-1)){
		tournament = game.Site;
	}
*/	
	var eventl = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
		left:0,
		top:60,
		height:20,
		width:50,
		text:'EVENT:'
	});	
	var eventu = Ti.UI.createLabel({
		font:{fontSize:16,fontWeight:'normal', fontFamily:'Arial'},
		color:'blue',
		left:50,
		top:60,
		height:20,
		width:160,
		text:"tournament"
	});
	

	var roundl = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
		left:220,
		top:60,
		height:20,
		width:50,
		text:'ROUND:'
	});		
	var roundu = Ti.UI.createLabel({
		font:{fontSize:16,fontWeight:'normal', fontFamily:'Arial'},
		color:'blue',
		left:270,
		top:60,
		height:20,
		width:30,
		text:"round"
	});	

	var edate = "";
/*	
	if((game.Date)&&(game.Date.length>0)){
		edate = game.Year+"."+game.Date
	}
*/	
	var datel = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
		left:310,
		top:60,
		height:20,
		width:45,
		text:'DATE:'
	});			
	var dateu = Ti.UI.createLabel({
		font:{fontSize:16,fontWeight:'normal', fontFamily:'Arial'},
		color:'blue',
		left:355,
		top:60,
		height:20,
		width:100,
		text:"edate"
	});
	
	var ecol = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
		left:0,
		top:85,
		height:20,
		width:50,
		text:'ECO:'
	});			
	var ecou = Ti.UI.createLabel({
		font:{fontSize:16,fontWeight:'normal', fontFamily:'Arial'},
		color:'blue',
		left:50,
		top:85,
		height:20,
		width:120,
		text:"game.ECO"
	});

	var resultl = Ti.UI.createLabel({
		font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
		left:220,
		top:85,
		height:20,
		width:60,
		text:'RESULT:'
	});			
	var resultu = Ti.UI.createLabel({
		font:{fontSize:16,fontWeight:'normal', fontFamily:'Arial'},
		color:'blue',
		left:280,
		top:85,
		height:20,
		width:80,
		text:"game.Result"
	});

	self.add(whitel);
	self.add(whiteu);
	self.add(blackl);			
	self.add(blacku);
	self.add(resultl);
	self.add(resultu);
	self.add(welol);
	self.add(welou);
	self.add(belol);	
	self.add(belou);
	self.add(eventl);
	self.add(eventu);
	self.add(roundl);
	self.add(roundu);
	self.add(datel);
	self.add(dateu);
	self.add(ecol);
	self.add(ecou);
	self.add(resultl);
	self.add(resultu);
			
	
	self.white = whiteu;
	self.black = blacku;
	self.result = resultu;
	self.welo = welou;
	self.belo = belou;
	self.eventu = eventu;
	self.round = roundu;
	self.date = dateu;
	self.eco = ecou;
	

	return self;
};

module.exports = NameView;


