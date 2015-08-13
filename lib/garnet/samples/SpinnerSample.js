enyo.kind({
	name: "g.sample.SpinnerPanel",
	kind: "g.Panel",
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{classes: "g-layout-absolute-center", style: "width: 244px; height: 110px;", components: [
			{kind: "g.Spinner", style: "width: 100%", content: "Connecting to the server"}
		]}
	]
});

enyo.kind({
	name: "g.sample.TextSpinnerPanel",
	kind: "g.Panel",
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{kind: "g.Spinner", classes: "g-layout-absolute-center", style: "position: absolute;"}
	]
});

enyo.kind({
	name: "g.sample.SpinnerSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Spinner Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Spinners", classes: "g-sample-subheader"},
		{style: "position: relative; height: 100%", components: [
			{
				name: "spinnerPanel",
				kind: "g.sample.SpinnerPanel",
				style: "background-color: #000000; position: relative; display: inline-block; overflow: hidden;"
			},
			{
				name: "textSpinnerPanel",
				kind: "g.sample.TextSpinnerPanel",
				style: "background-color: #000000; position: relative; display: inline-block; overflow: hidden;"
			}
		]}
	],
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
