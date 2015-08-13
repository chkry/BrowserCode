/**
* _sun.Button_ is an [enyo.Button]{@link http://enyojs.com/docs/latest/api.html#enyo.Button}
* in Sunstone style. The button color is customizable by specifying the background color.
*
*
* @class sun.Button
* @extends enyo.Button
* @public
*/
enyo.kind(
	/** @lends sun.Button.prototype */ {

	/**
	* @private
	*/
	name: 'sun.Button',

	/**
	* @private
	*/
	kind: 'enyo.Button',

	/**
	* @private
	*/
	handlers: {

		/**
		* _ondown_ simulates _mousedown_.
		* @private
		*/
		ondown : 'depress',

		/**
		* _onup_ simulates _mouseup_.
		* @private
		*/
		onup : 'undepress',

		/**
		* Also make sure we remove the pressed class if touch point is left from
		* this item before it receives a keyup.
		* @private
		*/
		onleave : 'undepress'
	},

	/**
	* @private
	*/
	classes: 'sun-button sun-header-font enyo-unselectable',

	/**
	* On creation.
	* @private
	*/
	initComponents: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.addContents();
		};
	}),

	/**
	* @private
	*/
	addContents: function(){
		this.createComponent({name: "text", mixins: ["sun.EllipsisSupport"], classes: "sun-button-text", content: this.content}).render();
	},

	/**
	* Override to handle potential child components.
	* @private
	*/
	contentChanged: function() {
		if (this.$.text) {
			this.$.text.setContent(this.getContent());
		} else {
			this.inherited(arguments);
		}
	},

	/**
	* Adds _pressed_ CSS class.
	* @private
	*/
	depress: function() {
		this.addClass('pressed');
	},

	/**
	* Removes _pressed_ CSS class.
	* @private
	*/
	undepress: function() {
		this.removeClass('pressed');
	}
});