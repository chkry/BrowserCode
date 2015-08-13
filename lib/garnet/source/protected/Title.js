(function (enyo, scope) {
	/**
	* _g.Title_ is a title component for [g.Panel]{@link g.Panel}.
	*
	* @class g.Title
	* @private
	*/
	enyo.kind(
		/** @lends g.Title.prototype */ {

		/**
		* @private
		*/
		name: "g.Title",

		/**
		* @private
		*/
		published:
			/** @lends g.Title.prototype */ {

			/**
			* Icon image that displaying on the left side of the title.
			* This property is set if the title is used for the menu scroller's title
			*
			* Range [true, false]
			*
			* - `true`: The icon is showing
			* - `false`: The icon is hiding
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			icon: false
		},

		/**
		* @private
		*/
		classes: "g-title",

		/**
		* @private
		*/
		ignoreWheelControl: true,

		/**
		* @private
		*/
		components: [
			{name: 'content', classes: 'g-title-content'}
		],

		/**
		* @private
		*/
		bindings: [
			{from: '.content', to: '.$.content.content'},
		],

		/**
		* @private
		*/
		iconChanged: function() {
			this.addRemoveClass('g-title-icon', this.icon);
		}
	});

})(enyo, this);
