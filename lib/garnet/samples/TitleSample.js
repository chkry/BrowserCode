enyo.kind({
	name: "g.sample.TitlePanel",
	kind: "g.Panel",
	handlers: {
		onTitleTap: "tapTitle",
		onTitleClick: "clickTitle"
	},
	events: {
		onResult: ""
	},
	title: true,
	titleContent: "Title: long text will fade out",
	components: [
		{
			name: "scroller",
			kind: "g.Scroller",
			classes: "enyo-fit g-layout-text-center",
			scrollIndicatorEnabled: true,
			components: [
				{style: "padding-top: 60px; width: 200px; margin: auto;", content: "Garnet is a UI library built for wearable devices and is based on Enyo 2.4.0. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions."},
				{kind: "g.Button", content: "OK!!!", ontap: "tapButton", style: "margin: 20px 0 70px;"}
			]
		}
	],
	tapButton: function(inSender, inEvent) {
		this.doResult({msg: "Button tapped !!"});
	},
	tapTitle: function(inSender, inEvent) {
		this.doResult({msg: "Title tapped !!"});
	},
	clickTitle: function(inSender, inEvent) {
		this.doResult({msg: "Title clicked !!"});
	}
});

enyo.kind({
	name: "g.sample.TitleSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Title ( + BodyText ) Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Title with a scrollable content area", classes: "g-sample-subheader"},
		{kind: "g.sample.TitlePanel", style: "position: relative;", onResult: "result"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No tapped yet.", classes: "g-sample-description"}
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
