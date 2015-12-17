//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	
	
	var self = Ti.UI.createView({
		layout: 'vertical'
	});
	
	function RevMob(appIds) {
		var moduleNames = { 'iPhone OS': 'com.revmob.titanium',  'android': 'com.revmob.ti.android' };
  		var revmobModule = require(moduleNames[Ti.Platform.name]);
  		
  		revmobModule.startSession(appIds[Ti.Platform.name]);
  		
 // 		revmobModule.printEnvironmentInformation();

  		return revmobModule;
	}
		
	var revmob = new RevMob({ 'iPhone OS': '50b6e13e271ff51000000014',  'android': '4f56aa6e3dc441000e005a20' });
	
	revmob.addEventListener('adDidReceived', function(e) {
	  Titanium.API.log('> Ad did received.');
	});
	
	revmob.addEventListener('adDidFail', function(e) {
  	  Titanium.API.log('> Ad did Fail.');
	});
	
	revmob.addEventListener('adDidDisplayed', function(e) {
	  Titanium.API.log('> Ad did displayed.');
	});
	
	revmob.addEventListener('userClickedInTheAd', function(e) {
	  Titanium.API.log('> click!');
	});
	
	revmob.addEventListener('userClosedTheAd', function(e) {
	  Titanium.API.log('> close!');
	});
	
	var label1 = Ti.UI.createLabel({
  		color: '#900',
		font: { fontSize:40 },
		text: 'RevMob sample',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		top: 30,
		width: 'auto', height: 'auto'
	});
	self.add(label1);
	
	var testingModeOffButton = Titanium.UI.createButton({
		title : 'Testing mode off',
		top : 10,
		width : 200,
		height : 70
	});
	testingModeOffButton.addEventListener('click', function(e) {
		revmob.setTestingMode(revmob.testingMode.off);
		Titanium.API.log('testing mode off');	
	});
	self.add(testingModeOffButton);
	
	var testingModeWithAdsButton = Titanium.UI.createButton({
		title : 'Test with ads',
		top : 10,
		width : 200,
		height : 70
	});
	testingModeWithAdsButton.addEventListener('click', function(e) {
		revmob.setTestingMode(revmob.testingMode.withAds);
		Titanium.API.log('testing mode with ads');	
	});
	self.add(testingModeWithAdsButton);
	
	var testingModeWithoutAdsButton = Titanium.UI.createButton({
		title : 'Test without ads',
		top : 10,
		width : 200,
		height : 70
	});
	testingModeWithoutAdsButton.addEventListener('click', function(e) {
		revmob.setTestingMode(revmob.testingMode.withoutAds);
		Titanium.API.log('testing mode without ads');	
	});
	self.add(testingModeWithoutAdsButton);
	
	var fullscreenButton = Titanium.UI.createButton({
		title : 'Show fullscreen',
		top : 10,
		width : 200,
		height : 70
	});
	fullscreenButton.addEventListener('click', function(e) {
		revmob.showFullscreen();
	});
	self.add(fullscreenButton);

	var popupButton = Titanium.UI.createButton({
		title : 'Show popup',
		top : 10,
		width : 200,
		height : 70
	});
	popupButton.addEventListener('click', function(e) {
		revmob.showPopup();
	});
	self.add(popupButton);

	var linkButton = Titanium.UI.createButton({
		title : 'Open Link',
		top : 10,
		width : 200,
		height : 70
	});
	linkButton.addEventListener('click', function(e) {
		revmob.openAdLink();
	}); 
	self.add(linkButton);

	return self;
}

module.exports = FirstView;
