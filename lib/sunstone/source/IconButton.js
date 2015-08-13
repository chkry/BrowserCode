/**
* _sun.IconButton_ is an icon that acts like a button. Specify the icon image by setting
* the [src]{@link sun.Icon#src} property to the image file URL; this type of icon is called image-based icon.
*
* ```
* {kind: "sun.IconButton", src: "images/search.png"}
* ```
*
* To combine an icon with text inside of a button, use
* [sun.Icon]{@link sun.Icon} inside [sun.Button]{@link sun.Button} instead.
*
* Sunstone supports two ways for displaying icons; image-based icon and asset-based icon.
* Asset-based icons use preloaded icon images by setting the [icon]{@link sun.Icon#icon}
* property to the pre-defined icon name, e.g.
*
* ```
* {kind: "sun.IconButton", icon: "setting"}
* ```
*
* See [sun.Icon]{@link sun.Icon} for more information
* on the available asset-based icons, as well as specifications for icon image assets.
*
* @ui
* @class sun.IconButton
* @extends sun.Icon
* @public
*/
enyo.kind(
	/** @lends sun.IconButton.prototype */ {

	/**
	* @private
	*/
	name: "sun.IconButton",

	/**
	* @private
	*/
	kind: "sun.Icon",

	/**
	* @private
	*/
	published: /** @lends sun.IconButton.prototype */ {

		/**
		* Use when the `sun.IconButton` is part of an
		* [enyo.Group]{@link http://enyojs.com/docs/latest/api/#enyo.Group}.
		* If `true`, this `sun.IconButton` is the active button in the group.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		active: false,

		/**
		* Button size. See [sun.Icon]{@link sun.Icon} for the size specification.
		*
		* @type {String}
		* @default "normal"
		* @public
		*/
		size: "normal"
	},

	/**
	* @private
	*/
	handlers: {

		/**
		* _ondown_ simulates _mousedown_.
		* @private
		*/
		ondown : 'depress',

		/**
		* _onup_ simulates _mouseup_.
		* @private
		*/
		onup : 'undepress',

		/**
		* Also make sure we remove the pressed class if touch point is left from
		* this item before it receives a keyup.
		* @private
		*/
		onleave : 'undepress'
	},

	/**
	* @private
	*/
	classes: "sun-icon-button",

	/**
	* @private
	*/
	create: enyo.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
		};
	}),

	/**
	* @private
	*/
	disabledChanged: function() {
		this.setAttribute("disabled", this.disabled);
	},

	/**
	* waterfall event
	* @fires enyo.Control#event:ontap
	* @private
	*/
	tap: function() {
		if (this.disabled) {
			return true;
		}
		this.setActive(true);
		this.addClass('button-effect');
	},

	/**
	* @private
	*/
	activeChanged: function() {
		this.bubble("onActivate");
	},

	/**
	* Adds _pressed_ CSS class.
	* @private
	*/
	depress: function() {
		this.addClass("pressed");
	},

	/**
	* Removes _pressed_ CSS class.
	* @private
	*/
	undepress: function() {
		this.removeClass('pressed');
	}
});
