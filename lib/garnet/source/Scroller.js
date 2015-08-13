(function (enyo, scope) {
	/**
	* An object representing the scroll boundaries.
	*
	* @typedef {Object} g.Scroller~BoundaryObject
	* @property {Number} left - The left scroll position.
	* @property {Number} top - The top scroll position.
	* @property {Number} maxLeft - Maximum value for the left scroll position (minimum is always 0).
	* @property {Number} maxTop - Maximum value for the top scroll position (minimum is always 0).
	* @property {Number} clientHeight - The vertical size of this scroller on
	*	screen.
	* @property {Number} clientWidth - The horizontal size of this scroller on
	*	screen.
	* @property {Number} width - The horizontal size of the full area of the scrolled region.
	* @property {Number} height - The vertical size of the full area of the scrolled region.
	* @property {Number} xDir - Range: [`1`, `-1`, `0`], Meaning: [Positive movement along the
	*	x-axis, Negative Movement, No Movement]
	* @property {Number} yDir - Range: [`1`, `-1`, `0`], Meaning: [Positive movement along the
	*	y-axis, Negative Movement, No Movement]
	*/


	/**
	* An object representing the overscroll boundaries.
	*
	* @typedef {Object} g.Scroller~OverscrollBoundaryObject
	* @property {Number} overleft - The left overscroll position.
	* @property {Number} overtop - The top overscroll position.
	*/

	/**
	* The extended event object that is provided
	* when a scroll event is fired.
	*
	* @typedef {Object} g.Scroller~ScrollEvent
	* @property {g.Scroller~BoundaryObject} bounds Current values of scroller bounds.
	*/

	/**
	* Fired when a scrolling action starts.
	*
	* @event g.Scroller#onScrollStart
	* @type {Object}
	* @property {Object} sender - The [component]{@link http://enyojs.com/docs/latest/index.html#/kind/enyo.Component}
	*	that most recently propagated the event.
	* @property {g.Scroller~ScrollEvent} event - An object containing the event information.
	* @public
	*/

	/**
	* Fired while a scrolling action is in progress.
	*
	* @event g.Scroller#onScroll
	* @type {Object}
	* @property {Object} sender - The [component]{@link http://enyojs.com/docs/latest/index.html#/kind/enyo.Component}
	*	that most recently propagated the event.
	* @property {Object} event - An object containing the event information.
	* @public
	*/

	/**
	* Fired when a scrolling action stops.
	*
	* @event g.Scroller#onScrollStop
	* @type {Object}
	* @property {Object} sender - The [component]{@link http://enyojs.com/docs/latest/index.html#/kind/enyo.Component}
	*	that most recently propagated the event.
	* @property {Object} event - An object containing the event information.
	* @public
	*/

	/**
	* _g.Scroller_ is a scroller suitable for use in both desktop and mobile
	* applications.
	*
	* In some mobile environments, a default scrolling solution is not implemented for
	* DOM elements. In such cases, _g.Scroller_ implements a touch-based scrolling
	* solution, which may be opted into either globally (by setting
	* [touchScrolling]{@link g.Scroller#touchScrolling} to `true`) or on a
	* per-instance basis (by specifying the `strategyKind` property to `"TouchScrollStrategy"`).
	*
	* For more information, see the documentation on
	* [Scrollers]{@link http://enyojs.com/docs/latest/developer-guide/building-apps/layout/scrollers.html}
	* in the [Enyo Developer Guide]{@link http://enyojs.com/docs/latest/developer-guide/index.html}.
	*
	* @class g.Scroller
	* @public
	*/
	enyo.kind(
		/** @lends g.Scroller.prototype */ {

		/**
		* @private
		*/
		name: 'g.Scroller',

		/**
		* @private
		*/
		published:
			/** @lends g.Scroller.prototype */ {

			/**
			* Specifies how to horizontally scroll.  Acceptable values are `'scroll'`, `'auto'`,
			* `'hidden'`, and `'default'`. The precise effect of the setting is determined by the
			* scroll strategy.
			*
			* @type {String}
			* @default 'default'
			* @private
			*/
			horizontal: 'default',

			/**
			* Specifies how to vertically scroll.  Acceptable values are `'scroll'`, `'auto'`,
			* `'hidden'`, and `'default'`. The precise effect of the setting is determined by the
			* scroll strategy.
			*
			* @type {String}
			* @default 'default'
			* @private
			*/
			vertical: 'default',

			/**
			* The vertical scroll position.
			*
			* @type {Number}
			* @default 0
			* @private
			*/
			scrollTop: 0,

			/**
			* The horizontal scroll position.
			*
			* @type {Number}
			* @default 0
			* @private
			*/
			scrollLeft: 0,

			/**
			* Maximum height of the scroll content.
			*
			* @type {Number}
			* @default null
			* @memberof g.Scroller.prototype
			* @private
			*/
			maxHeight: null,

			/**
			* Set to `true` to make this Scroller select a
			* platform-appropriate touch-based scrolling strategy.
			*
			* @type {Boolean}
			* @default false
			* @private
			*/
			touch: false,

			/**
			* Set tolerance value to make this [scroller]{@link g.Scroller}
			* stops at certain moment by down event.
			*
			* @type {Number}
			* @default 20
			* @private
			*/
			stopTolerance: 20,

			/**
			* Specifies a type of scrolling. The [scroller]{@link g.Scroller} will attempt to
			* automatically select a strategy compatible with the runtime environment. Alternatively,
			* you may choose to use a specific strategy:
			*
			* - [ScrollStrategy]{@link g.ScrollStrategy} is the default and implements no
			*	scrolling, relying instead on the environment to scroll properly.
			* - [TouchScrollStrategy]{@link http://enyojs.com/docs/latest/#/kind/enyo.TouchScrollStrategy} implements a touch scrolling
			*	mechanism.
			* - [TranslateScrollStrategy]{@link http://enyojs.com/docs/latest/#/kind/enyo.TranslateScrollStrategy} implements a touch
			*	scrolling mechanism using translations; it is currently recommended only for Android
			*	3 and 4, and Windows Phone 8.
			* - [TransitionScrollStrategy]{@link http://enyojs.com/docs/latest/#/kind/enyo.TransitionScrollStrategy} implements a touch
			*	scrolling mechanism using CSS transitions; it is currently recommended only for iOS
			*	5 and later.
			*
			* @type {String}
			* @default 'ScrollStrategy'
			* @private
			*/
			strategyKind: 'g.ScrollStrategy'
		},

		/**
		* @private
		*/
		events: {
			onScrollStart: '',
			onScroll: '',
			onScrollStop: '',
			onScrollSync: '',
			onRequestCreateCommandBarInScroller: ''
		},

		/**
		* If `true` and this is a touch [scroller]{@link g.Scroller}, the scroller
		* will overscroll and bounce back at the edges.
		*
		* @type {Boolean}
		* @default true
		* @private
		*/
		touchOverscroll: false,

		/**
		* If `true`, the [scroller]{@link g.Scroller} will not propagate `dragstart`
		* event that cause it to start scrolling. Also the stretch effect will be gone.
		* If `false`, the [scroller]{@link g.Scroller} will have stretch effect.
		*
		* @type {Boolean}
		* @default true
		* @private
		*/
		preventDragPropagation: false,

		/**
		* If `true`, the [scroller]{@link g.Scroller} will not propagate scroll event
		*
		* @type {Boolean}
		* @default true
		* @private
		*/
		preventScrollPropagation: true,

		/**
		* Indicates whether or not to display a gradient on the content to indicate the presence of
		* more contents to scroll.
		*
		* Range: [`true`, `false`]
		*
		* - `true`: Scroll indicator is displayed.
		* - `false`: Scroll indicator is hidden.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		scrollIndicatorEnabled: false,

		/**
		* Needed to allow global mods to `g.Scroller.touchScrolling`.
		*
		* @private
		*/
		noDefer: true,

		/**
		* @private
		*/
		handlers: {
			onscroll: 'domScroll',
			onScrollStart: 'scrollStart',
			onScroll: 'scroll',
			onScrollStop: 'scrollStop',
			ondown: 'down',
			ondragstart: "scrollerDragStart",
			ondragfinish: "scrollerDragEnd",
			onwebkitTransitionEnd: "scrollerTransitionEnd",
			ontransitionend: "scrollerTransitionEnd",
			onStartPanelAnimation: "refresh",
			onAppResume: "refresh"
		},

		/**
		* @private
		*/
		classes: 'g-scroller',

		/**
		* @private
		*/
		statics: {
			osInfo: [
				{os: 'android', version: 3},
				{os: 'androidChrome', version: 18},
				{os: 'androidFirefox', version: 16},
				{os: 'firefoxOS', version: 16},
				{os: 'ios', version: 5},
				{os: 'webos', version: 1e9},
				{os: 'blackberry', version:1e9},
				{os: 'tizen', version: 2}
			],

			/**
			* Returns true if platform should have touch events.
			*
			* @private
			*/
			hasTouchScrolling: function() {
				for (var i=0, t; (t=this.osInfo[i]); i++) {
					if (enyo.platform[t.os]) {
						return true;
					}
				}
				// special detection for IE10+ on touch devices
				if ((enyo.platform.ie >= 10 || enyo.platform.windowsPhone >= 8) && enyo.platform.touch) {
					return true;
				}
			},

			/**
			* Returns true if the platform has native div scrollers
			* (desktop browsers always have them).
			*
			* @private
			*/
			hasNativeScrolling: function() {
				for (var i=0, t; (t=this.osInfo[i]); i++) {
					if (enyo.platform[t.os] < t.version) {
						return false;
					}
				}
				return true;
			},

			/**
			* @private
			*/
			getTouchStrategy: function() {
				return (enyo.platform.androidChrome >= 27) || (enyo.platform.android >= 3) || (enyo.platform.windowsPhone === 8) || (enyo.platform.webos >= 4)
					? 'TranslateScrollStrategy'
					: 'TouchScrollStrategy';
			}
		},

		/**
		* @private
		*/
		controlParentName: 'strategy',

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function (sup) {
			return function() {
				sup.apply(this, arguments);
				this.horizontalChanged();
				this.verticalChanged();
			};
		}),

		/**
		* @method
		* @private
		*/
		importProps: enyo.inherit(function (sup) {
			return function(inProps) {
				sup.apply(this, arguments);
				// allow global overriding of strategy kind
				if (inProps && inProps.strategyKind === undefined && (enyo.Scroller.touchScrolling || this.touch)) {
					this.strategyKind = enyo.Scroller.getTouchStrategy();
				}
			};
		}),

		/**
		* @method
		* @fires g.Scroller#onRequestCreateCommandBarInScroller
		* @private
		*/
		initComponents: enyo.inherit(function (sup) {
			return function() {
				this.strategyKindChanged();
				sup.apply(this, arguments);
				if (this.scrollIndicatorEnabled) {
					this.addClass("g-scroller-both-mask-fade-out");
				}
				this.doRequestCreateCommandBarInScroller();
			};
		}),

		/**
		* @method
		* @private
		*/
		teardownChildren: enyo.inherit(function (sup) {
			return function() {
				this.cacheScrollPosition();
				sup.apply(this, arguments);
			};
		}),

		/**
		* @method
		* @private
		*/
		rendered: enyo.inherit(function (sup) {
			return function() {
				sup.apply(this, arguments);
				this.restoreScrollPosition();
				this.didRender();
			};
		}),

		/**
		* @private
		*/
		strategyKindChanged: function () {
			if (this.$.strategy) {
				this.$.strategy.destroy();
				this.controlParent = null;
			}
			// note: createComponents automatically updates controlParent.
			this.createStrategy();
			if (this.hasNode()) {
				this.render();
			}
		},

		/**
		* @private
		*/
		createStrategy: function () {
			this.createComponents([{
				name: 'strategy',
				maxHeight: this.maxHeight,
				kind: this.strategyKind,
				preventDragPropagation: this.preventDragPropagation,
				overscroll: this.touchOverscroll,
				isChrome: true
			}]);
		},

		/**
		* @private
		*/
		getStrategy: function () {
			return this.$.strategy;
		},

		/**
		* @private
		*/
		maxHeightChanged: function () {
			this.$.strategy.setMaxHeight(this.maxHeight);
		},

		/**
		* @private
		*/
		scrollIndicatorEnabledChanged: function () {
			this.addRemoveClass("g-scroller-both-mask-fade-out", this.scrollIndicatorEnabled);
		},

		/**
		* @method
		* @private
		*/
		showingChanged: enyo.inherit(function (sup) {
			return function() {
				if (!this.showing) {
					this.cacheScrollPosition(true);
				}
				sup.apply(this, arguments);
				if (this.showing) {
					this.restoreScrollPosition();
				}
			};
		}),

		/**
		* Cache mechanism is necessary because scrollTop/scrollLeft aren't available when a DOM node
		* is hidden via `display:none`. They always return `0` and don't accept changes.
		*
		* FIXME: need to know when parent is hidden, not just self
		*
		* @private
		*/
		cacheScrollPosition: function (reset) {
			var cachedPosition = {left: this.getScrollLeft(), top: this.getScrollTop()};
			if (reset) {
				this.setScrollLeft(0);
				this.setScrollTop(0);
			}
			this.cachedPosition = cachedPosition;
		},

		/**
		* @private
		*/
		restoreScrollPosition: function () {
			if (this.cachedPosition) {
				var cp = this.cachedPosition;
				if (cp.top || cp.left) {
					this.cachedPosition = null;
					this.setScrollLeft(cp.left);
					this.setScrollTop(cp.top);
				}
			}
		},

		/**
		* @private
		*/
		horizontalChanged: function () {
			this.$.strategy.setHorizontal(this.horizontal);
		},

		/**
		* @private
		*/
		verticalChanged: function () {
			this.$.strategy.setVertical(this.vertical);
		},

		/**
		* @private
		*/
		didRender: function() {
			this.sendScrollSyncEvent();
		},

		// FIXME: these properties are virtual; property changed methods are fired only if
		// property value changes, not if getter changes.

		/**
		* Sets the horizontal scroll position.
		*
		* @param {Number} left - The horizontal scroll position in pixels.
		* @public
		*/
		setScrollLeft: function (left) {
			if (this.cachedPosition) {
				this.cachedPosition.left = left;
			}
			this.$.strategy.setScrollLeft(left);
		},

		/**
		* Sets the vertical scroll position.
		*
		* @param {Number} top - The vertical scroll position in pixels.
		* @public
		*/
		setScrollTop: function (top) {
			if (this.cachedPosition) {
				this.cachedPosition.top = top;
			}
			this.$.strategy.setScrollTop(top);
		},

		/**
		* Retrieves the horizontal scroll position.
		*
		* @returns {Number} The horizontal scroll position in pixels.
		* @public
		*/
		getScrollLeft: function () {
			// sync our internal property
			this.scrollLeft = this.$.strategy.getScrollLeft();
			return this.scrollLeft;
		},

		/**
		* Retrieves the vertical scroll position.
		*
		* @returns {Number} The vertical scroll position in pixels.
		* @public
		*/
		getScrollTop: function () {
			// sync our internal property
			this.scrollTop = this.$.strategy.getScrollTop();
			return this.scrollTop;
		},

		/**
		* Retrieves the scroll boundaries of the [scroller]{@link g.Scroller}.
		*
		* @returns {g.Scroller~BoundaryObject} An object describing the scroll boundaries.
		* @public
		*/
		getScrollBounds: function () {
			var bounds  = this.$.strategy.getScrollBounds();
			if (
				(bounds.xDir !== -1 && bounds.xDir !== 0 && bounds.xDir !== 1) ||
				(bounds.yDir !== -1 && bounds.yDir !== 0 && bounds.yDir !== 1)
			) {
				this.decorateBounds(bounds);
			}
			// keep our properties synchronized always and without extra calls
			this.scrollTop  = bounds.top;
			this.scrollLeft = bounds.left;
			return bounds;
		},

		/**
		* Triggers a remeasurement of the scroller's metrics (specifically, the
		* size of its viewport, the size of its contents and the difference between
		* the two, which determines the extent to which the scroller may scroll).
		*
		* You should generally not need to call this from application code, as the
		* scroller usually remeasures automatically whenever needed. This method
		* exists primarily to support an internal use case for
		* [enyo.DataList]{@link http://enyojs.com/docs/latest/#/kind/enyo.DataList}.
		*
		* @private
		*/
		remeasure: function() {
			var s = this.$.strategy;
			if (s.remeasure) s.remeasure();
		},

		/**
		* Scrolls the given [control]{@link http://enyojs.com/docs/latest/#/kind/enyo.Control} into view.
		*
		* @param {enyo.Control} ctl - The control to make visible in this
		*	scroller's viewport.
		* @param {Boolean} alignWithTop - If `true`, the node is aligned with the top
		* of this scroller.
		* @public
		*/
		scrollIntoView: function (ctl, alignWithTop) {
			this.$.strategy.scrollIntoView(ctl, alignWithTop);
		},

		/**
		* Scrolls to the specified position.
		*
		* @param {Number} x - The `x` position in pixels.
		* @param {Number} y - The `y` position in pixels.
		* @public
		*/
		scrollTo: function (x, y) {
			this.$.strategy.scrollTo(x, y);
		},

		/**
		* Ensures that the given [control]{@link http://enyojs.com/docs/latest/index.html#/kind/enyo.Control}
		* is visible in this Scroller's viewport.
		* Unlike the [scrollIntoView()]{@link g.Scroller#scrollIntoView} method,
		* which uses DOM's scrollIntoView, this method only affects the current scroller.
		*
		* @param {enyo.Control} ctl - The [control]{@link enyo.Control} to make visible in this
		*	scroller's viewport.
		* @param {Boolean} alignWithTop - If `true`, the node is aligned with the top of this
		*	scroller.
		* @public
		*/
		scrollToControl: function (ctl, alignWithTop) {
			this.scrollToNode(ctl.hasNode(), alignWithTop);
		},

		/**
		* Ensures that the given node is visible in this scroller's viewport.
		*
		* @param {Node} node - The node to make visible in this scroller's viewport.
		* @param {Boolean} alignWithTop - If `true`, the node is aligned with the top of this
		*	scroller.
		* @public
		*/
		scrollToNode: function (node, alignWithTop) {
			this.$.strategy.scrollToNode(node, alignWithTop);
		},

		/**
		* Stops the scroller if it is currently animating.
		*
		* @public
		*/
		stop: function() {
			if (typeof this.$.strategy.stop == 'function') {
				this.$.strategy.stop(true);
			}
		},

		/**
		* Adds current values of `getScrollBounds()` to event.
		*
		* @private
		*/
		decorateScrollEvent: function (e) {
			var bounds = e.scrollBounds = e.scrollBounds || this.$.strategy._getScrollBounds();
			// in the off chance that the event already had scrollBounds then we need
			// to make sure they are decorated
			if (
				(bounds.xDir !== -1 && bounds.xDir !== 0 && bounds.xDir !== 1) ||
				(bounds.yDir !== -1 && bounds.yDir !== 0 && bounds.yDir !== 1)
			) {
				this.decorateBounds(bounds);
			}
			// keep our properties synchronized always and without extra calls
			this.scrollTop  = bounds.top;
			this.scrollLeft = bounds.left;
		},

		/**
		* @private
		*/
		decorateBounds: function (bounds) {
			var x       = this.scrollLeft - bounds.left,
				y       = this.scrollTop  - bounds.top;
			bounds.xDir = (x < 0? 1: x > 0? -1: 0);
			bounds.yDir = (y < 0? 1: y > 0? -1: 0);
			// we update our current bounds properties so we don't have to unnecessarily
			// call getScrollTop/getScrollLeft because we already have the current data
			this.scrollLeft = bounds.left;
			this.scrollTop  = bounds.top;
			//calculate velocity; skip root calculation
			this.velocity = x*x + y*y;
		},

		/**
		* Normalizes scroll event to `onScroll`.
		*
		* @fires g.Scroller#onScroll
		* @private
		*/
		domScroll: function (sender, e) {
			// if a scroll event originated here, pass it to our strategy to handle
			if (this.$.strategy.domScroll && e.originator == this) {
				this.$.strategy.domScroll(sender, e);
			}
			this.decorateScrollEvent(e);
			this.doScroll(e);
			return true;
		},

		/**
		* @returns {Boolean} `true` if the current scroll event should
		* be stopped; `false` if it should be allowed to propagate.
		* @private
		*/
		shouldStopScrollEvent: function (e) {
			return (this.preventScrollPropagation &&
				e.originator.owner != this.$.strategy);
		},

		/**
		* Calls [shouldStopScrollEvent()]{@link g.Scroller#shouldStopScrollEvent} to
		* determine whether current scroll event should be stopped.
		*
		* @private
		*/
		scrollStart: function (sender, e) {
			if (!this.shouldStopScrollEvent(e)) {
				this.decorateScrollEvent(e);
				return false;
			}
			return true;
		},

		/**
		* Either propagates or stops the current scroll event.
		*
		* @private
		*/
		scroll: function (sender, e) {
			// note: scroll event can be native dom or generated.
			var stop;
			if (e.dispatchTarget) {
				// allow a dom event if it orignated with this scroller or its strategy
				stop = this.preventScrollPropagation && !(e.originator == this ||
					e.originator.owner == this.$.strategy);
			} else {
				stop = this.shouldStopScrollEvent(e);
			}
			if (!stop) {
				this.decorateScrollEvent(e);
				return false;
			}
			return true;
		},

		/**
		* Calls [shouldStopScrollEvent()]{@link g.Scroller#shouldStopScrollEvent} to
		* determine whether current scroll event should be stopped.
		*
		* @private
		*/
		scrollStop: function (sender, e) {
			if (!this.shouldStopScrollEvent(e)) {
				this.decorateScrollEvent(e);
				return false;
			}
			return true;
		},

		/**
		* Scrolls to the top of the scrolling region.
		*
		* @public
		*/
		scrollToTop: function () {
			this.setScrollTop(0);
		},

		/**
		* Scrolls to the bottom of the scrolling region.
		*
		* @public
		*/
		scrollToBottom: function () {
			this.setScrollTop(this.getScrollBounds().maxTop);
		},

		/**
		* Scrolls to the right edge of the scrolling region.
		*
		* @public
		*/
		scrollToRight: function () {
			this.setScrollLeft(this.getScrollBounds().maxLeft);
		},

		/**
		* Scrolls to the left edge of the scrolling region.
		*
		* @public
		*/
		scrollToLeft: function () {
			this.setScrollLeft(0);
		},

		/**
		* Ensures scroll position is in bounds.
		*
		* @private
		*/
		stabilize: function () {
			var s = this.getStrategy();
			if (s.stabilize) {
				s.stabilize();
			}
		},

		/**
		* @private
		*/
		resize: enyo.inherit(function (sup) {
			return function () {
				if (this.getAbsoluteShowing(true)) {
					sup.apply(this, arguments);
				}
			};
		}),

		/**
		* @fires g.Scroller#onScrollSync
		* @private
		*/
		sendScrollSyncEvent: function() {
			var e = {};
			this.decorateScrollEvent(e);
			this.doScrollSync(e);
		},

		/**
		* Avoid allowing scroll when starting at a vertical boundary to prevent iOS from window
		* scrolling.
		*
		* @private
		*/
		down: function (sender, e) {
			if (!this.$.strategy.isOverscrolling()) {
				if (this.velocity > this.stopTolerance && this.$.strategy.isScrolling()) {
					e.preventTap();
				}
				this.$.strategy.calcStartInfo();
			}
		},

		/**
		* Setting the origin (top/bottom) for shape tranformations on drag start event
		*
		* @private
		*/
		scrollerDragStart: function(inSender, inEvent) {
			var sb = this.getScrollBounds();

			this.removeClass("stretch-to-normal");
			this.removeClass("stretch-at-top");
			this.removeClass("stretch-at-bottom");
			this.removeClass("compressed");

			if (sb.height > sb.clientHeight) {
				// if at the top of the list and drag yDirection is "down"
				if (this.getScrollTop() == 0 && inEvent.vertical == true && inEvent.yDirection == 1) {
					this.addClass("stretched");
					this.addClass("stretch-at-top");

				// else if at the bottom of the list and drag yDirection is "up"
				} else if (sb.top == sb.maxTop && inEvent.vertical == true && inEvent.yDirection == -1) {
					this.addClass("stretched");
					this.addClass("stretch-at-bottom");
				}
			}
			// prevent propagation
			return true;
		},

		/**
		* Compress effect on drag end event
		*
		* @private
		*/
		scrollerDragEnd: function(inSender, inEvent) {
			// compress effect is applied only if the stretched class is set
			// each element is compressed to 95% of it's original height in 0.2s
			if (this.hasClass("stretched")) {
				this.removeClass("stretched");
				this.addClass("compressed");
			}
		},

		/**
		* Bounce back effect after contents is compressed
		*
		* @private
		*/
		scrollerTransitionEnd: function(inSender, inEvent) {
			if (this.hasClass("stretch-to-normal")) {
				this.removeClass("stretch-to-normal");
				this.removeClass("stretch-at-top");
				this.removeClass("stretch-at-bottom");
			}
			if (this.hasClass("compressed")) {
				this.removeClass("compressed");
				this.addClass("stretch-to-normal");
			}
			// prevent propagation
			return true;
		},

		/**
		* @private
		*/
		refresh: function(inSender, inEvent) {
			if ((inEvent.effect === "depth-transition" && inEvent.direction === "next") || inEvent.type ==="onAppResume") {
				this.setScrollTop(0);
			}
		}
	});

	// provide a touch scrolling solution by default when the environment is mobile
	if (enyo.Scroller.hasTouchScrolling()) {
		enyo.Scroller.prototype.strategyKind = enyo.Scroller.getTouchStrategy();
	}

})(enyo, this);
