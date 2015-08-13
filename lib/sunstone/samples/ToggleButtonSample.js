enyo.kind({
	name: "sun.sample.ToggleButtonSample",
	classes: "sun enyo-unselectable enyo-fit",
	components: [
		{kind: "enyo.FittableColumns", components:[
			{fit:true,classes: 'textsample', content:"Default ToggleButton"},
			{kind: "sun.ToggleButton"}
		]},
		{tag: "br"},
		{kind: "enyo.FittableColumns", components:[
			{fit:true,classes: 'textsample', content:"Disable ToggleButton"},
			{kind: "sun.ToggleButton",active:true,disabled:true},
			{kind: "sun.ToggleButton",disabled:true}
		]},
		{tag: "br"},
		{kind: "enyo.FittableColumns", components:[
			{name:"result",fit:true,classes: 'textsample'},
			{name:"toggle", kind: "sun.ToggleButton",onChange:"toggleChanged"}
		]}
	],
	toggleChanged: function(inSender, inEvent) {
		var aThis = this;
		if(inEvent.active){
			this.$.toggle.setDisabled(true);
			this.$.result.setContent("Turning On...");
			setTimeout(function(){
				aThis.$.toggle.setDisabled(false);
				aThis.$.result.setContent("Connection available");
			},2000);
		}else{
			this.$.toggle.setDisabled(false);
			this.$.result.setContent("Connection not allowed");
		}
	}
});