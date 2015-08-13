enyo.kind({
	name: "g.sample.PickerPanel",
	kind: "g.Panel",
	events: {
		onResult: ""
	},
	components: [
		{style: "position: relative; background-color: #000000;", classes: "g-common-width-height-fit", components: [
			{name: "pickerButton", kind: "g.FormPickerButton", style: "top: 134px;", ontap: "showPopup", content: "Click here!"},
			{name: "pickerPopup", kind: "g.Popup", effect: "depth-transition", components: [
				{style: "background-color: #000000;position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
					{name: "pickerPanel", kind: "g.PickerPanel", title: true, titleContent: "PickerTitle", ontap: "tapItem"}
				]}
			]}
		]}
	],
	bindings: [
		{from: ".collection", to: ".$.pickerPanel.collection"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new enyo.Collection(this.data);
		};
	}),
	rendered: function() {
		// default index
		this.$.pickerPanel.setIndex(2);
		this.doResult({msg: "The item index #" + this.$.pickerPanel.getIndex() + " is selected."});
	},
	showPopup: function(inSender, inEvent) {
		if (inSender.name === "pickerButton") {
			this.$.pickerPopup.show();
		}
	},
	tapItem: function(inSender, inEvent) {
		var index = this.$.pickerPanel.getIndex();

		this.doResult({msg: "The item index #" + index + " is selected."});
		this.$.pickerPopup.hide();
		this.$.pickerButton.setContent((this.data[index]).item);
	},
	data: [
		{item: "This item title is very long"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"}
	]
});

enyo.kind({
	name: "g.sample.PickerPanelSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< PickerPanel Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "PickerPanel", classes: "g-sample-subheader"},
		{kind: "g.sample.PickerPanel", style: "position: relative;", onResult: "result"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No button pressed yet.", classes: "g-sample-description"}
		]}
	],
	result: function(inSender, inEvent) {
		this.$.result.setContent(inEvent.msg);
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
