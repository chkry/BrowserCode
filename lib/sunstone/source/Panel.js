/**
* _sun.Panel_ is the default kind for controls created inside a
* [sun.Panels]{@link sun.Panels} container. A [sun.Panels]{@link sun.Panels} typically
* contains several instances of _sun.Panel_.
*
* @class sun.Panel
* @extends enyo.Control
* @public
*/

enyo.kind(
    /** @lends sun.Panel.prototype */ {

    /**
    * @private
    */
    name : "sun.Panel",

    /**
    * @private
    */
    kind: 'enyo.Control',

    /**
    * @private
    */
    classes: "sun-panel",

    /**
    * @private
    */
    panelTools:[
        {name: "panelBody", classes: "sun-panel-body"}
    ],

    /**
    * @private
    */
    initComponents: enyo.inherit(function(sup) {
        return function() {
            this.createChrome(this.panelTools);
            this.controlParentName = "panelBody";
            this.discoverControlParent();
            sup.apply(this, arguments);
        };
    }),

    /**
    * @private
    */
    reflow: enyo.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
            this.getInitAnimationValues();
            this.updateViewportSize();
        };
    }),

    /**
    * @private
    */
    updateViewportSize: function() {
        var node = this.hasNode();
        if (!node) {
            return;
        }
        this.$.panelBody.applyStyle("height", this.initialHeight + "px");
        this.$.panelBody.applyStyle("width", this.initialWidth + "px");
    },

    /**
    * @private
    */
    getInitAnimationValues: function() {
        var node = this.hasNode(),
            paddingT = parseInt(enyo.dom.getComputedStyleValue(node, "padding-top"), 10),
            paddingR = parseInt(enyo.dom.getComputedStyleValue(node, "padding-right"), 10),
            paddingB = parseInt(enyo.dom.getComputedStyleValue(node, "padding-bottom"), 10),
            paddingL = parseInt(enyo.dom.getComputedStyleValue(node, "padding-left"), 10);
        this.initialHeight = node.offsetHeight - paddingT - paddingB;
        this.initialWidth = node.offsetWidth   - paddingR - paddingL;
    }
});
