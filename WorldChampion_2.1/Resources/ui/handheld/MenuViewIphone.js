//Master View Component Constructor
function MenuView(width, height) {
	//create object instance, parasitic subclass of Observable
	
	var self = Ti.UI.createView({
		width:myChess.width,
		height:myChess.height-10,
		top:0,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/chessbacks1.png"
	});
	
	var playerNum = myChess.Players.length;
	
	var images = [];
	for (var c=0;c<playerNum;c++){
		var player = myChess.Players[c];
		images[c]={
			image:"/mydata/icon/icon"+player[6]+".png",
			width:200,
			height:200
		};	
	}	

	// create coverflow view with images
	var view = Titanium.UI.iOS.createCoverFlowView({
		images:images,
		selected : 10,
//		top:120,
//		backgroundImage:Ti.Filesystem.resourcesDirectory+"mydata/icon/chessbackss1.png",
	});
	
	var enterButton = Ti.UI.createButton({
		width:120,
		height:66,
		top:68,
		left:138,
		backgroundImage: Ti.Filesystem.resourcesDirectory+"images/arrow.png"
	});
	view.add(enterButton);

	// click listener - when image is clicked
	view.addEventListener('click',function(e)
	{
//		Titanium.API.info("image clicked: "+e.index+', selected is '+view.selected);
		myChess.refresh = true;
		
		myChess.PlayerIndex = view.selected;
		
		myChess.tabGroup.fireEvent('showIntro');
	});
	

	self.add(view);
	


	var tabView = Ti.UI.createView({
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/tabback.png",
		height:50,
		bottom:8
	})
	
	self.add(tabView);
	

	var vb = Ti.UI.createButton({
//		title:'video',
		bottom:0,
		left:0,
		width:170,
		height:60,
		backgroundImage:null
	})
	vb.addEventListener('click',function(){

		myChess.tabGroup.vv.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/videoback.png";	
		myChess.tabGroup.hv.top=-500;
		myChess.tabGroup.hv.left=20;
		myChess.tabGroup.hv.width=180;
		myChess.tabGroup.hv.height=120;
		myChess.tabGroup.hv.borderColor='#333333',
//		myChess.tabGroup.hv.play();	
		myChess.tabGroup.button.top=30;
			
		myChess.tabGroup.fireEvent('showHead');	

		
		if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE){		
			VideoList = require('/ui/common/VideoListView');	
			var view =  new VideoList(180,20,10,10,220,120,50,25);
			myChess.tabGroup.vv.add(view);
			myChess.tabGroup.vcontent = view;
		}else{
			var alertLabel = Titanium.UI.createLabel({
 				text: 'Your device is not online now, please try later.',
 				color:'white',
				top:180,
				width:270
        	});
    		myChess.tabGroup.vv.add(alertLabel);
    		myChess.tabGroup.vmsg = alertLabel;
		}
	
	})
	self.add(vb);
	

	
	var fbb = Ti.UI.createButton({
//		title:'video',
		bottom:0,
		left:170,
		width:160,
		height:60,
		backgroundImage:null
	})
	fbb.addEventListener('click',function(){
		if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
     		var alertDialog = Titanium.UI.createAlertDialog({
            	title: 'WARNING!',
              	message: 'Thank you for your support. But your device is not online now, please try later.',
              	buttonNames: ['OK']
            });
            alertDialog.show();
		}else{
			myChess.form.feedbackForm.bottom=10;	
			myChess.form.msgForm.bottom = -800;
		}	
	})
	self.add(fbb);	


	var fb = Ti.UI.createButton({
//		title:'feedback',
		bottom:15,
		right:10,
		width:36,
		height:36,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/together1.png"
	})
	fb.addEventListener('click',function(){
		fbb.fireEvent('click');
	})
	self.add(fb);			
	var pinx = 1;
	setInterval(function(){
			pinx = pinx%5+1;
			fb.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/together"+pinx+".png";
//			Ti.API.info(fb.backgroundImage);
		},1680);	
	
	
	
	var msgform = createMsgForm();
	self.add(msgform);
	myChess.form.msgForm = msgform;
	
	var feedbackform = createFeedbackForm();
	self.add(feedbackform);
	myChess.form.feedbackForm = feedbackform;
	
	var direct = Ti.UI.createView({
		width:300,
		height:120,
		top:-500,
		right:5,
//		backgroundColor:'#0099ff'
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/directview.png"
	})
	
	var gobutton = Ti.UI.createButton({
		title:'go',
		top:80,
		right:10,
		width:50,
		height:30,
		enabled:false
//		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/gobutton.png"
	})
	
	gobutton.addEventListener('click',function(){

		var code = myChess.DirectCode.value;
		var playercode = code.substring(0,2);
		var gamecode = code.substring(2,6);
		myChess.PlayerIndex = parseInt(playercode,10)-1;
		myChess.chessObj.gameIndex = parseInt(gamecode,10)-1;
		
		if((myChess.PlayerIndex>-1)&&(myChess.chessObj.gameIndex>-1)&&myChess.Games[myChess.PlayerIndex].games[myChess.chessObj.gameIndex]){
			myChess.refresh = true;
			myChess.tabGroup.fireEvent('showGame');
		
			myChess.DirectGoButton.enabled = false;
			myChess.DirectCode.value = '';
			
			direct.top = -500;
			
		}else{
			myChess.DirectGoButton.enabled = false;
			myChess.DirectCode.value = 'ERROR';
		}	
	})
	
	direct.add(gobutton);
	
	myChess.DirectGoButton = gobutton;
	
	var codes = Ti.UI.createTextField({
		font:{fontSize:38,fontWeight:'normal', fontName:'DBLCDTempBlack'},
		color:'#ffffff',
		left:168,
		top:30,
		width:150,
		height:36,
		editable:false,
		value:''
	})
	direct.add(codes);
	
	myChess.DirectCode = codes;
	
	myChess.keyButtons = new Array();
	for(var i=0;i<10;i++){
		var keyb = Ti.UI.createButton({
			title:i,
			width:38,
			height:38,
			top:5+37*Math.floor(i/3),
			left:5+38*(i%3),
			color:'green',
			font:{fontSize:30,fontWeight:'normal', fontFamily:'Arial'},
			backgroundImage:null,
			enabled:false
		})
		
		if(i==9){
			keyb.left = 5+38*3;
			keyb.top = 5+37*2;
		}
		
		keyb.enable = function(){
			this.color = 'black';
			this.enabled = true;
		}
		keyb.disable = function(){
			this.color = '#cccccc';
			this.enabled = false;
		}
		
		keyb.addEventListener('click',function(){
			if(myChess.DirectCode.value == 'ERROR'){
				myChess.DirectCode.value = '';
				myChess.directShowButton.directKeyStatus();
				return;
			}
			
			var c = myChess.DirectCode.value;
			if(c.length<6){
				myChess.DirectCode.value = c+this.title;
			}
			if(myChess.DirectCode.value.length==6){
				myChess.DirectGoButton.enabled = true;				
			}	
			myChess.directShowButton.directKeyStatus();
		})
		
		direct.add(keyb);	
		myChess.keyButtons.push(keyb);
	}	
	
	var backb = Ti.UI.createButton({
			width:38,
			height:38,
			top:5,
			left:5+38*3,
			backgroundImage:null
//			backgroundImage:Ti.Filesystem.resourcesDirectory+"images/directBackButton.png"
	})
		
	backb.addEventListener('click',function(){
		if(myChess.DirectCode.value == 'ERROR'){
			myChess.DirectCode.value = '';
		}else{
			var c = myChess.DirectCode.value;
			if(c.length>0){
				myChess.DirectCode.value = c.substring(0,c.length-1);
			}
		}	
		myChess.directShowButton.directKeyStatus();
	})
		
	direct.add(backb);	
	
	var hidebutton = Ti.UI.createButton({
//		title:'direct',
		top:0,
		right:0,
		width:40,
		height:40,
		backgroundImage:null
	})
	
	hidebutton.addEventListener('click',function(){
		direct.top = -500;		
	})
	
	direct.add(hidebutton);	
	
	
	var showbutton = Ti.UI.createButton({
//		title:'direct',
		top:1,
		right:1,
		width:40,
		height:45,
		backgroundImage:null
	})
	
	showbutton.addEventListener('click',function(){
		direct.top = 1;
		this.directKeyStatus();		
	})
	
	showbutton.directKeyDisable = function(){
		for(var i=0;i<10;i++){
			myChess.keyButtons[i].disable();
		}	
	}
	showbutton.directKeyEnable = function(){
		for(var i=0;i<10;i++){
			myChess.keyButtons[i].enable();
		}	
	}
	
	showbutton.validateGid = function(code){		
		var playercode = code.substring(0,2);
		var pid = parseInt(playercode,10)-1;
		var glen = myChess.Games[pid].games.length;
		var count = code.length;
		
		var max = 9;
		if(count==2){
			max = Math.floor(glen/1000);			
		}else if(count==3){	
			max = Math.floor(glen/100) % 10;
		}else if(count==4){
			max = Math.floor(glen/10)%10;
		}else if(count==5){
			max = glen%10;
		}else{
			max = -1;
		}
Ti.API.info(code+"   "+count+"   "+max+"   "+pid+"   "+glen);		
		for(var i=0;i<=max;i++){
			myChess.keyButtons[i].enable();
		}		
		
	}	
	showbutton.directKeyStatus = function(){
		var clen = myChess.DirectCode.value.length;
		if(clen==0){
			this.directKeyDisable();
			myChess.keyButtons[0].enable();
			myChess.keyButtons[1].enable();
		}else if(clen==1){
			this.directKeyEnable();
			if(myChess.DirectCode.value=='1'){
				myChess.keyButtons[7].disable();
				myChess.keyButtons[8].disable();
				myChess.keyButtons[9].disable();
			}else{
				myChess.keyButtons[0].disable();
			}	
		}else{
			this.directKeyDisable();
			this.validateGid(myChess.DirectCode.value);
		}	
			
/*			
			if(myChess.DirectCode.value=='01'||
				myChess.DirectCode.value=='03'||
				myChess.DirectCode.value=='06'||
				myChess.DirectCode.value=='11'||
				myChess.DirectCode.value=='12'){
					myChess.keyButtons[0].enable();
			}else if(myChess.DirectCode.value=='02'||
				myChess.DirectCode.value=='05'||
				myChess.DirectCode.value=='07'||
				myChess.DirectCode.value=='09'||
				myChess.DirectCode.value=='10'||
				myChess.DirectCode.value=='13'||
				myChess.DirectCode.value=='14'||
				myChess.DirectCode.value=='15'||
				myChess.DirectCode.value=='16'){
					myChess.keyButtons[0].enable();
					myChess.keyButtons[1].enable();
			}else{
				myChess.keyButtons[0].enable();
				myChess.keyButtons[1].enable();
				myChess.keyButtons[2].enable();
			}
		}else{
			this.directKeyEnable();
		}
*/		
	}

	self.add(showbutton);
	
	myChess.directShowButton = showbutton;
	
	
	var favview = Ti.UI.createView({
		width:myChess.width,
		height:400,
		top:-500,
		left:0,
		backgroundColor:'#6699ff'
//		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/viewback.png"
	})	
	var favtitle = Ti.UI.createLabel({
		text:'Favorite Games',
		top:0,
		backgroundColor:'#0066cc'
	})
	favview.add(favtitle);
	
	var hidebutton = Ti.UI.createButton({
		right:0,
		top:0,
		width:30,
		height:20,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/hidebutton.png"
	})
	hidebutton.addEventListener('click',function(){
		myChess.Favview.top = -500;
	})
	favview.add(hidebutton);
	
	favview.refresh = function(){
		var tv = this.table;
		if(this.table){
			this.remove(this.table);	
		}
		if(this.nogame){
			this.remove(this.nogame);	
		}
		
		var tdata = myChess.JDB.getTableData();	
		if(tdata && tdata.length>0){
				var table = Ti.UI.createTableView({
					data:tdata,
					left:1,
					top:30,
					height:350,
					backgroundColor:'transparent',
					separatorColor:'transparent'
				});
				table.addEventListener('click', function(e) {
					if(e.source.clickName == 'delbutton'){
						return;
					}
					var code = e.row.Gid;
					var playercode = code.substring(0,2);
					var gamecode = code.substring(2,6);
					myChess.PlayerIndex = parseInt(playercode,10)-1;
					myChess.chessObj.gameIndex = parseInt(gamecode,10)-1;
					
					if(myChess.Games[myChess.PlayerIndex].games[myChess.chessObj.gameIndex]){
						myChess.Favview.top = -500;
						
						myChess.refresh = true;
						myChess.tabGroup.fireEvent('showGame');
					
						myChess.DirectGoButton.enabled = false;
						myChess.DirectCode.value = '';
						
						
					}else{
						alert("Sorry, the game is not available.");
					}
				});	
				this.add(table);	
				this.table = table;		
		}else{
			var nogame = Ti.UI.createLabel({
				text:'No favorite game now.',
				top:50,
				backgroundColor:'transparent'
			});
			this.add(nogame);
			this.nogame = nogame;
		}
	}
	
	self.add(favview);
	myChess.Favview = favview;
	
	var favbutton = Ti.UI.createButton({
//		title:'fav',
		top:1,
		right:45,
		width:40,
		height:45,
		backgroundImage:null
	})
	
	favbutton.addEventListener('click',function(){
		favview.top = 5;
		favview.refresh();
	})
	
	self.add(favbutton);
	
	self.add(direct);
	
	return self;
};

