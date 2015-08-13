/**
* _sun.Icon_ displays an icon image.
* Set the [src]{@link sun.Icon#src} property to the image file URL;
* this type of icon is called image-based icon.
*
* ```
* {kind: "sun.Icon", src: "images/search.png"}
* ```
*
* Another type of icon is asset-based. Asset-based icons use preloaded icon images by setting the [icon]{@link sun.Icon#icon}
* property to the pre-defined icon name, e.g.
*
* ```
* {kind: "sun.Icon", icon: "setting"}
* ```
* The current Sunstone version only supports one icon, i.e. setting.
*
* By default, three sizes are supported for the icon image:
* * `”large”`: 64 x 64 pixels
* * `”normal”`: 48 x 48 pixels
* * `”small”`: 32 x 32 pixels
*
* Default icon [size]{@link sun.Icon#size} is `”normal”`.
* To use a large icon, set the [size]{@link sun.Icon#size} property to `”large”`:
*
* ```
* {kind: "sun.Icon", src: "images/search.png", size: "large"}
* {kind: "sun.Icon", icon: "setting", size: "large"}
* ```
* To use an image of the size different from the three default sizes,
* explicitly define the height and the width of the image (Images are used ass CSS backgrounds).
*
* To use an icon that acts like a button, use
* [sun.IconButton]{@link sun.IconButton} instead.
*
* @ui
* @class sun.Icon
* @extends enyo.Control
* @public
*/
enyo.kind(
	/** @lends sun.Icon.prototype */ {

	/**
	* @private
	*/
	name: "sun.Icon",

	/**
	* @private
	*/
	published: /** @lends sun.Icon.prototype */ {

		/**
		* The name of the icon to be used. This property is used to only for asset-based icon. Currently
		* available icon name is `”setting”`.
		*
		* "setting"
		*
		* @type {String}
		* @default ""
		* @public
		*/
		icon: "",

		/**
		* URL of the icon image file.
		*
		* @type {String}
		* @default ""
		* @public
		*/
		src: "",

		/**
		* Indicates whether to disable the icon. If `true`, the icon is displayed as disabled.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* Size of the icon. The valid values and their widths are shown below.
		* * `”large”`: 64 x 64 pixels
		* * `”normal”`: 48 x 48 pixels
		* * `”small”`: 32 x 32 pixels
		*
		* @type {String}
		* @default "normal"
		* @public
		*/
		size: "normal"
	},

	/**
	* @private
	*/
	classes: "sun-icon inner-icon",

	/**
	* @private
	*/
	create: enyo.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			if (this.src) {
				this.srcChanged();
			}
			if (this.icon) {
				this.iconChanged();
			}
			this.sizeChanged();
			this.disabledChanged();
		};
	}),

	/**
	* @private
	*/
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
	},

	/**
	* @private
	*/
	srcChanged: function() {
		if (this.src) {
			this.applyStyle("background-image", "url(" + enyo.path.rewrite(this.src) + ")");
		}
	},

	/**
	* @returns {String} URL of the icon image file, i.e. the value of `sun.Icon`’s [src]{@link sun.Icon#src} property.
	* @public
	*/
	getSrc: function () {
		return this.src;
	},

	/**
	* @private
	*/
	getIconClass: function(inIconName) {
		return "sun-icon-" + (inIconName || this.icon);
	},

	/**
	* @private
	*/
	iconChanged: function(inOld) {
		if (inOld) {
			this.removeClass(this.getIconClass(inOld));
		}
		this.addClass(this.getIconClass());
	},

	/**
	* @private
	*/
	sizeChanged: function() {
		this.addRemoveClass("small",this.size === "small");
		this.addRemoveClass("large", this.size === "large");
	}
});