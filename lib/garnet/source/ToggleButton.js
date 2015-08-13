(function (enyo, g, scope) {
	/**
	* Fired when this ToggleButton is tapped, i.e. when the [value]{@link g.ToggleButton#value} property of this ToggleButton is changed.
	* If the [value]{@link g.ToggleButton#value} is changed programmatically (i.e. without user action),
	* this event is not fired. _inEvent.value_ contains the [value]{@link g.ToggleButton#value} of this ToggleButton.
	*
	* @event g.ToggleButton#onChange
	* @type {Object}
	* @property {Object} sender - The [component]{@link http://enyojs.com/docs/latest/#/kind/enyo.Component} that most recently propagated the event.
	* @property {Object} event - An object containing the event information.
	* @public
	*/

	/**
	* _g.ToggleButton_ extends {@link g.Button}.
	* _g.ToggleButton_ acts like a toggle switch and has value states "on" and "off".
	* When the ToggleButton is tapped, it switches its state
	* and fires the [onChange]{@link g.ToggleButton#event:onChange} event.
	*
	* @class g.ToggleButton
	* @extends g.Button
	* @public
	*/
	enyo.kind(
		/** @lends g.ToggleButton.prototype */ {

		/**
		* @private
		*/
		name: "g.ToggleButton",

		/**
		* @private
		*/
		kind: "g.Button",

		/**
		* @private
		*/
		published:
			/** @lends g.ToggleButton.prototype */ {

			/**
			* Indicates whether this ToggleButton is currently in the "on" state.
			*
			* Range: [`true`, `false`]
			* - `true`: This ToggleButton is in the "on" state.
			* - `false`: This ToggleButton is in the "off" state.
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
		events: {

			/**
			* {@link g.ToggleButton#event:onChange}
			*/
			onChange: ""
		},

		/**
		* @private
		*/
		classes: "g-button g-toggle-button",

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				this.value = this.active = Boolean(this.value || this.active);
				if (this.value === undefined) {
					this.value = this.active = false;
				}
				sup.apply(this, arguments);
			};
		}),

		/**
		* @method
		* @private
		*/
		activeChanged: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);

				// accessibility - readout toggle button status
				this.setAttribute("aria-pressed", this.active);
				this.$.client.setAttribute("aria-pressed", this.active);

				this._updateValue();
			};
		}),

		/**
		* @private
		*/
		valueChanged: function() {
			this.setActive(this.value);
		},

		/**
		* @private
		*/
		_updateStatus: function() {
			this.setActive(!this.active);
		},

		/**
		* @fires g.ToggleButton#onChange
		* @private
		*/
		_updateValue: function() {
			this.value = this.active;
			if (!this.disabled) {
				this.doChange({value: this.value});
			}
		},

		/**
		* @private
		*/
		_effectActive: function() {
			this.addRemoveClass("active", this.active);
		}
	});

})(enyo, g, this);