module.exports = MenuView;

function goPlayer(obj,index){
	obj.fireEvent('itemSelected', {
		name:player[0],
		game:index
	});
}
function getMenuData(player){
	
	var row = Ti.UI.createTableViewRow();
	row.selectedBackgroundColor = '#fff';
	row.className = 'datarow';
	row.clickName = 'row';
	row.backgroundImage = 'images/playerback.png';
	row.height = 120;
	row.name = player[0];


	var picpath = Ti.Filesystem.resourcesDirectory+player[6];
	var picture = Ti.UI.createImageView({
		image : picpath,
		width : 'auto',
		height : 100,
		top : 6,
		left : 20
	});
	
	row.add(picture);

	var title = Ti.UI.createLabel({
		color:'#ffffff',
		font:{fontSize:18,fontWeight:'bold', fontFamily:'Arial'},
		left:200,
		top:2,
		height:30,
		width:'auto',
		text:player[0]+',  '+player[2]+' | '+player[1]
	});

	row.add(title);

	var fontSize = 16;
	if (Titanium.Platform.name == 'android') {
		fontSize = 14;
	}
	var subtitle = Ti.UI.createLabel({
		color:'blue',
		font:{fontSize:fontSize,fontWeight:'normal', fontFamily:'Arial'},
		left:180,
		top:31,
		height:'auto',
		width:'auto',
		clickName:'subtitle',
		text:player[4]
	});
	row.add(subtitle);
		
	return row;

}

