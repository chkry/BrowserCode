(function (enyo, g, scope) {
	/**
	* _g.FormInput_ is an input control in Garnet style. It extends [enyo.Input]{@link http://enyojs.com/docs/latest/#/kind/enyo.Input}.
	*
	* @class g.FormInput
	* @extends enyo.Input
	* @public
	*/
	enyo.kind(
		/** @lends g.FormInput.prototype */{

		/**
		* @private
		*/
		name: "g.FormInput",

		/**
		* @private
		*/
		kind: "enyo.Input",

		/**
		* @private
		*/
		classes: "g-form-input",

		/**
		* @private
		*/
		published:
			/** @lends g.FormInput.prototype */ {

			/**
			* Indicates whether to blur when this FormInput is focused _and_ the Enter key is pressed.
			* If `true`, this FormInput blurs when this FormInput is focused _and_ the Enter key is pressed.
			*
			* Range: [`true`, `false`]
			*
			* - `true`: This FormInput blurs on the Enter key press.
			* - `false`: This FormInput does not blur on the Enter key press.
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			dismissOnEnter: false
		},

		/**
		* @private
		*/
		handlers: {
			onkeypress : 'onKeyUp',
			onblur     : 'onBlur',
			onfocus    : 'onFocus'
		},

		/**
		* Accessibility : initialize
		*
		* @method
		* @private
		*/
		initAccessibility: enyo.inherit(function (sup) {
			return function () {
				sup.apply(this, arguments);
				this.setAttribute("role", null);
			};
		}),

		/**
		* @method
		* @private
		*/
		disabledChanged: enyo.inherit(function (sup) {
			return function () {
				sup.apply(this, arguments);

				// accessibility - add disabled status.
				this.setAttribute("aria-disabled", this.disabled);
			};
		}),

		/**
		* @private
		*/
		_bFocused: false, // Used only for dismissOnEnter feature, cannot rely on hasFocus in this case because of racing condition

		/**
		* @private
		*/
		onFocus: function(inSender, inEvent) {
			if (this.dismissOnEnter) {
				var oThis = this;
				enyo.asyncMethod(this, function() {oThis._bFocused = true;});
			} else {
				this.playFeedback(inSender, inEvent);
			}
		},

		/**
		* play the touch feedback sound when the formInput is focused
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
		},

		/**
		* @private
		*/
		onBlur: function() {
			if (this.dismissOnEnter) {
				this._bFocused = false;
			}
		},

		/**
		* @private
		*/
		onKeyUp: function(oSender, oEvent) {
			if (this.dismissOnEnter) {
				if (oEvent.keyCode == 13) {
					if (this._bFocused) {
						this.blur();
					}
				}
			}
		},

		/**
		* @private
		*/
		blur: function() {
			if (this.hasNode()) {
				this.node.blur();
			}
		},

		/**
		* @private
		*/
		left: function() {
			if (!this.hasNode() || this.node.selectionStart === 0) {
				return false;
			}
			return true;
		},

		/**
		* @private
		*/
		right: function() {
			if (!this.hasNode() || this.node.selectionStart == this.node.value.length) {
				return false;
			}
			return true;
		},

		/**
		* @private
		*/
		up: function() {
			return false;
		},

		/**
		* @private
		*/
		down: function() {
			return false;
		},

		// note: we allow dragging of an input to allow scrolling on Panel
		/**
		* @private
		*/
		dragstart: function () {
			return false;
		}
	});

})(enyo, g, this);
