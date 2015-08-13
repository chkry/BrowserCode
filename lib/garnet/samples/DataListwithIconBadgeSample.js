/**
	_g.IconBadgeItem_ is a list item for icon badged list.

*/
enyo.kind({
	name: "g.IconBadgeItem",
	kind: "g.Item",
	//* @protected
	classes: "g-datalist-icon-badge-item",
	//* @public
	published: {
		//* Title
		title: "",
		/**
            Set to true to add the _new-icon_ class to the image tile; set to
            false to remove the _new-icon_ class
        */
		newIcon: false,
		/**
            Set to true to add the _info-icon_ class to the image tile; set to
            false to remove the _info-icon_ class
        */
		infoIcon: false
	},
	components: [
		{name: "icon", kind: "g.Icon", classes: "icon-badge-item-icon"},
		{name: "newIconBadge", kind: "g.Icon", classes: "icon-badge-item-new-icon"},
		{name: "infoIconBadge", kind: "g.Icon", classes: "icon-badge-item-info-icon"},
		{name: "title", classes: "icon-badge-item-title"},
		{tag: "hr", style: "border: 0; color: #202328; height: 1px; background-color: #202328; bottom: 0;"}
	],
	bindings: [
		{from: ".model.albumTitle", to: ".$.title.content"},
		{from: ".model.albumTitle", to: ".$.title.showing", kind: "enyo.EmptyBinding"},
		{from: ".model.iconUrl", to: ".$.icon.src"},
		{from: ".model.newIcon", to: ".newIcon"},
		{from: ".model.infoIcon", to: ".infoIcon"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.newIconChanged();
			this.infoIconChanged();
		};
	}),
	newIconChanged: function() {
		if (this.newIcon) {
			this.$.newIconBadge.show();
		} else {
			this.$.newIconBadge.hide();
		}
	},
	infoIconChanged: function() {
		if (this.infoIcon) {
			this.$.infoIconBadge.show();
		} else {
			this.$.infoIconBadge.hide();
		}
	}
});

/**
	_g.sample.IconBadgeDataListPanel_ is specilized _g.Panel_ contains a list with icon badge.
	This panel has default headerComponents and footerCompoents.
*/
enyo.kind({
	name: "g.sample.IconBadgeDataListPanel",
	kind: "g.Panel",
	title: true,
	titleContent: "Title",
	knob: true,
	components: [
		{
			name: "list",
			kind: "g.DataList",
			controlsPerPage: 4,
			selection: false,
			multipleSelection: false,
			style: "background-color: #000000;",
			components: [
				{ kind:"g.IconBadgeItem" }
			]
		}
	],
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	]
});

/**
	DataListwithIconBadgeSample is main page.

**/
enyo.kind({
	name: "g.sample.DataListwithIconBadgeSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Data List with Icon Badge Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Data List with Icon Badge", classes: "g-sample-subheader"},
		{name: "iconBadgeListPanel", kind: "g.sample.IconBadgeDataListPanel", style: "position: relative;"}
	],
	bindings: [
		{from: ".collection", to: ".$.iconBadgeListPanel.collection"}
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
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Looooooooooong Title", albumGenre: "Rock", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Loooooooooong Title", albumGenre: "Rock", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Looooooooooong Title", albumGenre: "Rock", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Loooooooooong Title", albumGenre: "Ballad", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Raymond", albumGenre: "Rock", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Petersen", albumGenre: "Pop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Kristina", albumGenre: "Ballad", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barbra", albumGenre: "Rock", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Tracey", albumGenre: "Hiphop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Alejandra", albumGenre: "Rock", newIcon: true, infoIcon: false},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Marquez", albumGenre: "Pop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Barr", albumGenre: "Hiphop", newIcon: true, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Everett", albumGenre: "Rock", newIcon: false, infoIcon: true},
		{iconUrl: "./assets/ic_dialog_alert.svg", albumTitle: "Crane", albumGenre: "Ballad", newIcon: false, infoIcon: true}
	]
});
