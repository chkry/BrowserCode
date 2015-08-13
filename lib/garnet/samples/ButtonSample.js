enyo.kind({
	name: "g.sample.ButtonPanel",
	kind: "g.Panel",
	events: {
		onResult: ""
	},
	classes: "g-layout-absolute-wrapper",
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{classes: "g-layout-absolute-center", style: "width: 280px; height: 230px;", components: [
			{name: "B Button", kind: "g.Button", content: "B", ontap: "tapButton"},
			{name: "Button", kind: "g.Button", content: "Btn A", ontap: "tapButton"},
			{name: "B Button Disabled", kind: "g.Button", content: "Disabled", style: "width: 100px", disabled: true, ontap: "tapButton"},
			{content: "Fixed Button : ", style: "font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
			{name: "Fixed Button", kind: "g.Button", content: "Fixed Button", style: "width: 280px;", ontap: "tapButton"},
			{content: "Grouped Buttons : ", style: "font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
			{kind: "Group", components: [
				{name: "Apple Button",  kind: "g.Button", content: "AA", ontap: "tapButton"},
				{name: "Banana Button", kind: "g.Button", content: "BB", ontap: "tapButton"},
				{name: "Cherry Button", kind: "g.Button", content: "CC", ontap: "tapButton",active: true}
			]}
		]}
	],
	tapButton: function(inSender, inEvent) {
		this.doResult({msg: "&quot;" + inSender.name + "&quot; pressed."});
	}
});

enyo.kind({
	name: "g.sample.ButtonSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Button Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Buttons", classes: "g-sample-subheader"},
		{kind: "g.sample.ButtonPanel", style: "position: relative;", onResult: "result"},

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
