
function JDB(fn) {
	var self={
		jobj:null,
		filename:fn
	};
	var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,fn);
	if(f.exists()){
		var jstr = f.read().text;
		Ti.API.info("jstr=="+jstr);		
		var fobj = JSON.parse(jstr);
		if(fobj){
			this.jobj = fobj;
			Ti.API.info("load json obj");
		}else{
			Ti.API.error("json obj is not available");
		}	
	}else{
		if(fn == 'ttarchive.json'){
			var obj={};
			obj.num = 0;
			obj.list = new Array();		
		}else{
			Ti.API.info("File ["+fn+"] can not open");
			var obj={};
			obj.iter = 0;
			obj.star = 0;
			obj.token = 10;
		}	
		self.jobj = obj;
		if(f){
			f.write(JSON.stringify(self.jobj));
			Ti.API.info("FileDB inited and saved"); 
		};	
	}
    
    self.setObj = function(obj) { 
		this.jobj = obj;
	};	
	
	self.setText = function(jstr) { 
	    var obj = JSON.parse(jstr);
		this.jobj = obj;
	};	
	 
	self.saveFile = function(obj) {
Ti.API.info("SAVE FILE --- "+this.filename+"  "+obj);		
	    var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,this.filename);
	    if(obj){
	    	this.jobj = obj;
	    }
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
	
	self.saveAchieveData = function(year, result, gid, notation, end) {
		var dates = new Date();
		var obj = {
			gid : gid,
			result:result,
			notation:notation,
			date:dates,
			year:year,
			end:end
		};
Ti.API.info("G YEAR=="+obj.year);		
		
		if(this.jobj){
			this.jobj.list.push(obj);
		}else{
			this.init();
			this.jobj.list.push(obj);
		}
		this.jobj.num ++;
	    this.saveFile(this.jobj);
	};
	
	self.getArchieveData = function(){
		
		var data = [];
		if(this.jobj==null){
			this.loadFile();
		}
	
		for(i=0; i<this.jobj.list.length; i++){	
			
		//	var row = getRowData(i);
			var c = this.jobj.list.length-1-i;	
			
			var game = this.jobj.list[c];
	
			var datstr = game.date;
			var result = game.result;
			var notation = game.notation;
			var gid = game.gid;
			var year=game.year;
			var end=game.end;
			
			var dateL = Ti.UI.createLabel({
				text:datstr,
	//			text:Math.floor((Date.parse(new Date())-Date.parse(game.create))/86400000),
				textAlign:'left',
				height:12,
				width:90,
				font:{fontSize:13,fontWeight:'normal', fontFamily:'Arial'},
				color:'#113322',
				left:20
			});
			
			var resultL = Ti.UI.createLabel({
				text:result,
				textAlign:'center',
				height:18,
				width:40,
				font:{fontSize:15,fontWeight:'normal', fontFamily:'Arial'},
				color:'green',
				left:95
			});
			
			
			var gidL = Ti.UI.createLabel({
				text:gid,
				textAlign:'center',
				height:16,
				width:50,
				font:{fontSize:13,fontWeight:'normal', fontFamily:'Arial'},
				color:'blue',
				left:145
			});
			
			var exportButton = Ti.UI.createButton({
				left:200,
				width:20,
				height:20,
				gid:gid,
				clickName:'delbutton',
				backgroundImage:Ti.Filesystem.resourcesDirectory+'images/exportButton.png'
			});
			
			var replayButton = Ti.UI.createButton({
				left:270,
				width:20,
				height:20,
				gid:gid,
				year:year,
				end:end,
				notation:notation,				
				clickName:'delbutton',
				backgroundImage:Ti.Filesystem.resourcesDirectory+'images/soundon.png'
			});
			replayButton.addEventListener('click', function(){
				var code = this.gid;
				var year = this.year;
					myChess.Replay.board.setPiecesFromFen(this.end);
					myChess.Replay.setNotation(this.notation);
					myChess.Replay.setLabel(this.year);
					myChess.tabGroup.setActiveTab(4);
					myChess.Replay.startMove();

			});
				
			var row = Ti.UI.createTableViewRow({
				height:30,
				width:300,
				left:20,
				borderWidth:0,
				index:i,
				className:'game'
			});
			
			row.add(dateL);	
			row.add(resultL);
			row.add(gidL);	
			row.add(exportButton);
			row.add(replayButton);
	
			row.Gid = game.Gid;
					
			data.push(row);
		}
	
		Ti.API.info("data size:"+data.length);
		return data;
	};	
	
	
	self.loadFile = function() {
	Ti.API.info("filename ::: "+this.filename);	
		var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,this.filename);
		if(f.exists()){
			var jstr = f.read().text;
	Ti.API.info("jstr=="+jstr);		
			var fobj = JSON.parse(jstr);
			if(fobj){
				this.jobj = fobj;
				Ti.API.info("load json obj");
			}else{
				Ti.API.error("json obj is not available");
			}	
		}
	};
	
	self.init = function(){
		if(this.filename == 'ttarchive.json'){
			var obj={};
			obj.num = 0;
			obj.list = new Array();		
			this.saveFile(obj);	 
		}else{
			Ti.API.info("File ["+this.filename+"] can not open");
			var obj={};
			obj.iter = 0;
			obj.star = 0;
			obj.token = 10;
			this.jobj = obj;
			
			this.saveFile(obj);
		};	
	};
    
    return self;
}
 

 
module.exports = JDB;

