/*
Titanium.App.addEventListener('open', function (e) {
    Ti.API.info('app.js: Open event on '+Ti.Platform.osname);
});     
Titanium.App.addEventListener('close', function (e) {
    Ti.API.info('app.js: Close event on '+Ti.Platform.osname);
});     
Titanium.App.addEventListener('pause', function (e) {
    Ti.API.info('app.js: Pause event on '+Ti.Platform.osname);
});     
Titanium.App.addEventListener('resume', function (e) {
    Ti.API.info('app.js: Resume event on '+Ti.Platform.osname);
    showAd();
});
*/

var iAdView = null;
var admobView = null;
var iAdShow = false;
var admobShow = false;

Ti.Database.install('/data/waffles.sqlite', 'wDB');

var recipeArray=[];
setRecipeData();

var restaurantArray=[];
var currentCoord;

var restaurantsReady = false;

var lastTabIndex = 0;


var wrapperWindow = Ti.UI.createWindow({width:320, height:465, top:0, left:0});



Titanium.UI.setbackgroundColor = '#4e5c4d';

// create tab group
var tabGroup = Titanium.UI.createTabGroup({id:'tabGroup'});

//
var win_recipe_l = Titanium.UI.createWindow({
	id:'win1',
	titleid:'Recipes',
	navBarHidden:true
});

showWinRecipeList();

var tab1 = Titanium.UI.createTab({
	id:'tab1',
	window:win_recipe_l
});

var win_recipe_d = Titanium.UI.createWindow({
	id:'win2',
	titleid:'Recipe',
	navBarHidden:true
});

//showWinRecipeDash();

var tab2 = Titanium.UI.createTab({
	id:'tab2',
	window:win_recipe_d
});

var win_restaurant_m = Titanium.UI.createWindow({
	id:'win3',
	titleid:'Restaurant',
	navBarHidden:true
});

var rmapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    animate:true,
    top:30,
    height:350,
    userLocation:true,
    visible: true
});
win_restaurant_m.add(rmapview);

var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'blue',
  font: {fontFamily:'Helvetica Neue', fontSize:20, fontWeight:'bold'},
  message: 'Loading...',
  style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
  top:200,
  height:'auto',
  width:'auto'
});
//activityIndicator.show();  
//win_restaurant_m.add(activityIndicator);

var tab3 = Titanium.UI.createTab({
	id:'tab3',
	window:win_restaurant_m
});

var win_restaurant_l = Titanium.UI.createWindow({
	id:'win4',
	titleid:'Restaurant',
	navBarHidden:true
});

var tableview = Titanium.UI.createTableView({
	top:30,
	height:350,
	backgroundColor:'#ffeecc'
});
win_restaurant_l.add(tableview);

var activityIndicatorl = Ti.UI.createActivityIndicator({
  color: 'blue',
  font: {fontFamily:'Helvetica Neue', fontSize:16, fontWeight:'bold'},
  message: 'Loading...',
  style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
  top:150,
  height:'auto',
  width:'auto'
});
activityIndicatorl.show();  
win_restaurant_l.add(activityIndicatorl);


var tab4 = Titanium.UI.createTab({
	id:'tab4',
	window:win_restaurant_l
});
showWinRecipeList();
//showWinRecipeDash();
//showWinRestaurantMap();

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);


var win_detail = Titanium.UI.createWindow({
	id:'win5',
	titleid:'Recipe_Detail',
	backgroundColor:'#fff0c0',
	navBarHidden:true
});
var tab5 = Titanium.UI.createTab({
	id:'tab5',
	window:win_detail
});
win_detail.add(Ti.UI.createButton());
tabGroup.addTab(tab5);



tabGroup.setActiveTab(0);
// open tab group with a transition animation
tabGroup.open({bottom:0});




//wrapperWindow.add(tabGroup);

var titleView = Ti.UI.createImageView({
	id:'titleView',
	image:'images/background/mainTitleView.png',
	width:320,
	height:30,
	left:0,
	top:1
})

wrapperWindow.add(titleView);

var main_title = Titanium.UI.createLabel({id:'titleText',text:'Recipes',font:{fontSize:22},color:'#ffccc99',height:'auto',left:150,top:2});
wrapperWindow.add(main_title);


