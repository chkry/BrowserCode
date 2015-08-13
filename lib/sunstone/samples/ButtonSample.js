enyo.kind({
	name: "sun.sample.ButtonSample",
	kind:"FittableRows",
	classes: "sun enyo-unselectable enyo-fit",
	components: [
		{classes: "sun-button-sample-wrapper", components: [
			{content: "Focus Buttons:", classes: "sun-sample-font"},
			{content: "Button (text button)", classes: "sun-sample-font"},
			{name: "B Button", kind: "sun.Button", classes: "sun-button-sample", content: "B", ontap: "buttonTapped"},
			{name: "Button", kind: "sun.Button", content: "Button", ontap: "buttonTapped"},
			{name: "Disabled Button", kind: "sun.Button", disabled: true, content: "Disabled Button", ontap: "buttonTapped"},
			{name: "Long Button", kind: "sun.Button", content: "Loooooooong Button", ontap: "buttonTapped"},
			{tag: "br"},
			{content: "Grouped Buttons:", classes: "sun-sample-font"},
			{content: "Button (group button)", classes: "sun-sample-font"},
			{kind: "enyo.Group", classes: "sun-button-sample-group", components: [
				{name: "Apple Button", kind: "sun.Button", content: "Apple", ontap: "buttonTapped"},
				{name: "Banana Button", kind: "sun.Button", content: "Banana", ontap: "buttonTapped"},
				{name: "Saskatoonberry Button", kind: "sun.Button", content: "Saskatoonberry", ontap: "buttonTapped"}
			]}
		]},
		{content: "Result", classes: "sun-sample-font"},
		{name: "result", allowHtml: true, content: "No button pressed yet.", classes: "sun-sample-font"}
	],
	buttonTapped: function(inSender, inEvent) {
		this.$.result.setContent("&quot;" + inSender.name + "&quot; pressed.");
	}
});