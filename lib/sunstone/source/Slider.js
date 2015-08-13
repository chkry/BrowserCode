/**
* Fired when progress bar position is set.
*
* @event sun.Slider#onChange
* @type {Object}
* @property {Number} value - The value of the current position of the control knob.
* @public
*/

/**
* Fired while control knob is being dragged.
*
* @event sun.Slider#onChanging
* @type {Object}
* @property {Number} value - The value of the current position of the control knob.
* @public
*/

/**
* _sun.Slider_ is a control that presents a range of selectable values in the form
* of a horizontal bar with a control knob. The knob may be tapped or dragged
* to the desired location.
*
* ```
* {kind: "sun.Slider", value: 30}
* ```
*
* @class sun.Slider
* @extends sun.ProgressBar
* @ui
* @public
*/
enyo.kind(
	/** @lends sun.Slider.prototype */ {

	/**
	* @private
	*/
	name: "sun.Slider",

	/**
	* @private
	*/
	kind: "sun.ProgressBar",

	/**
	* @private
	*/
	published: /** @lends sun.Slider.prototype */ {

		/**
		* Position of the control knob on the slider, expressed as
		* an integer between 0 and 100, inclusive.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		value: 0,

		/**
		* Unit by which the slider moves, i.e. slider may "snap" to multiples
		* of this value in either direction.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		increment: 0,

		/**
		* Determines if tapping of the bar moves the control knob to the
		* tapped position. If `true`, the knob moves to the tapped position.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		tappable: true,

		/**
		* CSS class(es) to apply to the control knob.
		*
		* @type {String}
		* @default "sun-slider-knob"
		* @public
		*/
		knobClasses: "sun-slider-knob",

		/**
		* CSS class(es) to apply to the tappable area.
		*
		* @type {String}
		* @default "sun-slider-taparea"
		* @public
		*/
		tapAreaClasses: "sun-slider-taparea",

		/**
		* Indicates whether to disable the slider. If `true`, the slider is displayed
		* as disabled and does not generate tap events.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* Indicates whether the knob can be moved past the [bgProgress]{@link sun.Slider#bgProgress} value.
		* If `false`, the knob may be moved past the `bgProgress` value.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		constrainToBgProgress: false
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
	handlers: {
		ondragstart: "dragstart",
		ondrag: "drag",
		ondragfinish: "dragfinish"
	},

	/**
	* @private
	*/
	animatingTo: null,

	/**
	* @private
	*/
	selected: false,

	/**
	* @private
	*/
	classes: "sun-slider",

	/**
	* @private
	*/
	moreComponents: [
		{kind: "Animator", onStep: "animatorStep", onEnd: "animatorComplete"},
		{name: "tapArea", components: [
			{name: "knob", ondown: "showKnobStatus", onup: "hideKnobStatus"}
		]}
	],

	/**
	* @private
	*/
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.createComponents(this.moreComponents);
			this.initValue();
			this.disabledChanged();
			this.knobClassesChanged();
			this.tapAreaClassesChanged();
		};
	}),

	/**
	* @private
	*/
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this._setValue(this.value);
		};
	}),

	/**
	* Animates the control knob and the bar from and to the given values.
	*
	* @param {Number} start The start position of the animation. This parameter is of Integer type. Range: 0-100
	* @param {Number} end The end position of the animation. This parameter is of Integer type. Range: 0-100
	* @public
	*/
	animateTo: function(inStartValue, inEndValue) {
		inEndValue = this.clampValue(this.min, this.max, inEndValue); // Moved from animatorStep
		this.animatingTo = inEndValue;

		this.$.animator.play({
			startValue: inStartValue,
			endValue: inEndValue,
			node: this.hasNode()
		});
	},

	/**
	* Indicates whether the slider is currently “sliding”, i.e. being dragged.
	*
	* @returns {Boolean} Sliding status of the slider. Returns `true` if the slider is currently being dragged.
	* @public
	*/
	isDragging: function() {
		return this.dragging;
	},

	/**
	* @private
	*/
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
		this.$.knob.addRemoveClass("disabled", this.disabled);
		this.setTappable(!this.disabled);
		if (this.disabled) {
			this.hideKnobStatus();
		}
	},

	/**
	* @private
	*/
	knobClassesChanged: function(inOld) {
		this.$.knob.removeClass(inOld);
		this.$.knob.addClass(this.knobClasses);
	},

	/**
	* @private
	*/
	tapAreaClassesChanged: function(inOld) {
		this.$.tapArea.removeClass(inOld);
		this.$.tapArea.addClass(this.tapAreaClasses);
	},

	/**
	* Slider will snap multiples.
	*
	* @private
	*/
	calcIncrement: function(inValue) {
		return (Math.round(inValue / this.increment) * this.increment);
	},

	/**
	* Called only when [_constrainToBgProgress_]{@link sun.Slider#constrainToBgProgress} is
	* `true`.
	*
	* @private
	*/
	calcConstrainedIncrement: function(inValue) {
		return (Math.floor(inValue / this.increment) * this.increment);
	},

	/**
	* Initializes [_value_]{@link sun.Slider#value} at creation time.
	*
	* @private
	*/
	initValue: function() {
		if (this.constrainToBgProgress) {
			this.value = this.clampValue(this.min, this.bgProgress, this.value);
			this.value = (this.increment) ? this.calcConstrainedIncrement(this.value) : this.value;
		}

		this.updateKnobPosition(this.getValue());
		this.setProgress(this.getValue());
	},

	/**
	* @private
	*/
	valueChanged : function(preValue, inValue){
		if (!this.dragging) {
			if (this.constrainToBgProgress) {
				inValue = this.clampValue(this.min, this.bgProgress, inValue); // Moved from animatorStep
				inValue = (this.increment) ? this.calcConstrainedIncrement(inValue) : inValue;
			}
			this.animateTo(preValue, inValue);
		}
	},

	/**
	* @private
	*/
	_setValue: function(inValue) {
		var v = this.clampValue(this.min, this.max, inValue);

		this.value = v;
		this.updateKnobPosition(v);
		this.setProgress(this.value);

		this.sendChangeEvent({value: this.getValue()});
	},

	/**
	* @private
	*/
	getValue: function() {
		return (this.animatingTo !== null) ? this.animatingTo : this.value;
	},

	/**
	* @private
	*/
	updateKnobPosition: function(inValue) {
		var percent = this.calcPercent(inValue);

		if (this.rtl) { percent = 100 - percent; }

		this.$.knob.applyStyle("left", percent + "%");
	},

	/**
	* @private
	*/
	calcKnobPosition: function(inEvent) {
		var x;
		if (this.rtl) {
			x = this.hasNode().getBoundingClientRect().right - inEvent.clientX;
		} else {
			x = inEvent.clientX - this.hasNode().getBoundingClientRect().left;
		}
		var pos = (x / this.getBounds().width) * (this.max - this.min) + this.min;
		return pos;
	},

	/**
	* @private
	*/
	dragstart: function(inSender, inEvent) {
		if (this.disabled) {
			return; // return nothing
		}
		if (inEvent.horizontal) {
			inEvent.preventDefault();
			this.dragging = true;
			this.$.knob.addClass("active");
			this.showKnobStatus();
			return true;
		}
	},

	/**
	* @private
	*/
	drag: function(inSender, inEvent) {
		if (this.dragging) {
			var v = this.calcKnobPosition(inEvent), ev;

			if (this.constrainToBgProgress === true) {
				v = (this.increment) ? this.calcConstrainedIncrement(v) : v;
				ev = this.bgProgress + (v-this.bgProgress)*0.4;
				v = this.clampValue(this.min, this.bgProgress, v);
				this.elasticFrom = (this.bgProgress > v) ? v : ev;
				this.elasticTo = v;
			} else {
				v = (this.increment) ? this.calcIncrement(v) : v;
				v = this.clampValue(this.min, this.max, v);
				this.elasticFrom = this.elasticTo = v;
			}

			this.updateKnobPosition(this.elasticFrom);
			this.set("value",this.elasticFrom);
			this.setProgress(v);

			this.sendChangingEvent({value: v});

			return true;
		}
	},

	/**
	* @private
	*/
	dragfinish: function(inSender, inEvent) {
		if (this.disabled) {
			return;
		}

		var v = this.elasticTo;
		if (this.constrainToBgProgress === true) {
			v = (this.increment) ? this.calcConstrainedIncrement(v) : v;
		} else {
			v = this.calcKnobPosition(inEvent);
			v = (this.increment) ? this.calcIncrement(v) : v;
			v = this.clampValue(this.min, this.max, v);
		}

		this.dragging = false;
		this.set("value",v);
		this.sendChangeEvent({value: this.getValue()});
		inEvent.preventTap();
		this.$.knob.removeClass("active");
		this.hideKnobStatus();
		return true;
	},

	/**
	* @private
	*/
	tap: function(inSender, inEvent) {
		if (this.tappable && !this.disabled) {
			var v = this.calcKnobPosition(inEvent);
			v = (this.increment) ? this.calcIncrement(v) : v;
			v = (this.constrainToBgProgress && v>this.bgProgress) ? this.bgProgress : v;
			this.set("value",v);
			return true;
		}
	},

	/**
	* @private
	*/
	animatorStep: function(inSender) {
		var	v = inSender.value;

		this.updateKnobPosition(v);
		this.setProgress(v);

		this.sendChangingEvent({value: v});
		return true;
	},

	/**
	* @private
	*/
	animatorComplete: function(inSender) {
		this._setValue(inSender.value);
		this.animatingTo = null;
		return true;
	},

	/**
	* @private
	*/
	showKnobStatus: function(inSender, inEvent) {
		this.$.knob.addClass("sun-slider-knob-pressed");
		if (!this.disabled) {
			this.updateKnobPosition(this.getValue());
		}
	},

	/**
	* @private
	*/
	hideKnobStatus: function(inSender, inEvent) {
		this.$.knob.removeClass("sun-slider-knob-pressed");
	},

	/**
	* @private
	*/
	changeDelayMS: 50,

	/**
	* @fires sun.Slider#event:onChange
	* @private
	*/
	sendChangeEvent: function(inEventData) {
		this.throttleJob("sliderChange", function() { this.doChange(inEventData); }, this.changeDelayMS);
	},

	/**
	* @fires sun.Slider#event:onChanging
	* @private
	*/
	sendChangingEvent: function(inEventData) {
		this.throttleJob("sliderChanging", function() { this.doChanging(inEventData); }, this.changeDelayMS);
	}
});
