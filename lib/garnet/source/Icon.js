(function (enyo, g, scope) {
	/**
	* _g.Icon_ is a control that displays an icon.
	* To specify the icon image, set the [src]{@link g.Icon#src} property as the URL to the image location.
	*
	* In Garnet, the default icon size is 48x48 pixels.
	* To use an icon in the size different from the default size,
	* set the width and the height of the icon,
	* because an icon image is applied as CSS background.
	*
	* @class g.Icon
	* @public
	* @example
	* {kind: "g.Icon", src: "images/search.png"}
	*/
	enyo.kind(
		/** @lends g.Icon.prototype */ {

		/**
		* @private
		*/
		name: "g.Icon",

		/**
		* @private
		*/
		published:
			/** @lends g.Icon.prototype */ {

			/**
			* URL of the icon image file.
			*
			* @type {String}
			* @default ""
			* @public
			*/
			src: "",

			/**
			* Indicates whether to display this icon as enabled or disabled.
			*
			* Range: [`true`, `false`]
			*
			* - `true`: This icon is displayed as disabled.
			* - `false`: This icon is displayed as enabled.
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
		classes: "g-icon",

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.srcChanged();
				this.disabledChanged();
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
		disabledChanged: function() {
			this.addRemoveClass("disabled", this.disabled);
		},

		/**
		* @private
		*/
		getSrc: function() {
			return this.src;
		}
	});

})(enyo, g, this);
