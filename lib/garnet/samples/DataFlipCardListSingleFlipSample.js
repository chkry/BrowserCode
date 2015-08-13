/**
	_g.sample.DataFlipCardListSingleFlipPanel_ is specilized _g.Panel_ contains a list.
	This panel has headerComponents and footerCompoents
*/
enyo.kind({
	name: "g.sample.DataFlipCardListSingleFlipPanel",
	kind: "g.Panel",
	knob: true,
	//* @protected
	classes: "g-layout-absolute-wrapper",
	components: [{
		name: "list",
		kind: "g.DataFlipCardList",
		controlsPerPage: 4,
		style: "background-color: #121519;",
		headerComponents: [],
		components: [{
			onflick: "flickHandler",
			components: [{
				name: "listItem",
				classes: "g-sample-dataflipcard-list-item",
				components: [{
					name: "iconUrl",
					kind: "enyo.Image",
					style: "width: 320px; height: 320px"
				}, {
					name: "albumTitle",
					content: "albumTitle",
					classes: "g-sample-dataflipcard-list-item-title"
				}, ]
			}],
			bindings: [{
				from: ".model.iconUrl",
				to: ".$.iconUrl.src"
			}, {
				from: ".model.albumTitle",
				to: ".$.albumTitle.content"
			}]
		}],
	}],
	bindings: [{
		from: ".collection",
		to: ".$.list.collection"
	}],
	// handling the flick event to prevent multiple flips and explicitly calling flipNext() and flipPrev() APIs
	flickHandler: function(inSender, inEvent) {
		if (inEvent.xVelocity > -1 && inEvent.xVelocity < 1) {
			if (inEvent.yVelocity > 0) {
				this.$.list.flipPrev();
			} else {
				this.$.list.flipNext();
			}
		}
		return true;
	}
});
/**
	DataFlipCardListSingleFlipSample is main page.
*/
enyo.kind({
	name: "g.sample.DataFlipCardListSingleFlipSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [{
		content: "< Data Flip Card List Sample with Single Flip",
		classes: "g-sample-header",
		ontap: "goBack"
	}, {
		content: "Data Flip Card List with Single Flip",
		classes: "g-sample-subheader"
	}, {
		name: "listPanel",
		kind: "g.sample.DataFlipCardListSingleFlipPanel",
		style: "position: relative; display: inline-block; margin-right: 20px;"
	}],
	bindings: [{
		from: ".collection",
		to: ".$.listPanel.collection"
	}],
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
	data: [{
		iconUrl: "./assets/photo.png",
		albumTitle: "0",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "1",
		selected: true
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "2",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "3",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "4",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "5",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "6",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "7",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "8",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "9",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "10",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "11",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "12",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "13",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "14",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "15",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "16",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "17",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "18",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "19",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "20",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "21",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "22",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "23",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "24",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "25",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "26",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "27",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "28",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "29",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "30",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "31",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "32",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "33",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "34",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "35",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "36",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "37",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "38",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "39",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "40",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "41",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "42",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "43",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "44",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "45",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "46",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "47",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "48",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "49",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "50",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "51",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "52",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "53",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "54",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "55",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "56",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "57",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "58",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "59",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "60",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "61",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "62",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "63",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "64",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "65",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "66",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "67",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "68",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "69",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "70",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "71",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "72",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "73",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "74",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "75",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "76",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "77",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "78",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "79",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "80",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "81",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "82",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "83",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "84",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "85",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "86",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "87",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "88",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "89",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "90",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "91",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "92",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "93",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "94",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "95",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "96",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "97",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "98",
		selected: false
	}, {
		iconUrl: "./assets/photo.png",
		albumTitle: "99",
		selected: false
	}]
});