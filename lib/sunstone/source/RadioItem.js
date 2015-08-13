/**
* Fired when the _sun.RadioItem_ is either selected or unselected.
*
* @event sun.RadioItem#onActivate
* @type {Object}
* @property {Boolean} checked - Indicates whether the radio is currently checked.
* @property {Object} toggledControl - Contains a reference to the _sun.RadioItem_ that had its state change (i.e. toggle).
*   (Note that the originator of this event is actually the
*	{@link sun.Radio} contained within the _sun.RadioItem_; To reference the
*   _sun.RadioItem_, use this property.)
*
* @public
*/

/**
* _sun.RadioItem_ is a control that combines a {@link sun.Radio} with
* a text label. The label text may be set using [content]{@link enyo.Control#content}
* property. The state of the radio may be retrieved by querying the
* [checked]{@link sun.RadioItem#checked} property.
*
* ```
*		{kind: 'sun.RadioItem', content: 'San Francisco',
*			onchange: 'checkedChanged'},
*		...
*		checkedChanged: function (inSender, inEvent) {
*			var checked = inSender.get('checked');
*		}
* ```
*
*
* _sun.RadioItem_ objects can be placed in an [enyo.Group]{@link http://enyojs.com/docs/latest/api.html#enyo.Group}.
* When in group, only one radio button is selectable at any given time:
*
* ```
*		{kind: 'Group', components: [
*			{kind: 'sun.RatioItem', content: 'New York'},
*			{kind: 'sun.RatioItem', content: 'London'},
*			{kind: 'sun.RatioItem', content: 'San Francisco'},
*			{kind: 'sun.RatioItem', content: 'Beijing'}
*		]}
* ```
*
* @class sun.RadioItem
* @extends enyo.Control
* @public
*/
enyo.kind(
	/** @lends sun.RadioItem.prototype */ {

	/**
	* @private
	*/
	name: "sun.RadioItem",

	/**
	* @private
	*/
	kind: 'enyo.Control',


	/**
	* @private
	* @lends sun.RadioItem.prototype
	*/
	published: {

		/**
		* Indicates whether the radio button is currently checked. If `true`, the radio button is currently checked.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		checked: false,

		/**
		* Determines the position of the associated radio button. If `true`, the radio button is positioned on the right-hand side of the text label.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		radioOnRight: false,

		/**
		* Indicates whether to disable the RadioItem. If `true`, the RadioItem is displayed as disabled and does not generate tap events.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* Additional text displayed under the text label of the _sun.RadioItem_
		*
		* @type {String}
		* @default ''
		* @public
		*/
		subContent:''
	},

	/**
	* @private
	*/
	events: {

		/**
		* {@link sun.RadioItem#event:onActivate}
		*/
		onActivate: ''
	},

	/**
	* @private
	*/
	handlers: {
		ontap: "tap",
		onActivate: "decorateActivateEvent"
	},

	/**
	* @private
	*/
	classes: "sun-radio-item",

	/**
	* @private
	*/
	components: [
		{name: "clientWrapper", kind: "FittableRows", components:[
			{name: "client", mixins: ["sun.EllipsisSupport"],classes: "sun-radio-item-label-wrapper"},
			{name: "subClient", mixins: ["sun.EllipsisSupport"],classes: "sun-radio-item-subContent-wrapper"}
		]},
		{name: "input", kind: "sun.Radio"}
	],

	/**
	* @private
	*/
	create: function() {
		this.inherited(arguments);
		this.disabledChanged();
		this.radioOnRightChanged();
		this.subContentChanged();
	},

	/**
	* @private
	*/
	rendered: function() {
		this.inherited(arguments);
		this.checkedChanged();
	},

	/**
	* @private
	*/
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
		this.$.input.setDisabled(this.disabled);
	},

	/**
	* @private
	*/
	checkedChanged: function() {
		this.$.input.setChecked(this.getChecked());
	},

	/**
	* @private
	*/
	subContentChanged: function() {
		this.$.subClient.setContent(this.getSubContent());
	},

	/**
	* @private
	*/
	radioOnRightChanged: function() {
		this.addRemoveClass("left-handed", !this.getRadioOnRight());
	},

	/**
	* @private
	*/
	tap: function(inSender, inEvent) {
		if (inSender != this.$.input) {
			this.waterfallDown("ontap", inEvent, inSender);
		}
	},

	/**
	* @fires sun.RadioItem#onActivate
	* @private
	*/
	decorateActivateEvent: function(inSender, inEvent) {
		inEvent.toggledControl = this;
		this.setChecked(this.$.input.getChecked());
		inEvent.checked = this.checked;
	},

	/**
	* @private
	*/
	contentChanged: function() {
		this.$.client.setContent(this.getContent());
	}
});