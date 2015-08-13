enyo.kind({
	name: "sun.sample.HeaderSample",
	kind: "FittableRows",
	classes: "enyo-unselectable sun-header-sample",
	components: [
		{kind: "sun.Header", content: "Header"},
		{tag: "br"},
		{kind: "sun.Header", title: "Header", showBackButton: true, onBackButtonTapped: "buttonTapped", components: [
			{kind: "sun.ToggleSwitch", classes: "header-sample-toggle"},
			{kind: "sun.Button", content: "button", classes: "header-sample-button"}
		]},
		{name: "toastpopup", kind: "sun.ToastPopup", showDuration: 2000, content: "Hello toastpopup!"}
	],
	buttonTapped: function(inSender, inEvent){
		this.$.toastpopup.setContent("header backbutton Tapped !!");
		this.$.toastpopup.show();
	}
});