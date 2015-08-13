/**
* _sun.Checkbox_ shows or hides a checkmark and fires the
* [onActivate]{@link http://enyojs.com/docs/latest/api/#enyo.Checkbox::events} event, when tapped.
* It extends [enyo.Checkbox]{@link http://enyojs.com/docs/latest/api/#enyo.Checkbox} and
* is designed to be used with  {@link sun.CheckboxItem}.
*
* @ui
* @class sun.Checkbox
* @extends enyo.Checkbox
* @public
*/
enyo.kind(
	/** @lends sun.Checkbox.prototype */ {

	/**
	* @private
	*/
	name: "sun.Checkbox",

	/**
	* @private
	*/
	kind: enyo.Checkbox,

	/**
	* @private
	*/
	handlers: {

		/**
		* _ondown_ simulates _mousedown_.
		* @private
		*/
		ondown: "eventDown",

		/**
		* _onup_ simulates _mouseup_.
		* @private
		*/
		onup: "eventUp",

		/**
		* Also make sure we remove the pressed class if touch point is left from
		* this item before it receives a keyup.
		* @private
		*/
		onleave: "eventUp",

		/**
		* prevent double onchange bubble in IE
		* @private
		*/
		onclick: ""
	},

	/**
	* @private
	*/
	tag: "div",

	/**
	* @private
	*/
	classes: "sun-checkbox",

	/**
	* Set pressed property.
	* @private
	*/
	pressedChanged: function() {
		this.setAttribute("pressed", this.pressed ? "pressed" : "");
	},

	/**
	* @fires enyo.Checkbox#event:ondown
	* @private
	*/
	eventDown: function() {
		this.set("pressed", true);
	},

	/**
	* @fires enyo.Checkbox#event:onup
	* @private
	*/
	eventUp: function() {
		this.set("pressed", false);
	},

	/**
	* @fires enyo.Checkbox#event:onChange
	* @private
	*/
	tap: function() {
		this.set("pressed", false);
		if (!this.disabled) {
			this.setChecked(!this.getChecked());
			this.bubble("onchange");
		}
		return !this.disabled;
	}
});
