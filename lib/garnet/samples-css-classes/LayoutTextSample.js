enyo.kind({
	name: "g.sample.LayoutTextSample",
	kind: "enyo.Scroller",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Layout Text Sample", classes: "g-sample-header", ontap: "goBack"},
		{content: "Text align with no 'g-layout-text-wrapper'", classes: "g-sample-subheader"},
		{style: "border-radius: 50%; background-color: black; display: inline-block;", classes: "g-layout-absolute-wrapper g-common-width-height-fit", components: [
			{classes: "g-layout-absolute-wrapper left right", style: "height: 20px; margin-left: 20px; margin-right: 20px;", components: [
				{content: "Text", classes: "g-layout-text-left"},
				{content: "Text", classes: "g-layout-text-center"},
				{content: "Text", classes: "g-layout-text-right"}
			]}
		]},
		{content: "Text align with 'g-layout-text-wrapper'", classes: "g-sample-subheader"},
		{style: "border-radius: 50%; background-color: black; display: inline-block;", classes: "g-layout-absolute-wrapper g-common-width-height-fit", components: [
			{classes: "g-layout-absolute-wrapper g-layout-text-wrapper left right", style: "height: 20px; margin-left: 20px; margin-right: 20px;", components: [
				{content: "Text", classes: "left"},
				{content: "Text", classes: "center"},
				{content: "Text", classes: "right"}
			]}
		]}
	],
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
