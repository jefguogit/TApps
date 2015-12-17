function VideoListView(searchUrl) {
	var self = Ti.UI.createView({
		backgroundColor:'transparent',
		url:searchUrl,
		tableview:null,
		bottom:8,
		width:600
	});
	
	var tagv = getTagView();
	
	self.add(tagv);
	
	var tableview = Titanium.UI.createTableView({
		data:[],
		rowHeight:26,
		left:100,
		backgroundColor:'transparent'
	});
	
	tableview.addEventListener('click',function(e){
		self.cr = showVideo(e.row,self.cr);
		checkAd();
	});		
				
	self.add(tableview);
	self.tableview = tableview;
	
//	var toolActInd = Titanium.UI.createActivityIndicator();
/*	var toolActInd = Ti.UI.createActivityIndicator({
		  color: 'green',
		  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
		  message: 'Loading...',
		  style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		  top:10,
		  left:10,
		  height:Ti.UI.SIZE,
		  width:Ti.UI.SIZE
	});
*/	
	var Indicator = require('/ui/common/IndicatorWindow');
	var toolActInd = new Indicator({text:'Loading video list…', top:myTest.height/2});


	
	var currentLink;
	
	var xhr = Ti.Network.createHTTPClient();
	
//	var searchUrl = 'http://gdata.youtube.com/feeds/api/playlists/PLkRkOjdrsN4WTCFoeHA4O13pTmj2gASbh?alt=rss&v=2'; 
	
	self.addEventListener('search',function(){
		doYouTubeSearch(self.url);
	});
	

	function playYouTube(vtitle, vguid){

		var ytVideoSrc = 'http://www.youtube.com/v/' + vguid;
		var thumbPlayer = '<html><head><style type="text/css"> body { background-color: black;color: white;} </style></head><body style="margin:0"><br/><br/><center><embed id="yt" src="' + ytVideoSrc + '" type="application/x-shockwave-flash" width="100%" height="100%"></embed></center></body></html>';
		
		showHTMLContent(vtitle,'http://www.youtube.com/watch?v=' + vguid,thumbPlayer);
	}	
	
	function showHTMLContent(wTitle, wUrl, wHTMLContent)
	{
		
		Ti.API.info("URL:"+wUrl);
		currentLink = wUrl;
		
//		webModal = Ti.UI.createWindow({});
		
		webModalView = Ti.UI.createWebView({backgroundColor:'transparent'});
		webModalView.scalesPageToFit = true;
		
		self.add(webModalView);
		
		
//		Titanium.UI.currentTab.open(webModal,{animated:true});
		
		webModalView.html = wHTMLContent;
	
	};
	
	function doYouTubeSearch (searchUrl){
	
//		toolActInd.message = 'Loading videos…';
		
//		self.setToolbar([toolActInd],{animated:true});
//		self.add(toolActInd);
		
		toolActInd.openIndicator();
						
		Ti.API.info("searchUrl:"+searchUrl);
		xhr.open("GET",searchUrl);
		xhr.send();
	}
	
	xhr.onload = function(){
		try{
			var data=JSON.parse(this.responseText);
			var entries = data.feed.entry || [];
			var videoLength = entries.length;
			
			Ti.API.info("length:"+videoLength);
			
			var data = [];
			
			if(videoLength>40){
				videoLength = 40;
			}
			for (c=0;c<videoLength;c++){
				var entry = entries[c];
				
				try{
					var title = entry.title.$t;
				}catch(E){
					Ti.API.info("error title");
					var title = "";
				}	
				
				try{
					var desc = entry.media$group.media$description.$t;
				}catch(E){
					Ti.API.info("error desc");
					var desc = "";
				}	
					
				try{
					var thumbnail = entry.media$group.media$thumbnail[0].url;
				}catch(E){
					Ti.API.info("error thumbnail");
					var thumbnail = "";
				}
				
				try{
					var uploader = entry.media$group.media$credit[0].$t;
				}catch(E){
					Ti.API.info("error uploader");
					var uploader = "";
				}
				
				try{
					var duration = entry.media$group.yt$duration.seconds;
				}catch(E){
					Ti.API.info("error duration");
					var duration = 0;
				}
				
				try{
					var uploaded = entry.media$group.yt$uploaded.$t;
				}catch(E){
					Ti.API.info("error uploaded");
					var uploaded = "";
				}												
								
				try{
					var guid = entry.media$group.yt$videoid.$t;
				}catch(E){
					Ti.API.info("error guid");
					var guid = "";
				}
				
				try{
					var gdrating = entry.gd$rating?entry.gd$rating.average:0;
				}catch(E){
					Ti.API.info("error gdrating");
					var gdrating = 0;
				}
				
				try{
					var viewCount = entry.yt$statistics?entry.yt$statistics.viewCount:0;
				}catch(E){
					Ti.API.info("error viewCount");
					var viewCount = 0;
				}
				
				try{
					var numLikes = entry.yt$rating?entry.yt$rating.numLikes:0;
				}catch(E){
					Ti.API.info("error numLikes");
					var numLikes = 0;
				}												
				
				try{
					var numDislikes = entry.yt$rating?entry.yt$rating.numDislikes:0;
				}catch(E){
					Ti.API.info("error numDislikes");
					var numDislikes = 0;
				}					
				
				var lknum = numLikes*1+numDislikes*1;
				var lkrating = 0;
				
				if(lknum>0){
					lkrating += Math.round(numLikes*100/lknum);
				}
				
Ti.API.info("gdrating:"+gdrating);	
				gdrating = gdrating*2;		
				if(gdrating>0){
					var snum = Math.round(gdrating*1);
					gdrating = 'star'+snum;
				}else{
					gdrating = 'star0';
				}			
Ti.API.info("gdrating:"+gdrating);	
				
//				var comments = entry.gd$comments.gd$feedLink.href;
				
				if(uploaded){
					uploaded = uploaded.substring(0,10);
				}
				var upload = uploader+"   "+uploaded;
				var status = viewCount+"   "+gdrating+"     "+numDislikes;
				
				
Ti.API.info("Video("+c+"):"+title+"  "+uploader+"  "+duration+"  "+uploaded+"  "+guid+"  "+gdrating+"  "+viewCount+"  "+numLikes+"  "+numDislikes+"  "+lknum);
			
			
				//create the row item and set the height to 80 pixels
				var row = Ti.UI.createTableViewRow({
					height:26,
					title:title,
					top:2,
					left:10,
					font:{fontSize:15},
					guid:guid,
					videotitle:title,
					thumbnail:thumbnail,
					summary:desc,
					uploader:uploader,
					uploaded:uploaded,
					duration:duration,
					viewCount:viewCount,
					gdrating:gdrating,
					likerating:lkrating 
				});
	
			
				//add the row to the data array
				data[c] = row;
			}				
			
			data.sort(function(a,b){
			    var x = a.title.toLowerCase(), y = b.title.toLowerCase();
			    //var x = a.likerating, y = b.likerating;
			    //return y-x;
			    return x < y ? -1 : x > y ? 1 : 0;		    
			});
			
			myTest.tabledata = data;
						//if tableview has been created, reset the data on the table
			//you can update data on the table multiple times
			if (self.tableview!=null){
				self.tableview.setData(data);
			}else{
				//if table has not been created, build it up with the data array
				var tableview = Titanium.UI.createTableView({
					data:data
				});
		
				//add the table to the current window for display
				self.add(tableview);
				self.tableview = tableview;
				
			}
			
			
			myTest.tableview = self.tableview;

			showVideo(data[0],null);
			self.cr = data[0];
	
		}catch(E){
			//if anything bad happens, show the error to the user and log it
			Titanium.API.info(E.message);
			Titanium.UI.createAlertDialog({title:'RSS error', message:'No videos were found for this search.'}).show();
			
		}
			
		//hide the spinning 'loading' widget
		toolActInd.closeIndicator();
//		win.setToolbar(null,{animated:true});
	};
	
	
//	self.fireEvent('search');
	
	return self;
};

