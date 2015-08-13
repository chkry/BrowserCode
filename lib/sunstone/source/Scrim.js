/**
 * _sun.Scrim_ provides an overlay that prevents taps from propagating to
 * the controls that it covers. A scrim may be 'floating' or 'non-floating'.
 * A floating scrim will fill the entire viewport, while a non-floating
 * scrim will be constrained by the dimensions of its container.
 *
 * The scrim should have a CSS class of inner-scrim-transparent, inner-scrim-translucent,
 * or any other class that has pointer-events: auto in its style properties
 *
 * The z-index can be specified at the position desired to show the scrim by passing
 * an integer value to [showAtZIndex()]{@link sun.Scrim#showAtZIndex}; If this is done,
 * then [hideAtZIndex()]{@link @link sun.Scrim#hideAtZIndex} must be called with the same value to hide the scrim.
 *
 * @class sun.Scrim
 * @extends enyo.Control
 * @ui
 * @private
 */
enyo.kind(
	/** @lends  sun.Scrim.prototype */ {

	/**
	 * @private
	 */
	name: "sun.Scrim",

	/**
	 * @private
	 */
	kind: 'enyo.Control',

	/**
	 * Current visibility state of the scrim
	 *
	 * @type {Boolean}
	 * @private
	 */
	showing: false,

	/**
	 * @private
	 */
	defaultOpacity: 0.3,

	/**
	 * @private
	 */
	customOpacity: 0.3,

	/**
	 * @private
	 */
	isUseDefaultOpacity: true,

	/**
	 * @private
	 */
	classes: "inner-scrim enyo-fit",

	/**
	 * Indicates whether to render the scrim over the entire viewport.
	 * If `true`, the scrim is rendered in a floating layer on top of other controls, filling the entire viewport.
	 * This can be used to guarantee that the scrim gets displayed on top of other controls.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	floating: false,

	/**
	 * @private
	 */
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.zStack = [];
			if (this.floating) {
				this.setParent(enyo.floatingLayer);
			}
		};
	}),

	/**
	 * @private
	 */
	showingChanged: function() {
	// auto render when shown.
		if (this.floating && this.showing && !this.hasNode()) {
			this.render();
		}
		this.inherited(arguments);
		//this.addRemoveClass(this.showingClassName, this.showing);
	},

	/**
	 * @private
	 */
	addZIndex: function(inZIndex) {
		if (enyo.indexOf(inZIndex, this.zStack) < 0) {
			this.zStack.push(inZIndex);
		}
	},

	/**
	 * @private
	 */
	removeZIndex: function(inControl) {
		enyo.remove(inControl, this.zStack);
	},

	/**
	 * Shows scrim at the given z-index. Note that if this method has been called, then the
	 * [hideAtZIndex()]{@link sun.Scrim#hideAtZIndex} method must be called, to properly unwind the z-index stack.
	 *
	 * @param  {Number} zIndex - z-index of the scrim
	 * @private
	 */
	showAtZIndex: function(inZIndex) {
		this.addZIndex(inZIndex);
		if (inZIndex !== undefined) {
			this.setZIndex(inZIndex);
		}

		this.applyStyle('opacity', this.isUseDefaultOpacity ? this.defaultOpacity : this.customOpacity);
		this.show();
	},

	/**
	 * Hides scrim at the given z-index.
	 *
	 * @param  {Number} zIndex - z-index of the scrim
	 * @private
	 */
	hideAtZIndex: function(inZIndex) {
		this.removeZIndex(inZIndex);
		if (!this.zStack.length) {
			this.hide();
		} else {
			var z = this.zStack[this.zStack.length-1];
			this.setZIndex(z);
		}
	},

	/**
	 * Sets scrim to show at passed-in z-index.
	 *
	 * @private
	 */
	setZIndex: function(inZIndex) {
		this.zIndex = inZIndex;
		this.applyStyle("z-index", inZIndex);
	},
	make: function() {
		return this;
	}
});

/**
 // Scrim singleton exposing a subset of Scrim API; it is replaced with a proper [enyo.Scrim]{@link enyo.Scrim} instance.
 *
 * @class sun.scrimSingleton
 * @private
 */
enyo.kind({

	/**
	 * @private
	 */
	name: "sun.scrimSingleton",

	/**
	 * @private
	 */
	kind: null,

	/**
	 * @private
	 */
	constructor: enyo.inherit(function(sup) {
		return function(inName, inProps) {
			sup.apply(this, arguments);
			this.instanceName = inName;
			enyo.setPath(this.instanceName, this);
			this.props = inProps || {};
		};
	}),

	/**
	 * @private
	 */
	make: function() {
		var s = new sun.Scrim(this.props);
		enyo.setPath(this.instanceName, s);
		return s;
	},

	/**
	 * @private
	 */
	showAtZIndex: function(inZIndex) {
		var s = this.make();
		s.showAtZIndex(inZIndex);
	},
	// in case somebody does this out of order

	/**
	 * @private
	 */
	hideAtZIndex: enyo.nop,

	/**
	 * @private
	 */
	show: function() {
		var s = this.make();
		s.show();
	}
});

new sun.scrimSingleton("sun.scrim", {floating: true, classes: "inner-scrim-translucent"});
new sun.scrimSingleton("sun.scrimTransparent", {floating: true, classes: "inner-scrim-transparent"});
