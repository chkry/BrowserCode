(function (enyo, scope) {
	/**
	* {@link g.ScrollStrategy} is a helper kind that extends
	* [enyo.TranslateScrollStrategy]{@link http://enyojs.com/docs/latest/#/kind/enyo.TranslateScrollStrategy}, optimizing it for scrolling environments in which effecting
	* scroll changes with transforms using CSS translations is fastest.
	*
	* `g.ScrollStrategy` is not typically created in application code. Instead, it is
	* specified as the value of the [strategyKind]{@link http://enyojs.com/docs/latest/#/kind/enyo.Scroller#strategyKind} property of
	* an [enyo.Scroller]{@link http://enyojs.com/docs/latest/#/kind/enyo.Scroller} or [enyo.DataList]{@link http://enyojs.com/docs/latest/#/kind/enyo.DataList}, or is used by the framework implicitly.
	*
	* @class g.ScrollStrategy
	* @extends enyo.TranslateScrollStrategy
	* @private
	*/
	enyo.kind(
		/** @lends g.ScrollStrategy.prototype */ {

		/**
		* @private
		*/
		name: 'g.ScrollStrategy',

		/**
		* @private
		*/
		kind: 'enyo.TranslateScrollStrategy',

		/**
		* Set to `true` to optimize the strategy to only use translation to scroll; this increases
		* fluidity of scrolling animation. It should not be used when the
		* [scroller]{@link g.Scroller} contains [controls]{@link http://enyojs.com/docs/latest/#/kind/enyo.Controls} that require
		* keyboard input. This is because when `translateOptimized` is `true`, it is possible to
		* position inputs such that they will not become visible when focused.
		*
		* Range: [`true`, `false`]
		*
		* - `true`: translateOpimized mode is on.
		* - `false`: translateOpimized mode is off.
		* @type {Boolean}
		* @default false
		* @public
		*/
		translateOptimized: true,

		/**
		* @private
		*/
		_releaseDragHandle: undefined,

		/**
		* @private
		*/
		tools: [
			{kind: 'g.ScrollMath', onScrollStart: 'scrollMathStart', onScroll: 'scrollMathScroll', onScrollStop: 'scrollMathStop', onStabilize: 'scrollMathStabilize'}
		],

		/**
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function (sup) {
			return function() {
				delete this.handlers['onmousewheel'];
				delete this.handlers['onmove'];
				sup.apply(this, arguments);
			};
		}),

		/**
		* This method exists primarily to support an internal use case for
		* [enyo.DataList]{@link http://enyojs.com/docs/latest/#/kind/enyo.DataList}. It is intended to be called by the
		* [enyo.Scroller]{@link http://enyojs.com/docs/latest/#/kind/enyo.Scroller} that owns this strategy.
		*
		* Triggers a remeasurement of the scroller's metrics (specifically, the
		* size of its viewport, the size of its contents and the difference between
		* the two, which determines the extent to which the scroller may scroll).
		*
		* @public
		*/
		remeasure: function () {
			this.calcBoundaries();
		},

		/**
		* @private
		*/
		alertThumbs: function () {
		},

		/**
		* @private
		*/
		thumbChanged: function () {
		},

		/**
		* @private
		*/
		scrimChanged: function () {
		},

		/**
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function (sup) {
			return function() {
				if (!(this instanceof g.PopupScrollStrategy) && !this.hasOwnProperty("kindComponents")) {
					this.kindComponents = [
						{name: 'clientContainer', classes: 'enyo-touch-scroller', components: [
							{classes: 'stretch-client', components: [
								{name: 'client'}
							]}
						]}
					];
				}

				sup.apply(this, arguments);
			};
		}),

		/**
		* @fires enyo.TouchScrollStrategy#onShouldDrag
		* @private
		*/
		dragstart: function (sender, e) {
			// Ignore drags sent from multi-touch events
			if(!this.dragDuringGesture && e.srcEvent.touches && e.srcEvent.touches.length > 1) {
				return true;
			}
			this.calcBoundaries();
			//Allow store retain node
			this._releaseDragHandle = e.dispatchTarget.retainNode();
			// note: allow drags to propagate to parent scrollers via data returned in the shouldDrag event.
			this.doShouldDrag(e);
			this.dragging = (e.dragger == this || (!e.dragger && e.boundaryDragger == this));
			if (this.dragging) {
				if(this.preventDefault){
					e.preventDefault();
				}
				// note: needed because show/hide changes
				// the position so sync'ing is required when
				// dragging begins (needed because show/hide does not trigger onscroll)
				this.syncScrollMath();
				this.$.scrollMath.startDrag(e);
				if (this.preventDragPropagation) {
					return true;
				}
			}
		},

		/**
		* @private
		*/
		drag: function (sender, e) {
			// if the list is doing a reorder, don't scroll
			if(this.listReordering) {
				return false;
			}
			if (this.dragging) {
				if(this.preventDefault){
					e.preventDefault();
				}
				this.$.scrollMath.drag(e);
			}
		},

		/**
		* @private
		*/
		dragfinish: function (sender, e) {
			if (this.dragging) {
				if(this._releaseDragHandle) {
					this._releaseDragHandle();
					this._releaseDragHandle = undefined;
				}
				e.preventTap();
				this.$.scrollMath.dragFinish();
				this.dragging = false;
			}
		},

		/**
		* Avoid allowing scroll when starting at a vertical boundary to prevent iOS from window
		* scrolling.
		*
		* @private
		*/
		down: enyo.nop,

		/**
		* @private
		*/
		domScroll: function () {
			if (!this.isScrolling()) {
				this.calcBoundaries();
				this.syncScrollMath();
			}
		},

		/**
		* Sets the vertical scroll position.
		*
		* @param {Number} top - The vertical scroll position in pixels.
		* @method
		* @public
		*/
		setScrollTop: enyo.inherit(function (sup) {
			return function(inTop) {
				var m, p;
				if (this.translateOptimized) {
					p = this.scrollTop;
					m = this.$.scrollMath;
					this.stop(true);
					// This will result in a call to
					// ScrollMath.stabilize(), ensuring
					// that we stay in bounds
					m.setScrollY(-inTop);
					if (p != -m.y) {
						// We won't get a native scroll event,
						// so need to make one ourselves
						m.doScroll();
					}
				} else {
					this.$.scrollMath.scroll();
					sup.apply(this, arguments);
				}
			};
		}),

		/**
		* @method
		* @private
		*/
		scrollMathScroll: function (sender) {
			if(!this.overscroll) { //don't overscroll past edges
				this.scrollLeft = -Math.min(sender.leftBoundary, Math.max(sender.rightBoundary, sender.x));
				this.scrollTop = -Math.min(sender.topBoundary, Math.max(sender.bottomBoundary, sender.y));
			} else {
				this.scrollLeft = -sender.x;
				this.scrollTop = -sender.y;
			}
			this.effectScroll(this.scrollLeft, this.scrollTop);
		},

		/**
		* @private
		*/
		scrollMathStop: function () {
			this.scrolling = false;
			this.effectScrollStop();
		}

	});

})(enyo, this);
