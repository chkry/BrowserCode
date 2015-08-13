enyo.kind({
	name: "sun.SelectiveItem",
	kind: "enyo.GroupItem",
	//* @public
	published: {
		//* When true, button is shown as disabled and does not generate tap
		//* events
		disabled: false
	},
	//* @protected
	handlers: {
		ondown: "eventDown",
		onup: "eventUp",
		onleave:"eventUp",
		// prevent double onchange bubble in IE
		onclick: ""
	},
	tag: "div",
	classes: "sun-selectiveItem",
	pressedChanged: function() {
		this.setAttribute("pressed", this.pressed ? "pressed" : "");
	},
	eventDown: function(inSender,inEvent) {
		this.set("pressed", true);
	},
	eventUp: function(inSender,inEvent) {
		this.set("pressed", false);
	},
	tap: function() {
		this.set("pressed", false);
		if (!this.disabled && !this.getActive()) {
			this.setActive(true);
		}else{
			this.bubble('onActivate');
		}
		return !this.disabled;
	}
});

enyo.kind({
	name: "sun.sample.ContextualPopupSample",
	classes: "sun enyo-unselectable enyo-fit sun-contextual-popup-sample",
	components: [
		{name:"componentContainer", kind:"FittableRows", classes:"enyo-fill", components:[
			//Top row of ContextualPopup
			{components:[
				{name:"test0",style:"width:300px",kind: "sun.ContextualButton",content:"Test", components: [
					{name:"contextualPopup0", kind:"sun.ContextualPopup", classes: "contextual-popup", floating:true, components: [
						{kind: "sun.Scroller", horizontal: "hidden", classes: "contextual-popup-scroller", components: [
							{name:"myTest",kind: "Group", onActivate: "groupChanged", components: [
								{kind: "sun.SelectiveItem", content: "cm"},
								{kind: "sun.SelectiveItem", content: "inches", active: true},
								{kind: "sun.SelectiveItem", content: "yard"},
								{kind: "sun.SelectiveItem", classes: "last-item", content: "miles"}
							]}
						]}
					]}
				]}
			]}
		]}
	],
	rendered: enyo.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			//must put render function to display active selectiveItem first loading.
			this.$.contextualPopup0.render();
			this.$.test0.setContent(this.$.myTest.getActive().getContent());
		};
	}),
	groupChanged: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			var selected = inEvent.originator.getContent();
			this.$.test0.setContent(selected);
			this.closePopup();
		}
	},
	closePopup: function() {
		this.$.contextualPopup0.hide();
		// must put return true; to stop event bubbling
		return true;
	}
});