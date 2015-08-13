/**
* _sun.Tab_ is a layout that displays a set of tabs, and allows navigation
* between the tabs and their panels. The behavior of `sun.Tab` is similar to [enyo.Panels]{@link http://enyojs.com/docs/latest/api.html#enyo.Panels}.
*
* ```
* {kind: "sun.Tab", components: [
*     {tabName:"TAB1", components: [
*         {content: "First Item"}
*     ]},
*     {tabName:"TAB2", components: [
*         {content: "Second Item"}
*     ]},
*     {tabName:"TAB3", components: [
*         {content: "Third Item"}
*     ]}
* ]}
* ```
*
* @ui
* @class  sun.Tab
* @public
*/
enyo.kind(
	/** @lends sun.Tab.prototype */ {

	/**
	* @private
	*/
	name: "sun.Tab",

	/**
	* @private
	*/
	layoutKind: "FittableRowsLayout",

	/**
	* @private
	*/
	handlers: {
		onTransitionStart: "onTransitionStart",
		onTransitionFinish: "onTransitionFinish"
	},

	/**
	* @private
	*/
	tabIndex: 0,

	/**
	* @private
	*/
	activeTab: 0,

	/**
	* @private
	*/
	tools : [
		{name: "bar", classes: "sun-bar"},
		{name: "tabbar", classes: "sun-tabbar sun-tabbar-inline"},
		{name:"tabLayouts", kind: "Panels", fit:true, realtimeFit: true, classes: "sun-tab-layout"}
	],

	/**
	* @private
	*/
	initComponents: enyo.inherit(function(sup) {
		return function() {
			this.createComponents(this.tools, {owner: this});
			sup.apply(this, arguments);
		};
	}),

	/**
	* @private
	*/
	create: enyo.inherit(function(sup) {
		return function() {
			this.tabComponent = this.components;
			this.components = null;
			sup.apply(this, arguments);
			if (this.tabComponent) {
				var owner = this.hasOwnProperty("tabComponent") ? this.getInstanceOwner() : this;
				this.$.tabLayouts.createComponents(this.tabComponent, {owner: owner});
				this.createTabPages(this.tabComponent);
				for(var i=0;i<this.$.tabLayouts.children.length;i++) {
					this.$.tabLayouts.children[i].addClass("sun-tab-layout");
				}
				this.$.tabLayouts.setArrangerKind("CarouselArranger");
			}
		};
	}),

	/**
	* @private
	*/
	rendered: enyo.inherit(function(sup) {
		return function() {
			for(var i=0;i<this.tabComponent.length;i++) {
				var tabObj = this.$["tab"+i];
				tabObj.addClass("sun-tab-mask");
			}
			sup.apply(this, arguments);
		};
	}),

	/**
	* @private
	*/
	eventDown: function(inEvent, inSender) {
		this.activeTab = inEvent.index;
		if (this.activeTab !== this.tabIndex) {
			this.$["tabWrapper"+this.activeTab].addClass("sun-tabbar-item-active");
		} else {
			this.$["tabWrapper"+this.activeTab].addClass("sun-tabbar-item-selected-active");
		}
	},

	/**
	* @private
	*/
	eventUp: function(inEvent, inSender) {
		this.$["tabWrapper"+this.activeTab].removeClass("sun-tabbar-item-active");
		this.$["tabWrapper"+this.activeTab].removeClass("sun-tabbar-item-selected-active");
		return false;
	},

	/**
	* @private
	*/
	gotoPanel: function(inEvent, inSender) {
		this.$["tabWrapper"+this.tabIndex].removeClass("sun-tabbar-item-selected");
		this.$["tabWrapper"+inEvent.index].addClass("sun-tabbar-item-selected");
		this.tabIndex = inEvent.index;
		this.$.tabLayouts.setIndex(inEvent.index);
	},

	/**
	* @private
	*/
	createTabPages: function(inComponents) {
		var tabbar = this.$.tabbar;
		for(var i=0;i<inComponents.length;i++) {
			tabbar.createComponent({
				name:"tabArea"+i,
				content:inComponents[i].tabName,
				index:i,
				ontap:"gotoPanel",
				ondown: "eventDown",
				onup: "eventUp",
				onleave: "eventUp"
			},  {owner: this});
			this.$["tabArea"+i].applyStyle("width", 100/inComponents.length + "%");
			this.$["tabArea"+i].createComponent({
				name:"tabWrapper"+i,
				tag: "div",
				content:inComponents[i].tabName,
				index:i,
				classes:"sun-tabbar-item-wrapper"
			},  {owner: this});
			this.$["tabWrapper"+i].createComponent({
				name:"tab"+i,
				tag: "span",
				content:inComponents[i].tabName,
				index:i,
				classes:"sun-tabbar-item"
			},  {owner: this});
		}
		this.$["tabWrapper" + this.tabIndex].addClass("sun-tabbar-item-selected");
	},

	/**
	* @private
	*/
	onTransitionFinish: function(inEvent, inSender) {
		this.$["tabWrapper"+this.tabIndex].removeClass("sun-tabbar-item-selected");
		this.$["tabWrapper"+inEvent.index].addClass("sun-tabbar-item-selected");
		this.tabIndex = inEvent.index;
	}
});