module.exports = VideoListView;


function getTagView(){
	
	var tagData = [];
	var tagtitles = ['title','Rating','likes','View count','Upload date','Uploader'];
	var tagview = Titanium.UI.createView({
		data:tagData,
		left:1,
		top:6,
		width:80,
		height:300,
		backgroundImage:'images/sort1.png'
//		backgroundColor:'pink'
	});
	
	var tagheight = 43;
	var tagtopmargin = 36;

	var tag0 = Ti.UI.createButton({
		height:tagheight,
		width:80,
//		title:tagtitles[0],
		top:tagtopmargin,
		left:0,
		font:{fontSize:9},
		backgroundImage:null
	});
	
	tag0.addEventListener('click',function(){
		var rowdata = myTest.tabledata;		
		if(rowdata!=null){
			rowdata.sort(function(a,b){
			    var x = a.title.toLowerCase(), y = b.title.toLowerCase();
			    //var x = a.likerating, y = b.likerating;
			    //return y-x;
			    return x < y ? -1 : x > y ? 1 : 0;		    
			});
		}
		if(myTest.tableview){
			myTest.tableview.data = [];
			myTest.tableview.data = rowdata;
		}		
		
		tagview.backgroundImage = 'images/sort1.png';
	});	
	tagview.add(tag0);
	tagview.tag = tag0;
	
	var tag1 = Ti.UI.createButton({
		height:tagheight,
		width:80,
//		title:tagtitles[1],
		top:tagtopmargin+tagheight,
		left:0,
		font:{fontSize:9},
		backgroundImage:null
	});
	tag1.addEventListener('click',function(){
		var rowdata = myTest.tabledata;		
		if(rowdata!=null){
			rowdata.sort(function(a,b){
			    var x = a.gdrating, y = b.gdrating;
			    return y-x;		    
			});
		}
		
		if(myTest.tableview){
			myTest.tableview.data = [];
		
			myTest.tableview.data = rowdata;	
		}
		tagview.backgroundImage = 'images/sort2.png';
		
	});	
	tagview.add(tag1);
	
	var tag2 = Ti.UI.createButton({
		height:tagheight,
		width:80,
//		title:tagtitles[2],
		top:tagtopmargin+2*tagheight,
		left:0,
		font:{fontSize:9},
		backgroundImage:null
	});
	tag2.addEventListener('click',function(){
		
		var rowdata = myTest.tabledata;		
		if(rowdata!=null){
			rowdata.sort(function(a,b){
			    //var x = a.title.toLowerCase(), y = b.title.toLowerCase();
			    var x = a.likerating, y = b.likerating;
			    return y-x;
			    //return x < y ? -1 : x > y ? 1 : 0;		    
			});
		}
		
		if(myTest.tableview){
			myTest.tableview.data = [];
		
			myTest.tableview.data = rowdata;	
		}
		tagview.backgroundImage = 'images/sort3.png';
		
	});	
	tagview.add(tag2);
	
	var tag3 = Ti.UI.createButton({
		height:tagheight,
		width:80,
//		title:tagtitles[3],
		top:tagtopmargin+3*tagheight,
		left:0,
		font:{fontSize:9},
		backgroundImage:null
	});
	tag3.addEventListener('click',function(){
		
		var rowdata = myTest.tabledata;		
		if(rowdata!=null){
			rowdata.sort(function(a,b){
			    //var x = a.title.toLowerCase(), y = b.title.toLowerCase();
			    var x = a.viewCount, y = b.viewCount;
			    //return y-x;
			    return y-x;		    
			});
		}
		
		if(myTest.tableview){
			myTest.tableview.data = [];
		
			myTest.tableview.data = rowdata;	
		}
		tagview.backgroundImage = 'images/sort4.png';
			
	});	
	tagview.add(tag3);
	
	var tag4 = Ti.UI.createButton({
		height:tagheight,
		width:80,
//		title:tagtitles[4],
		top:tagtopmargin+4*tagheight,
		left:0,
		font:{fontSize:9},
		backgroundImage:null
	});
	tag4.addEventListener('click',function(){
		
		var rowdata = myTest.tabledata;		
		if(rowdata!=null){
			rowdata.sort(function(a,b){
			    //var x = a.title.toLowerCase(), y = b.title.toLowerCase();
			    var x = a.uploaded, y = b.uploaded;
			    //return y-x;
			    return x < y ? -1 : x > y ? 1 : 0;		    
			});
		}
		
		if(myTest.tableview){
			myTest.tableview.data = [];
		
			myTest.tableview.data = rowdata;	
		}
		tagview.backgroundImage = 'images/sort5.png';
			
	});	
	tagview.add(tag4);
	
	var tag5 = Ti.UI.createButton({
		height:tagheight,
		width:80,
//		title:tagtitles[5],
		top:tagtopmargin+5*tagheight,
		left:0,
		font:{fontSize:9},
		backgroundImage:null
	});
	tag5.addEventListener('click',function(){
		
		var rowdata = myTest.tabledata;		
		if(rowdata!=null){
			rowdata.sort(function(a,b){
			    //var x = a.title.toLowerCase(), y = b.title.toLowerCase();
			    var x = a.uploader, y = b.uploader;
			    //return y-x;
			    return x < y ? -1 : x > y ? 1 : 0;		    
			});
		}
		
		if(myTest.tableview){
			myTest.tableview.data = [];
		
			myTest.tableview.data = rowdata;	
		}
		tagview.backgroundImage = 'images/sort6.png';
			
	});	
	tagview.add(tag5);
			
	return tagview;
}


