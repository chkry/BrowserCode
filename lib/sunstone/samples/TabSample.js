enyo.kind({
	name: "sun.sample.TabSample",
	kind: "FittableRows",
	classes: "enyo-fit",
	components: [
		{kind: "sun.Tab", name:"sampleTab", classes:"enyo-unselectable enyo-fit", components: [
			{tabName:"TAB111111111111", components: [
				{tag:"br"},
				{content: "First Item"},
				{kind: "sun.Button", content: "Hello"}
			]},
			{tabName:"TAB2", components: [
				{tag:"br"},
				{content: "Second Item"},
				{kind: "sun.Button", content: "Hello"}
			]},
			{tabName:"TAB3", components: [
				{tag:"br"},
				{content: "Third Item"},
				{kind: "sun.Button", content: "Hello"}
			]},
			{tabName:"TAB4", components: [
				{tag:"br"},
				{content: "Fourth Item"},
				{kind: "sun.Button", content: "Hello"}
			]}
		]}
	]
});