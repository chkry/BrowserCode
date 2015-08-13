(function (enyo, g, scope) {
	/**
	* _g.Spinner_ is a control that shows a spinning animation to indicate that
	* there is an active activity. Typically, a spinner is shown to indicate an active activity
	* and hidden to indicate that the activity has ended.
	* The animation automatically starts when the spinner is displayed.
	* The animation is controllable by using the [start()]{@link g.Spinner#start},
	* [stop()]{@link g.Spinner#stop} and [toggle()]{@link g.Spinner#toggle} methods.
	*
	* @class g.Spinner
	* @public
	*/
	enyo.kind(
		/** @lends g.Spinner.prototype */ {

		/**
		* @private
		*/
		name: "g.Spinner",

		/**
		* @private
		*/
		classes: "g-spinner",

		/**
		* @method
		* @private
		*/
		contentChanged: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.addRemoveClass("content", !!this.content);
			};
		}),

		/**
		* Accessibility : initialize
		*
		* @method
		* @public
		*/
		initAccessibility: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);

				// accessibility - add loading label
				this.setAttribute("aria-label", g.$L({key: "g_loading", value: "loading"}));
			};
		}),

		/**
		* Hides the animating spinner.
		*
		* @method
		* @public
		*/
		stop: function() {
			this.setShowing(false);
		},

		/**
		* Displays this spinner in animation.
		*
		* @method
		* @public
		*/
		start: function() {
			this.setShowing(true);
		},

		/**
		* Toggles the spinner's visibility state, i.e. displays the spinner
		* if it is invisible and hides the spinner if it is visible.
		*
		* @method
		* @public
		*/
		toggle: function() {
			this.setShowing(!this.getShowing());
		}
	});

})(enyo, g, this);