function getMenuItem(player){
	var iv = Ti.UI.createView({
		width:myChess.width*1/4,
		height:myChess.height*1/4
	})
	
	var leftv = Ti.UI.createView({
		top:0,
		left:0,
		width:myChess.width*1/10,
		height:myChess.height*1/4
	})
	var picpath = Ti.Filesystem.resourcesDirectory+"mydata/pic/"+player[6]+".jpg";
	var picture = Ti.UI.createImageView({
		image : picpath,
		width : myChess.width*2/25,
		height: myChess.height*1/6,
		top : 1,
		left:1
	});
	leftv.add(picture);
	var title = Ti.UI.createLabel({
		color:'#000000',
		font:{fontSize:15,fontWeight:'bold', fontFamily:'Arial'},
		left:1,
		top:myChess.height*1/6+3,
		height:myChess.height*1/12,
		width:myChess.width*2/25,
		text:player[0]+',  '+player[2]+' | '+player[1]
	});
	leftv.add(title);
	
	var rightv = Ti.UI.createView({
		width:myChess.width*3/20,
		height:myChess.width*1/4,
		left:myChess.width*1/10,
		top:0
	})
		var fontSize = 12;
	if (Titanium.Platform.name == 'android') {
		fontSize = 11;
	}
	var subtitle = Ti.UI.createLabel({
		color:'blue',
		font:{fontSize:fontSize,fontWeight:'normal', fontFamily:'Arial'},
		left:1,
		top:1,
		height:myChess.height*1/4,
		width:myChess.width*3/20,
		text:player[4]
	});
	rightv.add(subtitle);
	
	iv.add(leftv);
	iv.add(rightv);
	
		var row = Ti.UI.createTableViewRow();
		row.add(iv);
	return iv;
}


