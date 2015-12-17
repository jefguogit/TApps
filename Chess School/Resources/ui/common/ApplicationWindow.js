function ApplicationWindow(MenuWindow, Window) {
	var self = Ti.UI.createWindow({
		backgroundImage:'images/chesscastle0.png',
		navBarHidden:true
	});
	

	
	var main = new Window();
	var home = new MenuWindow();
	
	self.add(home);
	self.add(main);

	
	myTest.homeWin = home;
	myTest.mainWin = main;
	
	myTest.mainWin.visible = false;
	
	home.fireEvent('show');
	main.fireEvent('hide');
	
	main.addEventListener('gotoClassroom',function(e){
		if(myTest.network){
			loadVideoList(e.idx);
			myTest.moreButton.visible = false;
			
			myTest.mainWin.fireEvent('show',{obj:e.obj});
				
		}	
	})
	
	
	var moreButton = Ti.UI.createButton({
		right:8,
		top:6,
//		title:"More Games",
		width:myTest.width/3,
		height:myTest.height/8,
		backgroundImage:'images/moreButton.png',
		visible:false
	})
	if(Ti.Platform.osname == 'ipad'){
		moreButton.width = 210;
		moreButton.height = 90;
		moreButton.right = 160;
		moreButton.top = 80;
	}
	moreButton.addEventListener('click', function(){
			myTest.revmob.openAdLink();
	})
	self.add(moreButton);
	
	myTest.moreButton = moreButton;
	
		
	return self;
};

module.exports = ApplicationWindow;


function loadVideoList(idx){
	
	var title = "class room";
	var url = "";
	
	switch(idx){
		case 1:
		  title = "Opening";
		  url = 'http://gdata.youtube.com/feeds/api/playlists/PLkRkOjdrsN4WTCFoeHA4O13pTmj2gASbh?v=2&alt=json&prettyprint=true&max-results=50';
		  break;
		case 2:
		  title = "End Game";
		  url = 'http://gdata.youtube.com/feeds/api/playlists/PLkRkOjdrsN4UlzbcmzidyyLlE8KAPcG4c?v=2&alt=json&prettyprint=true&max-results=50';
		  break;
		case 3:
		  title = "Tactic & Strategy";
		  url = 'http://gdata.youtube.com/feeds/api/playlists/PLkRkOjdrsN4XqRcv7xFZuR_vyCpHi6Mk_?v=2&alt=json&prettyprint=true&max-results=50';
		  break;
		case 4:
		  title = "Mistake / Blunder";
		  url = 'http://gdata.youtube.com/feeds/api/playlists/PLkRkOjdrsN4USsHfybWzspy3MZ3emPEIZ?v=2&alt=json&prettyprint=true&max-results=50';
		  break;
		case 5:
		  title = "Chess Puzzle";
		  url = 'http://gdata.youtube.com/feeds/api/playlists/PLkRkOjdrsN4VgyZQ2C0dWMR1WGM3kc0bW?v=2&alt=json&prettyprint=true&max-results=50';
		  break;
		case 6:
		  title = "Famous Games";
		  url = 'http://gdata.youtube.com/feeds/api/playlists/PLkRkOjdrsN4WiJw-Hf5nBi0h9TXD4ywLm?v=2&alt=json&prettyprint=true&max-results=50';
		  break;    
	}
	
//	title = "TACTIC & STRATEGY";
//	url = "http://localhost/playlist1.json";
	
	myTest.label.text = title;
		
	if(url.length>10){
		myTest.mainWin.listview.url = url;
		myTest.mainWin.listview.fireEvent('search');
	}	
	
}
