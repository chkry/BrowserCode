/**
* _sun.GridFlyweightRepeater_ extends [enyo.FlyweightRepeater]{@link http://enyojs.com/docs/latest/api/#enyo.FlyweightRepeater}
* and lays out items in a grid pattern.
*
* @class sun.GridFlyweightRepeater
* @extends enyo.FlyweightRepeater
* @public
*/
enyo.kind(
	/** @lends sun.GridFlyWeightRepeater.prototype */{

	/**
	* @private
	*/
	name: "sun.GridFlyWeightRepeater",

	/**
	* @private
	*/
	kind: "enyo.FlyweightRepeater",

	/**
	* @private
	*/
	events: {
		/**
			Fires once per item at pre-render time, to determine the item's dimensions.

			_inEvent.index_ contains the current item index.

			_inEvent.selected_ is a boolean indicating whether the current item is selected.
		*/
		onSizeupItem: ""
	},

	/**
	* @private
	*/
	itemsPerRow: 0,

	/**
	* @private
	*/
	_itemsFromPreviousPage: 0,

	/**
	* @private
	*/
	generateChildHtml: function() {
		return this._generateChildHtmlEqualSizedItems();
	},

	/**
	* @private
	*/
	_generateChildHtmlEqualSizedItems: function() {
		var cl = this.$.client, ht = "";
		if(!cl.getStyle()){
			cl.addStyles("width:" + this.itemWidth + "px;height:" + this.itemHeight + "px;");
			if (this.itemSpacing >= 0) {
				cl.addStyles("margin:"+this.itemSpacing+"px;");
			}
		}
		for (var i=this.rowOffset; i < this.rowOffset + this.count; i++) {
			// Setup each item
			cl.setAttribute("data-enyo-index", i);
			this.doSetupItem({index: i, selected: this.isSelected(i)});
			ht += enyo.HTMLStringDelegate.generateHtml(cl);
			cl.teardownRender();
		}
		return ht;
	}
});