var tabView = Ti.UI.createImageView({
	id:'tabView',
	image:'images/background/tabView1.png',
	width:320,
	height:40,
	left:0,
	bottom:50
})
wrapperWindow.add(tabView);

function showWindow(index){
	if(index==0){
//		Ti.API.info('recipe List');
	    tabView.image = 'images/background/tabView1.png';
	    main_title.text="Recipes";
	    lastTabIndex = 0;
		tabGroup.setActiveTab(0);
	}
	if(index==1){
		var tabTitle = tabGroup.activeTab.id;
		if(tabTitle == 'tab1' || tabTitle =='tab5'){
//		    Ti.API.info('recipe Dashboard');
		    tabView.image = 'images/background/tabView2.png';    
		    main_title.text="Recipes";
		    lastTabIndex = 1;
		    tabGroup.setActiveTab(1);
		    showWinRecipeDash();
		}    	
	}
	if(index==2){
		var tabTitle = tabGroup.activeTab.id;
		if(tabTitle == 'tab4'){
//			Ti.API.info('restaurant Map');
		    tabView.image = 'images/background/tabView3.png';  
		    main_title.text="Restaurants";  
		    lastTabIndex = 2;
		    tabGroup.setActiveTab(2);
		    updateMapWindow();
		}    
//	    getCurrentLocation();
	}
	if(index==3){
//		Ti.API.info('restaurant List');
	    tabView.image = 'images/background/tabView4.png';  
	    main_title.text="Restaurants";  
	    lastTabIndex = 3;
	    tabGroup.setActiveTab(3);
	    getCurrentLocation();
	}
}

var b1 = Titanium.UI.createButton({
	id:'b1',
    backgroundImage:null,
    width:50,
    height:38,
    bottom:51,
    left:18
});
b1.addEventListener('click', function()
{
	showWindow(0);

});

var b2 = Titanium.UI.createButton({
	id:'b2',
    backgroundImage:null,
    width:50,
    height:38,
    bottom:51,
    left:106
    });

b2.addEventListener('click', function()
{
	showWindow(1);
});

var b3 = Titanium.UI.createButton({
	id:'b3',
    backgroundImage:null,
    width:50,
    height:38,
    bottom:51,
    left:160
    });

b3.addEventListener('click', function()
{
	if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
		alert("No etwork connectivity now. The restaurants locations may not be available. ");		
	}	
    showWindow(2);
});

var b4 = Titanium.UI.createButton({
	id:'b4',
	backgroundImage:null,
    width:50,
    height:38,
    bottom:51,
    left:270
    });

b4.addEventListener('click', function()
{
	if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
		alert("No etwork connectivity now. The restaurants locations may not be available. ");		
	}	
	showWindow(3);
});

close = Titanium.UI.createButton({
	id:'close',
    backgroundImage:null,
    width:270,
    height:36,
    top:1,
    left:10
});
close.addEventListener('click', function()
{
//	Ti.API.info('last tab:'+lastTabIndex);
	showWindow(lastTabIndex);
	titleView.image = 'images/background/mainTitleView.png';
	main_title.top=2;
	main_title.left=150;
	main_title.font={fontSize:22};
    tabView.animate({bottom:50});
});


wrapperWindow.add(b1);
wrapperWindow.add(b2);
wrapperWindow.add(b3);
wrapperWindow.add(b4);
wrapperWindow.add(close);

var tb1 = Titanium.UI.createTabbedBar({
	labels:['LIST', 'MAP'],
	backgroundColor:'#666633',
	opacity:50,
	left:220,
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	height:30,
	width:80,
	index:0
});

tb1.addEventListener('click', function(e)
{
	if (e.index == 0)
	{
		showWindow(3);
	}else if (e.index == 1)
	{
		showWindow(2);
	}

});

/*
wrapperWindow.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});
*/

