enyo.kind({
	name: "sun.sample.ToastPopupSample",
	classes: "sun enyo-unselectable enyo-fit",
	components: [
		{content: "Toast Popup"},
		{tag:'br'},
		{kind: "sun.Button", content: "Show Toast Popup", ontap: "showPopup"},
		{name: "toastpopup", kind: "sun.ToastPopup", showDuration: 2000, content: "Hello toastpopup!"}
	],
	showPopup: function(inSender) {
		if(inSender.name === "button") {
			this.$.toastpopup.show();
		}
	}
});