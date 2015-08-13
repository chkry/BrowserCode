enyo.kind({
	name: "g.sample.CheckboxPanel",
	kind: "g.Panel",
	events: {
		onResult: ""
	},
	classes: "g-layout-absolute-wrapper",
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{classes: "g-layout-absolute-center g-sample-setting", style: "width: 255px; height: 230px;", components: [
			{content: "Checkboxes : ", style: "margin-left: 10px; font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
			{tag: "br"},
			{kind:"g.Checkbox", onchange:"checkboxChanged"},
			{kind:"g.Checkbox", onchange:"checkboxChanged", checked: true},
			{kind:"g.Checkbox", onchange:"checkboxChanged", disabled: true},
			{kind:"g.Checkbox", onchange:"checkboxChanged", checked: true, disabled: true},
			{content: "Grouped Checkboxes : ", style: "font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
			{kind: "Group", onActivate:"groupActivated", components: [
				{kind:"g.Checkbox", checked: true},
				{kind:"g.Checkbox"},
				{kind:"g.Checkbox"}
			]}
		]}
	],
	checkboxChanged: function(inSender, inEvent) {
		this.doResult({msg: inSender.name + " was " + (inSender.getValue() ? " selected." : "deselected.")});
	},
	groupActivated: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			var ordinals = ["1st", "2nd", "3rd"],
				selected = inEvent.originator.indexInContainer();
			this.doResult({msg: "The " + ordinals[selected] + " checkbox in the group is selected."});
		}
	}
});

enyo.kind({
	name: "g.sample.CheckboxSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Checkbox Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Checkboxes", classes: "g-sample-subheader"},
		{kind: "g.sample.CheckboxPanel", style: "position: relative;", onResult: "result"},

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
