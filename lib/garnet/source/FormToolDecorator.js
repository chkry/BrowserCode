(function (enyo, g, scope) {
	/**
	* _g.FormToolDecorator_ is a control to layout form controls horizontally.
	* The controls in _g.FormToolDecorator_ have no margin and become inline-block elements.
	*
	* @class g.FormToolDecorator
	* @extends enyo.ToolDecorator
	* @public
	*/
	enyo.kind(
		/** @lends g.ToolDecorator.prototype */ {

		/**
		* @private
		*/
		name: "g.FormToolDecorator",

		/**
		* @private
		*/
		kind: "enyo.ToolDecorator",

		/**
		* @private
		*/
		classes: "g-form-tool-decorator"
	});

})(enyo, g, this);