function RevMob(appId) {
//  var moduleNames = { 'iPhone OS': 'com.revmob.titanium',  'android': 'com.revmob.ti.android' }
//  var revmobModule = require(moduleNames[Ti.Platform.name]);
  var revmobModule = require('com.revmob.titanium'); 
  revmobModule.startSession(appId);
  return revmobModule;
}
/*
var revmob = new RevMob("50b6e13e271ff51000000014");

revmob.addEventListener('adDidReceived', function(e) { Titanium.API.log('> Ad did received.'); });
revmob.addEventListener('adDidDisplayed', function(e) { Titanium.API.log('> Ad did displayed.'); });
revmob.addEventListener('userClickedInTheAd', function(e) { Titanium.API.log('> Ad clicked.'); });
revmob.addEventListener('userClosedTheAd', function(e) { Titanium.API.log('> Ad closed.'); });

Titanium.API.log('> Platform name: ' + Ti.Platform.name);

//revmob.setTestingMode(revmob.testingMode.withAds);

*/

/*
function admobMovein(){
	Ti.API.info('admob move in');
	admobView.bottom = 0;
}

function admobMoveout(){
	Ti.API.info('admob move out');
	admobView.bottom=-100;
	if(admobView != null){
		wrapperWindow.remove(admobView);
		admobView = null;
	}
	
}
*/
function iAdMovein(){
	Ti.API.info('iAd move in');
	iAdView.bottom = 0;
}

function iAdMoveout(){
	Ti.API.info('iAd move out');
	iAdView.bottom = -100;
}
	
function addiAd(){
Ti.API.info('require iAd');	
	iAdView = Ti.UI.iOS.createAdView({
	    width: 'auto',
	    height: 'auto',
	    bottom: -100,
	    borderColor: '#000000',
	    backgroundColor: '#000000'});
	 
 //   t1 = Titanium.UI.createAnimation({bottom:0, duration:50});
  //  t2 = Titanium.UI.createAnimation({bottom:-100, duration:50});
 
    iAdView.addEventListener('load', function(e){
		Ti.API.info('receive iAd ');	 
/*		if(admobShow){
			admobMoveout();
		}   	
    	iAdShow = true;
    	admobShow = false;
*/    	
    	iAdMovein();
    	
/* 	    Ti.API.info('receive iAd! '+e.source+' '+iAdShow+' '+admobShow);  
 	    if(iAdView){
 	    	Ti.API.info('iAdView = '+iAdView.bottom);
 	    } 	
 	    if(admobView){
 	    	Ti.API.info('admobView = '+admobView.bottom);
 	    } 	
*/ 	    
    });
    
    iAdView.addEventListener('error', function(e){
		Ti.API.info('error iAd '+e.message);	
/*		if(iAdShow){
			iAdMoveout();
		}
		if(admobView == null)	{ 
			addAdmob();	
		}	
		iAdShow = false;   
		admobShow = true; 
*/		
		iAdMoveout();
		
/*		Ti.API.info('receive iAd error! '+iAdShow+' '+admobShow);  
 	    if(iAdView){
 	    	Ti.API.info('iAdView = '+iAdView.bottom);
 	    } 	
 	    if(admobView){
 	    	Ti.API.info('admobView = '+admobView.bottom);
 	    } 	
 */
   });    
 
    wrapperWindow.add(iAdView);	
}

showAd();

function addAdmob(){
	var Admob = require('ti.admob');
/*	if(admobView != null){
		wrapperWindow.remove(admobView);
		admobView = null;
	}
*/	
	admobView = Admob.createView({
	    bottom: 0, left: 0,
	    width: 320, height: 50,
	    publisherId: 'a14f05f02c309fe', // You can get your own at http: //www.admob.com/
	    adBackgroundColor: 'transparent',
	    test:false
	});
	

	wrapperWindow.add(admobView);
//revmob.openAdLink();
}

function showAd(){
//	revmob.showPopup();
//	addAdmob();
	addiAd();
}


