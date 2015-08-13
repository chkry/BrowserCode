/**
* _sun.Panels_ extends [enyo.Panel]{@link http://enyojs.com/docs/latest/api.html#enyo.Panels}.
* By default, controls added to a _sun.Panels_ are instances of {@link sun.Panel}.
*
* @class sun.Panels
* @extends enyo.Panels
* @public
*/

enyo.kind(
	/** @lends sun.Panels.prototype */ {

	/**
	* @private
	*/
	name: 'sun.Panels',

	/**
	* @private
	*/
	kind: 'enyo.Panels',

	/**
	* @private
	*/
	classes: 'sun-panels',

	/**
	* @private
	*/
	defaultKind: "sun.Panel",

	/**
	* Default to using {@link enyo.CarouselArranger}
	*
	* @private
	*/
	arrangerKind: "CarouselArranger",

	/**
	* Flag for blocking consecutive push/pop/replace panel actions to protect
	* create/render/destroy time.
	*
	* @private
	*/
	isModifyingPanels: false,

	/**
	* Creates a panel on the top of the stack, and increments the panel index
	* to have the created panel selected.
	*
	* @param {Object} inInfo - Control to add to this _sun.Panels_.
	* @param {Object} inMoreInfo - Additional properties to be applied as default values of the created panel.
	* @return {Object} The instance of the panel that was created on the top of the stack.
	* @public
	*/
	pushPanel: function(inInfo, inMoreInfo) { // added
		if (this.isModifyingPanels) {return null;}
		this.isModifyingPanels = true;
		var lastIndex = this.getPanels().length - 1,
			oPanel = this.createComponent(inInfo, inMoreInfo);
		oPanel.render();
		this.reflow();
		oPanel.resize();
		this.setIndex(lastIndex+1);
		this.isModifyingPanels = false;
		return oPanel;
	},

	/**
	* Creates multiple panels at the top of the stack and increments the panel index
	* to have the lastly created panel selected.
	*
	* @param {Object[]} inInfos - Controls to add to this _sun.Panels_.
	* @param {Object} inCommonInfo - Additional properties to be applied as default values of the created panels.
	* @return {null|Object[]} Array of the panels that were created at the top of the stack.
	* If no panels could have been created, `null` is returned.
	* @public
	*/
	pushPanels: function(inInfos, inCommonInfo) { // added
		if (this.isModifyingPanels) {return null;}
		this.isModifyingPanels = true;
		var lastIndex = this.getPanels().length - 1,
			oPanels = this.createComponents(inInfos, inCommonInfo),
			nPanel,
			oPanelsLength = oPanels.length;

		for (nPanel = 0; nPanel < oPanelsLength; ++nPanel) {
			oPanels[nPanel].render();
		}

		this.reflow();

		for (nPanel = 0; nPanel < oPanelsLength; ++nPanel) {
			oPanels[nPanel].resize();
		}
		this.setIndex(lastIndex+1);
		this.isModifyingPanels = false;
		return oPanels;
	},

	/**
	* Destroys the panels with index that is greater than or equal to the given index value.
	*
	* @param {Number} inIndex - Index at which to start destroying panels.
	* @public
	*/
	popPanels: function(inIndex) {
		if (this.isModifyingPanels) {return;}
		this.isModifyingPanels = true;
		var panels = this.getPanels();
		inIndex = inIndex || panels.length - 1;

		while (panels.length > inIndex && inIndex >= 0) {
			panels[panels.length - 1].destroy();
		}
		this.isModifyingPanels = false;
	},

	/**
	* Destroys the panel with the given index and creates a panel in-place without transition effect.
	*
	* @param {Number} index - Index of the panel to destroy.
	* @param {Object} inInfo - Created control in place.
	* @param {Object} inMoreInfo - Additional properties to be applied as default values of the created panel.
	* @public
	*/
	replacePanel: function(index, inInfo, inMoreInfo) {
		if (this.isModifyingPanels) {return;}
		this.isModifyingPanels = true;
		var oPanel = null,
			oPanelsLength = this.getPanels().length;

		if (oPanelsLength > index) {
			this.getPanels()[index].destroy();
			if (oPanelsLength > index) {
				inMoreInfo = enyo.mixin({addBefore: this.getPanels()[index]}, inMoreInfo);
			}
		}
		oPanel = this.createComponent(inInfo, inMoreInfo);
		oPanel.render();
		this.resize();
		this.isModifyingPanels = false;
	},


	/**
	* Finds and returns the panel index of the given control. Returns -1 if no panel is found.
	*
	* @param {Object} oControl - A control to get the index for.
	* @return {Number} Panel index of the given control. If no panel is found, -1 is returned.
	* @public
	*/
	getPanelIndex: function(oControl) {
		var oPanel = null;
		while (oControl.parent) {
			// Parent of a panel can be a client or a panels.
			if (oControl.parent === this.$.client || oControl.parent === this) {
				oPanel = oControl;
				break;
			}
			oControl = oControl.parent;
		}
		if (oPanel) {
			for (var n=0; n<this.getPanels().length; n++) {
				if (this.getPanels()[n] == oPanel) {
					return n;
				}
			}
		}
		return -1;
	},

	/**
	* Checks whether the given control is a child panel of this Panels instance.
	*
	* @param {Object} inControl - A panel control.
	* @return {Boolean} `true` if the given control is a child panel of this Panels instance.
	* @public
	*/
	isPanel: function(inControl) {
		for (var n=0; n<this.getPanels().length; n++) {
			if (this.getPanels()[n] == inControl) {
				return true;
			}
		}
		return false;
	}
});
