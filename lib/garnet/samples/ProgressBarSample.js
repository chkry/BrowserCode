enyo.kind({
	name: "g.sample.ProgressBarPanel",
	kind: "g.Panel",
	handlers: {
		onCancel: "hidePopup",
		onPopUpAnimationEnd: "popupAnimationFinished"
	},
	style: "border-radius: 50%; background-color: #000000;",
	components: [
		{style: "width: 100%; height: 10px;"},
		{name: "popupButton", kind: "g.FormButton", ontap: "showPopup", content: "Popup", style: "width: 140px; margin: auto; display: block;"},
		{
			name: "confirmPopupWithOnlyCancelButton",
			kind: "g.ConfirmPopup",
			buttonComponents: [
				{name: "cancel", kind: "g.IconButton", ontap: "hidePopup", classes: "g-cancel-image"}
			],
			components: [
				{classes: "g-common-width-height-fit", style: "overflow: hidden; top: 28%;", components: [
					{name: "percentage", style:"font-size: 28px; width: 240px; margin: 97px 20px 15px 20px; text-align: center; display: inline-block; color: #FAFAFA;", content: "Loading..."},
					{kind: "g.ProgressBar", name: "popupProgress", style:"left: 12%; width: 240px;", progress: 0, max: 100, onChange: "updateProgressP"},
					{name: "percentageP", style:"font-size: 26px; width: 240px; margin: 15px 30px 0; line-height: 26px; text-align: center; display: inline-block; color: #1CD2D2;"},
				]}
			]
		},
		{kind: "g.FormLabel", content: "Progress Bar: set value "},
		{name: "progressBar1", kind: "g.ProgressBar", progress: 25, max: 100, style: "margin: 10px 18px 12px;"},
		{name: "progressBar2", kind: "g.ProgressBar", progress: 25, bgProgress: 75, max: 100, style: "margin: 10px 18px 12px;"},
		{kind: "g.FormToolDecorator", style: "text-align: center;", components: [
			{name: "input" ,kind: "g.FormInput", value: 25, style: "width: 150px; margin-right: 10px;"},
			{kind: "g.FormButton", content:"Set", ontap: "changeValue", style: "width: 80px;"},
		]},
		{kind: "g.FormToolDecorator", style: "text-align: center;", components: [
			{kind: "g.FormButton", content:"-", ontap: "decValue", style: "width: 70px; margin: 0 4px 0 45px;"},
			{kind: "g.FormButton", content:"+", ontap: "incValue", style: "width: 70px; margin-right: 45px;"}
		]}
	],
	changeValue: function(inSender, inEvent) {
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0, 10), 100));
		this.$.progressBar1.animateProgressTo(this.$.input.getValue());
		this.$.progressBar2.animateProgressTo(this.$.input.getValue());
	},
	incValue: function() {
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0, 10) + 10, 100));
		this.changeValue();
	},
	decValue: function() {
		this.$.input.setValue(Math.max(parseInt(this.$.input.getValue() || 0, 10) - 10, 0));
		this.changeValue();
	},
	updateProgressP: function(inSender, inEvent) {
		var value = Math.round(this.$.popupProgress.getProgress());
		this.$.percentageP.setContent(value + " %");
		return false;
	},
	popupAnimationFinished: function(inSender, inEvent) {
		if(inEvent.originator.name === "confirmPopupWithOnlyCancelButton") {
			this.$.popupProgress.animateProgressTo(100);
		}
	},
	showPopup: function(inSender, inEvent) {
		if (inSender.name === "popupButton") {
			this.$.confirmPopupWithOnlyCancelButton.show();
		}
	},
	hidePopup: function(inSender, inEvent) {
		if (inEvent.originator.name === "cancel") {
			this.$.confirmPopupWithOnlyCancelButton.hide();
			this.$.popupProgress.setProgress(0);
		}
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});

enyo.kind({
	name: "g.sample.ProgressBarSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Progress Bar Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "ProgressBars", classes: "g-sample-subheader"},
		{kind: "g.sample.ProgressBarPanel", style: "position: relative;"}
	],
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
