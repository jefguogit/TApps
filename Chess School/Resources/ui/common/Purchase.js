function Purchase() {
	
	var Storekit = require('ti.storekit');

	Storekit.receiptVerificationSandbox = (Ti.App.deployType !== 'production');
	Storekit.receiptVerificationSharedSecret = "1413e3d025f84308abaf61fdbb9ad15c";

	var verifyingReceipts = false;

	var loading = Ti.UI.createActivityIndicator({
		bottom:10, height:50, width:50,
		backgroundColor:'black', borderRadius:10,
		style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG
	});
	var loadingCount = 0;
	
	var self = Ti.UI.createView({
		backgroundColor:'blue',
		height:myTest.height/2,
		width:myTest.width/2
	});
	self.add(loading);
	
	var desc = Ti.UI.createLabel({
		text:'Remove all Ads.',
		top:10,
		left:10
	})
	self.add(desc);
	
	
	myTest.product = null;
	
	showLoading();
	Storekit.requestProducts(['SGTchessschoolNoAd '], function (evt) {
		hideLoading();
		if (!evt.success) {
			alert('ERROR: We failed to talk to Apple!');
		}
		else if (evt.invalid) {
			alert('ERROR: We requested an invalid product!');
		}
		else {
			var product = evt.products[0];
			if(product){
				var pbutton = Ti.UI.createButton({
					title:'Buy ' + product.title + ', ' + product.formattedPrice,
					top:100,
					right:10
				});
				pbutton.addEventListener('click', function () {
					purchaseProduct(product);
				});
				self.add(pbutton);			
			}	
		}
	});
		

	function showLoading()
	{
		loadingCount += 1;
		if (loadingCount == 1) {
			loading.show();
		}
	}
	function hideLoading()
	{
		if (loadingCount > 0) {
			loadingCount -= 1;
			if (loadingCount == 0) {
				loading.hide();
			}
		}
	}
	
	function purchaseProduct(product)
	{
		showLoading();
		Storekit.purchase(product);
	}
	
	
	Storekit.addEventListener('transactionState', function (evt) {
		hideLoading();
		switch (evt.state) {
			case Storekit.FAILED:
				if (evt.cancelled) {
					alert('Purchase cancelled');
				} else {
					alert('ERROR: Buying failed! ' + evt.message);
				}
				break;
			case Storekit.PURCHASED:
				if (verifyingReceipts) {
					Storekit.verifyReceipt(evt, function (e) {
						if (e.success) {
							if (e.valid) {
								alert('Thanks! Receipt Verified');
								markProductAsPurchased(evt.productIdentifier);
							} else {
								alert('Sorry. Receipt is invalid');
							}
						} else {
							alert(e.message);
						}
					});
				} else {
					alert('Thanks!');
					markProductAsPurchased(evt.productIdentifier);
				}
				break;
			case Storekit.PURCHASING:
				Ti.API.info("Purchasing " + evt.productIdentifier);
				break;
			case Storekit.RESTORED:
				// The complete list of restored products is sent with the `restoredCompletedTransactions` event
				Ti.API.info("Restored " + evt.productIdentifier);
			    break;
		}
	});

	
	return self;
};

module.exports = Purchase;
