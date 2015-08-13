(function (enyo, g, scope) {
	/**
	* Fired when an item of this list gets removed.
	*
	* @event g.DataList#onDataRemoved
	* @type {Object}
	* @property {Object} sender - The [component]{@link http://enyojs.com/docs/latest/#/kind/enyo.Component} that most recently
	*	propagated the event.
	* @property {Object} event - An object containing the event information.
	* @public
	*/

	/**
	* Fired when an item is added to this list.
	*
	* @event g.DataList#onDataAdded
	* @type {Object}
	* @property {Object} sender - The [component]{@link http://enyojs.com/docs/latest/#/kind/enyo.Component} that most recently
	*	propagated the event.
	* @property {Object} event - An object containing the event information.
	* @public
	*/

	/**
	* Fired when an item of this list gets changed.
	*
	* @event g.DataList#onChange
	* @type {Object}
	* @property {Object} sender - The [component]{@link http://enyojs.com/docs/latest/#/kind/enyo.Component} that most recently
	*	propagated the event.
	* @property {Object} event - An object containing event information.
	* @public
	*/

	/**
	* _g.DataList_ is an [enyo.DataList]{@link http://enyojs.com/docs/latest/#/kind/enyo.DataList} in Garnet style.
	* It uses [g.Scroller]{@link g.Scroller} as its default scroller.
	*
	* @class g.DataList
	* @extends enyo.DataList
	* @public
	*/
	enyo.kind(
		/** @lends g.DataList.prototype */ {

		/**
		* @private
		*/
		name: "g.DataList",

		/**
		* @private
		*/
		kind: "enyo.DataList",

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
			onKnobDrag: "knobDrag",
			onWheelChange: "wheelChange",
			onScrollStop: "scrollStop",
			ontap: "playFeedback"
		},

		/**
		* @private
		*/
		events: {

			/**
			* {@link g.DataList#event:onDataRemoved}
			*/
			onDataRemoved: "",

			/**
			* {@link g.DataList#event:onDataAdded}
			*/
			onDataAdded: "",

			/**
			* {@link g.DataList#event:onChange}
			*/
			onChange: ""
		},

		/**
		* @private
		*/
		selection: false,

		/**
		* flag used to indicate the bottom of datalist for cards reached
		*
		* @private
		*/
		_overScrollBottomCard: false,

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
		renderDelay: 0,

		/**
		* @private
		*/
		classes: "g-data-list",

		/**
		* `headerComponents` is the `components` placed at the top of this list.
		*
		* @public
		*/
		headerComponents: [{classes: "g-data-list-header-comp", ontap: "preventSound"}],

		/**
		* `footerComponents` is the `components` placed at the bottom of this list.
		*
		* @public
		*/
		footerComponents: [{classes: "g-data-list-footer-comp", ontap: "preventSound"}],

		/**
		* Indicates if this list uses cards. If `true`, cards are used.
		*
		* Range: [`true`, `false`]
		*
		* - `true`: This list uses cards.
		* - `false`: This list does not use cards.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		cards: false,

		/**
		* Indicates whether to display gradient(s) at the top and/or bottom of the list
		* to indicate the presence of more contents to scroll.
		*
		* Range: [`true`, `false`]
		*
		* - `true`: Scroll indicators are displayed.
		* - `false`: Scroll indicators are not displayed.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		scrollIndicatorEnabled: false,

		/**
		* @private
		*/
		itemHeight: g.height,

		/**
		* _g.DataList_ places its rows inside a [g.Scroller]{@link g.Scroller}.
		* Any configurable options of [g.Scroller]{@link g.Scroller} may be placed in this property.
		* The option values will be set on this DataList's scroller accordingly.
		* If no options are specified, the default settings of [g.Scroller]{@link g.Scroller} is used.
		*
		* @type {Object}
		* @default {kind: "g.Scroller", maxHeight: "320px"}
		* @public
		*/
		scrollerOptions: {
			kind: "g.Scroller",
			maxHeight: "320px"
		},

		/**
		* This added to make Title show when collection.empty() called.
		*
		* @fires g.DataList#onDataRemoved
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
					scrollIndicatorEnabled: this.scrollIndicatorEnabled,
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
				if (this.cards) {
					this.$.scroller.getStrategy().$.scrollMath.kFrictionDamping = 0.80;
					this.$.scroller.getStrategy().$.scrollMath.kFlickScalar = 40;
					this.$.scroller.getStrategy().$.scrollMath.kSpringDamping = 0.2;
				} else {
					if (this.headerComponents) {
						var ownerH = this.hasOwnProperty("headerComponents") ? this.getInstanceOwner() : this;
						this.$.header.createComponents(this.headerComponents, {owner: ownerH});
					}
					if (this.footerComponents) {
						var ownerF = this.hasOwnProperty("footerComponents") ? this.getInstanceOwner() : this;
						this.$.footer.createComponents(this.footerComponents, {owner: ownerF});
					}

					this.$.scroller.getStrategy().$.scrollMath.kFrictionDamping = 0.94;
					this.$.scroller.getStrategy().$.scrollMath.kFlickScalar = 40;
					this.storePreviousScrollerSates();
				}
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
		* Overloaded to call a method of the delegate strategy.
		*
		* @method
		* @fires g.DataList#onDataAdded
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
		* @fires g.DataList#onDataRemoved
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
		* Jumps to the top of this list.
		*
		* @method
		* @public
		*/
		jumpToTop: function() {
			this.$.scroller.setScrollTop(0);
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
		* Retreive index char to scroll to when event is received from WheelSectionListController
		*
		* @private
		*/
		wheelChange: function(inSender, inEvent) {
			this.scrollToChar(inEvent.scrollTo);
			return true;
		},

		/**
		* set scroll position based on list item content
		*
		* @private
		*/
		scrollToChar: function(inChar) {
			var len = this.collection ? this.collection.length: 0;

			if (inChar.match(/^[A-Z]/)) {
				for (var i = 0; i < len; i++) {
					if ((this.data().at(i).attributes.title)[0] >= inChar) {
						this.$.scroller.setScrollTop((i+1)*this.childSize);
						break;
					}
				}
			} else if (inChar == "#") {
				this.$.scroller.setScrollTop(0);
			} else if (inChar == " ") {
				this.$.scroller.setScrollTop((len - 1)*this.childSize);
			} else {
				// FIXME : Not implemented for A-Z
			}

			return true;
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
			if(this.cards) {
				this.scrollTo(inEvent.scrollTo);
			} else {
				this.setScrollTop(inEvent.scrollTo);
			}
			return true;
		},

		/**
		* @private
		*/
		roundInt: function(value, increment) {

			var remain = value % increment;
			var roundvalue = increment / 2;
			var result;

			// round up
			if (remain >= roundvalue) {
				result = value - remain;
				result += increment;

			// round down
			} else {
				result = value - remain;
			}

			return result;
		},

		/**
		* @private
		*/
		scrollStop: function(inSender, inEvent) {
			if (this.cards) {
				var hackHeight = (this.itemHeight - 1);
				var divisible = this.$.scroller.getScrollBounds().top % this.itemHeight;
				if (inEvent.scrollBounds.top >= (inEvent.scrollBounds.maxTop - this.itemHeight)) {
					this._overScrollBottomCard = true;
				} else {
					this._overScrollBottomCard = false;
				}
				if ((Math.abs(divisible) < 1) || (Math.abs(divisible - hackHeight) < 1)) {
					var itemSelected = (Math.abs(divisible - hackHeight) < 1) ? (this.$.scroller.getScrollBounds().top + 1) : this.$.scroller.getScrollBounds().top;
					var itemIndex = Math.round(itemSelected / this.itemHeight);
					this.fireChangeEvent(itemIndex);
				} else {
					var roundedInt = this.roundInt(this.getScrollTop(), this.itemHeight);
					this.scrollTo(roundedInt);
				}
			}
		},

		/**
		* This function fires onChange event
		*
		* @fires g.DataList#onChange
		* @private
		*/
		fireChangeEvent: function(inItemIndex) {
			this.doChange({
				name: this.name,
				index: inItemIndex
			});
		}
	});

})(enyo, g, this);

