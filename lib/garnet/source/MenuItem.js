(function (enyo, g, scope) {
	/**
	* _g.MenuItem_ is {@link g.MenuScroller}'s item control that display text only.
	* This control is referenced to use as a menu item in {@link g.MenuScroller}.
	*
	* @class g.MenuItem
	* @example
	*	{kind: "g.MenuScroller",
	*	components:[
	*	    {name: "item", kind: "g.MenuItem", content: "Share", ...}
	*	]}
	*
	*/
	enyo.kind(
		/** @lends g.MenuItem.prototype */ {

		/**
		* @private
		*/
		name: "g.MenuItem",

		/**
		* @private
		*/
		kind: "g.MenuItemBase",

		/**
		* @private
		*/
		published:
			/** @lends g.MenuItem.prototype */ {

			/**
			* Indicates whether single line is used for MenuItem or not.
			*
			* Range: [`true`, `false`]
			*
			* - true: This MenuItem is single line.
			* - false: This MenuItem is two-line.
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			singleLine: false
		},

		/**
		* @private
		*/
		tools: [
			{name: "normal", classes: "g-menu-scroller-item-content",components:[
				{classes: "g-menu-scroller-item-title", components: [
					{name: "item", classes: "g-menu-scroller-item-title-content"}
				]}
			]}
		],

		/**
		* @private
		*/
		bindings: [
			{from: ".content", to: ".$.item.content"},
			{from: ".allowHtml", to: ".$.item.allowHtml"}
		],

		/**
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.singleLineChanged();
			};
		}),

		/**
		* @private
		*/
		singleLineChanged: function() {
			if(this.singleLine) {
				this.$.item.addClass("singleline");
			} else {
				this.$.item.removeClass("singleline");
			}
		},

		/*
		* Accessibility : initialize
		*
		* @method
		* @private
		*/
		initAccessibility: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				if (this.$.item && this.accessibilityLabel) {
					this.$.item.setAttribute("aria-label", this.accessibilityLabel);
				}
			};
		}),

		/*
		* Accessibility
		*
		* @method
		* @private
		*/
		accessibilityLabelChanged: enyo.inherit(function (sup) {
			return function (control) {
				sup.apply(this, arguments);
				if (this.$.item && this.accessibilityLabel) {
					this.$.item.setAttribute("aria-label", this.accessibilityLabel);
				}
			};
		})
	});

})(enyo, g, this);
