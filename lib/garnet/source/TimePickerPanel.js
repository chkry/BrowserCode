
(function (enyo, g, scope) {
	/**
	* _g.TimePickerText_ is specialized for animation for time picker text.
	* It has the animation class for hour, minute and meridiem. which will get added at the time
	* When component is loaded first and also works with {@link g.PanelSet}.
	* @class animationClass
	* @private
	*/

	enyo.kind(
		/** @lends g.TimePickerText.prototype */ {

		/**
		* @private
		*/
		name:"g.TimePickerText",

		/**
		* @private
		*/
		published:
			/** @lends g.TimePickerText.prototype */ {

			/**
			* animationClass is name of the class to be applied on animating text.
			* @default ""
			* @private
			*/
			animationClass: ""
		},

		/**
		* @private
		*/
		handlers: {
			onwebkitAnimationEnd : "removeAnimationClasses",
			onanimationend:"removeAnimationClasses",
			onStartPanelAnimation: "hideText",
			onEndPanelAnimation: "animateText",
			onAnimationEnd: "animateText"
		},

		/**
		* @method
		* @private
		*/
		rendered: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.animateText();
			};
		}),

		/**
		* `animateText` add animation classes to animate timer
		*
		* @private
		*/
		animateText: function() {
			!this.getShowing() && this.show();
			!this.hasClass(this.animationClass) && this.addClass(this.animationClass);
		},

		/**
		* removeAnimationClasses remove animation classes from timer
		*
		* @private
		*/
		removeAnimationClasses:function(inSender, inEvent) {

			if(inEvent.originator.hasClass(this.animationClass)) {
				this.removeClass(this.animationClass);
			}
		},

		/**
		* `hideText` hides the text initially at the time of loading.
		*
		* @private
		*/
		hideText: function() {
			this.hide();
		}
	});

	/**
	* Fired when the Cancel button is tapped.
	*
	* @event g.TimePickerPanel#onCancel
	* @type {Object}
	* @property {Object} sender - The component that most recently
	*	propagated the event.
	* @property {g.TimePickerPanel~onCancelEvent} event - An object containing
	* @public
	*/

	/**
	* Fired when the OK button is tapped.
	*
	* @event g.TimePickerPanel#onOK
	* @type {Object}
	* @property {Object} sender - A reference to the {@link enyo.DataList}.
	* @property {g.TimePickerPanel~onOKEvent} event - An object containing the event information.
	* @public
	*/

	/**
	* _g.TimePickerPanel_ is a specialized {@link g.Panel} with a time picker.
	* _g.TimePickerPanel_ is composed of the parts; hour, minute and meridiem.
	* The hour and minute parts each have its own picker controller.
	* The time displayed when the panel is loaded is modifiable.
	* If this time is not explicitly defined, the current time is displayed automatically.
	*
	* @class g.TimePickerPanel
	* @extends g.Panel
	* @public
	*/
	enyo.kind(
		/** @lends g.TimePickerPanel.prototype */ {

		/**
		* @private
		*/
		name: "g.TimePickerPanel",

		/**
		* @private
		*/
		kind: "g.Panel",

		/**
		* @private
		*/
		published:
			/** @lends g.TimePickerPanel.prototype */ {

			/**
			* The hour value displayed when this TimePicker is loaded.
			* If unspecified, the current time is displayed.
			*
			* Range: [1-12]
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			hourValue: 0,

			/**
			* The minute value displayed when this TimePicker is loaded.
			* If unspecified, the current time is displayed.
			*
			* Range: [0-59]
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			minuteValue: 0,

			/**
			* The meridiem displayed when this TimePicker is loaded.
			* If unspecified, the current time's meridiem is displayed.
			*
			* Range: ["AM", "PM", "24"]
			*
			* @type {object}
			* @default g.$L({key: "g_am", value: "AM"})
			* @public
			*/
			meridiemValue: g.$L({key: "g_am", value: "AM"}),

			/**
			* The picker to activate when this TimePicker is loaded. Either the hour picker is
			* enabled or the minute picker is enabled.
			*
			* Range: [`true`, `false`]
			* - `true`: The hour picker is enabled and the minute picker is disabled.
			* - `false`: The minute picker is enabled and the hour picker is disabled.
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			isHourMode: true,

			/**
			* Indicates whether or not to disable this TimePicker.
			*
			* Range: [`true`, `false`]
			* - `true`: This TimePicker is disabled.
			* - `false`: This TimePicker is enabled.
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			disabled: false
		},

		/**
		* @private
		*/
		events: {
			onCancel: "",
			onOK: ""
		},

		/**
		* Contains the time information for modification including the hour, minute and meridiem value
		* selected by a user.
		*
		* @type {Object}
		* @default null
		* @public
		*/
		value: null,

		/**
		* @private
		*/
		handlers: {
			ontap: "eventHandler",
			onChange: "changeEventHandler",
			onChanging: "changingEventHandler"
		},

		/**
		* @private
		*/
		ignoreWheelControl: false,

		/**
		* @private
		*/
		_hourView: undefined,

		/**
		* @private
		*/
		_minuteView: undefined,

		/**
		* @private
		*/
		_hourDotView: undefined,

		/**
		* @private
		*/
		_minuteDotView: undefined,

		/**
		* @private
		*/
		_hourLabel: ["12", "3", "6", "9"],

		/**
		* @private
		*/
		_24hourLabel: ["00", "03", "06", "09", "12", "15", "18", "21"],

		/**
		* @private
		*/
		_minuteLabel: ["00", "15", "30", "45"],

		/**
		* @private
		*/
		_hCount: 12,

		/**
		* @private
		*/
		classes: "g-time-picker-panel",

		/**
		* @private
		*/
		components: [
			{name: "hourText", kind: "g.TimePickerText", classes: "g-hour-text", animationClass: "g-hour-text-animation", content: "12"},
			{name: "colonText", kind: "g.TimePickerText", classes: "g-colon-text", animationClass: "g-colon-text-animation", content: ":"},
			{name: "minuteText", kind: "g.TimePickerText", classes: "g-minute-text", animationClass: "g-minute-text-animation", content: "59"},
			{name: "cancel", kind: "g.IconButton", classes: "g-cancel-image"},
			{name: "ok", kind: "g.IconButton", classes: "g-ok-image"}
		],

		/**
		* @private
		*/
		bindings: [
			{from: ".hourValue", to: ".$.hourText.content", transform: function(val) {
					if (val < 10 && val > 0) {
						return "0" + val;
					} else if (val === 0) {
						if(this.meridiemValue != "24") {
							return "12";
						} else {
							return "00";
						}
					}
					return val;
				}
			},
			{from: ".minuteValue", to: ".$.minuteText.content", transform: function(val) {
					if (val < 10 && val >= 0) {
						return "0" + val;
					} else {
						return val;
					}
				}
			}
		],

		/**
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function(sup) {
			return function() {
				//set current time as a default value
				if (this.hourValue <= 0) {
					var today = new Date();
					this.setHourValue(today.getHours());
					if (this.meridiemValue !="24" && this.hourValue > 12) {
						this.setMeridiemValue("PM");
						this.setHourValue(this.hourValue - 12);
					}
					this.setMinuteValue(today.getMinutes());
				}

				sup.apply(this, arguments);

				this._hCount = 12;
				if (this.meridiemValue === "24") {
					this._hCount = 24;
				}
				//controllers
				this._createHourPicker();
				this.createComponent({
					name: "minutePicker",
					kind: "g.WheelTimePickerController",
					knobColor: g.constant.colorPoint,
					width: 32,
					maximumValue: 59,
					value: this.minuteValue,
					selectOffset: 0.1
				});

				this._createViews();

				this.hourValueChanged();
				this.minuteValueChanged();
				this._setOriginValue();
			};
		}),

		/**
		* Accessibility : initialize
		*
		* @private
		*/
		initAccessibility: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.$.hourText.setAttribute("aria-live", "assertive");
				this.$.hourText.setAttribute("aria-label", g.$L({key: "g_hours", value: "hours"}) + " " + this.$.hourText.getContent());
				this.$.minuteText.setAttribute("aria-live", "assertive");
				this.$.minuteText.setAttribute("aria-label", g.$L({key: "g_minutes", value: "minutes"}) + " " + this.$.minuteText.getContent());
				this.$.cancel.setAttribute("aria-label", g.$L({key: "g_cancel", value: "cancel"}));
				this.$.ok.setAttribute("aria-label", g.$L({key: "g_ok", value: "ok"}));
			};
		}),

		/**
		* @method
		* @private
		*/
		rendered: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.isHourModeChanged();
			};
		}),

		/**
		* @private
		*/
		hourValueChanged: function() {
			// set hour, check range
			if (this.hourValue < 0) {
				this.setHourValue(0);
			} else if (this.meridiemValue != "24" && this.hourValue > 11) {
				this.setHourValue(12);
			} else if (this.meridiemValue == "24" && this.hourValue > 23) {
				this.setHourValue(0);
			}
			this.$.hourPicker.setValue(this.hourValue);

			// Accessibility - set aria-label for changed value
			this.$.hourText.setAttribute("aria-label", g.$L({key: "g_hours", value: "hours"}) + " " + this.$.hourText.getContent());
		},

		/**
		* @private
		*/
		minuteValueChanged: function() {
			// set min, check range
			if (this.minuteValue < 0) {
				this.setMinuteValue(0);
			} else if (this.minuteValue > 59) {
				this.setMinuteValue(59);
			}
			this.$.minutePicker.setValue(this.minuteValue);

			// Accessibility - set aria-label for changed value
			this.$.minuteText.setAttribute("aria-label", g.$L({key: "g_minutes", value: "minutes"}) + " " + this.$.minuteText.getContent());
		},

		/**
		* @private
		*/
		disabledChanged: function() {
			this.isHourModeChanged();
		},

		/**
		* @private
		*/
		meridiemValueChanged: function(inOld) {
			if (inOld == "24") {
				this.convertClockMode("12");
			}
			else {
				if(this.meridiemValue == "PM") {
					this.meridiemValue = g.$L({key: "g_pm", value: "PM"});
				}else if(this.meridiemValue == "AM") {
					this.meridiemValue = g.$L({key: "g_am", value: "AM"});
				}

				if (this.$.meridiemText != undefined) {
					this.$.meridiemText.setContent(this.meridiemValue);
				}
			}
		},

		/**
		* @private
		*/
		getMeridiemValue: function() {
			if (this.meridiemValue == "24") {
				return this.meridiemValue;
			}
			else {
				if(this.meridiemValue == "PM" || this.meridiemValue == "AM") {
					return this.meridiemValue;
				}
				else {
					if(this.meridiemValue == g.$L({key: "g_pm", value: "PM"})) {
						return "PM";
					}
					else {
						return "AM";
					}
				}
			}

		},

		/**
		* Convert clock mode.
		*
		* @param {String} inClockMode - Clock mode to convert. Range: ["12", "24"]
		* @method
		* @public
		*/
		convertClockMode: function(inClockMode) {
			//If clock mode needs to be converted..
			if (this._hCount != inClockMode) {
				if (inClockMode == "24") {
					this._hCount = 24;
					var hh = this.hourValue;
					if (this.meridiemValue == g.$L({key: "g_pm", value: "PM"}) && this.hourValue < 12) {
						hh += 12;
					} else if (this.meridiemValue == g.$L({key: "g_am", value: "AM"}) && this.hourValue == 12) {
						hh = 0;
					}
					this.setMeridiemValue("24");
					this.setHourValue(hh);
				} else if (inClockMode == "12") {
					this._hCount = 12;
					if (this.hourValue > 12) {
						this.setMeridiemValue(g.$L({key: "g_pm", value: "PM"}));
						this.setHourValue(this.hourValue - 12);
					} else if(this.hourValue == 12) {
						this.setMeridiemValue(g.$L({key: "g_pm", value: "PM"}));
						this.setHourValue(this.hourValue);
					} else {
						this.setMeridiemValue(g.$L({key: "g_am", value: "AM"}));
						this.setHourValue(this.hourValue);
					}
				}
				this._createHourPicker();
				this._createViews();
				this._setOriginValue();
				this.render();
			}
		},

		/**
		* @method
		* @private
		*/
		_createHourPicker: function() {
			if (this.$.hourPicker) {
				this.$.hourPicker.destroy();
			}
			this.createComponent({
				name: "hourPicker",
				kind: "g.WheelTimePickerController",
				knobColor: g.constant.colorPoint,
				width: 32,
				maximumValue: this._hCount-1,
				value: this.hourValue
			});
			if (this.meridiemValue == "24") {
				this.$.hourPicker.setSelectOffset(0.15);
			} else {
				this.$.hourPicker.setSelectOffset(0.25);
			}
		},

		/**
		* @private
		*/
		_createViews: function() {
			//remove components
			if (this._hourView != undefined) {
				this._hourDotView.destroy();
				this._hourDotView = undefined;
				this._minuteDotView.destroy();
				this._minuteDotView = undefined;
				this._hourView.destroy();
				this._hourView = undefined;
				this._minuteView.destroy();
				this._minuteView = undefined;
			}

			//views
			this._hourView = this.createComponent({});
			this._minuteView = this.createComponent({});
			this._hourDotView = this._hourView.createComponent({});
			this._minuteDotView = this._minuteView.createComponent({});

			var dHourLabel = this._hourLabel;
			if (this.meridiemValue === "24") {
				dHourLabel = this._24hourLabel;
				this.$.hourText.addClass("g-clock-24");
				this.$.colonText.addClass("g-clock-24");
				this.$.minuteText.addClass("g-clock-24");
				if (this.$.meridiemText != undefined) {
					this.$.meridiemText.hide();
				}
			} else {
				this.$.hourText.removeClass("g-clock-24");
				this.$.colonText.removeClass("g-clock-24");
				this.$.minuteText.removeClass("g-clock-24");
				if (this.$.meridiemText != undefined) {
					this.$.meridiemText.show();
				} else {
					if(this.meridiemValue == "PM") {
						this.meridiemValue = g.$L({key: "g_pm", value: "PM"});
					}else {
						this.meridiemValue = g.$L({key: "g_am", value: "AM"});
					}
					this.createComponent({name: "meridiemText", classes: "g-meridiem-text", content: this.meridiemValue});
					new enyo.Binding({source: this, target: this.$.meridiemText, from: ".meridiemValue", to: ".content", oneWay: false});
				}
			}

			var theta = (Math.PI/(this._hCount/2));
			var startTheta = -(Math.PI/2);
			var x0 = g.width/2 -20;
			var y0 = g.height/2 -20;
			//hour view
			for (var i = 0; i < this._hCount; i++) {
				var xx = x0 + (x0)*Math.cos(startTheta + theta*i);
				var yy = y0 + (y0)*Math.sin(startTheta + theta*i);
				if (i%3 === 0) {
					this._hourView.createComponent({
						content: dHourLabel[(i/3)],
						classes: "g-hour-label",
						style: "left: " + xx + "px; top: " + yy + "px;"
					});
				} else {
					this._hourDotView.createComponent({
						classes: "g-dot-label",
						style:"left: " + xx + "px; top: " + yy + "px;"
					});
				}
			}
			//minute view
			theta = (Math.PI/6);
			for (var i = 0; i < 12; i++) {
				var xx = x0 + (x0)*Math.cos(startTheta + theta*i);
				var yy = y0 + (y0)*Math.sin(startTheta + theta*i);
				if (i%3 === 0) {
					this._minuteView.createComponent({
						content: this._minuteLabel[(i/3)],
						classes: "g-minute-label",
						style: "left: " + xx + "px; top: " + yy + "px;"
					});
				} else {
					this._minuteDotView.createComponent({
						classes: "g-dot-label",
						style:"left: " + xx + "px; top: " + yy + "px;"
					});
				}
			}
		},

		/**
		* @private
		*/
		_setOriginValue: function() {
			var val = {
				hour: this.hourValue,
				minute: this.minuteValue,
				meridiem: this.meridiemValue
			};
			this.set("value", val);
		},

		/**
		* @private
		*/
		_resetToOriginValue: function() {
			this.setHourValue(this.value.hour);
			this.$.hourPicker.setValue(this.value.hour);
			this.setMinuteValue(this.value.minute);
			this.$.minutePicker.setValue(this.value.minute);
			this.setMeridiemValue(this.value.meridiem);
		},

		/**
		* @private
		*/
		isHourModeChanged: function() {
			if (this.isHourMode) {
				this._hourView.show();
				this._minuteView.hide();
				this.$.hourPicker.show();
				this.$.minutePicker.hide();
				this.$.hourPicker.triggerHandler("onWheelResetPosition");
				if (!this.disabled) {
					this.$.minutePicker.setDisabled(true);
					this.$.hourPicker.setDisabled(false);
				} else {
					this.$.minutePicker.setDisabled(true);
					this.$.hourPicker.setDisabled(true);
				}
			} else {
				this._hourView.hide();
				this._minuteView.show();
				this.$.hourPicker.hide();
				this.$.minutePicker.show();
				this.$.minutePicker.triggerHandler("onWheelResetPosition");
				if (!this.disabled) {
					this.$.hourPicker.setDisabled(true);
					this.$.minutePicker.setDisabled(false);
				} else {
					this.$.minutePicker.setDisabled(true);
					this.$.hourPicker.setDisabled(true);
				}
			}

			this.$.hourText.addRemoveClass("active", this.isHourMode);
			this.$.minuteText.addRemoveClass("active", !this.isHourMode);
		},

		/**
		* @private
		*/
		_changeHourMode: function(isHour) {
			if (this.isHourMode != isHour) {
				this.set("isHourMode", isHour);
			}
			//play sound
			g.playFeedback("touch");
		},

		/**
		* @private
		*/
		_changeMeridiemMode: function() {
			if (!this.disabled && this.meridiemValue == g.$L({key: "g_am", value: "AM"})) {
				this.setMeridiemValue(g.$L({key: "g_pm", value: "PM"}));
			} else if (!this.disabled && this.meridiemValue == g.$L({key: "g_pm", value: "PM"})) {
				this.setMeridiemValue(g.$L({key: "g_am", value: "AM"}));
			}
			//play sound
			g.playFeedback("touch");
		},

		/**
		* @method
		* @private
		*/
		eventHandler: enyo.inherit(function(sup) {
			return function(inSender, inEvent) {
				if (inEvent.type == "tap") {
					if (inEvent.originator == this.$.hourText) {
						this._changeHourMode(true);
					} else if (inEvent.originator == this.$.minuteText) {
						this._changeHourMode(false);
					} else if (inEvent.originator == this.$.meridiemText) {
						this._changeMeridiemMode();
					} else if (inEvent.originator == this.$.cancel) {
						this._onCancel(inSender, inEvent);
					} else if (inEvent.originator == this.$.ok) {
						this._onOK(inSender, inEvent);
					}
				}

				return sup.apply(this, arguments);
			};
		}),

		/**
		* @private
		*/
		changeEventHandler: function() {

			if (this.isHourMode) {
				this.$.hourPicker.$.knob.$.knob.removeClass("g-big-dot");
				this.setHourValue(this.$.hourPicker.getValue());
			} else {
				this.$.minutePicker.$.knob.$.knob.removeClass("g-big-dot");
				this.setMinuteValue(this.$.minutePicker.getValue());
			}
			return false;
		},

		/**
		* @private
		*/
		changingEventHandler: function() {
			if (this.isHourMode) {
				this.$.hourPicker.$.knob.$.knob.addClass("g-big-dot");
				this.setHourValue(this.$.hourPicker.getValue());
			} else {
				this.$.minutePicker.$.knob.$.knob.addClass("g-big-dot");
				this.setMinuteValue(this.$.minutePicker.getValue());
			}
			return false;
		},

		/**
		* @fires g.TimePickerPanel#onOK
		* @private
		*/
		_onOK: function(inSender, inEvent) {
			//set value
			this._setOriginValue();
			this.doOK({originalEvent: enyo.clone(inEvent, true)});
		},

		/**
		* @fires g.TimePickerPanel#onCancel
		* @private
		*/
		_onCancel: function(inSender, inEvent) {
			//reset value
			this._resetToOriginValue();
			this.doCancel({originalEvent: enyo.clone(inEvent, true)});
		}
	});

})(enyo, g, this);
