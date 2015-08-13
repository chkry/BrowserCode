enyo.kind({
	name: "g.sample.MultiPickerPanel",
	kind: "g.Panel",
	handlers: {
		onOK: "tapOK",
		onCancel: "tapCancel"
	},
	events: {
		onResult: ""
	},
	components: [
		{name: "pickerButton", kind: "g.FormPickerButton", style: "top: 130px;", ontap: "showPopup", content: "Click here!"},
		{name: "pickerPopup", kind: "g.Popup", effect: "depth-transition", components: [
			{
				name: "multipicker",
				kind: "g.MultiPickerPanel",
				title: true,
				titleContent: "MultiPickerTitle"
			}
		]}
	],
	bindings: [
		{from: ".collection", to: ".$.multipicker.collection"},
		{from: ".$.multipicker.value", to: ".$.pickerButton.content", transform: function(val) {
			var items = val,
				names = "";
			if (items !== null && items != undefined && items.length > 0) {
				for (var i=0; i<items.length; i++) {
					names += ", " + items[i].attributes.item;
				}
				names = names.slice(2);
			} else {
				names = "None";
			}

			return names;
		}}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new enyo.Collection(this.data);
		};
	}),
	tapCancel: function() {
		this.$.pickerPopup.hide();
	},
	tapOK: function() {
		var items = this.$.multipicker.value,
			names = "";

		if (items !== null && items != undefined && items.length > 0) {
			for (var i=0; i<items.length; i++) {
				names += ", " + items[i].attributes.item;
			}
			names = names.slice(2);
		} else {
			names = "None";
		}
		this.doResult({msg: names});
		this.$.pickerPopup.hide();
	},
	showPopup: function(inSender, inEvent) {
		this.$.pickerPopup.show();
	},
	data: [
		{item: "Looooooooooong Title"},
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
	name: "g.sample.MultiPickerPanelSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< MultiPickerPanel Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "MultiPickerPanel", classes: "g-sample-subheader"},
		{kind: "g.sample.MultiPickerPanel", style: "position: relative;", onResult: "result"},

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
