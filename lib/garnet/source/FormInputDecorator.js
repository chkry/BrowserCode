(function (enyo, scope) {
	/**
	* _g.FormInputDecorator_ is a control that provides input styling. Any controls
	* in the InputDecorator will appear to be inside an area styled as an input. Usually,
	* an InputDecorator _wraps_ a [g.FormInput]{@link g.FormInput}:
	*
	* ```
	* {kind: 'g.FormInputDecorator', components: [
	* 	{kind: 'g.FormInput'}
	* ]}
	* ```
	*
	* Other controls, such as buttons, may be placed to the right or left side of the
	* input control. For example:
	*
	* ```
	* {kind: 'g.FormInputDecorator', components: [
	* 	{kind: 'g.IconButton', src: 'search.png'},
	* 	{kind: 'g.FormInput'},
	* 	{kind: 'g.IconButton', src: 'cancel.png'}
	* ]}
	* ```
	*
	* Note that the InputDecorator fits around the content inside it. If the
	* decorator is sized, then its contents will likely need to be sized as well.
	*
	* ```
	* {kind: 'g.FormInputDecorator', style: 'width: 500px;', components: [
	* 	{kind: 'g.FormInput', style: 'width: 100%;'}
	* ]}
	* ```
	*
	* @class g.FormInputDecorator
	* @extends enyo.ToolDecorator
	* @public
	*/

	enyo.kind(
		/** @lends g.FormInputDecorator.prototype */ {

		/**
		* @private
		*/
		name: 'g.FormInputDecorator',

		/**
		* @private
		*/
		kind: 'enyo.ToolDecorator',

		/**
		* @private
		*/
		tag: 'label',

		/**
		* @private
		*/
		_status: 'up',

		/**
		* @private
		*/
		handlers: {
			onDisabledChange: 'disabledChangeHandler',
			onfocus: 'focusHandler',
			onblur: 'blurHandler',
			ondown: 'onDown',
			ondragstart: 'onDragStart',
			onhold: 'onHold',
			onup: 'onUp',
			onleave: 'onLeave'
		},

		/**
		* @private
		*/
		_oInputControl: null,

		/**
		* Returns boolean indicating whether passed-in control is an input field.
		*
		* @private
		*/
		_isInput: function (oControl) {
			return (
				oControl instanceof g.FormInput
			);
		},

		/**
		* Traverses tree of children to find input control.
		*
		* @private
		*/
		_findInputControl: function (oControl) {
			oControl = oControl || this;

			var oInputControl = null;

			for (var n=0; n<oControl.children.length; n++) {
				if (this._isInput(oControl.children[n])) {
					return oControl.children[n];
				}
				if ((oInputControl = this._findInputControl(oControl.children[n]))) {
					return oInputControl;
				}
			}
		},

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.updateFocus(false);
				this._oInputControl = this._findInputControl();
				if (this._oInputControl instanceof g.FormInput) {
					this.addClass('g-form-input-decorator');
				}
			};
		}),

		/**
		* @method
		* @private
		*/
		createComponent: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this._oInputControl = this._findInputControl();
			};
		}),

		/**
		* @method
		* @private
		*/
		createComponents: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this._oInputControl = this._findInputControl();
			};
		}),

		/**
		* Accessibility : initialize
		*
		* @method
		* @private
		*/
		initAccessibility: enyo.inherit(function (sup) {
			return function () {
				sup.apply(this, arguments);
				this.setAttribute("role", null);
			};
		}),

		/**
		* Updates styling based on focus state.
		*
		* @param {Boolean} bFocus - Indicates whether to add or remove the `focused` class.
		* @public
		*/
		updateFocus: function (bFocus) {
			this.focused = bFocus;
		},

		/**
		* Retrieves this InputDecorator's child input control.
		*
		* @returns {Object} The reference to the child input control.
		* @public
		*/
		getInputControl: function () {
			return this._oInputControl;
		},

		// Event handlers:
		/**************************************************/

		/**
		* @private
		*/
		focusHandler: function (oSender, oEvent) {
			this.updateFocus(true);
		},

		/**
		* @private
		*/
		blurHandler: function () {
			this.updateFocus(false);
		},

		/**
		* @private
		*/
		disabledChangeHandler: function (oSender, oEvent) {
			this.addRemoveClass('disabled', oEvent.originator.disabled);
		},

		/**
		* @private
		*/
		onDown: function() {
			this._status = "down";
			this.removeClass("focused");
		},

		/**
		* @private
		*/
		onDragStart: function(inSender, inEvent) {
			this._status = "dragstart";
			this.removeClass("focused");
		},

		/**
		* @private
		*/
		onHold: function(inSender, inEvent) {
			this._status = "hold";
			if(!this._oInputControl.disabled){
				this.addClass("focused");
			}
		},

		/**
		* @private
		*/
		onUp: function(inSender, inEvent) {
			if(!this._oInputControl.disabled) {
				if(this._status === "down" && !this.hasClass("focused")) {
					this.addClass("focused");
					setTimeout(enyo.bind(this, this._offFocusedEffect, false), 100);
				}
				else if(this._status === "hold"){
					this.removeClass("focused");
				}
			}

			this._status = "up";
		},

		/**
		* @private
		*/
		onLeave: function(inSender, inEvent) {
			this._status = "leave";
			this.removeClass("focused");
		},

		/**
		* @private
		*/
		_offFocusedEffect: function() {
			this.removeClass("focused");
		}

	});

})(enyo, this);
