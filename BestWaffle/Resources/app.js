/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

var myApp = {};

Ti.Database.install('/data/waffles.sqlite', 'wDB');

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var moduleNames = { 'iPhone OS': 'com.revmob.titanium',  'android': 'com.revmob.ti.android' };
	var revmob = require(moduleNames[Ti.Platform.name]);
	revmob.setTestingMode(revmob.testingMode.withAds);
//	revmob.setTestingMode(revmob.testingMode.off);
	
	var appid = '50ee399e6c076d120000002b';
	revmob.startSession(appid);
	
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
	
	Titanium.API.info("revmob:"+revmob);
		
	myApp.revmob = revmob;
		

	var recipeArray=[];
	myApp.recipeData = setRecipeData();
	myApp.lastTabIndex = 0;
	
	
	
	
	
	
	var Window;
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		Window = require('ui/handheld/ApplicationWindow');
	}
	
	var root = new Window();

	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	var tabGroup = new ApplicationTabGroup(root);
	tabGroup.open({bottom:0});
	
//	root.add(tabGroup);
//	root.open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	

})();


function setRecipeData(){
	recipeArray = new Array();
//Ti.API.info("recipeArray:"+recipeArray.length);	
	var db = Titanium.Database.open('wDB');
	
//	Ti.API.info("open:"+db)
	
	var sql = "select * from recipes where cate=2 ORDER BY name ASC";
	var rows = db.execute(sql);
//	Ti.API.info("data:"+rows.getRowCount());
	while (rows.isValidRow())  
	{  
		var cellTitle = rows.fieldByName('name');
		var cellSubTitle = rows.fieldByName('subtitle');
		var cellImage = rows.fieldByName('picture');
		var ingred = rows.fieldByName('ingredient');
		var instruction = rows.fieldByName('direction');
	
	    var recipeItem = {name:cellTitle,
			ingred:ingred,
			instr:instruction,
			pic:cellImage,
			subtitle:cellSubTitle,
			favorite:true
			}
		recipeArray.push(recipeItem);	
		
		rows.next();
	}
	rows.close();
//Ti.API.info("recipeArray:"+recipeArray.length);		
	var sql = "select * from recipes where cate=1 ORDER BY name ASC";
	var rows = db.execute(sql);
	while (rows.isValidRow())  
	{  
		var cellTitle = rows.fieldByName('name');
		var cellSubTitle = rows.fieldByName('subtitle');
		var cellImage = rows.fieldByName('picture');
		var ingred = rows.fieldByName('ingredient');
		var instruction = rows.fieldByName('direction');
	
	    var recipeItem = {name:cellTitle,
			ingred:ingred,
			instr:instruction,
			pic:cellImage,
			subtitle:cellSubTitle,
			favorite:false
			}
		
		recipeArray.push(recipeItem);	
		
		rows.next();
	}
	rows.close();
	db.close();
	
	return recipeArray;
//Ti.API.info("recipeArray:"+recipeArray.length);		
	
}



