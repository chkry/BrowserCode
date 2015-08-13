(function (enyo, g, scope) {
	/**
	* Fires when onScrimAnimation action ends.
	*
	* @event g.PopupScrimAnimator#onScrimAnimationEnded
	* @type {Object}
	* @property {Object} sender - The [component]{@link g.PopupScrimAnimator} that most recently
	*	propagated the event.
	* @property {Object} event - An object containing event information.
	* @public
	*/

	/**
	* _g.PopupScrimAnimator_ provides an overlay that will prevent taps from
	* propagating to the controls that it covers and an animation to
	* {@link g.Popup}, {@link g.ConfirmPopup}, {@link g.IconMenuPopup} and {@link g.Toast}.
	*
	* _g.PopupScrimAnimator_ extends the [enyo.Scrim]{@link http://enyojs.com/docs/latest/#/kind/enyo.Scrim}.
	*
	* A scrim animator may be _floating_ or _non-floating_. A floating scrim animator
	* fills the entire viewport, while a non-floating scrim animator
	* is constrained by the dimensions of its container.
	*
	* Specify the z-index at desired position for the scrim animator to appear by calling
	* [showAtZIndex()]{@link g.PopupScrimAnimator#showAtZIndex}; if this method is called,
	* calling [hideAtZIndex()]{@link g.PopupScrimAnimator#hideAtZIndex} is mandatory
	* to hide the scrim animator.
	*
	* @class g.PopupScrimAnimator
	* @extends enyo.Scrim
	* @private
	*/
	enyo.kind(
		/** @lends g.PopupScrimAnimator.prototype */ {

		/**
		* @private
		*/
		name: "g.PopupScrimAnimator",

		/**
		* @private
		*/
		kind: "enyo.Scrim",

		/**
		* @private
		*/
		handlers: {
			onwebkitAnimationEnd: "scrimAnimationEnd",
			onanimationend: "scrimAnimationEnd"
		},

		/**
		* @private
		*/
		classes: "enyo-fit",

		/**
		* Popup animation component
		*
		* @private
		*/
		components: [{
			name: "popupAnimationComponent"
		}],

		/**
		* backGround Color of screem
		*
		* @private
		*/
		backgroundColor : "#38404b",

		/**
		* On scrim animation end the handler will give the signal to onScrimAnimationend
		*
		* @private
		*/
		scrimAnimationEnd: function(inSender, inEvent){
			if (inEvent.animationName === "pop-up") {
				enyo.Signals.send("onScrimAnimationend", inEvent);
				this.removePopupScrimAnimationclass();
			} else if(inEvent.animationName === "pop-down") {
				enyo.Signals.send("onScrimAnimationend", inEvent);
				this.removePopdownScrimAnimationclass();
			}
		},

		/**
		* Showing popup animation at given z-index
		*
		* @param  {Number} inZIndex - z-index for the scrim
		* @param  {Sting} effect - animation type
		* @private
		*/
		showAtZIndexAnimation: function(inZIndex, effect, backgroundColor) {
			if (inZIndex !== undefined) {
				this.showAtZIndex(inZIndex);
				this.removePopupScrimAnimationclass();
				this.removePopdownScrimAnimationclass();
				if(backgroundColor !== undefined) {
					this.backgroundColor = backgroundColor;
				}
				this.addPopupScrimAnimationclass();
			}
		},

		/**
		* Hiding popdown animation at given z-index
		*
		* @param  {Number} inZIndex - z-index for the scrim
		* @param  {Sting} effect - animation type
		* @private
		*/
		hideAtZIndexAnimation: function(inZIndex, effect, backgroundColor) {
			if (inZIndex !== undefined) {
				this.showAtZIndex(inZIndex);
				this.removePopdownScrimAnimationclass();
				this.removePopupScrimAnimationclass();
				if(backgroundColor !== undefined) {
					this.backgroundColor = backgroundColor;
				}
				this.addPopdownScrimAnimationclass();
			}
		},

		/**
		* Adding popup scrim animator classes
		*
		* @private
		*/
		addPopupScrimAnimationclass: function() {
			this.$.popupAnimationComponent.addClass("g-popup-scale-transition");
			this.$.popupAnimationComponent.applyStyle("background-color", this.backgroundColor);
		},

		/**
		* Removing popup scrim animator classes
		*
		* @private
		*/
		removePopupScrimAnimationclass: function() {
			this.$.popupAnimationComponent.removeClass("g-popup-scale-transition");
			this.$.popupAnimationComponent.applyStyle("background-color", this.backgroundColor);
		},

		/**
		* Adding popdown scrim animator classes
		*
		* @private
		*/
		addPopdownScrimAnimationclass: function() {
			this.$.popupAnimationComponent.addClass("g-popdown-scale-transition");
		},

		/**
		* Removing popdown scrim animator classes
		*
		* @private
		*/
		removePopdownScrimAnimationclass: function() {
			this.$.popupAnimationComponent.removeClass("g-popdown-scale-transition");
		}
	});

	/**
	* Scrim animation singleton exposing a subset of Scrim API;
	* is replaced with a proper enyo.Scrim instance.
	*
	* @private
	*/
	enyo.kind(
		/** @lends g.popupScrimAnimatorSingleton.prototype */ {

		/**
		* @class g.popupScrimAnimatorSingleton
		* @extends null
		* @private
		*/
		name: "g.popupScrimAnimatorSingleton",

		/**
		* @private
		*/
		kind: null,

		/**
		* @private
		*/
		noDefer: true,

		/**
		* @private
		*/
		constructor: function(inName, inProps) {
			this.instanceName = inName;
			enyo.setPath(this.instanceName, this);
			this.props = inProps || {};
		},

		/**
		* Make the scrim animator
		*
		* @returns {object} scrim object
		* @private
		*/
		make: function() {
			var s = new g.PopupScrimAnimator(this.props);
			enyo.setPath(this.instanceName, s);
			return s;
		},

		/**
		* Specify the z-index at which you want the scrim animator to appear
		*
		* @private
		*/
		showAtZIndex: function(inZIndex) {
			var s = this.make();
			s.showAtZIndex(inZIndex);
		},

		/**
		* In case somebody does this out of order
		*
		* @private
		*/
		hideAtZIndex: enyo.nop,

		/**
		* Shows the scrim animator
		*
		* @private
		*/
		show: function() {
			var s = this.make();
			s.show();
		}
	});

	/**
	* Creating a new singleton scrim called _g.popupScrimAnimator_ for popup scrim animation
	*
	* @private
	*/
	new g.popupScrimAnimatorSingleton("g.popupScrimAnimator", {floating: true});

})(enyo, g, this);
