enyo.kind({
	name: "g.sample.custom.Popup",
	kind: "g.Popup",
	components: [
		{
			name: "btn2",
			kind: "g.Button",
			style: "position: absolute;  width: 310px;top: 134px; left: 5px; right: 5px;",
			ontap: "hidePopup",
			content: "custom popup"
		}
	],
	hidePopup: function() {
		this.hide();
	}
});

enyo.kind({
	name: "g.sample.PopupPanel",
	kind: "g.Panel",
	events: {
		onResult: ""
	},
	okTapped: false,
	components: [
		{name: "popupBtn", kind: "g.Button", style: "position: absolute; top: 98px; left: 5px; right: 5px; width: 310px;", ontap: "showPopup", content: "Click here to show popup!"},
		{name: "customPopupBtn", kind: "g.Button", style: "position: absolute; top: 170px; left: 5px; right: 5px; width: 310px;", ontap: "showPopup", content: "Click here to show popup!"},

		{
			name: "popup",
			kind: "g.Popup",
			style: "overflow: hidden;",
			popupEffect: true,
			onPopUpAnimationEnd: "popUpEnd",
			onPopDownAnimationEnd: "popDownEnd",
			onHide: "hidePopup",
			components: [
				{classes: "g-common-width-height-fit", style: "overflow: hidden;", components: [
					{
						name: "scroller",
						kind: "g.Scroller",
						scrollIndicatorEnabled: true,
						classes: "enyo-fit garnet g-layout-text-center",
						components: [
							{ style: "padding: 25px 0 0; height: 82px;", components: [
								{kind: "enyo.Image", src: "assets/ic_warning.svg", style: "margin-right: 3px;"},
								{content: "Warning", style: "font-size: 22px; font-weight: 800;"},
							]},
							{style: "width: 200px; margin: auto;", content: "Garnet is a UI library built for wearable devices and is based on Enyo 2.4.0. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions."},
							{name: "button", kind: "g.Button", content: "OK!!!", ontap: "tapOK", style: "margin: 20px 0 70px;"}
						]
					}
				]}
			]
		},
		{
			name: "customPopup",
			kind: "g.sample.custom.Popup",
			effect: "depth-transition",
			style: "overflow: hidden;"
		}
	],
	showPopup: function(inSender, inEvent) {
		if (inSender.name === "popupBtn") {
			this.$.popup.show();
		} else if (inSender.name === "customPopupBtn") {
			this.$.customPopup.show();
		}
	},
	hidePopup: function(inSender, inEvent) {
		if (this.okTapped) {
			this.doResult({msg: "Popup is hidden by OK button"});
			this.okTapped = false;
		} else {
			this.doResult({msg: "Popup is hidden by flick"});
		}
	},
	tapOK: function(inSender, inEvent) {
		this.okTapped = true;
		this.$.popup.hide();
	},
	popUpEnd: function(inSender, inEvent) {
		// Function to be handled after PopUp Animation End
	},
	popDownEnd: function(inSender, inEvent) {
		// Function to be handled after PopDown Animation End
	}
});

enyo.kind({
	name: "g.sample.PopupSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Popup Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Popup with contents", classes: "g-sample-subheader"},
		{kind: "g.sample.PopupPanel", style: "position: relative;", onResult: "result"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No button pressed yet.", classes: "g-sample-description"}
		]}
	],
	result: function(inSender, inEvent) {
		this.$.result.setContent(inEvent.msg);
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
