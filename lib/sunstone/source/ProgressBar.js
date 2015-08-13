/**
* Fired when progress bar finishes animating to a position. No event-specific data
* is sent with this event.
*
* @event sun.ProgressBar#onAnimateProgressFinish
* @type {Object}
* @public
*/

/**
* _sun.ProgressBar_ is a control that
* shows a progress of a process in a horizontal bar.
*
* ```
* {kind: "sun.ProgressBar", progress: 10}
* ```
*
* To animate a progress change, call the
* [animateProgressTo()]{@link sun.ProgressBar#animateProgressTo} method:
*
* ```
* this.$.progressBar.animateProgressTo(50);
* ```
*
* You may customize the color of the bar by applying a style via the
* [barClasses]{@link sun.ProgressBar#barClasses} property, e.g.:
*
* ```
* {kind: "sun.ProgressBar", barClasses: "class-name"}
* ```
*
* For more information, see the documentation on [Progress Indicators]{@link http://enyojs.com/docs/latest/building-apps/controls/progress-indicators.html}
* in the Enyo Developer Guide.
*
* @class sun.ProgressBar
* @extends enyo.Control
* @public
*/
enyo.kind(
	/** @lends sun.ProgressBar.prototype */ {

	/**
	* @private
	*/
	name: "sun.ProgressBar",

	/**
	* @private
	*/
	classes: "sun-progress-bar",

	/**
	* @private
	* @lends sun.ProgressBar.prototype
	*/
	published: {

		/**
		* Current progress position on the progress bar.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		progress: 0,

		/**
		* Minimum progress value (i.e., no progress made).
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		min: 0,

		/**
		* Maximum progress value (i.e., process complete).
		*
		* @type {Number}
		* @default 100
		* @public
		*/
		max: 100,

		/**
		* CSS class(es) to apply to the progress bar.
		*
		* @type {String}
		* @default "sun-progress-bar-bar"
		* @public
		*/
		barClasses: "sun-progress-bar-bar",

		/**
		* CSS class(es) to apply to the background progress bar.
		*
		* @type {String}
		* @default "sun-progress-bg-bar"
		* @public
		*/
		bgBarClasses: 'sun-progress-bg-bar',

		/**
		* Completion percentage for the process.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		bgProgress: 0
	},

	/**
	* @private
	*/
	events: {
		//* Fired when progress bar finishes animating the progress. No event-specific data is sent with this event.
		onAnimateProgressFinish: ""
	},

	/**
	* @private
	*/
	animationOption: {
		duration: 350,
		timingFunction: "linear"
	},

	/**
	* @private
	*/
	isAnimationPlaying: false,

	/**
	* @private
	*/
	components: [
		{name: "progressAnimator", kind: "sun.StyleAnimator", onStep: "progressAnimatorStep", onComplete: "progressAnimatorComplete"},
		{name: "bgbar"},
		{name: "bar"}
	],

	/**
	* @private
	*/
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.progressChanged();
			this.barClassesChanged();
			this.bgBarClassesChanged();
			this.bgProgressChanged();
		};
	}),

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
	progressChanged: function() {
		this.progress = this.clampValue(this.min, this.max, this.progress);
		var p = this.calcPercent(this.progress);
		this.updateBarPosition(p);
	},

	/**
	* @private
	*/
	bgProgressChanged: function() {
		this.bgProgress = this.clampValue(this.min, this.max, this.bgProgress);
		var p = this.calcPercent(this.bgProgress);
		this.updateBgBarPosition(p);
	},

	/**
	* @private
	*/
	clampValue: function(inMin, inMax, inValue) {
		return Math.max(inMin, Math.min(inValue, inMax));
	},

	/**
	* @private
	*/
	calcRatio: function(inValue) {
		return (inValue - this.min) / (this.max - this.min);
	},

	/**
	* @private
	*/
	calcPercent: function(inValue) {
		return this.calcRatio(inValue) * 100;
	},

	/**
	* @private
	*/
	updateBarPosition: function(inPercent) {
		this.$.bar.applyStyle("width", inPercent + "%");
	},

	/**
	* @private
	*/
	updateBgBarPosition: function(inPercent) {
		this.$.bgbar.applyStyle("width", inPercent + "%");
	},

	/**
	* Animates the control knob and the bar to the given value.
	*
	* @param {Number} inValue  The destination position of the control knob and the bar to animate to.
	* @public
	*/
	animateProgressTo: function(inValue) {
		var tValue = this.clampValue(this.min, this.max, inValue);
		if (tValue === this.getProgress(this.progress)) {
			return;
		}
		this.$.progressAnimator.newAnimation({
			name: "progress",
			duration: this.animationOption.duration,
			timingFunction: this.animationOption.timingFunction,
			keyframes: {
				0: [{control: this.$.bar, properties: {"width"  : this.calcPercent(this.progress) + "%"}}],
				100: [{control: this.$.bar, properties: {"width"  : this.calcPercent(tValue) + "%"}}]
			}
		});
		this.$.progressAnimator.play("progress");
		this.$.progressAnimator.set("tValue", tValue);
	},

	/**
	* @private
	*/
	progressAnimatorStep: function(inSender) {
		this.isAnimationPlaying = true;
		return true;
	},

	/**
	* @fires sun.ProgressBar#onAnimateProgressFinish
	* @private
	*/
	progressAnimatorComplete: function(inSender) {
		this.isAnimationPlaying = false;
		if (this.$.progressAnimator.getAnimation("progress")) {
			this.$.bar.applyStyle(enyo.dom.transition, null);
			this.setProgress(this.$.progressAnimator.get("tValue"));
		}
		this.$.progressAnimator.stop();
		this.doAnimateProgressFinish();
		return true;
	}

});
