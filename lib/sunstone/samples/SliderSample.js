enyo.kind({
	kind: "FittableRows",
	name: "sun.sample.SliderSample",
	classes: "sun enyo-unselectable enyo-fit",
	components: [
		{kind: "sun.Scroller", horizontal:"hidden", fit: true,  components: [
			{tag:"br"},
			{content: "Slider 1: Default"},
			{name: "slider1", kind: "sun.Slider", value: 20, onChanging: "sliderChanging", onChange: "sliderChanged"},
			{tag:"br"},
			{content:"Change Value"},
			{classes: "sun-hspacing", components: [
				{kind: "sun.InputDecorator", style:"width:300px;", components: [
					{name: "valueInput", kind: "sun.Input", placeholder: "Value", classes:"sun-1h", value: 20}
				]},
				{kind: "sun.Button", style:"margin-left:30px;", small:true, content:"Set", ontap:"changeValue"},
				{kind: "sun.Button", style:"margin-left:30px;", small:true, content:"-", ontap:"decValue"},
				{kind: "sun.Button", style:"margin-left:30px;", small:true, content:"+", ontap:"incValue"}
			]}
		]},
		{kcontent:"Result"},
		{name:"result", content:"No slider moved yet."}
	],
	create: function() {
		this.inherited(arguments);
	},
	rendered: function() {
		this.inherited(arguments);
	},
	//* @protected
	changeValue: function(inSender, inEvent) {
		var v = this.$.valueInput.getValue();

		for (var i in this.$) {
			if (this.$[i].kind == "sun.Slider") {
				this.$[i].setValue(v);
			}
		}
	},
	incValue: function() {
		this.$.valueInput.setValue(Math.min(parseInt(this.$.valueInput.getValue() || 0, 10) + 10, 100));
		this.changeValue();
	},
	decValue: function() {
		this.$.valueInput.setValue(Math.max(parseInt(this.$.valueInput.getValue() || 0, 10) - 10, 0));
		this.changeValue();
	},
	incProgress: function() {
		this.$.progressInput.setValue(Math.min(parseInt(this.$.progressInput.getValue() || 0, 10) + 10, 100));
	},
	decProgress: function() {
		this.$.progressInput.setValue(Math.max(parseInt(this.$.progressInput.getValue() || 0, 10) - 10, 0));
	},
	sliderChanging: function(inSender, inEvent) {
		this.$.result.setContent(inSender.name + " changing: " + Math.round(inEvent.value));
	},
	sliderChanged: function(inSender, inEvent) {
		this.$.result.setContent(inSender.name + " changed to " + Math.round(inSender.getValue()) + ".");
	},
	customChanging: function(inSender, inEvent) {
		this.sliderChanging(inSender, inEvent);
	},
	customChanged: function(inSender, inEvent) {
		this.sliderChanged(inSender, inEvent);
	}
});
