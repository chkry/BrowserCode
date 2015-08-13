enyo.kind({
	name: "sun.sample.ListBasicSample",
	kind: "FittableRows",
	classes: "list-sample",
	components: [
		{kind: "sun.Header",title:"Header",name:"header"},
		{
			name: "list",
			kind: "sun.List",
			classes: "list-sample-list enyo-unselectable",
			fit:true,
			multiSelect: false,
			reorderable: true,
			centerReorderContainer: false,
			count: 100,
			onSetupItem: "setupItem",
			onReorder: "listReorder",
			onSetupReorderComponents: "setupReorderComponents",
			components: [
				{name: "item", classes: "list-sample-item", components: [
					{name: "name",style:"display:inline-block;"},
					{name: "checkbox",kind:"sun.Checkbox",style: "clear:both;float:right",onchange:"checkboxChanged",ondown: "checkboxDown"}
				]}
			],
			reorderComponents: [
				{name: "reorderContent", classes: "enyo-fit reorderDragger list-sample-item enyo-border-box", components: [
					{name: "reorderName",style:"display:inline-block;"},
					{name: "reorderCheckbox",kind:"sun.Checkbox",style: "clear:both;float:right"}
				]}
			]
		}
	],
	names: [],
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			// make some mock data if we have none for this row
			for(var i=0;i<this.$.list.count;i++){
				this.names.push({name:"List Item "+i, checked:false});
			}
		};
	}),
	checkboxDown: function(inSender, inEvent) {
        this.$.list.prepareRow(inEvent.index);
        this._changing = inEvent.index;
    },
    checkboxChanged: function(inSender, inEvent) {
		this.names[this._changing].checked = this.$.checkbox.checked;
		this.$.list.lockRow();
	},
	listReorder: function(inSender, inEvent) {
		var movedItem = enyo.clone(this.names[inEvent.reorderFrom]);
		var lastSelected = this.$.list.getSelection().lastSelected;

		this.names.splice(inEvent.reorderFrom,1);
		this.names.splice((inEvent.reorderTo),0,movedItem);

		if(this.$.list.isSelected(inEvent.reorderFrom)) { //reorder selected Item
			this.$.list.deselect(inEvent.reorderFrom);
			this.$.list.select(inEvent.reorderTo);
		}else if(this.$.list.isSelected(inEvent.reorderTo)) { //reorder to selected Item
			this.$.list.deselect(inEvent.reorderTo);
			if(inEvent.reorderFrom > inEvent.reorderTo) {
				this.$.list.select(inEvent.reorderTo+1);
			}else {
				this.$.list.select(inEvent.reorderTo-1);
			}
		}else { // when selected item is between reorderFrom and reorderTo
			if(inEvent.reorderFrom < lastSelected && inEvent.reorderTo > lastSelected) {
				this.$.list.select(lastSelected-1);
			}else if(inEvent.reorderFrom > lastSelected && inEvent.reorderTo < lastSelected) {
				this.$.list.select(lastSelected+1);
			}
		}
		this.$.list.refresh();
	},
	setupReorderComponents: function(inSender, inEvent) {
		var i = inEvent.index;

		if(!this.names[i]) {
			return;
		}
		var n = this.names[i];
		this.$.reorderName.setContent(n.name);
		this.$.reorderCheckbox.setChecked(n.checked);
	},
	setupItem: function(inSender, inEvent) {
		// this is the row we're setting up
		var i = inEvent.index;
		var n = this.names[i];
		// apply selection style if inSender (the list) indicates that this row is selected.
		this.$.item.addRemoveClass("list-sample-selected", inSender.isSelected(i));
		this.$.name.setContent(n.name);
		this.$.checkbox.setChecked(n.checked);
		return true;
	}
});
