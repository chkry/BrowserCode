	(function (enyo, g, scope) {

	/**
	* _g.MenuScroller_ is Panel that contains {@link g.MenuItem}s as its items.
	* It supports certain kind of itmes like below.
	*
	* @class g.MenuScroller
	* @extends g.Panel
	* @public
	* @example
	*	{kind: "g.MenuScroller", 
	*	 components: [
	*	    {name: "item", kind: "g.MenuToggleIconButton", content: "Wifi", ...},
		    {name: "item2", kind: "g.MenuCheckbox", content: "This is long check item", ontap: "onItemSelected"},
		    {name: "item3", kind: "g.MenuToggleIconButton", content: "Edit", ontap: "onItemSelected"},
	*	]}
	*/
	enyo.kind(
		/** @lends g.MenuScroller.prototype */ {

		/**
		* @private
		*/
		name: "g.MenuScroller",

		/**
		* @private
		*/
		kind: "g.Scroller",

		/**
		* @private
		*/
		classes: "g-menu-scroller"
	});

})(enyo, g, this);
