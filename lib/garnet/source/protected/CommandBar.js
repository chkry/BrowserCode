(function (enyo, scope) {
/**
* _g.CommandBar_ is a button or a button set composed of one or two buttons.
* The position of this button/button set is always the bottom of the screen.
*
* @class g.CommandBar
* @private
*/
enyo.kind(
	/** @lends g.CommandBar.prototype */ {

	/**
	* @private
	*/
	name: "g.CommandBar",

	/**
	* @private
	*/
	classes: "enyo-children-inline g-command-bar",

	/**
	* @private
	*/
	defaultKind: "g.IconButton",

	/**
	* @private
	*/
	handlers: {
		ontap: "preventSound"
	},

	/**
	* Set the inEvent.preventSound as true to prevent to play feedback sound when tapping command bar area.
	*
	* @private
	*/
	preventSound: function(inSender, inEvent) {
		inEvent.preventSound = true;
	}
});

})(enyo, this);
