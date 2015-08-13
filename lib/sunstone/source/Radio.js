/**
* _sun.Radio_ extends [enyo.Checkbox]{@link http://enyojs.com/docs/latest/api.html#enyo.Checkbox},
* and is designed to be used with {@link sun.RadioItem}.
*
* @class sun.Radio
* @extends enyo.Checkbox
* @public
*/
enyo.kind(
	/** @lends sun.Radio.prototype */{

	/**
	* @private
	*/
	name: "sun.Radio",

	/**
	* @private
	*/
	kind: enyo.Checkbox,

	/**
	* @private
	*/
	classes: "sun-radio",

	/**
	* @private
	*/
	published:
		/** @lends sun.Radio.prototype */ {

		/**
		* @private
		*/
		type: "radio"
	},

	/**
	* @private
	*/
	handlers: {
		ondown: "eventDown",
		onup: "eventUp",
		onleave: "eventUp",
		// prevent double onchange bubble in IE
		onclick: ""
	},

	/**
	* @private
	*/
	tag: "div",

	/**
	* @private
	*/
	pressedChanged: function() {
		this.setAttribute("pressed", this.pressed ? "pressed" : "");
	},

	/**
	* @private
	*/
	eventDown: function() {
		this.set("pressed", true);
	},

	/**
	* @private
	*/
	eventUp: function() {
		this.set("pressed", false);
	},

	/**
	* @private
	*/
	tap: function() {
		this.set("pressed", false);
		if (!this.disabled && !this.getChecked()) {
			this.setChecked(!this.getChecked());
			this.bubble("onchange");
		}
		return !this.disabled;
	},

	/**
	* @private
	*/
	dragstart: function() {
		// Override enyo.Input dragstart handler, to allow drags to propagate for Checkbox
	}
});

