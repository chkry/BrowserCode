enyo.kind({
	name: "sun.sample.CheckboxItemSample",
	kind:"FittableRows",
	classes: "enyo-unselectable enyo-fit",
	components: [
		{kind: "sun.Scroller", components: [
			{components: [
				{content: "Checkbox Items", classes: "textsample checkbox-sample"},
				{kind: "sun.CheckboxItem", classes: "checkbox-sample", content: "Option 1", subContent:"google@gmail.com",checked: true, onchange: "itemChanged"},
				{kind: "sun.CheckboxItem", classes: "checkbox-sample", content: "Option 2", onchange: "itemChanged"},
				{kind: "sun.CheckboxItem", classes: "checkbox-sample", disabled: true, content: "Disabled", onchange: "itemChanged"},
				{kind: "sun.CheckboxItem", classes: "checkbox-sample", content: "Option 3", subContent:"lge@lge.com", onchange: "itemChanged"}
			]},
			{components: [
				{content: "Checkbox Item Group", classes: "textsample checkbox-sample"},
				{kind: "Group", onActivate: "groupChanged", components: [
					{kind: "sun.CheckboxItem", classes: "checkbox-sample", content: "Group Option 1"},
					{kind: "sun.CheckboxItem", classes: "checkbox-sample", subContent:"google@gmail.com",content: "Group Option 2", checked: true},
					{kind: "sun.CheckboxItem", classes: "checkbox-sample", disabled: true, content: "Disabled"},
					{kind: "sun.CheckboxItem", classes: "checkbox-sample", subContent:"lge@lge.com", content: "Group Option 3"}
				]}
			]},
			{components: [
				{tag:"br"},
				{content:"Result", classes: "textsample checkbox-sample"},
				{name:"result", classes: "checkbox-sample", content:"Nothing selected"}
			]}
		]}
	],
	itemChanged: function(inSender, inEvent) {
		this.$.result.setContent(inSender.getContent() + " was " + (inSender.getChecked() ? " selected." : "deselected."));
	},
	groupChanged: function(inSender, inEvent) {
		if (inEvent.toggledControl.getChecked()) {
			var selected = inEvent.toggledControl.getContent();
			this.$.result.setContent(selected + " was selected.");
		}
	}
});