function showVideo(row,row1){
Ti.API.info(">>>"+myTest.scrn);		
//		self.scrn.simg.image = e.row.thumbnail;
		myTest.scrn.summary.value = row.summary;
		myTest.scrn.status.uploader.text = row.uploader;
		myTest.scrn.status.uploaded.text = row.uploaded;
		myTest.scrn.status.viewCount.text = row.viewCount+" views";
		myTest.scrn.status.gdrating.image = 'images/'+row.gdrating+'.png';
Ti.API.info("#####"+myTest.scrn.status.uploader.text);		
Ti.API.info("#####"+myTest.scrn.status.viewCount.text);	
		myTest.scrn.status.likerating.text = row.likerating+"%";
		
		var ytVideoSrc = 'http://www.youtube.com/v/' + row.guid;
		var thumbPlayer = '<html><head><style type="text/css"> body { background-color: black;color: white;} </style></head><body style="margin:0"><br/><br/><center><embed id="yt" src="' + ytVideoSrc + '" type="application/x-shockwave-flash" width="75%" height="75%"></embed></center></body></html>';
		myTest.scrn.webview.html = thumbPlayer;
		
		if(row1){
			row1.backgroundColor = 'transparent';
		}
		
		row.backgroundColor = 'orange';
		
		return row;
}

function getValue(){
	
}


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

