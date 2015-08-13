/**
* _sun.ToastPopup_ is an [enyo.Popup]{@link http://enyojs.com/docs/latest/api.html#enyo.Popup}
* that appears at the bottom of the screen and disappears after a few seconds.
*
* @class sun.ToastPopup
* @extends enyo.Popup
* @public
*/
enyo.kind(
	/** @lends sun.ToastPopup.prototype */ {

	/**
	* @private
	*/
	name: "sun.ToastPopup",

	/**
	* @private
	*/
	kind: "enyo.Popup",

	/**
	* @private
	*/
	published: {
		/**
		* ToastPopup will be disappeared after milliseconds of showDuration.
		*
		* @type {Number}
		* @default 2000
		* @public
		*/
		showDuration: 2000
	},

	/**
	* @private
	*/
	classes: "sun sun-dark-gray sun-toastpopup inner-toastpopup",

	/**
	* @private
	*/
	tools: [
		{name: "client", classes: "sun-toastpopup-label"}
	],

	/**
	* @private
	*/
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.contentChanged();
		};
	}),

	/**
	* @private
	*/
	initComponents: enyo.inherit(function(sup) {
		return function() {
			this.createChrome(this.tools);
			sup.apply(this, arguments);
		};
	}),

	/**
	* @private
	*/
	contentChanged: function() {
		this.$.client.setContent(this.content);
	},

	/**
	* @private
	*/
	showingChanged: function() {
		if(enyo.dom.hasClass(document.body, "inner-popup-overflow-hidden")) {
			enyo.dom.removeClass(document.body, "inner-popup-overflow-hidden");
		}
		else {
			enyo.dom.addClass(document.body, "inner-popup-overflow-hidden");
		}
		this.adjustPosition();
		this.inherited(arguments);
	},

	/**
	* @private
	*/
	adjustPosition: function() {
		if (this.showing && this.hasNode()) {
			var position = window.innerWidth/2 - this.getBounds().width/2;
			this.applyStyle("left", position + "px");
		}
	},

	/**
	* @private
	*/
	handleResize: function() {
		this.adjustPosition();
		this.inherited(arguments);
	},

	/**
	* Shows the toast popup.
	* @public
	*/
	show: function() {
		this.requestHide();
		var classList = this.getClasses();
		if ((classList.search("sun-toast-popdown-effect")) !== -1) {
			this.removeClass("sun-toast-popdown-effect");
		}
		if ((classList.search("sun-toast-popdown-no-masking-effect"))!== -1) {
			this.removeClass("sun-toast-popdown-no-masking-effect");
		}
		if (enyo.platform.platformName !== "webos") {
			this.addClass("sun-toast-popup-effect");
		}
		this.inherited(arguments);
	},

	/**
	* @private
	*/
	requestHide: function() {
		this.startJob("hideJob", "hide", this.showDuration);
		return true;
	},

	/**
	* @private
	*/
	capturedTap: function(inSender, inEvent) {
		// dismiss on tap if property is set and click started & ended outside the popup
		if (this.autoDismiss && (!inEvent.dispatchTarget.isDescendantOf(this)) && this.downEvent &&
			(!this.downEvent.dispatchTarget.isDescendantOf(this))) {
			this.downEvent = null;
			this.hide();
		}
		return this.modal;
	}
});