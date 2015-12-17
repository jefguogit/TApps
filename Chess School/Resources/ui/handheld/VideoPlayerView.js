function VideoPlayerView() {
	var self = Ti.UI.createView({
		backgroundColor:'yellow'
	});
	
	
	var webModalView;
	
	var currentLink;
	
	
	self.addEventListener('playYouTube', function(e){

		var vtitle = e.title;
		var vguid = e.guid;
		
		var ytVideoSrc = 'http://www.youtube.com/v/' + vguid;
		var thumbPlayer = '<html><head><style type="text/css"> body { background-color: black;color: white;} </style></head><body style="margin:0"><br/><br/><center><embed id="yt" src="' + ytVideoSrc + '" type="application/x-shockwave-flash" width="100%" height="75%"></embed></center></body></html>';
		
		showHTMLContent(vtitle,'http://www.youtube.com/watch?v=' + vguid,thumbPlayer);

	});	
	
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
	
	function showVideo(wUrl){
		var vplayer = Ti.Media.createVideoPlayer({
			url:wUrl
		})
		self.add(vplayer);
	}
		
	return self;
};

module.exports = VideoPlayerView;
