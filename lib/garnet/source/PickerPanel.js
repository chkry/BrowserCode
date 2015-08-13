(function (enyo, g, scope) {
	/**
	* _g.PickerItemBase_ is a base of pickerPanel's item
	*
	* @class g.PickerItemBase
	* @private
	*/
	enyo.kind(
		/** @lends g.PickerItemBase.prototype */ {

		/**
		* @private
		*/
		name: "g.PickerItemBase",

		/**
		* @private
		*/
		kind: "g.Item",

		/**
		* @private
		*/
		classes: "g-picker-item",

		/**
		* @private
		*/
		published:
			/** @lends g.PickerItemBase.prototype */ {

			/**
			* Title
			*
			* @type {String}
			* @default ""
			* @private
			*/
			title: "",

			/**
			* Set to true to add the _selected_ class to the image tile; set to
			* false to remove the _selected_ class
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
		components: [
			{name: "title", classes: "g-picker-item-title"},
			{classes: "g-picker-item-border"}
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
	* {@link g.PickerItem} is a item kind of this PickerPanel.
	*
	* @class g.PickerItem
	* @extends g.PickerItemBase
	* @mixes g.SelectionOverlaySupport
	* @private
	*/
	enyo.kind(
		/** @lends g.PickerItem.prototype */ {

		/**
		* @private
		*/
		name: "g.PickerItem",

		/**
		* @private
		*/
		kind: "g.PickerItemBase",

		/**
		* @private
		*/
		mixins: ["g.SelectionOverlaySupport"],

		/**
		* @private
		*/
		selectionScrimIcon: "$lib/garnet/images/ic_check_list.svg",

		/**
		* @private
		*/
		selectionOverlayVerticalOffset: 50,

		/**
		* @private
		*/
		selectionOverlayHorizontalOffset: 80,

		/**
		* @private
		*/
		bindings: [
			{from: ".model.item", to: ".title"}
		]
	});

	/**
	* _g.PickerPanel_ is a [g.Panel]{@link g.Panel}, that contains a picker that supports only _single_ selection, not multiple.
	* This panel has neither `headerComponents` nor `footerCompoents`.
	*
	* @class g.PickerPanel
	* @extends g.Panel
	* @public
	*/
	enyo.kind(
		/** @lends g.PickerPanel.prototype */ {

		/**
		* @private
		*/
		name: "g.PickerPanel",

		/**
		* @private
		*/
		kind: "g.Panel",

		/**
		* Selected item object in this picker panel.
		*
		* @type {Object}
		* @default undefined
		* @public
		*/
		value: undefined,

		/**
		* @private
		*/
		selection: true,

		/**
		* @private
		*/
		multipleSelection: false,

		/**
		* @private
		*/
		classes: "g-picker g-layout-absolute-wrapper",

		/**
		* @private
		*/
		components: [
			{
				name: "list",
				kind: "g.DataList",
				classes: "g-picker-list",
				controlsPerPage: 4,
				components: [{
					kind:"g.PickerItem",
					ontap: "onTapItem"
				}],
				groupSelection: true
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
			};
		}),

		/**
		* @private
		*/
		onTapItem: function(inSender, inEvent) {
			this.value.attributes.index = inEvent.index;
		},

		/**
		* @private
		*/
		tap: function(inSender, inEvent) {
			inEvent.preventDefault();
		},

		/**
		* Deselects the selected item in the list.
		*
		* @public
		*/
		deselectAll: function() {
			this.$.list.deselectAll();
			this.value = undefined;
		},

		/**
		* Sets the item with the given index as selected.
		*
		* @param {Number} inIndex  The index of the item to select
		* @public
		*/
		setIndex: function(inIndex) {
			this.$.list.select(inIndex);
			this.value.attributes.index = inIndex;
		},

		/**
		* Gets the index of the selected item in the list.
		*
		* @returns {Number} The index of the selected item.
		* @public
		*/
		getIndex: function() {
			if(this.value == undefined || this.value.attributes == undefined) {
				return -1;
			} else {
				return this.value.attributes.index;
			}
		},
	});

})(enyo, g, this);
