(function (enyo, g, scope) {
	/**
	* Fired when the progressing animation is completed.
	*
	* @event g.ProgressBar#onAnimationFinished
	* @type {Object}
	* @property {Object} sender - A reference to this _g.ProgressBar_.
	* @property {g.ProgressBar~onAnimationFinishedEvent} event - An object containing
	*	the event information.
	* @public
	*/

	/**
	* Fired when the progress bar is changed.
	*
	* @event g.ProgressBar#onChange
	* @type {Object}
	* @property {Object} sender - A reference to this _g.ProgressBar_.
	* @property {g.ProgressBar~onChangeEvent} event - An object containing
	*	the event information.
	* @public
	*/

	/**
	* _g.ProgressBar_ is a control that shows the current progress of a
	*	process in a horizontal bar.
	*
	* ```
	* {kind: "g.ProgressBar", progress: 10}
	* ```
	*
	* To animate progress changes, call the [animateProgressTo()]{@link g.ProgressBar#animateProgressTo} method:
	*
	* ```
	* this.$.progressBar.animateProgressTo(50);
	* ```
	*
	* The bar color is customizable by applying a style via the [barClasses]{@link g.ProgressBar#barClasses} property.
	* For example:
	*
	* ```
	* {kind: "g.ProgressBar", barClasses: "class-name"}
	* ```
	*
	* @class g.ProgressBar
	* @public
	*/
	enyo.kind(
		/** @lends g.ProgressBar.prototype */ {

		/**
		* @private
		*/
		name: "g.ProgressBar",

		/**
		* @private
		*/
		published:
			/** @lends g.ProgressBar.prototype */ {

			/**
			* Current progress position on the progress bar.
			*
			* Range: [0-Positive Integer]
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			progress: 0,

			/**
			* Completion percentage for the background process
			*
			* Range: [0-100]
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			bgProgress: 0,

			/**
			* Minimum progress value (i.e. no progress is made)
			*
			* Range: [0-Positive Integer]
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			min: 0,

			/**
			* Maximum progress value (i.e. process is completed)
			*
			* Range: [0-Positive Integer]
			*
			* @type {Number}
			* @default 9
			* @public
			*/
			max: 9,

			/**
			* CSS class(es) to apply to the progressing bar of the progress bar.
			*
			* @type {String}
			* @default "g-progress-bar-bar"
			* @public
			*/
			barClasses: "g-progress-bar-bar",

			/**
			* CSS class(es) to apply to the background bar of the progress bar.
			*
			* @type {String}
			* @default "g-progress-bar-bar"
			* @public
			*/
			bgBarClasses: "g-progress-bg-bar"
		},

		/**
		* @private
		*/
		events: {
			onAnimationFinished: "",
			onChange:""
		},

		/**
		* @private
		*/
		classes: "g-progress-bar",

		/**
		* @private
		*/
		components: [
			{name: "progressAnimator", kind: "Animator", onStep: "_progressAnimatorStep", onEnd: "_progressAnimatorComplete"},
			{name: "bgbar"},
			{name: "bar"}
		],

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.progressChanged();
				this.barClassesChanged();
				this.bgBarClassesChanged();
				this.bgProgressChanged();
				this.minChanged();
				this.maxChanged();
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
				this.setAttribute("role", "progressbar");
				this.setAttribute("tabindex", 0);
			};
		}),

		/**
		* @private
		*/
		minChanged: function() {
			if (this.min < 0) {
				this.min = 0;
			}

			// accessibility - for progressbar
			this.setAttribute("aria-valuemin", this.min);

			this.bgProgressChanged(this.bgProgress);
			this.progressChanged(this.progress);
		},

		/**
		* @private
		*/
		maxChanged: function() {
			if (this.max < 0) {
				this.max = 0;
			}

			// accessibility - for progressbar
			this.setAttribute("aria-valuemax", this.max);

			this.bgProgressChanged(this.bgProgress);
			this.progressChanged(this.progress);
		},

		/**
		* @private
		*/
		barClassesChanged: function(inOld) {
			this.$.bar.removeClass(inOld);
			this.$.bar.addClass(this.barClasses);
		},

		/**
		* @private
		*/
		bgBarClassesChanged: function(inOld) {
			this.$.bgbar.removeClass(inOld);
			this.$.bgbar.addClass(this.bgBarClasses);
		},

		/**
		* @private
		*/
		bgProgressChanged: function() {
			this.bgProgress = this._clampValue(this.min, this.max, this.bgProgress);
			var p = this._calcPercent(this.bgProgress);
			this._updateBgBarPosition(p);
		},

		/**
		* @private
		*/
		progressChanged: function() {
			this.progress = this._clampValue(this.min, this.max, this.progress);

			// accessibility - for progressbar
			this.setAttribute("aria-valuenow", this.progress);

			var p = this._calcPercent(this.progress);
			this._updateBarPosition(p);
		},

		/**
		* Animates the progress to the given value.
		*
		* @method
		* @param {inValue} inLeft - Position to animate the progressing bar of the progress bar to.
		* @public
		*/
		animateProgressTo: function(inValue) {
			if (inValue !== undefined) {
				this.$.progressAnimator.play({
					startValue: this.progress,
					endValue: this._clampValue(this.min, this.max, inValue),
					node: this.hasNode()
				});
			}
		},

		/**
		* @private
		*/
		_clampValue: function(inMin, inMax, inValue) {
			if (inValue > inMax) {
				inValue = inMax;
			} else if (inValue < inMin) {
				inValue = inMin;
			}
			return inValue;
		},

		/**
		* @private
		*/
		_calcRatio: function(inValue) {
			return (inValue - this.min) / (this.max - this.min);
		},

		/**
		* @private
		*/
		_calcPercent: function(inValue) {
			return this._calcRatio(inValue) * 100;
		},

		/**
		* @private
		*/
		_updateBarPosition: function(inPercent) {
			this.$.bar.applyStyle("width", inPercent + "%");
		},

		/**
		* @private
		*/
		_updateBgBarPosition: function(inPercent) {
			this.$.bgbar.applyStyle("width", inPercent + "%");
		},

		/**
		* @fires g.ProgressBar#onChange
		* @private
		*/
		_progressAnimatorStep: function(inSender) {
			this.setProgress(inSender.value);
			this.doChange(inSender);
			return true;
		},

		/**
		* @fires g.ProgressBar#onAnimationFinished
		* @private
		*/
		_progressAnimatorComplete: function(inSender) {
			this.doAnimationFinished(inSender);
			return true;
		}
	});

})(enyo, g, this);
