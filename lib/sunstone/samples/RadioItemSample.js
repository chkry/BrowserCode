enyo.kind({
	name: "sun.sample.RadioItemSample",
	kind:"FittableRows",
	classes: "sun enyo-unselectable enyo-fit",
	components: [
		{kind: "sun.Scroller",fit:true,components: [
			{components: [
				{kind: "Group", onActivate: "groupChanged", components: [
					{kind: "sun.RadioItem", content: "Group Option 1", subContent:"google@gmail.com"},
					{tag:'br'},
					{kind: "sun.RadioItem", content: "Group Option 2", checked: true},
					{tag:'br'},
					{kind: "sun.RadioItem", disabled: true, content: "Disabled"},
					{tag:'br'},
					{kind: "sun.RadioItem", content: "Group Option 3", subContent:"lge@lge.com"}
				]}
			]},
			{tag:"br"},
			{components: [
				// {kind:"sun.Divider", content:"Result"},
				{name:"result", content:"Nothing selected"}
			]}
			//]}
		]}
	],
	groupChanged: function(inSender, inEvent) {
		if (inEvent.toggledControl.getChecked()) {
			var selected = inEvent.toggledControl.getContent();
			this.$.result.setContent(selected + " was selected.");
		}
	}
});