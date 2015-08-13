/**
	_g.sample.RadioButtonItem_ kind is list item kind with checkbox
**/
enyo.kind({
	name: "g.sample.RadioButtonItem",
	kind: "g.RadioButtonItem",
	mixins: ["g.SelectionOverlaySupport"],
	selectionScrimIcon: "$lib/garnet/images/btn_radio.svg",
	selectionOverlayVerticalOffset: 53,
	selectionOverlayHorizontalOffset: 80,
	bindings: [
		{from: ".model.albumTitle", to: ".title"}
	]
});
/**
	_g.RadioButtonItem_ is a radio button list item.
*/
enyo.kind({
	name: "g.RadioButtonItem",
	kind: "g.Item",
	classes: "g-datalist-radiobutton-item",
	published: {
		//* Title
		title: "",
		/**
			True if this item is currently selected; false if not
		*/
		selected: false
	},
	components: [
		{name: "title", classes: "radiobutton-item-title"},
		{tag: "hr", style: "border: 0; color: #202328; height: 1px; background-color: #202328; bottom: 0;"}
	],
	bindings: [
		{from: ".title", to: ".$.title.content"},
		{from: ".title", to: ".$.title.showing", kind: "enyo.EmptyBinding"}
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
	}
});

/**
	_g.sample.RadioDataListPanel_ is specilized _g.Panel_ contains a list with radio buttons.
*/
enyo.kind({
	name: "g.sample.RadioDataListPanel",
	kind: "g.Panel",
	noDefer: true,
	events: {
		onResult: ""
	},
	title: true,
	titleContent: "DataList with Radio Buttons",
	components: [
		{
			name: "list",
			kind: "g.DataList",
			controlsPerPage: 4,
			groupSelection: true,
			selection: true,
			style: "background-color: #000000;",
			components: [
				{kind:"g.sample.RadioButtonItem", ontap: "tapItem"}
			],
			footerComponents: [
				{style: "height: 116px;"}
			]
		}
	],
	commandBarComponents: [
		{name: "cancel", src: "$lib/garnet/images/btn_command_close.svg", ontap: "tapCancel"},
		{name: "ok", src: "$lib/garnet/images/btn_command_done.svg", ontap: "tapOK", disabled: true}
	],
	bindings: [
		{from: ".collection", to: ".$.list.collection"},
		{from: ".title", to: ".$.listTitle.content"}
	],
	getSelectedItem: function() {
		if (this.$.list.get("selected")) {
			return this.$.list.get("selected").attributes.albumTitle;
		} else {
			return "";
		}
	},
	tapItem: function(inSender, inEvent) {
		if (inEvent.originator.owner.selected) {
			this.doResult({msg: "The " + inEvent.originator.owner.getTitle() + " in the list is selected."});
		}
		this.$.ok.setDisabled(false);
	},
	tapCancel: function() {
		this.doResult({msg: "Cancel button is pressed."});
	},
	tapOK: function() {
		this.doResult({msg: "OK button is pressed: " + this.getSelectedItem()});
	}
});

/**
	ListwithRadioButtonsSample main page.

**/
enyo.kind({
	name: "g.sample.DataListwithRadioButtonsSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< DataList with Radio Buttons Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "DataList with Radio Buttons", classes: "g-sample-subheader"},
		{name: "radioDataListPanel", kind: "g.sample.RadioDataListPanel", style: "position: relative;", onResult: "result"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No item selected yet.", classes: "g-sample-description"}
		]}
	],
	bindings: [
		{from: ".collection", to: ".$.radioDataListPanel.collection"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new enyo.Collection(this.data);
		};
	}),
	result: function(inSender, inEvent) {
		this.$.result.setContent(inEvent.msg);
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	},
	data: [
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Looooooooooong Title", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Looooooooooong Title", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad"}
	]
});
