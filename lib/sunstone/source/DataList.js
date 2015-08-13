/**
* _sun.DataList_ is an [enyo.DataList]{@link http://enyojs.com/docs/latest/api/#enyo.DataList} with {@link sun.Scroller}.
*
* @class sun.DataList
* @extends enyo.DataList
* @public
*/
enyo.kind(
	/** @lends sun.DataList.prototype */ {

	/**
	* @private
	*/
	name: "sun.DataList",

	/**
	* @private
	*/
	kind: "enyo.DataList",

	/**
	* @private
	*/
	scrollerOptions: { kind:"sun.Scroller" }
});
