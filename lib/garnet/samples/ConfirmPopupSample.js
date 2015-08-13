enyo.kind({
	name: "g.sample.ConfirmPopupPanel",
	kind: "g.Panel",
	events: {
		onResult: ""
	},
	okTapped: false,
	components: [
		{name: "button1", kind: "g.Button", style: "margin: 20px 5px 5px; width: 310px;", ontap: "showPopup", content: "Only text"},
		{name: "button2", kind: "g.Button", style: "margin: 5px; width: 310px;", ontap: "showPopup", content: "Scroll + Text"},
		{name: "button3", kind: "g.Button", style: "margin: 5px; width: 310px;", ontap: "showPopup", content: "Icon + Title + Text"},
		{name: "button4", kind: "g.Button", style: "margin: 5px; width: 310px;", ontap: "showPopup", content: "Scroll+Icon+Title + Text"},

		{
			name: "confirmPopupNoScrollNoIcon",
			kind: "g.ConfirmPopup",
			onHide: "hidePopup",
			onCancel: "hidePopup",
			onOK: "tapOK",
			components: [
				{
					kind: "g.PopupScroller",
					components: [
						{content: "All the labels follow guideline."}
					]
				}
			]
		},
		{
			name: "confirmPopupWithScrollNoIcon",
			kind: "g.ConfirmPopup",
			onHide: "hidePopup",
			buttonComponents: [
				{name: "ok", kind: "g.IconButton", ontap: "tapOK", classes: "g-ok-image"}
			],
			components: [
				{
					kind: "g.PopupScroller",
					components: [
						{content: "Garnet is a UI library built for wearable devices and is based on Enyo 2.4.0. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions.et Quad-Core Processor, 1080p resolution screen, 13-megapixel rear"}
					]
				}
			]
		},
		{
			name: "confirmPopupWithIconNoScroll",
			kind: "g.ConfirmPopup",
			onHide: "hidePopup",
			buttonComponents: [
				{name: "ok2", kind: "g.IconButton", ontap: "tapOK", classes: "g-ok-image"}
			],
			components: [
				{
					kind: "g.PopupScroller",
					icon: true,
					iconSrc: "assets/ic_warning.svg",
					title: true,
					titleContent: "test",
					components: [
						{content: "All the labels follow guideline."}
					]
				}
			]
		},
		{
			name: "confirmPopupWithIconAndScroll",
			kind: "g.ConfirmPopup",
			onHide: "hidePopup",
			onCancel: "hidePopup",
			onOK: "tapOK",
			components: [
				{
					kind: "g.PopupScroller",
					icon: true,
					iconSrc: "assets/ic_warning.svg",
					title: true,
					titleContent: "test",
					components: [
						{content: "Garnet is a UI library built for wearable devices and is based on Enyo 2.4.0. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions.et Quad-Core Processor, 1080p resolution screen, 13-megapixel rear"}
					]
				}
			]
		}
	],
	showPopup: function(inSender, inEvent) {
		var name = inSender.name;

		if (name === "button1") {
			this.$.confirmPopupNoScrollNoIcon.show();
		} else if (name === "button2") {
			this.$.confirmPopupWithScrollNoIcon.show();
		} else if (name === "button3") {
			this.$.confirmPopupWithIconNoScroll.show();
		} else if (name === "button4") {
			this.$.confirmPopupWithIconAndScroll.show();
		}
	},
	hidePopup: function(inSender, inEvent) {
		var name = inSender.name;

		if (name === "confirmPopupWithIconAndScroll") {
			this.$.confirmPopupWithIconAndScroll.hide();
		} else if (name === "confirmPopupWithIconNoScroll") {
			this.$.confirmPopupWithIconNoScroll.hide();
		} else if (name === "confirmPopupWithScrollNoIcon") {
			this.$.confirmPopupWithScrollNoIcon.hide();
		} else if (name === "confirmPopupNoScrollNoIcon") {
			this.$.confirmPopupNoScrollNoIcon.hide();
		}

		this.doResult({msg: this.okTapped ? name + " is hidden by OK button" : name + " is hidden"});
		this.okTapped = false;
	},
	tapOK: function(inSender, inEvent) {
		this.okTapped = true;

		var name = inSender.name;
		if (name === "confirmPopupNoScrollNoIcon") {
			this.$.confirmPopupNoScrollNoIcon.hide();
		} else if (name === "ok") {
			this.$.confirmPopupWithScrollNoIcon.hide();
		} else if (name === "ok2") {
			this.$.confirmPopupWithIconNoScroll.hide();
		} else if (name === "confirmPopupWithIconAndScroll") {
			this.$.confirmPopupWithIconAndScroll.hide();
		}
	}
});

enyo.kind({
	name: "g.sample.ConfirmPopupSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Confirm Popup Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Confirm with only Text/Scroll + Text /Icon+Title+Text/ Scorll + Icon + Title+ Text ", classes: "g-sample-subheader"},
		{kind: "g.sample.ConfirmPopupPanel", style: "position: relative;", onResult: "result"},

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
