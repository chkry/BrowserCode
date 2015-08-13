(function (enyo, g, scope) {
	/**
	* The _g.DatePickerKnob_ kind is the UI component shows a circular thumb for a DatePicker.
	*
	* @class g.DatePickerKnob
	* @extends g.Arc
	* @private
	*/
	enyo.kind(
		/** @lends g.DatePickerKnob.prototype */ {

		/**
		* @private
		*/
		name: "g.DatePickerKnob",

		/**
		* @private
		*/
		events: {
			onChange: ""
		},

		/**
		* @private
		*/
		handlers: {
			onhold: "_eventHold",
			ondrag: "_eventDrag",
			ondragfinish: "_eventDragFinish",
			onup: "_eventUp",
			onWheelResetPosition: "calculateCenter",
			onEndPanelAnimation: "calculateCenter"
		},

		// properties for drag handling

		/**
		* The X-axis center position of a DatePickerKnob
		*
		* @private
		*/
		_centerX: 0,

		/**
		* The Y-axis center position of a DatePickerKnob
		*
		* @private
		*/
		_centerY: 0,

		/**
		* Width of the ring area in which a dragging gesture takes place.
		* If a dragging gesture moves out of this ring area and towards the center of the screen,
		* the dragging gesture is recognized as complete.
		*
		* To drag the wheel, a new dragging needs to be started.
		*
		* Range [1 - Positive Number]
		*
		* - Unit: pixel
		*
		* @type {Number}
		* @default  g.width * g.wheelGestureDraggingWidth
		* @private
		*/
		_widthDragging: g.width * g.wheelGestureDraggingWidth,

		/**
		* The square value of the radius of canceling area
		*
		* @private
		*/
		_cancelRadiusSquare: 0,

		/**
		* The last radian which is already calculated during dragging
		*
		* @private
		*/
		_lastRadian: 0,

		/**
		* The differnce in radians between the starting position of dragging and the current position
		*
		* @private
		*/
		_radianDragged: 0,

		/**
		* An amount of number skipped when a knob is rotate 360 degrees
		*
		* @private
		*/
		_numberPerRound: 30,

		/**
		* The flag indicating whether a scroller knob is dragging or not
		*
		* @private
		*/
		_isDragging: false,

		/**
		* The flag indicating whether a dragging is canceled or not
		*
		* @private
		*/
		_isCanceled: false,

		// properties for DatePickerKnob UI
		/**
		* The biased position of a DatePickerKnob to align the position
		*
		* @private
		*/
		_positionBase: 0, // in Radian

		/**
		* The flag indicating whether a DatePickerKnob is showing or not.
		* For the performance, this component does not use 'display: none' style to hide.
		* Therefore this property replace 'showing' property for internal showing logic.
		*
		* @private
		*/
		_isShowing: true,

		// common properties

		/**
		* The constant of 2 Pi
		*
		* @private
		*/
		_constMaxRadian: Math.PI * 2,

		/**
		* Threshold radian value for firing events
		* 360 / 30 = 12 degrees
		*
		* @private
		*/
		_thresholdRadian: 0.20943951,

		/**
		* @private
		*/
		classes: "g-datepickerknob",

		/**
		* innerComponents contains the knob image.
		*
		* @private
		*/
		innerComponents: [
			{classes: "g-datepickerknob-grab", components: [
				{name: "datepickerknob", classes: "g-datepickerknob-visible"}
			]}
		],

		/**
		* The method to initialize internal components
		*
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.createComponents(this.innerComponents);
				this.createComponent({kind: "Signals", onvisibilitychange: "visibilitychanged"});
				enyo.dom.transform(this, {translateZ: 0});
				enyo.dom.transform(this, {rotateZ: (this._positionBase)+ "rad"});
				// before sync with a scroller, it is not certain to show this knob or not.
				this.hide();
			};
		}),

		/**
		* The method to initialize internal variables especially the size information
		*
		* @private
		*/
		_initVariables: function() {
			this.calculateCenter();
			this._initVariables = undefined;
		},

		/**
		* The method to initialize internal variables especially the size information
		*
		* @private
		*/
		calculateCenter: function() {
			var outBounds = this.getAbsoluteBounds();
			if (outBounds.width === 0 && outBounds.height === 0) {
				return;
			}
			var cancelRadius = outBounds.width / 2 - this._widthDragging;
			this._cancelRadiusSquare = cancelRadius * cancelRadius;
			this._centerX = outBounds.left + outBounds.width / 2;
			this._centerY = outBounds.top + outBounds.height / 2;
		},

		/**
		* For the performance, this component does not use 'display: none' style to hide.
		*
		* @method
		* @private
		*/
		show: function() {
			enyo.dom.transform(this, {translateY: 0});
			this._isShowing = true;
		},

		/**
		* For the performance, this component does not use 'display: none' style to hide.
		*
		* @method
		* @private
		*/
		hide: function() {
			enyo.dom.transform(this, {translateY: (g.height * 2) + "px"});
			this._isShowing = false;
		},

		/**
		* The event handler for hold event
		*
		* @private
		*/
		_eventHold: function(inSender, inEvent) {
			this._initVariables && this._initVariables();
			this.$.datepickerknob.addClass("pressed");
			this._isDragging = true;
			this._isCanceled = false;
			return true;
		},

		/**
		* The event handler for drag event
		*
		* @fires g.DatePickerKnob#onChange
		* @private
		*/
		_eventDrag: function(inSender, inEvent) {
			var distances, radian, radianDelta;
			if (this._isDragging && this.$.datepickerknob.hasClass("pressed")) {
				distances = this._getDistances(inEvent);
				if (distances.radiusSquare < this._cancelRadiusSquare) {
					this._isDragging = false;
					this._isCanceled = true;
					this.$.datepickerknob.removeClass("pressed");
				} else {
					radian = this._computeRadian(distances);
					radianDelta = radian - this._lastRadian;

					if (radianDelta > Math.PI) {
						radianDelta -= 2 * Math.PI;
					} else if (radianDelta < -Math.PI) {
						radianDelta += 2 * Math.PI;
					}
					this._radianDragged += radianDelta;
					this._lastRadian = radian;

					if (this._isShowing) {
						enyo.dom.transform(this, {rotateZ: radian + "rad"});
						if(Math.abs(this._radianDragged) >= this._thresholdRadian) { // if it's bigger than 12 degrees)
							var count = ~~(this._radianDragged/this._thresholdRadian);
							this.doChange({deltaIndex: count});
							this._radianDragged -= (count * this._thresholdRadian);
							this._playSound(radianDelta > 0, 30);
						}
					}
				}
				return true;
			}
			return false;
		},

		/**
		* The event handler for dragfinish event
		*
		* @private
		*/
		_eventDragFinish: function(inSender, inEvent) {
			if (this._isDragging || this._isCanceled) {
				this._isDragging = false;
				this._isCanceled = false;
				inEvent.preventTap();
				inEvent.preventDefault();
				this.$.datepickerknob.removeClass("pressed");
				return true;
			}
			return false;
		},

		/**
		* The event handler for up event
		*
		* @private
		*/
		_eventUp: function(inSender, inEvent) {
			this.$.datepickerknob.removeClass("pressed");
			return true;
		},

		/**
		* The method to calculate distance from the current position
		*
		* @private
		*/
		_getDistances: function(inEvent) {
			var dx = inEvent.clientX - this._centerX;
			var dy = inEvent.clientY - this._centerY;
			return {dx: dx, dy: dy, radiusSquare: dx * dx + dy * dy};
		},

		/**
		* The method to compute radian value from distance information
		*
		* @private
		*/
		_computeRadian: function(inDistances) {
			var radian = Math.acos(-inDistances.dy / Math.sqrt(inDistances.radiusSquare));
			if (inDistances.dx  < 0) {
				radian = this._constMaxRadian - radian;
			}
			return radian;
		},

		/**
		* @private
		*/
		_playSound: function(inIsClockwise, inPlayTime) {
			if (!this._isPlayingSound) {
				if (inIsClockwise) {
					g.playFeedback("wheel_cw");
				} else {
					g.playFeedback("wheel_ccw");
				}
				this._isPlayingSound = true;
				enyo.job(this.id, this.bindSafely("_playSoundEnd"), inPlayTime);
			}
		},

		/**
		* @private
		*/
		_playSoundEnd: function() {
			this._isPlayingSound = false;
		},

		/**
		* @private
		*/
		visibilitychanged: function() {
			this._isDragging = false;
			this._isCanceled = false;
			this.$.datepickerknob.removeClass("pressed");
		}
	});

})(enyo, g, this);
