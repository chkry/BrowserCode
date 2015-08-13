(function (enyo, g, scope) {
	/**
	* Fired when the Cancel button is tapped.
	*
	* @event g.ConfirmPopup#onCancel
	* @type {Object}
	* @property {Object} sender - The [component]{@link http://enyojs.com/docs/latest/#/kind/enyo.Component}
	*	that most recently propagated the event.
	* @property {Object} event - An object containing the event information.
	* @public
	*/

	/**
	* Fired when the OK button is tapped.
	*
	* @event g.ConfirmPopup#onOK
	* @type {Object}
	* @property {Object} sender - The [component]{@link http://enyojs.com/docs/latest/#/kind/enyo.Component}
	*	that most recently propagated the event.
	* @property {Object} event - An object containing the event information.
	* @public
	*/

	/**
	* _g.ConfirmPopup_ is a popup with two confirmation buttons that are positioned at the bottom of the popup.
	*
	* @class g.ConfirmPopup
	* @extends g.Popup
	* @public
	*/
	enyo.kind(
		/** @lends g.ConfirmPopup.prototype */ {

		/**
		* @private
		*/
		name: "g.ConfirmPopup",

		/**
		* @private
		*/
		kind: "g.Popup",

		/**
		* `buttonComponents` contains a Cancel button and an OK button.
		* These two buttons can be replaced with user-defined buttons.
		* Up to two buttons can be placed  in this popup.
		*
		* @public
		*/
		buttonComponents: [

			// accessibility - add accessibilityLabel for IconButtons.
			{name: "cancel", kind: "g.IconButton", accessibilityLabel: g.$L({key: "g_cancel", value: "cancel"}), ontap: "_onCancel", classes: "g-cancel-image"},
			{name: "ok", kind: "g.IconButton", accessibilityLabel: g.$L({key: "g_ok", value: "ok"}), ontap: "_onOK", classes: "g-ok-image"}
		],

		/**
		* @private
		*/
		events: {
			onCancel: "",
			onOK: ""
		},

		/**
		* @private
		*/
		handlers: {
			onflick: "preventDrag",
			ondragstart: "preventDrag",
			ondrag: "preventDrag"
		},

		/**
		* @private
		*/
		centered: true,

		/**
		* @private
		*/
		floating: true,

		/**
		* @private
		*/
		classes: "g-confirm-popup g-layout-box-inside-circle",

		/**
		* @private
		*/
		tools: [
			{name: "client", classes: "g-confirm-popup-client"},
			{name: "buttonContainer", classes: "g-confirm-popup-button-container"}
		],

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				// maximun button count is 2
				var max = 2;
				if (this.buttonComponents.length > max) {
					var bc = this.buttonComponents.slice(0, 2);
					this.buttonComponents = bc;
				}

				sup.apply(this, arguments);
			};
		}),

		/**
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function(sup) {
			return function() {
				var hasOwnProperty = this.hasOwnProperty("components");
				this.contentComponents = this.components || this.kindComponents;
				this.components = this.kindComponents = null;
				this.createComponents(this.tools);
				this.$.client.createComponents(this.contentComponents, hasOwnProperty ? {owner: this.getInstanceOwner()} : {owner: this});
				this.$.buttonContainer.createComponents(this.buttonComponents,
					this.hasOwnProperty("buttonComponents") ? {owner: this.getInstanceOwner()} : {owner: this}
				);

				sup.apply(this, arguments);
			};
		}),

		/**
		* @private
		*/
		preventDrag: function() {
			return true;
		},

		/**
		* @fires g.ConfirmPopup#onOK
		* @private
		*/
		_onOK: function(inSender, inEvent) {
			this.doOK({originalEvent: enyo.clone(inEvent, true)});
			return true;
		},

		/**
		* @fires g.ConfirmPopup#onCancel
		* @private
		*/
		_onCancel: function(inSender, inEvent) {
			this.doCancel({originalEvent: enyo.clone(inEvent, true)});
			return true;
		}
	});

})(enyo, g, this);
