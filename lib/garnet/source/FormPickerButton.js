(function (enyo, g, scope) {
	/**
	* _g.FormPickerButton_ is a button that launches a picker.
	*
	* @class g.FormPickerButton
	* @extends g.Button
	* @public
	*/
	enyo.kind(
		/** @lends g.FormPickerButton.prototype */ {

		/**
		* @private
		*/
		name: "g.FormPickerButton",

		/**
		* @private
		*/
		kind: "g.Button",

		/**
		* @private
		*/
		classes: "g-form-picker-button",

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

					// accessibility - Add content with aria-label if accessibilityLabel isn't set.
					if (this.accessibilityLabel === "") {
						this.setAttribute("aria-label", g.$L({key: "g_picker_button", value: "picker button"}) + " " + this.getContent());
						this.$.client.setAttribute("aria-label", g.$L({key: "g_picker_button", value: "picker button"}) + " " + this.getContent());
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
				this.setAttribute("role", "heading");
				this.setAttribute("tabindex", 0);
				if (this.$.client) {
					this.$.client.setAttribute("role", "heading");
					this.$.client.setAttribute("aria-label", g.$L({key: "g_picker_button", value: "picker button"}) + " " + this.getContent());
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
				this.setAttribute("aria-label", g.$L({key: "g_picker_button", value: "picker button"}) + " " + this.accessibilityLabel);
				if (this.$.client) {
					this.$.client.setAccessibilityLabel(g.$L({key: "g_picker_button", value: "picker button"}) + " " + this.accessibilityLabel);
				}
			};
		}),
	});

})(enyo, g, this);
