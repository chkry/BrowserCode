/**
	_g.sample.DataListPanel_ is specilized _g.Panel_ contains a list.
	This panel has headerComponents and footerCompoents
*/
enyo.kind({
	name: "g.sample.DataListCardsPanel",
	kind: "g.Panel",
	//* @protected
	knob: true,
	classes: "g-layout-absolute-wrapper",
	components: [
		{
			name: "list",
			kind: "g.DataList",
			controlsPerPage: 2,
			cards: true,
			style: "background-color: #000000;",
			components: [
				{ontap: "showPopup", components: [
					{name: "listItem", classes: "g-sample-datalistcards-item", components: [
						{name: "iconUrl", kind: "enyo.Image", style: "width: 320px; height: 320px;"}
					]}
				], bindings: [
					{from: ".model.iconUrl", to: ".$.iconUrl.src"}
				]}
			]
		}
	],
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	]
});

/**
	DataListwithCardsSample is main page.

**/
enyo.kind({
	name: "g.sample.DataListwithCardsSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Data List with Cards Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Data List with Cards", classes: "g-sample-subheader"},
		{name: "listPanel", kind: "g.sample.DataListCardsPanel", style: "position: relative;"}
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
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Alejandra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Marquez", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barr", albumGenre: "Hiphop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Everett", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Crane", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Raymond", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Petersen", albumGenre: "Pop"},
		{iconUrl: "./assets/photo.png", albumTitle: "Kristina", albumGenre: "Ballad"},
		{iconUrl: "./assets/photo.png", albumTitle: "Barbra", albumGenre: "Rock"},
		{iconUrl: "./assets/photo.png", albumTitle: "Tracey", albumGenre: "Hiphop"}
	]
});
