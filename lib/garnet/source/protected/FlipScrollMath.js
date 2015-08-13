(function (enyo, g, scope) {
	/**
	* _g.FlipScrollMath_ inherits from
	* [enyo.ScrollMath]{@link http://enyojs.com/docs/latest/#/enyo.ScrollMath}.
	* implements a scrolling dynamics simulation for flip list.  It is a helper
	* kind used by other scroller kinds, such as
	* <a href="#g.FlipScrollStrategy">g.FlipScrollStrategy</a>.
	*
	* _g.FlipScrollMath_ is not typically created in application code.
	*
	* @class g.FlipScrollMath
	* @extends enyo.ScrollMath
	* @private
	*/
	enyo.kind(
		/** @lends g.FlipScrollMath.prototype */ {

		/**
		* @private
		*/
		name: "g.FlipScrollMath",

		/**
		* @private
		*/
		kind: "enyo.ScrollMath",

		/**
		* One unit of time for simulation.
		*
		* @private
		*/
		frame: 10,

		/**
		* @private
		*/
		kFrictionDamping : 0.92,

		/**
		* @private
		*/
		kFlickScalar : 15,

		/**
		* @private
		*/
		drag: function(e) {
			if (this.dragging) {
				var dy = this.vertical ? e.pageY - this.my : 0;
				this.uy = dy + this.py;
				// Provides resistance against dragging into overscroll
				this.uy = this.boundaryDamping(this.uy, this.topBoundary, this.bottomBoundary, this.kDragDamping);
				var dx = this.horizontal ? e.pageX - this.mx : 0;
				this.ux = dx + this.px;
				// Provides resistance against dragging into overscroll
				this.ux = this.boundaryDamping(this.ux, this.leftBoundary, this.rightBoundary, this.kDragDamping);
				this.start();
				// If user has called scroll to and suddenly start dragging
				// Then drag event has to overrite the scroll to event
				// If we doesn't set it undefined here at end of scroll it will assign end value
				this.endX = undefined;
				this.endY = undefined;
				return true;
			}
		},

		/*
		* Resetting the Math scroller to initial value and also updating the thumb
		*
		* @private
		*/
		reset:function(){
			// initialize the scrolling, It is required to update the thumb position
			this.scrollTo(0, 0);
			// reset the scroller values
			this.x0 = this.x = this.y0 = this.y = 0;
		},

		/*
		* setting value to  Math scroller  also updating the thumb generally used  when user uses
		* scrollToIndex call from List. immideate scroller setting is required as we cant set it via dOM
		* scrolling as all elements are stacked.
		*
		* @private
		*/
		fastSetvalue:function(x,y){
			// initialize the scrolling, It is required to update the thumb position
			this.scrollTo(x, y);
			// set the scroller values
			this.x0 = this.x = -x;
			this.y0 = this.y = -y;
		}
	});

})(enyo, g, this);
