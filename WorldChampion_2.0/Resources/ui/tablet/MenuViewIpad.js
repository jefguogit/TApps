//Master View Component Constructor
function MenuView(width, height) {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		width:width,
		height:height
	});
	
	var coverLayer = Ti.UI.createView({
		left:0,
		top:0,
		width:width,
		height:height,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/chessback.png",
		item:null
		
	});
	

	var micw = Math.floor(myChess.width*1/6)-6;
	var mich = micw;
//	var mich = Math.floor(myChess.height*1/4);
	var leftMargin = micw/5;
	var topMargin = 60;
	var micspacew = 1;
	var micspaceh = 25;

    var playerNum = myChess.Players.length;
Ti.API.info("play number:"+playerNum);    
    var mics = new Array(playerNum);
	for(i=0; i<5; i++){
		var player = myChess.Players[i];
		
		var row=0;
		var col=i%5;
		var mic = Ti.UI.createButton({
			width:micw,
			height:mich,
			left:leftMargin+col*micw+col*micw/5,
			top:topMargin+row*mich+row*micspaceh,
			index:i,
			backgroundImage:Ti.Filesystem.resourcesDirectory+"mydata/icon/icon"+player[6]+".png"
		})		
        mics[i] = mic;
     } 
 
	for(i=5; i<11; i++){
		var player = myChess.Players[i];		
		var row=1;
		var col=i-5;
		var mic = Ti.UI.createButton({
			width:micw,
			height:mich,
			left:1+col*micw+col*1,
			top:topMargin+row*mich+row*micspaceh,
			index:i,
			backgroundImage:Ti.Filesystem.resourcesDirectory+"mydata/icon/icon"+player[6]+".png"
		})		
        mics[i] = mic;
     } 
	for(i=11; i<16; i++){
		var player = myChess.Players[i];
		
		var row=2;
		var col=i-11;
		var mic = Ti.UI.createButton({
			width:micw,
			height:mich,
			left:leftMargin+col*micw+col*micw/5,
			top:topMargin+row*mich+row*micspaceh,
			index:i,
			backgroundImage:Ti.Filesystem.resourcesDirectory+"mydata/icon/icon"+player[6]+".png"
		})		
        mics[i] = mic;
     }             
     self.mics = mics;
     
     for(i=0; i<playerNum; i++){
        var items = self.mics[i];	
		items.addEventListener('click', function(e) {
//Ti.API.info('event:'+e.source.index);

			var	randomnumber=Math.floor(Math.random()*26)+1;
			quote.image=Ti.Filesystem.resourcesDirectory+"mydata/quote1/q"+randomnumber+".png";


			myChess.PlayerIndex = e.source.index;
			

			var item = self.mics[myChess.PlayerIndex];

			l = item.left;
			t = item.top;
			if(self.cover){
				self.cover.left=0;
				self.cover.top=0;
				self.cover.add(item);
			}
			
			item.animate({
				left:width*3/8,
				top:height*3/8,
				duration:2500
			}, function(){

				self.fireEvent('itemSelected',e);
//Ti.API.info(item.left+":"+item.top);
				
//				self.add(item);
				item.left = l;
				item.top = t;
				
				self.left = -1500;
				self.top = -900;
				coverLayer.remove(item);
//				self.remove(coverLayer);
//i.API.info(item.left+":"+item.top);
				
			});
         }); 
         self.add(items);
	}			
	
	coverLayer.left=-1500;
	coverLayer.top=-900;
	self.add(coverLayer);
	self.cover = coverLayer;
	
/*	var quote = Ti.UI.createLabel({
		top:36,
		right:200,
		text:'Life is like a game of chess, changing with each move.',
		color:'#6666ff',
		font:{fontSize:20,fontFamily:'Zapfino', fontWeight:'bold'}
	})
*/

	var tabView = Ti.UI.createView({
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/tabbackipad.png",
		height:98,
		bottom:8
	})
	self.add(tabView);

	var quote = Ti.UI.createImageView({
		bottom:22,
		right:230,
		width:500,
		height:80,
		image:Ti.Filesystem.resourcesDirectory+"mydata/quote1/q1.png"
	})	
	self.add(quote);
	
	var fbb = Ti.UI.createButton({
		bottom:0,
		right:0,
		width:300,
		height:110,
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
			myChess.form.feedbackForm.top = 100;	
			myChess.form.msgForm.top = -1500;
		}	
//myChess.Flurry.logEvent('Feedback button:iPad'+Titanium.Network.networkType);			
myChess.form.feedbackForm.top = 100;	
			myChess.form.msgForm.top = -1500;	
	})
	self.add(fbb);
	
	var fb = Ti.UI.createButton({
		bottom:20,
		right:12,
		width:80,
		height:80,
		backgroundImage:Ti.Filesystem.resourcesDirectory+"images/together1.png"
	})
	fb.addEventListener('click',function(){
		// check for network
		if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
     		var alertDialog = Titanium.UI.createAlertDialog({
            	title: 'WARNING!',
              	message: 'Thank you for your support. But your device is not online now, please try later.',
              	buttonNames: ['OK']
            });
            alertDialog.show();
		}else{
			myChess.form.feedbackForm.top=15;	
			myChess.form.msgForm.top = -1500;
		}	
//myChess.Flurry.logEvent('Feedback button:iPad'+Titanium.Network.networkType);	
		
	})
	self.add(fb);
	
	var pinx = 1;
	setInterval(function(){
			pinx = pinx%5+1;
			fb.backgroundImage = Ti.Filesystem.resourcesDirectory+"images/together"+pinx+".png";
//			Ti.API.info(fb.backgroundImage);
		},1080);
	
	var msgform = createMsgForm();
	self.add(msgform);
	myChess.form.msgForm = msgform;
	
	var feedbackform = createFeedbackForm();
	self.add(feedbackform);
	myChess.form.feedbackForm = feedbackform;
	
	var vb = Ti.UI.createButton({
//		title:'video',
		bottom:0,
		left:0,
		width:300,
		height:110,
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
//		Ti.API.info("submit");
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
//		Ti.API.info("cancel");
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
//		Ti.API.info("cancel");
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


