enyo.kind({
	name: "enyo.sample.GridListSample",
	kind: "FittableRows",
	classes: "enyo-unselectable",
	components: [
		{kind: "sun.Header",title:"Header",classes:"toggle-header",components:[
			{classes:"rearrange",ontap:"icTapped"},
			{classes:"viewappby",ontap:"icTapped"}
		]},
		{kind:"FittableColumns",classes:"apps-title",components:[
			{classes:"left-arrow"},
			{fit:true,content:"Apps",classes:"title-content"},
			{classes:"right-arrow"}
		]},
		{fit:true,classes:"watch-wrapper",components:[
			{
				name: "list",
				kind: "sun.GridList",
				centerReorderContainer:false,
				reorderable: true,
				onReorder: "listReorder",
				onSetupReorderComponents: "setupReorderComponents",
				onSetupItem: "setupItem",
				scrollTopSpacing:100,
				scrollBottomSpacing:180,
				pageWidth:208, // To show only two item on each row
				components: [
					{name: "tile", kind: "sun.GridListImageItem", ontap:"appTapped"}
				],
				reorderComponents: [
					{name: "reorderContent", classes: "enyo-fit reorderDragger", components: [
						{name: "reorderTile", kind: "sun.GridListImageItem"}
					]}
				]
			}
		]},
		{classes: "grid-table", style: "width: 100%", components: [
			{classes:"grid-table-cell", components: [
				{name: "cancel", kind: "sun.Button", content: "Cancel", style: "width:100%; height:100%;", ontap: "buttonTapped"}
			]},
			{classes:"grid-table-cell", style:"width:1px", components: [
				{classes: "button-divider"}
			]},
			{classes:"grid-table-cell", components: [
				{name: "ok", kind: "sun.Button", content: "Save", style: "width:100%; height:100%;", ontap: "buttonTapped"}
			]}
		]},
		/*{classes:"button-wrapper",components:[
			{kind: "sun.Button", content: "Cancel",classes:"cancel-button",ontap:"buttonTapped"},
			{kind: "sun.Button", content: "Save",classes:"save-button",ontap:"buttonTapped"}
		]},*/
		{name: "toastpopup", kind: "sun.ToastPopup", showDuration: 2000, content: "Hello toastpopup!"}
	],
	rendered: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.search();
			this.$.list.setItemWidth(76);
			this.$.list.setItemHeight(83);
			this.$.list.setItemSpacing(14);
		};
	}),
	listReorder: function(inSender, inEvent) {
		var movedItem = enyo.clone(this.results[inEvent.reorderFrom]);
		this.results.splice(inEvent.reorderFrom,1);
		this.results.splice((inEvent.reorderTo),0,movedItem);
	},
	setupReorderComponents: function(inSender, inEvent) {
		var i = inEvent.index;
		if(!this.results[i]) {
			return;
		}
		var item = this.results[i];
		if (!item.url_m) {
			return true;
		}
		this.$.reorderTile.setSource(item.url_m);
		this.$.reorderTile.setCaption(item.title);
		this.$.reorderTile.setSelected(this.$.list.isSelected(i));
	},
	search: function() {
		var params = {
			method: "flickr.interestingness.getList",
			format: "json",
			api_key: '2a21b46e58d207e4888e1ece0cb149a5',
			per_page: 50,
			page: 0,
			sort: 'date-posted-desc',
			extras: 'url_m'
		};
		new enyo.JsonpRequest({url: "https://api.flickr.com/services/rest/", callbackName: "jsoncallback"}).response(this, "processFlickrResults").go(params);
	},
	processFlickrResults: function(inRequest, inResponse) {
		this.results = inResponse.photos.photo;
		this.$.list.show(this.results.length);
	},
	setupItem: function(inSender, inEvent) {
		return this.setupFlickrItem(inSender, inEvent);
	},
	setupFlickrItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var item = this.results[i];
		if (!item.url_m) {
			return true;
		}
		this.$.tile.setSource(item.url_m);
		this.$.tile.setCaption(item.title);
		this.$.tile.setSelected(this.$.list.isSelected(i));
		return true;
	},
	toggleChanged: function(inSender, inEvent) {
		if(inEvent.active){
			this.$.toastpopup.hide();
			this.$.toastpopup.setContent("Toggle On!!");
			this.$.toastpopup.show();
		}
	},
	buttonTapped: function(inSender, inEvent) {
		this.$.toastpopup.hide();
		this.$.toastpopup.setContent(inEvent.originator.getContent() +" pressed.");
		this.$.toastpopup.show();
	},
	appTapped: function(inSender, inEvent) {
		this.$.toastpopup.hide();
		this.$.toastpopup.setContent(this.results[inEvent.index].title +" pressed.");
		this.$.toastpopup.show();
	},
	icTapped: function(inSender, inEvent) {
		this.$.toastpopup.hide();
		this.$.toastpopup.setContent(inEvent.originator.getClasses() +" pressed.");
		this.$.toastpopup.show();
	}
});