function createMsgForm(){	
	var size = myChess.boardSize-10;
	
	var fview = Ti.UI.createView({
		left:5,
		bottom:-800,
		width:size,
		height:size*5/6,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/fb2.png"
	});
	
	var name = Ti.UI.createTextField({
		editable: true,
		width:size-72,
		height:30,
		top:20,
		left:30,
		hintText:'  Name',
		font:{fontSize:16,fontFamily:'Marker Felt', fontWeight:'bold'},
		color:'#000',
		textAlign:'left',
		borderWidth:2,
		borderColor:'#bbb',
		borderRadius:5,
		suppressReturn:false,
		backgroundColor:'white'
	})
	fview.add(name);
	fview.name = name;
	
	var textArea = Titanium.UI.createTextArea({
		editable: true,
		value:'Thank you for your message',
		height:120,
		width:size-72,
		top:60,
		left:30,
		font:{fontSize:16,fontFamily:'Marker Felt', fontWeight:'bold'},
		color:'#999',
		textAlign:'left',
//		appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,	
//		keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
//		returnKeyType:Titanium.UI.RETURNKEY_EMERGENCY_CALL,
		borderWidth:2,
		borderColor:'#bbb',
		borderRadius:5,
		suppressReturn:false,
		backgroundColor:'white'
	});
	textArea._hintText = textArea.value;
 
	textArea.addEventListener('focus',function(e){
	    if(e.source.value == e.source._hintText){
	        e.source.value = "";
	    }
	   	this.color = '#000';
	});
	textArea.addEventListener('blur',function(e){
	    if(e.source.value==""){
	        e.source.value = e.source._hintText;
	        this.color = '#999';
	    }else{
	    	this.color = '#000';
	    }
	});
	
	
	fview.add(textArea);
	fview.msg = textArea;
	
	var submitButton = Titanium.UI.createButton({
		title: 'submit',
		right:50,
		top:190
	})
	
	submitButton.addEventListener('click', function(){
//		Ti.API.info("submit");
		transmit(name.value, textArea.value);
		name.value="";
		name.hintText='  Name';
		name.blur();
		textArea.value='Thank you for your message';
		textArea.blur();
		fview.bottom = -800;
	})
	fview.add(submitButton);
	
	var cancelButton = Titanium.UI.createButton({
		title: 'cancel',
		left:50,
		top:190
	})
	
	cancelButton.addEventListener('click', function(){
//		Ti.API.info("cancel");
		name.blur();
		textArea.blur();
		fview.bottom = -800;
	})
	fview.add(cancelButton);
	
	return fview;
	
}