function showWinRecipeList(){
	
	cleanWindow(win_recipe_l);
	
	var recipes = [];
	
	for(i=0; i<recipeArray.length;i++){
		var item = recipeArray[i];
//Ti.API.info(item.name+"  "+item.ingred+"  "+item.instr+"  "+item.pic+"  "+item.favorite);		
		
		var row = Titanium.UI.createTableViewRow({
			height:70,
			backgroundImage:'images/cell.png',
			name:item.name,
			ingred:item.ingred,
			instr:item.instr,
			pic:item.pic,
			favorite:item.favorite
		});
		
		if(item.favorite){
			var favorite = Titanium.UI.createImageView({
				image:'images/ficon.png',
				width:25,
				height:25,
				left:4,
				top:8
			});
			
			var pic =  Titanium.UI.createImageView({
				image:'images/'+item.pic,
				width:70,
				height:41,
				left:15,
				top:3
			});
		 
			var title = Titanium.UI.createLabel({
				text:item.name,
				font:{fontSize:16,fontWeight:'bold'},
				width:'auto',
				textAlign:'left',
				top:12,
				left:80,
				height:20
			});
		 
			var subtitle =  Titanium.UI.createLabel({
				text:item.subtitle,
				font:{fontSize:13},
				width:'auto',
				textAlign:'left',
				bottom:12,
				left:10,
				height:15
			});
			
			row.add(pic);
			row.add(favorite);
			row.add(title);
			row.add(subtitle);
			

	 	}else{
			
			var pic =  Titanium.UI.createImageView({
				image:'images/'+item.pic,
				width:70,
				height:41,
				left:15,
				top:3
			});
		 
			var title = Titanium.UI.createLabel({
				text:item.name,
				font:{fontSize:16,fontWeight:'bold'},
				width:'auto',
				textAlign:'left',
				top:12,
				left:80,
				height:20
			});
		 
			var subtitle =  Titanium.UI.createLabel({
				text:item.subtitle,
				font:{fontSize:13},
				width:'auto',
				textAlign:'left',
				bottom:12,
				left:10,
				height:15
			});
			
			row.add(pic);
			row.add(title);
			row.add(subtitle);
	 	}
	 

	    recipes.push(row);
  
	}


	//create the table with the data that was defined
	var tabla1 = Titanium.UI.createTableView({data:recipes,top:30,height:350});
	
	tabla1.addEventListener('click',function(table){
		var user = table.rowData.user;
		getDetail(table.rowData.name, table.rowData.ingred, table.rowData.instr, table.rowData.pic,table.rowData.favorite);
	});
	
	
	win_recipe_l.add(tabla1);


}

function showWinRecipeDash(){
	cleanWindow(win_recipe_d);

	var recipes = [];
	
	for(i=0; i<recipeArray.length;i++){
		var item = recipeArray[i];
		
		if(item.favorite == true){
			var ditem = Titanium.UI.createDashboardItem({
				width:40,
				image:'images/'+item.pic,
				label:item.name,
				badge:i+1,
				name:item.name,
				ingred:item.ingred,
				instr:item.instr,
				pic:item.pic,
				favorite:item.favorite
			});
//Ti.API.info(item.name+"  "+item.pic+"  "+item.favorite);	
		    recipes.push(ditem);
		}else{
			var ditem = Titanium.UI.createDashboardItem({
				height:60,
				image:'images/'+item.pic,
				label:item.name,
				name:item.name,
				ingred:item.ingred,
				instr:item.instr,
				pic:item.pic,
				favorite:item.favorite
			});
	
		    recipes.push(ditem);
		} 
	}
		

	var dashboard = Titanium.UI.createDashboardView({
		data:recipes,
		top:30,
		height:380,
		editable:false,
		borderWidth:0
	});
	
	dashboard.addEventListener('click',function(e){
		getDetail(e.item.name, e.item.ingred, e.item.instr, e.item.pic,e.item.favorite);
	});
	
	win_recipe_d.add(dashboard);



}

function showWinRestaurantMap(){

	var rmapview = Titanium.Map.createView({
	    mapType: Titanium.Map.STANDARD_TYPE,
	    animate:true,
	    top:30,
	    height:350,
	    userLocation:true,
	    visible: true
	});

	if(currentCoord){
		var region={
            latitude: currentCoord.latitude,
            longitude: currentCoord.longitude,
            animate:true,
            latitudeDelta:0.025,
            longitudeDelta:0.025
        };
        rmapview.setLocation(region);
	}

	if(restaurantsReady){
		for (var c=0;c<restaurantArray.length;c++){
			rmapview.addAnnotation(restaurantArray[c]);
		}	
	}	

	cleanWindow(win_restaurant_m);
	
	win_restaurant_m.add(rmapview);
	
}

