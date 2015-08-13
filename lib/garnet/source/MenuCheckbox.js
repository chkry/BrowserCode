(function (enyo, g, scope) {
	/**
	* _g.MenuCheckbox_ is [g.MenuScroller]{@link g.MenuScroller}'s item control 
	* that is composed of text and a checkbox.
	* This control is referenced to use as a menu item to be checked in [g.MenuScroller]{@link g.MenuScroller}.
	*
	* @class g.MenuCheckbox
	* @public
	* @example
	*	{kind: "g.MenuScroller",
	*	 components:[
	*	    {name: "item", kind: "g.MenuCheckbox", content: "Share", ...}
	*	]}
	*/
	enyo.kind(
		/** @lends g.MenuCheckbox.prototype */ {

		/**
		* @private
		*/
		name: "g.MenuCheckbox",

		/**
		* @private
		*/
		kind: "g.MenuItemBase",

		/**
		* @private
		*/
		published:
			/** @lends g.MenuCheckbox.prototype */ {

			/**
			* Indicates if this checkbox is checked or not.
			*
			* Range: [`true`, `false`]
			*
			* - `true`: This MenuCheckbox is checked
			* - `false`: This MenuCheckbox is unchecked
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			checked: false
		},

		/**
		* @private
		*/
		tools: [
			{name: "check", ontap: "itemTapped", classes: "g-menu-scroller-item-content",components:[
				{classes: "g-menu-scroller-item-check-title", components: [
					{name:"item", classes: "g-menu-scroller-item-title-content"}
				]},
				{name:"checkbox", kind:"g.Checkbox", classes: "g-menu-scroller-item-checkbox", onchange: "checkboxChanged"}
			]}
		],

		/**
		* @private
		*/
		bindings: [
			{from: ".content", to: ".$.item.content"},
			{from: ".allowHtml", to: ".$.item.allowHtml"},
			{from: ".checked", to: ".$.checkbox.checked", oneWay: false}
		],

		/**
		* Accessibility : initialize
		*
		* @method
		* @private
		*/
		initAccessibility: enyo.inherit(function (sup) {
			return function (control) {
				sup.apply(this, arguments);
				this.setAttribute("role", "checkbox");
				this.setAttribute("aria-checked", this.checked);
				this.setAttribute("tabindex", 0);
				this.$.item.setAttribute("tabindex", null);
			}
		}),

		/**
		* @private
		*/
		itemTapped: function() {
			this.setChecked(!this.checked);
			this.bubble("onchange");

			// Accessibility - update current state.
			this.setAttribute("aria-checked", this.checked);
		},

		/**
		* @private
		*/
		checkboxChanged: function() {
			// Accessibility - update current state.
			this.setAttribute("aria-checked", this.checked);
		}

	});

})(enyo, g, this);
