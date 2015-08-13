(function (enyo, g, scope) {
	/**
	* Fired when the [value]{@link g.ToggleIconButton#value} of this ToggleIconButton is toggled.
	* _inEvent.value_ contains the [value]{@link g.ToggleIconButton#value} of this ToggleIconButton.
	*
	* @event g.ToggleIconButton#onChange
	* @type {Object}
	* @property {Object} sender - The [component]{@link http://enyojs.com/docs/latest/#/kind/enyo.Component} that most recently propagated the event.
	* @property {Object} event - An object containing event information.
	* @public
	*/

	/**
	* _g.ToggleIconButton_ is an icon button that extends [g.IconButton]{@link g.IconButton}.
	* _g.ToggleIconButton_ acts like a toggle switch and has value states "on" and "off".
	* When a _g.ToggleIconButton_ is tapped, it switches its state
	* and fires the [onChange]{@link g.ToggleIconButton#event:onChange} event.
	*
	* The icon image is specified by setting the [src]{@link g.ToggleIconButton#src} property
	* as the URL to the image location.
	*
	*	{kind: "g.ToggleIconButton", src: "images/search.png", ontap: "buttonTap"}
	*
	* The image associated with the [src]{@link g.ToggleIconButton#src} property is assumed	to be a 48x288 pixel strip,
	* with six button images stacked, each button image for the button's status below
	* (in order from top to bottom).
	*
	* - 1<sup>st</sup> Image: Normal inactive
	* - 2<sup>nd</sup> Image: Tapped while inactive
	* - 3<sup>rd</sup> Image: Disabled as inactive
	* - 4<sup>th</sup> Image: Normal active
	* - 5<sup>th</sup> Image: Tapped while active
	* - 6<sup>th</sup> Image: Disabled as active
	*
	* To use an image in different size than the default size,
	* explicitly set the width and the height of the icon.
	*
	* @class g.ToggleIconButton
	* @extends g.IconButton
	* @public
	*/
	enyo.kind(
		/** @lends g.ToggleIconButton.prototype */ {

		/**
		* @private
		*/
		name: "g.ToggleIconButton",

		/**
		* @private
		*/
		kind: "g.ButtonIconBase",

		/**
		* @private
		*/
		published:
			/** @lends g.ToggleIconButton.prototype */ {

			/**
			* URL of the toggle icon image file.
			*
			* @type {String}
			* @default ""
			* @public
			*/
			src: "",

			/**
			* Indicates whether this ToggleIconButton is currently in the "on" state.
			*
			* *IMPORTANT*: If [pending]{@link g.ToggleIconButton#pending} is `true`,
			* use the `getPendingValue()`/`setPendingValue()` methods
			* instead of using the `getValue()`/`setValue()` methods.
			* This is recommended because the `setValue()` method may not work in the cases below:
			* - Case A: This property is set as `"onPending"` and the [value]{@link g.ToggleIconButton#value}
			* is set to `false`.
			* - Case B: This property is set as `"offPending"` and the [value]{@link g.ToggleIconButton#value}
			* is set to `true`.

			*
			* Range: [`true`, `false`]
			*
			* - true: This ToggleIconButton is in the "on" state.
			* - false: This ToggleIconButton is in the "off" state.
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			value: false,

			/**
			* The state of this ToggleIconButton including the pending state when the
			* [pending]{@link g.ToggleIconButton#pending} is set to `true`.
			*
			* *IMPORTANT*: If [pending]{@link g.ToggleIconButton#pending} is `false`,
			* pendingValue is ignored and `getPendingValue()`/`setPendingValue()` does not work.
			*
			* *IMPORTANT*: If [pending]{@link g.ToggleIconButton#pending} is `true`,
			* use the `getPendingValue()`/`setPendingValue()` methods
			* instead of using the `getValue()`/`setValue()` methods.
			* This is recommended because the `setValue()` method may not work in the cases below:
			* - Case A: This property is set as `"onPending"` and the [value]{@link g.ToggleIconButton#value}
			* is set to `false`.
			* - Case B: This property is set as `"offPending"` and the [value]{@link g.ToggleIconButton#value}
			* is set to `true`.
			*
			* If this property is set as either `"offPending"` or `"onPending"`,
			* then the [value]{@link g.ToggleIconButton#value} property does not change.
			*
			* If this property is set as either `"off"` or `"on"`,
			* then the [value]{@link g.ToggleIconButton#value} property changes to the corresponding value.
			*
			* Range: [`"off"`, `"on"`, `"offPending"`, `"onPending"`]
			*
			* - `"off"`: Non-pending off state
			* - `"on"`: Non-pending on state
			* - `"offPending"`: Pending state which is intended to be off state
			* - `"onPending"`: Pending state which is intended to be on state
			*
			* @type {String}
			* @default "off"
			* @public
			*/
			pendingValue: "off"
		},

		/**
		* @private
		*/
		events: {

			/**
			* {@link g.ToggleIconButton#event:onChange}
			*/
			onChange: ""
		},

		/**
		* @private
		*/
		handlers: {
			// registering handlers for animationend event
			onanimationend: "_toggleAnimationEnd",
			onwebkitAnimationEnd: "_toggleAnimationEnd"
		},

		/**
		* Indicates whether or not to enable the toggle pending mode.
		*
		* If this property is `true`,
		* a tap does not toggle the [value]{@link g.ToggleIconButton#value} property immediately,
		* but changes the [pendingValue]{@link g.ToggleIconButton#pendingValue} into the pending state.
		* For example, if the current [pendingValue]{@link g.ToggleIconButton#pendingValue} is "off" and
		* this ToggleIconButton is tapped,
		* the [pendingValue]{@link g.ToggleIconButton#pendingValue} changes to "onPending".
		*
		* Range: [`true`, `false`]
		* - `true`: The pending mode is enabled.
		* - `false`: The pending mode is disabled.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		pending: false,

		/**
		* flag used to prevent the animation while loading the toggle-icon-button initially
		* @private
		*/
		_canAnimated: false,

		/**
		* @private
		*/
		_animationStatus: 0, // _constOff

		/**
		* animation status code
		* @private
		*/
		_constOff: 0,

		/**
		* @private
		*/
		_constOn: 1,

		/**
		* @private
		*/
		_constToOff: 2,

		/**
		* @private
		*/
		_constToOn: 3,

		/**
		* @private
		*/
		_constOffPending: 4,

		/**
		* @private
		*/
		_constOnPending: 5,

		/**
		* @private
		*/
		classes: "g-toggle-icon-button",

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
				this._animationStatus = (this.value)? this._constOn: this._constOff;
				sup.apply(this, arguments);
			};
		}),

		/**
		* @method
		* @private
		*/
		initAccessibility: enyo.inherit(function (sup) {
			return function () {
				sup.apply(this, arguments);

				// Accessibility - Add role, tabindex and aria-disabled for VoiceReadout.
				this.setAttribute("role", "button");
				this.setAttribute("tabindex", 0);
				this.setAttribute("aria-disabled", this.disabled);
			};
		}),

		/**
		* @method
		* @private
		*/
		rendered: enyo.inherit(function(sup) {
			return function() {
				this.srcChanged();
				sup.apply(this, arguments);
				this._canAnimated = true;
			};
		}),

		/**
		* @private
		*/
		srcChanged: function() {
			if (this.src !== undefined && this.src !== "") {
				this.addStyles("background-image: url(" + enyo.path.rewrite(this.src) + "), url(" + enyo.path.rewrite("$lib/garnet/images/toggle_icon_bg.svg") + "); background-size: cover; background-color: #B6B5B7;");
			}
		},

		/**
		* @method
		* @private
		*/
		activeChanged: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);

				// accessibility - readout toggle button status
				this.setAttribute("aria-pressed", this.active);

				this._updateValue();
				this._changeEffect();
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
		pendingValueChanged: function() {
			if (this.pending) {
				if (this.pendingValue === "off") {
					this.setActive(false);
				} else if (this.pendingValue === "on") {
					this.setActive(true);
				}
				this._changeEffect();
			}
		},

		/**
		* @private
		*/
		getSrc: function() {
			return this.src;
		},

		/**
		* @private
		*/
		_updateStatus: function() {
			if (this.pending) {
				if (this.pendingValue === "off") {
					this.setPendingValue("onPending");
				} else if (this.pendingValue === "on") {
					this.setPendingValue("offPending");
				}
			} else {
				this.setActive(!this.active);
			}
		},

		/**
		* @private
		*/
		_effectActive: function() {
			this._changeEffect();
		},

		/**
		* @private
		*/
		_effectDisabled: function() {
			this._changeEffect();

			// accessibility - add disabled status.
			this.setAttribute("aria-disabled", this.disabled);
		},

		/**
		* @method
		* @private
		*/
		addClass: enyo.inherit(function(sup) {
			return function(inClass) {
				if (inClass === "active") {
					this._changeEffect();
				} else {
					sup.apply(this, arguments);
				}
			};
		}),

		/**
		* @method
		* @private
		*/
		removeClass: enyo.inherit(function(sup) {
			return function(inClass) {
				if (inClass === "active") {
					this._changeEffect();
				} else {
					sup.apply(this, arguments);
				}
			};
		}),

		/**
		* @private
		*/
		_changeEffect: function() {
			var bool;
			if (this.disabled) {
				this.addClass("g-toggle-icon-button-disabled");
			}
			// apply an effect except during the loading
			if (this._canAnimated) {
				if (this.pendingValue === "off" || this.pendingValue === "offPending") {
					switch (this._animationStatus) {
					case this._constOff:
					case this._constToOff:
					case this._constOffPending:
						bool = (this.pendingValue === "offPending");
						this._addRemoveEffect(this._constOffPending, bool);
						if (bool) {
							this._animationStatus = this._constOffPending;
						} else {
							this._animationStatus = this._constOff;
						}
						break;
					case this._constOnPending:
						this._addRemoveEffect(this._constOnPending, false);
						// this._animationStatus = this._constOn;
						// DO NOT break; HERE!
					case this._constOn:
					case this._constToOn:
						this._addRemoveEffect(this._constToOn, false);
						this._addRemoveEffect(this._constToOff, true);
						this._animationStatus = this._constToOff;
						break;
					}
				} else if (this.pendingValue === "on" || this.pendingValue === "onPending") {
					switch (this._animationStatus) {
					case this._constOn:
					case this._constToOn:
					case this._constOnPending:
						bool = (this.pendingValue === "onPending");
						this._addRemoveEffect(this._constOnPending, bool);
						if (bool) {
							this._animationStatus = this._constOnPending;
						} else {
							this._animationStatus = this._constOn;
						}
						break;
					case this._constOffPending:
						this._addRemoveEffect(this._constOffPending, false);
						// this._animationStatus = this._constOff;
						// DO NOT break; HERE!
					case this._constOff:
					case this._constToOff:
						this._addRemoveEffect(this._constToOff, false);
						this._addRemoveEffect(this._constToOn, true);
						this._animationStatus = this._constToOn;
						break;
					}
				}
			} else {
				this._addStyle(this.active);
			}
			this.setAttribute("disabled", this.disabled);
		},

		/**
		* remove animation classes at the animationend event
		*
		* @private
		*/
		_toggleAnimationEnd: function(inSender, inEvent){
			if (inEvent.animationName === "g-toggle-icon-button-on-effect") {
				this._addRemoveEffect(this._constToOn, false);
			} else if (inEvent.animationName === "g-toggle-icon-button-off-effect") {
				this._addRemoveEffect(this._constToOff, false);
			}
			this._changeEffect();
		},

		/**
		* setting the background position for both icon sprite & background color image
		*
		* @private
		*/
		_addStyle: function(inBool) {
			if (inBool) {
				this.addStyles("background-position: 0 60%, 0 0; background-size: cover;");
			} else {
				this.addStyles("background-position: 0 0, 0 -100%; background-size: cover;");
			}
		},

		/**
		* @private
		*/
		_addRemoveEffect: function(inStatus, inBool) {
			switch (inStatus) {
			case this._constToOff:
				this._addStyle(false);
				this.addRemoveClass("g-toggle-icon-button-off-effect", inBool);
				break;
			case this._constToOn:
				this._addStyle(true);
				this.addRemoveClass("g-toggle-icon-button-on-effect", inBool);
				break;
			case this._constOffPending:
				this._addStyle(false);
				this.addRemoveClass("g-toggle-icon-button-off-pending-effect", inBool);
				break;
			case this._constOnPending:
				this._addStyle(true);
				this.addRemoveClass("g-toggle-icon-button-on-pending-effect", inBool);
				break;
			}
		},

		/**
		* @fires g.ToggleIconButton#onChange
		* @private
		*/
		_updateValue: function() {
			this.value = this.active;
			this.pendingValue = (this.active)? "on": "off";
			if (!this.disabled) {
				this.doChange({value: this.value});
			}
		}
	});

})(enyo, g, this);
