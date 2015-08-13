(function (enyo, g, scope) {

	enyo.kind(
		/** @lends g.MenuItemBase.prototype */ {

		/**
		* @private
		*/
		name: "g.MenuItemBase",

		/**
		* @private
		*/
		kind: "g.Item",

		/**
		* @private
		*/
		classes: "g-menu-scroller-item",

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				var content;

				this.components = undefined;
				sup.apply(this, arguments);

				this.createComponents(this.tools);
			};
		}),

		/**
		* @private
		*/
		handlers: {
			ontap: "playFeedback"
		},

		/**
		* Play touch feedback sound when the menu item is tapped.
		*
		* @param {enyo.Component} inSender - The [enyo.Component]{@link http://enyojs.com/docs/latest/#/kind/enyo.Component} that most recently propagated the `event`.
		* @param {Object} inEvent - An `object` containing event information.
		* @public
		*/
		playFeedback: function(inSender, inEvent) {
			if (!inEvent || inEvent && !inEvent.preventSound) {
				g.playFeedback("touch");
				inEvent? inEvent.preventSound = true : inEvent;
			}
		}
	});

})(enyo, g, this);
