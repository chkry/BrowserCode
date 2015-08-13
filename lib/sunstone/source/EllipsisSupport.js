/**
* The _sun.EllipsisSupport_ mixin give ellipsiss effect to text.
*
* @mixin sun.EllipsisSupport
* @public
*/
sun.EllipsisSupport = /** @lends sun.EllipsisSupport.prototype */ {

	/**
	* @private
	*/
	name: "EllipsisSupport",

	/**
	* @private
	*/
	classes: "sun-ellipsis",

	/**
	* @private
	*/
	style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"
};
