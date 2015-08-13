enyo.kind({
	name: "g.sample.TimePicker12Panel",
	kind: "g.TimePickerPanel",
	handlers: {
		onOK: "tapOK",
		onCancel: "tapCancel"
	},
	events: {
		onResult: ""
	},
	hourValue: 12,
	minuteValue: 30,
	meridiemValue: "PM",
	tapOK: function(inSender, inEvent) {
		this.doResult({msg: "Time is " + this.getHourValue() + " : " + this.getMinuteValue()});
	},
	tapCancel: function() {
		this.doResult({msg: "Cancel!"});
	}
});

enyo.kind({
	name: "g.sample.TimePicker24Panel",
	kind: "g.TimePickerPanel",
	handlers: {
		onOK: "onOK",
		onCancel: "onCancel"
	},
	events: {
		onResult: ""
	},
	hourValue: 17,
	minuteValue: 45,
	meridiemValue: "24",
	onOK: function(inSender, inEvent) {
		this.doResult({msg: "Time is " + this.getHourValue() + " : " + this.getMinuteValue() + " " + this.getMeridiemValue()});
	},
	onCancel: function() {
		this.doResult({msg: "Cancel!"});
	}
});

enyo.kind({
	name: "g.sample.TimePickerPanelSample",
	handlers: {
		onResult: "result"
	},
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Time Picker Panel Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Time Picker Panel", classes: "g-sample-subheader"},
		{style: "position: relative; height: 100%", components: [
			{
				name: "timePicker12Panel",
				kind: "g.sample.TimePicker12Panel",
				style: "background-color: #000000; position: relative; display: inline-block; margin-left: 10px; overflow: hidden;"
			},
			{
				name: "timePicker24Panel",
				kind: "g.sample.TimePicker24Panel",
				style: "background-color: #000000; position: relative; display: inline-block; margin-left: 10px; overflow: hidden;"
			}
		]},

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
