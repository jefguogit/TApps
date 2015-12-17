function TopMenuView() {
	
	var mw = myTest.width*19/20;
	var mh = myTest.height*3/5;
	var mt = myTest.height*37/100;
	var ml = myTest.width*1/40;
	
	var bw = mw/3;
	var bh = mh*9/40;
	
	
	var self = Ti.UI.createView({
//		borderColor:'blue',
		height:mh,
		width:mw,
		top:mt,
		left:ml
	});
	
	var homeB = Ti.UI.createLabel({
//		text:'Home',
		height:bh*3/4,
		top:0,
		left:20,
		width:bw*3/2,
//		borderColor:'green'
	});
	homeB.addEventListener('click', function(){		
		self.videoPlayer.pause();
		myTest.mainWin.visible = false;
		myTest.homeWin.fireEvent('show');

		myTest.mainWin.top=myTest.mainWin.top1;
	
	});
	
	var c1 = Ti.UI.createLabel({
//		text:'Opening',
		height:bh,
		width:bw,
		top:bh,
		left:0,
//		borderColor:'blue'
	})
	c1.addEventListener('click', function(){
		if(myTest.mainWin.top == 0){
			myTest.mainWin.animate({
				top:-myTest.height,
				duration:1000
			},function(){
				myTest.mainWin.top=-myTest.height;
				myTest.mainWin.fireEvent('gotoClassroom',{idx:1});
			});			
		}else{
			myTest.mainWin.top=-myTest.height;
			myTest.mainWin.fireEvent('gotoClassroom',{idx:1});
		}		
		self.videoPlayer.pause();
		checkAd();
	});
	
	var c2 = Ti.UI.createLabel({
//		text:'End',
		height:bh,
		width:bw,
		top:bh,
		left:bw
//		borderColor:'blue'
	})
	c2.addEventListener('click', function(){
		if(myTest.mainWin.top == 0){
			myTest.mainWin.animate({
				top:-myTest.height,
				duration:1000
			},function(){
				myTest.mainWin.top=-myTest.height;
				myTest.mainWin.fireEvent('gotoClassroom',{idx:2});
			});			
		}else{
			myTest.mainWin.top=-myTest.height;
			myTest.mainWin.fireEvent('gotoClassroom',{idx:2});
		}		
		self.videoPlayer.pause();
		checkAd();
	});
	
	var c3 = Ti.UI.createLabel({
//		text:'Tactic',
		height:bh,
		width:bw,
		top:bh,
		left:2*bw
//		borderColor:'blue'
	})
	c3.addEventListener('click', function(){
		if(myTest.mainWin.top == 0){
			myTest.mainWin.animate({
				top:-myTest.height,
				duration:1000
			},function(){
				myTest.mainWin.top=-myTest.height;
				myTest.mainWin.fireEvent('gotoClassroom',{idx:3});
			});			
		}else{
			myTest.mainWin.top=-myTest.height;
			myTest.mainWin.fireEvent('gotoClassroom',{idx:3});
		}		
		self.videoPlayer.pause();	
		checkAd();
	});
	
	var c4 = Ti.UI.createLabel({
//		text:'Mistake',
		height:bh,
		width:bw,
		top:2*bh,
		left:0
//		borderColor:'blue'
	})
	c4.addEventListener('click', function(){
		if(myTest.mainWin.top == 0){
			myTest.mainWin.animate({
				top:-myTest.height,
				duration:1000
			},function(){
				myTest.mainWin.top=-myTest.height;
				myTest.mainWin.fireEvent('gotoClassroom',{idx:4});
			});			
		}else{
			myTest.mainWin.top=-myTest.height;
			myTest.mainWin.fireEvent('gotoClassroom',{idx:4});
		}		
		self.videoPlayer.pause();
		checkAd();
	});
	
	var c5 = Ti.UI.createLabel({
//		text:'Puzzle',
		height:bh,
		width:bw,
		top:2*bh,
		left:bw
//		borderColor:'blue'
	})
	c5.addEventListener('click', function(){
		if(myTest.mainWin.top == 0){
			myTest.mainWin.animate({
				top:-myTest.height,
				duration:1000
			},function(){
				myTest.mainWin.top=-myTest.height;
				myTest.mainWin.fireEvent('gotoClassroom',{idx:5});
			});			
		}else{
			myTest.mainWin.top=-myTest.height;
			myTest.mainWin.fireEvent('gotoClassroom',{idx:5});
		}		
		self.videoPlayer.pause();
		checkAd();
	});
	
	var c6 = Ti.UI.createLabel({
//		text:'Games',
		height:bh,
		width:bw,
		top:2*bh,
		left:2*bw
//		borderColor:'blue'
	})
	c6.addEventListener('click', function(){
		if(myTest.mainWin.top == 0){
			myTest.mainWin.animate({
				top:-myTest.height,
				duration:1000
			},function(){
				myTest.mainWin.top=-myTest.height;
				myTest.mainWin.fireEvent('gotoClassroom',{idx:6});
			});			
		}else{
			myTest.mainWin.top=-myTest.height;
			myTest.mainWin.fireEvent('gotoClassroom',{idx:6});
		}		
		self.videoPlayer.pause();
		checkAd();
	});
	
	var purchase = Ti.UI.createLabel({
//		text:'Remove all Ads',
		height:bh*3/4,
		width:bw*5/4,
		right:36,
		top:0,
		backgroundImage:'images/purchase.png',
//		borderColor:'black'
	});
		
	purchase.addEventListener('click', function(){
		Ti.API.info("Purchase ...");
		
		var purchaseView = Ti.UI.createView({
						width:myTest.width*2/3,
						height:myTest.height*5/12,
						left:myTest.width/6,
						top:0,
						backgroundColor:'white'
				});	
		var label = Ti.UI.createLabel({
			top:5,
			width:myTest.width*2/3-10,
			font:{fontSize:20},
			textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
		});
		
		purchaseView.add(label);
		purchaseView.label = label;	
				
		var loading = Ti.UI.createActivityIndicator({
			bottom:100, height:50, width:50,
			style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK
		});		
		purchaseView.add(loading);
		purchaseView.loading = loading;
		
		var Storekit = require('ti.storekit');
		
		Storekit.addEventListener('transactionState', function (evt) {
Ti.API.info('transactionState');			
			
			switch (evt.state) {
				case Storekit.FAILED:
					if (evt.cancelled) {
						alert('Purchase cancelled');
					} else {
						alert('ERROR: Buying failed! ' + evt.message);
					}
					purchaseView.loading.hide();
					purchaseView.cb.fireEvent('click');	
					break;
				case Storekit.PURCHASED:
					alert('Thanks you!');
					Ti.App.Properties.setBool('Purchased-NoAd', true);
					myTest.showAd=false;
					if(myTest.mainWin.adv){
						myTest.mainWin.remove(myTest.mainWin.adv);
					}
					purchaseView.loading.hide();
					if(self.pbutton){
						self.remove(self.pbutton);
					}
					purchaseView.cb.fireEvent('click');	
					myTest.mainWin.listview.height =  myTest.height*19/40+20;
					break;
				case Storekit.PURCHASING:
					Ti.API.info("Purchasing " + evt.productIdentifier);
					break;
				case Storekit.RESTORED:
					// The complete list of restored products is sent with the `restoredCompletedTransactions` event
					Ti.API.info("Restored " + evt.productIdentifier);
					Ti.App.Properties.setBool('Purchased-NoAd', true);
					myTest.showAd=false;
					if(myTest.mainWin.adv){
						myTest.mainWin.remove(myTest.mainWin.adv);
					}
					purchaseView.loading.hide();
					if(self.pbutton){
						self.remove(self.pbutton);
					}
					purchaseView.cb.fireEvent('click');	
					myTest.mainWin.listview.height =  myTest.height*19/40+20;
				    break;
			}
		});
		
		Storekit.addEventListener('restoredCompletedTransactions', function (evt) {
			purchaseView.loading.hide();
			if (evt.error) {
				alert(evt.error);
			}
			else if (evt.transactions == null || evt.transactions.length == 0) {
				alert('There were no purchases to restore!');
			}
			else {
				for (var i = 0; i < evt.transactions.length; i++) {
					Ti.API.info('Marking as purchased: ' + evt.transactions[i].productIdentifier);
					Ti.App.Properties.setBool('Purchased-NoAd', true);
					myTest.showAd=false;
					if(myTest.mainWin.adv){
						myTest.mainWin.remove(myTest.mainWin.adv);
					}
					purchaseView.loading.hide();
					if(self.pbutton){
						self.remove(self.pbutton);
					}
					purchaseView.cb.fireEvent('click');	
						
					
				}
			}
		});
			
		Storekit.requestProducts(['SGT.chess.school.NoAd'], function (evt) {
			purchaseView.loading.hide();
			Ti.API.info("event:"+JSON.stringify(evt));
	
			if (!evt.success) {
				purchaseView.label.text = 'ERROR: We failed to talk to Apple!';
			}
			else if (evt.invalid) {
				purchaseView.label.text = 'ERROR: We requested an invalid product!';
			}
			else {
				var product = evt.products[0];
				if(product){
					purchaseView.label.text = product.title;
					
					var pbutton = Ti.UI.createButton({
						title:'Purchase - ' + product.formattedPrice,
						bottom:120
					});
					pbutton.addEventListener('click', function () {
						//purchaseProduct(product);
					//	alert('purchased');
						if(purchaseView.pb){
							purchaseView.pb.visible = false;
						}	
						if(purchaseView.rb){
							purchaseView.rb.visible = false;
						}	
						purchaseView.loading.show();
						Storekit.purchase(product);	
//						purchaseView.loading.hide();
//						purchaseView.cb.fireEvent('click');					
					});
					purchaseView.add(pbutton);	
					purchaseView.pb = pbutton;
				}
				
				var rbutton = Ti.UI.createButton({
						title:'Restore Purchase',
						bottom:70
				});
				rbutton.addEventListener('click', function () {
						if(purchaseView.pb){
							purchaseView.pb.visible = false;
						}	
						if(purchaseView.rb){
							purchaseView.rb.visible = false;
						}	
						
						purchaseView.loading.show();
						Storekit.restoreCompletedTransactions();
//						purchaseView.loading.hide();
//						purchaseView.cb.fireEvent('click');
				});
				purchaseView.add(rbutton);					
				purchaseView.rb = rbutton;	
			}	
		});	
		var cbutton = Ti.UI.createButton({
			title:'Cancel',
			bottom:20,
		})
		cbutton.addEventListener('click',function(){
			if(self.purchase){
				self.remove(self.purchase);
			}	
		})
		purchaseView.add(cbutton);
		purchaseView.cb = cbutton;
		
		if(myTest.showAd){
			self.add(purchaseView);
			self.purchase = purchaseView;
		}	
				
		purchaseView.loading.show();
	});
	
	self.add(homeB);
	self.add(c1);
	self.add(c2);
	self.add(c3);
	self.add(c4);
	self.add(c5);
	self.add(c6);
	if(myTest.showAd){
		self.add(purchase);
		self.pbutton = purchase;
	}	
	
	
	
	var adView = Ti.UI.createView({
		backgroundColor:'transparent',
		width:bw*5/2,
		height:bh*7/4,
		top:27*bh/8,
		left:bw/4
	})
	
	var ytVideoSrc = '/data/ccgc.m4v';
	var activeMovie = Titanium.Media.createVideoPlayer({
		url:ytVideoSrc,
		backgroundColor:'#000',
		mediaControlStyle: Titanium.Media.VIDEO_CONTROL_EMBEDDED, // See TIMOB-2802, which may change this property name
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
		width:bw*5/4,
		height:bh*8/7,
		left:0,
		top:3,
		autoplay:false,
		repeatMode:true
	});
			
	adView.add(activeMovie);
	
	adView.addEventListener('click', function(){
//		Ti.Platform.openURL('itms-apps://itunes.com/apps/worldchesschampiongamecollection');
		Ti.Platform.openURL('http://itunes.apple.com/app/id618359987');
//		Ti.Platform.openURL('http://itunes.apple.com/apps/worldchesschampiongamecollection');
	})
	
	
	
//	showAd(adView);
	
	self.add(adView);
	
	self.videoPlayer = activeMovie;
	
	
	return self;
};

module.exports = TopMenuView;

function checkAd(){
	if(myTest.showAd){
		if(myTest.count>7){
			if(myTest.revmob){
				myTest.revmob.showFullscreen();
			}
			myTest.count = 0;	
		}else{
			myTest.count++;
		}
	}
}	
	

