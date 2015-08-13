enyo.kind({
	name: "sun.sample.PanelSample",
	classes: "sun enyo-fit",
	kind:"FittableRows",
	components: [
		{name:"header",kind: "sun.Header",title:"Header",classes:"enyo-unselectable button-header",onBackButtonTapped:"previous",components:[
			{kind: "sun.Button", classes: "sun-button-sample", content: "next Panel", ontap: "next"}
		]},
		{name:"panels", kind:"sun.Panels", fit:true, classes:"panels-sample-flickr-panels enyo-unselectable", onTransitionFinish:"transitionFinish",components:[
			{name:"panel1",style:"background:white;",components:[
				{content: "Item One"},
				{content: "Item Two"},
				{content: "Item Three"},
				{content: "Item Four"},
				{content: "Item Five"}
			]},
			{name:"Panel2",style:"background:yellow;",components:[
				{content: "Item One"},
				{content: "Item Two"},
				{content: "Item Three"},
				{content: "Item Four"},
				{content: "Item Five"}
			]},
			{name:"Panel3",style:"background:green;color:white",components:[
				{content: "Item One"},
				{content: "Item Two"},
				{content: "Item Three"},
				{content: "Item Four"},
				{content: "Item Five"}
			]}
		]}
	],
	next:function(inSender,inEvent){
		this.$.panels.next();
		this.toggleHeaderBackButton();
		return true;
	},
	previous:function(inSender,inEvent){
		this.$.panels.previous();
		this.toggleHeaderBackButton();
		return true;
	},
	transitionFinish:function(inSender,inEvent){
		this.toggleHeaderBackButton();
	},
	toggleHeaderBackButton:function(){
		var active = this.$.panels.getActive(),
			panels = this.$.panels,
			header = this.$.header;
		if(panels.getPanelIndex(active) > 0){
			header.setShowBackButton(true);
		}else{
			header.setShowBackButton(false);
		}
	}
});
