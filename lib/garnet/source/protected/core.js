(function() {

	if (window.PalmSystem) {
		g.debug = false;
	} else {
		g.debug = true;
	}

	g.sample = g.sample || {};

	g.constant = {
		colorPoint: "#1CD2D2"
	};

	/**
	* The width of touch sensing on a dragging event. It's a constant.
	*
	* @private
	*/
	g.wheelGestureDraggingWidth = 0.4165; // 133px / 320px

})();
