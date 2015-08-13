/**
* _sun.ContextualPopup_ is a popup window control in Sunstone style.
* It extends [enyo.Popup]{@link http://enyojs.com/docs/latest/api/#enyo.Popup} and is designed to be used with
* {@link sun.ContextualButton}.
*
* @class sun.ContextualPopup
* @extends enyo.Popup
* @public
*/
enyo.kind(
	/** @lends sun.ContextualPopup.prototype */ {

	/**
	* @private
	*/
	name: "sun.ContextualPopup",

	/**
	* @private
	*/
	kind: "enyo.Popup",

	/**
	* @private
	*/
	classes: "sun-contextual-popup",

	/**
	* @private
	*/
	handlers: {
		onRequestShowPopup        : "requestShow",
		onRequestHidePopup        : "requestHide"
	},

	/**
	* @private
	*/
	defaultZ: 130,

	/**
	* @private
	*/
	floating:true,

	/**
	* @private
	*/
	modal: true,

	/**
	* @private
	*/
	showingChanged: enyo.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			if (this.showing) {
				this.applyZIndex();
			}
			this.adjustPosition();
		};
	}),

	/**
	* Performs control-specific tasks before/after showing {@link sun.ContextualPopup}.
	*
	* @private
	*/
	requestShow: function(inSender, inEvent) {
		// To prevent contextual menu animations on webos
		if (enyo.platform.platformName !== "webos") {
			this.removeClass("context-menu-effect nub-after-effect nub-before-effect");
		}
		var n = inEvent.activator.hasNode();
		this.activator = inEvent.activator;
		if (n) {
			this.activatorOffset = this.getPageOffset(n);
		}
		this.show();
		var classList = this.getClasses();
		// To prevent contextual menu animations on webos
		if (enyo.platform.platformName !== "webos") {
			if ((classList.search("iconType")) === -1) {
				this.addClass("option-menu-effect");
			}
			else{
				this.addClass("context-menu-effect nub-after-effect nub-before-effect");
			}
		}
		enyo.dom.addClass(document.body, "inner-popup-overflow-hidden");
		return true;
	},

	/**
	* @private
	*/
	requestHide: function(inSender, inEvent) {
		this.hide();
		enyo.dom.removeClass(document.body, "inner-popup-overflow-hidden");
		return true;
	},

	/**
	* @private
	*/
	getChildren: function(context, kind, retArrayData) {
		var i, length, children;
		children = context.children;
		length = children.length;

		for(i=0; i < length; i++) {
			if(children[i].kind === kind){
				retArrayData.push(children[i]);
			}
			if(children[i].children.length > 0) {
				this.getChildren(children[i], kind, retArrayData);
			}
		}
		return retArrayData;
	},

	/**
	* @private
	*/
	getPageOffset: function(inNode) {
		// getBoundingClientRect returns top/left values which are relative to the viewport and not absolute
		var r = inNode.getBoundingClientRect();

		var pageYOffset = (window.pageYOffset === undefined) ? document.documentElement.scrollTop : window.pageYOffset;
		var pageXOffset = (window.pageXOffset === undefined) ? document.documentElement.scrollLeft : window.pageXOffset;
		var rHeight = (r.height === undefined) ? (r.bottom - r.top) : r.height;
		var rWidth = (r.width === undefined) ? (r.right - r.left) : r.width;

		return {top: r.top + pageYOffset, left: r.left + pageXOffset, height: rHeight, width: rWidth};
	},

	/**
	* @private
	*/
	adjustPosition: function() {
		this.resetPositioning();

		if (this.showing && this.hasNode()) {
			var innerWidth = this.getViewWidth();
			var innerHeight = this.getViewHeight();
			var clientRect = this.getBoundingRect(this.node);
			var popupMargin = 15.5;
			if (this.activatorOffset.left <= innerWidth/2) {
				this.addClass("left");
				if (this.activatorOffset.top <= innerHeight/2) { // Activator : left/top, Popup down
					this.addClass('top');
					if (this.floating) {
						this.applyPosition({top: (this.activatorOffset.height+ popupMargin + this.activatorOffset.top)});
					} else {
						this.applyPosition({top: (this.activatorOffset.height+ popupMargin)});
					}
				} else { //Activator: left/bottom, Popup: Up
					this.addClass('bottom');
					if (this.floating) {
						this.applyPosition({top: -(clientRect.height + popupMargin) + this.activatorOffset.top});
					} else {
						this.applyPosition({top: -(clientRect.height + popupMargin)});
					}
				}
			}
			else {
				this.addClass("right");
				if (this.activatorOffset.top <= innerHeight/2) { // Activator: right/top, Popup: Up
					this.addClass('top');
					if (this.floating) {
						this.applyPosition({top: (this.activatorOffset.height+ popupMargin + this.activatorOffset.top)});
						this.applyPosition({left: (-(this.activatorOffset.width + (clientRect.width - this.activatorOffset.width))) + this.activatorOffset.width + this.activatorOffset.left});
					} else {
						this.applyPosition({top: (this.activatorOffset.height+ popupMargin)});
						this.applyPosition({left: (-(this.activatorOffset.width + (clientRect.width - this.activatorOffset.width))) + this.activatorOffset.width});
					}
				}
				else { // Activator: right/bottom, Popup: Down
					this.addClass('bottom');
					if (this.floating) {
						this.applyPosition({top: -(clientRect.height + popupMargin) + this.activatorOffset.top});
						this.applyPosition({left: this.activatorOffset.left + this.activatorOffset.width - clientRect.width});
					}else {
						this.applyPosition({top: -(clientRect.height + popupMargin)});
						this.applyPosition({left: (-(this.activatorOffset.width + (clientRect.width - this.activatorOffset.width))) + this.activatorOffset.width});
					}
				}
			}
			this.applyPosition({left: this.activatorOffset.left});
			this.resetPositioning();
		}
	},

	/**
	* @private
	*/
	resetPositioning: function() {
		this.removeClass("right");
		this.removeClass("left");
		this.removeClass("top");
		this.removeClass("bottom");
		this.removeClass("center");
	},

	/**
	* @private
	*/
	applyPosition: function(inRect) {
		var s = "";
		for (var n in inRect) {
			s += (n + ":" + inRect[n] + (isNaN(inRect[n]) ? "; " : "px; "));
		}
		this.addStyles(s);
	},

	/**
	* @private
	*/
	getBoundingRect:  function(inNode){
		// getBoundingClientRect returns top/left values which are relative to the viewport and not absolute
		var o = inNode.getBoundingClientRect();
		if (!o.width || !o.height) {
			return {
				left: o.left,
				right: o.right,
				top: o.top,
				bottom: o.bottom,
				width: o.right - o.left,
				height: o.bottom - o.top
			};
		}
		return o;
	},

	/**
	* @private
	*/
	getViewHeight: function() {
		return (window.innerHeight === undefined) ? document.documentElement.clientHeight : window.innerHeight;
	},

	/**
	* @private
	*/
	getViewWidth: function() {
		return (window.innerWidth === undefined) ? document.documentElement.clientWidth : window.innerWidth;
	},

	/**
	* @private
	*/
	applyZIndex: function() {
		this._zIndex = this.findZIndex()+1;
		this.applyStyle("z-index", this._zIndex);
	},

	/**
	* @private
	*/
	findZIndex: function() {
		// a default z value
		var z = this.defaultZ;
		if (this.defaultZ) {
			z = this.defaultZ;
		} else if (this.hasNode()) {
			// Re-use existing zIndex if it has one
			z = Number(enyo.dom.getComputedStyleValue(this.node, "z-index")) || z;
		}
		this._zIndex = z;
		return z;
	}
});
