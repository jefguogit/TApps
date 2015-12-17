
function JDB() {
    var jobj;
}
 
JDB.prototype.setObj = function(obj) { 
	this.jobj = obj;
}	

JDB.prototype.setText = function(jstr) { 
    var obj = JSON.parse(jstr);
	this.jobj = obj;
}	
 
JDB.prototype.saveFile = function(filename) {
    var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
	if(this.jobj){
		if(f){
			f.write(JSON.stringify(this.jobj));
			Ti.API.info("FileDB saved");
		}else{
			Ti.API.error("File ["+filename+"] can not open");
		}	
	}else{
		Ti.API.error("Json Object is not available!");
	}		
};

JDB.prototype.loadFile = function(filename) {
	var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
	if(f.exists()){
		var jstr = f.read().text;
		var fobj = JSON.parse(jstr);
		if(fobj){
			this.jobj = fobj;
			Ti.API.info("load json obj");
		}else{
			Ti.API.error("json obj is not available");
		}	
	}else{
		Ti.API.error("File ["+filename+"] can not open");
		var obj={};
		obj.games = new Array();
		this.jobj = obj;
		
		this.saveFile('fav.json');
	}	
};

JDB.prototype.addFavorite = function() {
	var game = myChess.chessObj.game;
	game.create = new Date();
	
	if(!this.jobj){
		this.loadFile("fav.json");
	}
	
	if(this.jobj){	
		var count = -1;		
		for(var i=0; i<this.jobj.games.length; i++){
			var agame = this.jobj.games[i];
			if(agame && agame.Gid == game.Gid){
				count = i;
				break;
			}
		}
		if(count>-1){
			for(var j=count+1; j<this.jobj.games.length; j++){
				this.jobj.games[j-1] = this.jobj.games[j];
			}
			this.jobj.games.pop();
		}	

		this.jobj.games.push(game);
		this.saveFile("fav.json");

	}
}	

JDB.prototype.delFavorite = function(gid) {
	
	if(!this.jobj){
		this.loadFile("fav.json");
	}
	
	if(this.jobj){	
		var count = -1;
		for(var i=0; i<this.jobj.games.length; i++){
			var game = this.jobj.games[i];
			if(game){
				if(gid == game.Gid){
					count = i;
					break;
				}
			}
		}
		if(count>-1){
			for(var j=count+1; j<this.jobj.games.length; j++){
				this.jobj.games[j-1] = this.jobj.games[j];
			}
			this.jobj.games.pop();
			this.saveFile("fav.json");
		}				
	}
}	

JDB.prototype.loadFavorite = function() {
	this.loadFile("fav.json");
	return this.jobj;
}	

JDB.prototype.getTableData = function(){
		
	var data = [];

	this.loadFile("fav.json");
Ti.API.info("load json "+this.jobj.games.length);	
	
	for(i=0; i<this.jobj.games.length; i++){	
		
	//	var row = getRowData(i);
		var c = this.jobj.games.length-1-i;	
		
		var game = this.jobj.games[c];

		var name1 = game.White;
		var name2 = game.Black;
	
		var eventStr = "";
		if(game.Event != '?'){
			eventStr = game.Event;
		}else if(game.Site != '?'){
			eventStr = game.Site;
		}
		var event = Ti.UI.createLabel({
			text:eventStr,
//			text:game.Gid,
			textAlign:'left',
			height:12,
			width:160,
			font:{fontSize:13,fontWeight:'normal', fontFamily:'Arial'},
			color:'#112233',
			top:2,
			left:100
		})
		
		var year = Ti.UI.createLabel({
			text:game.Year,
//			text:Math.floor((Date.parse(new Date())-Date.parse(game.create))/86400000),
			textAlign:'left',
			height:12,
			width:50,
			font:{fontSize:13,fontWeight:'normal', fontFamily:'Arial'},
			color:'#113322',
			top:2,
			left:32
		})
		
		var title = Ti.UI.createLabel({
			text:name1+" vs.  "+name2,
			textAlign:'bottom',
			height:18,
			width:250,
			font:{fontSize:15,fontWeight:'normal', fontFamily:'Arial'},
			color:color,
			bottom:3,
			left:32
		})
		
		
		var dhour = Math.floor((Date.parse(new Date())-Date.parse(game.create))/3600000);
		var dstr = dhour + " h";

		if(dhour>23){
			dhour = Math.floor((dhour+1)/24);
			if(dhour < 31){
				dstr = dhour + " d";
			}else if(dhour < 365){
				dstr = Math.floor(dhour/30)+" m";
			}else{
				dstr = Math.floor(dhour/365)+" y";
			}
		}	 
		
		var difd = Ti.UI.createLabel({
			text:dstr,
			textAlign:'right',
			height:16,
			width:60,
			font:{fontSize:15,fontWeight:'normal', fontFamily:'Arial'},
			color:'#001122',
			top:5,
			right:20
		})
		
		var delbutton = Ti.UI.createButton({
			title:'del',
			top:10,
			left:5,
			width:20,
			height:20,
			gid:game.Gid,
			clickName:'delbutton',
			backgroundImage:Ti.Filesystem.resourcesDirectory+'images/delbutton.png'
		})
		delbutton.addEventListener('click',function(){
			myChess.JDB.delFavorite(this.gid);
			myChess.Favview.refresh();	
		})
	
		
		var row = Ti.UI.createTableViewRow({
			backgroundImage:Ti.Filesystem.resourcesDirectory+'images/babooItemf.png',
			height:39,
			width:300,
			left:20,
			borderWidth:0,
			index:i,
			className:'game'
		});
		
		row.add(year);	
		row.add(event);
		row.add(difd);
		row.add(title);		
		row.add(delbutton);

		row.Gid = game.Gid;
				
		data.push(row);
	}
	
	Ti.API.info("data size:"+data.length);
	return data;
}	
 
module.exports = JDB;

