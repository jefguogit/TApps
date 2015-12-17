//Master View Component Constructor
function MenuView(width, height) {
	//create object instance, parasitic subclass of Observable
	var width = myChess.width;
	var height = myChess.height;
	
	var self = Ti.UI.createView({
		width:myChess.width,
		height:myChess.height-10,
		top:0,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/pmback.png"
	});
	
	var playerNum = myChess.Players.length;

	var introButton = Ti.UI.createButton({
		width:145,
		height:height/3,
		top:60,
		left:10,
//		borderColor:'red',
		backgroundImage: null
	});
	introButton.addEventListener('click',function(e)
	{
		e.idx = 0;
		myChess.tabGroup.fireEvent('showIntro',e);
	});
	
	var styleButton = Ti.UI.createButton({
		width:145,
		height:height/3,
		top:60,
		right:10,
//		borderColor:'green',
		backgroundImage: null
	});
	styleButton.addEventListener('click',function(e)
	{
		e.idx = 1;
		myChess.tabGroup.fireEvent('showIntro',e);
	});
	
	var listButton = Ti.UI.createButton({
		width:270,
		height:height/4,
		bottom:height/5,
		left:20,
//		borderColor:'blue',
		backgroundImage: null
	});
	listButton.addEventListener('click',function(e)
	{
		myChess.tabGroup.fireEvent('showMaster');
	});
	
	
	self.add(introButton);
	self.add(styleButton);
	self.add(listButton);



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
		width:148,
		height:68,
//		borderColor:'red',
		backgroundImage:null
	})
	vb.addEventListener('click',function(){
Ti.API.info('video button click');		
//myChess.Flurry.logEvent('video button:iPhone'); 
	myChess.tabGroup.vv.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/videoback.png";	
/*
		myChess.tabGroup.hv.top=-500;
		myChess.tabGroup.hv.left=20;
		myChess.tabGroup.hv.width=180;
		myChess.tabGroup.hv.height=120;
		myChess.tabGroup.hv.borderColor='#333333',
//		myChess.tabGroup.hv.play();	

		myChess.tabGroup.button.top=30;
*/			
		myChess.tabGroup.fireEvent('showHead');	

		
		if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE){		
			VideoList = require('/ui/common/VideoListView');	
			var view =  new VideoList(180,20,10,10,270,120,50,25);
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
		left:148,
		width:182,
		height:68,
//		borderColor:'red',
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
//			Ti.Platform.openURL('http://itunes.apple.com/app/id618359987');
			myChess.ccadView.top=height/6;
			myChess.ccadView.movie.play();
//			myChess.Flurry.logEvent('ad button clicked - iPhone - '+Titanium.Network.networkType);
		}	
	})
	self.add(fbb);	
	
	
	var ccadView = Ti.UI.createView({
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/chesschampionadback.png",
		height:width,
		width:width,
		top:-1000
	})
	
	var ytVideoSrc = '/mydata/video/ccgc.m4v';
	var activeMovie = Titanium.Media.createVideoPlayer({
		url:ytVideoSrc,
		backgroundColor:'#000',
		mediaControlStyle: Titanium.Media.VIDEO_CONTROL_DEFAULT, // See TIMOB-2802, which may change this property name
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
		width:width*2/3,
		height:width*2/5,
		left:10,
		top:90,
		autoplay:false,
		repeatMode:true
	});
	
	activeMovie.addEventListener('playbackstate', function(e){
		Ti.API.info("playbackstate changed:"+e.playbackState+'   '+e.source);
		
		if(e.playbackState == 0){
			e.source.opacity = 0;
		}
	})
			
	ccadView.add(activeMovie);
	ccadView.movie = activeMovie;
	
	var appstore = Ti.UI.createButton({
		top:110,
		right:3,
		width:90,
		height:40,
//		borderColor:'blue',
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/getButton.png"
	})
	appstore.addEventListener('click',function(){
		// check for network
		if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
     		var alertDialog = Titanium.UI.createAlertDialog({
            	title: 'WARNING!',
              	message: 'Thank you for your support. But your device is not online now, please try later.',
              	buttonNames: ['OK']
            });
            alertDialog.show();
		}else{
			
//			myChess.Flurry.logEvent('ad button clicked - iPhone - '+Titanium.Network.networkType);	
			Ti.Platform.openURL('http://itunes.apple.com/app/id618359987');
		}	
//myChess.Flurry.logEvent('Feedback button:iPad'+Titanium.Network.networkType);				
	})
	ccadView.add(appstore);
	
	var noB = Ti.UI.createButton({
		top:170,
		right:3,
		width:70,
		height:35,
//		borderColor:'blue',
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/noThanksButton.png"
	})
	noB.addEventListener('click',function(){
		myChess.ccadView.movie.stop();
		myChess.ccadView.top=-1000;				
	})
	ccadView.add(noB);
	
	
	
	var banner = Ti.UI.createImageView({
		top:2,
		height:72,
		width:width
	})
	ccadView.add(banner);
	
	var pinx = 1;
	setInterval(function(){
			pinx = pinx%20+1;
			banner.image = Ti.Filesystem.resourcesDirectory+"mydata/quote1/q"+pinx+".png";
//			Ti.API.info(fb.backgroundImage);
		},2700);
	
	self.add(ccadView);
	myChess.ccadView = ccadView;

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
		Ti.API.info("hide button click "+myChess.Favview);
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
//					var playercode = code.substring(0,2);
//					var gamecode = code.substring(2,6);
					myChess.PlayerIndex = 0;
					myChess.chessObj.gameIndex = parseInt(code,10)-1;
					
					if(myChess.Games[myChess.PlayerIndex].games[myChess.chessObj.gameIndex]){
						myChess.Favview.top = -500;
						
						myChess.refresh = true;
						myChess.tabGroup.fireEvent('showGame');
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
	
	var favbutton = Ti.UI.createButton({
//		title:'fav',
		top:2,
		right:0,
		width:50,
		height:50,
//		borderWidth:2
		backgroundImage:null
	})
	
	favbutton.addEventListener('click',function(){
		favview.top = 5;
		favview.refresh();
	})
	
	self.add(favbutton);
	
	self.add(favview);
	myChess.Favview = favview;

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
		Ti.API.info("submit");
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
		Ti.API.info("cancel");
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
		Ti.API.info("cancel");
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
