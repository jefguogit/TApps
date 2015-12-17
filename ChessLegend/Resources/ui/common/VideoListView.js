function VideoListView(top,bottom,left,right,pw, ph, pt, pl) {
	var self = Ti.UI.createView({
		backgroundColor:'transparent',
		top:top,
		bottom:bottom,
		left:left,
		right:right
	});
	
	var toolActInd = Ti.UI.createActivityIndicator({
		height:200,
		color:'white'
	});
	
	
	var tableview;
	
	var data = [];
	
	var currentLink;
	
	var xhr = Ti.Network.createHTTPClient();
	
	doYouTubeSearch('','World Chess Champions (Sanctus) ');


	function playYouTube(vtitle, vguid){

		var ytVideoSrc = 'http://www.youtube.com/v/' + vguid;
		var thumbPlayer = '<html><head><style type="text/css"> body { background-color: red;color: white;} </style></head><body style="margin:0"><br/><br/><center><embed id="yt" src="' + ytVideoSrc + '" type="application/x-shockwave-flash" width="100%" height="75%"></embed></center></body></html>';
		
		showHTMLContent(vtitle,'http://www.youtube.com/watch?v=' + vguid,thumbPlayer);
	}	
	
	function showHTMLContent(wTitle, wUrl, wHTMLContent)
	{
		
		Ti.API.info("URL:"+wUrl);
		currentLink = wUrl;
		
//		webModal = Ti.UI.createWindow({});
		
		webModalView = Ti.UI.createWebView();
		webModalView.scalesPageToFit = true;
		
		self.add(webModalView);
		
		
//		Titanium.UI.currentTab.open(webModal,{animated:true});
		
		webModalView.html = wHTMLContent;
	
	};
	
	function doYouTubeSearch (channel, searchTerm){
	
		toolActInd.message = 'Loading videos…';
		
//		self.setToolbar([toolActInd],{animated:true});
		self.add(toolActInd);
		
		toolActInd.show();
		
//		var searchUrl = 'http://gdata.youtube.com/feeds/api/videos?alt=rss&q=' + escape(searchTerm) + "&orderby=published&max-results=25&v=2";
//		var searchUrl = 'http://gdata.youtube.com/feeds/base/users/yttujg/favorites?alt=rss&v=2';
		var searchUrl = 'http://gdata.youtube.com/feeds/api/playlists/PLkRkOjdrsN4UJIm4-zwxqIvXqdeCFuPRg?alt=rss&v=2';
					
		Ti.API.info("searchUrl:"+searchUrl);
		xhr.open("GET",searchUrl);
		xhr.send();
	}
	
	xhr.onload = function(){
		try{
			var doc;
			if (!this.responseXML){  //if not XML you have to convert it to XML
				doc = Titanium.XML.parseString(this.responseText).documentElement;
			}else{   //if it is XML, then just set the doc variable
				doc = this.responseXML.documentElement;
	//			Ti.API.info("xmlString:"+doc.toString());
			}
	
			//now we can easily get a list of items from teh results
			var items = doc.getElementsByTagName("item");
//Ti.API.info("items:"+items+"  "+items.length);			
	
			//some simple variables for tracking the loop
			var x = 0;
			var c;
			
			//now just loop through the response array to see what videos we have
	
			for (c=0;c<items.length;c++){
				//get the current item
				var item = items.item(c);
	
				//get the text for the video title tag using standard DOM XML calls
				var title = item.getElementsByTagName("title").item(0).text;
	
	
				//get the link to the youtube video
				var link = "";
	
				if (item.getElementsByTagName("link")){
					link = item.getElementsByTagName("link").item(0).text;
				}
	
				//now here is where we perform a trick
				//we find the GUID code from within the link b/c we know the link format
				var guid = link.substring(link.indexOf("?v=")+3);
				guid = guid.substring(0,guid.indexOf("&"));
				
				//now we can use that guid to load up a thumbnail image
				var thumbnail = "http://i.ytimg.com/vi/" + guid + "/2.jpg";
	
				//okay we have all the data we need for that item
				//now we need to create a row to add to the table in order to display it
				
				//create the row item and set the height to 80 pixels
				var row = Ti.UI.createTableViewRow({height:36,width:270,backgroundColor:'transparent'});
	
				//set parameters for the row so we can get the youtube data out later
				row.url = link;
				row.guid = guid;
				row.videotitle = title;
				
				//create a label for displaying the title and add it to the row
				var labelTitle = Ti.UI.createLabel({
					text:title,
					left:5,
					top:3,
					height:30,
					font:{fontSize:12},
					color:'white',
					backgroundColor:'transparent'
				});
				row.add(labelTitle);
				
				//add the row to the data array
				data[x++] = row;
				
			}
				
			//if tableview has been created, reset the data on the table
			//you can update data on the table multiple times
			if (tableview){
				tableview.setData(data);
			}else{
				//if table has not been created, build it up with the data array
				tableview = Titanium.UI.createTableView({
					data:data,
					backgroundColor:'transparent',
					crow:data[0]
				});
				
				//add a 'click' listener so that when someone taps on a row
				//the video will be played using the function we defined earlier
				tableview.addEventListener('click',function(e){

//					AAPI.vView.fireEvent('showPlayer',e);
//					AAPI.vplayer.fireEvent('playYouTube',{title:e.row.videotitle, guid:e.row.guid});
					var vtitle = e.row.videotitle;
					var vguid = e.row.guid;
				
					if(tableview.crow!=null){
						tableview.crow.backgroundColor='transparent';
					}
					e.row.backgroundColor = 'orange';
					tableview.crow = e.row;

					var webView = Ti.UI.createWebView({
						width:pw,
						height:ph,
						top:pt,
						left:pl,
  						url: 'http://www.youtube.com/embed/' + vguid + '?autoplay=1&autohide=0&cc_load_policy=0&color=white&controls=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=1'
					});
					
					if(myChess.appWin){
						myChess.appWin.vv.add(webView);
						myChess.appWin.webv = webView;
					}else if(myChess.tabGroup){
						myChess.tabGroup.vv.add(webView);
						myChess.tabGroup.webv = webView;
					}
					
				});
				
								//add the table to the current window for display
				self.add(tableview);
				tableview.fireEvent('click',{row:data[4]});
				
			}
			
		}catch(E){
			//if anything bad happens, show the error to the user and log it
			Titanium.API.debug(E);
			Titanium.UI.createAlertDialog({title:'chess', message:'No videos were found for this search.'}).show();
			
		}
			
		//hide the spinning 'loading' widget
		toolActInd.hide();
	};
	
	return self;
};

module.exports = VideoListView;