function createFeedbackForm(){	
	var size = myChess.boardSize-10;
	
	var fview = Ti.UI.createView({
		left:5,
		bottom:-800,
		width:size,
		height:size*3/2,
//		backgroundColor:"blue",
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/fb1.png",
		opacity:1.0
	});
	
	var reviewButton = Titanium.UI.createButton({
//		title: 'review',
		right:38,
		top:93,
		width:245,
		height:110,
		backgroundImage:null
	})
	
	reviewButton.addEventListener('click', function(){
//myChess.Flurry.logEvent('review button:iPhone')
		fview.bottom = -800;
		Ti.Platform.openURL('itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=618359987&onlyLatestVersion=true&pageNumber=0&sortOrdering=1&type=Purple+Software');
	})
	fview.add(reviewButton);
	
	var msgButton = Titanium.UI.createButton({
//		title: 'send message',
		right:38,
		top:215,
		width:245,
		height:102,
		backgroundImage:null
	})
	
	msgButton.addEventListener('click', function(){
//myChess.Flurry.logEvent('Message button: iphone');
		fview.bottom = -800;
		myChess.form.msgForm.bottom = 200;
		
	})
	fview.add(msgButton);
	
	var cancelButton = Titanium.UI.createButton({
//		title: 'cancel',
		right:38,
		top:325,
		width:245,
		height:50,
		backgroundImage:null
	})
	
	cancelButton.addEventListener('click', function(){
//		Ti.API.info("cancel");
		fview.bottom = -800;
		
	})
	fview.add(cancelButton);
	
	return fview;
	
}



function transmit(name,msg){
	
	if(!msg || msg.trim().length==0 || msg.trim() == 'Thank you for your message'){
		return;
	}
	
    var xhr=Titanium.Network.createHTTPClient();    
    xhr.open("POST", 'http://sunnyglobetech.com/products/index.php?option=com_content&view=article&id=6');
 
    xhr.onload = function(){
	     //alert("responseText: " + this.responseText);
	     if(this.status == '200'){
//	        myChess.Flurry.logEvent('Transmission successful!');
	        //if(this.readyState == 4){
	        //  alert('Response = ' + response);
	        //}else{
	        //  alert('HTTP Ready State != 4');
	        //}           
	     }else{
	        //alert('Transmission failed. Try again later. ' + this.status + " " + this.response);
//	        myChess.Flurry.logEvent('Transmission failed. Try again later. ' + this.status + " " + this.response);
	     }              
    };
 
    xhr.onerror = function(e){    	
//    	myChess.Flurry.logEvent('Transmission error: ' + e.error);
    };
 
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    var params = {
        name : name,
        message : msg,
        product:'ChessChampion-iPhone'
    };
 
    xhr.send(params);
}
