/**
* Fired when the back button is tapped. No event-specific data
* is sent with this event.
*
* @event sun.Header#onBackButtonTapped
* @type {Object}
* @public
*/

/**
* _sun.Header_ contains a title and an area for additional controls.
*
* @class sun.Header
* @extends enyo.Control
* @public
*/
enyo.kind(
	/** @lends sun.Header.prototype */ {

	/**
	* @private
	*/
	name: "sun.Header",

	/**
	* @private
	*/
	kind: "enyo.Control",

	/**
	* @private
	*/
	classes: "sun-header",


	/**
	* @private
	* @lends sun.Header.prototype
	*/
	published: {

		/**
		* Title of the header.
		*
		* @type {String}
		* @default ""
		* @public
		*/
		title: '',

		/**
		* Indicates whether to display the back button next to the header.
		* Set to `true` to display the back button next to the header.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		showBackButton: false
	},

	/**
	* @private
	*/
	events: {
		//* Fired when the back button is tapped. No event-specific data is sent with this event.
		onBackButtonTapped: ''
	},

	/**
	* @private
	*/
	components: [
		{kind: "FittableColumns",components:[
			{name:"headerContent", kind: "FittableColumns", ondown:'down', onup:'up', onleave:'up',ontap:"backbuttonTapped",classes:"header-Content", components:[
				{name:"backIcon",classes:"sun-header-backIcon"},
				{name: "title", classes: "sun-header-title"}
			]},
			{name: "client",classes: "sun-header-client"}
		]}
	],

	/**
	* @private
	*/
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.titleChanged();
			this.showBackButtonChanged();
		};
	}),

	/**
	* @private
	*/
	showBackButtonChanged: function() {
		this.addRemoveClass("sun-no-backButton", !this.getShowBackButton());
	},

	/**
	* @private
	*/
	contentChanged: function() {
		this.$.title.setContent(this.title || this.content);
	},

	/**
	* @private
	*/
	titleChanged: function() {
		this.contentChanged();
	},

	/**
	* @private
	*/
	down: function(inSender,inEvent) {
		if(inEvent.originator.owner.kindName === "sun.Header" && this.getShowBackButton()){
			this.$.headerContent.addClass("pressed");
		}
	},

	/**
	* @private
	*/
	up: function(inSender,inEvent) {
		if(inEvent.originator.owner.kindName === "sun.Header" && this.getShowBackButton()){
			this.$.headerContent.removeClass("pressed");
		}
	},

	/**
	* @private
	*/
	backbuttonTapped: function(inSender, inEvent) {
		if(this.getShowBackButton()){
			this.doBackButtonTapped();
			return true;
		}
	}
});
