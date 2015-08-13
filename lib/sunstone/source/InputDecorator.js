/**
* _sun.InputDecorator_ provides input styling. Any controls
* in a `sun.InputDecorator` will appear to be inside an area styled as an input.
* `sun.InputDecorator` _surrounds_ [sun.Input]{@link sun.Input}:
}
*
* ```
* {kind: 'sun.InputDecorator', components: [
*	{kind: 'sun.Input'}
* ]}
* ```
*
* Other controls, such as buttons, may be placed to the right or left of the
* input control. For example:
*
* ```
* {kind: 'sun.InputDecorator', components: [
*	{kind: 'sun.IconButton', src: 'search.png'},
*	{kind: 'sun.Input'},
*	{kind: 'sun.IconButton', src: 'cancel.png'}
* ]}
* ```
*
* Note that the `sun.InputDecorator` fits around the content inside it. If the
* decorator is sized, then its contents will likely need to be sized as well.
*
* ```
* {kind: 'sun.InputDecorator', style: 'width: 500px;', components: [
*	{kind: 'sun.Input', style: 'width: 100%;'}
* ]}
* ```
*
* @class sun.InputDecorator
* @extends enyo.ToolDecorator
* @public
*/

enyo.kind(
	/** @lends sun.InputDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'sun.InputDecorator',

	/**
	* @private
	*/
	kind: 'enyo.ToolDecorator',

	/**
	* @private
	*/
	tag: "div",

	/**
	* @private
	*/
	handlers: {
		onDisabledChange  : 'onDisabledChange',
		onfocus           : 'onFocus',
		onblur            : 'onBlur',
		onclick           : 'onClick'
	},

	/**
	* @private
	*/
	_oInputControl: null,

	/**
	* @private
	*/
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this._updateFocus(false);
			this._oInputControl = this._findInputControl();
			if (this._oInputControl instanceof sun.Input) {
				this.addClass("sun-input-decorator");
			}
		};
	}),

	/**
	* @private
	*/
	createComponent: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this._oInputControl = this._findInputControl();
		};
	}),

	/**
	* @private
	*/
	createComponents: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this._oInputControl = this._findInputControl();
		};
	}),

	/**
	* @private
	*/
	_isInput: function(oControl) {
		return (
			oControl instanceof sun.Input		||
			oControl instanceof sun.RichText	||
			oControl instanceof sun.TextArea
		);
	},

	/**
	* Traverses tree of children to find input control.
	*
	* @private
	*/
	_findInputControl: function(oControl) {
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
	* Retrieves the child input control in the InputDecorator.
	*
	* @returns {Object} The reference to the child input control in the InputDecorator.
	* @public
	*/
	getInputControl: function() {
		return this._oInputControl;
	},

	// Event handlers:
	/**************************************************/

	/**
	* @private
	*/
	onFocus: function(oSender, oEvent) {
		this._updateFocus(true);
	},

	/**
	* @private
	*/
	onBlur: function() {
		this._updateFocus(false);
	},

	/**
	* @private
	*/
	onDisabledChange: function(oSender, oEvent) {
		this.disabled = oEvent.originator.disabled;
		this.addRemoveClass('sun-disabled', oEvent.originator.disabled);
	},

	/**
	* @private
	*/
	onClick: function() {
		if(!this.disabled) {
			this._bubbleRequestScrollIntoView();
			if (this._oInputControl.hasNode()) {
				this._oInputControl.node.focus();
			}
		}
		return true;
	},

	/**
	* @private
	*/
	_updateFocus: function(bFocus) {
		this.focused = bFocus;

		var isFocused = this.alwaysLooksFocused || this.focused;
		this.addRemoveClass('sun-focused', isFocused);
	},

	/**
	* @private
	*/
	_makeEvent: function(decorator) {
		var e = {};
		e.originator = decorator;
		e.enableAnimate = false; // no animate
		return e;
	},

	/**
	* @private
	*/
	_bubbleRequestScrollIntoView: function() {
		var mkEvent = this._makeEvent(this);
		this.bubble("onRequestScrollIntoView", mkEvent);
	}
});
