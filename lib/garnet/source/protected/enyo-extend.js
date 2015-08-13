(function (enyo, g, scope) {

	// To extend the hold pulse move tolerance
	enyo.gesture.drag.configureHoldPulse({
		frequency: 100,
		events: [
		    {name: 'hold', time: 100},
		    {name: 'longpress', time: 500}
		],
		endHold: 'onMove',
		moveTolerance: 324, // 18 pixel, 2mm (9.2px = 1mm)
		resume: false
	});

	// Set up Garnet's flick rule.
	enyo.gesture.drag.minFlick = 0.69; // 0.69px/1ms = 75mm/s (9.2px = 1mm)

	enyo.Control.extend(
		/** @lends enyo.Control.prototype */ {

		/**
		* AccessibilityLabel is used for accessibility voice readout.
		* when the control is focused, screen reader reads accessibilityLabel.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		accessibilityLabel : '',

		/**
		* AccessibilityAlert allows to set alert message.
		* if accessibilityAlert is true, screen reader reads control label
		* immediately without focus.
		*
		* Range: [`true`, `false`]
		* - true: screen reader reads control label immediately.
		* - false: screen reader reads control label with focus.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		accessibilityAlert : false,

		/**
		* @method
		* @private
		*/
		flow: enyo.inherit(function (sup) {
			return function (props) {
				sup.apply(this, arguments);
				this.initAccessibility();
			};
		}),

		/**
		* @method
		* @private
		*/
		initAccessibility: enyo.inherit(function(sup) {
			return function() {
				if (!this.getAttribute("role")) {
					this.accessibilityAlertChanged();
				}
				if (!this.getAttribute("aria-label")) {
					this.accessibilityLabelChanged();
				}
			};
		}),

		/**
		* Assigns an attribute to a control's [node]{@glossary Node}. Assigning
		* `name` a value of `null`, `false`, or the empty string `("")` will remove
		* the attribute from the node altogether. But in case of 'aria-pressed' and 'aria-checked'
		* false value is meaningful, so except these cases.
		*
		* @param {String} name - Attribute name to assign/remove.
		* @param {(String|Number|null)} value - The value to assign to `name`
		* @returns {this} Callee for chaining.
		* @public
		*/
		setAttribute: function (name, value) {
			var attrs = this.attributes,
				node = this.hasNode(),
				delegate = this.renderDelegate || enyo.Control.renderDelegate;

			if (name) {
				attrs[name] = value;
				if (node) {
					if (value == null || value === false || value === '') {
						if (name == 'aria-pressed' || name == 'aria-checked') {
							node.setAttribute(name, value);
						} else {
							node.removeAttribute(name);
						}
					} else node.setAttribute(name, value);
				} else delegate.invalidate(this, 'attributes');
			}

			return this;
		},

		/**
		* @method
		* @private
		*/
		contentChanged: enyo.inherit(function (sup) {
			return function (control) {
				sup.apply(this, arguments);
				this.accessibilityLabelChanged();
			};
		}),

		/**
		* @method
		* @private
		*/
		accessibilityLabelChanged: enyo.inherit(function (sup) {
			return function (control) {
				var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;

				sup.apply(this, arguments);
				if (this.accessibilityLabel) {
					this.setAttribute('tabindex', 0);
					this.setAttribute('aria-label', this.allowHtml? this.accessibilityLabel.replace(tags, " ") : this.accessibilityLabel);
					this.setAttribute('aria-labelledby', null);
				} else if (this.content) {
					this.setAttribute('tabindex', 0);
					this.setAttribute('aria-label', this.allowHtml? this.content.replace(tags, " ") : this.content);
				}
			};
		}),

		/**
		* @method
		* @private
		*/
		accessibilityAlertChanged: enyo.inherit(function (sup) {
			return function (control) {
				sup.apply(this, arguments);
				if (this.accessibilityAlert) {
					this.setAttribute('role', 'alert');
					this.setAttribute('tabindex', 0);
					if (!this.accessibilityLabel && !this.content) {
						this.setAttribute('aria-labelledby', this.id);
					}
				} else {
					this.setAttribute('role', 'heading');
				}
			};
		}),

		/**
		* Get the accessibilityAlert value true or false.
		*
		* @returns {Boolean} return accessibilityAlert status.
		* @public
		*/
		getAccessibilityAlert: function () {
			return this.accessibilityAlert;
		},

		/**
		* Set the accessibilityAlert to true or false.
		* If accessibilityAlert is true, screen reader reads control label
		* immediately without focus.
		*
		* @param {Boolean} accessibilityAlert - if true, screen reader reads control label immediately.
		* @returns {this} callee for chaining.
		* @public
		*/
		setAccessibilityAlert: function (accessibilityAlert) {
			var was = this.accessibilityAlert;
			this.accessibilityAlert = accessibilityAlert;

			if (was != accessibilityAlert) {
				this.notify('accessibilityAlert', was, accessibilityAlert);
			}
			return this;
		},

		/**
		* Get the getAccessibilityLabel text.
		*
		* @returns {String} return accessibilityLabel.
		* @public
		*/
		getAccessibilityLabel: function () {
			return this.accessibilityLabel;
		},

		/**
		* Set the accessibilityLabel with label text.
		* when the control is focused, screen reader reads accessibilityLabel.
		*
		* @param {Boolean} accessibilityLabel - text to readout by screen reader.
		* @returns {this} callee for chaining.
		* @public
		*/
		setAccessibilityLabel: function (accessibilityLabel) {
			var was = this.accessibilityLabel;
			this.accessibilityLabel = accessibilityLabel;

			if (was != accessibilityLabel) {
				this.accessibilityLabelChanged();
			}
			return this;
		}
	});

	/**
	* _enyo.readAlert_ is the API to use TTS for accessibility VoiceReadout.
	*
	* @private
	*/
	enyo.readAlert = function(s) {

		if (window.webOS !== undefined && webOS.voicereadout !== undefined) {
			webOS.voicereadout.readAlert(s);
		}

	};

})(enyo, g, this);
