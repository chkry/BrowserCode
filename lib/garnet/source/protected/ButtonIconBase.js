(function (enyo, g, scope) {
	/**
	* _g.ButtonIconBase_ is the base kind for various types of Garnet buttons.
	* It extends [enyo.ToolDecorator]{@link http://enyojs.com/docs/latest/#/kind/enyo.ToolDecorator} and
	* is the base kind for {@link g.Button}, {@link g.ToggleButton}, {@link g.Icon}, {@link g.IconButton}, and {@link g.ToggleIconButton}.
	* _g.ButtonIconBase_ can be a child control of an [enyo.Group]{@link http://enyojs.com/docs/latest/#/kind/enyo.Group} instance.
	*
	* @class g.ButtonIconBase
	* @extends enyo.ToolDecorator
	* @private
	*/
	enyo.kind(
		/** @lends g.ButtonIconBase.prototype */ {

		/**
		* @private
		*/
		name: "g.ButtonIconBase",

		/**
		* @private
		*/
		kind: "enyo.ToolDecorator",

		/**
		* @private
		*/
		published:
			/** @lends g.ButtonIconBase.prototype */ {

			/**
			* Indicates whether this button is the active button in the group
			* to which this button belongs . Use this property _only if_ this button is
			* a child control of an [enyo.Group]{@link http://enyojs.com/docs/latest/#/kind/enyo.Group}
			* instance.
			* In [enyo.Group]{@link http://enyojs.com/docs/latest/#/kind/enyo.Group},
			* only one button can be active at any given time.
			*
			* Range: [`true`, `false`]
			*
			* - `true`: This button is the active button in the group.
			* - `false`: This button is not the active button in the group.
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			active: false,

			/**
			* Indicates whether this button is disabled. When a button is disabled,
			* the button does not generate any events.
			*
			* Range: [`true`, `false`]
			*
			* - `true`: This button is disabled and does not generate tap events when tapped.
			* - `false`: This button is enabled and does generate tap events when tapped.
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			disabled: false,

			/**
			* Indicates whether or not this button/icon is tapped now.
			*
			* @type {Boolean}
			* @default false
			* @private
			*/
			pressed: false,

			/**
			* prevent a "drag" event to bubble up
			*
			* @type {Boolean}
			* @default false
			* @private
			*/
			preventDrag: false
		},

		/**
		* @private
		*/
		handlers: {
			ondown: "_eventDown",
			onhold: "_eventHold",
			onup: "_eventUp",
			ontap: "playFeedback",
			ondragstart: "_eventDragStart",
			ondrag: "_eventDrag",
			onenter: "_eventEnter",
			onleave: "_eventLeave"
		},

		/**
		* Option for a delayed press effect.
		* If this value is `true`, a press effect will be applied when a hold event occurs.
		*
		* Range: [`true`, `false`]
		*
		* - true: a press effect is applied when a hold event occurs.
		* - false: a press effect is applied when a down event occurs.
		*
		* @type {Boolean}
		* @default true
		* @private
		*/
		delayedPressEffect: true,

		/**
		* @private
		*/
		_isInControl: false,

		/**
		* @private
		*/
		classes: "",

		/**
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function(sup) {
			return function() {
				this.createComponent({kind: "Signals", onvisibilitychange: "visibilitychanged"});
				sup.apply(this, arguments);
			};
		}),

		/**
		* Accessibility : initialize
		*
		* @method
		* @private
		*/
		initAccessibility: enyo.inherit(function (sup) {
			return function (control) {
				sup.apply(this, arguments);
				this.setAttribute('role', 'button');
				this.setAttribute('tabindex', 0);
			}
		}),

		/**
		* @method
		* @private
		*/
		rendered: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.disabledChanged();
				this.pressedChanged();
			};
		}),

		/**
		* @method
		* @private
		*/
		activeChanged: enyo.inherit(function(sup) {
			return function() {
				if (this.disabled) {
					this.active = false;
				} else {
					sup.apply(this, arguments);
					this._effectActive(this.active);
				}
			};
		}),

		/**
		* @private
		*/
		disabledChanged: function() {
			if (this.disabled) {
				this.setPressed(false);
			}
			this._effectDisabled(this.disabled);
		},

		/**
		* @private
		*/
		pressedChanged: function() {
			if (this.disabled) {
				this.pressed = false;
			} else {
				this.addRemoveClass("pressed", this.pressed);
				this._effectPressed(this.pressed);
			}
		},

		/**
		* @private
		*/
		_bubbleOnpress: function(inSender, inEvent) {
			return this.bubble("onpress", enyo.mixin(enyo.clone(inEvent), {type: "press"}), inSender);
		},

		/**
		* @private
		*/
		_eventDown: function(inSender, inEvent) {
			if (!this.disabled) {
				this._isInControl = true;
				if (!this.delayedPressEffect) {
					this.setPressed(true);
					return this._bubbleOnpress(inSender, inEvent);
				}
			}
			return false;
		},

		/**
		* @private
		*/
		_eventHold: function(inSender, inEvent) {
			if (!this.disabled && this._isInControl && this.delayedPressEffect) {
				this.setPressed(true);
				return this._bubbleOnpress(inSender, inEvent);
			}
			return false;
		},

		/**
		* @private
		*/
		_eventUp: function(inSender, inEvent) {
			if (!this.disabled && this._isInControl) {
				if (!this.getPressed()) {
					this.setPressed(true);
					this._bubbleOnpress(inSender, inEvent);
				}
				this._updateStatus();
			} else if (inEvent.preventTap) {
				inEvent.preventTap();
			}
			setTimeout(enyo.bind(this, this.setPressed, false), 50);
			this._isInControl = false;
			return false;
		},

		/**
		* Play the touch feedback sound when the button is tapped
		*
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
		_eventDragStart: function(inSender, inEvent) {
			this._isInControl = false;
			this.setPressed(false);
		},

		/**
		* @private
		*/
		_eventDrag: function(inSender, inEvent) {
			if (this.preventDrag) {
				return true;
			}
		},

		/**
		* @private
		*/
		_eventEnter: function(inSender, inEvent) {
			if (this._isInControl && !this.delayedPressEffect) {
				this.setPressed(true);
				return this._bubbleOnpress(inSender, inEvent);
			}
			return false;
		},

		/**
		* @private
		*/
		_eventLeave: function(inSender, inEvent) {
			this._isInControl = false;
			return false;
		},

		/**
		* @private
		*/
		_updateStatus: function() {
			this.setActive(true);
		},

		/**
		* @private
		*/
		_effectActive: function() {
		},

		/**
		* @private
		*/
		_effectDisabled: function() {
		},

		/**
		* @private
		*/
		_effectPressed: function() {
		},

		/**
		* @private
		*/
		visibilitychanged: function() {
			this.setPressed(false);
			this._isInControl = false;
			this.resetButton(enyo.hidden);
		},

		/**
		* @private
		*/
		resetButton: function(inHidden) {
		}
	});

})(enyo, g, this);
