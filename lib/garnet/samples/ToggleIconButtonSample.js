enyo.kind({
	name: "g.sample.ToggleIconButtonPanel",
	kind: "g.Panel",
	handlers: {
		onChange: "valueChange"
	},
	events: {
		onResult: ""
	},
	classes: "g-layout-absolute-wrapper",
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{classes: "g-layout-absolute-center", style: "width: 280px; height: 230px;", components: [
			{content: "Toggle Icon Buttons : ", style: "margin-left: 10px; font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
			{tag: "br"},
			{kind: "g.ToggleIconButton", style:"margin-right: 10px; width: 60px; height: 60px;", src: "assets/switch_default_oi_transparent.svg", active: true},
			{kind: "g.ToggleIconButton", style:"margin-right: 10px;", src: "assets/switch_list_transparent.svg"},
			{kind: "g.ToggleIconButton", style:"margin-right: 10px; width: 60px; height: 60px;", src: "assets/switch_default_oi_transparent.svg", pending: true, ontap: "togglePending"},
			{kind: "g.ToggleIconButton", style:"margin-right: 10px;", src: "assets/switch_list_transparent.svg", disabled: true},
			{content: "Grouped Icon Buttons : ", style: "font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
			{kind: "Group", onActivate:"iconGroupActivated", components: [
				{kind: "g.ToggleIconButton", style:"margin-right: 10px; width: 60px; height: 60px;", src: "assets/switch_default_transparent.svg", active: true},
				{kind: "g.ToggleIconButton", style:"margin-right: 10px; width: 60px; height: 60px;", src: "assets/switch_default_oi_transparent.svg"},
				{kind: "g.ToggleIconButton", style:"margin-right: 10px;", src: "assets/switch_list_transparent.svg"},
				{kind: "g.ToggleIconButton", style:"margin-right: 10px;", src: "assets/switch_list_oi_transparent.svg"}
			]}
		]}
	],
	valueChange: function(inSender, inEvent) {
		this.doResult({msg: inSender.name + " is " + (inEvent.originator.getValue() ? " selected." : "deselected.")});
	},
	togglePending: function(inSender, inEvent) {
		// settting the state of toggle icon button from 'offPending/onPending' to 'off/on' - using timers for demo purpose
		var pendingValue = inSender.getPendingValue();
		if (pendingValue === "onPending" || pendingValue === "offPending") {
			setTimeout(function() {
				inEvent.originator.set("pendingValue", (pendingValue === "onPending")? "on" : "off");
			}, 2000);
			this.doResult({msg: inSender.name + " is " + ((inSender.getValue()? "selected," : "deselected,") + " and pending to be toggled.")});
		}
	},
	iconGroupActivated: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			var ordinals = ["1st", "2nd", "3rd", "4th"],
				selected = inEvent.originator.indexInContainer();

			this.doResult({msg: "The " + ordinals[selected] + " icon button in the group is selected."});
		}
	}
});

enyo.kind({
	name: "g.sample.ToggleIconButtonSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Toggle Icon Button Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Toggle Icon Buttons", classes: "g-sample-subheader"},
		{kind: "g.sample.ToggleIconButtonPanel", style: "position: relative;", onResult: "result"},

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
