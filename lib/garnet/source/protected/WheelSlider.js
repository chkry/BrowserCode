(function (enyo, g, scope) {
	/**
	* _g.WheelSliderKnob_ shows a knob on a wheel when the wheel is tapped.
	* The width of _g.WheelSliderKnob_ is wider than the width of the wheel.
	*
	* @class g.WheelSliderKnob
	* @private
	*/
	enyo.kind(
		/** @lends g.WheelSliderKnob.prototype */ {

		/**
		* @private
		*/
		name: "g.WheelSliderKnob",

		/**
		* @private
		*/
		published:
			/** @lends g.WheelSliderKnob.prototype */ {

			/**
			* The press state of this WheelSliderKnob.
			*
			* Range ["up", "down"]
			* - `"up"`: This WheelSliderKnob is not pressed.
			* - `"down"`: This WheelSliderKnob is pressed.
			*
			* @type {String}
			* @default "up"
			* @public
			*/
			state: "up"
		},

		/**
		* @private
		*/
		_widthWithBorderRatio: 0.15, // 48px/320px

		/**
		* @private
		*/
		_widthWithBorderPressedRatio: 0.15, // 48px/320px

		/**
		* @private
		*/
		_knobWidthRatio: 0.05, // 16px/320px

		/**
		* @private
		*/
		_knobWidthPressedRatio: 0.05, // 16px/320px

		/**
		* @private
		*/
		_width: 0,

		/**
		* @private
		*/
		_widthPressed: 0,

		/**
		* @private
		*/
		_knobWidth: 0,

		/**
		* @private
		*/
		_knobWidthPressed: 0,

		/**
		* @private
		*/
		_borderWidthPressed: 0,

		/**
		* @private
		*/
		_baseSize: 0,

		/**
		* @private
		*/
		_borderColor: "rgba(250, 250, 250, 0)", // #FAFAFA

		/**
		* @private
		*/
		_borderColorPressed: "rgba(250, 250, 250, 0.3)", // #FAFAFA

		/**
		* @private
		*/
		classes: "g-wheelslider-knob-container",

		/**
		* @private
		*/
		innerComponents: [
			{name: "knob", classes: "g-wheelslider-knob-body"}
		],

		/**
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function(sup) {
			return function() {
				this.components = null;
				sup.apply(this, arguments);
				this.createComponents(this.innerComponents);

				this._baseSize = (g.width > g.height)? g.height: g.width;
				this._knobWidth = this._baseSize * this._knobWidthRatio;
				this._knobWidthPressed = this._baseSize * this._knobWidthPressedRatio;
				this._widthPressed = this._baseSize * this._widthWithBorderPressedRatio;
				this._width = this._widthPressed - (this._knobWidthPressed - this._knobWidth);
				this._borderWidthPressed = (this._width - this._knobWidth) / 2;

				this.$.knob.applyStyle("border-width", this._borderWidthPressed + "px");
				this.$.knob.applyStyle("margin-top", -this._borderWidthPressed + "px");

				this.stateChanged();
			};
		}),

		/**
		* @private
		*/
		stateChanged: function() {
			if (this.state === "up") {
				this.$.knob.applyStyle("width", this._width + "px");
				this.$.knob.applyStyle("height", this._width + "px");
				this.$.knob.applyStyle("border-color", this._borderColor);
			} else if (this.state === "down") {
				this.$.knob.applyStyle("width", this._widthPressed + "px");
				this.$.knob.applyStyle("height", this._widthPressed + "px");
				this.$.knob.applyStyle("border-color", this._borderColorPressed);
			}
		},

		/**
		* Moves the knob to the specified radian position.
		*
		* @param {Number} inRadian - Radian value for rotation. Range is [0-2*Math.PI]
		* @public
		*/
		draw: function(inRadian) {
			enyo.dom.transform(this, {rotate3d:"0, 0, 1," +inRadian + "rad", translate3d: "0, 0, 0"});
		}
	});

	/**
	* fired when the value is set. (when draged or when tapped.)
	*
	* @event g.WheelSlider#onChange
	* @type {Object}
	* @property {Object} sender - The [component]{@link http://enyojs.com/docs/latest/#/kind/enyo.Component} that most recently
	*	propagated the event.
	* @property {Object} event - An object containing event information.
	* @public
	*/

	/**
	* fired when the value is changed. (during dragging)
	*
	* @event g.WheelSlider#onChanging
	* @type {Object}
	* @property {Object} sender - The [component]{@link http://enyojs.com/docs/latest/#/kind/enyo.Component} that most recently
	*	propagated the event.
	* @property {Object} event - An object containing event information.
	* @public
	*/

	/**
	* The _g.WheelSlider_ kind is the UI component set a value within a value range.
	*
	* @class g.WheelSlider
	* @private
	*/
	enyo.kind(
		/** @lends g.WheelSlider.prototype */ {

		/**
		* @private
		*/
		name: "g.WheelSlider",

		/**
		* @private
		*/
		kind: "g.WheelGesture",

		/**
		* @private
		*/
		published:
			/** @lends g.WheelSlider.prototype */ {

			/**
			* The color of a track.
			*
			* Range [`Color`] example) red, blue, #323232, etc.
			*
			* @type {Boolean}
			* @default '#323232'
			* @private
			*/
			trackColor: "#323232",

			/**
			* The color of the slider arc.
			*
			* Range: [`Color`] example) red, blue, #1CD0CE, etc.
			*
			* @type {String}
			* @default g.constant.colorPoint
			* @private
			*/
			sliderColor: g.constant.colorPoint,

			/**
			* The minimum value of the slider.
			* The slider stop sliding backward when this value is reached.
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
			* The [value]{@link g.WheelSlider#value} of this WheelSlider
			* increases or decreases in units of the _stepValue_.
			*
			* Range: [Number]
			*
			* @type {Number}
			* @default fa1lse
			* @public
			*/
			stepValue: 1,

			/**
			* The _value_ of this WheelSlider.
			*
			* Range: [minimumValue-maximumValue]
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			value: 0,

			/**
			* Indicates whether to disable this WheelSlider.
			*
			* Range: [`true`, `false`]
			*
			* - `true`: This WheelSlider is displayed as disabled.
			* - `false`: This WheelSlider is displayed as enabled.
			*
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			disabled: false
		},

		/**
		* @private
		*/
		events: {
			onChange: "",
			onChanging: "",
			/**
				onStopSliderAnimation fired when slider animation is stopped
			*/
			onStopSliderAnimation:""
		},

		/**
		* @private
		*/
		_baseSize: 0,

		/**
		* @private
		*/
		_trackWidthRatio: 0.05, // 16px/320px

		/**
		* @private
		*/
		_sliderWidthRatio: 0.0375, // 12px/320px

		/**
		* @private
		*/
		_sliderMarginRatio: 0.00625, // 2px/320px

		/**
		* @private
		*/
		_constMinimumRadian: 0,

		/**
		* @private
		*/
		_constMaximumRadian: 2 * Math.PI,

		/**
		* @private
		*/
		_reversedRange: false,

		/**
		* @private
		*/
		_signedStepValue: 0,

		/**
		* @private
		*/
		_lastRadian: 0,

		/**
		* @private
		*/
		_isRotating: false,

		/**
		* @private
		*/
		_changeDelayMS: 50,

		/**
		* @private
		*/
		classes: "g-wheelslider",

		/**
		* @private
		*/
		bindings: [
			{from: ".trackColor", to: ".$.track.color"},
			{from: ".sliderColor", to: ".$.slider.color"}
		],

		/**
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function(sup) {
			return function() {
				var animationRange;
				this._baseSize = (g.width > g.height)? g.height: g.width;
				this.components = null;
				sup.apply(this, arguments);
				// create components
				this.createComponent({name: "track", kind: "g.Wheel"});
				this.createComponent({name: "slider", kind: "g.Arc"});
				this.createComponent({name: "knob", kind: "g.WheelSliderKnob"});

				this.$.track.setWidth(this._baseSize * this._trackWidthRatio);
				this.$.slider.setWidth(this._baseSize * this._sliderWidthRatio);
				this._setSliderMargin(this._baseSize * this._sliderMarginRatio);
				this.$.knob && this.$.knob.setState && this.$.knob.setState("up");
				// replace minimumValueChanged() and maximumValueChanged() to prevent valueChanged in these.
				this._reversedRange = (this.minimumValue > this.maximumValue)? true: false;
				this.stepValueChanged();
				this.valueChanged();
			};
		}),

		handlers: {
			onPopDownAnimationEnd: "hideKnob"
		},

		/**
		* While pressing a knob, a popup with a WheelSliderController could be closed.
		* @private
		*/
		hideKnob: function() {
			this.$.knob && this.$.knob.setState && this.$.knob.setState("up");
		},

		/**
		* @private
		*/
		minimumValueChanged: function() { // model
			this._reversedRange = (this.minimumValue > this.maximumValue)? true: false;
			this.valueChanged();
		},

		/**
		* @private
		*/
		maximumValueChanged: function() { // model
			this._reversedRange = (this.minimumValue > this.maximumValue)? true: false;
			this.valueChanged();
		},

		/**
		* @private
		*/
		stepValueChanged: function() { // model
			if (this.stepValue < 0) {
				this.stepValue = -this.stepValue;
			}
			var valueRange = Math.abs(this.maximumValue - this.minimumValue);
			if (this.stepValue > valueRange) {
				this.stepValue = valueRange;
			}
			this._signedStepValue = (this._reversedRange)? -this.stepValue: this.stepValue;
		},

		/**
		* @fires g.WheelSlider#onStopSliderAnimation
		* @private
		*/
		valueChanged: function() { // model
			if (!this._isRotating) {
				this._draw((this.value - this.minimumValue) / (this.maximumValue - this.minimumValue) * Math.PI * 2);
			}
			this.doStopSliderAnimation();
		},

		/**
		* @private
		*/
		_eventObservingStart: function(inRadian) { // control
			if(!this.disabled) {
				this._isRotating = true;
				this._lastRadian = inRadian;
				this._overStatus = 0;
				this._setValueWithRadian(inRadian);
				this._sendChangingEvent({value: this.value});
				this.$.knob && this.$.knob.setState && this.$.knob.setState("down");
			}
			return true;
		},

		/**
		* @private
		*/
		_eventObservingStep: function(inRadian) { // control
			if(!this.disabled) {
				this._checkOverRotating(inRadian);
				if (this._overStatus === 0) {
					this._setValueWithRadian(inRadian);
					this._sendChangingEvent({value: this.value});
				}
			}
			return true;
		},

		/**
		* @private
		*/
		_eventObservingStop: function(inRadian) { // control
			if(!this.disabled) {
				this._checkOverRotating(inRadian);
				if (this._overStatus === 0) {
					this._setValueWithRadian(inRadian);
				}
				this._isRotating = false;
				this._sendChangeEvent({value: this.value});
				this.$.knob && this.$.knob.setState && this.$.knob.setState("up");
			}
			return true;
		},

		/**
		* @private
		*/
		_checkOverRotating: function(inRadian) { // control
			this._overStatus = this._overStatus + this._isOverRotating(inRadian);
			if (this._overStatus !== 0) {
				if (this._overStatus < -1) {
					this._overStatus = -1;
				} else if (this._overStatus > 1) {
					this._overStatus = 1;
				}
			}
		},

		/**
		* @private
		*/
		_isOverRotating: function(inRadian) { // control
			var movedRadian = inRadian - this._lastRadian;
			this._lastRadian = inRadian;
			if (Math.abs(movedRadian) > Math.PI) {
				this.stopJob("sliderChanging");
				if (movedRadian > 0) {
					// from minimum to maximum
					if (this._overStatus === 0) {
						this._setValueWithRadian(this._constMinimumRadian);
						this._sendChangingEvent({value: this.value});
					}
					return 1;
				} else {
					// from maximum to minimum
					if (this._overStatus === 0) {
						this._setValueWithRadian(this._constMaximumRadian);
						this._sendChangingEvent({value: this.value});
					}
					return -1;
				}
			}
			return 0;
		},

		/**
		* @fires g.WheelSlider#onChange
		* @fires g.WheelSlider#onChanging
		* @private
		*/
		_sendChangeEvent: function(inEventData) { // control
			this.throttleJob(
				"sliderChange",
				function() {
					this.doChange(inEventData);
					this._sendingValue = this.value;
				},
				this._changeDelayMS
			);
			this.stopJob("lastSliderChange");
			this.startJob(
				"lastSliderChange",
				function() {
					if(this.value != this._sendingValue) {
						this.doChanging({value: this.value});
						this.doChange({value: this.value});
						this._sendingValue = this.value;
					}
				},
				this._changeDelayMS * 2
			);
		},

		/**
		* @fires g.WheelSlider#onChanging
		* @private
		*/
		_sendChangingEvent: function(inEventData) { // control
			this.throttleJob(
				"sliderChanging",
				function() {
					this.doChanging(inEventData);
					this._sendingValue = this.value;
				},
				this._changeDelayMS
			);
		},

		/**
		* @private
		*/
		_draw: function(inRadian) { // view
			this.$.slider.draw(this._constMinimumRadian, inRadian);
			this.$.knob.draw(inRadian);
		},

		/**
		* @private
		*/
		_setValueWithRadian: function(inRadian) { // model
			var value = ((inRadian / (Math.PI * 2)) * (this._signedStepValue + this.maximumValue - this.minimumValue) + this.minimumValue);
			value = (~~((value - this.minimumValue) / this._signedStepValue) * this._signedStepValue) + this.minimumValue;

			if (!this._reversedRange) {
				if (value < this.minimumValue) {
					value = this.minimumValue;
				} else if (value > this.maximumValue) {
					value = this.maximumValue;
				}
			} else {
				if (value < this.maximumValue) {
					value = this.maximumValue;
				} else if (value > this.minimumValue) {
					value = this.minimumValue;
				}
			}

			this.setValue(value);
			this._draw(inRadian);
		},


		/**
		* @private
		*/
		_setSliderMargin: function(inSliderMargin) {
			this.$.slider.setDiameter(this._baseSize - 2 * inSliderMargin);
			this.$.slider.applyStyle("width", (this._baseSize - 2 * inSliderMargin) + "px");
			this.$.slider.applyStyle("height", (this._baseSize - 2 * inSliderMargin) + "px");
			this.$.slider.applyStyle("left", inSliderMargin + "px");
			this.$.slider.applyStyle("top", inSliderMargin + "px");
		}
	});

})(enyo, g, this);
