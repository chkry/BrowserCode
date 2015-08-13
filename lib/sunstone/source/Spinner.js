/**
* _sun.Spinner_ is a control that shows a spinning animation
* to indicate that there is an active activity.
*
* ```javascript
* {kind: 'sun.Spinner'}
* ```
*
* Typically, a spinner is shown to indicate an active activity and gets hidden
* to indicate that the activity has ended. The animation automatically starts when the spinner is displayed.
* The animation is controllable by using the [start()]{@link sun.Spinner#start},
* [stop()]{@link sun.Spinner#stop}, and [toggle()]{@link sun.Spinner#toggle} methods.
*
* @class sun.Spinner
* @extends enyo.Control
* @ui
* @public
*/
enyo.kind(
	/** @lends sun.Spinner.prototype */ {

	/**
	* @private
	*/
	name: "sun.Spinner",

	/**
	* @private
	*/
	kind: 'enyo.Control',

	/**
	* @private
	*/
	published: /** @lends sun.Spinner.prototype */ {

		/**
		* Size of the spinner. The valid values and their widths are shown below.
		* * `”normal”`: 48 x 48 pixels
		* * `”small”`: 24 x 24 pixels
		*
		* @type {String}
		* @default "normal"
		* @public
		*/
		size: "normal"
	},

	/**
	* @private
	*/
	classes: "sun-spinner",

	/**
	* @private
	*/
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.sizeChanged();
		};
	}),

	/**
	* Hides the spinner.
	*
	* @public
	*/
	sizeChanged: function() {
		this.removeClass("normal");
		this.removeClass("small");
		if(this.getSize() == "small"){
			this.addClass("small");
		}else {
			this.addClass("normal");
		}
	},

	/**
	* Hides the spinner.
	*
	* @public
	*/
	stop: function() {
		this.setShowing(false);
	},

	/**
	* Shows the spinner.
	*
	* @public
	*/
	start: function() {
		this.setShowing(true);
	},

	/**
	* Toggles the spinner's visibility state, i.e. displays the spinner if it is invisible and hides the spinner if it is visible.
	*
	* @public
	*/
	toggle: function() {
		this.setShowing(!this.getShowing());
	}
});
