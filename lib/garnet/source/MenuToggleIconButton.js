(function (enyo, g, scope) {
	/**
	* _g.MenuToggleIconButton_ is {@link g.MenuScroller}'s item control that composed of text and a toggle button.
	* This control is referenced to use as a menu item which is need to be set with a toggle button in {@link g.MenuScroller}.
	*
	* @class g.MenuToggleIconButton
	* @extends g.MenuItemBase
	* @public
	* @example
	*	{kind: "g.MenuScroller",
		 components:[
		    {name: "item", kind: "g.MenuToggleIconButton", content: "Wifi", ...}
		]}
	*/
	enyo.kind(
		/** @lends g.MenuToggleIconButton.prototype */ {

		/**
		* @private
		*/
		name: "g.MenuToggleIconButton",

		/**
		* @private
		*/
		kind: "g.MenuItemBase",

		/**
		* @private
		*/
		published:
			/** @lends g.MenuToggleIconButton.prototype */ {

			/**
			* Indicates whether this MenuToggleIconButton is set or not.
			*
			* Range: [`true`, `false`]
			*
			* - `true`: This MenuToggleIconButton is set.
			* - `false`: This MenuToggleIconButton is not set.
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			value: false
		},

		/**
		* @private
		*/
		tools: [
			{name: "toggle",ontap: "itemTapped", classes: "g-menu-scroller-item-content",components:[
				{classes: "g-menu-scroller-item-check-title", components: [
					{name:"item", classes: "g-menu-scroller-item-title-content"}
				]},
				{name: "toggleIconButton", kind: "g.ToggleIconButton", src: "$lib/garnet/images/switch_list_transparent.svg", classes: "g-menu-scroller-item-checkbox"},
				{kind: 'Signals', onwebOSLaunch: "getLocaleInfo", onwebOSRelaunch: "getLocaleInfo", onwebOSLocaleChange: "getLocaleInfo"},
			]}
		],

		/**
		* @private
		*/
		bindings: [
			{from: ".content", to: ".$.item.content"},
			{from: ".allowHtml", to: ".$.item.allowHtml"},
			{from: ".value", to: ".$.toggleIconButton.value", oneWay: false}
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
				this.setAttribute("aria-pressed", this.value);
				this.setAttribute("tabindex", 0);
				this.$.item.setAttribute("tabindex", null);
			}
		}),

		/**
		* @private
		*/
		itemTapped: function() {
			this.setValue(!this.value);

			// Accessibility - update current state.
			this.setAttribute("aria-pressed", this.value);
		},

		/**
		* @private
		*/
		getLocaleInfo: function() {
			var req = new enyo.ServiceRequest();
			req.service = "luna://com.webos.settingsservice/getSystemSettings";
			req.go({"keys": ["localeInfo"]});
			req.response(this, this.updateButtonSrc);
		},

		/**
		* @private
		*/
		updateButtonSrc: function(inRequest, inResponse) {
			var locale = inResponse.settings.localeInfo.locales.UI;
			if(locale == "ko-KR" || locale == "en-UK" || locale == "en-US") {
				this.$.toggleIconButton.setSrc("$lib/garnet/images/switch_list_transparent.svg");
			} else {
				this.$.toggleIconButton.setSrc("$lib/garnet/images/switch_list_oi_transparent.svg");
			}
		}

	});

})(enyo, g, this);
