enyo.kind({
	name: "sun.sample.InputSample",
	kind:"FittableRows",
	classes: "sun enyo-unselectable enyo-fit sun-input-sample",
	components: [
		{kind: "sun.Scroller", horizontal: "hidden", fit: true, components: [
			{kind: "sun.InputDecorator", components: [
				{kind: "sun.Input", classes: "sun-input", style:"width:224px", placeholder:"Enter Text", oninput:"handleInput", onchange:"handleChange"}
			]},
			{tag:"br"},
			{tag:"br"},
			{kind: "sun.InputDecorator", components: [
				{kind: "sun.Input", type: "password", classes: "sun-input", placeholder: "Enter password", oninput:"handleInput", onchange:"handleChange"}
			]},
			{tag:"br"},
			{tag:"br"},
			{kind: "sun.InputDecorator", components: [
				{kind: "sun.Input", type: "number", classes: "sun-input", placeholder: "Enter number", oninput:"handleInput", onchange:"handleChange"}
			]}
		]},
		{name: "console", allowHtml: false, content: "Input: "}
	],
	handleChange: function(inSender, inEvent) {
		this.$.console.setContent("Changed: " + inSender.getValue());
	}
});