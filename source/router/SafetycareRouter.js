/**
 * @fileOverView: SafetycareRouter - Performs all routing operation for the view
 * @author: CSP1(Web App Development)
 * @version: v0.1.0
 * @createdDate: 10-02-2014
 * @modifiedDate: 05-03-2014
 */
enyo.kind({
	name: "Safetycare.SafetycareRouter",
	kind: "enyo.Router",
	useHistory: false,
	routes: [
		{path: "/homeView", handler: 'changeView'},
		{path: "/addContactView", handler: 'changeView'}
	],
	changeView: function() {
		safetycare.$.routingController.setRoute(this.get("location"));
	},
	components: [{kind: "enyo.Signals",
		"onHomeView": "showHomeView",
		"onAddContact": "showAddContactView"
	}],
	showAddContactView: function() {
		this.trigger({'location': '/addContactView', 'change': 'true'});
	},
	showHomeView: function() {
		this.trigger({'location': '/homeView', 'change': 'true'});
	}
});
