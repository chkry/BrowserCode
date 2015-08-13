enyo.kind({
	name: "g.sample.LayoutBoxSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Layout Box Sample", classes: "g-sample-header", ontap: "goBack"},
		{content: "Text align with no 'g-layout-box-wrapper'", classes: "g-sample-subheader"},
		{classes: "g-common-width-height-fit g-layout-absolute-wrapper", style: "border-radius: 50%; background-color: black;", components: [
			{classes: "g-layout-box-outside-circle", style: "border: white 3px solid; box-sizing: border-box; -moz-box-sizing: border-box; /* Firefox */", content: "outside-circle"},
			{classes: "g-layout-box-outside-circle-no-wheel", style: "border: white 3px solid; box-sizing: border-box; -moz-box-sizing: border-box; /* Firefox */", content: "outside-circle-no-wheel"},
			{classes: "g-layout-box-inside-circle-no-wheel", style: "border: white 3px solid; box-sizing: border-box; -moz-box-sizing: border-box; /* Firefox */", content: "inside-circle-no-wheel"},
			{classes: "g-layout-box-inside-circle", style: "border: white 3px solid; box-sizing: border-box; -moz-box-sizing: border-box; /* Firefox */", content: "inside-circle"}
		]},

		{content: "Text align with 'g-layout-box-wrapper'", classes: "g-sample-subheader"},
		{classes: "g-common-width-height-fit g-layout-absolute-wrapper g-layout-box-wrapper", style: "border-radius: 50%; background-color: black;", components: [
			{classes: "outside-circle", style: "border: white 3px solid; box-sizing: border-box; -moz-box-sizing: border-box; /* Firefox */", content: "outside-circle"},
			{classes: "outside-circle-no-wheel", style: "border: white 3px solid; box-sizing: border-box; -moz-box-sizing: border-box; /* Firefox */", content: "outside-circle-no-wheel"},
			{classes: "inside-circle-no-wheel", style: "border: white 3px solid; box-sizing: border-box; -moz-box-sizing: border-box; /* Firefox */", content: "inside-circle-no-wheel"},
			{classes: "inside-circle", style: "border: white 3px solid; box-sizing: border-box; -moz-box-sizing: border-box; /* Firefox */", content: "inside-circle"}
		]}
	],
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
