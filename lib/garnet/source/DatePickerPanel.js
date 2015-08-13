(function (enyo, g, scope) {
	/**
	* g.DateLabel
	*
	* @class g.DateLabel
	* @extends enyo.Control
	* @private
	*/
	enyo.kind(
		/** @lends g.DateLabel.prototype */ {

		/**
		* @private
		*/
		name: "g.DateLabel",

		/**
		* @private
		*/
		kind: "enyo.Control",

		/**
		* @private
		*/
		published:
			/** @lends g.DateLabel.prototype */ {

			/**
			* Value of DateLabel
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			value: 0,

			/**
			* Minimum value of DateLabel
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			min: 0,

			/**
			* Maximum value of DateLabel
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			max: 0,

			/**
			* animationClass of DateLabel
			*
			* @type {String}
			* @default ""
			* @public
			*/
			animationClass: ""
		},

		/**
		* @private
		*/
		events: {
			onwebkitAnimationEnd: "",
			onanimationend: ""
		},

		/**
		* @private
		*/
		handlers: {
			onAnimationEnd: "animateDate",
			onStartPanelAnimation: "hideDate",
			onEndPanelAnimation: "animateDate",
			onwebkitAnimationEnd: "datePickerAnimationEnd",
			onanimationend: "datePickerAnimationEnd"
		},

		/**
		* @private
		*/
		bindings: [
			{from: ".value", to: ".content", transform: function (v) { return ("00" + v).slice(-this.digits); }}
		],

		/**
		* @private
		*/
		digits: 2,

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.valueChanged();
			};
		}),

		/**
		* @private
		*/
		rendered: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.animateDate();
			};
		}),

		/**
		* @private
		*/
		valueChanged: function() {
			if (this.value >= this.max) {
				this.setValue(this.max);
			} else if (this.value < this.min) {
				this.setValue(this.min);
			}
		},

		/**
		* @private
		*/
		minChanged: function() {
			this.valueChanged();
		},

		/**
		* @private
		*/
		maxChanged: function() {
			this.valueChanged();
		},

		/**
		* @private
		*/
		animateDate: function(inSender, inEvent) {
			this.hasClass("hide-date") && this.removeClass("hide-date");
			!this.hasClass(this.animationClass) && this.addClass(this.animationClass);
		},

		/**
		* @private
		*/
		hideDate: function(inSender, inEvent) {
			!this.hasClass("hide-date") && this.addClass("hide-date");
		},

		/**
		* @private
		*/
		datePickerAnimationEnd: function(inSender, inEvent) {
			if(inEvent.originator.hasClass(this.animationClass) && inEvent.originator.name === this.name) {
				this.removeClass(this.animationClass);
				return true;
			}
		}
	});

	/**
	* Fired when the value changes.
	* `inEvent.name` contains the name of this control.
	* `inEvent.value` contains a standard JavaScript Date object representing the current value.
	*
	* @event g.DatePickerBase#onChange
	* @type {Object}
	* @property {Object} sender - The component that most recently
	*	propagated the event.
	* @property {Object} event - An object containing event information.
	* @public
	*/

	/**
	* _g.DatePickerBase_ is a base kind implementing functionality shared
	* by [g.DatePicker](#g.DatePicker).
	* However, _g.DataPickerBase_ is not intended to be used directly.
	*
	* @class g.DatePickerBase
	* @extends g.DatePickerBase
	* @private
	*/
	enyo.kind(
		/** @lends g.DatePickerBase.prototype */ {

		/**
		* @private
		*/
		name: "g.DatePickerBase",

		/**
		* @private
		*/
		defaultKind: "enyo.Control",

		/**
		* @private
		*/
		published:
			/** @lends g.DatePickerBase.prototype */ {

			/**
			* Text to be displayed in the _currentValue_ control if no item is
			* currently selected
			*
			* @type {String}
			* @default ""
			* @public
			*/
			noneText: "",

			/**
			* The value, expressed as a standard JavaScript `Date` object. When a Date object
			* is passed to the `set("value")`, the control is updated to reflect the new
			* value. `get("value")` returns a Date object.
			*
			* @type {Object}
			* @default undefined
			* @public
			*/
			value: undefined,

			/**
			* When true, the picker uses a 12-hour clock (this value is ignored when ilib
			* is loaded, since the meridiem will be set by the current locale)
			*
			* Range: [`true`, `false]
			*
			* - `true`: The picker uses a 12-hour clock
			* - `false`: The picker uses a 24-hour clock
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			meridiemEnable: false
		},

		/**
		* @private
		*/
		events: {
			onChange: ""
		},

		/**
		* @private
		*/
		handlers: {
			//Handler for _onChange_ events coming from constituent controls
			onChange: "handleChangeEvent",
			ondown: "downEvent"
		},

		/**
		* @private
		*/
		classes: "g-date-picker",

		/**
		* @private
		*/
		components: [
			{name: "currentValue", classes: "g-date-picker-current-value", content: ""}
		],

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.initDefaults();
			};
		}),

		/**
		* @private
		*/
		initDefaults: function() {
			var ordering = "MMMM d, yyyy";
			this.value = this.value || new Date();
			this.setupPickers(ordering);
			this.noneTextChanged();
		},

		/**
		* @private
		*/
		setupPickers: function(ordering) {
			// implement in subkind, calling this.inherited() at the end
			this.pickers = this.getClientControls();
		},

		/**
		* @private
		*/
		formatValue: function() {
			// implement in subkind
		},

		/**
		* @private
		*/
		handleChangeEvent: function(inSender, inEvent) {
			if (inEvent && inEvent.originator === this) {
				// Don't handle our own change events
				return;
			} else {
				this.updateValue(inSender, inEvent);
				return true;
			}
		},

		/**
		* @private
		*/
		updateValue: function(inSender, inEvent) {
			// implement in subkind
		},

		/**
		* @fires g.DatePickerBase#onChange
		* @private
		*/
		valueChanged: function(inOld) {
			this.setChildPickers(inOld);
			if (this.value) {
				this.doChange({name:this.name, value:this.value});
			} else {
				this.noneTextChanged();
			}
		},

		/**
		* @private
		*/
		setChildPickers: function(inOld) {
			// implement in subkind
		},

		/**
		* @private
		*/
		// If no item is selected, uses _this.noneText_ as current value.
		noneTextChanged: function() {
			if (!this.value) {
				this.$.currentValue.setContent(this.getNoneText());
			} else {
				this.$.currentValue.setContent(this.formatValue());
			}
		},

		/**
		* @private
		*/
		downEvent: function(inSender, inEvent) {
			this.down(inSender, inEvent);
			return true;
		}
	});

	/**
	* _g.DatePicker_ is a control that can display--or allow the selection of--a
	* day expressed in month, day, year.
	*
	* {kind: "g.DatePicker", content: "Day", onChange: "changed"}
	*
	* Set the _value_ property to a standard JavaScript `Date` object
	* to initialize the picker, or to change it programmatically at runtime.
	*
	* @class g.DatePicker
	* @extends g.DatePickerBase
	* @private
	*/
	enyo.kind(
		/** @lends g.DatePicker.prototype */ {

		/**
		* @private
		*/
		name: "g.DatePicker",

		/**
		* @private
		*/
		kind: "g.DatePickerBase",

		/**
		* @private
		*/
		published:
			/** @lends g.DatePicker.prototype */ {

			/**
			* Optional minimum year value. Must be specified using the Gregorian
			* calendar, regardless of the calendar type used by the specified locale.
			*
			* @type {Number}
			* @default 1900
			* @public
			*/
			minYear: 1900,

			/*
			* Optional maximum year value. Must be specified using the Gregorian
			* calendar, regardless of the calendar type used by the specified locale.
			*
			* @type {Number}
			* @default 2099
			* @public
			*/
			maxYear: 2099
		},

		/**
		* @private
		*/
		iLibFormatType: "date",

		/**
		* @private
		*/
		defaultOrdering: "Mdy",

		/**
		* @private
		*/
		curPicker: null,

		/**
		* @private
		*/
		isChanging: false,

		/**
		* @private
		*/
		yearOffset: 0,

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);

				// accessibility - add ok, cancel label for icon button
				this.createComponents([
					{name: "cancel", kind: "g.IconButton", accessibilityLabel: g.$L({key: "g_cancel", value: "cancel"}), classes: "g-cancel-image"},
					{name: "ok", kind: "g.IconButton", accessibilityLabel: g.$L({key: "g_ok", value: "ok"}), classes: "g-ok-image"}
				]);
			};
		}),

		/**
		* Accessibility : initialize
		*
		* @method
		* @private
		*/
		initAccessibility: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.$.year.setAttribute("aria-live", "assertive");
				this.$.year.setAttribute("aria-label", g.$L({key: "g_year", value: "year"}) + " " + this.$.year.getContent());
				this.$.month.setAttribute("aria-live", "assertive");
				this.$.month.setAttribute("aria-label", g.$L({key: "g_month", value: "month"}) + " " + this.$.month.getContent());
				this.$.day.setAttribute("aria-live", "assertive");
				this.$.day.setAttribute("aria-label", g.$L({key: "g_day", value: "day"}) + " " + this.$.day.getContent());
			};
		}),

		/**
		* @method
		* @private
		*/
		initILib: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				var time = this.value.getTime();
				var gregYear = new ilib.Date.newInstance({type: "gregorian", unixtime: time, timezone:"UTC"}).getYears();
				var localeYear = new ilib.Date.newInstance({type: this._tf.getCalendar(), unixtime: time, timezone:"UTC"}).getYears();
				this.yearOffset = gregYear - localeYear;
			};
		}),

		/**
		* @method
		* @private
		*/
		setupPickers: enyo.inherit(function(sup) {
			return function(ordering) {
				var orderingArr = ordering.split("");
				var doneArr = [];
				var o, f, l, digits;
				for (f = 0, l = orderingArr.length; f < l; f++) {
					o = orderingArr[f];
					if (doneArr.indexOf(o) < 0) {
						doneArr.push(o);
					}
				}

				for (f = 0, l = doneArr.length; f < l; f++) {
					o = doneArr[f];

					switch (o) {
					case 'd':
						digits = (ordering.indexOf("dd") > -1) ? 2 : null;
						this.createComponents([
							{classes: "g-date-picker-wrap day", components:[
								{
									name: "day",
									kind: "g.DateLabel",
									wrap: true,
									min: 1,
									max: this.monthLength(this.value.getFullYear(), this.value.getMonth()),
									value: this.value.getDate(),
									itemHeight: 78,
									classes: "g-date-picker-field",
									animationClass: "day-animation"
								}
							]},
							{
								name: "dayPickerKnob",
								kind: "g.DatePickerKnob",
								onChange: "changeCurPickerValue"
							}
						]);
						break;
					case 'M':
						digits = (ordering.indexOf("MM") > -1) ? 2 : null;
						this.createComponents([
							{classes: "g-date-picker-wrap month", components:[
								{
									name: "month",
									kind: "g.DateLabel",
									wrap: true,
									min: 1,
									max: 12,
									value: this.value.getMonth()+1,
									itemHeight: 78,
									classes: "g-date-picker-field",
									animationClass: "month-animation"
								}
							]},
							{
								name: "monthPickerKnob",
								kind: "g.DatePickerKnob",
								onChange: "changeCurPickerValue"
							}
						]);
						break;
					case 'y':
						this.createComponents([
							{classes: "g-date-picker-wrap year", components:[
								{
									kind: "g.DateLabel",
									name: "year",
									value: this.value.getFullYear() - this.yearOffset,
									min: this.minYear - this.yearOffset,
									max: this.maxYear - this.yearOffset,
									digits: 4,
									itemHeight: 78,
									classes: "g-date-picker-field",
									animationClass: "year-animation"
								}
							]},
							{
								name: "yearPickerKnob",
								kind: "g.DatePickerKnob",
								onChange: "changeCurPickerValue"
							}
						]);
						break;
					default:
						break;
					}
				}
				this.$.currentValue.setShowing(false);
				sup.apply(this, arguments);
			};
		}),

		/**
		* @private
		*/
		updateValue: function(inSender, inEvent) {
			var day = this.$.day.getValue(),
				month = this.$.month.getValue()-1,
				year = this.$.year.getValue() + this.yearOffset;

			var maxDays = this.monthLength(year, month);
			this.setValue(new Date(year, month, (day <= maxDays) ? day : maxDays));

			// Accessibility - set aria-label for changed value
			this.$.year.setAttribute("aria-label", g.$L({key: "g_year", value: "year"}) + " " + this.$.year.getContent());
			this.$.month.setAttribute("aria-label", g.$L({key: "g_month", value: "month"}) + " " + this.$.month.getContent());
			this.$.day.setAttribute("aria-label", g.$L({key: "g_day", value: "day"}) + " " + this.$.day.getContent());
		},

		/**
		* @private
		*/
		setChildPickers: function(inOld) {
			var updateDays = inOld &&
				(inOld.getFullYear() != this.value.getFullYear() ||
				inOld.getMonth() != this.value.getMonth());
			this.$.year.setValue(this.value.getFullYear() - this.yearOffset);
			this.$.month.setValue(this.value.getMonth()+1);

			if (updateDays) {
				this.$.day.setMax(this.monthLength(this.value.getFullYear(), this.value.getMonth()));
			}
			this.$.day.setValue(this.value.getDate());

			// Accessibility - set aria-label for changed value
			this.$.year.setAttribute("aria-label", g.$L({key: "g_year", value: "year"}) + " " + this.$.year.getContent());
			this.$.month.setAttribute("aria-label", g.$L({key: "g_month", value: "month"}) + " " + this.$.month.getContent());
			this.$.day.setAttribute("aria-label", g.$L({key: "g_day", value: "day"}) + " " + this.$.day.getContent());
		},

		/**
		* @private
		*/
		down: function(inSender, inEvent) {
			var orig = inEvent.originator;
			var name = orig.name;
			if (name === "day" || name === "month" || name === "year") {
				this.changeCurPicker(orig);
				//play sound
				g.playFeedback("touch");
			}
		},

		/**
		* @private
		*/
		changeCurPicker: function(picker){
			this.$.day.removeClass("selected");
			this.$.month.removeClass("selected");
			this.$.year.removeClass("selected");
			picker.addClass("selected");
			this.$.curPicker = picker;
			this.$.dayPickerKnob.hide();
			this.$.monthPickerKnob.hide();
			this.$.yearPickerKnob.hide();
			switch (picker.name) {
			case "day":
				this.$.dayPickerKnob.show();
				this.$.dayPickerKnob.triggerHandler("onWheelResetPosition");
				break;
			case "month":
				this.$.monthPickerKnob.show();
				this.$.monthPickerKnob.triggerHandler("onWheelResetPosition");
				break;
			case "year":
				this.$.yearPickerKnob.show();
				this.$.yearPickerKnob.triggerHandler("onWheelResetPosition");
				break;
			}
		},

		/**
		* @private
		*/
		changeCurPickerValue: function(inSender, inEvent) {
			if (this.$.curPicker !== undefined && !this.isChanging && inEvent.deltaIndex != 0) {
				this.isChanging = true;
				var newVal = this.$.curPicker.getValue() + inEvent.deltaIndex;
				var diff = this.$.curPicker.max - this.$.curPicker.min + 1;
				if (newVal > this.$.curPicker.max) {
					newVal -= diff;
				} else if (newVal < this.$.curPicker.min) {
					newVal += diff;
				}
				this.$.curPicker.setValue(newVal);
				this.updateValue();
				this.isChanging = false;
			}
		},

		/**
		* Returns number of days in a particular month/year.
		*
		* @private
		*/
		monthLength: function(inYear, inMonth) {
			return 32 - new Date(inYear, inMonth, 32).getDate();
		},

		/**
		* @private
		*/
		minYearChanged: function(inOld) {
			if(this.$.year) {
				this.$.year.setMin(this.minYear - this.yearOffset);
			}
		},

		/**
		* @private
		*/
		maxYearChanged: function(inOld) {
			if(this.$.year) {
				this.$.year.setMax(this.maxYear - this.yearOffset);
			}
		}
	});


	/**
	* Fired when the Cancel button is tapped.
	*
	* @event g.DatePickerPanel#onCancel
	* @type {Object}
	* @property {Object} sender - The component that most recently
	*	propagated the event.
	* @property {g.DatePickerPanel~onCancelEvent} event - An object containing
	*	the event information.
	* @public
	*/

	/**
	* Fired when the OK button is tapped.
	*
	* @event g.DatePickerPanel#onOK
	* @type {Object}
	* @property {Object} sender - A reference to the [enyo.DataList]{@link http://enyojs.com/docs/latest/#/kind/enyo.DataList}.
	* @property {g.DatePickerPanel~onOKEvent} event - An object containing
	*	the event information.
	* @public
	*/

	/**
	* _g.DatePickerPanel_ is a panel specialized for selecting a date.
	* It basically is a {@link g.Panel} containing a date picker.
	*
	* @class g.DatePickerPanel
	* @extends g.Panel
	* @public
	*/
	enyo.kind(
		/** @lends g.DatePickerPanel.prototype */ {

		/**
		* @private
		*/
		name: "g.DatePickerPanel",

		/**
		* @private
		*/
		kind: "g.Panel",

		/**
		* @private
		*/
		published:
			/** @lends g.DatePickerPanel.prototype */{

			/**
			* A standard JavaScript `Date` object.
			* When a `Date` object is passed to the `set("value", date object)` method,
			* this control is updated to reflect the new value.
			* The `get("value")` method returns a `Date` object.
			*
			* Format examples of standard JavaScript `Date` object:
			* - new Date("2001/2/3")
			* - new Date(2001,1,3)
			*
			* @type {Object}
			* @default null
			* @public
			*/
			value: null,

			/**
			* The current picking mode of this DatePicker, i.e. the picking target.
			*
			* Range: [`"year"`, `"month"`, `"day"`]
			*
			* @type {String}
			* @default "year"
			* @public
			*/
			mode: "year",

			/**
			* Optional minimum year value. Must be specified using the Gregorian
			* calendar, regardless of the calendar type used by the specified locale.
			*
			* @type {Number}
			* @default 1900
			* @public
			*/
			minYear: 1900,

			/*
			* Optional maximum year value. Must be specified using the Gregorian
			* calendar, regardless of the calendar type used by the specified locale.
			*
			* @type {Number}
			* @default 2099
			* @public
			*/
			maxYear: 2099,

			/**
			* Indicates whether to disable this DatePicker. If `true` this DatePicker is disabled.
			*
			* Range: [`true`, `false`]
			*
			* - `true`: This DatePicker is disabled
			* - `false`: This DatePicker is enabled
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

			/**
			* {@link g.DatePickerPanel#event:onCancel}
			*/
			onCancel: "",

			/**
			* {@link g.DatePickerPanel#event:onOK}
			*/
			onOK: ""
		},

		/**
		* @private
		*/
		handlers: {
			ondown: "eventHandler",
			onhold: "eventHandler",
			ondragstart: "eventHandler",
			ondrag: "eventHandler",
			ontap: "eventHandler"
		},

		/**
		* @private
		*/
		originValue: null,


		/**
		* @private
		*/
		classes: "g-date-picker-panel",

		/**
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function(sup) {
			return function() {
				this.innerComponents = this.components || this.kindComponents;
				this.components = this.kindComponents = null;

				sup.apply(this, arguments);
				// create a picker component
				this.createComponents([{
					classes: "g-datepickerknob-bg"
				},
				{
					name: "picker",
					kind: "g.DatePicker",
					locale: this.locale,
					value: this.value,
					minYear: this.minYear,
					maxYear: this.maxYear,
					classes: "g-layout-absolute-center"
				}]);

				new enyo.Binding({source: this, target: this.$.picker,
					from: ".locale", to: ".locale", oneWay: false});
				if (this.value === null) {
					this.value = new Date();
				}
				new enyo.Binding({source: this, target: this.$.picker,
					from: ".value", to: ".value", oneWay: false});
				this._setOriginValue();

				//set the current picker here
				this.modeChanged();
			};
		}),

		/**
		* @method
		* @private
		*/
		modeChanged: function(inOld) {
			if(inOld == this.mode) {
				return;
			}
			switch(this.mode) {
				case "year" :
				this.$.picker.changeCurPicker(this.$.picker.$.year);
				break;
				case "month" :
				this.$.picker.changeCurPicker(this.$.picker.$.month);
				break;
				case "day" :
				this.$.picker.changeCurPicker(this.$.picker.$.day);
				break;
			}
		},

		/**
		* @method
		* @private
		*/
		eventHandler: enyo.inherit(function(sup) {
			return function(inSender, inEvent) {

				if (inEvent.type === "tap" && inEvent.originator.name === "cancel") {
					this._onCancel(inSender, inEvent);
				} else if (inEvent.type === "tap" && inEvent.originator.name === "ok") {
					this._onOK(inSender, inEvent);
				}

				return sup.apply(this, arguments);
			};
		}),

		/**
		* @private
		*/
		_setOriginValue: function() {
			this.originValue = this.value;
		},

		/**
		* @private
		*/
		_resetToOriginValue: function() {
			this.setValue(this.originValue);
		},

		/**
		* @private
		*/
		minYearChanged: function(inOld) {
			if(this.$.picker) {
				this.$.picker.setMinYear(this.minYear);
			}
		},

		/**
		* @private
		*/
		maxYearChanged: function(inOld) {
			if(this.$.picker) {
				this.$.picker.setMaxYear(this.maxYear);
			}
		},

		/**
		* @fires g.DatePickerPanel#onOK
		* @private
		*/
		_onOK: function(inSender, inEvent) {
			//set value
			this._setOriginValue();
			this.doOK({originalEvent: enyo.clone(inEvent, true)});
		},

		/**
		* @fires g.DatePickerPanel#onCancel
		* @private
		*/
		_onCancel: function(inSender, inEvent) {
			//reset value
			this._resetToOriginValue();
			this.doCancel({originalEvent: enyo.clone(inEvent, true)});
		}
	});

})(enyo, g, this);
