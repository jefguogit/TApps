var paragon = paragon || {};

paragon.footerVisible = false;

paragon.showFooter = function () {
    $("#footer").show();
}

paragon.verifyDisplaySize = function () {
    //checking screen size disabled for now
    //if ($(window).width() > 1024 && $(window).height() >= 768) {
    //    $('#unsupported').hide();
    //    $('#block').hide();
    //}
    //else {
    //    $('#unsupported').show();
    //    $('#block').show();
    //}

    paragon.resizePanelHeight();
}

paragon.resizePanelHeight = function () {
    var panelTop = $('#panelTop');
    var panelLeft = $('#panelLeft');
    var panelRight = $('#panelRight');
    var mainContainer = $('#main-container');
    var footer = $("#footer");

    var heightToDeduct = 150;

    if (footer.length) {
        heightToDeduct += footer.height();
    }

    mainContainer.css("height", ($(window).height() - heightToDeduct) + "px");

    var panelHeight = mainContainer.height() - 22;
    if (panelTop) {
        panelHeight -= (panelTop.height());
    }

    panelLeft.css("height", panelHeight + "px");
    panelRight.css("height", panelHeight + "px");
}


