enyo.kind({
	name: "g.sample.FormPanel",
	// kind: "g.Panel",
	events: {
		onResult: ""
	},
	handlers: {
		onCancel: "tapCancel",
		onOK: "tapOK",
		ontap: "tapOK"
	},
	title: true,
	titleContent: "Title: long text will fade out",
	style: "position: relative; background-color: #000000;overflow: hidden;",
	classes: "g-common-width-height-fit g-layout-absolute-wrapper",
	components: [
		{classes: "g-common-width-height-fit", style: "overflow: hidden;", components: [
			{kind: "g.Scroller", scrollIndicatorEnabled: true, style: "width: 320px; height: 320px; border-radius: 50%; background-color: #000000;", components: [
				{style: "width: 100%; height: 57px;"},
				//










				{kind: "g.FormLabel", content: "Form Picker Buttons : <br>> Time Picker - current", allowHtml: "true"},
				{name: "timePickerButton", kind: "g.FormPickerButton", content: "None", ontap: "showTimePickerPopup"},














				{kind: "g.FormLabel", content: "> Time Picker : initValue"},
				{name: "timePickerButtonWithcustomValue", kind: "g.FormPickerButton", content: "None", ontap: "showTimePickerPopupWithcustomValue"},
				//
				{kind: "g.FormLabel", content: "> Date Picker : current"},
				{name: "datePickerButton", kind: "g.FormPickerButton", content: "None", ontap: "showDatePickerPopup"},
				{kind: "g.FormLabel", content: "> Date Picker : initValue"},
				{name: "datePickerButtonWithcustomValue", kind: "g.FormPickerButton", content: "None", ontap: "showDatePickerPopupWithcustomValue"},
				//
				{kind: "g.FormLabel", content: "> PickerPanel : none"},
				{name: "pickerPanelButton", kind: "g.FormPickerButton", content: "None", ontap: "showPickerPanelPopup"},
				{kind: "g.FormLabel", content: "> PickerPanel : initValue"},
				{name: "pickerPanelButtonWithcustomValue", kind: "g.FormPickerButton", content: "None", ontap: "showPickerPanelPopupWithcustomValue"},
				//
				{kind: "g.FormLabel", content: "> MultiPickerPanel : none"},
				{name: "multiPickerPanelButton", kind: "g.FormPickerButton", content: "None", ontap: "showMultiPickerPanelPopup"},
				{kind: "g.FormLabel", content: "> MultiPickerPanel : initValue"},
				{name: "multiPickerPanelButtonWithcustomValue", kind: "g.FormPickerButton", content: "None", ontap: "showMultiPickerPanelPopupWithcustomValue"},
				//
				{kind: "g.FormLabel", content: "Form Buttons"},
				{kind: "g.FormButton", content: "+Add new"},
				{kind: "g.FormToolDecorator", components: [
					{kind: "g.FormButton", content: "Special", style: "width: 118px; margin-right: 4px; font-size: 20px;"},
					{kind: "g.FormButton", content: "+Add new", style: "width: 120px; font-size: 20px;"}
				]},
				//
				{kind: "g.FormLabel", content: "Form Inputs"},
				{kind: "g.FormInputDecorator",components: [
					{kind: "g.FormInput", disabled: true, value: "disabled"}
				]},
				{kind: "g.FormInputDecorator", components: [
					{kind: "g.FormInput", value: "Guide Text"}
				]},
				{kind: "g.FormToolDecorator", components: [
					{kind: "g.FormInputDecorator", style: "width: 185px; margin-right: 6px;", components: [
						{kind: "g.FormInput", value: "Guide Text"}
					]},
					{kind: "g.IconButton", src: "assets/btn_ic_deleted.svg", style: "width: 52px; height: 52px;"}
				]},
				{style: "width: 100%; height: 70px;"}
			]}
		]},







		{
			name: "timePickerPopup",
			kind: "g.Popup",
			style: "background-color: transparent;",
			effect: "depth-transition",
			components: [
				{
					name: "timePicker",
					kind: "g.TimePickerPanel"
				},
			]
		},












		
		{
			name: "timePickerPopupWithcustomValue",
			kind: "g.Popup",
			style: "background-color: transparent;",
			effect: "depth-transition",
			components: [
				{
					name: "timePickerWithcustomValue",
					kind: "g.TimePickerPanel",
					hourValue: 12,
					minuteValue: 30,
					meridiemValue: "PM"
				},
			]
		},
		{
			name: "datePickerPopup",
			kind: "g.Popup",
			style: "background-color: transparent;",
			effect: "depth-transition",
			components: [
				{
					name: "datePicker",
					kind: "g.DatePickerPanel"
				}
			]
		},
		{
			name: "datePickerPopupWithcustomValue",
			kind: "g.Popup",
			style: "background-color: transparent;",
			effect: "depth-transition",
			components: [
				{
					name: "datePickerWithcustomValue",
					kind: "g.DatePickerPanel",
					value: new Date("2014/1/1")
				}
			]
		},
		{
			name: "pickerPanelPopup",
			kind: "g.Popup",
			effect: "depth-transition",
			components: [
				{style: "background-color: #000000; position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
					{name: "pickerPanel", kind: "g.PickerPanel", title:true, titleContent: "PickerTitle", ontap: "hidePickerPanelPopup"}
				]}
			]
		},
		{
			name: "pickerPanelPopupWithcustomValue",
			kind: "g.Popup",
			effect: "depth-transition",
			components: [
				{style: "background-color: #000000; position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
					{name: "pickerPanelWithcustomValue", kind: "g.PickerPanel", title:true, titleContent: "PickerTitle",ontap: "hidePickerPanelPopupWithcustomValue"}
				]}
			]
		},
		{
			name: "multiPickerPanelPopup",
			kind: "g.Popup",
			effect: "depth-transition",
			components: [
				{style: "background-color: #000000; position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
					{name: "multiPickerPanel", kind: "g.MultiPickerPanel", title:true, titleContent: "MultiPickerTitle", style: "position: relative; display: inline-block; margin-right: 20px;", selection: true, multipleSelection: true}
				]}
			]
		},
		{
			name: "multiPickerPanelPopupWithcustomValue",
			kind: "g.Popup",
			effect: "depth-transition",
			components: [
				{style: "background-color: #000000; position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
					{name: "multiPickerPanelWithcustomValue", kind: "g.MultiPickerPanel", title:true, titleContent: "MultiPickerTitle", style: "position: relative; display: inline-block; margin-right: 20px;", selection: true, multipleSelection: true}
				]}
			]
		}
	],
	bindings: [
		{from: ".collection", to: ".$.pickerPanel.collection"},
		{from: ".collection", to: ".$.pickerPanelWithcustomValue.collection"},
		{from: ".collection", to: ".$.multiPickerPanel.collection"},
		{from: ".collection", to: ".$.multiPickerPanelWithcustomValue.collection"},
		//
		{from: ".$.timePicker.value", to: ".$.timePickerButton.content", transform: function(val) {
			var timestr;
			if (val.hour<10 && val.hour>0) {
				timestr = "0" + val.hour;
			} else if (val.hour===0) {
				timestr = "12";
			} else {
				timestr = val.hour;
			}
			timestr += ":";
			if (val.minute<10 && val.minute>=0) {
				timestr += "0";
			}
			timestr += val.minute;
			timestr += " ";
			timestr += val.meridiem;
			return timestr;
		}},
		{from: ".$.timePickerWithcustomValue.value", to: ".$.timePickerButtonWithcustomValue.content", transform: function(val) {
			var timestr;
			if (val.hour<10 && val.hour>0) {
				timestr = "0" + val.hour;
			} else if (val.hour===0) {
				timestr = "12";
			} else {
				timestr = val.hour;
			}
			timestr += ":";
			if (val.minute<10 && val.minute>=0) {
				timestr += "0";
			}
			timestr += val.minute;
			timestr += " ";
			timestr += val.meridiem;
			return timestr;
		}},
		{from: ".$.datePicker.value", to: ".$.datePickerButton.content", transform: function(val) {
			return (val.getYear() + 1900) + "/" + (val.getMonth() + 1) + "/" + val.getDate();
		}},
		{from: ".$.datePickerWithcustomValue.value", to: ".$.datePickerButtonWithcustomValue.content", transform: function(val) {
			return (val.getYear() + 1900) + "/" + (val.getMonth() + 1) + "/" + val.getDate();
		}},
		{from: ".$.pickerPanel.value", to: ".$.pickerPanelButton.content", transform: function(val) {
			var items = val,
				names = "None";
			if (items !== null && items != undefined) {
				names = items.attributes.item;
			}

			return names;
		}},
		{from: ".$.pickerPanelWithcustomValue.value", to: ".$.pickerPanelButtonWithcustomValue.content", transform: function(val) {
			var items = val,
				names = "None";
			if (items !== null && items != undefined) {
				names = items.attributes.item;
			}

			return names;
		}},
		{from: ".$.multiPickerPanel.value", to: ".$.multiPickerPanelButton.content", transform: function(val) {
			var items = val,
				names = "";
			if (items !== null && items != undefined && items.length > 0) {
				for (var i=0; i<items.length; i++) {
					names += ", " + items[i].attributes.item;
				}
				names = names.slice(2);
			} else {
				names = "None";
			}

			return names;
		}},
		{from: ".$.multiPickerPanelWithcustomValue.value", to: ".$.multiPickerPanelButtonWithcustomValue.content", transform: function(val) {
			var items = val,
				names = "";
			if (items !== null && items != undefined && items.length > 0) {
				for (var i=0; i<items.length; i++) {
					names += ", " + items[i].attributes.item;
				}
				names = names.slice(2);
			} else {
				names = "None"
			}

			return names;
		}}
	],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new enyo.Collection(this.data);
		};
	}),
	rendered: enyo.inherit(function(sup) {
		return function() {
			this.$.pickerPanelWithcustomValue.setIndex(0);
			this.$.multiPickerPanelWithcustomValue.select(0);
			this.$.multiPickerPanelWithcustomValue.select(1);
			this.$.multiPickerPanelWithcustomValue._onOK();
			sup.apply(this, arguments);
		};
	}),
	showTimePickerPopup: function() {
		this.$.timePickerPopup.show();
	},
	showTimePickerPopupWithcustomValue: function() {
		this.$.timePickerPopupWithcustomValue.show();
	},
	showDatePickerPopup: function() {
		this.$.datePickerPopup.show();
	},
	showDatePickerPopupWithcustomValue: function() {
		this.$.datePickerPopupWithcustomValue.show();
	},
	showPickerPanelPopup: function() {
		this.$.pickerPanelPopup.show();
	},
	showPickerPanelPopupWithcustomValue: function() {
		this.$.pickerPanelPopupWithcustomValue.show();
	},
	showMultiPickerPanelPopup: function() {
		this.$.multiPickerPanelPopup.show();
	},
	showMultiPickerPanelPopupWithcustomValue: function() {
		this.$.multiPickerPanelPopupWithcustomValue.show();
	},
	hidePickerPanelPopup: function() {
		this.$.pickerPanelPopup.hide();
	},
	hidePickerPanelPopupWithcustomValue: function() {
		this.$.pickerPanelPopupWithcustomValue.hide();
	},
	getSelectedFromMultiPickerPanle: function(selected) {
		var items = selected,
			names = "";
		if (items !== null && items != undefined && items.length > 0) {
			for (var i=0; i<items.length; i++) {
				names += ", " + items[i].attributes.item;
			}
			names = names.slice(2);
		} else {
			names = "None"
		}
		return names;
	},
	tapOK: function(inSender, inEvent) {
		if (inEvent.originator.name === "multiPickerPanel") {
			var items = this.getSelectedFromMultiPickerPanle(this.$.multiPickerPanel.value);
			this.doResult({msg: items});
			this.hideMultiPickerPanelPopup();
		} else if (inEvent.originator.name === "multiPickerPanelWithcustomValue") {
			var items = this.getSelectedFromMultiPickerPanle(this.$.multiPickerPanelWithcustomValue.value);
			this.doResult({msg: items});
			this.hideMultiPickerPanelPopupWithcustomValue();
		} else if (inEvent.originator.name === "datePicker") {
			this.doResult({msg: "Date is " + this.$.datePicker.getValue()});
			this.$.datePickerPopup.hide();
		} else if (inEvent.originator.name === "timePicker") {
			this.doResult({msg: "Time is " + this.$.timePicker.getHourValue() + " : " + this.$.timePicker.getMinuteValue() + " " + this.$.timePicker.getMeridiemValue()});
			this.$.timePickerPopup.hide();
		} else if (inEvent.originator.name === "datePickerWithcustomValue") {
			this.doResult({msg: "Date is " + this.$.datePickerWithcustomValue.getValue()});
			this.$.datePickerPopupWithcustomValue.hide();
		} else if (inEvent.originator.name === "timePickerWithcustomValue") {
			this.doResult({msg: "Time is " + this.$.timePickerWithcustomValue.getHourValue() + " : " + this.$.timePickerWithcustomValue.getMinuteValue() + " " + this.$.timePickerWithcustomValue.getMeridiemValue()});
			this.$.timePickerPopupWithcustomValue.hide();
		}
	},
	tapCancel: function(inSender, inEvent) {
		if (inEvent.originator.name === "multiPickerPanel") {
			this.hideMultiPickerPanelPopup();
		} else if (inEvent.originator.name === "multiPickerPanelWithcustomValue") {
			this.hideMultiPickerPanelPopupWithcustomValue();
		} else if (inEvent.originator.name === "datePicker") {
			this.doResult({msg: "Cancel!"});
			this.$.datePickerPopup.hide();
		} else if (inEvent.originator.name === "timePicker") {
			this.doResult({msg: "Cancel!"});
			this.$.timePickerPopup.hide();
		} else if (inEvent.originator.name === "datePickerWithcustomValue") {
			this.doResult({msg: "Cancel!"});
			this.$.datePickerPopupWithcustomValue.hide();
		} else if (inEvent.originator.name === "timePickerWithcustomValue") {
			this.doResult({msg: "Cancel!"});
			this.$.timePickerPopupWithcustomValue.hide();
		}
	},
	hideMultiPickerPanelPopup: function() {
		this.$.multiPickerPanelPopup.hide();
	},
	hideMultiPickerPanelPopupWithcustomValue: function() {
		this.$.multiPickerPanelPopupWithcustomValue.hide();
	},
	data: [
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"}
	]
});

enyo.kind({
	name: "g.sample.FormSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Form Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Form Picker Buttons / Form Buttons / Form Inputs", classes: "g-sample-subheader"},
		{kind: "g.sample.FormPanel", style: "position: relative;", onResult: "result"},

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
