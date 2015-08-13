/**
* _sun.DataGridList_ is an [enyo.DataGridList]{@link http://enyojs.com/docs/latest/api/#enyo.DataGridList} with {@link sun.Scroller}.
*
* @class sun.DataGridList
* @extends enyo.DataGridList
* @public
*/
enyo.kind(
	/** @lends sun.DataGridList.prototype */ {

	/**
	* @private
	*/
	name: "sun.DataGridList",

	/**
	* @private
	*/
	kind: "enyo.DataGridList",

	/**
	* @private
	*/
	scrollerOptions: { kind:"sun.Scroller" }
});