enyo.kind({
	name: "g.sample.ToastPanel",
	kind: "g.Panel",
	classes: "g-layout-absolute-wrapper", // for button
	components: [
		{kind: "g.Button", style: "width: 310px;", classes: "g-layout-absolute-center g-layout-absolute-middle", ontap: "showPopup", content: "Click here"},
		{
			name: "toast",
			kind: "g.Toast",
			allowHtml: true,
			content: "Toast<br><br>Saved"
		}
	],
	showPopup: function(inSender, inEvent) {
		this.$.toast.show();
	},
	hidePopup: function(inSender, inEvent) {
		this.$.toast.show();
	}
});

enyo.kind({
	name: "g.sample.ToastSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Toast Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Toast", classes: "g-sample-subheader"},
		{kind: "g.sample.ToastPanel", style: "position: relative;"}
	],
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
