enyo.kind({
	name: "sun.sample.WatchManagerSample",
	kind: "FittableRows",
	classes: "enyo-unselectable",
	components: [
		{kind: "sun.Header",title:"Watch Manager"},
		{classes:"imageArea", components:[
			{kind: "enyo.Image", src:"assets/ic_list_ring.png"}
		]},
		{kind: "sun.Scroller",fit:true,classes:"settingList",components:[
			{classes:"general-index",content:"CATEGORY 1"},
			{classes:"setting-container",components:[
				{classes:"content-area",components:[
					{content:"Setting 1",classes:"main-content"},
					{content:"Description",classes:"sub-content"}
				]},
				{classes:"setting-checkbox",components:[
					{kind:"sun.Checkbox",checked:true,value:"setting1",onchange:"itemChanged"}
				]}
			]},
			{classes: "divider"},
			{classes:"setting-container",components:[
				{classes:"content-area",components:[
					{content:"Setting 2",classes:"main-content"},
					{content:"Description1",classes:"sub-content"},
					{content:"Description2",classes:"sub-content"}
				]}
			]},

			{classes:"general-index",content:"CATEGORY 2"},
			{classes:"setting-container",components:[
				{classes:"content-area",components:[
					{content:"Setting 3",classes:"main-content"},
					{content:"Description",classes:"sub-content"}
				]},
				{classes:"setting-toggle",components:[
					{kind:"sun.ToggleButton",active:true,value:"setting3",onChange:"toggleChanged"}
				]}
			]},
			{classes: "divider"},
			{classes:"setting-container",style:"height:64px;",components:[
				{classes:"setting4-checkbox",components:[
					{kind:"sun.Checkbox",checked:true,value:"setting3",onchange:"itemChanged"}
				]},
				{classes:"content-area",components:[
					{content:"Setting 3",classes:"main-content"}
				]},
				{classes:"setting4-iconbutton",components:[
					{kind: "sun.IconButton", src: "../images/btn_setting.svg", value:"setting3", ontap: "buttonTapped"}
				]}
			]},

			{classes:"general-index",content:"CATEGORY 3"},
			{classes:"setting-container",components:[
				{classes:"content-area",components:[
					{content:"Setting 4",classes:"main-content"},
					{content:"Setting Test ",classes:"main-content"},
					{content:"Description1",classes:"sub-content"},
					{content:"Description2",classes:"sub-content"}
				]},
				{classes:"setting-checkbox",components:[
					{kind:"sun.Checkbox",checked:true,value:"setting4",onchange:"itemChanged"}
				]}
			]}
		]},
		{name: "toastpopup", kind: "sun.ToastPopup", showDuration: 2000, content: "Hello toastpopup!"}
	],
	itemChanged: function(inSender, inEvent) {
		this.$.toastpopup.hide();
		this.$.toastpopup.setContent(inEvent.originator.value +" changed.");
		this.$.toastpopup.show();
	},
	toggleChanged: function(inSender, inEvent) {
		if(inEvent.active && this.$.toastpopup){
			this.$.toastpopup.hide();
			this.$.toastpopup.setContent(inEvent.originator.value +" toggle on.");
			this.$.toastpopup.show();
		}
	},
	buttonTapped: function(inSender, inEvent) {
		this.$.toastpopup.hide();
		this.$.toastpopup.setContent(inEvent.originator.value +" pressed.");
		this.$.toastpopup.show();
	}
});
