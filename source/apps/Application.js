enyo.kind({
	name: "Safetycare.Application",
	kind: "enyo.Application",
	components: [
		{name: "SafetycareRouter", kind: "Safetycare.SafetycareRouter"},
		{name: "SafetycareController", kind: "Safetycare.SafetycareController"},
		{name: "routingController", kind: "Safetycare.RoutingController"}],
	view: "Safetycare.MainView"
});
