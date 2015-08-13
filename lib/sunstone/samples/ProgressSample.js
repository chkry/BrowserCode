enyo.kind({
	name: "sun.sample.ProgressSample",
	classes: "sun enyo-unselectable inpage-progress-sample enyo-fit",
	components: [
		{content: "Progress Bars"},
		{tag: "br"},
		{name:"progress",kind: "sun.ProgressBar", progress:30},
		{tag: "br"},
		{kind: "sun.InputDecorator", style: "margin-right:10px;width:300px;", components: [
			{kind: "sun.Input", value:30, placeholder: "Value"}
		]},
		{kind: "sun.Button", content:"Set", classes:"sun-sample-spaced-button", ontap: "changeValue"},
		{kind: "sun.Button", content:"-", classes:"sun-sample-spaced-button", ontap: "decValue"},
		{kind: "sun.Button", content:"+", classes:"sun-sample-spaced-button", ontap: "incValue"},
		{tag: "br"},
		{content: "Progress Background Bars", style:"font-size:18px"},
		{kind: "sun.InputDecorator", style: "margin-right:10px;width:300px;", components: [
			{name:"bgInput",kind: "sun.Input", value:0, placeholder: "Value"}
		]},
		{kind: "sun.Button", content:"Set", classes:"sun-sample-spaced-button", ontap: "changeBgValue"},
		{style: "width:480px;", components: [
			{name: "animateSetting", kind: "sun.CheckboxItem", checked: true, content: "Animated"}
		]}
	],
	changeValue: function(inSender, inEvent) {
		if (this.$.animateSetting.getChecked()) {
			this.$.progress.animateProgressTo(this.$.input.getValue());
		} else {
			this.$.progress.setProgress(this.$.input.getValue());
		}
	},
	changeBgValue: function(inSender, inEvent) {
		this.$.progress.setBgProgress(this.$.bgInput.getValue());
	},
	incValue: function(inSender, inEvent) {
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0, 10) + 10, this.$.progress.getMax()));
		this.changeValue(inSender, inEvent);
	},
	decValue: function(inSender, inEvent) {
		this.$.input.setValue(Math.max(parseInt(this.$.input.getValue() || 0, 10) - 10, this.$.progress.getMin()));
		this.changeValue(inSender, inEvent);
	}
});
