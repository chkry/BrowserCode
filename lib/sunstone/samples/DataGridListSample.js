enyo.kind({
	name: "sun.sample.DataGridListSample",
	classes: "enyo-fit data-grid-sample",
	components: [
		{name: "gridList", spacing: 6, minWidth: 100, minHeight: 150, kind: "sun.DataGridList", components: [
			{
				kind: "sun.GridListImageItem",
				source: "./assets/default-music.png",
				bindings: [
					{from: ".model.text", to: ".caption"}
				]
			}
		]}
	],
	create: function () {
		this.inherited(arguments);
		var c = new enyo.Collection();
		for (var $i=0, r$=[]; r$.length<300; ++$i) {
			r$.push({text: "Item " + $i});
		}
		c.add(r$);
		this.$.gridList.set("collection", c);
	}
});
