(function (enyo, scope) {
	/**
	* {@link g.ScrollMath} implements a scrolling dynamics simulation. It is a
	* helper kind that extends [enyo.ScrollMath]{@link http://enyojs.com/docs/latest/#/kind/enyo.ScrollMath} and is
	* used by other [enyo.Scroller]{@link http://enyojs.com/docs/latest/#/kind/enyo.Scroller} kinds, such as
	* [enyo.TouchScrollStrategy]{@link http://enyojs.com/docs/latest/#/kind/enyo.TouchScrollStrategy}.
	*
	* `g.ScrollMath` is not typically created in application code.
	*
	* @class g.ScrollMath
	* @extends enyo.ScrollMath
	* @private
	*/
	enyo.kind(
		/** @lends g.ScrollMath.prototype */ {

		/**
		* @private
		*/
		name: 'g.ScrollMath',

		/**
		* @private
		*/
		kind: 'enyo.ScrollMath',

		/**
		* @private
		*/
		drag: function (e) {
			if (this.dragging) {
				this.uy = e.pageY - this.my + this.py;

				// provides resistance against dragging into overscroll
				this.uy = this.boundaryDamping(this.uy, this.topBoundary, this.bottomBoundary, this.kDragDamping);
				this.ux = this.px;

				// provides resistance against dragging into overscroll
				this.ux = this.boundaryDamping(this.ux, this.leftBoundary, this.rightBoundary, this.kDragDamping);
				this.start();
				return true;
			}
		}

	});

})(enyo, this);
