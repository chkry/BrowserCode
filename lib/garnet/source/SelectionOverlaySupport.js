(function (enyo, g, scope) {
	/**
	* _g.SelectionOverlaySupport_ is a mixin that may be applied to any
	* {@link g.DataList}/{@link g.DataGridList} item to provide an overlay that is
	* activated when the list is in selection mode.
	*
	* The selection overlay has three visual states:
	* - Focused but not selected
	* - Focused and selected
	* - Selected but not focused
	*
	* The item may define the `selectionScrimIcon` property to override the default icon.
	*
	*		{name: "list", selection: true, kind: "g.DataList", components: [
	*			{mixins: ["g.SelectionOverlaySupport"], selectionScrimIcon: "assets/my-icon.png",
	*				kind: "g.ImageItem", bindings: [
	*					{from: ".model.title", to: ".label"},
	*					{from: ".model.description", to: ".text"},
	*					{from: ".model.coverSource", to: ".source"}
	*				]
	*			}
	*		]}
	*
	* By default, the overlay icon is arranged by center horizontally and middle vertically over
	* the item, but you can override the default by specifying percentage values
	* for `selectionOverlayHorizontalOffset` and `selectionOverlayVerticalOffset`.
	* The horizontal offset is measured from the left in left-to-right locales, and from
	* the right in right-to-left locales.
	*
	*		{name: "gridList", selection: true, kind: "g.DataGridList", components: [
	*			{mixins: ["g.SelectionOverlaySupport"], kind: "g.GridListImageItem",
	*				selectionOverlayVerticalOffset: 35, bindings: [
	*					{from: ".model.text", to: ".caption"},
	*					{from: ".model.subText", to: ".subCaption"},
	*					{from: ".model.url", to: ".source"}
	*				]
	*			}
	*		]}
	*
	* @mixin g.SelectionOverlaySupport
	* @public
	*/
	g.SelectionOverlaySupport = {
		name: "g.SelectionOverlaySupport",

		/**
		* @private
		*/
		classes: "g-selection-overlay-support",

		/**
		* @private
		*/
		bindings: [
			{from: ".selectionScrimIcon", to: ".$.selectionScrimIcon.src"}
		],

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function (sup) {
			return function () {
				sup.apply(this, arguments);
				this.createChrome(this._selectionScrim);
				this.selectionOverlayHorizontalOffset = this.selectionOverlayHorizontalOffset === undefined ? 50 : this.selectionOverlayHorizontalOffset;
				this.selectionOverlayVerticalOffset = this.selectionOverlayVerticalOffset === undefined ? 50 : this.selectionOverlayVerticalOffset;
				this.selectionOverlayHorizontalOffsetChanged();
				this.selectionOverlayVerticalOffsetChanged();
				// Allow the icon to be modified by user
				this.selectionScrimIcon = this.selectionScrimIcon || "$lib/garnet/images/btn_check.svg";
			};
		}),

		/**
		* Accessibility : initialize
		*
		* @method
		* @private
		*/
		rendered: enyo.inherit(function (sup) {
			return function () {
				sup.apply(this, arguments);
				this.$.selectionScrimIcon.setAttribute("role", null);
				this.$.selectionScrimIcon.setAttribute("tabindex", null);
			};
		}),

		/**
		* @private
		*/
		_selectionScrim: [
			{classes: "enyo-fit g-selection-overlay-support-scrim", components: [
				{name:"selectionScrimIcon", kind: "g.IconButton", classes: "g-selection-overlay-support-checkbox"}
			]}
		],

		/**
		* @private
		*/
		selectionOverlayVerticalOffsetChanged: function() {
			this.$.selectionScrimIcon.applyStyle("top", this.selectionOverlayVerticalOffset + "%");
		},

		/**
		* @private
		*/
		selectionOverlayHorizontalOffsetChanged: function() {
			this.$.selectionScrimIcon.applyStyle((this.rtl ? "right" : "left"), this.selectionOverlayHorizontalOffset + "%");
		}
	};

})(enyo, g, this);
