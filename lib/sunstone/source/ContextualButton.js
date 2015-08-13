/**
* _sun.ContextualButton_ generates a {@link sun.ContextualPopup}
* when tapped.
*
* ```
*   {kind: 'sun.ContextualButton',content:'activateButton',components: [
*       {kind:'sun.ContextualPopup', components:[
*			{content: 'Sample component in popup'}
*		]}
*	]}
* ```
*
* @class sun.ContextualButton
* @extends enyo.Control
* @public
*/
enyo.kind(
	/** @lends sun.ContextualButton.prototype */ {

	/**
	* @private
	*/
	name: "sun.ContextualButton",

	/**
	* @private
	*/
	kind: 'enyo.Control',

	/**
	* @private
	*/
	classes: 'sun-contextual-button',

	/**
	* @private
	*/
	handlers: {
		ondown : 'down',
		onup : 'up',
		onleave : 'up',
		ontap: "ContextualButtonTapped",
		onHide: "popupHidden",
		onShow: "popupShown"
	},

	/**
	* @private
	*/
	components:[
		{name: "pickerContainer", kind: "FittableColumns", classes: "sun-dropdown-picker-container", components:[
			{name: "headerTextContainer", components: [
				{name: "headerText", classes: "sun-dropdown-text"}
			]},
			{name: "headerIconContainer", classes: "sun-dropdown-icon-container", components: [
				{name: "headerIcon", classes: "sun-dropdown-icon"}
			]}
		]}
	],

	/**
	* @private
	*/
	_popupActive: false,

	/**
	* @private
	*/
	contentChanged: function() {
		this.$.headerText.setContent(this.getContent());
	},

	/**
	* Event waterfalls down.
	* @fires sun.ContextualPopup#onRequestShowPopup
	* @private
	*/
	ContextualButtonTapped: function(inSender, inEvent) {
		if (!this._popupActive) {
			this._popupActive = true;
			this.waterfallDown("onRequestShowPopup", {activator: this});
		}
	},

	/**
	* @private
	*/
	pressedChanged: function() {
		this.setAttribute("pressed", this.pressed ? "pressed" : "");
	},

	/**
	* @private
	*/
	popupHidden: function() {
		this._popupActive = false;
	},

	/**
	* @private
	*/
	popupShown: function() {
		this._popupActive = true;
	},

	/**
	* @private
	*/
	down: function(inSender,inEvent) {
		if(inEvent.originator.owner.kindName === "sun.ContextualButton"){
			this.set("pressed", true);
		}
	},

	/**
	* @private
	*/
	up: function(inSender,inEvent) {
		if(inEvent.originator.owner.kindName === "sun.ContextualButton"){
			this.set("pressed", false);
		}
	}
});
