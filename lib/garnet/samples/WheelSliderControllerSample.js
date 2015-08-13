enyo.kind({
	name: "g.sample.WheelSliderControllerPopup",
	kind: "g.Panel",
	events: {
		onResult: ""
	},
	classes: "enyo-unselectable garnet",
	style: "position: relative;",
	components: [
		{style: "position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{
				name: "panel",
				kind: "g.WheelSliderController",
				style: "position: relative; border-radius: 50%; background-color: #000000;",
				onStopSliderAnimation: "stopDigitAnimation",
				minimumValue: -100,
				maximumValue: 100,
				stepValue: 10,
				value: 50,
				onChange: "changeEventHandler",
				onChanging: "changingEventHandler"
			},
			{classes: "g-layout-absolute-wrapper", style: "pointer-events: none", components: [
				{kind: "g.IconButton", src: "assets/ic_dialog_alert.svg", classes: "g-layout-absolute-center"}
			]}
		]}
	],
	changingEventHandler: function(inSender, inEvent) {
		this.doResult({msg: "changing inEvent.value : " + inEvent.value});
	},
	changeEventHandler: function(inSender, inEvent) {
		this.doResult({msg: "change inEvent.value : " + inEvent.value});
	}
});

enyo.kind({
	name: "g.sample.WheelSliderController",
	kind: "g.Panel",
	events: {
		onResult: ""
	},
	isSplittedTextCreated: false,
	destroySplitedDivTimerID: undefined,
	classes: "enyo-unselectable garnet",
	style: "position: relative;",
	components: [
		{style: "position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
			{
				name: "panel",
				kind: "g.WheelSliderController",
				style: "position: relative; border-radius: 50%; background-color: #000000;",
				onStopSliderAnimation: "stopDigitAnimation",
				minimumValue: -100,
				maximumValue: 100,
				stepValue: 10,
				value: 50,
				onChange: "changeEventHandler",
				onChanging: "changingEventHandler"
			},
			{style: "width: 320px; height: 320px; pointer-events: none;", onStartPanelAnimation: "hideContent", onEndPanelAnimation: "animateValue", onAnimationEnd: "animateValue", components: [
				{name: "sampleValue", content: "", style: "display: block; width: 100%; margin-top: 60px; height: 99px; text-align: center; font-weight: 400; font-size: 100px;"},
				{content: "Brightness", style: "display: block; width: 100%; text-align: center; color: #FFFFFF; font-weight: 800; font-size: 22px;"},
				{style:"margin-top: 15px;", components: [
					{name: "cancel", kind: "g.IconButton", ontap: "tapCancel", classes: "g-sample-wheel-slider-cancel-image"},
					{name: "ok", kind: "g.IconButton", ontap: "tapOK", classes: "g-sample-wheel-slider-ok-image"}
				]}
			]}
		]},
		{
			name: "popup",
			kind: "g.Popup",
			ignoreWheelControl: false,
			handlers: {
				onPopUpAnimationEnd: "popupAnimationFinished",
				onChange: "showPopup",
				onChanging: "showPopup"
			},
			components: [
				{kind: "g.sample.WheelSliderControllerPopup"}
			],
			popupAnimationFinished: function() {
				if (this.showing) {
					this.startJob("hidePopup", this.hidePopup, 3000);
				} else {
					this.stopJob("hidePopup");
				}
			},
			showPopup: function(inSender, inEvent) {
				this.stopJob("hidePopup");
				this.startJob("hidePopup", this.hidePopup, 3000);
			},
			hidePopup: function() {
				this.hide();
				this.stopJob("hidePopup");
			}
		}
	],
	bindings: [
		{from: ".$.panel.value", to: ".$.sampleValue.content"}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.animateValue();
		};
	}),
	stopDigitAnimation : function(inSender, inEvent) {
		if(inEvent.originator.owner.name === this.$.panel.name) {
			this.destroyValueSubDiv();
		}
	},
	hideContent: function() {
		this.destroyValueSubDiv();
		this.$.sampleValue.setContent(" ");
	},
	destroyValueSubDiv:function() {
		if(this.isSplittedTextCreated) {
			clearTimeout(this.destroySplitedDivTimerID);
			this.destroySplitedDivTimerID =undefined;
			this.$.sampleValue.destroyClientControls();
			this.$.sampleValue.setContent("");
			this.$.sampleValue.setContent(this.$.panel.value.toString());
			this.isSplittedTextCreated = false;
		}
	},
	animateValue:function() {
		var time = this.createSplitedDiv();
		this.destroySplitedDiv(time);
	},
	createSplitedDiv: function() {
			var i, splitNum, length, maxAnimationTime;

			splitNum = this.splitDigit(this.$.panel.value);
			length = splitNum.length;
			for (i = 0; i < length; i++) {
				this.$.sampleValue.createComponent(
					{name: "sampleValueChild" + i, content: splitNum[i], style: "display: inline-block"}
				);
				this.$.sampleValue.children[i].addClass("g-sample-wheel-slider-text-animation");
				this.$.sampleValue.children[i].applyStyle("-webkit-animation-duration", 0.4 + (0.2 * i) + "s");
				this.$.sampleValue.children[i].applyStyle("animation-duration", 0.4 + (0.2 * i) + "s");
			}
			if(length > 0) {
				this.isSplittedTextCreated = true;
			}
			this.$.sampleValue.setContent("");
			maxAnimationTime = 0.4 + (0.2 * i);

			return maxAnimationTime;
	},
	destroySplitedDiv: function(time) {
		if(!this.isSplittedTextCreated) {
			return;
		}
		this.destroySplitedDivTimerID = setTimeout(enyo.bind(this,this.destroyValueSubDiv), time * 1000);
	},
	splitDigit: function(num) {
		var digits = num.toString().split('');
		return digits;
	},
	tapCancel: function(inSender, inEvent) {
		this.doResult({msg: "Cancel button tapped !!"});
		this.$.popup.show();
	},
	tapOK: function(inSender, inEvent) {
		this.doResult({msg: "OK button tapped !!"});
		this.$.popup.show();
	},
	changingEventHandler: function(inSender, inEvent) {
		this.doResult({msg: "changing inEvent.value : " + inEvent.value});
	},
	changeEventHandler: function(inSender, inEvent) {
		this.doResult({msg: "change inEvent.value : " + inEvent.value});
	}
});

enyo.kind({
	name: "g.sample.WheelSliderControllerSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Wheel Slider Controller Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Wheel Slider Panel", classes: "g-sample-subheader"},
		{kind: "g.sample.WheelSliderController", onResult: "result"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "Not tapped yet.", classes: "g-sample-description"}
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
