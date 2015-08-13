(function (enyo, g, scope) {
	/**
	* Fired when a new value is set.
	* A new value is set when a user releases the dragging or
	* simply taps a point in the wheel.
	*
	* @event g.WheelTimePickerController#onChange
	* @type {Object}
	* @property {Object} sender - The [component]{@link http://enyojs.com/docs/latest/#/kind/enyo.Component} that most recently
	*	propagated the event.
	* @property {Object} event - An objectc ontaining event information.
	* @private
	*/

	/**
	* Fired when the value is changed. (during dragging)
	*
	* @event g.WheelTimePickerController#onChanging
	* @type {Object}
	* @property {Object} sender - The [component]{@link http://enyojs.com/docs/latest/#/kind/enyo.Component} that most recently
	*	propagated the event.
	* @property {Object} event - An object containing the event information.
	* @private
	*/

	/**
	* _g.WheelTimePickerController_ provides a time picker.
	*
	* @class g.WheelTimePickerController
	* @extends g.WheelGesture
	* @private
	*/
	enyo.kind(
		/** @lends g.WheelTimePickerController.prototype */ {

		/**
		* @private
		*/
		name: "g.WheelTimePickerController",

		/**
		* @private
		*/
		kind: "g.WheelGesture",

		/**
		* @private
		*/
		published:
			/** @lends g.WheelTimePickerController.prototype */ {

			/**
			* The color of a knob.
			*
			* Range [color] example) red, blue, #FFFFFF, etc.
			* @type {String}
			* @default g.constant.colorPoint
			* @private
			*/
			knobColor: g.constant.colorPoint,

			/**
			* The width of a knob.
			*
			* Range [0 - Positive Integer]
			*
			* - Unit: pixel
			*
			* @type {Number}
			* @default 30
			* @private
			*/
			width: 30, // HARDCODED; must be changed along with TimePickerPanel
			/**
			* The maximum value.
			*
			* Range [Number]
			*
			* @type {Number}
			* @default 9
			* @public
			*/
			maximumValue: 9,

			/**
			* The value of a slider.
			*
			* Range [Positive Number]
			*
			* - Greater than 0
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			value: 0,

			/**
			* Indicates whether to disable this WheelTimePickerController.
			*
			* Range: [`true`, `false`]
			* - `true`: This WheelTimePickerController is displayed as disabled.
			* - `false`: This WheelTimePickerController is displayed as enabled.
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			disabled: false,

			/**
			* Offset value for selection
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			selectOffset: 0
		},

		/**
		* @private
		*/
		events: {
			onChange: "",
			onChanging: ""
		},

		/**
		* @private
		*/
		_soundEnabled: true,

		/**
		* @private
		*/
		_changeDelayMS: 50,

		/**
		* @private
		*/
		_deltaPortion: null,

		/**
		* @private
		*/
		classes: "g-wheeltimepickercontroller",

		/**
		* @private
		*/
		bindings: [
			{from: ".knobColor", to: ".$.knob.color"},
			{from: ".width", to: ".$.knob.width"}
		],

		/**
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function(sup) {
			return function() {
				this._deltaPortion = ((Math.PI * 2) / (this.maximumValue + 1));
				this.components = null;
				sup.apply(this, arguments);
				this.createComponent({name: "knob", kind: "g.Knob"});
				this.valueChanged();
			};
		}),

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.disabledChanged();
			};
		}),

		/**
		* @method
		* @private
		*/
		destroy: enyo.inherit(function(sup) {
			return function() {
				if (!this.disabled) {
					this._releaseEvents();
				}
				sup.apply(this, arguments);
			};
		}),

		/**
		* @private
		*/
		maximumValueChanged: function() { // model
			this.valueChanged();
		},

		/**
		* @private
		*/
		valueChanged: function() { // model
			if (this.value > this.maximumValue) {
				this.value = 0;
			}
			this._draw(this.value * this._deltaPortion);
		},

		/**
		* @private
		*/
		disabledChanged: function() { // control
			if (this.disabled) {
				this._releaseEvents();
			} else {
				this._captureEvents();
			}
		},

		/**
		* @private
		*/
		_eventObservingStart: function(inRadian) { // control
			this._setValueWithRadian(inRadian);
			this._sendChangingEvent({value: this.value});
			this._lastRadian = 0;
			return true;
		},

		/**
		* @private
		*/
		_eventObservingStep: function(inRadian) { // control
			this._setValueWithRadian(inRadian);
			this._sendChangingEvent({value: this.value});
			return true;
		},

		/**
		* @private
		*/
		_eventObservingStop: function(inRadian) { // control
			this._setValueWithRadian(inRadian);
			this._sendChangeEvent({value: this.value});
			return true;
		},

		/**
		* @private
		*/
		_draw: function(inRadian) { // view
			this.$.knob.draw(inRadian);
		},

		/**
		* @private
		*/
		_setValueWithRadian: function(inRadian) { // model
			var newValue = Math.floor((inRadian + this.selectOffset) / this._deltaPortion);
			var radianDelta;
			if (this._soundEnabled && newValue !== this.value) {
				radianDelta = inRadian - this._lastRadian;
				this._lastRadian = inRadian;
				if (radianDelta > Math.PI) {
					radianDelta -= 2 * Math.PI;
				} else if (radianDelta < -Math.PI) {
					radianDelta += 2 * Math.PI;
				}
				this._playSound(radianDelta > 0, 30);
			}
			this.setValue(newValue);
		},

		/**
		* @fires g.WheelTimePickerController#onChange
		* @private
		*/
		_sendChangeEvent: function(inEventData) { // control
			this.throttleJob("wheelTimePickerChange", function() { this.doChange(inEventData); }, this._changeDelayMS);
		},

		/**
		* @fires g.WheelTimePickerController#onChanging
		* @private
		*/
		_sendChangingEvent: function(inEventData) { // control
			this.throttleJob("wheelTimePickerChanging", function() { this.doChanging(inEventData); }, this._changeDelayMS);
		}
	});

})(enyo, g, this);
