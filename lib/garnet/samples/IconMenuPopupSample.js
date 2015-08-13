enyo.kind({
	name: "g.sample.IconMenuPopupPanel",
	kind: "g.Panel",
	events: {
		onResult: ""
	},
	components: [
		{name: "oneButton", kind: "g.Button", style: "margin: 55px 5px 5px; width: 310px;", ontap: "showPopup", content: "Click here to show popup!"},
		{name: "twoButton", kind: "g.Button", style: "margin: 5px; width: 310px;", ontap: "showPopup2", content: "Click here to show popup!"},
		{name: "threeButton", kind: "g.Button", style: "margin: 5px; width: 310px;", ontap: "showPopup3", content: "Click here to show popup!"},

		{
			name: "oneButtonPopup",
			kind: "g.IconMenuPopup",
			buttonComponents: [
				{
					name: "button1",
					style: "width: 82px; height: 82px;",
					ontap: "hidePopup",
					disabled: true,
					src: "assets/btn_delete.svg"
				}
			]
		},
		{
			name: "twoButtonPopup",
			kind: "g.IconMenuPopup",
			buttonComponents: [
				{
					name: "1st 2 buttons",
					style: "width: 82px; height: 82px;",
					ontap: "hidePopup",
					src: "assets/btn_delete.svg"
				},
				{
					name: "2nd 2 buttons",
					style: "width: 82px; height: 82px;",
					ontap: "hidePopup",
					src: "assets/btn_share.svg"
				}
			]
		},
		{
			name: "threeButtonPopup",
			kind: "g.IconMenuPopup",
			buttonComponents: [
				{
					name: "1st 3 buttons",
					style: "width: 82px; height: 82px;",
					ontap: "hidePopup",
					src: "assets/btn_delete.svg"
				},
				{
					name: "2nd 3 buttons",
					style: "width: 82px; height: 82px;",
					ontap: "hidePopup",
					src: "assets/btn_share.svg"
				},
				{
					name: "3rd 3 buttons",
					style: "width: 82px; height: 82px;",
					ontap: "hidePopup",
					src: "assets/btn_search.svg"
				}
			]
		}
	],
	showPopup: function(inSender, inEvent) {
		this.$.oneButtonPopup.show();
	},
	showPopup2: function(inSender, inEvent) {
		this.$.twoButtonPopup.show();
	},
	showPopup3: function(inSender, inEvent) {
		this.$.threeButtonPopup.show();
	},
	hidePopup: function(inSender, inEvent) {
		var name = inEvent.originator.name;

		if ( inEvent.originator.active === true &&
			(name === "button1" ||
			name === "1st 2 buttons" ||  name === "2nd 2 buttons" ||
			name === "1st 3 buttons" ||  name === "2nd 3 buttons" ||  name === "3rd 3 buttons")) {
			this.doResult({msg: name + " is selected."});
			this.$.oneButtonPopup.hide();
			this.$.twoButtonPopup.hide();
			this.$.threeButtonPopup.hide();
		}
	}
});

enyo.kind({
	name: "g.sample.IconMenuPopupSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< IconMenu Popup Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "IconMenu with 1 button / 2 buttons / 3 buttons", classes: "g-sample-subheader"},
		{kind: "g.sample.IconMenuPopupPanel", style: "position: relative;", onResult: "result"},

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
