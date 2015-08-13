/**
	_g.DataListSampleItem_ is a list item for data list.
*/
enyo.kind({
	name: "g.DataListSampleItem",
	kind: "g.Item",
	classes: "g-sample-datalist-item",
	handlers: {
		onItemDown: "itemDown"
	},
	published: {
		/**
            Set to true to add the _selected_ class to the item; set to
            false to remove the _selected_ class
        */
		selected: false
	},
	components: [
		{name: "iconUrl", kind: "g.IconButton", style: "margin-left: 38px;"},
		{name: "albumTitle", classes: "g-sample-datalist-item-title"},
		{name: "albumGenre", classes: "g-sample-datalist-item-genre"},
		{tag: "hr", style: "border: 0; color: #202328; height: 1px; background-color: #202328; bottom: 0;"}
	],
	bindings: [
		{from: ".model.iconUrl", to: ".$.iconUrl.src"},
		{from: ".model.albumTitle", to: ".$.albumTitle.content"},
		{from: ".model.albumGenre", to: ".$.albumGenre.content"},
		{from: ".model.disabled", to: ".disabled"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.selectedChanged();
		};
	}),
	selectedChanged: function() {
		this.addRemoveClass("selected", this.selected);
	},
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
	},
	itemDown: function(inSender, inEvent) {
	}
});

/**
	_g.sample.DataListPanel_ is specilized _g.Panel_ contains a list.
	This panel has headerComponents and footerCompoents
*/
enyo.kind({
	name: "g.sample.DataListPanel",
	kind: "g.Panel",
	//* @protected
	title: true,
	titleContent: "WELCOME",
	knob: true,
	components: [
		{
			name: "list",
			kind: "g.DataList",
			controlsPerPage: 4,
			style: "background-color: #000000;",
			headerComponents: [
				{style: "height: 60px;"},
				{kind: "enyo.ToolDecorator", style: "height: 71px; border-bottom: 1px solid #202328; ", ontap: "preventSound", components: [
					{content: "SELECTED", style: "width: 151px; padding: 0 5px 0 58px; line-height: 71px;"},
					{kind: "g.Checkbox", style: "width: 48px; padding-right: 58px;"}
				]}
			],
			components: [
				{kind: "g.DataListSampleItem", onlongpress: "showPopup"}
			],
			footerComponents: [
				{kind: "g.Button", content: "Text", style: "width: 122px; height: 52px; margin: 21px 99px 21px;"}
			]
		},
		{
			name: "popup",
			kind: "g.IconMenuPopup",
			buttonComponents: [
				{
					name: "First button2",
					style: "width: 82px; height: 82px;",
					ontap: "hidePopup",
					src: "assets/btn_delete.svg"
				},
				{
					name: "Second button2",
					style: "width: 82px; height: 82px;",
					ontap: "hidePopup",
					src: "assets/btn_share.svg"
				},
				{
					name: "Third button2",
					style: "width: 82px; height: 82px;",
					ontap: "hidePopup",
					src: "assets/btn_delete.svg"
				},
				{
					name: "Firth button2",
					style: "width: 82px; height: 82px;",
					ontap: "hidePopup",
					src: "assets/btn_share.svg"
				}
			]
		}
	],
	preventSound: function(inSender, inEvent) {
		inEvent.preventSound = true;
	},
	showPopup: function(inSender, inEvent) {
		this.$.popup.show();
	},
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	]
});

/**


	DataListSample is main page.

**/
enyo.kind({
	name: "g.sample.DataListSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Data List Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Data List", classes: "g-sample-subheader"},
		{name: "listPanel", kind: "g.sample.DataListPanel", style: "position: relative;"}
	],
	bindings: [
		{from: ".collection", to: ".$.listPanel.collection"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new enyo.Collection(this.data);
		};
	}),
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	},
	data: [
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Looooooooooooong Title", albumGenre: "Rock", disabled: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Looooooooooooong Title", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Looooooooooooong Title", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Looooooooooooong Title", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Looooooooooooong Title", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"}
	]
});
