enyo.kind({
	name: "sun.sample.IconButtonSample",
	classes: "sun enyo-unselectable enyo-fit",
	components: [
		{content: "IconButton normal (48X48)", classes: "sun-sample-font"},
		{style: "height:64px;", components:[
			{kind: "sun.IconButton", src: "../images/btn_setting.svg"},
			{kind: "sun.IconButton", src: "../images/btn_setting.svg", disabled: true}
		]}
	]
});