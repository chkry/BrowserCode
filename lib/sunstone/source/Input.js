/**
* _sun.Input_ is a Sunstone-styled input control, derived from
* [enyo.Input]{@link http://enyojs.com/docs/latest/api/#enyo.Input}. Typically, a `sun.Input` is placed inside a
* {@link sun.InputDecorator}, which provides styling. For example:
*
* ```
* {kind: 'sun.InputDecorator', components: [
*	{kind: 'sun.Input', placeholder: 'Enter some text...', onchange: 'inputChange'}
* ]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@link http://enyojs.com/docs/latest/building-apps/controls/text-fields.html} in the
* Enyo Developer Guide.
*
* @class sun.Input
* @extends enyo.Input
* @public
*/

enyo.kind(
	/** @lends sun.Input.prototype */ {

	/**
	* @private
	*/
	name	: 'sun.Input',

	/**
	* @private
	*/
	kind	: 'enyo.Input',

	/**
	* @private
	*/
	classes	: 'sun-input',

	/**
	* @private
	* @lends sun.Input.prototype
	*/
	published: {

		/**
		* Indicates whether to blur the text in the input field.
		* If `true`, the input appears as unfocused on the Enter key press (if the input had been focused).
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		dismissOnEnter: false
	},

	/**
	* @private
	*/
	handlers: {
		ondragstart	: 'dragstart',
		ondrag		: 'drag',
		ondragfinish: 'dragfinish',
		onkeypress : 'onKeyPress',
		onblur     : 'onBlur',
		onclick    : 'onClick'
	},

	/**
	* Used only for [dismissOnEnter]{@link sun.Input#dismissOnEnter} feature;
	* we cannot rely on `hasFocus()` in this case due to race condition.
	*
	* @private
	*/
	_bFocused: false,

	/**
	* @private
	*/
	handleResize: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			if(!this.disabled && this._bFocused === true) {
				enyo.log("Input handleResize");
				enyo.job("bubbleRequestScrollIntoView", this.bindSafely("_bubbleRequestScrollIntoView"), 50);
			}
		};
	}),

	/**
	* @private
	*/
	focused: enyo.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			this._updateFocus(true);
		};
	}),

	/**
	* @private
	*/
	onClick: function() {
		if(!this.disabled && this._bFocused === true) {
			enyo.job("bubbleRequestScrollIntoView", this.bindSafely("_bubbleRequestScrollIntoView"), 150);
		}
		return true;
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
	onKeyPress: function(oSender, oEvent) {
		if (this.dismissOnEnter) {
			if (oEvent.keyCode == 13) {
				if (this._bFocused) {
					this._blur();
				}
			}
		}
	},

	/**
	* @private
	*/
	dragstart: function(inSender, inEvent) {
		var inputDom = enyo.dom.byId(this.id),
			canScrollSize = inputDom.scrollWidth - inputDom.clientWidth;

		if(canScrollSize > 0 && inEvent.horizontal)
		{
			this.dragging = true;
			this.preDx = 0;
			this._dragging(inSender, inEvent);
			return true;
		}
	},

	/**
	* @private
	*/
	drag: function(inSender, inEvent) {
		if(this.dragging)
		{
			this._dragging(inSender, inEvent);
			return true;
		}
	},

	/**
	* @private
	*/
	dragfinish: function(inSender, inEvent) {
		if (this.dragging) {
			this.dragging = null;
			this.checkUnderScroll = null;
			this.checkOverScroll = null;
			this.preDx = null;
			inEvent.preventTap();
			return true;
		}
	},

	/**
	* @private
	*/
	_dragging: function(inSender, inEvent) {
		if(this.dragging !== true)
		{
			return;
		}

		var inputDom = enyo.dom.byId(this.id),
			amountOfScroll = this.preDx + (-inEvent.dx),
			newScrollLeft = inputDom.scrollLeft + amountOfScroll,
			canScrollSize = inputDom.scrollWidth - inputDom.clientWidth;

		this.preDx = inEvent.dx;
		if(newScrollLeft >= 0 && newScrollLeft <= canScrollSize)
		{
			inputDom.scrollLeft = newScrollLeft;
		}
		else
		{
			if(newScrollLeft < 0)
			{
				if(!this.checkUnderScroll)
				{
					this.checkUnderScroll = true;
					this.checkOverScroll = false;
					inputDom.scrollLeft = 0;
				}
			}
			else
			{
				if(!this.checkOverScroll)
				{
					this.checkUnderScroll = false;
					this.checkOverScroll = true;
					inputDom.scrollLeft = canScrollSize;
				}
			}
		}
		return true;
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
		var decorator = this._getDecorator(),
			mkEvent = this._makeEvent(decorator);

		(decorator || this).bubble("onRequestScrollIntoView", mkEvent);
	},

	/**
	* @private
	*/
	_blur: function() {
		if (this.hasNode()) {
			this.node.blur();
		}
	},

	/**
	* @private
	*/
	_updateFocus: function(bFocus) {
		this._bFocused = bFocus;
		this.addRemoveClass('sun-focused', bFocus);
	},

	/**
	* @private
	*/
	_getDecorator: function() {
		var container,
			_this = this;

		do{
			container = _this.container;
			if(container === undefined || container === this.owner) {
				return this;
			}
			if(container && container.kind === "sun.InputDecorator"){
				return container;
			}
			_this = container;
		}while(_this);

		return this;
	}
});
