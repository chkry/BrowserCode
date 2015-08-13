/**
* Fired when the _sun.CheckboxItem_ gets either checked or unchecked.
*
* @event sun.CheckboxItem#onActivate
* @property {Boolean} checked - Indicates whether the checkbox is currently checked.
* @property {Object} toggledControl - Contains a reference to the _sun.CheckboxItem_ that
*	had its state change (i.e. toggle). Note that the originator of this event is actually the
*	{@link sun.Checkbox} contained in the _sun.CheckboxItem_; To reference the _sun.CheckboxItem_, use this property.
*
* @public
*/

/**
* _sun.CheckboxItem_ is a control that combines a {@link sun.Checkbox} with a text label.
* The text is set using the `enyo.Control`'s [content]{@link http://enyojs.com/docs/latest/api/#enyo.Control::content} property. The state of the
* checkbox may be retrieved by querying the [checked]{@link sun.CheckboxItem#checked} property.
*
* ```
* kind: "sun.CheckboxItem", content: "San Francisco",
*     onchange: "checkedChanged"},
* ...
* checkedChanged: function (inSender, inEvent) {
*   var checked = inSender.get('checked');
* }
* ```
*
* _sun.CheckboxItem_ objects can be placed in an [enyo.Group]{@link http://enyojs.com/docs/latest/api/#enyo.Group}.
* When in group, only one checkbox is checkable at any given time:
*
* ```
* {kind: "Group", components: [
*	{kind: "sun.CheckboxItem", content: "New York"},
*	{kind: "sun.CheckboxItem", content: "London"},
*	{kind: "sun.CheckboxItem", content: "San Francisco"},
*   {kind: "sun.CheckboxItem", content: "Beijing"}
* ]}
* ```
*
* @class sun.CheckboxItem
* @extends enyo.Control
* @ui
* @public
*/
enyo.kind(
	/** @lends sun.CheckboxItem.prototype */ {

	/**
	* @private
	*/
	name: "sun.CheckboxItem",

	/**
	* @private
	*/
	kind: 'enyo.Control',

	/**
	* @private
	*/
	published: /** @lends sun.CheckboxItem.prototype */ {

		/**
		* Indicates whether the associated checkbox is currently checked.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		checked: false,

		/**
		* Determines the position of the associated checkbox.
		* If `true`, the checkbox is positioned on the right-hand side of the text label.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		checkboxOnRight: false,

		/**
		* Indicates whether to disable the CheckboxItem.
		* If `true`, the CheckboxItem is displayed as disabled and does not generate tap events.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* Additional text displayed under the text label of the _sun.CheckboxItem_.
		*
		* @type {String}
		* @default ""
		* @public
		*/
		subContent:""
	},

	/**
	* @private
	*/
	events: {

		/**
		* {@link sun.CheckboxItem#event:onActivate}
		*/
		onActivate: ""
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
	classes: "sun-checkbox-item",

	/**
	* @private
	*/
	components: [
		{name: "clientWrapper", classes: "sun-checkbox-item-label", kind: "FittableRows", components:[
			{name: "client",mixins: ["sun.EllipsisSupport"],classes: "sun-checkbox-item-label-wrapper"},
			{name: "subClient", mixins: ["sun.EllipsisSupport"],classes: "sun-checkbox-item-subContent-wrapper"}
		]},
		{name: "input", kind: "sun.Checkbox"}
	],

	/**
	* @private
	*/
	create: function() {
		this.inherited(arguments);
		this.disabledChanged();
		this.checkboxOnRightChanged();
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
	checkboxOnRightChanged: function() {
		this.addRemoveClass("left-handed", !this.getCheckboxOnRight());
	},

	/**
	* waterfall event
	* @fires enyo.Control#event:ontap
	* @private
	*/
	tap: function(inSender, inEvent) {
		if (inSender != this.$.input) {
			this.waterfallDown("ontap", inEvent, inSender);
		}
	},

	/**
	* @fires sun.CheckboxItem#event:onActivate
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