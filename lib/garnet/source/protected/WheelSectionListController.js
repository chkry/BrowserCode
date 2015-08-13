(function (enyo, g, scope) {
	/**
	* Fired when the list index (e.g. "A" in the list with alphabet index) is changed.
	*
	* @event g.WheelSectionListController#onChange
	* @type {Object}
	* @property {Object} sender - A reference to the {@link g.WheelSectionListController}.
	* @property {g.WheelSectionListController~onChangeEvent} event - An object containing the event information.
	* @public
	*/

	/**
	* _g.WheelSectionListController_ implements the wheel-like-control for a indexed list.
	*
	* @class g.WheelSectionListController
	* @extends g.WheelGesture
	* @private
	*/
	enyo.kind(
		/** @lends g.WheelSectionListController.prototype */ {

		/**
		* @private
		*/
		name: "g.WheelSectionListController",

		/**
		* @private
		*/
		kind: "g.WheelGesture",

		/**
		* @private
		*/
		events: {
			onChange: "",
			onWheelControlBegin: "",
			onWheelControlEnd: ""
		},

		/**
		* _sectionList_ is an array of indexes visibile on the screen.
		* A visible index should be of one character.
		* _sectionList_ has to be an ordered set, has maximum length of 16 and
		* must be a subset of [sectionLabelList]{@link g.WheelSectionListController#sectionLabelList}.
		*
		* @type {Array}
		* @default ["#", "A", "C", "E", "F", "G", "I", "K", "M", "O", "Q", "S", "U", "W", "Z", "?"]
		* @public
		*/
		sectionList: ["#", "A", "C", "E", "F", "G", "I", "K", "M", "O", "Q", "S", "U", "W", "Z", "?"],

		/**
		* _sectionLabelList_ is an array of actual indexes of this section list that are yet invisible
		* on the screen.
		* _sectionLabelList_ has to be an ordered set and the superset of
		* [sectionList]{@link g.WheelSectionListController#sectionList}.
		*
		* @type {Array}
		* @default ["#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
		"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "?"]
		* @public
		*/
		sectionLabelList: ["#", "A", "C", "E", "F", "G", "I", "K", "M", "O", "Q", "S", "U", "W", "Z", "?"],

		/**
		* @private
		*/
		knobLengthRadian: 0.5,

		/**
		* @private
		*/
		knobColor: g.constant.colorPoint,

		/**
		* @private
		*/
		knobAlwaysEnabled: false,

		/**
		* @private
		*/
		_activated: true,

		/**
		* @private
		*/
		_unitRadian: 0,

		/**
		* @private
		*/
		_positionCorrection: 0.0175, // almost 1 degree in radians

		/**
		* @private
		*/
		_startTheta: 0,

		/**
		* @private
		*/
		_deltaTheta: 0,

		/**
		* @private
		*/
		_radian: 0,

		/**
		* @private
		*/
		_radianJumpOffset: (Math.PI*2)/26,

		/**
		* @private
		*/
		_currentSectionIndex: 0,

		/**
		* @private
		*/
		_currentSectionLabel: undefined,

		/**
		* @private
		*/
		_sectionRadianTable: [],

		/**
		* @private
		*/
		_sectionMaskTable: [],

		/**
		* @private
		*/
		classes: "g-wheel-section-list-controller g-common-hw-accelerated",

		/**
		* @private
		*/
		indexPopupTools: [
			{name: "indexPopup", classes: "g-index-popup", components: [
				{name: "indexPopupBack", classes: "g-index-popup-bg"},
				{name: "indexPopupC", classes: "g-index-popup-content"}
			]}
		],

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this._createKnob();
				this.pagesPerRoundChanged();
				this.sectionListChanged();
				this.sectionLabelListChanged();
				this._createIndexPopup();
				this.knobColorChanged();
				this._drawKnob(0);
			};
		}),


		/**
		* Accessibility : initialize
		*
		* @method
		* @private
		*/
		initAccessibility: enyo.inherit(function (sup) {
			return function () {
				sup.apply(this, arguments);
				this.$.indexPopupC.setAttribute('aria-live', 'assertive');
			};
		}),

		/**
		* @private
		*/
		pagesPerRoundChanged: function() {
			this._unitRadian = this._constMaxRadians / this.pagesPerRound;
		},


		/**
		* @private
		*/
		sectionListChanged: function() {
			if (this.sectionList === undefined) {
				this.sectionList = ["#", "A", "C", "E", "F", "G", "I", "K", "M", "O", "Q", "S", "U", "W", "Z", "?"];
			}
			//create parent node
			this.createComponent({name: "sections", classes: "sections", components: [
				{name: "wheelBg", classes: "g-wheel-section-bg"}
			]});
			//create sections, at (width/2 - padding + cos(T), height/2 - padding + sin(T))
			var theta = (Math.PI/4);
			this._startTheta = theta - (Math.PI/2);
			this._deltaTheta = (6*theta)/this.sectionList.length;
			var x0 = g.width/2 - 12;
			var y0 = g.height/2 - 12;
			for (var i = 0; i < this.sectionList.length; i++) {
				var xx = x0 + (x0)*Math.cos((this._startTheta+0.15) + this._deltaTheta*i);
				var yy = y0 + (y0)*Math.sin((this._startTheta+0.15) + this._deltaTheta*i);
				this.$.sections.createComponent({
					name: "section_" + this.sectionList[i],
					content: this.sectionList[i],
					classes: "g-section-label",
					style:"left: " + xx + "px; top: " + yy + "px;"
				});
			}
		},

		/**
		* @private
		*/
		sectionLabelListChanged: function() {
			if (this.sectionLabelList === undefined) {
				this.sectionLabelList = ["#", "A", "C", "E", "F", "G", "I",
				"K", "M", "O", "Q", "S", "U", "W", "Z", "?"];
			}
			//clear
			this._sectionRadianTable = [];
			this._sectionMaskTable = [];
			var sIndex = 0;
			var rIndex = 0;
			var btwCount = 0;
			var offset = 0.05;
			for (var i = 0; i < this.sectionLabelList.length; i++) {
				if (this.sectionLabelList[i] == this.sectionList[sIndex]) {
					//see the count and fill RadianTable
					//sIndex * this._deltaTheta + j*(this._deltaTheta/btwCount+1)
					var adding = (this._deltaTheta/(btwCount+1));
					var value = -this._deltaTheta;
					if (sIndex) {
						value = (sIndex-1)*this._deltaTheta;
					}
					for (var j = 1; j < btwCount+2; j++) {
						value += adding;
						this._sectionRadianTable[rIndex++] = value + offset;
					}
					btwCount = 0;
					sIndex++;
					this._sectionMaskTable[i] = 1;
				} else {
					btwCount++;
					this._sectionMaskTable[i] = 0;
				}
			}
		},

		/**
		* @private
		*/
		knobColorChanged: function() {
			this.$.knob.setColor(this.knobColor);
		},

		/**
		* @private
		*/
		setBasePage: function(inBasePage) {
			this.basePage = inBasePage || 0;
		},

		/**
		* @private
		*/
		setPagePosition: function(inPagePosition) {
			this._radianAccumulated = inPagePosition + this._positionCorrection;
		},

		/**
		* @private
		*/
		activate: function() {
			if (!this._activated) {
				this._activated = true;
				this.show();
			}
		},

		/**
		* @private
		*/
		deactivate: function() {
			if (this._activated) {
				this.hide();
				this._activated = false;
			}
		},

		/**
		* @private
		*/
		showKnob: function() {
			this.$.knob.show();
		},

		/**
		* @private
		*/
		hideKnob: function() {
			this.$.knob.hide();
		},

		/**
		* @method
		* @private
		*/
		isInbounds: enyo.inherit(function(sup) {
			return function(inEvent) {
				if (this._activated) {
					return sup.apply(this, arguments);
				} else {
					return false;
				}
			};
		}),

		/**
		* @fires g.WheelSectionListController#onWheelControlBegin
		* @private
		*/
		_eventObservingStart: function(inRadian) {
			if (this.$.sections.hasClass("hide") === false) {
				this._radian = inRadian;
				this._currentSectionIndex = -1;
				if (this._currentSectionLabel != undefined) {
					this._currentSectionLabel.removeClass("tapped");
				}
				//section
				this.doWheelControlBegin();
				this._bubbleSectionChanged(inRadian);
			}
			return true;
		},

		/**
		* @private
		*/
		_eventObservingStep: function(inRadian) {
			if (this.$.sections.hasClass("hide") === false) {
				this._bubbleSectionChanged(inRadian);
			}
			return true;
		},

		/**
		* @fires g.WheelSectionListController#onWheelControlEnd
		* @private
		*/
		_eventObservingStop: function() {
			if(this.$.sections.hasClass("hide") === false) {
				if (!this.$.indexPopup.hasClass("hide") && this._currentSectionLabel != undefined) {
					this._currentSectionLabel.addClass("tapped");
				}
				this.$.sections.show();
				this.doWheelControlEnd();
			}
			return true;
		},

		/**
		* @private
		*/
		_createBackground: function() {
			this.createComponent({name: "wheelBg", classes: "g-wheel-section-bg"});
		},

		/**
		* @private
		*/
		_createKnob: function() {
			this.createComponent({
				name: "knob",
				kind: "g.Arc",
				color: "",
				width: g.wheelWidth * 1.4
			});
			if (!this.knobAlwaysEnabled) {
				this.$.knob.hide();
			}
		},

		/**
		* @private
		*/
		_drawKnob: function(inRadian) {
			this.$.knob.draw(inRadian - this.knobLengthRadian / 2, inRadian + this.knobLengthRadian / 2);
		},

		/**
		* @private
		*/
		_calculateAcceleration: function(inRadian) {
			if (inRadian < 0.5) {
				return this._unitRadian;
			} else if (inRadian < 2) {
				return this._unitRadian / 2;
			} else {
				return this._unitRadian / 5;
			}
		},

		/**
		* Radian to section index
		*
		* @private
		*/
		_radianToSectionIndex: function(inRadian) {
			for (var i = 0; i < this._sectionRadianTable.length-1; i++) {
				if ((inRadian+this._startTheta) >= this._sectionRadianTable[i] && (inRadian+this._startTheta) < this._sectionRadianTable[i+1]) {
					return i;
				}
			}
			if ((inRadian+this._startTheta) >= this._sectionRadianTable[i] && (inRadian+this._startTheta) < this._sectionRadianTable[i]+0.1) {
				return i;
			}
			return -1;
		},

		/**
		* @private
		*/
		_bubbleSectionChanged: function(inRadian) {
			var newIndex = this._radianToSectionIndex(inRadian);
			if (newIndex >= 0 && newIndex <  this.sectionLabelList.length && newIndex !== this._currentSectionIndex) {
				this._currentSectionIndex = newIndex;
				this._currentSectionLabel = this.$.sections.$["section_" + this.sectionLabelList[newIndex]];
				this._updateIndexPopup(newIndex);
			}
			else if (newIndex < 0 || newIndex >=  this.sectionLabelList.length) {
				this._currentSectionIndex = -1;
				this._hideIndexPopup();
			}
		},

		/**
		* @private
		*/
		_bubbleSectionNext: function(inRadian) {
			// dragging, jump to next one
			if (this._currentSectionIndex >= 0 && this._currentSectionIndex < this.sectionLabelList.length  && Math.abs(this._radian - inRadian) > this._radianJumpOffset) {
				if (this._currentSectionLabel != undefined) {
					this._currentSectionLabel.addRemoveClass("tapped", false);
				}
				if (this._radian > inRadian) {
					this._currentSectionIndex--;
				} else {
					this._currentSectionIndex++;
				}
				this._updateIndexPopup(this._currentSectionIndex);
				this.$.sections.addClass("hide");
				this._radian = inRadian;
			} else if(this._currentSectionIndex < 0 || this._currentSectionIndex >= this.sectionLabelList.length ) {
				this._currentSectionIndex = -1;
				this._hideIndexPopup();
			}
		},

		/**
		* @private
		*/
		_createIndexPopup: function() {
			this.createComponents(this.indexPopupTools, {owner: this});
			this.$.indexPopup.addClass("hide");
		},

		/**
		* @fires g.WheelSectionListController#onChange
		* @private
		*/
		_updateIndexPopup: function(newIndex) {
			if ( newIndex >= 0 && newIndex < this.sectionLabelList.length && this.sectionLabelList[newIndex] !== " ") {
				this.$.indexPopupC.setContent(this.sectionLabelList[newIndex]);
				this._showIndexPopup();
				var sectionParams = {
					sectionIndex: newIndex
				};
				this.doChange(sectionParams);
			}
		},

		/**
		* @private
		*/
		_showIndexPopup: function() {
			this.$.indexPopup.removeClass('hide');
			this.stopJob("hidePopup");
			this.startJob("hidePopup", this._hideIndexPopup, 500);
		},

		/**
		* @private
		*/
		_hideIndexPopup: function() {
			if (this._currentSectionLabel != undefined) {
				this._currentSectionLabel.removeClass("tapped");
			}
			this.$.indexPopup.addClass('hide');
		},

		/**
		* Shows section list.
		*
		* @public
		*/
		showSectionList: function() {
			this.removeClass("hide");
			this._captureEvents();
		},

		/**
		* Hides section list.
		*
		* @public
		*/
		hideSectionList: function() {
			this.addClass("hide");
			this._releaseEvents();
		},

		/**
		* Shows section list & index popup.
		*
		* @public
		*/
		showAll: function() {
			this.removeClass("hide");
			this._captureEvents();
		},

		/**
		* Hides section list & index popup.
		*
		* @public
		*/
		hideAll: function() {
			this.addClass("hide");
			this._releaseEvents();
		}

	});

})(enyo, g, this);
