(function (enyo, g, scope) {
	/**
	* Fires when user drags along the wheel.
	*
	* @event g.WheelDatePickerController#onWheelDrag
	* @type {Object}
	* @property {Object} sender - The [component]{@link http://enyojs.com/docs/latest/#/kind/enyo.Component} that most recently
	*	propagated the event.
	* @property {Object} event - An object containing event information.
	* @public
	*/

	/**
	* _g.WheelDatePickerController_ implements the control for a date picker which looks like a wheel.
	*
	* @class g.WheelDatePickerController
	* @extends g.WheelGesture
	* @private
	*/
	enyo.kind(
		/** @lends g.WheelDatePickerController.prototype */ {

		/**
		* @private
		*/
		name: "g.WheelDatePickerController",

		/**
		* @private
		*/
		kind: "g.WheelGesture",

		/**
		* The width of a knob.
		*
		* Range [0-Positive Integer]
		*
		* - Unit: pixel
		*
		* @type {Number}
		* @default 16
		* @private
		*/
		width: 16, // HARDCODED / TBD

		/**
		* The color of a knob.
		*
		* Range [color] example) red, blue, #FFFFFF, etc.
		* @type {String}
		* @default "rgb(250, 250, 250)"
		* @private
		*/
		knobColor: "rgb(250, 250, 250)", // #FAFAFA

		/**
		* The color of a knob border when a knob is pressed.
		*
		* Range [0-Positive Integer]
		*
		* - Unit: pixel
		*
		* @type {Number}
		* @default 16
		* @private
		*/

		knobBorderWidth: 0, // HARDCODED / TBD
		/**
		* The color of a knob border when a knob is not pressed.
		*
		* Range [color] example) red, blue, #FFFFFF, etc.
		* @type {String}
		* @default "rgb(250, 250, 250)"
		* @private
		*/
		knobBorderColor: "rgb(250, 250, 250)", // #FAFAFA

		/**
		* The color of a knob border when a knob is not pressed.
		*
		* Range [0 - Positive Integer]
		*
		* - Unit: pixel
		*
		* @type {Number}
		* @default 0
		* @private
		*/

		knobPressedBorderWidth: 16, // HARDCODED / TBD
		/**
		* The color of a knob border when a knob is pressed.
		*
		* Range [color] example) red, blue, #FFFFFF, etc.
		* @type {String}
		* @default "rgba(250, 250, 250, 0.3)"
		* @private
		*/
		knobPressedBorderColor: "rgba(250, 250, 250, 0.3)", // #FAFAFA with alph 0.3

		/**
		* The number of items corresponding to one round (a circluar rotation).
		*
		* Range [1-Positive Integer]
		*
		* @type {Number}
		* @default 30
		* @public
		*/
		itemsPerRound: 30,

		/**
		* @private
		*/
		events: {
			onWheelDrag: ""
		},

		/**
		* @private
		*/
		_soundEnabled: true,

		/**
		* @private
		*/
		wheelColor: "#323232",

		/**
		* @private
		*/
		_unitRadian: 0,

		/**
		* @private
		*/
		classes: "g-wheel-date-picker-controller",

		/**
		* @private
		*/
		bindings: [
			{from: ".width", to: ".$.knob.width"},
			{from: ".knobColor", to: ".$.knob.color"}
		],

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this._createBackground();
				this.itemsPerRoundChanged();
				this.wheelColorChanged();
				this.createComponent({name: "knob", kind: "g.Knob", style: "z-index: 101;"});
				this.$.knob.setWidth(16);
			};
		}),

		/**
		* @private
		*/
		itemsPerRoundChanged: function() {
			this._unitRadian = this._constMaxRadians / this.itemsPerRound;
		},

		/**
		* @private
		*/
		wheelColorChanged: function() {
			this.$.background.applyStyle("border-color", this.wheelColor);
		},

		/**
		* @private
		*/
		_eventObservingStart: function(inRadian, inEventType) {
			this.$.knob.setBorderWidth(this.knobPressedBorderWidth);
			this.$.knob.setBorderColor(this.knobPressedBorderColor);
			this.$.knob.draw(inRadian);
			this._radian = inRadian;
			this._radianAccumulated = 0;
			return true;
		},

		/**
		* @private
		*/
		_eventObservingStep: function(inRadian, inEventType) {
			this._draw(inRadian);
			this._updateDatePicker(inRadian);
			return true;
		},

		/**
		* @private
		*/
		_eventObservingStop: function(inRadian, inEventType) {
			this.$.knob.setBorderWidth(this.knobBorderWidth);
			this.$.knob.setBorderColor(this.knobBorderColor);
			this._draw(inRadian);
			this._updateDatePicker(inRadian);
			this._radianAccumulated = 0;
			return true;
		},

		/**
		* @private
		*/
		_createBackground: function() {
			this.createComponent({name: "background", classes: "g-wheel-bg"});
		},

		/**
		* @private
		*/
		_updateDatePicker: function(inRadian) {
			var radianDelta = inRadian - this._radian;
			var deltaIndex;
			if (radianDelta > Math.PI) {
				radianDelta -= 2 * Math.PI;
			} else if (radianDelta < -Math.PI) {
				radianDelta += 2 * Math.PI;
			}
			this._radianAccumulated += radianDelta;
			this._radian = inRadian;
			deltaIndex = ~~(this._radianAccumulated / this._unitRadian);
			if (deltaIndex !== 0) {
				if (this._soundEnabled) {
					this._playSound(deltaIndex > 0, 30);
				}
				this._sendChangingEvent({deltaIndex: deltaIndex});
				this._radianAccumulated -= (deltaIndex * this._unitRadian);
			}
		},

		/**
		* @fires g.WheelDatePickerController#onWheelDrag
		* @private
		*/
		_sendChangingEvent: function(inEventData) { // control
			this.stopJob("wheelChanging");
			this.startJob("wheelChanging", function() { this.doWheelDrag(inEventData); });
		},

		/**
		* @private
		*/
		_draw: function(inEventData) { // control
			this.stopJob("knobDraw");
			this.startJob("knobDraw", function() { this.$.knob.draw(inEventData); });
		}
	});

})(enyo, g, this);
