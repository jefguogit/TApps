!function(n){"use strict";n(function(){n.support.transition=function(){var n=function(){var i=document.createElement("bootstrap"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},n;for(n in t)if(i.style[n]!==undefined)return t[n]}();return n&&{end:n}}()})}(window.jQuery);!function(n){"use strict";var i='[data-dismiss="alert"]',t=function(t){n(t).on("click",i,this.close)},r;t.prototype.close=function(t){function f(){i.trigger("closed").remove()}var u=n(this),r=u.attr("data-target"),i;(r||(r=u.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,"")),i=n(r),t&&t.preventDefault(),i.length||(i=u.hasClass("alert")?u:u.parent()),i.trigger(t=n.Event("close")),t.isDefaultPrevented())||(i.removeClass("in"),n.support.transition&&i.hasClass("fade")?i.on(n.support.transition.end,f):f())};r=n.fn.alert;n.fn.alert=function(i){return this.each(function(){var r=n(this),u=r.data("alert");u||r.data("alert",u=new t(this));typeof i=="string"&&u[i].call(r)})};n.fn.alert.Constructor=t;n.fn.alert.noConflict=function(){return n.fn.alert=r,this};n(document).on("click.alert.data-api",i,t.prototype.close)}(window.jQuery);!function(n){"use strict";var t=function(t,i){this.$element=n(t);this.options=n.extend({},n.fn.button.defaults,i)},i;t.prototype.setState=function(n){var i="disabled",t=this.$element,r=t.data(),u=t.is("input")?"val":"html";n+="Text";r.resetText||t.data("resetText",t[u]());t[u](r[n]||this.options[n]);setTimeout(function(){n=="loadingText"?t.addClass(i).attr(i,i):t.removeClass(i).removeAttr(i)},0)};t.prototype.toggle=function(){var n=this.$element.closest('[data-toggle="buttons-radio"]');n&&n.find(".active").removeClass("active");this.$element.toggleClass("active")};i=n.fn.button;n.fn.button=function(i){return this.each(function(){var u=n(this),r=u.data("button"),f=typeof i=="object"&&i;r||u.data("button",r=new t(this,f));i=="toggle"?r.toggle():i&&r.setState(i)})};n.fn.button.defaults={loadingText:"loading..."};n.fn.button.Constructor=t;n.fn.button.noConflict=function(){return n.fn.button=i,this};n(document).on("click.button.data-api","[data-toggle^=button]",function(t){var i=n(t.target);i.hasClass("btn")||(i=i.closest(".btn"));i.button("toggle")})}(window.jQuery);!function(n){"use strict";var t=function(t,i){this.$element=n(t);this.$indicators=this.$element.find(".carousel-indicators");this.options=i;this.options.pause=="hover"&&this.$element.on("mouseenter",n.proxy(this.pause,this)).on("mouseleave",n.proxy(this.cycle,this))},i;t.prototype={cycle:function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(n.proxy(this.next,this),this.options.interval)),this},getActiveIndex:function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},to:function(t){var i=this.getActiveIndex(),r=this;if(!(t>this.$items.length-1)&&!(t<0))return this.sliding?this.$element.one("slid",function(){r.to(t)}):i==t?this.pause().cycle():this.slide(t>i?"next":"prev",n(this.$items[t]))},pause:function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&n.support.transition.end&&(this.$element.trigger(n.support.transition.end),this.cycle(!0)),clearInterval(this.interval),this.interval=null,this},next:function(){if(!this.sliding)return this.slide("next")},prev:function(){if(!this.sliding)return this.slide("prev")},slide:function(t,i){var e=this.$element.find(".item.active"),r=i||e[t](),s=this.interval,u=t=="next"?"left":"right",h=t=="next"?"first":"last",o=this,f;if(this.sliding=!0,s&&this.pause(),r=r.length?r:this.$element.find(".item")[h](),f=n.Event("slide",{relatedTarget:r[0],direction:u}),!r.hasClass("active")){if(this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var t=n(o.$indicators.children()[o.getActiveIndex()]);t&&t.addClass("active")})),n.support.transition&&this.$element.hasClass("slide")){if(this.$element.trigger(f),f.isDefaultPrevented())return;r.addClass(t);r[0].offsetWidth;e.addClass(u);r.addClass(u);this.$element.one(n.support.transition.end,function(){r.removeClass([t,u].join(" ")).addClass("active");e.removeClass(["active",u].join(" "));o.sliding=!1;setTimeout(function(){o.$element.trigger("slid")},0)})}else{if(this.$element.trigger(f),f.isDefaultPrevented())return;e.removeClass("active");r.addClass("active");this.sliding=!1;this.$element.trigger("slid")}return s&&this.cycle(),this}}};i=n.fn.carousel;n.fn.carousel=function(i){return this.each(function(){var f=n(this),r=f.data("carousel"),u=n.extend({},n.fn.carousel.defaults,typeof i=="object"&&i),e=typeof i=="string"?i:u.slide;r||f.data("carousel",r=new t(this,u));typeof i=="number"?r.to(i):e?r[e]():u.interval&&r.pause().cycle()})};n.fn.carousel.defaults={interval:5e3,pause:"hover"};n.fn.carousel.Constructor=t;n.fn.carousel.noConflict=function(){return n.fn.carousel=i,this};n(document).on("click.carousel.data-api","[data-slide], [data-slide-to]",function(t){var i=n(this),u,r=n(i.attr("data-target")||(u=i.attr("href"))&&u.replace(/.*(?=#[^\s]+$)/,"")),e=n.extend({},r.data(),i.data()),f;r.carousel(e);(f=i.attr("data-slide-to"))&&r.data("carousel").pause().to(f).cycle();t.preventDefault()})}(window.jQuery);!function(n){"use strict";var t=function(t,i){this.$element=n(t);this.options=n.extend({},n.fn.collapse.defaults,i);this.options.parent&&(this.$parent=n(this.options.parent));this.options.toggle&&this.toggle()},i;t.prototype={constructor:t,dimension:function(){var n=this.$element.hasClass("width");return n?"width":"height"},show:function(){var i,u,t,r;if(!this.transitioning&&!this.$element.hasClass("in")){if(i=this.dimension(),u=n.camelCase(["scroll",i].join("-")),t=this.$parent&&this.$parent.find("> .accordion-group > .in"),t&&t.length){if(r=t.data("collapse"),r&&r.transitioning)return;t.collapse("hide");r||t.data("collapse",null)}this.$element[i](0);this.transition("addClass",n.Event("show"),"shown");n.support.transition&&this.$element[i](this.$element[0][u])}},hide:function(){var t;!this.transitioning&&this.$element.hasClass("in")&&(t=this.dimension(),this.reset(this.$element[t]()),this.transition("removeClass",n.Event("hide"),"hidden"),this.$element[t](0))},reset:function(n){var t=this.dimension();return this.$element.removeClass("collapse")[t](n||"auto")[0].offsetWidth,this.$element[n!==null?"addClass":"removeClass"]("collapse"),this},transition:function(t,i,r){var u=this,f=function(){i.type=="show"&&u.reset();u.transitioning=0;u.$element.trigger(r)};(this.$element.trigger(i),i.isDefaultPrevented())||(this.transitioning=1,this.$element[t]("in"),n.support.transition&&this.$element.hasClass("collapse")?this.$element.one(n.support.transition.end,f):f())},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}};i=n.fn.collapse;n.fn.collapse=function(i){return this.each(function(){var r=n(this),u=r.data("collapse"),f=n.extend({},n.fn.collapse.defaults,r.data(),typeof i=="object"&&i);u||r.data("collapse",u=new t(this,f));typeof i=="string"&&u[i]()})};n.fn.collapse.defaults={toggle:!0};n.fn.collapse.Constructor=t;n.fn.collapse.noConflict=function(){return n.fn.collapse=i,this};n(document).on("click.collapse.data-api","[data-toggle=collapse]",function(t){var i=n(this),u,r=i.attr("data-target")||t.preventDefault()||(u=i.attr("href"))&&u.replace(/.*(?=#[^\s]+$)/,""),f=n(r).data("collapse")?"toggle":i.data();i[n(r).hasClass("in")?"addClass":"removeClass"]("collapsed");n(r).collapse(f)})}(window.jQuery);!function(n){"use strict";function r(){n(".dropdown-backdrop").remove();n(i).each(function(){u(n(this)).removeClass("open")})}function u(t){var i=t.attr("data-target"),r;return i||(i=t.attr("href"),i=i&&/#/.test(i)&&i.replace(/.*(?=#[^\s]*$)/,"")),r=i&&n(i),r&&r.length||(r=t.parent()),r}var i="[data-toggle=dropdown]",t=function(t){var i=n(t).on("click.dropdown.data-api",this.toggle);n("html").on("click.dropdown.data-api",function(){i.parent().removeClass("open")})},f;t.prototype={constructor:t,toggle:function(){var t=n(this),i,f;if(!t.is(".disabled, :disabled"))return i=u(t),f=i.hasClass("open"),r(),f||("ontouchstart"in document.documentElement&&n('<div class="dropdown-backdrop"/>').insertBefore(n(this)).on("click",r),i.toggleClass("open")),t.focus(),!1},keydown:function(t){var e,f,o,s,r;if(/(38|40|27)/.test(t.keyCode)&&(e=n(this),t.preventDefault(),t.stopPropagation(),!e.is(".disabled, :disabled"))){if(o=u(e),s=o.hasClass("open"),!s||s&&t.keyCode==27)return t.which==27&&o.find(i).focus(),e.click();(f=n("[role=menu] li:not(.divider):visible a",o),f.length)&&(r=f.index(f.filter(":focus")),t.keyCode==38&&r>0&&r--,t.keyCode==40&&r<f.length-1&&r++,~r||(r=0),f.eq(r).focus())}}};f=n.fn.dropdown;n.fn.dropdown=function(i){return this.each(function(){var r=n(this),u=r.data("dropdown");u||r.data("dropdown",u=new t(this));typeof i=="string"&&u[i].call(r)})};n.fn.dropdown.Constructor=t;n.fn.dropdown.noConflict=function(){return n.fn.dropdown=f,this};n(document).on("click.dropdown.data-api",r).on("click.dropdown.data-api",".dropdown form",function(n){n.stopPropagation()}).on("click.dropdown.data-api",i,t.prototype.toggle).on("keydown.dropdown.data-api",i+", [role=menu]",t.prototype.keydown)}(window.jQuery);!function(n){"use strict";var t=function(t,i){this.options=i;this.$element=n(t).delegate('[data-dismiss="modal"]',"click.dismiss.modal",n.proxy(this.hide,this));this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)},i;t.prototype={constructor:t,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var t=this,i=n.Event("show");(this.$element.trigger(i),this.isShown||i.isDefaultPrevented())||(this.isShown=!0,this.escape(),this.backdrop(function(){var i=n.support.transition&&t.$element.hasClass("fade");t.$element.parent().length||t.$element.appendTo(document.body);t.$element.show();i&&t.$element[0].offsetWidth;t.$element.addClass("in").attr("aria-hidden",!1);t.enforceFocus();i?t.$element.one(n.support.transition.end,function(){t.$element.focus().trigger("shown")}):t.$element.focus().trigger("shown")}))},hide:function(t){t&&t.preventDefault();var i=this;(t=n.Event("hide"),this.$element.trigger(t),this.isShown&&!t.isDefaultPrevented())&&(this.isShown=!1,this.escape(),n(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),n.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal())},enforceFocus:function(){var t=this;n(document).on("focusin.modal",function(n){t.$element[0]===n.target||t.$element.has(n.target).length||t.$element.focus()})},escape:function(){var n=this;this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(t){t.which==27&&n.hide()}):this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var t=this,i=setTimeout(function(){t.$element.off(n.support.transition.end);t.hideModal()},500);this.$element.one(n.support.transition.end,function(){clearTimeout(i);t.hideModal()})},hideModal:function(){var n=this;this.$element.hide();this.backdrop(function(){n.removeBackdrop();n.$element.trigger("hidden")})},removeBackdrop:function(){this.$backdrop&&this.$backdrop.remove();this.$backdrop=null},backdrop:function(t){var u=this,r=this.$element.hasClass("fade")?"fade":"",i;if(this.isShown&&this.options.backdrop){if(i=n.support.transition&&r,this.$backdrop=n('<div class="modal-backdrop '+r+'" />').appendTo(document.body),this.$backdrop.click(this.options.backdrop=="static"?n.proxy(this.$element[0].focus,this.$element[0]):n.proxy(this.hide,this)),i&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!t)return;i?this.$backdrop.one(n.support.transition.end,t):t()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),n.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(n.support.transition.end,t):t()):t&&t()}};i=n.fn.modal;n.fn.modal=function(i){return this.each(function(){var u=n(this),r=u.data("modal"),f=n.extend({},n.fn.modal.defaults,u.data(),typeof i=="object"&&i);r||u.data("modal",r=new t(this,f));typeof i=="string"?r[i]():f.show&&r.show()})};n.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0};n.fn.modal.Constructor=t;n.fn.modal.noConflict=function(){return n.fn.modal=i,this};n(document).on("click.modal.data-api",'[data-toggle="modal"]',function(t){var i=n(this),r=i.attr("href"),u=n(i.attr("data-target")||r&&r.replace(/.*(?=#[^\s]+$)/,"")),f=u.data("modal")?"toggle":n.extend({remote:!/#/.test(r)&&r},u.data(),i.data());t.preventDefault();u.modal(f).one("hide",function(){i.focus()})})}(window.jQuery);!function(n){"use strict";var t=function(n,t){this.init("tooltip",n,t)},i;t.prototype={constructor:t,init:function(t,i,r){var o,s,f,u,e;for(this.type=t,this.$element=n(i),this.options=this.getOptions(r),this.enabled=!0,f=this.options.trigger.split(" "),e=f.length;e--;)u=f[e],u=="click"?this.$element.on("click."+this.type,this.options.selector,n.proxy(this.toggle,this)):u!="manual"&&(o=u=="hover"?"mouseenter":"focus",s=u=="hover"?"mouseleave":"blur",this.$element.on(o+"."+this.type,this.options.selector,n.proxy(this.enter,this)),this.$element.on(s+"."+this.type,this.options.selector,n.proxy(this.leave,this)));this.options.selector?this._options=n.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(t){return t=n.extend({},n.fn[this.type].defaults,this.$element.data(),t),t.delay&&typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),t},enter:function(t){var u=n.fn[this.type].defaults,r={},i;if(this._options&&n.each(this._options,function(n,t){u[n]!=t&&(r[n]=t)},this),i=n(t.currentTarget)[this.type](r).data(this.type),!i.options.delay||!i.options.delay.show)return i.show();clearTimeout(this.timeout);i.hoverState="in";this.timeout=setTimeout(function(){i.hoverState=="in"&&i.show()},i.options.delay.show)},leave:function(t){var i=n(t.currentTarget)[this.type](this._options).data(this.type);if(this.timeout&&clearTimeout(this.timeout),!i.options.delay||!i.options.delay.hide)return i.hide();i.hoverState="out";this.timeout=setTimeout(function(){i.hoverState=="out"&&i.hide()},i.options.delay.hide)},show:function(){var i,t,u,f,e,r,o=n.Event("show");if(this.hasContent()&&this.enabled){if(this.$element.trigger(o),o.isDefaultPrevented())return;i=this.tip();this.setContent();this.options.animation&&i.addClass("fade");e=typeof this.options.placement=="function"?this.options.placement.call(this,i[0],this.$element[0]):this.options.placement;i.detach().css({top:0,left:0,display:"block"});this.options.container?i.appendTo(this.options.container):i.insertAfter(this.$element);t=this.getPosition();u=i[0].offsetWidth;f=i[0].offsetHeight;switch(e){case"bottom":r={top:t.top+t.height,left:t.left+t.width/2-u/2};break;case"top":r={top:t.top-f,left:t.left+t.width/2-u/2};break;case"left":r={top:t.top+t.height/2-f/2,left:t.left-u};break;case"right":r={top:t.top+t.height/2-f/2,left:t.left+t.width}}this.applyPlacement(r,e);this.$element.trigger("shown")}},applyPlacement:function(n,t){var i=this.tip(),s=i[0].offsetWidth,f=i[0].offsetHeight,u,r,e,o;i.offset(n).addClass(t).addClass("in");u=i[0].offsetWidth;r=i[0].offsetHeight;t=="top"&&r!=f&&(n.top=n.top+f-r,o=!0);t=="bottom"||t=="top"?(e=0,n.left<0&&(e=n.left*-2,n.left=0,i.offset(n),u=i[0].offsetWidth,r=i[0].offsetHeight),this.replaceArrow(e-s+u,u,"left")):this.replaceArrow(r-f,r,"top");o&&i.offset(n)},replaceArrow:function(n,t,i){this.arrow().css(i,n?50*(1-n/t)+"%":"")},setContent:function(){var n=this.tip(),t=this.getTitle();n.find(".tooltip-inner")[this.options.html?"html":"text"](t);n.removeClass("fade in top bottom left right")},hide:function(){function r(){var i=setTimeout(function(){t.off(n.support.transition.end).detach()},500);t.one(n.support.transition.end,function(){clearTimeout(i);t.detach()})}var u=this,t=this.tip(),i=n.Event("hide");if(this.$element.trigger(i),!i.isDefaultPrevented())return t.removeClass("in"),n.support.transition&&this.$tip.hasClass("fade")?r():t.detach(),this.$element.trigger("hidden"),this},fixTitle:function(){var n=this.$element;(n.attr("title")||typeof n.attr("data-original-title")!="string")&&n.attr("data-original-title",n.attr("title")||"").attr("title","")},hasContent:function(){return this.getTitle()},getPosition:function(){var t=this.$element[0];return n.extend({},typeof t.getBoundingClientRect=="function"?t.getBoundingClientRect():{width:t.offsetWidth,height:t.offsetHeight},this.$element.offset())},getTitle:function(){var t,i=this.$element,n=this.options;return t=i.attr("data-original-title")||(typeof n.title=="function"?n.title.call(i[0]):n.title),t},tip:function(){return this.$tip=this.$tip||n(this.options.template)},arrow:function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(t){var i=t?n(t.currentTarget)[this.type](this._options).data(this.type):this;i.tip().hasClass("in")?i.hide():i.show()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}};i=n.fn.tooltip;n.fn.tooltip=function(i){return this.each(function(){var u=n(this),r=u.data("tooltip"),f=typeof i=="object"&&i;r||u.data("tooltip",r=new t(this,f));typeof i=="string"&&r[i]()})};n.fn.tooltip.Constructor=t;n.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"><\/div><div class="tooltip-inner"><\/div><\/div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1};n.fn.tooltip.noConflict=function(){return n.fn.tooltip=i,this}}(window.jQuery);!function(n){"use strict";var t=function(n,t){this.init("popover",n,t)},i;t.prototype=n.extend({},n.fn.tooltip.Constructor.prototype,{constructor:t,setContent:function(){var n=this.tip(),t=this.getTitle(),i=this.getContent();n.find(".popover-title")[this.options.html?"html":"text"](t);n.find(".popover-content")[this.options.html?"html":"text"](i);n.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var t,i=this.$element,n=this.options;return t=(typeof n.content=="function"?n.content.call(i[0]):n.content)||i.attr("data-content"),t},tip:function(){return this.$tip||(this.$tip=n(this.options.template)),this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}});i=n.fn.popover;n.fn.popover=function(i){return this.each(function(){var u=n(this),r=u.data("popover"),f=typeof i=="object"&&i;r||u.data("popover",r=new t(this,f));typeof i=="string"&&r[i]()})};n.fn.popover.Constructor=t;n.fn.popover.defaults=n.extend({},n.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>'});n.fn.popover.noConflict=function(){return n.fn.popover=i,this}}(window.jQuery);!function(n){"use strict";function t(t,i){var u=n.proxy(this.process,this),f=n(t).is("body")?n(window):n(t),r;this.options=n.extend({},n.fn.scrollspy.defaults,i);this.$scrollElement=f.on("scroll.scroll-spy.data-api",u);this.selector=(this.options.target||(r=n(t).attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a";this.$body=n("body");this.refresh();this.process()}t.prototype={constructor:t,refresh:function(){var t=this,i;this.offsets=n([]);this.targets=n([]);i=this.$body.find(this.selector).map(function(){var u=n(this),i=u.data("target")||u.attr("href"),r=/^#\w/.test(i)&&n(i);return r&&r.length&&[[r.position().top+(!n.isWindow(t.$scrollElement.get(0))&&t.$scrollElement.scrollTop()),i]]||null}).sort(function(n,t){return n[0]-t[0]}).each(function(){t.offsets.push(this[0]);t.targets.push(this[1])})},process:function(){var i=this.$scrollElement.scrollTop()+this.options.offset,f=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,e=f-this.$scrollElement.height(),t=this.offsets,r=this.targets,u=this.activeTarget,n;if(i>=e)return u!=(n=r.last()[0])&&this.activate(n);for(n=t.length;n--;)u!=r[n]&&i>=t[n]&&(!t[n+1]||i<=t[n+1])&&this.activate(r[n])},activate:function(t){var i,r;this.activeTarget=t;n(this.selector).parent(".active").removeClass("active");r=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]';i=n(r).parent("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active"));i.trigger("activate")}};var i=n.fn.scrollspy;n.fn.scrollspy=function(i){return this.each(function(){var u=n(this),r=u.data("scrollspy"),f=typeof i=="object"&&i;r||u.data("scrollspy",r=new t(this,f));typeof i=="string"&&r[i]()})};n.fn.scrollspy.Constructor=t;n.fn.scrollspy.defaults={offset:10};n.fn.scrollspy.noConflict=function(){return n.fn.scrollspy=i,this};n(window).on("load",function(){n('[data-spy="scroll"]').each(function(){var t=n(this);t.scrollspy(t.data())})})}(window.jQuery);!function(n){"use strict";var t=function(t){this.element=n(t)},i;t.prototype={constructor:t,show:function(){var t=this.element,e=t.closest("ul:not(.dropdown-menu)"),i=t.attr("data-target"),r,u,f;(i||(i=t.attr("href"),i=i&&i.replace(/.*(?=#[^\s]*$)/,"")),t.parent("li").hasClass("active"))||(r=e.find(".active:last a")[0],f=n.Event("show",{relatedTarget:r}),t.trigger(f),f.isDefaultPrevented())||(u=n(i),this.activate(t.parent("li"),e),this.activate(u,u.parent(),function(){t.trigger({type:"shown",relatedTarget:r})}))},activate:function(t,i,r){function f(){u.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");t.addClass("active");e?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade");t.parent(".dropdown-menu")&&t.closest("li.dropdown").addClass("active");r&&r()}var u=i.find("> .active"),e=r&&n.support.transition&&u.hasClass("fade");e?u.one(n.support.transition.end,f):f();u.removeClass("in")}};i=n.fn.tab;n.fn.tab=function(i){return this.each(function(){var u=n(this),r=u.data("tab");r||u.data("tab",r=new t(this));typeof i=="string"&&r[i]()})};n.fn.tab.Constructor=t;n.fn.tab.noConflict=function(){return n.fn.tab=i,this};n(document).on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(t){t.preventDefault();n(this).tab("show")})}(window.jQuery);!function(n){"use strict";var t=function(t,i){this.$element=n(t);this.options=n.extend({},n.fn.typeahead.defaults,i);this.matcher=this.options.matcher||this.matcher;this.sorter=this.options.sorter||this.sorter;this.highlighter=this.options.highlighter||this.highlighter;this.updater=this.options.updater||this.updater;this.source=this.options.source;this.$menu=n(this.options.menu);this.shown=!1;this.listen()},i;t.prototype={constructor:t,select:function(){var n=this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(n)).change(),this.hide()},updater:function(n){return n},show:function(){var t=n.extend({},this.$element.position(),{height:this.$element[0].offsetHeight});return this.$menu.insertAfter(this.$element).css({top:t.top+t.height,left:t.left}).show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(){var t;return this.query=this.$element.val(),!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(t=n.isFunction(this.source)?this.source(this.query,n.proxy(this.process,this)):this.source,t?this.process(t):this)},process:function(t){var i=this;return t=n.grep(t,function(n){return i.matcher(n)}),t=this.sorter(t),t.length?this.render(t.slice(0,this.options.items)).show():this.shown?this.hide():this},matcher:function(n){return~n.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(n){for(var i=[],r=[],u=[],t;t=n.shift();)t.toLowerCase().indexOf(this.query.toLowerCase())?~t.indexOf(this.query)?r.push(t):u.push(t):i.push(t);return i.concat(r,u)},highlighter:function(n){var t=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return n.replace(new RegExp("("+t+")","ig"),function(n,t){return"<strong>"+t+"<\/strong>"})},render:function(t){var i=this;return t=n(t).map(function(t,r){return t=n(i.options.item).attr("data-value",r),t.find("a").html(i.highlighter(r)),t[0]}),t.first().addClass("active"),this.$menu.html(t),this},next:function(){var i=this.$menu.find(".active").removeClass("active"),t=i.next();t.length||(t=n(this.$menu.find("li")[0]));t.addClass("active")},prev:function(){var t=this.$menu.find(".active").removeClass("active"),n=t.prev();n.length||(n=this.$menu.find("li").last());n.addClass("active")},listen:function(){this.$element.on("focus",n.proxy(this.focus,this)).on("blur",n.proxy(this.blur,this)).on("keypress",n.proxy(this.keypress,this)).on("keyup",n.proxy(this.keyup,this));this.eventSupported("keydown")&&this.$element.on("keydown",n.proxy(this.keydown,this));this.$menu.on("click",n.proxy(this.click,this)).on("mouseenter","li",n.proxy(this.mouseenter,this)).on("mouseleave","li",n.proxy(this.mouseleave,this))},eventSupported:function(n){var t=n in this.$element;return t||(this.$element.setAttribute(n,"return;"),t=typeof this.$element[n]=="function"),t},move:function(n){if(this.shown){switch(n.keyCode){case 9:case 13:case 27:n.preventDefault();break;case 38:n.preventDefault();this.prev();break;case 40:n.preventDefault();this.next()}n.stopPropagation()}},keydown:function(t){this.suppressKeyPressRepeat=~n.inArray(t.keyCode,[40,38,9,13,27]);this.move(t)},keypress:function(n){this.suppressKeyPressRepeat||this.move(n)},keyup:function(n){switch(n.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}n.stopPropagation();n.preventDefault()},focus:function(){this.focused=!0},blur:function(){this.focused=!1;!this.mousedover&&this.shown&&this.hide()},click:function(n){n.stopPropagation();n.preventDefault();this.select();this.$element.focus()},mouseenter:function(t){this.mousedover=!0;this.$menu.find(".active").removeClass("active");n(t.currentTarget).addClass("active")},mouseleave:function(){this.mousedover=!1;!this.focused&&this.shown&&this.hide()}};i=n.fn.typeahead;n.fn.typeahead=function(i){return this.each(function(){var u=n(this),r=u.data("typeahead"),f=typeof i=="object"&&i;r||u.data("typeahead",r=new t(this,f));typeof i=="string"&&r[i]()})};n.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"><\/ul>',item:'<li><a href="#"><\/a><\/li>',minLength:1};n.fn.typeahead.Constructor=t;n.fn.typeahead.noConflict=function(){return n.fn.typeahead=i,this};n(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(){var t=n(this);t.data("typeahead")||t.typeahead(t.data())})}(window.jQuery);!function(n){"use strict";var t=function(t,i){this.options=n.extend({},n.fn.affix.defaults,i);this.$window=n(window).on("scroll.affix.data-api",n.proxy(this.checkPosition,this)).on("click.affix.data-api",n.proxy(function(){setTimeout(n.proxy(this.checkPosition,this),1)},this));this.$element=n(t);this.checkPosition()},i;t.prototype.checkPosition=function(){if(this.$element.is(":visible")){var o=n(document).height(),f=this.$window.scrollTop(),e=this.$element.offset(),t=this.options.offset,r=t.bottom,u=t.top,i;(typeof t!="object"&&(r=u=t),typeof u=="function"&&(u=t.top()),typeof r=="function"&&(r=t.bottom()),i=this.unpin!=null&&f+this.unpin<=e.top?!1:r!=null&&e.top+this.$element.height()>=o-r?"bottom":u!=null&&f<=u?"top":!1,this.affixed!==i)&&(this.affixed=i,this.unpin=i=="bottom"?e.top-f:null,this.$element.removeClass("affix affix-top affix-bottom").addClass("affix"+(i?"-"+i:"")))}};i=n.fn.affix;n.fn.affix=function(i){return this.each(function(){var u=n(this),r=u.data("affix"),f=typeof i=="object"&&i;r||u.data("affix",r=new t(this,f));typeof i=="string"&&r[i]()})};n.fn.affix.Constructor=t;n.fn.affix.defaults={offset:0};n.fn.affix.noConflict=function(){return n.fn.affix=i,this};n(window).on("load",function(){n('[data-spy="affix"]').each(function(){var i=n(this),t=i.data();t.offset=t.offset||{};t.offsetBottom&&(t.offset.bottom=t.offsetBottom);t.offsetTop&&(t.offset.top=t.offsetTop);i.affix(t)})})}(window.jQuery)