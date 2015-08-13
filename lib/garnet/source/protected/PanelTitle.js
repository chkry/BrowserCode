(function (enyo, scope) {
	/**
	* _g.PanelTitle_ is a control that appears at the top of the
	* screen and takes up the full screen width.
	*
	* @class g.PanelTitle
	* @extends g.Title
	* @private
	*/
	enyo.kind(
		/** @lends g.PanelTitle.prototype */ {

		/**
		* @private
		*/
		name: 'g.PanelTitle',

		/**
		* @private
		*/
		kind: 'g.Title',

		/**
		* @private
		*/
		classes: 'g-panel-title',

		published:
			/** @lends g.PanelTitle.prototype */ {

			/**
			* When `true`, title will animate on/off screen.
			*
			* Range [true, false]
			*
			* - `true`: The title is showing/hiding with animation
			* - `false`: The title is showing/hiding without animation
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			animate: true
		},

		/**
		* @private
		*/
		handlers: {
			onStartPanelAnimation: "refresh",
			onAppResume: "refresh"
		},

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.animateChanged();
				this.showingChanged();
			};
		}),

		/**
		* @private
		*/
		animateChanged: function() {
			this.addRemoveClass('animate', this.animate);
			if (!this.animate) {
				this.applyStyle('bottom', null);
			}
		},

		/**
		* @method
		* @private
		*/
		showingChanged: enyo.inherit(function(sup) {
			return function() {
				if (!this.animate) {
					sup.apply(this, arguments);
				}
				this.addRemoveClass("showing", this.showing);
			};
		}),

		/**
		* Hide the title. This respects the current state of the
		* [animate]{@link g.PanelTitle#animate} property, hiding with or without animation.
		*
		* @method
		* @public
		*/
		hide: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.removeClass('showing');
			};
		}),

		/**
		* Overrides the default `getShowing()` behavior to avoid setting `this.showing` based on the
		* CSS `display` property.
		*
		* @method
		* @private
		*/
		getShowing: enyo.inherit(function(sup) {
			return function() {
				if (this.animate) {
					return this.showing;
				} else {
					return sup.apply(this, arguments);
				}
			};
		}),

		/**
		* @private
		*/
		showTitleDirect: function() {
			this.showDirect();
		},

		/**
		* Skips animation and jumps to the final shown state.
		*
		* @public
		*/
		showDirect: function() {
			var anim = this.animate;
			if (anim) {
				this.set('animate', false);
			}
			this.show();
			if (anim) {
				// getComputedStyleValue forces the browser to update the style rules before
				// proceeding. Otherwise the removal and addition of the "animate" class happens in
				// one rendering-pass, which will have no visual difference.
				this.getComputedStyleValue('display');
				this.set('animate', anim);
			}
		},

		/**
		* Skips animation and jumps to the final hidden state.
		*
		* @public
		*/
		hideDirect: function() {
			var anim = this.animate;
			if (anim) {
				this.set('animate', false);
			}
			this.hide();
			if (anim) {
				this.set('animate', anim);
			}
		},

		/**
		* @private
		*/
		refresh: function(inSender, inEvent) {
			if ((inEvent.effect === "depth-transition" && inEvent.direction === "next") || inEvent.type ==="onAppResume") {
				this.showDirect();
			}
		}
	});

})(enyo, this);
