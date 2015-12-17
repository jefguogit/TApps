function TopMenuView(pwindow) {
	
	var mw = myTest.width*1/4;
	var mh = myTest.height*4/5;
	var mt = myTest.height*1/10;
	var ml = myTest.width*3/80;
	
	var bw = mw*32/100;
	var bh = mh/6;
	
	
	var self = Ti.UI.createView({
		height:mh,
		width:mw,
		top:mt,
		left:ml
	});
	
	var homeB = Ti.UI.createLabel({
//		text:'Home',
		height:bh*3/4,
		top:bh/6,
		left:3,
		width:bw
	});
	homeB.addEventListener('click', function(){		
		self.videoPlayer.pause();
		
		myTest.mainWin.fireEvent('hide');
		myTest.homeWin.fireEvent('show');
		
		//pwindow.top=pwindow.top1;
	
	});
	
	var c1 = Ti.UI.createLabel({
//		text:'Opening',
		height:bh,
		width:bw,
		top:bh+bh*11/27,
		left:0
	})
	c1.addEventListener('click', function(){	
		self.videoPlayer.opacity = 1;
		self.videoPlayer.play();
		myTest.mainWin.fireEvent('gotoClassroom',{idx:1});
		
		checkAd();
	});
	
	var c2 = Ti.UI.createLabel({
//		text:'End',
		height:bh,
		width:bw,
		top:bh+bh*11/27,
		left:bw
	})
	c2.addEventListener('click', function(){
		self.videoPlayer.opacity = 1;
		self.videoPlayer.play();
		myTest.mainWin.fireEvent('gotoClassroom',{idx:2});
		checkAd();
	});
	
	var c3 = Ti.UI.createLabel({
//		text:'Tactic',
		height:bh,
		width:bw,
		top:bh+bh*11/27,
		left:2*bw
	})
	c3.addEventListener('click', function(){
		self.videoPlayer.opacity = 1;
		self.videoPlayer.play();	
		myTest.mainWin.fireEvent('gotoClassroom',{idx:3});
		checkAd();
	});
	
	var c4 = Ti.UI.createLabel({
//		text:'Mistake',
		height:bh,
		width:bw,
		top:2*bh+bh*11/27,
		left:0
	})
	c4.addEventListener('click', function(){	
		self.videoPlayer.opacity = 1;	
		self.videoPlayer.pause();
		myTest.mainWin.fireEvent('gotoClassroom',{idx:4});		
		checkAd();
	});
	
	var c5 = Ti.UI.createLabel({
//		text:'Puzzle',
		height:bh,
		width:bw,
		top:2*bh+bh*11/27,
		left:bw
	})
	c5.addEventListener('click', function(){
		self.videoPlayer.opacity = 1;
		self.videoPlayer.pause();
		myTest.mainWin.fireEvent('gotoClassroom',{idx:5});	
		checkAd();
	});
	
	var c6 = Ti.UI.createLabel({
//		text:'Games',
		height:bh,
		width:bw,
		top:2*bh+bh*11/27,
		left:2*bw
	})
	c6.addEventListener('click', function(){
		self.videoPlayer.opacity = 1;
		self.videoPlayer.pause();
		myTest.mainWin.fireEvent('gotoClassroom',{idx:6});
		checkAd();
	});
	
	var purchase = Ti.UI.createLabel({
//		text:'Remove all Ads',
		height:bh*3/4,
		width:bh*3/2,
		top:bh/6,
		right:20,
		backgroundImage:'images/purchase.png'
	});

	purchase.addEventListener('click', function(){
		Ti.API.info("Purchase ...");
		var purchaseView = Ti.UI.createView({
			width:bw*5/2,
			height:bh*3,
			right:20,
			top:bh/6,
			backgroundColor:'white'
		});	
		var label = Ti.UI.createLabel({
			top:5,
			width:bw*2,
			font:{fontSize:25},
			textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
		});
		
		purchaseView.add(label);
		purchaseView.label = label;	
				
		var loading = Ti.UI.createActivityIndicator({
			bottom:150, height:50, width:50,
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
					alert('Thank you!');
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
						if(purchaseView.pb){
							purchaseView.pb.visible = false;
						}	
						if(purchaseView.rb){
							purchaseView.rb.visible = false;
						}	
						purchaseView.loading.show();
						Storekit.purchase(product);
						
						
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
				});
				purchaseView.add(rbutton);
				purchaseView.rb = rbutton;	
			}	
		});	
		var cbutton = Ti.UI.createButton({
			title:'CANCEL',
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
		width:bw*3-bw/8,
		height:bh*2,
		top:bh*4-bh/15,
		left:bw/12
	});
	
	var moviescreen = Titanium.UI.createImageView({
		image:'images/screenshot.png',
		width:bh*2,
		height:bh*5/4,
		left:bw/6,
		bottom:10,
	});
	adView.add(moviescreen);
	
	var ytVideoSrc = '/data/ccgc.m4v';
	var activeMovie = Titanium.Media.createVideoPlayer({
		url:ytVideoSrc,
		backgroundColor:'#000',
		mediaControlStyle: Titanium.Media.VIDEO_CONTROL_EMBEDDED, // See TIMOB-2802, which may change this property name
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
		width:bh*2,
		height:bh*5/4,
		left:bw/6,
		bottom:10,
		autoplay:true,
		repeatMode:true
	});
	
	activeMovie.addEventListener('playbackstate', function(e){
		Ti.API.info("playbackstate changed:"+e.playbackState+'   '+e.source);
		
		if(e.playbackState == 0){
			e.source.opacity = 0;
		}
	})
			
	adView.add(activeMovie);
	
	adView.addEventListener('click', function(){
		Ti.Platform.openURL('itms-apps://itunes.com/apps/worldchesschampiongamecollection');
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
