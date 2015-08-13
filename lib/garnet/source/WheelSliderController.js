(function (enyo, g, scope) {
	/**
	* _g.WheelSliderController_ is the control for setting a value within a specific value range,
	* with a circular type UI, i.e. wheel.
	*
	* When a wheel slider is tapped or dragged,
	* _g.WheelSliderController_ handles the tapping or dragging events
	* with event handlers for the `onChange` and `onChanging` events.
	* - `onChange` event: Fired when the new value has been set (i.e. when the wheel is tapped or released from dragging).
	* - `onChanging` event: Fired when the value has changed during the selecting process (i.e. while dragging).
	*
	* To handle these two events in a desired manner, define new event handlers for the two events.
	*
	* @class g.WheelSliderController
	* @extends g.Panel
	* @private
	*/
	enyo.kind(
		/** @lends g.WheelSliderController.prototype */ {

		/**
		* @private
		*/
		name: "g.WheelSliderController",

		/**
		* @private
		*/
		kind: "g.Panel",

		/**
		* @private
		*/
		published:
			/** @lends g.WheelSliderController.prototype */ {

			/**
			* The color of a track.
			*
			* Range [Color] example) red, blue, #323232, etc.
			*
			* @type {String}
			* @default "323232"
			* @private
			*/
			trackColor: "#323232",

			/**
			* The color of the slider arc.
			*
			* Range: [Color] example) red, blue, #1CD0CE, etc.
			*
			* @type {String}
			* @default g.constant.colorPoint
			* @private
			*/
			sliderColor: g.constant.colorPoint,
			/**
			* The minimum value of the slider.
			* The slider stops sliding backward when this value is reached.
			*
			* Range: [Number]
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			minimumValue: 0,

			/**
			* The maximum value of the slider.
			* The slider stops sliding forward when this value is reached.
			*
			* Range: [Number]
			*
			* @type {Number}
			* @default 9
			* @public
			*/
			maximumValue: 9,

			/**
			* The [value]{@link g.WheelSliderController#value} of this WheelSliderController
			* increases or decreases in units of the _stepValue_.
			*
			* Range [Number]
			*
			* @type {Number}
			* @default 1
			* @public
			*/
			stepValue: 1,

			/**
			* The _value_ of this WheelSliderController.
			*
			* Range [minimumValue - maximumValue]
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			value: 0
		},

		/**
		* Indicates whether to disable this WheelSliderController.
		*
		* Range: [`true`, `false`]
		*
		* - `true`: This WheelSliderController is displayed as disabled.
		* - `false`: This WheelSliderController is displayed as enabled.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* @private
		*/
		handlers: {
			onChange: "changeEventHandler",
			onChanging: "changingEventHandler"
		},

		/**
		* @private
		*/
		bindings: [
			{from: ".trackColor", to: ".$.wheelController.trackColor"},
			{from: ".sliderColor", to: ".$.wheelController.sliderColor"},
			{from: ".$.wheelController.stepValue", to: ".stepValue"},
			{from: ".$.wheelController.value", to: ".value", oneWay: false}
		],

		/**
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);

				if (this.minimumValue === undefined) {
					this.minimumValue = 0;
				}
				if (this.maximumValue === undefined) {
					this.maximumValue = 9;
				}
				if (this.stepValue === undefined) {
					this.stepValue = 1;
				}
				if (this.value === undefined) {
					this.value = 0;
				}
				// create a wheel controller component
				this.createComponent({
					name: "wheelController",
					kind: "g.WheelSlider",
					minimumValue: this.minimumValue,
					maximumValue: this.maximumValue,
					stepValue: this.stepValue,
					value: this.value,
					disabled: this.disabled
				});
			};
		}),

		/**
		* @private
		*/
		minimumValueChanged: function() {
			this.$.wheelController.setMinimumValue(this.minimumValue);
		},

		/**
		* @private
		*/
		maximumValueChanged: function() {
			this.$.wheelController.setMaximumValue(this.maximumValue);
		},

		/**
		* @private
		*/
		stepValueChanged: function() {
			this.$.wheelController.setStepValue(this.stepValue);
			this.stepValue = this.$.wheelController.getStepValue();
		},

		/**
		* @private
		*/
		valueChanged: function() {
			if (this.value !== this.$.wheelController.getValue()) {
				this.$.wheelController.setValue(this.value);
			}
		},

		/**
		* @private
		*/
		changeEventHandler: function() {
			return false;
		},

		/**
		* @private
		*/
		changingEventHandler: function() {
			return false;
		}
	});

	g.WheelSliderPanel = g.WheelSliderController;

})(enyo, g, this);
