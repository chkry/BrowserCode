enyo.kind({
	name: "sun.sample.ProfileSample",
	kind: "FittableRows",
	classes: "enyo-unselectable",
	components: [
		{kind: "sun.Header", title:"Profile & goal", showBackButton:true, onBackButtonTapped:"buttonTapped"},
		{kind: "sun.Scroller", fit:true, style:"height:100%;", horizontal:"hidden", components: [
			{classes: "general-index", content: "PROFILE"},
			{classes: "profile-label", content: "Gender"},
			{name:"gender",style:"margin: 0 16px;",kind: "sun.ContextualButton",content:"Test", components: [
				{name:"genderPopup", kind:"sun.ContextualPopup", classes: "contextual-popup", floating:true, components: [
					{kind: "sun.Scroller", horizontal: "hidden", classes: "contextual-popup-scroller", components: [
						{name:"genderGroup", kind: "Group", onActivate: "groupChanged", components: [
							{kind: "sun.SelectiveItem", classes: "select-item", content: "Male", active: true},
							{kind: "sun.SelectiveItem", classes: "select-item sun-last-item", content: "Female"}
						]}
					]}
				]}
			]},
			{classes: "profile-label", content: "AGE"},
			{classes: "profile-table", components: [
				{classes:"profile-table-cell", style: "width:65%;", components: [
					{kind: "sun.InputDecorator", style: "margin-left:16px;width: 90%;", components: [
						{kind: "sun.Input", placeholder:"Enter Age", oninput:"handleInput", onchange:"handleChange"}
					]}
				]},
				{classes:"profile-table-cell", style: "width:30%;", components: [
					{style:"margin-right: 16px", content: "years"}
				]}
			]},
			{classes: "profile-label", content: "HEIGHT"},
			{classes: "profile-table", components: [
				{classes:"profile-table-cell", style: "width:65%;", components: [
					{kind: "sun.InputDecorator", style:"margin-left:16px;width:90%;",components: [
						{kind: "sun.Input", placeholder:"Enter Height", oninput:"handleInput", onchange:"handleChange"}
					]}
				]},
				{classes:"profile-table-cell", style: "width:30%;", components: [
					{name:"height", style:"margin-right:16px", kind: "sun.ContextualButton",content:"Test", components: [
						{name:"heightPopup", kind:"sun.ContextualPopup", classes: "contextual-popup", floating:true, components: [
							{kind: "sun.Scroller", horizontal: "hidden", classes: "contextual-popup-scroller", components: [
								{name:"heightGroup",kind: "Group", onActivate: "groupChanged", components: [
									{kind: "sun.SelectiveItem", classes: "select-item", content: "cm", active: true},
									{kind: "sun.SelectiveItem", classes: "select-item sun-last-item", content: "feet"}
								]}
							]}
						]}
					]}
				]}
			]},
			{classes: "profile-label", content: "WEIGHT"},
			{classes: "profile-table", components: [
				{classes:"profile-table-cell", style: "width:65%;", components: [
					{kind: "sun.InputDecorator", style:"margin-left:16px;width:90%;", components: [
						{kind: "sun.Input", placeholder:"Enter Weight", oninput:"handleInput", onchange:"handleChange"}
					]}
				]},
				{classes:"profile-table-cell", style: "width:30%;", components: [
					{name:"weight", style:"margin-right:16px", kind: "sun.ContextualButton",content:"Test", components: [
						{name:"weightPopup", kind:"sun.ContextualPopup", classes: "contextual-popup", floating:true, components: [
							{kind: "sun.Scroller", horizontal: "hidden", classes: "contextual-popup-scroller", components: [
								{name:"weightGroup",kind: "Group", onActivate: "groupChanged", components: [
									{kind: "sun.SelectiveItem", classes: "select-item", content: "kg", active: true},
									{kind: "sun.SelectiveItem", classes: "select-item sun-last-item", content: "pound"}
								]}
							]}
						]}
					]}
				]}
			]},
			{style:"padding: 12px 16px",components: [
				{style: "background-color:#f0f1f1;padding:12px 16px;", components: [
					{content: "- BM: 20(Normal weight)"},
					{content: "- Target weight: 72kg"},
					{content: "- Recommended daily goal: 350kcal/6500steps/5.51km"}
				]}
			]},
			{classes: "general-index", content: "DAILY ACTIVITY GOAL"},
			{style: "padding:12px 16px;font-size:14px;color:grey;", content: "Your goal can be measured in calories, number of steps, or units of distace. The selected unit is used as a standard unit for your goal."},
			{classes: "profile-label", content: "EDIT GOAL"},
			{classes: "profile-table", components: [
				{classes:"profile-table-cell", style:"width:65%;", components: [
					{kind: "sun.InputDecorator", style:"margin-left:16px;width:90%;", components: [
						{kind: "sun.Input", placeholder:"350", oninput:"handleInput", onchange:"handleChange"}
					]}
				]},
				{classes:"profile-table-cell", style: "width:30%;", components: [
					{name:"goal", style:"margin-right:16px", kind: "sun.ContextualButton", content:"Test", components: [
						{name:"goalPopup", kind:"sun.ContextualPopup", classes: "contextual-popup", floating:true, components: [
							{kind: "sun.Scroller", horizontal: "hidden", classes: "contextual-popup-scroller", components: [
								{name:"goalGroup",kind: "Group", onActivate: "groupChanged", components: [
									{kind: "sun.SelectiveItem", classes: "select-item sun-last-item", content: "kcal", active: true}
								]}
							]}
						]}
					]}
				]}
			]},
			{style: "padding:12px 16px;font-size:14px;", components: [
				{content: "Stemp : 6500 steps"},
				{content: "Distance : 5.51 km"}
			]}
		]},
		{name: "toastpopup", kind: "sun.ToastPopup", showDuration: 2000, content: "key pressed!"}
	],
	rendered: enyo.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			//must put render function to display active selectiveItem first loading.
			this.$.genderPopup.render();
			this.$.gender.setContent(this.$.genderGroup.getActive().getContent());

			this.$.heightPopup.render();
			this.$.height.setContent(this.$.heightGroup.getActive().getContent());

			this.$.weightPopup.render();
			this.$.weight.setContent(this.$.weightGroup.getActive().getContent());

			this.$.goalPopup.render();
			this.$.goal.setContent(this.$.goalGroup.getActive().getContent());
		};
	}),
	groupChanged: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			var selected = inEvent.originator.getContent();
			if (inSender.name === "genderGroup") {
				this.$.gender.setContent(selected);
			} else if (inSender.name === "heightGroup") {
				this.$.height.setContent(selected);
			} else if (inSender.name === "weightGroup") {
				this.$.weight.setContent(selected);
			} else if (inSender.name === "goalGroup") {
				this.$.goal.setContent(selected);
			}
			this.closePopup();
		}
	},
	closePopup: function() {
		this.$.genderPopup.hide();
		this.$.heightPopup.hide();
		this.$.weightPopup.hide();
		this.$.goalPopup.hide();
		// must put return true; to stop event bubbling
		return true;
	},
	buttonTapped: function(inSender, inEvent) {
		this.$.toastpopup.hide();
		this.$.toastpopup.show();
	},
	handleChange: function(inSender, inEvent) {
		var toast = this.$.toastpopup;
		setTimeout(function(){
			toast.hide();
			toast.setContent(inSender.getValue());
			toast.show();
		}, 500);
	}
});

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