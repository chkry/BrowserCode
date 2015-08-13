(function (enyo, g, scope) {
	/**
	* Fired when an item is removed from this list.
	*
	* @event g.DataGridList#onDataRemoved
	* @type {Object}
	* @property {Object} sender - The component that most recently propagated the event.
	* @property {Object} event - An object containing the event information.
	* @public
	*/

	/**
	* Fired when an item is added to this list.
	*
	* @event g.DataGridList#onDataAdded
	* @type {Object}
	* @property {Object} sender - The component that most recently propagated the event.
	* @property {Object} event - An object containing the event information.
	* @public
	*/

	/**
	* _g.DataGridList_ is an [enyo.DataGridList]{@link http://enyojs.com/docs/latest/#/kind/enyo.DataGridList}
	* in Garnet style. It lays out data in a grid.
	*
	* @class g.DataGridList
	* @extends enyo.DataGridList
	* @public
	*/
	enyo.kind(
		/** @lends g.DataGridList.prototype */{

		/**
		* @private
		*/
		name: "g.DataGridList",

		/**
		* @private
		*/
		kind: "enyo.DataGridList",

		/**
		* @private
		*/
		noDefer: true,

		/**
		* @private
		*/
		handlers: {
			onLayerEffectStart: "disableScrolling",
			onLayerEffectEnd: "enableScrolling",
			ontap: "playFeedback",
			onKnobDrag: "knobDrag"
		},

		/**
		* @private
		*/
		events: {
			onDataRemoved: "",
			onDataAdded: ""
		},

		/**
		* @private
		*/
		defaultStateV: undefined, // defaultStateV stores default Vertical state of scroller

		/**
		* @private
		*/
		defaultStateH: undefined, // defaultStateH stores default Horizontal state of scroller

		/**
		* @private
		*/
		renderDelay: 250,

		/**
		* @private
		*/
		classes: "g-data-grid-list",

		/**
		* `headerComponents` is the components placed on the top of the list.
		*
		* @public
		*/
		headerComponents: [{classes: "g-data-list-header-comp", ontap: "preventSound"}],

		/**
		* `footerComponents` is the components placed on the bottom of the list.
		*
		* @public
		*/
		footerComponents: [{classes: "g-data-list-footer-comp", ontap: "preventSound"}],

		/**
		* @private
		*/
		scrollerOptions: {
			kind: "g.Scroller",
			maxHeight: "320px"
		},

		/**
		* This is added to make the Title show when collection.empty() is called.
		*
		* @fires g.DataGridList#onDataRemoved
		* @private
		*/
		bindings: [
			{from: ".collection.length", to: ".length", transform: function(val){
				this._modelChanged = true;
				if(val===0) {
					this.doDataRemoved();
				}
				return val;
			}}
		],

		/**
		* While {@link enyo.DataGridList} provides some generic delegate for
		* handling Object, we define containerOptions, headrComponents and footerComponents
		*
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				this.containerOptions = {
					name: "scroller",
					kind: "g.Scroller",
					horizontal: "hidden",
					vertical: "scroll",
					canGenerate: false,
					classes: "enyo-fit enyo-data-list-scroller",
					components: [
						{name: "header"},
						{name: "active", classes: "active", components: [
							{name: "page1", classes: "page page1"},
							{name: "page2", classes: "page page2"},
							{name: "buffer", classes: "buffer"}
						]},
						{name: "footer"}
					]
				};

				this.controlsPerPage = this.controlsPerPage || 8;

				sup.apply(this, arguments);
				// FIXME: Need to determine whether headerComponents was passed on the instance or kind to get the ownership correct
				if (this.headerComponents) {
					var ownerH = this.hasOwnProperty("headerComponents") ? this.getInstanceOwner() : this;
					this.$.header.createComponents(this.headerComponents, {owner: ownerH});
				}
				if (this.footerComponents) {
					var ownerF = this.hasOwnProperty("footerComponents") ? this.getInstanceOwner() : this;
					this.$.footer.createComponents(this.footerComponents, {owner: ownerF});
				}
			};
		}),

		/**
		* Ensures that it saves states of previous scroller option.
		*
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.$.scroller.$.strategy.$.scrollMath.kFrictionDamping = 0.94;
				this.$.scroller.$.strategy.$.scrollMath.kFlickScalar = 40;
				this.storePreviousScrollerSates();
			};
		}),

		/**
		* @method
		* @private
		*/
		showingChanged: enyo.inherit(function(sup) {
			return function() {
				if (!this.showing) {
					this.$.scroller.hide();
				}
				sup.apply(this, arguments);
				if (this.showing) {
					this.$.scroller.show();
					this.syncScroll();
				}
			};
		}),

		/**
		* Overloaded from base kind to ensure that the container options correctly apply
		* the scroller options before instantiating it.
		*
		* @method
		* @private
		*/
		initContainer: enyo.inherit(function(sup) {
			return function() {
				var o = enyo.clone(this.get("containerOptions")),
					s = this.get("scrollerOptions");
				if (s) { enyo.mixin(o, s); }
				this.set("containerOptions", o);
				this.set("scrollerOptions", null);
				sup.apply(this, arguments);
			};
		}),

		/**
		* Overloaded to call a method of the delegate strategy.
		*
		* @method
		* @fires g.DataGridList#onDataAdded
		* @private
		*/
		modelsAdded: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.doDataAdded();
				this.syncScroll();
			};
		}),

		/**
		* Overloaded to call a method of the delegate strategy.
		*
		* @method
		* @fires g.DataGridList#onDataRemoved
		* @private
		*/
		modelsRemoved: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.doDataRemoved();
				this.syncScroll();
			};
		}),

		/**
		* Completely resets the current list by scrolling the list to the top
		* of the scrollable region and regenerating all of its children. This is typically necessary
		* only at the initialization of this list or if the entire dataset has been swapped out.
		*
		* @method
		* @public
		*/
		reset: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.syncScroll();
			};
		}),

		/**
		* @private
		*/
		scrollTo: function(inY) {
			this.$.scroller.scrollTo(0, inY);
		},

		/**
		* @private
		*/
		getScrollTop: function() {
			return this.$.scroller.getScrollTop();
		},

		/**
		* @private
		*/
		setScrollTop: function(inValue) {
			return this.$.scroller.setScrollTop(inValue);
		},

		/**
		* Pass in an integer within the bounds of the lists's collection to have it
		* scroll to the position of that index in the list.
		*
		* @private
		*/
		animatedScrollToIndex: function(inIndex) {
			if (inIndex >= 0 && inIndex < this.length) {
				this.scrollTo();
			}
		},

		/**
		* @private
		*/
		scrollToPage: function(inPage) {
			this.$.scroller.scrollTo(0, inPage * this.$.scroller.getClientHeight());
		},

		/**
		* storePreviousScrollerSates Store default state of scroller
		*
		* @private
		*/
		storePreviousScrollerSates: function() {
			this.defaultStateV =  this.defaultStateV || {};
			this.defaultStateH =  this.defaultStateH || {};
			this.defaultStateV = this.$.scroller.getVertical();
			this.defaultStateH = this.$.scroller.getHorizontal();
		},

		/**
		* disableScrolling Disable the scroller when elements are animating
		*
		* @private
		*/
		disableScrolling: function(inSender, inEvent) {
			this.$.scroller.setVertical("hidden");
			this.$.scroller.setHorizontal("hidden");

			// prevent propagation
			return true;
		},

		/**
		* enableScrolling Enable the scroller with default state once components stop their animation
		*
		* @private
		*/
		enableScrolling: function(inSender, inEvent) {
			this.$.scroller.setVertical(this.defaultStateV);
			this.$.scroller.setHorizontal(this.defaultStateH);

			// prevent propagation
			return true;
		},

		/**
		* Set the inEvent.preventSound as true to block the sound in header/foorter.
		*
		* @private
		*/
		preventSound: function(inSender, inEvent) {
			inEvent.preventSound = true;
		},

		/**
		* Play touch feedback sound when the list is tapped.
		*
		* @param {enyo.Component} inSender - The [enyo.Component]{@link http://enyojs.com/docs/latest/#/kind/enyo.Component} that most recently
		* propagated the `event`.
		* @param {Object} inEvent - An `object` containing
		* event information.
		* @public
		*/
		playFeedback: function(inSender, inEvent) {
			if (!inEvent || inEvent && !inEvent.preventSound && inEvent.originator.kind !== "g.Scroller") {
				g.playFeedback("touch");
				inEvent? inEvent.preventSound = true : inEvent;
			}
		},

	 	/**
		* We have to trap the Enyo-generated [onScroll]{@link http://enyojs.com/docs/latest/#/kind/enyo.Scroller}
		* event and let the delegate handle it.
		*
		* @method
		* @private
		*/
		didScroll: enyo.inherit(function(sup) {
			return function(inSender, inEvent) {
				sup.apply(this, arguments);
				return false;
			};
		}),

	 	/**
		* sync the scroller and make the scroller to bubble ScrollSync event
		*
		* @private
		*/
		didRender: function() {
			this.$.scroller.didRender();
		},

		/**
		* @private
		*/
		syncScroll: function() {
			this.$.scroller.sendScrollSyncEvent();
		},

		/**
		* set scroll position when event is received from ScrollerKnob
		*
		* @private
		*/
		knobDrag: function(inSender, inEvent) {
			this.setScrollTop(inEvent.scrollTo);
			return true;
		}
	});

})(enyo, g, this);