function showWinRestaurantList(){
	
	var data = [];
	for (var c=0;c<restaurantArray.length;c++){

		var title = restaurantArray[c].title;
    	var addr = restaurantArray[c].subtitle;
		var lat = restaurantArray[c].latitude;
		var lng = restaurantArray[c].longitude;
		
//		Titanium.API.info("["+c+"]"+title+"  "+addr+"   "+lat+"|"+lng);
		
		var title = Titanium.UI.createLabel({
			text:title,
			font:{fontSize:16,fontWeight:'bold'},
			width:'auto',
			textAlign:'left',
			top:2,
			left:10,
			height:20
		});
 
		var subtitle =  Titanium.UI.createLabel({
			text:addr,
			font:{fontSize:13},
			width:'auto',
			textAlign:'left',
			bottom:2,
			left:10,
			height:15
		});
 
 
		var row = Titanium.UI.createTableViewRow({
			height:38

		});
		row.add(title);
		row.add(subtitle);
				
	
		data.push(row);
	}
	
	// create table view
	var tableview = Titanium.UI.createTableView({
		data:data,
		top:30,
		height:350,
		backgroundColor:'#ffeecc'
	});

	// add table view to the window
	cleanWindow(win_restaurant_l);
	win_restaurant_l.add(tableview);

}	


function getDetail(name,ingred,instr,pic,fav){
	
cleanWindow(win_detail);

	// create table view data object
	var recipeData = [];
	
	var image = Titanium.UI.createImageView({image:'images/'+pic, width:150, top:0, left:20}); 

	var row = Titanium.UI.createTableViewRow({height:120, backgroundColor:'#006a55'});
	
	
	var switchView = Ti.UI.createView({height:120, width:120,right:5,backgroundColor:'transparent',layout:'verticle'});
	var basicSwitchLabel = Titanium.UI.createLabel({
		text:'My favorite?' ,
		color:'#ffaa00',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:16		},
		top:0
	});
	var basicSwitch = Titanium.UI.createSwitch({
		value:fav,
		bottom:20
	});
	basicSwitch.addEventListener('change',function(e)
	{
//		Titanium.API.info('favorite:' + basicSwitch.value);
		if(basicSwitch.value != fav){
			setFavorite(name, basicSwitch.value);
		}	
	});
	
	switchView.add(basicSwitchLabel);
	switchView.add(basicSwitch);
	
	row.add(image);
	row.add(switchView);
	
	recipeData.push(row);
	
	


//	Titanium.API.log('info',ingred);
	var ingredient = ingred.split(";");
//	Titanium.API.log('info',ingredient.length)
//	recipeData.push({height:30,title:ingredient[0],header:'Ingredient:'});
	var row = Titanium.UI.createTableViewRow({height:'auto',header:'Ingredient:'});
	var title = Titanium.UI.createLabel({text:ingredient[0],font:{fontSize:15},height:'auto',left:8});
	row.add(title);
	recipeData.push(row);
	
	for(i = 1; i < ingredient.length; i++){
		var row = Titanium.UI.createTableViewRow({height:'auto'});
		var title = Titanium.UI.createLabel({text:ingredient[i],font:{fontSize:15},height:'auto',left:8});
		row.add(title);
		recipeData.push(row);
	}

//	Titanium.API.log('info',instr);
	var instruction = instr.split("|");
//	Titanium.API.log('info',instruction.length)


		

	var title = Titanium.UI.createLabel({text:instruction[0],font:{fontSize:15},height:'auto',left:8, top:2,bottom:2});
	var lheight = (title.text.length/40+2)*title.font.fontSize;
//	Titanium.API.log("info", "label height :::"+lheight);
	var row = Titanium.UI.createTableViewRow({height:lheight,header:'Instruction:'});
	row.add(title);
	recipeData.push(row);
	
	for(i = 1; i < instruction.length; i++){
		var title = Titanium.UI.createLabel({text:instruction[i],font:{fontSize:15},height:'auto',left:8});
		var lheight = (title.text.length/40+2)*title.font.fontSize;
		var row = Titanium.UI.createTableViewRow({height:lheight});
		row.add(title);
		recipeData.push(row);
	}	
	

	// create table view
	var tableViewOptions = {
			data:recipeData,
			style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
			backgroundColor:'transparent',
			minRowHeight:25,
			rowBackgroundColor:'white',
			top:37,
			height:360
		};
	
	
	var tableview = Titanium.UI.createTableView(tableViewOptions);
	
	
	// add table view to the window
	win_detail.add(tableview);

	tabGroup.setActiveTab(4);
	
	titleView.image = 'images/background/detailTitleView.png';
	main_title.top=5;
	main_title.left = 50;
	main_title.font={fontSize:20};
	main_title.text = name;

			

	
	tabView.animate({bottom:-50});
