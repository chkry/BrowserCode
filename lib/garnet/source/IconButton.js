(function (enyo, g, scope) {
	/**
	* _g.IconButton_ is an icon that acts like a button.
	* To specify the icon image set the [src]{@link g.IconButton#src} property
	* as the URL to the image location.
	*
	* To combine an icon with text inside a button,
	* use a [g.Icon]{@link g.Icon} inside a [g.Button]{@link g.Button}.
	*
	* The image associated with the [src]{@link g.IconButton#src} property is assumed to be a 48x144 pixel strip,
	* with three button images stacked, each button image for the button's status below
	* (in order from top to bottom).
	*
	* - 1<sup>st</sup> Image: Normal
	* - 2<sup>nd</sup> Image: Pressed
	* - 3<sup>rd</sup> Image: Disabled
	*
	* To use an image in different size than the default size,
	* explicitly set the width and the height of the icon.
	*
	* @class g.IconButton
	* @extends g.ButtonIconBase
	* @public
	*/
	enyo.kind(
		/** @lends g.IconButton.prototype */ {

		/**
		* @private
		*/
		name: "g.IconButton",

		/**
		* @private
		*/
		kind: "g.ButtonIconBase",

		/**
		* @private
		*/
		published:
			/** @lends g.IconButton.prototype */ {

			/**
			* URL of the icon image file.
			*
			* @type {String}
			* @default ""
			* @public
			*/
			src: ""
		},

		/**
		* Indicates whether to use a single image or not.
		*
		* The default value of this property is `false`, which means that
		* the image associated with the [src]{@link g.IconButton#src} property is assumed to be a pixel strip
		* with three parts, each part indicating button's status below (in order from the top to bottom.)
		*
		* - 1<sup>st</sup> Image: Normal
		* - 2<sup>nd</sup> Image: Pressed
		* - 3<sup>rd</sup> Image: Disabled
		*
		* If this property is `true`,
		* the image associated with the [src]{@link g.IconButton#src} property is assumed to be a _normal_ image
		* and the image does change its presentation when this IconButton is pressed or disabled.
		*
		* Range: [`true`, `false`]
		*
		* - `true`: The image resource is assumed to be a single image.
		* - `false`: The image resource is assumed to be a pixel strip image.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		useSingleImage: false,

		/**
		* @private
		*/
		_srcHeight: "",

		/**
		* @private
		*/
		_active: false,

		/**
		* @private
		*/
		_node: null,

		/**
		* @private
		*/
		classes: "g-icon-button",

		/**
		* @method
		* @private
		*/
		rendered: enyo.inherit(function(sup) {
			return function() {
				this.srcChanged();
				this._node = this.hasNode();
				this._srcHeight = parseInt(enyo.dom.getComputedStyleValue(this._node, "height"), 10) || 48;
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
		* @private
		*/
		srcChanged: function() {
			if (this.src !== undefined && this.src !== "") {
				this.applyStyle("background-image", "url(" + enyo.path.rewrite(this.src) + ")");
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
		* @private
		*/
		_effectPressed: function() {
			this._changeEffect();
		},

		/**
		* @method
		* @private
		*/
		addClass: enyo.inherit(function(sup) {
			return function(inClass) {
				if (inClass === "active") {
					this._active = true;
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
					this._active = false;
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
			var distance = 0;
			if (!this.useSingleImage) {
				if (this.disabled) {
					distance += 2;
				} else if (this.pressed || this._active) {
					distance += 1;
				}
			}
			if (distance === 0) {
				this.applyStyle("background-position", null);
			} else {
				this.applyStyle("background-position", "0 -" + (this._srcHeight * distance) + "px");
			}
			this.setAttribute("disabled", this.disabled);
		}
	});

})(enyo, g, this);
