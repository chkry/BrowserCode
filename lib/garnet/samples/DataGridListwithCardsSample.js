/**
	Sample GridItem
*/
enyo.kind({
	name: "g.sample.DataGridListCardsSampleItem",
	kind: "g.DataGridListCardsSampleImageItem",
	mixins: ["g.SelectionOverlaySupport"],
	selectionScrimIcon: "$lib/garnet/images/badge_check.png",
	selectionOverlayVerticalOffset: 0,
	selectionOverlayHorizontalOffset: 0,
	bindings: [
		{from: ".model.url", to: ".source"}
	]
});

enyo.kind({
	name: "g.sample.DataGridListCardsSampleCircleItem",
	kind: "g.DataGridListCardsSampleCircleImageItem",
	mixins: ["g.SelectionOverlaySupport"],
	selectionScrimIcon: "$lib/garnet/images/badge_check.png",
	selectionOverlayVerticalOffset: 0,
	selectionOverlayHorizontalOffset: 0,
	bindings: [
		{from: ".model.text", to: ".caption"},
		{from: ".model.url", to: ".source"}
	]
});

/**
	You may create an image grid by adding instances of this kind as components of
	a [g.GridList](#g.GridList). See the latter kind for an example of how
	this may be done.
*/
enyo.kind({
	name: "g.DataGridListCardsSampleImageItem",
	classes: "g-sample-gridlistcards-imageitem",
	components: [
		{name: "image", kind: "enyo.Image"},
		{name: "caption", classes: "caption"}
	],
	published: {
		//* The absolute URL path to the image
		source: "",
		//* The primary caption to be displayed with the image
		caption: "",
		/**
            Set to true to add the _selected_ class to the image tile; set to
            false to remove the _selected_ class
        */
		selected: false
	},
	bindings: [
		{from: ".source", to: ".$.image.src"},
		{from: ".caption", to: ".$.caption.content"}
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

enyo.kind({
	name: "g.DataGridListCardsSampleCircleImageItem",
	kind: "g.DataGridListCardsSampleImageItem",
	classes: "g-sample-gridlistcards-circle-imageitem"
});

/**
	_g.sample.DataGridListCardsSamplePanel_ is specilized _g.Panel_ contains a grid list.
*/
enyo.kind({
	name: "g.sample.DataGridListCardsSamplePanel",
	kind: "g.Panel",
	title: true,
	titleContent: "Title",
	knob: true,
	classes: "g-layout-absolute-wrapper",
	style: "width: 320px; height: 320px; background-color: #000000;",
	components: [
		{
			name: "list",
			kind: "g.DataGridList",
			controlsPerPage: 3,
			selection: true,
			multipleSelection: false,
			spacing: 0,
			minHeight: 232,
			minWidth: 212,
			scrollerOptions: {maxHeight: "370px"},
			style: "width: 212px; height: 320px; padding-top: 6px; margin: auto; background-color: #000000;",
			components: [
				{ kind: "g.sample.DataGridListCardsSampleItem" }
			]
		}
	],
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	]
});

/**
	_g.sample.DataGridListCardsCircleSamplePanel_ is specilized _g.Panel_ contains a grid list.
*/
enyo.kind({
	name: "g.sample.DataGridListCardsCircleSamplePanel",
	kind: "g.Panel",
	title: true,
	titleContent: "Title",
	knob: true,
	classes: "g-layout-absolute-wrapper",
	style: "width: 320px; height: 320px; background-color: #000000;",
	components: [
		{
			name: "list",
			kind: "g.DataGridList",
			controlsPerPage: 3,
			selection: true,
			multipleSelection: false,
			spacing: 0,
			minHeight: 252,
			minWidth: 212,
			scrollerOptions: {maxHeight: "370px"},
			style: "width: 212px; height: 320px; padding-top: 6px; margin: auto; background-color: #000000;",
			components: [
				{ kind: "g.sample.DataGridListCardsSampleCircleItem" }
			]
		}
	],
	bindings: [
		{from: ".collection", to: ".$.list.collection"}
	]
});

enyo.kind({
	name: "g.sample.DataGridListwithCardsSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Data Grid List with Cards Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Data Grid List with Cards", classes: "g-sample-subheader"},
		{name: "gridList", kind: "g.sample.DataGridListCardsSamplePanel", style: "position: relative; display: inline-block; margin-right: 10px"},
		{name: "gridListCircle", kind: "g.sample.DataGridListCardsCircleSamplePanel", style: "position: relative; display: inline-block;"}
	],
	bindings: [
		{from: ".collection", to: ".$.gridList.collection"},
		{from: ".collection", to: ".$.gridListCircle.collection"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.set("collection", new enyo.Collection(this.generateRecords()));
		};
	}),
	generateRecords: function () {
		var records	= [],
			idx     = this.index || 0;
		for (; records.length < 500; ++idx) {
			var title = (idx % 8 === 0) ? " with long title" : "";
			records.push({
				text: "Item " + idx + title,
				url: "assets/photo.png"
			});
		}
		// update our internal index so it will always generate unique values
		this.index = idx;
		return records;
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
