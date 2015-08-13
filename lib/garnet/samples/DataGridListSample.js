/**
	Sample GridItems
*/
enyo.kind({
	name: "g.sample.DataGridListSampleItem",
	kind: "g.DataGridListSampleImageItem",
	mixins: ["g.SelectionOverlaySupport"],
	selectionScrimIcon: "$lib/garnet/images/frame_check.png",
	selectionOverlayVerticalOffset: 0,
	selectionOverlayHorizontalOffset: 0,
	bindings: [{
		from: ".model.text",
		to: ".caption"
	}, {
		from: ".model.url",
		to: ".source"
	}]
});

enyo.kind({
	name: "g.sample.DataGridListSampleCircleItem",
	kind: "g.DataGridListSampleCircleImageItem",
	mixins: ["g.SelectionOverlaySupport"],
	selectionScrimIcon: "$lib/garnet/images/frame_check.png",
	selectionOverlayVerticalOffset: 0,
	selectionOverlayHorizontalOffset: 0,
	bindings: [{
		from: ".model.text",
		to: ".caption"
	}, {
		from: ".model.url",
		to: ".source"
	}]
});

/**
	You may create an image grid by adding instances of this kind as components of
	a [g.GridList](#g.GridList). See the latter kind for an example of how
	this may be done.
*/
enyo.kind({
	name: "g.DataGridListSampleImageItem",
	classes: "g-sample-gridlist-imageitem",
	components: [{
		name: "image",
		kind: "enyo.Image"
	}, {
		name: "caption",
		classes: "caption"
	}],
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
	bindings: [{
		from: ".source",
		to: ".$.image.src"
	}, {
		from: ".caption",
		to: ".$.caption.content"
	}, {
		from: ".caption",
		to: ".$.caption.showing",
		kind: "enyo.EmptyBinding"
	}],
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
	name: "g.DataGridListSampleCircleImageItem",
	kind: "g.DataGridListSampleImageItem",
	classes: "g-sample-gridlist-circle-imageitem"
});

/**
	_g.DataGridListPanel_ is specilized _g.Panel_ contains a grid list.
*/
enyo.kind({
	name: "g.sample.DataGridListPanel",
	kind: "g.Panel",
	title: true,
	titleContent: "Title",
	knob: true,
	selection: false,
	multipleSelection: false,
	classes: "g-layout-absolute-wrapper",
	style: "background-color: #000000;",
	components: [{
		name: "list",
		kind: "g.DataGridList",
		controlsPerPage: 8,
		spacing: 0,
		style: "width: 232px; height: 320px; top: 6px; margin: auto; background-color: #000000;",
		components: [{
			kind: "g.sample.DataGridListSampleItem"
		}]
	}],
	bindings: [{
		from: ".collection",
		to: ".$.list.collection"
	}],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.list.set("selection", this.selection);
			this.$.list.set("multipleSelection", this.multipleSelection);
		};
	})
});

/**
	_g.DataGridListCirclePanel_ is specilized _g.Panel_ contains a circled grid list.
*/
enyo.kind({
	name: "g.sample.DataGridListCirclePanel",
	kind: "g.sample.DataGridListPanel",
	components: [{
		name: "list",
		kind: "g.DataGridList",
		controlsPerPage: 8,
		spacing: 0,
		minHeight: 106,
		style: "width: 230px; height: 320px; top: 6px; margin: auto; background-color: #000000;",
		components: [{
			kind: "g.sample.DataGridListSampleCircleItem"
		}]
	}]
});

/**
	DataGridListSample is main page.

**/
enyo.kind({
	name: "g.sample.DataGridListSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{
			content: "< Data Grid List Sample",
			classes: "g-sample-header",
			ontap: "goBack"
		}, {
			content: "Data Grid List", classes: "g-sample-subheader"
		}, {
			name: "gridListCircle",
			kind: "g.sample.DataGridListCirclePanel",
			style: "position: relative; display: inline-block; margin-right: 20px;",
			selection: true,
			multipleSelection: true
		}, {
			name: "gridListMulti",
			kind: "g.sample.DataGridListPanel",
			style: "position: relative; display: inline-block; margin-right: 20px;",
			selection: true,
			multipleSelection: true
		}, {
			name: "gridListSingleCircle",
			kind: "g.sample.DataGridListCirclePanel",
			style: "position: relative; display: inline-block; margin-right: 20px;",
			selection: true
		}, {
			name: "gridListSingle",
			kind: "g.sample.DataGridListPanel",
			style: "position: relative; display: inline-block; margin-right: 20px;",
			selection: true
		}
	],
	bindings: [
		{from: ".collection", to: ".$.gridListMulti.collection"},
		{from: ".collection", to: ".$.gridListCircle.collection"},
		{from: ".collection", to: ".$.gridListSingleCircle.collection"},
		{from: ".collection", to: ".$.gridListSingle.collection"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.set("collection", new enyo.Collection(this.generateRecords()));
		};
	}),
	generateRecords: function() {
		var records = [],
			idx = this.index || 0;
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
