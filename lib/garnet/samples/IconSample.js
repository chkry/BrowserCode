enyo.kind({
	name: "g.sample.IconPanel",
	kind: "g.Panel",
	classes: "g-layout-absolute-wrapper",
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{classes: "g-layout-absolute-center", style: "width: 255px; height: 230px;", components: [
			{content: "Icons : ", style: "margin-left: 10px; font-size: 20px; display: inline-block; margin-right: 10px; color: #FFFFFF;"},
			{tag: "br"},
			{kind: "g.Icon", src: "assets/btn_cancel.svg", style: "width: 82px; height: 82px;", classes: "g-sample-icon-black-background-color"},
			{kind: "g.Icon", src: "assets/btn_done.svg", disabled: true, style: "width: 82px; height: 82px;", classes: "g-sample-icon-black-background-color"},
			{kind: "g.Icon", src: "assets/ic_dialog_alert.svg", classes: "g-sample-icon-black-background-color"},
			{tag: "br"},
			{tag: "br"},
			{kind: "g.Icon", src: "assets/btn_cancel.svg", disabled: true, style: "width: 82px; height: 82px;"},
			{kind: "g.Icon", src: "assets/btn_done.svg", style: "width: 82px; height: 82px;"},
			{kind: "g.Icon", src: "assets/ic_dialog_alert.svg", classes: "g-sample-icon-margin-right"}
		]}
	]
});

enyo.kind({
	name: "g.sample.IconSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Icon Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Icons", classes: "g-sample-subheader"},
		{kind: "g.sample.IconPanel", style: "position: relative;"}
	],
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
