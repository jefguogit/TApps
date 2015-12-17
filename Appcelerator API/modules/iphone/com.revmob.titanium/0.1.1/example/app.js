function RevMob(appId) {
  var moduleNames = { 'iPhone OS': 'com.revmob.titanium',  'android': 'com.revmob.ti.android' }
  var revmobModule = require(moduleNames[Ti.Platform.name]);
  revmobModule.startSession(appId);
  return revmobModule;
}

var revmob = new RevMob("4fd619388d314b0008000213");

revmob.addEventListener('adDidReceived', function(e) { Titanium.API.log('> Ad did received.'); });
revmob.addEventListener('adDidDisplayed', function(e) { Titanium.API.log('> Ad did displayed.'); });
revmob.addEventListener('userClickedInTheAd', function(e) { Titanium.API.log('> Ad clicked.'); });
revmob.addEventListener('userClosedTheAd', function(e) { Titanium.API.log('> Ad closed.'); });

Titanium.API.log('> Platform name: ' + Ti.Platform.name);

var win = Ti.UI.createWindow({
  backgroundColor: 'white',
  exitOnClose: true,
  layout: 'vertical',
  title: 'RevMob Titanium'
});

var label1 = Ti.UI.createLabel({
  color: '#900',
  font: { fontSize:40 },
  text: 'RevMob sample app (iOS)',
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  top: 30,
  width: 'auto', height: 'auto'
});
win.add(label1);

var disableTesting = Titanium.UI.createButton({
   title: 'Disable Testing',
   top: 10,
   width: 200,
   height: 70
});
disableTesting.addEventListener('click', function(e) { revmob.setTestingMode(revmob.testingMode.off); });
win.add(disableTesting);

var testingWithAds = Titanium.UI.createButton({
   title: 'Testing with Ads',
   top: 10,
   width: 200,
   height: 70
});
testingWithAds.addEventListener('click', function(e) { revmob.setTestingMode(revmob.testingMode.withAds); });
win.add(testingWithAds);

var testingWithoutAds = Titanium.UI.createButton({
   title: 'Testing without Ads',
   top: 10,
   width: 200,
   height: 70
});
testingWithoutAds.addEventListener('click', function(e) { revmob.setTestingMode(revmob.testingMode.withoutAds); });
win.add(testingWithoutAds);

var fullscreenButton = Titanium.UI.createButton({
   title: 'Show fullscreen',
   top: 10,
   width: 200,
   height: 70
});
fullscreenButton.addEventListener('click', function(e) { revmob.showFullscreen(); });
win.add(fullscreenButton);

var popupButton = Titanium.UI.createButton({
   title: 'Show popup',
   top: 10,
   width: 200,
   height: 70
});
popupButton.addEventListener('click', function(e) { revmob.showPopup(); });
win.add(popupButton);

var linkButton = Titanium.UI.createButton({
   title: 'Open Link',
   top: 10,
   width: 200,
   height: 70
});
linkButton.addEventListener('click', function(e) { revmob.openAdLink(); });
win.add(linkButton);

win.open();
