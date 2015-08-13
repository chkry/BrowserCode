(function (enyo, g, scope) {
	/**
	* g.swipe is a global object to handle swipe gesture in Garnet.
	* Garnet dispatch 'onSwipe' event to the target of 'dragstart' or 'flick' event.
	* An event information of 'onSwipe' event contains 'direction' value which indicating
	* swipe direction; "up", "down", "left" or "right"
	*
	* @private
	*/
	g.swipe = {
		/**
		* A period of time which ignore another swipe gesture in unit of milliseconds.
		*
		* @type {Number}
		* @private
		*/
		unrepeatableTime: 60, // milliseconds

		/**
		* @private
		*/
		isTracking: false,

		/**
		* @private
		*/
		startingX: 0,

		/**
		* @private
		*/
		startingY: 0,

		/**
		* @private
		*/
		direction: "",

		/**
		* @private
		*/
		lastSwipeTime: 0,

		/**
		* Calculate direction based on moved position difference.
		*
		* @private
		*/
		calculateDirection: function(dx, dy) {
			if (Math.abs(dx) > Math.abs(dy)) {
				if (dx > 0) {
					return "right";
				} else {
					return "left";
				}
			} else {
				if (dy > 0) {
					return "down";
				} else {
					return "up";
				}
			}
		},

		/**
		* Test if moved position difference is over the swipe threshold.
		*
		* @private
		*/
		isOverThreshold: function(inX, inY) {
			var difference;
			switch (g.swipe.direction) {
			case "up":    difference = g.swipe.startingY - inY; break;
			case "down":  difference = inY - g.swipe.startingY; break;
			case "left":  difference = g.swipe.startingX - inX; break;
			case "right": difference = inX - g.swipe.startingX; break;
			}
			return Boolean(difference > 96); // 30% of width or height = 0.3 * 320 = 96
		},

		/**
		* Test if a new swipe gesture is allowed.
		*
		* @private
		*/
		isRepeatable: function() {
			return Boolean(enyo.perfNow() - g.swipe.lastSwipeTime > g.swipe.unrepeatableTime);
		},

		/**
		* Send swipe event.
		*
		* @private
		*/
		sendSwipeEvent: function(inEvent) {
			var newEvent = enyo.clone(inEvent);
			if (inEvent.preventTap) {
				inEvent.preventTap();
			}
			if (inEvent.preventDefault) {
				inEvent.preventDefault();
			}
			newEvent.type = "Swipe";
			newEvent.direction = g.swipe.direction;
			enyo.dispatch(newEvent);
			g.swipe.lastSwipeTime = enyo.perfNow();
		}
	};

	/**
	* Swipe gesture recognition feature
	*
	* @private
	*/
	enyo.dispatcher.features.push(function(e) {
		if (g.swipe.isTracking) {
			switch (e.type) {
			case "drag":
				if (g.swipe.direction !== g.swipe.calculateDirection(e.ddx, e.ddy)) {
					g.swipe.isTracking = false;
				}
				return;
			case "holdpulse":
				g.swipe.isTracking = false;
				return;
			case "dragstart":
				g.swipe.direction = g.swipe.calculateDirection(e.dx, e.dy);
				g.swipe.startingX = e.clientX;
				g.swipe.startingY = e.clientY;
				return;
			case "dragfinish":
				if (g.swipe.isOverThreshold(e.clientX, e.clientY)) {
					g.swipe.sendSwipeEvent(e);
				}
				g.swipe.isTracking = false;
				return;
			case "flick":
				if (g.swipe.isRepeatable()) {
					g.swipe.direction = g.swipe.calculateDirection(e.xVelocity, e.yVelocity);
					g.swipe.sendSwipeEvent(e);
				}
				g.swipe.isTracking = false;
				return;
			}
		} else if (e.type === "down") {
			if (g.swipe.isRepeatable()) {
				g.swipe.isTracking = true;
				g.swipe.direction = "";
			}
		}
	});

})(enyo, g, this);
