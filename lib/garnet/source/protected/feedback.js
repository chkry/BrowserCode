enyo.ready(function(){

	(function (enyo, g, scope) {
		/**
		* _g.playFeedback_ is a wrapper API to play feedback sound.
		*
		* @public
		*/

		window.webOS = window.webOS || {};

		if (webOS && webOS.feedback && webOS.feedback.play) {
			g.playFeedback = webOS.feedback.play;
		} else {
			g.playFeedback = enyo.nop;
		}

	})(enyo, g, this);

});
