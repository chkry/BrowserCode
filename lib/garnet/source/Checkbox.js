(function (enyo, g, scope) {
	/**
	* _g.Checkbox_ shows or hides a check in a box and fires the `onChange` event, when tapped.
	* Call the `getValue()` method to check whether or not the checkbox is currently checked, as shown in
	* the example below.
	*
	* @class g.Checkbox
	* @extends enyo.Checkbox
	* @public
	* @example
	* {kind: "g.Checkbox", onchange: "checkboxClicked"}
	*
	* checkboxClicked: function(inSender) {
	* 	if (inSender.getValue()) {
	* 		this.log("I've been checked!");
	* 	}
	* }
	*/
	enyo.kind(
		/** @lends g.Checkbox.prototype */ {

		/**
		* @private
		*/
		name: "g.Checkbox",

		/**
		* @private
		*/
		kind: "enyo.Checkbox",

		/**
		* @private
		*/
		handlers: {
			ondown: "_eventDown",
			onhold: "_eventHold",
			onup: "_eventUp",
			ondragstart: "_eventDragStart",
			ondrag: "_eventDrag",
			onenter: "_eventEnter",
			onleave: "_eventLeave",
			// prevent double onchange bubble in IE
			onclick: ""
		},

		/**
		* @private
		*/
		pressed: false,

		/**
		* @private
		*/
		tag: "div",

		/**
		* @private
		*/
		_isInControl: false,

		/**
		* @private
		*/
		classes: "g-checkbox",

		/**
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
		initAccessibility: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.setAttribute("role", "checkbox");
				this.setAttribute("tabindex", 0);
			};
		}),

		/**
		* @method
		* @private
		*/
		checkedChanged: enyo.inherit(function(sup) {
			return function () {
				sup.apply(this, arguments);

				// accessibility - change checkbox status
				this.setAttribute("aria-checked", this.checked);
			};
		}),

		/**
		* @private
		*/
		pressedChanged: function() {
			if (this.disabled) {
				this.pressed = false;
			} else {
				this.setAttribute("pressed", this.pressed ? "pressed" : "");
			}
		},

		/**
		* @private
		*/
		_setPressed: function(inval) {
			this.set("pressed", inval);
		},

		/**
		* @private
		*/
		_eventDown: function(inSender, inEvent) {
			if (!this.disabled) {
				this._isInControl = true;
			}
			return false;
		},

		/**
		* @private
		*/
		_eventHold: function(inSender, inEvent) {
			if (!this.disabled && this._isInControl) {
				this._setPressed(true);
			}
			return false;
		},

		/**
		* @private
		*/
		_eventUp: function(inSender, inEvent) {
			if (!this.disabled && this._isInControl) {
				if (!this.get("pressed")) {
					this._setPressed(true);
				}
				this.setChecked(!this.getChecked());
				this.bubble("onchange");
			} else if (inEvent.preventTap) {
				inEvent.preventTap();
			}
			setTimeout(enyo.bind(this, this._setPressed, false), 50);
			this._isInControl = false;
			return false;
		},

		/**
		* @private
		*/
		_eventDragStart: function(inSender, inEvent) {
			this._isInControl = false;
			this._setPressed(false);
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
			if (this._isInControl) {
				this._setPressed(true);
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
		* Play the touch feedback sound when the checkbox is tapped
		*
		* @param {Object} inSender - The component that most recently propagated the event.
		* @param {Object} inEvent - An object containing the event information. Feedback sound can be blocked with the set 'inEvent.preventSound = true'.
		* @public
		*/
		tap: function(inSender, inEvent) {
			if (inEvent.preventDefault) {
				inEvent.preventDefault();
			}
			if (!inEvent || inEvent && !inEvent.preventSound) {
				g.playFeedback("touch");
				inEvent? inEvent.preventSound = true : inEvent;
			}
			return !this.disabled;
		},

		/**
		* @private
		*/
		visibilitychanged: function() {
			this._setPressed(false);
			this._isInControl = false;
		}
	});

})(enyo, g, this);
