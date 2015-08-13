(function (enyo, g, scope) {
	/**
	* _g.Button_ is a button in Garnet style.
	* _g.Button_ has no default width. If the button width is not defined,
	* the button width is determined by the length of the text in the button, and positioning CSS styles become ineffective.
	* If positioning is required, set the width of the button.
	*
	* @class g.Button
	* @extends g.ButtonIconBase
	* @public
	*/
	enyo.kind(
		/** @lends g.Button.prototype */ {

		/**
		* @private
		*/
		name: "g.Button",

		/**
		* @private
		*/
		kind: "g.ButtonIconBase",

		/**
		* @private
		*/
		tag: "button",

		/**
		* @private
		*/
		classes: "g-button g-button-text",

		/**
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function(sup) {
			return function() {
				if (!(this.components && this.components.length > 0)) {
					this.createComponent({
						name: "client",
						classes: "g-button-client",
						isChrome: true
					});
				}
				sup.apply(this, arguments);
			};
		}),

		/**
		* Override to handle potential child components.
		*
		* @method
		* @private
		*/
		contentChanged: enyo.inherit(function(sup) {
			return function() {
				if (this.$.client) {
					this.$.client.setContent(this.getContent());

					// accessibility - add content with aria-label if accessibilityLabel isn't set.
					if (this.accessibilityLabel === '') {
						this.setAttribute("aria-label", this.getContent());
					}
				} else {
					sup.apply(this, arguments);
				}
			};
		}),

		/**
		* Accessibility : initialize
		*
		* @method
		* @private
		*/
		initAccessibility: enyo.inherit(function (sup) {
			return function () {
				sup.apply(this, arguments);
				if (this.$.client) {
					this.$.client.setAttribute('role', 'button');
					this.$.client.setAttribute("aria-disabled", this.disabled);
				}
			};
		}),

		/**
		* Accessibility
		*
		* @method
		* @private
		*/
		accessibilityLabelChanged: enyo.inherit(function (sup) {
			return function (control) {
				sup.apply(this, arguments);
				if (this.$.client) {
					this.$.client.setAccessibilityLabel(this.accessibilityLabel);
				}
			};
		}),

		/**
		* @private
		*/
		_effectDisabled: function() {
			this.setAttribute("disabled", this.disabled);
		},
	});

})(enyo, g, this);
