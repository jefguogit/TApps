function ScreenView(sw,sh) {
	var self = Ti.UI.createView({
		backgroundColor:'transparent',
//backgroundColor:'pink',
		height:sh,
		width:sw
	});
/*	
	var simage = Ti.UI.createImageView({
		width:sw*3/7,
		top:1,
		left:2
	});
	self.add(simage);
*/
	var	webModalView = Ti.UI.createWebView({
		width:sw*2/3,
		height:sh*2/3,
		top:8,
		left:20,
		backgroundColor:'transparent'
	});
	webModalView.scalesPageToFit = true;
	
	self.add(webModalView);
	self.webview = webModalView;
	
	var playbutton = Ti.UI.createButton({
		title:'play',
		top:sh/3,
		left:sh/8
	})
//	self.add(playbutton);
	
	var summary = Ti.UI.createTextArea({
		editable:false,		
		height:sh/4,
		width:sw-25,
		left:12,
		bottom:0,
		backgroundColor:'transparent',
		font:{fontSize:15},
		color:'black',
		verticalAlign:Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
//		backgroundColor:'red'
	})
	self.add(summary);
	
	var statusbar = Ti.UI.createView({
		height:sh*2/3,
		width:sw/3,
		right:12,
		top:3,
		backgroundColor:'transparent'
	});
	
	var lh = sh*2/15;
	
	var uploader = Ti.UI.createLabel({
		height:lh,
		width:sw/3,		
		right:1,
		top:0,
		font:{fontSize:11},
		color:'white',
		textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT,
		backgroundColor:'transparent'
	});	
	
	var uploaded = Ti.UI.createLabel({
		height:lh,
		width:sw/3,
		right:1,
		top:lh,
		font:{fontSize:10},
		color:'#993333',
		textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT,
		backgroundColor:'transparent'
	});
		
	var viewCount = Ti.UI.createLabel({
		height:lh,
		width:sw/3,
		right:1,
		top:5+2*lh,
		font:{fontSize:9},
		color:'#9999cc',
		textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT,
		backgroundColor:'transparent'
	});	
	
	var gdrating = Ti.UI.createImageView({
		height:lh/3,
		width:sw/6,
		right:1,
		top:15+3*lh,
		backgroundColor:'transparent'
	});	
	
	
	var likeicon = Ti.UI.createImageView({
		height:lh/2,
		width:sw/15,
		right:32,
		top:10+4*lh,
		image:'images/like.png'
	});
	
	var likerating = Ti.UI.createLabel({
		height:lh,
		width:sw/3,
		right:6,
		top:5+4*lh,
		font:{fontSize:11},
		color:'green',
		textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT,
		backgroundColor:'transparent'
	});	
	
	statusbar.add(uploader);
	statusbar.uploader = uploader;
	
	statusbar.add(uploaded);
	statusbar.uploaded = uploaded;
	
	statusbar.add(viewCount);
	statusbar.viewCount = viewCount;
	
	statusbar.add(gdrating);
	statusbar.gdrating = gdrating;
	
	statusbar.add(likeicon);
	statusbar.add(likerating);
	statusbar.likerating = likerating;

	self.add(statusbar);
	
//	self.simg = simage;
	self.summary = summary;
	self.status = statusbar;
	
	return self;
};

module.exports = ScreenView;
