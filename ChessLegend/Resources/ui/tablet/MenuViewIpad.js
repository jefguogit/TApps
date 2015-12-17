//Master View Component Constructor
function MenuView(width, height) {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		width:width,
		height:height,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/pmbackb.png"
	});
	
	
	var introButton = Ti.UI.createButton({
		width:480,
//		height:500,
		top:10,
		bottom:110,
		left:32,
//		borderColor:'red',
		backgroundImage: null		
	});
	introButton.addEventListener('click',function(e)
	{
		e.idx = 0;
		self.fireEvent('itemSelected',e);
//		myChess.appWin.fireEvent('showIntro');
	});
	
	var styleButton = Ti.UI.createButton({
		width:480,
//		height:500,
		top:10,
		bottom:110,
		right:32,
//		borderColor:'red',
		backgroundImage: null		
	});
	styleButton.addEventListener('click',function(e)
	{
		e.idx = 1;
		self.fireEvent('itemSelected',e);
//		myChess.appWin.fireEvent('showIntro');
	});
	

	
	self.add(introButton);
	self.add(styleButton);
	
	

	var tabView = Ti.UI.createView({
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/tabbackipad.png",
		height:98,
		bottom:8
	})
	self.add(tabView);
/*
	var quote = Ti.UI.createImageView({
		bottom:2,
		left:300,
		right:280,
//		width:500,
		height:120,
		image:Ti.Filesystem.resourcesDirectory+"mydata/quote1/q1.png"
	})	
	self.add(quote);
*/
	
	var fbb = Ti.UI.createButton({
		bottom:0,
		right:0,
		width:280,
		height:110,
//		borderColor:'blue',
		backgroundImage:null
	})
	fbb.addEventListener('click',function(){
		// check for network
		if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
     		var alertDialog = Titanium.UI.createAlertDialog({
            	title: 'WARNING!',
              	message: 'Thank you for your support. But your device is not online now, please try later.',
              	buttonNames: ['OK']
            });
            alertDialog.show();
		}else{
			//Ti.Platform.openURL('http://itunes.apple.com/app/id618359987');
			myChess.ccadView.top=30;
			myChess.ccadView.movie.play();

//			myChess.Flurry.logEvent('ad button clicked - iPad - '+Titanium.Network.networkType);			
		}	
/*		myChess.ccadView.top=30;
		myChess.ccadView.movie.play();

		myChess.Flurry.logEvent('ad button clicked - iPad - '+Titanium.Network.networkType);	
*/					
	})
	self.add(fbb);


	
	var vb = Ti.UI.createButton({
//		title:'video',
		bottom:0,
		left:0,
		width:300,
		height:110,
//		borderColor:'red',
		backgroundImage:null
	})
	vb.addEventListener('click',function(){

		myChess.appWin.vv.button.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/doneButton.png";
					
		if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE){		
			VideoList = require('/ui/common/VideoListView');	
			var view =  new VideoList(100,50,600,30,560,480,100,10);
			myChess.appWin.vv.add(view);
			myChess.appWin.vcontent = view;
		}else{
			var alertLabel = Titanium.UI.createLabel({
 				text: 'WARNING! Your device is not online now, please try later.',
 				color:'white',
				top:300,
				left:680,
				right:10
        	});
    		myChess.appWin.vv.add(alertLabel);
    		myChess.appWin.vmsg = alertLabel;
		}
	
		
		myChess.appWin.fireEvent('showHead');	
//		myChess.appWin.hv.play();	
	})
	self.add(vb);
	
	var ccadView = Ti.UI.createView({
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/chesschampionadback.png",
		height:height-60,
		width:width*4/5,
		top:-1000
	})
	
	var ytVideoSrc = '/mydata/video/ccgc.m4v';
	var activeMovie = Titanium.Media.createVideoPlayer({
		url:ytVideoSrc,
		backgroundColor:'#000',
		mediaControlStyle: Titanium.Media.VIDEO_CONTROL_DEFAULT, // See TIMOB-2802, which may change this property name
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
		width:width*4/5*2/3,
		height:320,
		left:30,
		top:160,
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
		top:250,
		right:10,
		width:180,
		height:80,
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
//			myChess.Flurry.logEvent('app store clicked - iPad - '+Titanium.Network.networkType);
			Ti.Platform.openURL('http://itunes.apple.com/app/id618359987');
		}	
//myChess.Flurry.logEvent('Feedback button:iPad'+Titanium.Network.networkType);				
	})
	ccadView.add(appstore);
	
	var noB = Ti.UI.createButton({
		top:360,
		right:10,
		width:150,
		height:75,
//		borderColor:'blue',
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/noThanksButton.png"
	})
	noB.addEventListener('click',function(){
		myChess.ccadView.movie.stop(); 
		myChess.ccadView.top=-1000;				
	})
	ccadView.add(noB);
	
	
	
	var banner = Ti.UI.createImageView({
		top:20,
		height:100,
		width:500
	})
	ccadView.add(banner);
	
	var pinx = 1;
	setInterval(function(){
			pinx = pinx%5+1;
			banner.image = Ti.Filesystem.resourcesDirectory+"mydata/quote1/q"+pinx+".png";
//			Ti.API.info(fb.backgroundImage);
		},2700);
	
	self.add(ccadView);
	myChess.ccadView = ccadView;

	var favview = Ti.UI.createView({
		width:360,
		height:550,
		top:-1000,
		right:100,
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
		borderWidth:2,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/hidebutton.png"
	})
	hidebutton.addEventListener('click',function(){
		myChess.Favview.top = -1000;
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
					height:510,
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
						myChess.Favview.top = -1000;
						
						myChess.refresh = true;
						myChess.appWin.master.fireEvent('display');
						myChess.appWin.master.fireEvent('opengame', {name:"",game:myChess.chessObj.gameIndex});
						myChess.appWin.fireEvent('hideMenu');
	
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
		top:10,
		right:3,
		width:100,
		height:80,
//		borderWidth:2,
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
	var size = myChess.boardSize;
	
	var fview = Ti.UI.createView({
//		left:120,
		top:-1500,
		width:size,
		height:size*3/4,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/fb2.png"
	});
	
	var name = Ti.UI.createTextField({
		editable: true,
		width:size-130,
		height:50,
		top:38,
		left:60,
		hintText:'  Name',
		font:{fontSize:20,fontFamily:'Marker Felt', fontWeight:'bold'},
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
		height:220,
		width:size-130,
		top:100,
		left:60,
		font:{fontSize:20,fontFamily:'Marker Felt', fontWeight:'bold'},
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
		right:150,
		top:330
	})
	
	submitButton.addEventListener('click', function(){
		Ti.API.info("submit");
		transmit(name.value, textArea.value);
		name.value="";
		name.hintText='  Name';
		name.blur();
		textArea.value='Thank you for your message';
		textArea.blur();
		fview.top = -1500;
	})
	fview.add(submitButton);
	
	var cancelButton = Titanium.UI.createButton({
		title: 'cancel',
		left:150,
		top:330
	})
	
	cancelButton.addEventListener('click', function(){
		Ti.API.info("cancel");
		name.blur();
		textArea.blur();
		fview.top = -1500;
	})
	fview.add(cancelButton);
	
	return fview;
	
}


function createFeedbackForm(){	
	var size = myChess.boardSize;
	
	var fview = Ti.UI.createView({
//		left:120,
		top:-1500,
		width:size,
		height:size,
//		backgroundColor:"blue",
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/fb1.png",
		opacity:1.0
	});
	
	var reviewButton = Titanium.UI.createButton({
//		title: 'review',
		right:70,
		top:110,
		width:430,
		height:132,
		backgroundImage:null
	})
	
	reviewButton.addEventListener('click', function(){
//myChess.Flurry.logEvent('Review button: ipad');
		fview.top = -1500;
		Ti.Platform.openURL('itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=618359987&onlyLatestVersion=true&pageNumber=0&sortOrdering=1&type=Purple+Software');
	})
	fview.add(reviewButton);
	
	var msgButton = Titanium.UI.createButton({
//		title: 'send message',
		right:70,
		top:250,
		width:430,
		height:128,
		backgroundImage:null
	})
	
	msgButton.addEventListener('click', function(){
//myChess.Flurry.logEvent('Message button: ipad');
		fview.top = -1500;
		myChess.form.msgForm.top = 20;
		
	})
	fview.add(msgButton);
	
	var cancelButton = Titanium.UI.createButton({
//		title: 'cancel',
		right:70,
		top:388,
		width:430,
		height:60,
		backgroundImage:null
	})
	
	cancelButton.addEventListener('click', function(){
		Ti.API.info("cancel");
		fview.top = -1500;
		
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
        product:'ChessChampion-iPad'
    };
 
    xhr.send(params);
}


