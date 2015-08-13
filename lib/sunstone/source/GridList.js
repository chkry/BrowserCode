/**
* _sun.GridList_ extends {@link sun.List} and
* displays multiple items per row, based on the available container width.
*
* ```
* enyo.kind( {
*     name: "App",
*     components: [
*         {
*             name: "gridList",
*             kind: "sun.GridList",
*             onSetupItem: "setupItem",
*             itemSpacing: 2,
*             components: [
*                 {name: "img", kind: "enyo.Image"}
*             ]
*         },
*     ],
*     ...
*     //array of all item data
*     _data: [],  // example: [{width: 100, height: 100, source: "http://www.flickr.com/myimage.jpg"},....]
*     setupItem: function(inSender, inEvent) {
*         var item = this._data[inEvent.index];
*         this.$.img.setSrc(item.source);
*         this.$.img.addStyles("width:100%; height: auto;");
*         return true;
*     }
*     ...
* });
* ```
*
* @class sun.GridList
* @extends sun.List
* @public
*/
enyo.kind(
    /** @lends sun.GridList.prototype */ {

    /**
    * @private
    */
    name: "sun.GridList",

    /**
    * @private
    */
    kind: "sun.List",

    /**
    * @private
    */
    classes: "sun-gridlist",

    /**
    * @private
    * @lends sun.GridList.prototype
    */
    published: {

        /**
        *
        * Width of items in the list (in pixels).
        *
        * @type {Number}
        * @default 160
        * @public
        */
        itemWidth: 160,

        /**
        *
        * Height of items in the list (in pixels).
        *
        * @type {Number}
        * @default 160
        * @public
        */
        itemHeight: 160,

        /**
        *
        * Spacing (in pixels) between GridList items.
        *
        * @type {Number}
        * @default 10
        * @public
        */
        itemSpacing: 10,

        /**
        * Indicates whether to align GridList center.
        * Set to `true` to align GridList center.
        *
        * @type {Boolean}
        * @default true
        * @public
        */
        alignCenter: true
    },

    /**
    * @private
    */
    horizontal: "hidden",

    /**
    * @private
    */
    pageWidth: -1,

    /**
    * @private
    */
    create: enyo.inherit(function(sup) {
        return function() {
            this._setComponents();
            sup.apply(this, arguments);
            this.itemWidthChanged();
            this.itemHeightChanged();
            this.itemSpacingChanged();
            this.$.generator.setClientClasses("sun-gridlist-row");
        };
    }),

    /**
    * @private
    */
    initComponents: enyo.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
            // Create a dummy component to dynamically compute the dimensions of items at run-time (once for each item during sizeupItem) based on the actual content inside the item (only for variable sized items where sizeupItem is called).
            this.createComponent({name: "_dummy_", allowHtml: true, classes: "sun-gridlist-dummy", showing: false}, {owner: this});
        };
    }),

    /**
    *
    * Sets the count on the list and renders the list. This method is designed to be called
    * after the list data is ready.
    *
    * @param {Number} count - Number of items in the _sun.GridList_.
    * @public
    */
    show: function(count) {
        this._calculateItemsPerRow(count);
        this.setCount(count);
        this.reset();
        if(this.alignCenter){
            this.adjustCenterPosition();
        }
    },

    /**
    *
    * Relays the published-property changes over to the GridFlyweightRepeater.
    *
    * @private
    */
    itemWidthChanged: function() {
        this.$.generator.itemWidth = this.itemWidth;
    },

    /**
    * @private
    */
    itemHeightChanged: function() {
        this.$.generator.itemHeight = this.itemHeight;
    },

    /**
    * @private
    */
    itemSpacingChanged: function() {
        if (this.itemSpacing < 0) {
            this.itemSpacing = 0;
        }
        this.itemSpacing = this.itemSpacing;
        this.$.generator.itemSpacing = this.itemSpacing;
    },

    /**
    * @private
    */
    bottomUpChanged: function() {
        //Don't let users change this (bottomUp is a published property of List but is not supported by GridList)
        this.bottomUp = false;
        this.pageBound = 'top';
    },

    /**
    * @private
    */
    reflow: enyo.inherit(function(sup) {
        return function() {
            this._calculateItemsPerRow();
            sup.apply(this, arguments);
        };
    }),

    /**
    * @private
    */
    handleResize: enyo.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
            this.show(this.count);
        };
    }),

    /**
    * @private
    */
    adjustCenterPosition: function() {
        var classTarget = this.$.page0;
        if(this.pageWidth == -1){
            classTarget.hasNode().style.left = "50%";
            classTarget.hasNode().style.marginLeft = -((this.$.generator.itemWidth + this.$.generator.itemSpacing*2)*this.itemsPerRow)/2+"px";
        }else{
            classTarget.applyStyle('margin','0 auto');
        }
    },

    /**
    * @private
    */
    _calculateItemsPerRow: function(count) {
        var n = this.$.page0.hasNode();

        if(this.pageWidth != -1){
            this.$.page0.applyStyle('width',this.pageWidth+'px');
        }

        if (n) {
            this.itemsPerRow = Math.floor((n.clientWidth - this.itemSpacing*2)/(this.itemMinWidth + this.itemSpacing*2));
            var visibleRows = Math.round((n.clientHeight - this.itemSpacing)/(this.itemMinHeight + this.itemSpacing));
            var itemsPerRow = Math.floor((n.clientWidth)/(this.itemWidth + this.itemSpacing*2));
            var low = Math.floor(itemsPerRow);
            var high = Math.ceil(itemsPerRow);
            var gutter = n.clientWidth - this.itemSpacing*2 - (high * (this.itemWidth + this.itemSpacing*2));
            this.itemsPerRow = (gutter > 0) ? high : low;
            visibleRows = Math.round((n.clientHeight - this.itemSpacing)/(this.itemHeight + this.itemSpacing));
            // Make sure there's at least 1 item per row
            this.itemsPerRow = Math.max(1, this.itemsPerRow);
            this.rowsPerPage = count;
            this.$.generator.itemsPerRow = this.itemsPerRow;
        }
    },

    /**
    * @private
    */
    _setComponents: function() {
        // TODO: The entire implementation of GridList needs an overhaul, but for now this ugly cloning is
        // needed to prevent the generator kind modification below from modifying enyo.Lists's generator
        this.listTools = enyo.clone(this.listTools);
        this.listTools[0] = enyo.clone(this.listTools[0]);
        this.listTools[0].components = enyo.clone(this.listTools[0].components);
        var c = this.listTools[0].components;
        // Override List's listTools array to use GridFlyweightRepeater instead of FlyweightRepeater
        for (var i=0; i<c.length; i++) {
            if (c[i].name == 'generator') {
                c[i] = enyo.clone(c[i]);
                c[i].kind = "sun.GridFlyWeightRepeater";
                return;
            }
        }
    }

});