/**
* Overload the vertical grid delegate to get accurated scroll height.
*
* @private
*/
(function (enyo, g) {
	var p = g.DataGridList.delegates.verticalGrid = enyo.clone(enyo.DataGridList.delegates.verticalGrid);
	enyo.kind.extendMethods(p, {
		/**
		* Recalculates the buffer size based on the current metrics for the given list. This
		* may not be completely accurate until the final page is scrolled into view.
		*
		* @private
		*/
		adjustBuffer: function (list) {
			var pc = this.pageCount(list),
				ds = this.defaultPageSize(list),
				bs = 0, sp = list.psizeProp, ss = list.ssizeProp,
				n = list.$.buffer.node || list.$.buffer.hasNode(), p,
				rest = Math.ceil((list.collection.length % list.controlsPerPage) / list.columns),
				itemHeight = list.tileHeight || 100;
			if (n) {
				for (var i=0; i<pc; ++i) {
					p = list.metrics.pages[i];
					bs += (i === pc - 1 && rest > 0 && (list._modelChanged || !(p && p[sp]))) ? itemHeight * rest : (p && p[sp]) || ds;
				}
				list._modelChanged = false;
				bs += list.spacing;
				list.bufferSize = bs;
				n.style[sp] = bs + 'px';
				n.style[ss] = this[ss](list) + 'px';
				list.$.scroller.remeasure();
			}
		}
	}, true);
})(enyo, g);
