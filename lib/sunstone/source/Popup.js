/**
* _sun.Popup_ is an [enyo.Popup]{@link http://enyojs.com/docs/latest/api.html#enyo.Popup}
* that appears at the center of the screen.
*
* @class sun.Popup
* @extends enyo.Popup
* @public
*/
enyo.kind(
	/** @lends sun.Popup.prototype */ {

	/**
	* @private
	*/
	name: "sun.Popup",

	/**
	* @private
	*/
	kind: "enyo.Popup",

	/**
	* @private
	*/
	modal     : true,

	/**
	* @private
	*/
	floating  : true,

	/**
	* @private
	*/
	_bounds   : null,

	/**
	* @private
	*/
	handlers: {
		onRequestScrollIntoView   : "_preventEventBubble"
	},

	/**
	* @private
	*/
	published: /** @lends sun.Popup.prototype */ {

		/**
		* Indicates whether or not to display a scrim when the popup dialog is modal.
		* If `true`, `sun.Scrim` provides a transparent (i.e., invisible) overlay
		* that prevents propagation of tap events.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		scrimWhenModal: true,

		/**
		* Indicates whether or not to display a scrim.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		scrim: true,

		/**
		* CSS class name to apply to the scrim. This property is optional. Be aware that the scrim is a singleton,
		* thus modifying this affects the scrim instance used for other popups.
		*
		* @type {String}
		* @default ""
		* @public
		*/
		scrimClassName: ""
	},

	/**
	* @private
	*/
	tools: [
		{name: "client", classes:"enyo-fill"}
	],

	/**
	* @private
	*/
	statics: { count: 0 },

	/**
	* @private
	*/
	defaultZ: 120,

	/**
	* @private
	*/
	classes: "sun sun-dark-gray sun-popup inner-popup",

	/**
	* @private
	*/
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
		};
	}),

	/**
	* Creates chrome
	*
	* @private
	*/
	initComponents: enyo.inherit(function(sup) {
		return function() {
			this.createComponents(this.tools, {owner: this});
			sup.apply(this, arguments);
		};
	}),

	/**
	* Renders _sun.Popup_, extending enyo.Popup
	*
	* @private
	*/
	render: enyo.inherit(function(sup) {
		return function() {
			this.allowHtmlChanged();
			this.contentChanged();
			sup.apply(this, arguments);
		};
	}),

	/**
	* @private
	*/
	rendered: enyo.inherit(function(sup) {
		return function() {
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
	allowHtmlChanged: function() {
		this.$.client.setAllowHtml(this.allowHtml);
	},

	/**
	* @private
	*/
	showingChanged: function() {
		if (this.showing) {
			sun.Popup.count++;
			this.applyZIndex();
		}
		else {
			if(sun.Popup.count > 0) {
				sun.Popup.count--;
			}
		}

		this.inherited(arguments);
		this.showHideScrim(this.showing);
	},

	/**
	* Overrides the default _getShowing()_ behavior to avoid setting _this.showing_ based on the
	* CSS _display_ property.
	*
	* @private
	*/
	getShowing: function() {
		this.inherited(arguments);
	},

	/**
	* @private
	*/
	showHideScrim: function(inShow) {
		if (this.floating && (this.scrim || (this.modal && this.scrimWhenModal))) {
			var scrim = this.getScrim();
			if (inShow && this.modal && this.scrimWhenModal) {
				// move scrim to just under the popup to obscure rest of screen
				var i = this.getScrimZIndex();
				this._scrimZ = i;
				scrim.showAtZIndex(i);
			} else {
				scrim.hideAtZIndex(this._scrimZ);
			}
			enyo.call(scrim, "addRemoveClass", [this.scrimClassName, scrim.showing]);
		}
	},

	/**
	* @private
	*/
	getScrimZIndex: function() {
		// Position scrim directly below popup
		return this.findZIndex()-1;
	},

	/**
	* @private
	*/
	getScrim: function() {
		// show a transparent scrim for modal popups if scrimWhenModal is true
		// if scrim is true, then show a regular scrim.
		if (this.modal && this.scrimWhenModal && !this.scrim) {
			return sun.scrimTransparent.make();
		}
		return sun.scrim.make();
	},

	/**
	* @private
	*/
	applyZIndex: function() {
		// Adjust the zIndex so that popups will properly stack on each other.
		this._zIndex = sun.Popup.count * 2 + this.findZIndex() + 1;
		// leave room for scrim
		this.applyStyle("z-index", this._zIndex);
	},

	/**
	* @private
	*/
	findZIndex: function() {
		// a default z value
		var z = this.defaultZ;
		if (this._zIndex) {
			z = this._zIndex;
		} else if (this.hasNode()) {
			// Re-use existing zIndex if it has one
			z = Number(enyo.dom.getComputedStyleValue(this.node, "z-index")) || z;
		}
		this._zIndex = z;
		return this._zIndex;
	},

	/**
	* @private
	*/
	_preventEventBubble: function(inSender, inEvent) {
		return true;
	}
});