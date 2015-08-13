enyo.kind({
	name: "g.sample.IconButtonPanel",
	kind: "g.Panel",
	events: {
		onResult: ""
	},
	classes: "g-layout-absolute-wrapper",
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{classes: "g-layout-absolute-center", style: "width: 255px; height: 230px;", components: [
			{content: "Icon Buttons : ", style: "margin-left: 10px; font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
			{tag: "br"},
			{kind: "g.IconButton", style:"margin-right: 2px; height: 82px; width: 82px;", src: "assets/btn_done.svg", ontap: "tapButton"},
			{kind: "g.IconButton", style:"margin-right: 2px; height: 82px; width: 82px;", src: "assets/btn_done.svg", disabled: true, ontap: "tapButton"},
			{content: "Grouped Icon Buttons : ", style: "font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
			{kind: "Group", onActivate:"iconGroupActivated", components: [
				{kind: "g.IconButton", style:"margin-right: 2px; height: 82px; width: 82px;", active: true, src: "assets/btn_done.svg"},
				{kind: "g.IconButton", style:"margin-right: 2px; height: 82px; width: 82px;", src: "assets/btn_done.svg"},
				{kind: "g.IconButton", style:"margin-right: 2px; height: 82px; width: 82px;", src: "assets/btn_done.svg"}
			]}
		]}
	],
	tapButton: function(inSender, inEvent) {
		this.doResult({msg: '"'+inSender.name+'" ' + 'selected.'});
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
	name: "g.sample.IconButtonSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Icon Button Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Icon Buttons", classes: "g-sample-subheader"},
		{kind: "g.sample.IconButtonPanel", style: "position: relative;", onResult: "result"},

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