//	win_detail.add(addAdmob());
}

function setFavorite(name, cate){
	var category = 1;
	if(cate){
		category = 2;
	}
	var db = Titanium.Database.open('wDB');
	db.execute("update recipes set cate='"+category+"' where name='"+name+"'");
	db.close();
	
	setRecipeData();
	showWinRecipeList();
	showWinRecipeDash();

}

function cleanWindow(winObj)
{
//	Ti.API.info('Clean Window: ' + winObj);
    if (winObj.children) {
 //       Ti.API.info('Has children! Len: ' + winObj.children.length);
        for (var i = winObj.children.length; i > 0; i--){
 //           Ti.API.info( (i-1) + ") " + winObj.children[i-1]);
            winObj.remove(winObj.children[i-1]);
 //           Ti.API.info("removed");
        }
    }
}


/*
function getObjectById(id_value){
	Ti.API.info("Object childen:"+wrapperWindow.children+" "+id_value);

	for (var c in wrapperWindow.children) {
		Ti.API.info("get child object:"+c+"  "+wrapperWindow.children[c]);
    	wrapperWindow.children[c].id == id_value;
    	return wrapperWindow.children[c];
	}
	Ti.API.info("get object error:"+id_value);
	return null;

}
*/

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
//Ti.API.info("recipeArray:"+recipeArray.length);		
	
}

function getLocation(latitude, longitude){

		var url = "http://sunnyglobetech.com/bestwaffles/srv/wafflesrvaddr.php?la="+latitude+"&lo="+longitude;
		Ti.API.info(url);

		var xhr = Ti.Network.createHTTPClient();
		xhr.timeout = 10000;
	
		xhr.onload = function()
		{
//Ti.API.info(this.responseText);	
		
				var resp = eval('('+this.responseText+')');
	
				var locations = resp.stations;
//				Titanium.API.info("JSON:"+locations.length);

				restaurantArray = [];
				for (var c=0;c<locations.length;c++){
	
					//var title = (locations[c].title).replace('&amp;','and');
					var title = locations[c].title;
					if(title==null) title='Restaurant';
	            	var addr = locations[c].addr;
					var lat = locations[c].latitude;
					var lng = locations[c].longitude;
					
//					Titanium.API.info("["+c+"]"+title+"  "+addr+"   "+lat+"|"+lng);
					
					var rest = Titanium.Map.createAnnotation({
						title:title,
						subtitle:addr,
						latitude:lat,
						longitude:lng,
						pincolor:Titanium.Map.ANNOTATION_BLUE,
						animate:true,
						myid:c // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
					});
			
					restaurantArray.push(rest);
//					Ti.API.info(rest);
				}
				restaurantsReady = true;

				//updateMapWindow();
				updateListWindow();

				
		};

		xhr.open("GET",url);
		
		
		xhr.send();
	
}	

function unescapeHTML(str) {
    //return str.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&#39;/g,'\'');
    return str.replace('&amp;','&');
}

function updateMapWindow(){
//	win_restaurant_m.remove(activityIndicator);

	var tabs = tabGroup.getTabs();

	var mapView = tabs[2].getWindow().children[0];

	if(Ti.App.currentLocation){
		var region={
            latitude: Ti.App.currentLocation.latitude,
            longitude: Ti.App.currentLocation.longitude,
            animate:true,
            latitudeDelta:0.1,
            longitudeDelta:0.1
        };
    	mapView.setRegion(region);
  	
    	setAnnotation(mapView,0);

	}

	//	win_restaurant_m.add(tb1);

}

