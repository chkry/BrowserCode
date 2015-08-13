enyo.kind({
	name: "sun.sample.PopupSample",
	classes: "sun enyo-unselectable enyo-fit",
	components: [
		{content: "Popup"},
		{tag:'br'},
		{kind: "sun.Button", content: "Show Popup", ontap: "showPopup", popup: "basicPopup"},
		{name: "basicPopup", kind: "sun.Popup", classes: "sun-sample-popup", centered: true, components: [
			{classes: "dialog_title", content: "Confirmation"},
			{kind: "Group", onActivate: "groupChanged", components: [
				{kind: "sun.RadioItem", classes: "dialog_radioitem", radioOnRight: true, content: "Group Option 1"},
				{classes: "dialog_divider"},
				{kind: "sun.RadioItem", classes: "dialog_radioitem", radioOnRight: true, content: "Group Option 2", checked: true},
				{classes: "dialog_divider"},
				{kind: "sun.RadioItem", classes: "dialog_radioitem", radioOnRight: true, disabled: true, content: "Disabled"},
				{classes: "dialog_divider"},
				{kind: "sun.RadioItem", classes: "dialog_radioitem sub", radioOnRight: true, content: "Group Option 3", subContent:"google@gmail.com"},
				{classes: "dialog_divider"}
			]},
			{classes: "command_buttons_wrapper", components: [
				{classes: "command_buttons", components: [
					{kind: "sun.Button", content: "OK", classes: "bottom-okcancle-button", ontap: "hidePopups"},
					{kind: "sun.Button", content: "CANCEL", classes: "bottom-okcancle-button", ontap: "hidePopups"}
				]}
			]}
		]}
	],
	popupActivator: null,
	setupAddListItem:function(inSender,inEvent)
	{
		var i = inEvent.index;
		this.$.addListItem.setLabel("Test Item" + i);
	},
	showPopup: function(inSender) {
		this.hidePopups();
		var p = this.$[inSender.popup];
		if (p) {
			p.show();
		}
	},
	hidePopups: function() {
		this.$.basicPopup.hide();
	},
	incValue: function() {
		this.$.progress.animateProgressTo(Math.min(parseInt(this.$.progress.getProgress() || 0, 10) + 25, 100));
	},
	decValue: function() {
		this.$.progress.animateProgressTo(Math.max(parseInt(this.$.progress.getProgress() || 0, 10) - 25, 0));
	},
	panelNext: function() {
		this.$.panels.next();
	},
	panelPrev: function() {
		this.$.panels.previous();
	}
});