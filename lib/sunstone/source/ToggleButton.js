/**
* Fired when the `sun.ToggleButton` gets toggled.
*
* @event sun.ToggleButton#onChange
* @type {Object}
* @property {Boolean} value - Current state of the ToggleButton.
* @public
*/

/**
* _sun.ToggleButton_ looks like a switch with 'on' and 'off' states.
* When the toggle button is tapped, it switches its state and fires the
* [onChange]{@link sun.ToggleButton#event:onChange} event.
*
* @class sun.ToggleButton
* @extends enyo.Control
* @public
*/
enyo.kind(
	/** @lends sun.ToggleButton.prototype */ {

	/**
	* @private
	*/
	name: "sun.ToggleButton",

	/**
	* @private
	*/
	kind: "enyo.Control",

	/**
	* @private
	*/
	classes: "sun-toggle-button",

	/**
	* @private
	* @lends sun.ToggleButton.prototype
	*/
	published: {

		/**
		* Indicates whether the `sun.ToggleButton` is currently _on_ or not. If `true`, the button is on.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		active: false,

		/**
		* Indicates whether to disable the toggle button.
		* If `true`, the ToggleButton is displayed as disabled and does not generate tap events.
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
		onChange: ''
	},

	/**
	* @private
	*/
	min:0,

	/**
	* @private
	*/
	max:45,

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
	components: [
		{name: "knob", ondown: "downKnob", onup: "upKnob", onleave: "upKnob",classes: "sun-toggle-button-knob"}
	],

	/**
	* @private
	*/
	activeChanged: function() {
		if (!this.disabled) {
			this.setStyledToggleButton(this.active);
			this.doChange({active:this.active});
		}
	},

	/**
	* @private
	*/
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
	},

	/**
	* @private
	*/
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.setStyledToggleButton(this.active);
			this.activeChanged();
			this.disabledChanged();
		};
	}),

	/**
	* @private
	*/
	setStyledToggleButton:function(inActive) {
		this.$.knob.addRemoveClass("off", !inActive);
		if(inActive){
			this.$.knob.applyStyle("left", this.max + "%");
		}else{
			this.$.knob.applyStyle("left", this.min + "%");
		}
	},

	/**
	* @private
	*/
	downKnob:function(){
		if (!this.disabled) {
			this.$.knob.setAttribute("pressed", true);
		}
	},

	/**
	* @private
	*/
	upKnob:function(){
		if (!this.disabled && !this.dragging) {
			this.$.knob.setAttribute("pressed", false);
		}
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
			return true;
		}
	},

	/**
	* @private
	*/
	drag: function(inSender, inEvent) {
		if (this.dragging) {
			var v = this.calcKnobPosition(inEvent);
			v = this.clampValue(this.min, this.max, v);
			this.updateKnobPosition(v);
			return true;
		}
	},

	/**
	* @private
	*/
	dragfinish: function(inSender, inEvent) {
		if (this.dragging) {
			inEvent.preventTap();
			this.$.knob.setAttribute("pressed", false);
			this.updateActiveValue(inEvent);
			this.dragging = false;
		}
	},

	/**
	* @private
	*/
	clampValue: function(inMin, inMax, inValue) {
		return Math.max(inMin, Math.min(inValue, inMax));
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
	updateKnobPosition: function(inValue) {
		this.$.knob.applyStyle("left", inValue + "%");
	},

	/**
	* @private
	*/
	updateActiveValue:function(inEvent) {
		var v = this.calcKnobPosition(inEvent);
		if(v > (this.max/2)){
			this.$.knob.applyStyle("left", this.max + "%");
			this.setActive(true);
		}else{
			this.$.knob.applyStyle("left", this.min + "%");
			this.setActive(false);
		}
	},

	/**
	* @private
	*/
	tap: function() {
		this.updateValue(!this.active);
	},

	/**
	* @private
	*/
	updateValue: function(inValue) {
		if (!this.disabled) {
			this.setActive(inValue);
		}
	}
});

/**
* _sun.ToggleSwitch_ extends {@link sun.ToggleButton} and is a temporary alias
* control.
*
* Note that `sun.ToggleSwitch` will be deprecated soon. For now,
* it remains for backward compatibility.
*
* @class sun.ToggleSwitch
* @extends sun.ToggleButton
* @public
*/
enyo.kind({
	name: "sun.ToggleSwitch",
	kind: "sun.ToggleButton"
});