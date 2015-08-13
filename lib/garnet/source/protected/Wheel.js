(function (enyo, g, scope) {
	/**
	* _g.Wheel_ is the control that is laid out as the base in the shape of a wheel.
	*
	* @class g.Wheel
	* @private
	*/
	enyo.kind(
		/** @lends g.Wheel.prototype */ {

		/**
		* @private
		*/
		name: "g.Wheel",

		/**
		* @private
		*/
		published:
			/** @lends g.Wheel.prototype */ {

			/**
			* The color of this wheel. It can be in a simple text, e.g. red,
			* or presented in hexadecimal code, e.g. #5d5c5c.
			*
			* Range: [`Color`] e.g. red, blue, #1DDBD9, etc.
			*
			* @type {String}
			* @default g.constant.colorPoint
			* @public
			*/
			color: g.constant.colorPoint,

			/**
			* The width of this wheel.
			*
			* Range [0-Positive Number]
			*
			* - Unit: pixel
			*
			* @type {Number}
			* @default g.wheelWidth
			* @public
			*/
			width: g.wheelWidth
		},

		/**
		* @private
		*/
		classes: "g-wheel",

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.colorChanged();
				this.widthChanged();
			};
		}),

		/**
		* @private
		*/
		colorChanged: function() {
			this.applyStyle("border-color", this.color);
		},

		/**
		* @private
		*/
		widthChanged: function() {
			this.applyStyle("border-width", this.width + "px");
		}
	});

	/**
	* The _g.Knob_ kind is the UI component shows a knob on a wheel.
	*
	* @class g.Knob
	* @private
	*/
	enyo.kind(
		/** @lends g.Knob.prototype */ {

		/**
		* @private
		*/
		name: "g.Knob",

		/**
		* @private
		*/
		published:
			/** @lends g.Knob.prototype */ {

			/**
			* The width of a knob except a border. Normally, it is the same as the width of a wheel.
			*
			* Range [0-Positive Number]
			*
			* - Unit: pixel
			*
			* @type {Number}
			* @default g.wheelWidth
			* @public
			*/
			width: g.wheelWidth,

			/**
			* The color of a knob.
			*
			* Range [`Color`] example) red, blue, etc.
			*
			* @type {String}
			* @default g.constant.colorPoint
			* @public
			*/
			color: g.constant.colorPoint,

			/**
			* The width of a border.
			*
			* Range [0-Positive Number]
			*
			* - Unit: pixel
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			borderWidth: 0,

			/**
			* The color of a border.
			*
			* Range [`Color`] example) red, blue, etc.
			*
			* @type {String}
			* @default g.constant.colorPoint
			* @public
			*/
			borderColor: g.constant.colorPoint
		},

		/**
		* @private
		*/
		classes: "g-knob-container",

		/**
		* @private
		*/
		innerComponents: [
			{name: "knob", classes: "g-knob-body"}
		],

		/**
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function(sup) {
			return function() {
				this.components = null;
				sup.apply(this, arguments);
				this.createComponents(this.innerComponents);
			};
		}),

		/**
		* @method
		* @private
		*/
		rendered: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.colorChanged();
				this.widthChanged();
				this.borderWidthChanged();
			};
		}),

		/**
		* @private
		*/
		widthChanged: function() {
			var boxWidth = this.width + this.borderWidth * 2;
			this.$.knob.applyStyle("width", boxWidth + "px");
			this.$.knob.applyStyle("height", boxWidth + "px");
			this.$.knob.applyStyle("border-width", this.borderWidth + "px");
			this.$.knob.applyStyle("margin-top", "-" + this.borderWidth + "px");
		},

		/**
		* @private
		*/
		colorChanged: function() {
			this.$.knob.applyStyle("background-color", this.color);
		},

		/**
		* @private
		*/
		borderWidthChanged: function() {
			this.widthChanged();
		},

		/**
		* @private
		*/
		borderColorChanged: function() {
			this.$.knob.applyStyle("border-color", this.borderColor);
		},

		/**
		* Move the knob to the specified radian position
		*
		* @param {Number} inRadian - Radian value for rotation. Range is [0-2*Math.PI]
		* @public
		*/
		draw: function(inRadian) {
			enyo.dom.transform(this, {rotateZ: inRadian + "rad", translateZ: 0});
		}
	});

	/**
	* The _g.Arc_ kind is the UI component shows an arc.
	*
	* @class g.Arc
	* @private
	*/
	enyo.kind(
		/** @lends g.Arc.prototype */ {


		/**
		* @private
		*/
		name: "g.Arc",

		/**
		* @private
		*/
		published:
			/** @lends g.Arc.prototype */ {

			/**
			* The color of an arc.
			*
			* Range [`Color`] example) red, blue, etc.
			*
			* @type {String}
			* @default g.constant.colorPoint
			* @public
			*/
			color: g.constant.colorPoint,

			/**
			* The width of an arc.
			*
			* Range [0-Positive Number]
			*
			* - Unit: pixel
			*
			* @type {Number}
			* @default g.wheelWidth
			* @public
			*/
			width: g.wheelWidth,

			/**
			* The diameter of a circle.
			*
			* Range [0-Positive Number]
			*
			* - Unit: pixel
			*
			* @type {Number}
			* @default g.width
			* @public
			*/
			diameter: g.width
		},

		/**
		* @private
		*/
		_lastStartRadian: 0,

		/**
		* @private
		*/
		_lastEndRadian: 0,

		/**
		* @private
		*/
		classes: "g-arc",

		/**
		* @private
		*/
		innerComponents: [
			{
				name: "svg",
				tag: "svg",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					version: "1.1",
					width: "100%",
					height: "100%"
				},
				classes: "g-layout-absolute-center",
				components: [{
					name: "arc",
					tag: "circle",
					attributes: {
						cx: "50%",
						cy: "50%",
						transform: "rotate(-90, 160, 160)",
						"stroke-linecap": "round",
						fill: "transparent"
					}
				}]
			}
		],

		/**
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function(sup) {
			return function() {
				this.components = null;
				sup.apply(this, arguments);
				this.createComponents(this.innerComponents);
			};
		}),

		/**
		* @method
		* @private
		*/
		rendered: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				enyo.dom.transform(this.$.svg, {transform: "rotate(90deg)"});
				this.colorChanged();
				this.widthChanged();
				this.diameterChanged();
			};
		}),

		/**
		* @private
		*/
		colorChanged: function() {
			this.$.arc.setAttribute("stroke", this.color);
			this.redraw();
		},

		/**
		* @private
		*/
		widthChanged: function() {
			this.$.arc.setAttribute("r", ((this.diameter - this.width) / 2) + "px");
			this.$.arc.setAttribute("stroke-width", this.width + "px");
			this.redraw();
		},

		/**
		* @private
		*/
		diameterChanged: function() {
			this.$.svg.setAttribute("width", this.diameter + "px");
			this.$.svg.setAttribute("height", this.diameter + "px");
			this.widthChanged();
		},

		/**
		* @private
		*/
		redraw: function() {
			this.draw(this._lastStartRadian, this._lastEndRadian);
		},

		/**
		* Draws a wheel from inStartRadian to inEndRadian
		*
		* @param {Number} inStartRadian - Start radian value
		* @param {Number} inEndRadian - End radian value
		* @public
		*/
		draw: function(inStartRadian, inEndRadian) {
			var delta = inEndRadian - inStartRadian;
			var unit = (this.diameter - this.width) / this.diameter * 50;
			var valueString = "";
			if (delta < 0) {
				delta = (-delta);
				valueString += "0%, " + unit * ((2 * Math.PI) - delta) + "% ," + (unit * delta) + "%";
			} else {
				valueString += (unit * delta) + "% ," + unit * ((2 * Math.PI) - delta) + "%";
			}
			this._lastStartRadian = inStartRadian;
			this._lastEndRadian = inEndRadian;
			this.$.arc.setAttribute("stroke-dasharray", valueString);
			this.$.arc.setAttribute("transform", "rotate(" + (inStartRadian * 180 / Math.PI - 90) + ", " + this.diameter / 2 + ", " + this.diameter / 2 + ")");
		}
	});

})(enyo, g, this);
