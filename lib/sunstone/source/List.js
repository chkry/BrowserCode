/**
* _sun.List_ extends [enyo.List]{@link http://enyojs.com/docs/latest/api/#enyo.List},
* displays a scrolling list of items and is touch-based. For more information, see the documentation on
* [Lists]{@link http://enyojs.com/docs/latest/building-apps/layout/lists.html} in the Enyo Developer Guide.
*
* @class sun.List
* @extends enyo.List
* @public
*/

enyo.kind(
	/** @lends sun.List.prototype */ {

	/**
	* @private
	*/
	name: "sun.List",

	/**
	* @private
	*/
	kind: "enyo.List",

	/**
	* @private
	*/
	noDefer: true,

	/**
	* @private
	* @lends sun.List.prototype
	*/
	published: {
		/**
		* If `true`, the scroller selects a platform-appropriate _touch-based_ scrolling strategy.
		* For information on scrolling strategy, see the description for
		* `enyoScroller`’s [strategyKind]{@link http://enyojs.com/docs/latest/api.html#enyo.Scroller::strategyKind}.
		* Note that if the [strategyKind]{@link http://enyojs.com/docs/latest/api.html#enyo.Scroller::strategyKind}
		* property is specified, 
		* then the [strategyKind]{@link http://enyojs.com/docs/latest/api.html#enyo.Scroller::strategyKind} takes precedence over this setting.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		touch:true
    },

    /**
	* how long, in ms, to wait for to active reordering
	*
	* @private
	*/
    reorderHoldTimeMS: 200,

    /**
    * @private
    */
    scrollTopSpacing: 0,

    /**
    * @private
    */
    scrollBottomSpacing: 0,

    /**
    * Determines whether we should handle the hold event as a reorder hold.
    *
    * @private
    */
    shouldStartReordering: function(inSender, inEvent) {
		if (!this.getReorderable() ||
			inEvent.rowIndex == null ||
			inEvent.rowIndex < 0 ||
			this.pinnedReorderMode ||
			inEvent.index == null ||
			inEvent.index < 0) {
			return false;
		}
		return true;
	},
    /**
	* Handles the drag event as a reorder drag.
	*
	* @private
	*/
	reorderDrag: function(inEvent) {
	// position reorder node under mouse/pointer
		this.positionReorderNode(inEvent);

		// determine if we need to auto-scroll the list
		this.checkForAutoScroll(inEvent);

		// if the current index the user is dragging over has changed, move the placeholder
		this.updatePlaceholderPosition(inEvent);
	},

	/**
	* @private
	*/
	updatePlaceholderPosition: function(e) {
		if(!e.pageY){
			return;
		}
		var index = this.getRowIndexFromCoordinate(e);
		if (index !== -1) {
			// cursor moved over a new row, so determine direction of movement
			if ((this.kindName === "enyo.List") && (index >= this.placeholderRowIndex)) {
				this.movePlaceholderToIndex(Math.min(this.count, index + 1));
			}
			else {
				this.movePlaceholderToIndex(index);
			}
		}
	},

	/**
	* @private
	*/
	createPlaceholderNode: function(node) {
		var placeholderNode = this.$.placeholder.hasNode().cloneNode(true);
		var nodeDimensions = enyo.dom.calcNodePosition(node);
		placeholderNode.style.height = nodeDimensions.height + "px";
		placeholderNode.style.width = nodeDimensions.width + "px";
		if(this.kindName === "sun.GridList"){
			placeholderNode.style.marginLeft=this.itemSpacing+"px";
			placeholderNode.style.marginRight=this.itemSpacing+"px";
			placeholderNode.style.marginTop=this.itemSpacing+"px";
			placeholderNode.style.display = "inline-block";
		}
		return placeholderNode;
	},

	/**
	* Moves the placeholder (i.e., the gap between rows) to the row currently
	* under the user's pointer. This provides a visual cue, showing the user
	* where the item being dragged will go if it is dropped.
	*
	* @private
	*/
	movePlaceholderToIndex: function(index) {
		var node, nodeParent;
		if (index < 0 || index == null) {
			return;
		}
		else if (index >= this.count) {
			node = null;
			nodeParent = this.pageForPageNumber(this.pageForRow(this.count - 1)).hasNode();
		}
		else {
			node = this.$.generator.fetchRowNode(index);
			nodeParent = node.parentNode;
		}
		// figure next page for placeholder
		var nextPageNumber = this.pageForRow(index);

		// don't add pages beyond the original page count
		if (nextPageNumber >= this.pageCount) {
			nextPageNumber = this.currentPageNumber;
		}

		// move the placeholder to just after our "index" node
		nodeParent.insertBefore(
			this.placeholderNode,
			node);

		if (this.currentPageNumber !== nextPageNumber) {
			// if moving to different page, recalculate page sizes and reposition pages
			this.updatePageSize(this.currentPageNumber);
			this.updatePageSize(nextPageNumber);
			this.updatePagePositions(nextPageNumber);
		}

		// save updated state
		this.placeholderRowIndex = index;
		this.currentPageNumber = nextPageNumber;

		// remember that we moved an item (to prevent pinning at the wrong time)
		this.itemMoved = true;
	},

	/**
	* Calculates the record indices for `pageNumber` and generates the markup
	* for that page.
	*
	* @private
	*/
	generatePage: function (pageNumber, target) {
		this.page = pageNumber;
		var r = this.rowsPerPage * this.page;
		this.$.generator.setRowOffset(r);
		var rpp = Math.min(this.count - r, this.rowsPerPage);
		this.$.generator.setCount(rpp);
		var html = this.$.generator.generateChildHtml();
		target.setContent(html);
		// prevent reordering row from being draw twice
		if (this.getReorderable() && this.draggingRowIndex > -1) {
			this.hideReorderingRow();
		}
		var bounds = target.getBounds();
		var pageSize = this.orientV ? bounds.height+(this.scrollTopSpacing+this.scrollBottomSpacing) : bounds.width;
		// if rowSize is not set, use the height or width from the first generated page
		if (!this.rowSize && pageSize > 0) {
			this.rowSize = Math.floor(pageSize / rpp);
			this.updateMetrics();
		}
		// update known page sizes
		if (!this.fixedSize) {
			var s0 = this.getPageSize(pageNumber);
			if (s0 != pageSize && pageSize > 0) {
				this.pageSizes[pageNumber] = pageSize;
				this.portSize += pageSize - s0;
			}
		}
	},

    /**
    * Returns the row index that is under the given position on the page.  If the
    * position is off the end of the list, this will return this.count.  If the position
    * is before the start of the list, you'll get -1.
    *
    * @private
    */
    getRowIndexFromCoordinate: function(inEvent) {
        var pageTarget = this.$.page0;
        // FIXME: this code only works with vertical lists
        var cursorPositionY = this.getScrollTop() + inEvent.pageY - (enyo.dom.calcNodePosition(this.hasNode()).top+this.scrollTopSpacing);
        var cursorPositionX = inEvent.pageX - (enyo.dom.calcNodePosition(this.hasNode()).left+pageTarget.getBounds().left);
        // happens if we try to drag past top of list
        if (cursorPositionY < 0 || cursorPositionX < 0) {
            return -1;
        }
        var pageInfo = this.positionToPageInfo(cursorPositionY);
        var rows = (pageInfo.no == this.p0) ? this.p0RowBounds : this.p1RowBounds;
        // might have only rendered one page, so catch that here
        if (!rows) {
            return this.count;
        }
        var posOnPage = pageInfo.pos;
        var placeholderHeight = this.placeholderNode ? enyo.dom.getBounds(this.placeholderNode).height : 0;
        var i;

        if(this.kindName === "sun.GridList"){
            var totalWidth = 0;
            var gridInfo = this.$.generator;
            var tRow = Math.floor((cursorPositionY)/(gridInfo.itemHeight+gridInfo.itemSpacing*2))*gridInfo.itemsPerRow;
            for(i=tRow; i <= (tRow+gridInfo.itemsPerRow); ++i) {
                if(i !== this.draggingRowIndex) {
                    totalWidth += (gridInfo.itemWidth+gridInfo.itemSpacing*2);
                    if(inEvent.dy > (gridInfo.itemHeight+gridInfo.itemSpacing)/2){
                        if(totalWidth >= cursorPositionX){
                            return i+1;
                        }
                    }else{
                        if(totalWidth >= cursorPositionX){
                            return i;
                        }
                    }
                }
            }
        }else {
            var totalHeight = 0;
            for (i=pageInfo.startRow; i <= pageInfo.endRow; ++i) {
                // do extra check for row that has placeholder as we'll return -1 here for no match
                if (i === this.placeholderRowIndex) {
                    // for placeholder
                    totalHeight += placeholderHeight;
                    if (totalHeight >= posOnPage) {
                        return -1;
                    }
                }
                // originally dragged row is hidden, so don't count it
                if (i !== this.draggingRowIndex) {
                    totalHeight += rows[i].height;
                    if (totalHeight >= posOnPage) {
                        return i;
                    }
                }
            }
            return i;
        }
    },

    /**
	* Calculates the position of `page`.
	*
	* @param {Number} page - Page number.
	* @private
	*/
	pageToPosition: function (page) {
		var p = 0;
		while (page > 0) {
			page--;
			p += this.getPageSize(page);
		}
		return p+this.scrollTopSpacing;
	}
});
