/**
* _sun.GridListImageItem_ is a component that can be used inside a
* {@link sun.GridList} and {@link sun.DataGridList} to display images in grids with
* optional captions.
*
* @class sun.GridListImageItem
* @extends enyo.Control
* @public
*/
enyo.kind(
	/** @lends sun.GridListImageItem.prototype */ {

	/**
	* @private
	*/
	name: "sun.GridListImageItem",

	/**
	* @private
	*/
	classes: "sun-gridlist-imageitem",

	/**
	* @private
	*/
	components: [
		{name: 'image', kind: 'enyo.Image'},
		{name: "caption", classes: "caption"}
	],

	/**
	* @private
	* @lends sun.GridListImageItem.prototype
	*/
	published: {

		/**
		*
		* The absolute URL path to the image.
		*
		* @type {String}
		* @default ""
		* @public
		*/
		source: '',

		/**
		*
		* The caption for the image.
		*
		* @type {String}
		* @default ""
		* @public
		*/
		caption: '',

		/**
		*
		* Indicates whether to use the CSS class `selected` to decorate when this image item is selected.
		* If `true`, the CSS class selected is used.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		selected: false
	},

	/**
	* @private
	*/
	bindings: [
		{from: ".source", to: ".$.image.src"},
		{from: ".caption", to: ".$.caption.content"},
		{from: ".caption", to: ".$.caption.showing", kind: "enyo.EmptyBinding"}
	],

	/**
	* @private
	*/
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.selectedChanged();
		};
	}),

	/**
	* @private
	*/
	selectedChanged: function() {
		this.addRemoveClass("selected", this.selected);
	},

	/**
	* @private
	*/
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
	}
});