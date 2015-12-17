function Leader() {
	var self = Ti.UI.createView();
	
	var hbtn = Ti.UI.createButton({
		title: 'home',
		bottom: 20,
		left: 50,
		width: 200
	});
	hbtn.addEventListener('click', function(e){
		myChess.tabGroup.setActiveTab(0);	
	});
	self.add(hbtn);
	
	
	var btn = Ti.UI.createButton({
		title: 'Submit Score',
		top: 22,
		left: 50,
		width: 200
	});
	
	var btn2 = Ti.UI.createButton({
		title: 'Show Leaderboard',
		top: 62,
		left: 50,
		width: 200
	});
	
	var btn3 = Ti.UI.createButton({
		title: 'Submit Achievement',
		top: 102,
		left: 50,
		width: 200
	});
	
	var btn4 = Ti.UI.createButton({
		title: 'Show Achievements',
		top: 142,
		left: 50,
		width: 200
	});
	
	var btn5 = Ti.UI.createButton({
		title: 'Reset Achievements',
		top: 182,
		left: 50,
		width: 200
	});
	
	var btn6 = Ti.UI.createButton({
		title: 'Get Scores',
		top: 222,
		left: 50,
		width: 200
	});
	
	self.add(btn);
	self.add(btn2);
	self.add(btn3);
	self.add(btn4);
	self.add(btn5);
	self.add(btn6);
	
	btn.addEventListener('click', function(e){
		myChess.gamekit.submitScore('SGT.chesstimetravel.stars','10');	
	});
	
	btn2.addEventListener('click', function(e){
		myChess.gamekit.showLeaderboard('SGT.chesstimetravel.stars');	
	});
	
	btn3.addEventListener('click', function(e){
		myChess.gamekit.submitAchievement('SGT.chesstimetravel.years.1901','1');
	});
	
	btn4.addEventListener('click', function(e){
		myChess.gamekit.showAchievements();
	});
	
	btn5.addEventListener('click', function(e){
		myChess.gamekit.resetAchievements('');
	});
	
	btn6.addEventListener('click', function(e){
		myChess.gamekit.getLeaderboardScore({
			identifier: 'SGT.chesstimetravel.stars',
			success: function(response) {
				Titanium.API.info(response);
			},
			error: function() {
				Titanium.API.info('Error callback');	
			}
		});
	});
	
/*
	myChess.gamekit.initGameCenter({
		success: function() {
			var player = myChess.gamekit.getPlayerInfo();
			player = JSON.parse(player);
		
			var playerName = Ti.UI.createLabel({
				text: 'Player ID: '+player.id,
				top: 260
			});
		
			var playerAlias = Ti.UI.createLabel({
				text: 'Player Alias: '+player.alias,
				top: 285
			});
			
			var playerPhoto = Ti.UI.createImageView({
				image: Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDataDirectory()+player.photo),
				top: 310
			});
			
			self.add(playerName);
			self.add(playerAlias);
			self.add(playerPhoto);
		},
		error: function() {
			Titanium.API.info('Error callback');
		}
	});
*/	
	
	
	return self;
};

module.exports = Leader;