function setAnnotation(mv, i){
	Ti.API.info("update map:"+restaurantArray.length);
	var item = restaurantArray[i];
	Ti.API.info(i+" : "+item.title+"  "+item.subtitle);	
	
	xhr = Titanium.Network.createHTTPClient();
	var url = 'http://maps.googleapis.com/maps/geo?output=json&q=' + Ti.Network.encodeURIComponent(item.subtitle);
	xhr.open('GET', url);

	xhr.onload = function() {
	    var data = (JSON.parse(this.responseText).Placemark);
	    if(data != undefined && data != null && JSON.parse(this.responseText).Status.code == 200) {

	    	var lat = data[0].Point.coordinates[1];
	    	var lng = data[0].Point.coordinates[0];
	    	var rest = Titanium.Map.createAnnotation({
				latitude:lat,
				longitude:lng,
				title:item.title,
			    subtitle:item.subtitle,
			    pincolor:Titanium.Map.ANNOTATION_RED,
			    animate:true,
			    leftButton: 'images/Esso.png',
			    myid:i // Custom property to uniquely identify this annotation.
			});
				
			mv.addAnnotation(rest);
 
         } else {
             Ti.API.info('Unable to locate address. Please try again.');
        }
        
        
        if(i<restaurantArray.length-1){
        	i++;
        	setAnnotation(mv, i);
        }

	};
	xhr.send();	
}


function updateListWindow(){
//	win_restaurant_l.remove(activityIndicatorl);
	var tabs = tabGroup.getTabs();

//	var listWin = tabs[3].getWindow();
//	Ti.API.info("LISTVIEW:"+listView);
//Ti.API.info(Ti.App.currentLocation);
Ti.API.info("length="+restaurantArray.length); 	
	if(restaurantArray.length>0){
		var data = [];
		for (var c=0;c<restaurantArray.length;c++){

			var title = restaurantArray[c].title;
	    	var addr = restaurantArray[c].subtitle;
			var lat = restaurantArray[c].latitude;
			var lng = restaurantArray[c].longitude;
			
//			Titanium.API.info("["+c+"]"+title+"  "+addr+"   "+lat+"|"+lng);
			
			var title = Titanium.UI.createLabel({
				text:title,
				font:{fontSize:16,fontWeight:'bold'},
				width:'auto',
				textAlign:'left',
				top:2,
				left:10,
				height:20
			});
	 
			var subtitle =  Titanium.UI.createLabel({
				text:addr,
				font:{fontSize:13},
				width:'auto',
				textAlign:'left',
				bottom:2,
				left:10,
				height:15
			});
	 
	 
			var row = Titanium.UI.createTableViewRow({
				height:38
	
			});
			row.add(title);
			row.add(subtitle);
					
		
			data.push(row);

		}
//		Ti.API.info("length="+data.length); 	
		// create table view
		var tableview = Titanium.UI.createTableView({
			data:data,
			top:30,
			height:350,
			backgroundColor:'#ffeecc'
		});
		cleanWindow(win_restaurant_l);
		win_restaurant_l.add(tableview);
		
//		tabView.add(tb1);
	}

}
	
function getCurrentLocation() {
	
    Ti.Geolocation.preferredProvider = "gps";
    Titanium.Geolocation.purpose = "Recieve User Location";
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS;
	// Set Distance filter. This dictates how often an event fires based on the distance the device moves. This value is in meters.
	Titanium.Geolocation.distanceFilter = 2000;
 
    Titanium.Geolocation.getCurrentPosition(function(e) {});

    var locationCallback = function(e) {
        if (!e.success || e.error) {
                       // do whatever error processing you need here
            return;
        }
 
        // turn off the event listener.  It will be turned back on at the next time I call
        Titanium.Geolocation.removeEventListener('location', locationCallback);
 
        var longitude = e.coords.longitude;
        var latitude = e.coords.latitude;
        var altitude = e.coords.altitude;
        var heading = e.coords.heading;
        var accuracy = e.coords.accuracy;
        var speed = e.coords.speed;
        var timestamp = e.coords.timestamp;
        var altitudeAccuracy = e.coords.altitudeAccuracy;
 
 		Ti.App.currentLocation = {latitude:latitude, longitude:longitude};
//        Ti.API.info(Ti.App.currentLocation);  // call whatever function to do something with your location or any of the other variables returned from the event firing    
 
        
        if(Ti.App.pdata != null){
        	Ti.App.pdata = pDataSorting(Ti.App.pdata);
        	
        }
		getLocation(latitude, longitude);


    }
 
    Titanium.Geolocation.addEventListener('location', locationCallback);
}
	



