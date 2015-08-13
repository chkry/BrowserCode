/**
* _sun.Scroller_ extends [enyo.Scroller]{@link http://enyojs.com/docs/latest/api.html#enyo.Scroller}.
*
* @class sun.Scroller
* @extends enyo.Scroller
* @public
*/
enyo.kind(
	/** @lends sun.Scroller.prototype */ {

	/**
	* @private
	*/
	name:      "sun.Scroller",

	/**
	* @private
	*/
	kind:      "enyo.Scroller",

	/**
	* @private
	*/
	published: /** @lends sun.Scroller.prototype */ {

		/**
		* If `true`, the scroller selects a platform-appropriate _touch_based_
		* scrolling strategy. Note that if the [strategyKind]{@link http://enyojs.com/docs/latest/api.html#enyo.Scroller::strategyKind}
		* property is specified, then
		* the [strategyKind]{@link http://enyojs.com/docs/latest/api.html#enyo.Scroller::strategyKind} takes precedence over this setting.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		touch:true
	}
});