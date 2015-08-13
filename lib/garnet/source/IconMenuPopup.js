(function (enyo, g, scope) {
	/**
	* _g.IconMenuPopupButton_ is a button that is used only for `g.IconMenuPopup`.
	*
	* @class g.IconMenuPopupButton
	* @extends g.IconButton
	* @private
	*/
	enyo.kind(
		/** @lends g.IconMenuPopupButton.prototype */ {

		/**
		* @private
		*/
		name: "g.IconMenuPopupButton",

		/**
		* @private
		*/
		kind: "g.IconButton",

		/**
		* @private
		*/
		classes: "g-popup-iconmenu-button"
	});

	/**
	* _g.IconMenuPopup_ is a popup control that contains a number of buttons in the center.
	*
	* @class g.IconMenuPopup
	* @extends g.Popup
	* @public
	*/
	enyo.kind(
		/** @lends g.IconMenuPopup.prototype */ {

		/**
		* @private
		*/
		name: "g.IconMenuPopup",

		/**
		* @private
		*/
		kind: "g.Popup",

		/**
		* @private
		*/
		published:
			/** @lends g.IconMenuPopup.prototype */ {

			/**
			* Indicates whether to display the Close button for this popup.
			* If `true`, the Close button is displayed.
			*
			* Range: [`true`, `false`]
			* - true: The Close button is visible.
			* - false: The Close button is hidden.
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			showCloseButton: true
		},

		/**
		* Indicates whether to close this popup when the HOME key is pressed.
		* If `true`, the this popup gets closed by the HOME key press.
		*
		* Range: [`true`, `false`]
		*
		* - `true`: This popup closes by pressing the HOME key.
		* - `false`: This popup does not close by pressing the HOME key.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		closedByHomeKey: true,

		/**
		* `buttonComponents` contains the buttons placed in this popup. Its `defaultKind` is {@link g.IconMenuPopupButton}.
		* Up to three buttons can be added.
		*
		* @type {Array}
		* @default []
		* @public
		* @example 	buttonComponents: [
		* 	{name: "1st", src: "assets/icon1.png"},
		* 	{name: "2nd", src: "assets/icon2.png"
		* }]
		*/
		buttonComponents: [],

		/**
		* @private
		*/
		tools: [
			// accessibility for cancel button
			{name: "closeButton", kind: "g.IconButton", accessibilityLabel: g.$L({key: "g_cancel", value: "cancel"}), src: "$lib/garnet/images/btn_cancel.svg", classes: "g-popup-close", ontap: "closeIconMenuPopup", showing: false},
			{kind: "Signals", onvisibilitychange: "visibilityChanged"}
		],

		/**
		* @private
		*/
		classes: "g-popup-iconmenu g-layout-absolute-wrapper",

		/**
		* @private
		*/
		centered: true,

		/**
		* @private
		*/
		floating: true,

		/**
		* @private
		*/
		handlers: {
			onflick: "preventDrag",
			ondragstart: "preventDrag",
			ondrag: "preventDrag"
		},

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				if (this.buttonComponents) {
					// maximun button count is 3
					var max = 3;
					if (this.buttonComponents.length > max) {
						var bc = this.buttonComponents.slice(0, max);
						this.buttonComponents = bc;
					}

					// create button components
					var hc = enyo.constructorForKind(this.kind).prototype.buttonComponents,
						hcOwner = (hc == this.buttonComponents) ? this : this.getInstanceOwner(),
						iconSize = 82;

					this.createComponent({
						name: "container",
						defaultKind: "g.IconMenuPopupButton",
						classes: "container"
					});

					this.addClass("icon-" + this.buttonComponents.length + "-buttons");
					this.$.container.createComponents(this.buttonComponents, {owner: hcOwner});
				}
			};
		}),

		/**
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.createComponents(this.tools, {owner: this});
			};
		}),

		/**
		* @method
		* @private
		*/
		showingChanged: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				if (this.showing) {
					this._configCloseButton();
				}
			};
		}),

		/**
		* @private
		*/
		preventDrag: function() {
			return true;
		},

		/**
		* Removes focus style from _closeButton_ and hides the _moon.Popup_.
		*
		* @private
		*/
		closeIconMenuPopup: function(inSender, inEvent) {
			if (this.$.closeButton) {
				this.$.closeButton.removeClass("pressed");
			}
			this.hide();
		},

		/**
		* @private
		*/
		visibilityChanged: function() {
			if (this.showing && this.closedByHomeKey && document.webkitHidden /*when the app is closing*/) {
				this.hide();
			}
		},

		/**
		* Determines whether to display _closeButton_.
		*
		* @private
		*/
		_configCloseButton: function() {
			if (!this.$.closeButton) { return; }

			if (this.showCloseButton != this.$.closeButton.getShowing()) {
				this.$.closeButton.setShowing(this.showCloseButton);
				this.addRemoveClass("reserve-close", this.showCloseButton);
				if (this.generated) {
					this.resized();
				}
			}
		}
	});

})(enyo, g, this);
