(function (enyo, g, scope) {
	/**
	* Event capture feature for wheel controllers:
	* capture events to a specific wheel control via
	* 	enyo.dispatcher.registerWheelController(inController)
	* release events via
	* 	enyo.dispatcher.unregisterWheelController(inController)
	* @private
	*/
	enyo.dispatcher.features.push(function(e) {
		var controller;
		var target;
		var handler;
		var handlerName;
		var object;
		var i;
		if (this.wheelControllerSupport && !e.preventDispatch) {
			target = e.dispatchTarget;
			if (e.type === "down" || e.type === "hold") {
				object = target;
				while (object) {
					if (object.ignoreWheelControl === undefined) {
						object = object.parent;
						continue;
					} else if (object.ignoreWheelControl === true) {
						return;
					} else  { // object.ignoreWheelControl !== true
						break;
					}
				}
			}
			handlerName = this.wheelControllerEvents[(e.customEvent? "": "on") + e.type];
			if (target && handlerName) {
				if (e.type === "drag" || e.type === "dragfinish") {
					controller = this.wheelDragEventHandler;
				} else {
					for (i = 0; i < this.wheelControllers.length; ++i) {
						if (target.isDescendantOf && target.isDescendantOf(this.wheelControllers[i].parent)) {
							if (!controller || this.wheelControllers[i].parent.isDescendantOf(controller.parent)) {
								controller = this.wheelControllers[i];
							}
						}
					}
				}
			}
			if (controller) {
				handler = handlerName && controller[handlerName];
				if (handler) {
					e.preventDispatch = handler.apply(controller, [controller, e]);
					if (e.type === "dragstart") {
						if (e.preventDispatch) {
							this.wheelDragEventHandler = controller;
						} else {
							this.wheelDragEventHandler = undefined;
						}
					}
				}
			}
		}
	});

	//
	//        NOTE: This object is a plug-in; these methods should
	//        be called on _enyo.dispatcher_, and not on the plug-in itself.
	//
	enyo.mixin(enyo.dispatcher, {
		wheelControllerSupport: false,
		wheelDragEventHandler: undefined,
		wheelControllerEvents: {
			ondown: "_wheelControlReady",
			ondragstart: "_wheelControlMoved",
			onhold: "_wheelControlStart",
			ondrag: "_wheelControlStep",
			ondragfinish: "_wheelControlStop",
			onup: "_wheelControlStop",
			onholdpulse: "_wheelControlIgnore",
			onlongpress: "_wheelControlIgnore"
		},
		wheelControllers: [],
		registerWheelController: function(inController) {
			var i;
			for (i = 0; i < this.wheelControllers.length; ++i) {
				if (this.wheelControllers[i] === inController) {
					return;
				}
			}
			this.wheelControllers.push(inController);
			this.wheelControllerSupport = true;
		},
		unregisterWheelController: function(inController) {
			var i;
			for (i = 0; i < this.wheelControllers.length; ++i) {
				if (this.wheelControllers[i] === inController) {
					this.wheelControllers.splice(i, 1);
					break;
				}
			}
			if (this.wheelControllers.length <= 0) {
				this.wheelControllerSupport = false;
			}
		}
	});

	/**
	* The _g.WheelGesture_ kind is the base controller for the touch wheel control kinds.
	*
	* @class g.WheelGesture
	* @private
	*/
	enyo.kind(
		/** @lends g.WheelGesture.prototype */ {

		/**
		* @private
		*/
		name: "g.WheelGesture",

		/**
		* @private
		*/
		published:
			/** @lends g.WheelGesture.prototype */ {

			/**
			* Outter-bound radius to be activated.
			*
			* Range [1 - the device screen width / 2]
			*
			* - Unit: pixel
			*
			* @type {Number}
			* @default g.width / 2
			* @private
			*/
			radius: g.width / 2,

			/**
			* Width of the ring area in which an event is sensed in.
			*
			* Range [1 - Positive Number]
			*
			* - Unit: pixel
			*
			* @type {Number}
			* @default g.wheelGestureWidth
			* @private
			*/
			widthSensing: g.wheelGestureWidth,

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
			widthDragging: g.width * g.wheelGestureDraggingWidth
		},

		/**
		* @private
		*/
		handlers: {
			onWheelResetPosition: "calculateCenter",
			onPopUpAnimationEnd: "calculateCenter",
			onEndPanelAnimation: "calculateCenter"
		},

		/**
		* @private
		*/
		_centerX: 0,

		/**
		* @private
		*/
		_centerY: 0,

		/**
		* @private
		*/
		_minRadiusSquare: 0,

		/**
		* @private
		*/
		_maxRadiusSquare: 0,

		/**
		* @private
		*/
		_cancelRadiusSquare: 0,

		/**
		* @private
		*/
		_constMaxRadians: Math.PI * 2,

		/**
		* @private
		*/
		_isTappable: false,

		/**
		* @private
		*/
		_isDraggable: false,

		/**
		* @private
		*/
		_isDragCanceled: false,

		/**
		* @private
		*/
		_releaseDragHandle: undefined,

		/**
		* @private
		*/
		_soundEnabled: false,

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this._captureEvents();
			};
		}),

		/**
		* @method
		* @private
		*/
		rendered: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this._initVariables&&this._initVariables();
			};
		}),

		/**
		* @method
		* @private
		*/
		destroy: enyo.inherit(function(sup) {
			return function() {
				this._releaseEvents();
				sup.apply(this, arguments);
			};
		}),

		/**
		* @private
		*/
		isInbounds: function(inEvent) {
			var dX = inEvent.clientX - this._centerX;
			var dY = inEvent.clientY - this._centerY;
			var radiusSquare = dX * dX + dY * dY;
			return ((radiusSquare >= this._minRadiusSquare) && (radiusSquare <= this._maxRadiusSquare));
		},

		/**
		* @private
		*/
		isInboundsDragging: function(inEvent) {
			var dX = inEvent.clientX - this._centerX;
			var dY = inEvent.clientY - this._centerY;
			var radiusSquare = dX * dX + dY * dY;
			return (radiusSquare >= this._cancelRadiusSquare);
		},

		/**
		* @private
		*/
		_wheelControlReady: function(inSender, inEvent) {
			// work-around code for height information of node.
			this.calculateCenter();
			this._isTappable = this.isInbounds(inEvent);
			this._isDraggable = false;
			this._isDragCanceled = false;
			return this._isTappable;
		},

		/**
		* @private
		*/
		_wheelControlMoved: function(inSender, inEvent) {
			// work-around code for height information of node.
			this._initVariables&&this._initVariables();
			this._isTappable = false;
			return this._isDraggable || this._isTappable;
		},

		/**
		* @private
		*/
		_wheelControlStart: function(inSender, inEvent) {
			// work-around code for height information of node.
			this._initVariables&&this._initVariables();
			if (this.isInbounds(inEvent)) {
				this._isDraggable = true;
				this._isTappable = false;
				this._releaseDragHandle = inEvent.dispatchTarget.retainNode();
				return this._eventObservingStart(this._computeRadian(inEvent), inEvent.type);
			} else {
				return false;
			}
		},

		/**
		* @private
		*/
		_wheelControlStep: function(inSender, inEvent) {
			if (this._isDraggable) {
				if (this.isInboundsDragging(inEvent)) {
					return this._eventObservingStep(this._computeRadian(inEvent), inEvent.type);
				} else {
					this._isDragCanceled = true;
					return this._wheelControlStop(inSender, inEvent);
				}
			} else {
				return this._isDragCanceled;
			}
		},

		/**
		* @private
		*/
		_wheelControlStop: function(inSender, inEvent) {
			// work-around code for height information of node.
			this._initVariables&&this._initVariables();
			if (this._isTappable) {
				this._eventObservingStart(this._computeRadian(inEvent), inEvent.type);
				this._isDraggable = true;
				this._isTappable = false;
			}
			if (this._isDraggable) {
				var ret = this._eventObservingStop(this._computeRadian(inEvent), inEvent.type);
				if (this._releaseDragHandle) {
					this._releaseDragHandle();
					this._releaseDragHandle = undefined;
				}
				this._isDraggable = false;
				if (ret && inEvent.preventTap) {
					inEvent.preventTap();
				}
				return ret;
			} else if (this._isDragCanceled) {
				this._isDragCanceled = false;
				return true;
			} else {
				return false;
			}
		},

		/**
		* @private
		*/
		_wheelControlIgnore: function(inSender, inEvent) {
			// work-around code for height information of node.
			this._initVariables&&this._initVariables();
			return this.isInbounds(inEvent);
		},

		/**
		* @private
		*/
		_eventObservingStart: function(inRadian) {
			return true;
		},

		/**
		* @private
		*/
		_eventObservingStep: function(inRadian) {
			return true;
		},

		/**
		* @private
		*/
		_eventObservingStop: function(inRadian) {
			return true;
		},

		/**
		* @private
		*/
		_initVariables: function() {
			this.calculateCenter();
			this._initVariables = undefined;
		},

		/**
		* @private
		*/
		calculateCenter: function() {
			var outBounds = this.getAbsoluteBounds();
			var innerRadius = this.radius - this.widthSensing;
			var cancelRadius = this.radius - this.widthDragging;
			if (outBounds.width === 0 && outBounds.height === 0) {
				return;
			}
			this._centerX = outBounds.left + outBounds.width / 2;
			this._centerY = outBounds.top + outBounds.height / 2;
			this._minRadiusSquare = innerRadius * innerRadius;
			this._maxRadiusSquare = this.radius * this.radius;
			this._cancelRadiusSquare = cancelRadius * cancelRadius;
		},

		/**
		* @private
		*/
		_computeRadian: function(inEvent) {
			var dx = inEvent.clientX - this._centerX;
			var dy = inEvent.clientY - this._centerY;
			var radian = Math.acos(-dy / Math.sqrt(dx * dx + dy * dy));
			if (dx < 0) {
				radian = this._constMaxRadians - radian;
			}
			return radian;
		},

		/**
		* @private
		*/
		_captureEvents: function() {
			enyo.dispatcher.registerWheelController(this);
		},

		/**
		* @private
		*/
		_releaseEvents: function() {
			enyo.dispatcher.unregisterWheelController(this);
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
		}
	});

})(enyo, g, this);
