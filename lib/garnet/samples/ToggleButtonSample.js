enyo.kind({
	name: "g.sample.ToggleButtonPanel",
	kind: "g.Panel",
	events: {
		onResult: ""
	},
	classes: "g-layout-absolute-wrapper",
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{classes: "g-layout-absolute-center", style: "width: 280px; height: 230px;", components: [
			{kind: "g.ToggleButton", value: true, content: "1", ontap: "tapButton"},
			{kind: "g.ToggleButton", content: "2", ontap: "tapButton"},
			{kind: "g.ToggleButton", disabled: true, content: "Disabled", ontap: "tapButton"},
			{content: "Grouped ToggleButtons : ", style: "font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
			{kind: "Group", components: [
				{kind: "g.ToggleButton", active: true, content: "AA", ontap: "tapButton"},
				{kind: "g.ToggleButton", content: "BB", ontap: "tapButton"},
				{kind: "g.ToggleButton", content: "CC", ontap: "tapButton"}
			]}
		]}
	],
	tapButton: function(inSender, inEvent) {
		var str = '"'+inSender.content+'" ' + (inSender.getActive() ? 'selected' : 'unselected') + '.';
		this.doResult({msg: str});
	}
});

enyo.kind({
	name: "g.sample.ToggleButtonSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Toggle Button Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Toggle Buttons", classes: "g-sample-subheader"},
		{kind: "g.sample.ToggleButtonPanel", style: "position: relative;", onResult: "result"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No action yet", classes: "g-sample-description"}
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