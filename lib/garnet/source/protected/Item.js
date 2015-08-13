(function (enyo, g, scope) {
	/**
	* Fired when the item got `ondown` event.
	*
	* @event g.Item#onItemDown
	* @type {Object}
	* @property {Object} originalEvent - The original event fired from the item, which inherits
	* [enyo.Control]{@link http://enyojs.com/docs/latest/#/kind/enyo.Control} that fires the `ondown` event
	* @public
	*/

	/**
	* Fired when the item got `ondragstart` event.
	*
	* @event g.Item#onItemDragStart
	* @type {Object}
	* @property {Object} originalEvent - The original event fired from the item, which inherits
	* [enyo.Control]{@link http://enyojs.com/docs/latest/#/kind/enyo.Control} that fires the `ondragstart` event
	* @public
	*/

	/**
	* Fired when the item got `onhold` event.
	*
	* @event g.Item#onItemHold
	* @type {Object}
	* @property {Object} originalEvent - The original event fired from the item, which inherits
	* [enyo.Control]{@link http://enyojs.com/docs/latest/#/kind/enyo.Control} that fires the `onhold` event
	* @public
	*/

	/**
	* Fired when the item got `onup` event.
	*
	* @event g.Item#onItemUp
	* @type {Object}
	* @property {Object} originalEvent - The original event fired from the item, which inherits
	* [enyo.Control]{@link http://enyojs.com/docs/latest/#/kind/enyo.Control} that fires the `onup` event
	* @public
	*/

	/**
	* Fired when the item got `onleave` event.
	*
	* @event g.Item#onItemLeave
	* @type {Object}
	* @property {Object} originalEvent - The original event fired from the item, which inherits
	* [enyo.Control]{@link http://enyojs.com/docs/latest/#/kind/enyo.Control} that fires the `onleave` event
	* @public
	*/

	/**
	* _g.Item_ is Garnet's item control that can be used in {@link g.DataList} or {@link g.Scroller} to support pressed effect.
	*
	* @class g.Item
	* @public
	*/
	enyo.kind(
		/** @lends g.Item.prototype */ {

		/**
		* @private
		*/
		name: "g.Item",

		/**
		* @private
		*/
		events: {
			onItemDown: "",
			onItemDragStart: "",
			onItemHold: "",
			onItemUp: "",
			onItemLeave: ""
		},

		/**
		* @private
		*/
		handlers: {
			ondown: "onItemDown",
			ondragstart: "onItemDragStart",
			onhold: "onItemHold",
			onup: "onItemUp",
			onleave: "onItemLeave"
		},

		/**
		* _status shows current state of item.
		*
		* Range: ["onItemDown", "itemDragStart", "itemHold", "itemUp"]
		*
		* @type {String}
		* @default "itemUp"
		* @private
		*/
		_status: "itemUp",

		/**
		* @private
		*/
		classes: "g-item",

		/**
		* Handles `ondown` event on item, firing custom
		* [onItemDown]{@link g.Item#onItemDown} event.
		*
		* @fires g.Item#onItemDown
		* @private
		*/
		onItemDown: function(inSender, inEvent) {
			this.doItemDown({originalEvent: enyo.clone(inEvent, true)});
			this._status = "itemDown";
			this.removeClass("pressed-effect");
		},

		/**
		* Handles `ondragstart` event on item, firing custom
		* [onItemDragStart]{@link g.Item#onItemDragStart} event.
		*
		* @fires g.Item#onItemDragStart
		* @private
		*/
		onItemDragStart: function(inSender, inEvent) {
			this.doItemDragStart({originalEvent: enyo.clone(inEvent, true)});
			this._status = "itemDragStart";
			this.removeClass("pressed-effect");
		},

		/**
		* Handles `onhold` event on item, firing custom
		* [onItemHold]{@link g.Item#onItemHold} event.
		*
		* @fires g.Item#onItemHold
		* @private
		*/
		onItemHold: function(inSender, inEvent) {
			this.doItemHold({originalEvent: enyo.clone(inEvent, true)});
			this._status = "itemHold";
			if (!this.disabled) {
				this.stopJob("offPressedEffect");
				this.addClass("pressed-effect");
			}
		},

		/**
		* Handles `onup` event on item, firing custom
		* [onItemUp]{@link g.Item#onItemUp} event.
		*
		* @fires g.Item#onItemUp
		* @private
		*/
		onItemUp: function(inSender, inEvent) {
			this.doItemUp({originalEvent: enyo.clone(inEvent, true)});
			if (!this.disabled) {
				if (this._status === "itemDown" && !this.hasClass("pressed-effect")) {
					this.stopJob("offPressedEffect");
					this.addClass("pressed-effect");
					this.startJob("offPressedEffect", "_offPressedEffect", 100);
				}
				else if (this._status === "itemHold") {
					this.removeClass("pressed-effect");
				}
			}

			this._status = "itemUp";
		},

		/**
		* @private
		*/
		_offPressedEffect: function() {
			this.removeClass("pressed-effect");
		},

		/**
		* Handles `onleave` event on item, firing custom
		* [onItemLeave]{@link g.Item#onItemLeave} event.
		*
		* @fires g.Item#onItemLeave
		* @private
		*/
		onItemLeave: function(inSender, inEvent) {
			this.doItemLeave({originalEvent: enyo.clone(inEvent, true)});
			if (!this.disabled) {
				if (this._status === "itemHold") {
					this.stopJob("offPressedEffect");
					this.startJob("offPressedEffect", "_offPressedEffect", 100);
				}
			}

			this._status = "itemLeave";
		},

	});

})(enyo, g, this);
