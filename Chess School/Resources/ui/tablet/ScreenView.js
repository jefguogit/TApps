function ScreenView(sw,sh) {
	var self = Ti.UI.createView({
		backgroundColor:'transparent',
//backgroundColor:'pink',
		height:sh,
		width:sw
//		borderColor:"yellow"
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
		height:sh*4/5,
		top:sh*1/20,
		left:0,
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
		height:sh,
		width:sw*11/36,
		right:0,
		bottom:0,
		backgroundColor:'transparent',
		font:{fontSize:16},
		color:'black',
		verticalAlign:Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP
		
	})
	self.add(summary);
	
	var statusbar = Ti.UI.createView({
		height:sh*1/5,
		width:sw*2/3,
		right:sw/3,
		bottom:3,
		backgroundColor:'transparent'
	});
	
	var lh = sh/12;
	
	var uploader = Ti.UI.createLabel({
		height:lh,	
		left:0,
		top:0,
		font:{fontSize:18},
		color:'white',
		textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT,
		backgroundColor:'transparent'
	});	
	
	var uploaded = Ti.UI.createLabel({
		height:lh,
		right:0,
		top:0,
		font:{fontSize:18},
		color:'#993333',
		textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT,
		backgroundColor:'transparent'
	});
		
	var viewCount = Ti.UI.createLabel({
		height:lh,
		left:0,
		bottom:0,
		font:{fontSize:16},
		color:'#9999cc',
		textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT,
		backgroundColor:'transparent'
	});	
	
	var gdrating = Ti.UI.createImageView({
		height:lh*2/3,
		right:150,
		bottom:5,
		backgroundColor:'transparent'
	});	
	
	
	var likeicon = Ti.UI.createImageView({
		height:lh*3/4,
		right:35,
		bottom:3,
		image:'images/like.png'
	});
	
	var likerating = Ti.UI.createLabel({
		height:lh,
		bottom:0,
		right:0,
		font:{fontSize:16},
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
