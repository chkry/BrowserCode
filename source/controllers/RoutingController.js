/**
 * @fileOverView: RoutingController deals with on routing changes the view throughout the application
 * @author: CSP1(Web App Development)
 * @version: v0.1.0
 * @createdDate: 09-12-2013
 * @modifiedDate: 19-03-2014
 */
enyo.kind({
	name: "Safetycare.RoutingController",
	kind: "enyo.Controller",
	published: {
		route: ""
	},
	/**
	 * routeChanged deals with initializing/destroying the views on route changes.
	 */
	routeChanged: function() {
		var currentRoot = this.route;
		try {
			safetycare.$.mainView.children[0].destroyComponents();
		} catch (err) {
			console.log(err);
		}
		switch (currentRoot) {
			case '/homeView':
				enyo.$.safetycare_mainView.children[0] = this.createComponent({
					kind: "Safetycare.SafetycareMainView"
				});
				break;
			case '/addContactView':
				enyo.$.safetycare_mainView.children[0] = this.createComponent({
					kind: "Safetycare.AddContactView"
				});
				break;
			default:
				console.log("Error");
				break;
		}
		enyo.$.safetycare_mainView.render();
	}
});
