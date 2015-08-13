enyo.kind({
	name: "sun.sample.DeleteDataSample",
	kind: "FittableRows",
	classes: "enyo-unselectable",
	components: [
		{kind: "sun.Header",showBackButton:true,title:"Delete data"},
		{kind: "sun.Scroller",fit:true,classes:"settingList",components:[
			{classes:"general-index",content:"DAILY SUMMARY"},
			{name: "AllLog", kind: "sun.CheckboxItem", classes: "checkbox-sample", content: "All log", onchange: "itemChanged"},
			{classes:"general-index",content:"EXERCISE"},
			{name: "TrackList", kind: "sun.CheckboxItem", classes: "checkbox-sample", content: "Track list", onchange: "itemChanged"},
			{classes:"general-index",content:"COUNTER"},
			{name: "Sit-up", kind: "sun.CheckboxItem", classes: "checkbox-sample", content: "Sit-up", onchange: "itemChanged"},
			{classes: "checkbox-divider"},
			{name: "Squat", kind: "sun.CheckboxItem", classes: "checkbox-sample", content: "Squat", onchange: "itemChanged"},
			{classes: "checkbox-divider"},
			{name: "Dumbbell", kind: "sun.CheckboxItem", classes: "checkbox-sample", checked: true, content: "Dumbbell", onchange: "itemChanged"},
			{classes: "checkbox-divider"},
			{name: "JumpRope", kind: "sun.CheckboxItem", classes: "checkbox-sample", checked: true, content: "Jump rope", onchange: "itemChanged"},
			{classes: "checkbox-divider"}
		]},
		{classes: "checkbox-table", style: "width: 100%", components: [
			{classes:"checkbox-table-cell", components: [
				{name: "cancel", kind: "sun.Button", content: "cancel", style: "width:100%; height:100%;", ontap: "buttonTapped"}
			]},
			{classes:"checkbox-table-cell", style:"width:1px", components: [
				{classes: "button-divider"}
			]},
			{classes:"checkbox-table-cell", components: [
				{name: "ok", kind: "sun.Button", content: "ok", style: "width:100%; height:100%;", ontap: "buttonTapped"}
			]}
		]},
		{name: "toastpopup", kind: "sun.ToastPopup", showDuration: 2000, content: "Hello toastpopup!"}
	],
	itemChanged: function(inSender, inEvent) {
		this.$.toastpopup.hide();
		if (inEvent.originator.checked === true) {
			this.$.toastpopup.setContent(inSender.name +" checked.");
		} else {
			this.$.toastpopup.setContent(inSender.name +" unchecked.");
		}
		this.$.toastpopup.show();
	},
	buttonTapped: function(inSender, inEvent) {
		this.$.toastpopup.hide();
		if (inSender.name == "cancel") {
			this.$.toastpopup.setContent("cancel");
		} else if (inSender.name == "ok") {
			this.$.toastpopup.setContent("delete data..");
		}
		this.$.toastpopup.show();
	}
});