/**
* Overload the vertical delegate to scroll with due regard to headerComponent of g.DataList.
*
* @private
*/
(function (enyo, g) {
	var p = g.DataList.delegates.vertical = enyo.clone(enyo.DataList.delegates.vertical);
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
				rest = list.collection.length % list.controlsPerPage,
				itemHeight = list.fixedChildSize || list.childSize || 100;
			if (n) {
				if (pc !== 0) {
					for (var i=0; i<pc; ++i) {
						p = list.metrics.pages[i];
						bs += (i === pc - 1 && rest > 0 && (list._modelChanged || !(p && p[sp]))) ? itemHeight * rest : (p && p[sp]) || ds;
					}
				}
				list._modelChanged = false;
				list.bufferSize = bs;
				n.style[sp] = bs + 'px';
				n.style[ss] = this[ss](list) + 'px';
				list.$.scroller.remeasure();
			}
		},

		/**
		* @private
		*/
		setScrollThreshold: function (list) {
			var threshold = list.scrollThreshold || (list.scrollThreshold={}),
				metrics   = list.metrics.pages,
				pos       = this.pagesByPosition(list),
				firstIdx  = pos.firstPage.index,
				lastIdx   = pos.lastPage.index,
				count     = this.pageCount(list)-1,
				lowerProp = list.lowerProp,
				upperProp = list.upperProp,
				fn        = upperProp == 'top'? this.height: this.width,
				headerNode = (list.$.header ? list.$.header.hasNode() : null),
				headerSize = (headerNode ? headerNode.clientHeight : 0);
			// now to update the properties the scroller will use to determine
			// when we need to be notified of position changes requiring paging
			if (firstIdx === 0) {
				threshold[upperProp] = undefined;
			} else {
				threshold[upperProp] = metrics[firstIdx][upperProp] + headerSize;
			}
			if (lastIdx >= count) {
				threshold[lowerProp] = undefined;
			} else {
				threshold[lowerProp] = (metrics[lastIdx][lowerProp] - fn.call(this, list) + headerSize) ;
			}
			if (list.usingScrollListener) {
				list.$.scroller.setScrollThreshold(threshold);
			}
		},

		/**
		* Determines which two pages to generate, based on a
		* specific target scroll position.
		*
		* @private
		*/
		assignPageIndices: function (list, targetPos) {
			var index1, index2, bias,
				pc = this.pageCount(list),
				last = Math.max(0, pc - 1),
				currentPos = this.getScrollPosition(list),
				headerNode = (list.$.header ? list.$.header.hasNode() : null),
				headerSize = (headerNode ? headerNode.clientHeight : 0);

			// If no target position was specified, use the current position
			if (typeof targetPos == 'undefined') {
				targetPos = currentPos;
			}

			// Make sure the target position is in-bounds
			targetPos = Math.max(0, Math.min(targetPos, list.bufferSize) - headerSize);

			// First, we find the target page (the one that covers the target position)
			index1 = Math.floor(targetPos / this.defaultPageSize(list));
			index1 = Math.min(index1, last);

			// Our list always generates two pages worth of content, so -- now that we have
			// our target page -- we need to pick either the preceding page or the following
			// page to generate as well. To help us decide, we first determine how our
			// target position relates to our current position. If we know which direction
			// we're moving in, it's generally better to render the page that lies between
			// our current position and our target position, in case we are about to scroll
			// "lazily" to an element near the edge of our target page. If we don't have any
			// information to work with, we arbitrarily favor the following page.
			bias = (targetPos > currentPos) ? -1 : 1;

			// Now we know everything we need to choose our second page...
			index2 =
				// If our target page is the first page (index == 0), there is no preceding
				// page -- so we choose the following page (index == 1). Note that our
				// our target page will always be (index == 0) if the list is empty or has
				// only one page worth of content. Picking (index == 1) for our second page
				// in these cases is fine, though the page won't contain any elements.
				(index1 === 0) ? 1 :
				// If target page is the last page, there is no following page -- so we choose
				// the preceding page.
				(index1 === last) ? index1 - 1 :
				// In all other cases, we pick a page using our previously determined bias.
				index1 + bias;

			list.$.page1.index = index1;
			list.$.page2.index = index2;
		}
	}, true);
})(enyo, g);
