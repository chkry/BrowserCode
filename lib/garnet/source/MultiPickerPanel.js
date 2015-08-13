(function (enyo, g, scope) {
	/**
	* _g.MultiPickerItemBase_ is a base item for a {@link g.MultiPickerPanel}
	*
	* @class g.MultiPickerItemBase
	* @private
	*/
	enyo.kind(
		/** @lends g.MultiPickerItemBase.prototype */ {

		/**
		* @private
		*/
		name: "g.MultiPickerItemBase",

		/**
		* @private
		*/
		kind: "g.Item",

		/**
		* @private
		*/
		published:
			/** @lends g.MultiPickerItemBase.prototype */ {

			/**
			* title of the MultiPickerPanel
			*
			* @type {String}
			* @default ""
			* @private
			*/
			title: "",

			/**
			* Set to true to add the _selected_ class to the image tile;
			* set to false to remove the _selected_ class
			*
			* @type {Boolean}
			* @default false
			* @private
			*/
			selected: false
		},

		/**
		* @private
		*/
		classes: "g-multipicker-item",

		/**
		* @private
		*/
		components: [
			{name: "title", classes: "g-multipicker-item-title"},
			{classes: "g-multi-picker-item-border"}
		],

		/**
		* @private
		*/
		bindings: [
			{from: ".title", to: ".$.title.content"},
			{from: ".title", to: ".$.title.showing", kind: "enyo.EmptyBinding"}
		],

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.selectedChanged();
			};
		}),

		/**
		* Accessibility : initialize
		*
		* @method
		* @private
		*/
		initAccessibility: enyo.inherit(function (sup) {
			return function (control) {
				sup.apply(this, arguments);
				this.setAttribute("role", "checkbox");
				this.setAttribute("aria-labelledby", this.getId());
				this.setAttribute("tabindex", 0);
			}
		}),

		/**
		* @private
		*/
		selectedChanged: function() {
			this.addRemoveClass("selected", this.selected);

			// accessibility - change checkbox status
			this.setAttribute("aria-checked", this.selected);
		},

		/**
		* @private
		*/
		disabledChanged: function() {
			this.addRemoveClass("disabled", this.disabled);

			// accessibility - change disabled status
			this.setAttribute("aria-disabled", this.disabled);
		}
	});

	/**
	* _g.MultiPickerItem_ is a picker item for MultiPickerPanel.
	*
	* @class g.MultiPickerItem
	* @extends g.MultiPickerItemBase
	* @mixes g.SelectionOverlaySupport
	* @private
	*/
	enyo.kind(
		/** @lends g.MultiPickerItem.prototype */ {

		/**
		* @private
		*/
		name: "g.MultiPickerItem",

		/**
		* @private
		*/
		kind: "g.MultiPickerItemBase",

		/**
		* @private
		*/
		mixins: ["g.SelectionOverlaySupport"],

		/**
		* @private
		*/
		selectionOverlayHorizontalOffset: 15,

		/**
		* @private
		*/
		bindings: [
			{from: ".model.item", to: ".title"}
		]
	});

	/**
	* Fired when the Cancel button is tapped.
	*
	* @event g.MultiPickerPanel#onCancel
	* @type {Object}
	* @property {Object} sender - The component that most recently propagated the event.
	* @property {Object} event - An object containing the event information.
	* @public
	*/

	/**
	* Fired when the OK button is tapped.
	*
	* @event g.MultiPickerPanel#onOK
	* @type {Object}
	* @property {Object} sender - The component that most recently propagated the event.
	* @property {Object} event - An object containing the event information.
	* @public
	*/

	/**
	* _g.MultiPickerPanel_ is specialized [g.Panel]{@link g.Panel}, that contains a picker with checkboxes.
	* In  _g.MultiPickerPanel_, multiple checkboxes are selectable.
	* To use a picker that only allows single selection, refer to [g.PickerPanel]{@link g.PickerPanel}.
	*
	* @class g.MultiPickerPanel
	* @extends g.Panel
	* @public
	*/
	enyo.kind(
		/** @lends g.MultiPickerPanel.prototype */ {

		/**
		* @private
		*/
		name: "g.MultiPickerPanel",

		/**
		* @private
		*/
		kind: "g.Panel",

		/**
		* @private
		*/
		events: {
			onCancel: "",
			onOK: ""
		},

		/**
		* Values of selected in this MultiPicker list.
		*
		* @type {Array}
		* @default []
		* @public
		*/
		value: [],

		/**
		* @private
		*/
		observers: [
			{method: "selectedChanged", path: "$.list.selected"}
		],

		/**
		* @private
		*/
		selection: true,

		/**
		* @private
		*/
		multipleSelection: true,

		/**
		* Contains a set of commnadBar button components.
		*
		* @type {Array}
		* @default [{name: "cancel", src: "$lib/garnet/images/btn_command_close.svg", ontap: "_onCancel"},
		*			{name: "ok", src: "$lib/garnet/images/btn_command_done.svg", ontap: "_onOK"}]
		* @public
		*/
		commandBarComponents: [
			{name: "cancel", accessibilityLabel: g.$L({key: "g_cancel", value: "cancel"}), src: "$lib/garnet/images/btn_command_close.svg", ontap: "_onCancel"},
			{name: "ok", accessibilityLabel: g.$L({key: "g_ok", value: "ok"}), src: "$lib/garnet/images/btn_command_done.svg", ontap: "_onOK"}
		],

		/**
		* @private
		*/
		_beforeSelected: [],

		/**
		* @private
		*/
		classes: "g-multi-picker g-common-width-height-fit",

		/**
		* @private
		*/
		components: [
			{
				name: "list",
				kind: "g.DataList",
				classes: "g-multi-picker-list",
				controlsPerPage: 4,
				components: [
					{ kind:"g.MultiPickerItem" }
				],
				footerComponents: [{style: "width: 100%; height: 93px;", ontap: "preventSound"}]
			}
		],

		/**
		* @private
		*/
		bindings: [
			{from: ".collection", to: ".$.list.collection"},
			{from: ".$.list.selected", to: ".value"}
		],

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);

				this.$.list.set("selection", this.selection);
				this.$.list.set("multipleSelection", this.multipleSelection);

				this.$.list.$.footer.addClass("g-picker-footer-comp");

				this.valueChanged();
			};
		}),

		/**
		* @private
		*/
		selectedChanged: function() {
			var selected = this.$.list._selection;
			this.value = undefined;
			this.set("value", enyo.clone(selected));
		},

		/**
		* @private
		*/
		valueChanged: function() {
			if (this.value !== undefined && this.value !== "" && this.$.ok !== undefined) {
				this.$.ok.setDisabled(this.value.length == 0);
			 	return true;
			}
		},

		/**
		* @fires g.MultiPickerPanel#onCancel
		* @private
		*/
		preventSound: function() {
			inEvent.preventSound = true;
		},

		/**
		* @private
		*/
		_onCancel: function(inSender, inEvent) {
			// load saved item indexes before..
			var s = enyo.clone(this._beforeSelected);
			var indexes = [];

			// clear all
			this.deselectAll();

			// get the selected indexes & check
			while (s.length) {
				var i = this.collection.indexOf(s.pop());
				indexes.push(i);
			}
			while(indexes.length) {
				this.select(indexes.pop());
			}
			this.value = enyo.clone(this._beforeSelected);
			this.doCancel({originalEvent: enyo.clone(inEvent, true)});
			return true;
		},

		/**
		* @fires g.MultiPickerPanel#onOK
		* @private
		*/
		_onOK: function(inSender, inEvent) {
			this._beforeSelected = enyo.clone(this.value);
			this.doOK({originalEvent: enyo.clone(inEvent, true)});
			return true;
		},

		/**
		* Deselects all the selected items in the list.
		*
		* @public
		*/
		deselectAll: function() {
			this.$.list.deselectAll();
		},

		/**
		* Selects the given item specified by the `inIndex`.
		*
		* @param {Number} inIndex - The index of the item to select
		* @public
		*/
		select: function(inIndex) {
			this.$.list.select(inIndex);
		},

		/**
		* Deselects the given item specified by the `inIndex`.
		*
		* @param {Number} inIndex - The index of the item to deselect.
		* @public
		*/
		deselect: function(inIndex) {
			this.$.list.deselect(inIndex);
		}
	});

})(enyo, g, this);
