// dafult commandBar sample
enyo.kind({
	name: "g.sample.DefaultCommandBarPanel",
	kind: "g.Panel",
	events: {
		onResult: ""
	},
	title: true,
	titleContent: "Title",
	components: [
		{
			name: "defaultScroller",
			kind: "g.Scroller",
			classes: "enyo-fit g-layout-text-center",
			components: [
				{style: "padding-top: 60px; width: 200px; margin: auto;", content: "Garnet is a UI library built for wearable devices and is based on Enyo 2.4.0. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions."},
				{kind: "g.Button", style: "margin: 20px 0 116px;", content: "OK!!!"}
			]
		}
	],
	commandBarComponents: [
		{name: "cancel", src: "$lib/garnet/images/btn_command_close.svg", ontap: "tapButton"},
		{name: "ok", src: "$lib/garnet/images/btn_command_done.svg", disabled: true}
	],
	tapButton: function(inSender, inEvent) {
		this.doResult({msg: inSender.name});
	}
});

// single commandBar sample
enyo.kind({
	name: "g.sample.SingleCommandBarPanel",
	kind: "g.Panel",
	events: {
		onResult: ""
	},
	title: true,
	titleContent: "Title",
	components: [
		{
			name: "sigleScroller",
			kind: "g.Scroller",
			classes: "enyo-fit g-layout-text-center",
			components: [
				{style: "padding-top: 60px; width: 200px; margin: auto;", content: "Garnet is a UI library built for wearable devices and is based on Enyo 2.4.0. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions."},
				{kind: "g.Button", style: "margin: 20px 0 116px;", content: "OK!!!"}
			]
		}
	],
	commandBarComponents: [
		{name: "done", src: "$lib/garnet/images/btn_command_done.svg", ontap: "tapButton"}
	],
	tapButton: function(inSender, inEvent) {
		this.doResult({msg: inSender.name});
	}
});

// custom commandBar sample
enyo.kind({
	name: "g.sample.CustomCommandBarPanel",
	kind: "g.Panel",
	events: {
		onResult: ""
	},
	title: true,
	titleContent: "Title",
	components: [
		{
			name: "sigleScroller",
			kind: "g.Scroller",
			classes: "enyo-fit g-layout-text-center",
			components: [
				{style: "padding-top: 60px; width: 200px; margin: auto;", content: "Garnet is a UI library built for wearable devices and is based on Enyo 2.4.0. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions."},
				{kind: "g.Button", style: "margin: 20px 0 116px;", content: "OK!!!"}
			]
		}
	],
	commandBarComponents: [
		// TODO: Update this legacy example to work
		{name: "previous", src: "assets/btn_command_previous.svg", ontap: "previousTap"},
		{name: "next", src: "assets/btn_command_next.svg", ontap: "nextTap"}
	],
	previousTap: function(inSender, inEvent) {
		this.doResult({msg: inSender.name});
	},
	nextTap: function(inSender, inEvent) {
		this.doResult({msg: inSender.name});
	}
});

enyo.kind({
	name: "g.sample.CommandBarSample",
	handlers: {
		onResult: "result"
	},
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< CommandBar Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Default / Single / Custom", classes: "g-sample-subheader"},
		{style: "position: relative; height: 100%;", components: [
			{
				name: "commandBar1",
				kind: "g.sample.DefaultCommandBarPanel",
				style: "background-color: #000000; position: relative; display: inline-block; margin-left: 10px; overflow: hidden;"
			},
			{
				name: "commandBar2",
				kind: "g.sample.SingleCommandBarPanel",
				style: "background-color: #000000; position: relative; display: inline-block; margin-left: 10px; overflow: hidden;"
			},
			{
				name: "commandBar3",
				kind: "g.sample.CustomCommandBarPanel",
				style: "background-color: #000000; position: relative; display: inline-block; margin-left: 10px; overflow: hidden;"
			}
		]},

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
