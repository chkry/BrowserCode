(function (enyo, g, scope) {
	/**
	* _g.FlipScrollStrategy_ inherits from
	* `g.ScrollStrategy`. Its main
	* purpose is to handle scroller paging for
	* {@link g.Scroller} and {@link g.DataList}.
	*
	* @class g.FlipScrollStrategy
	* @extends g.ScrollStrategy
	* @private
	*/

	enyo.kind(
		/** @lends g.FlipScrollStrategy.prototype */ {

		/**
		* @private
		*/
		name: "g.FlipScrollStrategy",

		/**
		* @private
		*/
		kind: "g.ScrollStrategy",

		/**
		* @private
		*/
		tools: [{
			name: "scrollMath",
			kind: "g.FlipScrollMath",
			onScrollStart: "scrollMathStart",
			onScroll: "scrollMathScroll",
			onScrollStop: "scrollMathStop"
		}],

		/**
		* As flip scroll strategy is define for flip data list
		* we cant do dom operation like tranforming in y or x direction
		* all data elements are stacked so we need to maintain virtual scroller
		* virtual scroller top value
		*
		* @private
		*/
		virtualScrollTop: 0,

		/**
		* virtual scroller left value
		*
		* @private
		*/
		virtualScrollLeft: 0,

		/**
		* As scroller is virtual we are not maintaining list height in dom
		* we need to maintain in variable for paging calculation and bound calculations
		* scroller height
		*
		* @private
		*/
		scrollHeight: 0,

		/**
		* scroller width
		*
		* @private
		*/
		scrollWidth: 0,

		/**
		* @private
		*/
		fixedChildSize: g.height,

		/**
		* Gets scroll top value.
		*
		* @returns {Number} The vertical scroll position in pixels.
		* @public
		*/
		getScrollTop: function() {
			return this.virtualScrollTop;
		},

		/**
		* Gets the value of scrollLeft.
		*
		* @returns {Number} The horizontal scroll position in pixels.
		* @public
		*/
		getScrollLeft: function() {
			return this.virtualScrollLeft;
		},

		/**
		* Sets the left scroll position within the scroller.
		*
		* @param  {Number} inLeft - Sets the left scroll position within the scroller
		* @public
		*/
		setScrollLeft: function(inLeft) {
			this.scrollTo(inLeft, null);
		},

		/**
		* Scrolls a list to the given item in given list.
		*
		* @param {enyo.Control} inControl - The control to make visible in this
		*	viewport.
		* @param {Boolean} inAlignWithTop - If `true`, the node is aligned with the top
		* of this scroller.
		* @public
		*/
		scrollIntoView: function(inControl, inAlignWithTop) {
			this.stop();
			var n = inControl;
			while (n && n.parent && (n.parent.name != "page1") && (n.parent.name != "page2")) {
				n = n.parent;
			}
			if (n.index >= 0) {
				this.scrollTo(null, (n.index * this.fixedChildSize));
			}
		},

		/**
		* Return the index of that list item to which given node belong
		* index information is added to list item node while paging
		*
		* @private
		*/
		findParentListItemIndex: function(inNode) {
			if (!inNode) {
				return;
			}
			var n = inNode;
			var parentisPage1 = n.parentNode.classList.contains("page1");
			var parentisPage2 = n.parentNode.classList.contains("page2");
			while (n && n.parentNode && !parentisPage1 && !parentisPage2) {
				n = n.parentNode;
				parentisPage1 = n.parentNode.classList.contains("page1");
				parentisPage2 = n.parentNode.classList.contains("page2");
			}
			if ((parentisPage1 || parentisPage2) && (n.index)) {
				return n.index;
			}
			return;
		},

		/**
		* Return true or false based on whether node is focus or not
		*
		* @private
		*/
		isInView: function(inNode) {
			if (!inNode) {
				return false;
			}
			var itemIndex = this.findParentListItemIndex(inNode);
			if (itemIndex) {
				var elementTopValue = itemIndex * this.fixedChildSize;
				if (Math.abs(this.virtualScrollTop - elementTopValue) < 0.5) {
					return true;
				}
			}
			return false;
		},

		/**
		* Flip to given node
		*
		* @param {Node} inNode - The node to make visible in this scroller's viewport.
		* @param {Boolean} inAlignWithTop - If `true`, the node is aligned with the top of this
		*	scroller.
		* @public
		*/
		scrollToNode: function(inNode, inAlignWithTop) {
			if (!inNode) {
				return;
			}
			var itemIndex = this.findParentListItemIndex(inNode);
			if (itemIndex) {
				this.scrollTo(null, (itemIndex * this.fixedChildSize));
			}
		},

		/**
		* Upadate top and left value
		*
		* @private
		*/
		effectScroll: function(inX, inY) {
			this.scrollLeft = this.virtualScrollLeft = inX;
			this.scrollTop = this.virtualScrollTop = inY;
			this.effectOverscroll(inX !== null ? Math.round(inX) : inX, inY !== null ? Math.round(inY) : inY);
		},

		/**
		* check for overscroll and takes action
		*
		* @private
		*/
		effectOverscroll: function(inX, inY) {
			var n = this.scrollNode,
				x = "0",
				y = "0",
				z = this.accel ? ",0" : "";
			if (inY !== null && Math.abs(inY - this.virtualScrollTop) > 1) {
				y = (this.virtualScrollTop - inY);
			}
			if (inX !== null && Math.abs(inX - this.virtualScrollLeft) > 1) {
				x = (this.virtualScrollLeft - inX);
			}
			if (!this.transform) {
				//adjust top/left if browser can't handle translations
				this.$.client.setBounds({
					left: x + "px",
					top: y + "px"
				});
			}
		},

		/**
		* get scroller width and height
		*
		* @private
		*/
		getScrollSize: function() {
			return {
				width: this.scrollWidth,
				height: this.scrollHeight
			};
		},

		/**
		* setScroller Height
		*
		* @param  {Number} maxTop -  setScroller Height
		* @public
		*/
		setScrollHeight: function(maxTop) {
			this.scrollHeight = maxTop;
		},

		/**
		* set Scroller width
		*
		* @param  {Number} maxLeft - set Scroller width
		* @public
		*/
		setScrollWidth: function(maxLeft) {
			this.scrollWidth = maxLeft;
		}
	});

})(enyo, g, this);
