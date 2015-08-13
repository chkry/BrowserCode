enyo.kind({
	name: "g.sample.MenuScrollerPanel",
	kind: "g.Panel",
	handlers: {
		onTitleTap: "showMenu"
	},
	events: {
		onResult: ""
	},
	title: true,
	titleIcon: true,
	titleContent: "Title: long text will fade out",
	components: [
		{content: "Please tap a title", style: "position: absolute; width: 100%; margin-top:60px; text-align: center;"},
		{name: "menuScrollerPopup", kind: "g.Popup", effect: "depth-transition", components: [
			{kind: "g.MenuScroller", components: [
				{name: "item1", kind: "g.MenuItem", singleLine: true, content: "This item is single line item.", ontap: "tapItem"},
				{name: "item2", kind: "g.MenuItem", allowHtml: true, content: "This item supports<br>2 line. It will clip the text", ontap: "tapItem"},
				{name: "item3", kind: "g.MenuCheckbox", content: "This is long check item", onchange: "tapItem"},
				{name: "item4", kind: "g.MenuToggleIconButton", content: "Edit", ontap: "tapItem"}
			]}
		]}
	],
	showMenu: function(inSender, inEvent) {
		this.$.menuScrollerPopup.show();
		this.doResult({msg: "Title tapped !!"});
		return;
	},
	tapItem: function(inSender, inEvent) {
		var name = inSender.name;

		if (name === "item3") {
			this.doResult({msg: name + " is checked : " + inSender.checked});
		} else if(name === "item4") {
			this.doResult({msg: name + " is toggled : " + inSender.value});
		} else {
			this.doResult({msg: name + " is selected"});
			this.$.menuScrollerPopup.hide();
		}
	}
});

enyo.kind({
	name: "g.sample.MenuScrollerSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Menu Scroller Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Menu Scroller", classes: "g-sample-subheader"},
		{kind: "g.sample.MenuScrollerPanel", style: "position: relative;", onResult: "result"},

		{style: "position: fixed; width: 100%; min-height: 160px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No button pressed yet.", classes: "g-sample-description"}
		]}
	],
	result: function(inSender, inEvent) {
		this.$.result.setContent(inEvent.msg);
	},
	goBack: function(inSender, inEvent) {
		history.go(-1);
		return false;
	}
});
