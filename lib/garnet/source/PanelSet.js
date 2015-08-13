(function (enyo, g, scope) {
	/**
	* _g.PanelSet_ kind is designed as a simple application layout for common use cases.
	* In _g.PanelSet_, child controls are treated as they are in an indexed array,
	* and _only one_ of the child controls is considered to be active at any given time.
	* The active child control is set using the `setIndex()` method.
	* To make the next or previous child control active,
	* use the [next()]{@link g.PanelSet#next} or [previous()]{@link g.PanelSet#previous} methods.
	*
	* @class g.PanelSet
	* @public
	*/
	enyo.kind(
		/** @lends g.PanelSet.prototype */ {

		/**
		* @private
		*/
		name: "g.PanelSet",

		/**
		* @private
		*/
		published:
			/** @lends g.PanelSet.prototype */ {

			/**
			* Index of the active panel.
			*
			* Range: [0-(Number of panels - 1)]
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			index: 0,

			/**
			* Indicates whether or not the child panels "wrap around"
			* when moving past the first panel or the last panel.
			*
			* Range: [`true`, `false`]
			*
			* - `true`: Wrap around is enabled.
			* - `false`: Wrap around is disabled.
			*
			* @type {Boolean}
			* @default true
			* @private
			*/
			wrapEnabled: false,

			/**
			* Indicates whether to set the layer effect animation for the panels inside this PanelSet.
			*
			* Range: [`true`, `false`]
			*
			* - `true`: The layer effect animation is enabled for all the panel components in this PanelSet.
			* - `false`: The layer effect animation is disabled all the panel components in this PanelSet.
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			layerEffect: false,

			/**
			* Indicates whether to animate panels when a panel is swiped.
			*
			* Range: [`true`, `false`]
			*
			* - `true`: Animation effect is enabled when a panel is swiped.
			* - `false`: Animation effect is disabled when a panel is swiped.
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			animating: true,

			/**
			* Indicates whether this PanelSet uses a PageIndicator.
			* If the child of this PanelSet sets the `pageIndicatorDisable` property to `true`,
			* the page indicator is hidden when the child is shown.
			*
			* Range: [`true`, `false`]
			*
			* - `true`: Enable the pageindicator integration
			* - `false`: Disable the pageindicator
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			pageIndicator: false,

			/**
			* Page index of the currently viewed page. Displayed as enabled.
			*
			* Range: [0-count]
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			pageIndicatorValue: 0,

			/**
			* Maximum number of indicators. If this value is greater than 1, page indicator is displayed.
			*
			* Range: [0-4]
			*
			* @type {Number}
			* @default 0
			* @public
			*/
			pageIndicatorMax: 0,

			/**
			* Indicates whether to enable animation effect for the PageIndicator.
			*
			* Range: [`true`, `false`]
			*
			* - `true`: Enable the animation effect.
			* - `false`: Disable the animation effect.
			*
			* @type {Boolean}
			* @default true
			* @private
			*/
			pageIndicatorShowing: true,

			/**
			* Facade for the [autoHide]{@link g.PageIndicator#autoHide} property of the embedded
			* {@link g.PageIndicator}.
			*
			* Range: [`true`, `false`]
			*
			* - `true`: The PageIndicator of this PanelSet gets hidden automatically.
			* - `false`: The PageIndicator of this PanelSet does not get hidden automatically.
			*
			* @type {Boolean}
			* @default false
			* @private
			*/
			autoHidePageIndicator: false,

			/**
			* Indicates whether to set this PanelSet's page indicator index
			*
			* Range: [`true`, `false`]
			*
			* - `true`: Set the page indicator's index to the currently viewing panel's index.
			* - `false`: Auto-indexing is disabled.
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			autoPageIndicatorControl: true,
			/**
			* Name of the transition effect that is applied when the current panel of this PanelSet is swiped.
			*
			* Range: [`"move-transition"`, `"depth-transition"`]
			*
			* @type {String}
			* @default 'depth-transition'
			* @public
			*/
			effect: "depth-transition",

			/**
			* If true, {@link g.PanelSet} generates "onAppResume" evnet when "onvisibilitychange" occurs
			*
			* Range: [`true`, `false`]
			*
			* - `true`: {@link g.PanelSet} generates "onAppResume" evnet when "onvisibilitychange" occurs
			* - `false`: {@link g.PanelSet} don't generate "onAppResume" evnet when "onvisibilitychange" occurs
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			resume: true
		},

		/**
		* registering handlers for animationend event
		*
		* @private
		*/
		handlers: {
			onanimationend: "animationEnded",
			onwebkitAnimationEnd: "animationEnded",
			onscroll: "preventScroll",
			onEndPanelAnimation: "endPanelAnimation"
		},

		/**
		* Indicates whether to hide the panels that are out of the screen.
		*
		* Range: [`true`, `false`]
		*
		* - `true`: Hide the panels that are out of the screen.
		* - `false`: Hiding is disabled.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		scrollOptimized: false,

		/**
		* SHOULD BE ALWAYS A TRULY VALUE. Used for Panel kinds.
		*
		* @private
		*/
		_panelSetInherited: true,

		/**
		* Panel moving direction.
		*
		* Range: [`true`, `false`]
		*
		* - `true`: Moves to the next panel.
		* - `false`: Moves to the previous panel.
		*
		* @private
		*/
		_direction: true,

		/**
		* false: index is changed via next() or previous()
		* Range: [`true`, `false`]
		*
		* @private
		*/
		_redirect: true,

		/**
		* @private
		*/
		_panelCount: 0,

		/**
		* @private
		*/
		_indexBefore: 0,

		/**
		* @private
		*/
		_panelClasses: "g-panelset-panel",

		/**
		* @private
		*/
		_animationDuration: "0.4s",

		/**
		* _traveseStack traverse the enyo tree
		*
		* @private
		*/
		_traveseStack: [],

		/**
		* _panelChildAnimationTime is total default cycle time for panel children
		*
		* @private
		*/
		_panelChildAnimationTime: 1.8,

		/**
		* _childSpeedFactor speedup the children component speed
		*
		* @private
		*/
		_childSpeedFactor: 2,

		/**
		* check for prototype exceptions
		*
		* @private
		*/
		_prototypeExceptions: {},

		/**
		* _layerEffectEndTimeUID timerUID for layer effect end animation
		*
		* @private
		*/
		_layerEffectEndTimeUID: undefined,

		/**
		* _previousAnimatedPanel checks for previously animated panel
		*
		* @private
		*/
		_previousAnimatedPanel: undefined,

		/**
		*
		* @private
		*/
		classes: "g-panelset",

		/**
		* @private
		*/
		defaultKind: "g.Panel",

		/**
		* @private
		*/
		components: [
			{name: "client", kind: "enyo.Control", classes: "client"},
			{name: "indicator", kind: "enyo.Control", classes: "page-indicator-container"},
			{name: "knob", kind: "enyo.Control"},
			{kind: "Signals", onvisibilitychange: "visibilitychanged"}
		],

		/**
		* @private
		*/
		indicatorTools: [
			{name: "pageIndicator", kind: "g.PageIndicator"}
		],

		/**
		* @private
		*/
		bindings: [
			{from: '.autoHidePageIndicator', to: '.$.pageIndicator.autoHide'}
		],

		/**
		* @method
		* @private
		*/
		initComponents: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this._countPanels();
				if (this.index === undefined || this.index < 0 || this.index >= this._panelCount) {
					this.index = 0;
				}
				if (this.wrapEnabled === undefined) {
					this.wrapEnabled = true;
				}
				if (this.effect === undefined || (this.effect !== "move-transition" && this.effect !== "depth-transition")) {
					this.effect = "depth-transition";
				}
				this._readyEffect();
				this._readyPanelInit();
				this._refreshProtoExceptions();
				this._initAnimationCalculation();
			};
		}),

		/**
		* @method
		* @private
		*/
		create: enyo.inherit(function (sup) {
			return function() {
				/**
				* for the case that a user
				* define his own PanelSet inherited from g.PanelSet with "components" property which includes panels and
				* create his PanelSet as child component.
				*
				* @example
				* 	enyo.kind({
				* 		name: "customPanelSet",
				* 		kind: "g.PanelSet",
				* 		style: "position: relative; background-color: #000000; height: 320px;",
				* 		components: [{name: "panel1", kind: "g.Panel", title : true, titleContent: "One"}]
				* 	});
				*
				* 	enyo.kind({
				* 		name: "g.sample.PanelSetSample",
				* 		classes: "enyo-unselectable garnet g-sample",
				* 		components: [{name: "myPanel", kind: "customPanelSet"}]
				* 	});
				*/
				if (!this.components && this.kindComponents !== enyo.constructorForKind("g.PanelSet").prototype.kindComponents) {
					this.components = this.kindComponents;
					this.kindComponents = enyo.constructorForKind("g.PanelSet").prototype.kindComponents;
				}

				sup.apply(this, arguments);
				this.pageIndicatorChanged();
				this.pageIndicatorShowingChanged();
			};
		}),

		/**
		* @method
		* @private
		*/
		createPageIndicator: function() {
			if (this.pageIndicator && !this.$.pageIndicator) {
				this.$.indicator.createComponents(this.indicatorTools, {
					owner: this,
					value: this.pageIndicatorValue,
					max: this.pageIndicatorMax
				});
				this.pageIndicatorShowingChanged();
			}
		},

		/**
		* @method
		* @private
		*/
		rendered: enyo.inherit(function (sup) {
			return function() {

				// Accessibility - readout title of panel automatically
				var $p = this._getPanels();

				sup.apply(this, arguments);
				enyo.makeBubble(this, "scroll");
				if(this.scrollOptimized && this._getPanels().length > 0){
					this._showHidePanel(this.index);
				}
				this.pageIndicatorShowingChanged();

				// Accessibility - Readout title of panel automatically
				if ($p[0] !== undefined) {
					if ($p[0].titleContent) {
						enyo.readAlert($p[0].titleContent);
					} else {
						enyo.readAlert($p[0].accessibilityHint);
					}
				}
			};
		}),

		/**
		* @method
		* @private
		*/
		preventScroll: function() {
			this.node.scrollLeft = this.node.scrollTop = 0;
		},

		/**
		* @method
		* @private
		*/
		createComponents: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this._countPanels();
				this._readyPanelInit();
				this.pageIndicatorShowingChanged();
			};
		}),

		/**
		* @method
		* @private
		*/
		createComponent: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this._countPanels();
				this._readyPanelInit();
				this.pageIndicatorShowingChanged();
			};
		}),

		/**
		* @method
		* @private
		*/
		destroyClientControls: enyo.inherit(function(sup) {
			return function() {
				sup.apply(this, arguments);
				this.pageIndicatorShowingChanged();
			};
		}),

		/**
		* @private
		*/
		effectChanged: function() {
			this._readyEffect();
		},

		/**
		* @private
		*/
		indexChanged: function(inOld) {
			// Accessibility - readout title of panel automatically
			var $p = this._getPanels();

			if (this.index === undefined || this.index < 0 || this.index >= this._panelCount) {
				this.index = inOld;
				return;
			}

			// nothing changed
			if (this.index === inOld) {
				return;
			}

			// Accessibility - readout title of panel automatically
			if ($p[this.index] !== undefined) {
				if ($p[this.index].titleContent) {
					enyo.readAlert($p[this.index].titleContent);
				} else {
					enyo.readAlert($p[this.index].accessibilityHint);
				}
			}

			this._indexBefore = inOld;
			this._countPanels();
			if (this._redirect) {
				this._direction = (this.index > inOld)? true: false;
			}
			this._redirect = true;
			if(this.scrollOptimized && this._getPanels().length > 0) {
				this._showHidePanel(this.index);
			}
			this._applyEffect(inOld, this.index);

			if (this.autoPageIndicatorControl) {
				this.setPageIndicatorValue(this.index);
			}

			this.pageIndicatorShowingChanged();
		},

		/**
		* @private
		*/
		pageIndicatorChanged: function() {
			this.createPageIndicator();
			if (this.pageIndicator && this.$.pageIndicator) {
				if (!this.$.pageIndicator.hasNode()) {
					this.$.pageIndicator.render();
				}
				this.$.pageIndicator.stopRequestShowHide();
			}
			this.setPageIndicatorShowing(this.pageIndicator);
			return true;
		},

		/**
		* @private
		*/
		pageIndicatorShowingChanged: function() {
			var $p = this._getPanels();
			if (this.$.pageIndicator) {
				if (this.pageIndicatorShowing && $p && $p[this.index] && $p[this.index].pageIndicatorDisable != true) {
					if (this.autoPageIndicatorControl && ($p.length <= 1 && this.pageIndicatorMax <= 1 || this.pageIndicatorMax <=  this.index)) {
						this.$.pageIndicator._hideNoAnimation();
						this.$.indicator.removeClass("fadeout", this.pageIndicator);
					} else {
						this.$.pageIndicator._showNoAnimation();
						this.$.indicator.addClass("fadeout", this.pageIndicator);
					}
				} else {
					this.$.pageIndicator._hideNoAnimation();
					this.$.indicator.removeClass("fadeout", this.pageIndicator);
				}
			}
		},

		/**
		* @private
		*/
		createKonb: function(inPanel, inKnobName) {
			this.$.knob.createComponent({name: inKnobName});
			if (inPanel.$[inPanel.knobConfig.name]) {
				inPanel.$[inPanel.knobConfig.name].destroy();
			}
			this.$.knob.$[inKnobName].createComponent(enyo.clone(inPanel.knobConfig || {}), {owner: inPanel});
			this.$.knob.$[inKnobName].render();
		},

		/**
		* @private
		*/
		endPanelAnimation: function(inSender, inEvent) {
			var $p = this._getPanels();

			if (this.index !== undefined && this.index >= 0 && this.index < this._panelCount && $p[this.index]) {
				$p[this.index].waterfall("onEndPanelAnimation", {effect: inEvent.effect, direction: inEvent.direction});
				return true;
			}
		},

		/**
		* Update pageIndicatorValue and pageIndicatorMax when autoPageIndicatorControl equals true
		*
		* @public
		*/
		updatePageIndicatorValueMax: function() {
			var $p = this._getPanels();

			if (this.autoPageIndicatorControl) {
				if (this.pageIndicatorMax > $p.length) {
					this.pageIndicatorMax = $p.length;
					this.pageIndicatorValueChanged();
				}
				if (this.pageIndicatorValue > this.pageIndicatorMax) {
					this.pageIndicatorValue = 0;
					this.pageIndicatorMaxChanged();
				}
			}
		},

		/**
		* @private
		*/
		pageIndicatorValueChanged: function() {
			this.$.pageIndicator && this.$.pageIndicator.setValue(this.pageIndicatorValue);
			this.pageIndicatorShowingChanged();
		},

		/**
		* @private
		*/
		pageIndicatorMaxChanged: function() {
			if (this.pageIndicatorMax > 4) {
				this.pageIndicatorMax = 4;
			}
			this.$.pageIndicator && this.$.pageIndicator.setMax(this.pageIndicatorMax);
			this.pageIndicatorShowingChanged();
		},

		/**
		* Selects the named component owned by the PanelSet and returns its index.
		*
		* @param  {String} inPanelName - Name of the panel to be selected.
		* @returns {Number|null} The index of the selected panel. If there is no panel with the name (inPanelName), null is returend.
		* @public
		*/
		selectPanelByName: function(inPanelName) {
			var $i;
			var $p = this._getPanels();

			if (!inPanelName) {
				return;
			}

			for ($i = 0; $i < $p.length; ++$i) {
				if ($p[$i].name === inPanelName) {
					this.setIndex($i);
					return $i;
				}
			}

			return null;
		},

		/**
		* Makes the next panel active.
		* If _wrapEnabled_ is true and the current active panel is the last panel, the first panel will be active.
		* It fires onLayerEffectEnd for current panel and onLayerEffectStart for the next panel for "depth-transition" effect.
		*
		* @returns {Number} next panel index
		* @public
		*/
		next: function() {
			var i;

			this._countPanels();
			if (this._panelCount === 0) {
				return;
			}

			i = this._getReadyPanelIndex(this.index, true);
			if (i === -1) {
				return;
			} else {
				/* if Panel effect is "depth-transition" then apply Transition layer effect to next panel */
				if ((this.effect ==="depth-transition") && (this.layerEffect === true)) {
					this._refreshProtoExceptions();
					this._startNextAnimation(i);
					var $p = this._getPanels();

					if(this._layerEffectEndTimeUID){
						clearTimeout(this._layerEffectEndTimeUID);
						this._previousAnimatedPanel && $p[this._previousAnimatedPanel] && $p[this._previousAnimatedPanel].waterfallDown("onLayerEffectEnd");
						this._layerEffectEndTimeUID =undefined;
					}

					$p[i].waterfallDown("onLayerEffectStart");

					this._previousAnimatedPanel = i;

					var resetPanel = function () {
						$p[i].waterfallDown("onLayerEffectEnd");
						this._layerEffectEndTimeUID = undefined;
					};

					this._layerEffectEndTimeUID = setTimeout(resetPanel, (this._panelChildAnimationTime) * 1000);
				}
				var _setNextIndexDelay = function() {
					this._direction = true;
					this._redirect = false;
					this.setIndex(i);
				};
				/*setting time out for 10 ms to setIndex to make effect more clear*/
				if ((this.effect ==="depth-transition") && (this.layerEffect === true)) {

					setTimeout(enyo.bind(this, _setNextIndexDelay), 10);
				}
				else{
					this._direction = true;
					this._redirect = false;
					this.setIndex(i);
				}
				return i;
			}
		},

		/**
		* Makes the previous panel active.
		* If _wrapEnabled_ is true and the current active panel is the first panel, the last panel will be active.
		* It fires onLayerEffectEnd for current panel and onLayerEffectStart for the previous panel for "depth-transition" effect.
		*
		* @returns {Number} previous panel index
		* @public
		*/
		previous: function() {
			var i;

			this._countPanels();
			if (this._panelCount === 0) {
				return;
			}

			i = this._getReadyPanelIndex(this.index, false);
			if (i === -1) {
				return;
			} else {
				/*if Panel effect is "depth-transition" then apply Transition layer effect to previous panel */
				if ((this.effect ==="depth-transition") && (this.layerEffect === true)) {

					this._refreshProtoExceptions();
					this._startPrevsAnimation(i);
					/* if component having its own animation then stop it animation for some time ,
					and start once panel transition effect animation completed on panel*/

					var $p = this._getPanels();
					var animatedPanel = (i + 1) % this._panelCount;

					if(this._layerEffectEndTimeUID){
						clearTimeout(this._layerEffectEndTimeUID);
						this._previousAnimatedPanel && $p[this._previousAnimatedPanel] && $p[this._previousAnimatedPanel].waterfallDown("onLayerEffectEnd");
						this._layerEffectEndTimeUID = undefined;
					}

					$p[animatedPanel].waterfallDown("onLayerEffectStart");

					this._previousAnimatedPanel = animatedPanel;
					var resetPanelPrev = function (){
						$p[animatedPanel].waterfallDown("onLayerEffectEnd");
						this._layerEffectEndTimeUID = undefined;
					};
					this._layerEffectEndTimeUID = setTimeout(resetPanelPrev, (this._panelChildAnimationTime) * 1000);
				}
				var _setPreIndexDelay = function() {
					this._direction = false;
					this._redirect = false;
					this.setIndex(i);

				};
				/*setting time out for 500 ms so animation will start first then panel transistion
				*/
				if ((this.effect ==="depth-transition") && (this.layerEffect === true)) {

					setTimeout(enyo.bind(this, _setPreIndexDelay), 500);
				} else {
					this._direction = false;
					this._redirect = false;
					this.setIndex(i);
				}
				return i;
			}
		},

		/**
		* @private
		*/
		_getPanels: function() {
			var p = this.controlParent || this;
			return p.children;
		},

		/**
		* @private
		*/
		_countPanels: function() {
			this._panelCount = this._getPanels().length;
		},

		/**
		* @private
		*/
		_readyPanelInit: function() {
			var $i, $p, effect, count;
			effect = this.effect;
			count = this._panelCount;

			if (count > 0) {
				if (effect === undefined || (effect !== "move-transition" && effect !== "depth-transition")) {
					effect = "depth-transition";
				}
				$p = this._getPanels();
				// set an effect for all panels.
				for ($i = 0; $i < $p.length; ++$i) {
					$p[$i].addRemoveClass(this._panelClasses, true);
					$p[$i].addRemoveClass(effect, true);
					if ($i !== this.index) {
						$p[$i].triggerHandler("onPreparePanelAnimation");
						this._applyAnimationHiddenAtStart($p[$i]);
					}
				}
			}
			if (this.autoPageIndicatorControl) {
				this.setPageIndicatorMax(count);
			}
		},

		/**
		* @private
		*/
		_readyEffect: function() {
			var effect = this.effect;
			if (effect === undefined || (effect !== "move-transition" && effect !== "depth-transition")) {
				effect = "depth-transition";
			}
			if (this.animating) {
				this.animationHiddenAtStart = "panel-hidden forwards " + this._animationDuration;
			} else {
				this.animationHiddenAtStart = "panel-hidden forwards 0s";
			}
			this.animationFromNext = effect + "-from-next";
			this.animationFromPrevious = effect + "-from-previous";
			this.animationToNext = effect + "-to-next";
			this.animationToPrevious = effect + "-to-previous";
		},

		/**
		* @private
		*/
		_resetOtherPanels : function() {
			//reset other panels effect is card effect
			if (this.effect == "depth-transition") {
				var $p = this._getPanels();
				var i =0;
				for (i = 0; i < $p.length; i++) {
					if ((i != this._indexBefore)||(i != this.index)) {
						this._applyAnimationHiddenAtStart($p[i]);
					}
				}
			}
		},

		/**
		* @private
		*/
		_applyEffect: function(inOldIndex, inNewIndex) {
			// reset other panels
			this._resetOtherPanels();

			// set an effect for the old current panel.
			this._applyAnimation(this._indexBefore, false, !this._direction);

			var $p = this._getPanels(), PanelSetObj = this;

			// prepare current panel to be hidden
			$p[inOldIndex].triggerHandler("onPreparePanelAnimation");

			// set an effect for the new current panel.
			this._applyAnimation(this.index, true, this._direction);
			$p[this.index].waterfall("onStartPanelAnimation", {effect: this.effect, direction: (inOldIndex < inNewIndex)? "next": "previous"});
		},

		/**
		* @private
		*/
		_applyAnimationHiddenAtStart: function(inChildObj) {
			inChildObj.applyStyle("animation", this.animationHiddenAtStart);
			inChildObj.applyStyle("-webkit-animation", this.animationHiddenAtStart);
		},

		/**
		* @private
		*/
		_applyAnimation: function(inIndex, inIsFrom, inIsNext) {
			var $p = this._getPanels();
			var value;
			if (inIsFrom) {
				if (inIsNext) {
					value = this.animationFromNext;
				} else {
					value = this.animationFromPrevious;
				}
			} else {
				if (inIsNext) {
					value = this.animationToNext;
				} else {
					value = this.animationToPrevious;
				}
			}
			if (this.animating) {
				value += (" forwards " + this._animationDuration);
			} else {
				value += (" forwards 0s");
			}
			$p[inIndex].applyStyle("animation", value);
			$p[inIndex].applyStyle("-webkit-animation", value);
		},

		/**
		* @private
		*/
		_getReadyPanelIndex: function(inIndex, inDirection) {
			var i;
			if (inDirection) {
				if (inIndex < this._panelCount - 1) {
					i = inIndex + 1;
				} else if (this.wrapEnabled) {
					i = 0;
				} else {
					return -1;
				}
			} else {
				if (inIndex > 0) {
					i = inIndex - 1;
				} else if (this.wrapEnabled) {
					i = this._panelCount - 1;
				} else {
					return -1;
				}
			}
			return i;
		},

		/**
		* @private
		*/
		_showHidePanel: function(toIndex) {
			var $p = this._getPanels(),
				leng = $p.length,
				beforeIndex = this._indexBefore,
				i;

			for (i = 0; i < leng; i++) {
				if($p[i] !== undefined) {
					if ( (i != beforeIndex) && (i != toIndex) ) {
						$p[i].setShowing(false);
					} else {
						$p[i].setShowing(true);
					}
				}
			}
		},
		/**
		* start Transition Layer animation for next panel
		*
		* @private
		*/
		_startNextAnimation: function(i) {
			this._traveseStack.length = 0;
			var element = this._getPanels()[i];
			this._removeChildAnimation(element, true);
			this._traveseStack.length = 0;
			this._traverseAndCalculate(element);
			// function to be called to execute next movement animation.
			var _playNextAnimationAfterDelay = function() {
				if (element.layerEffect === true || element.layerEffect === undefined) {
					this._traveseStack.length = 0;
					this._executeChildAnimation(element);
				}
			};
			/*setting time out for 0.5 ms because adding property
			immidetly after removing same class is not working properly*/
			setTimeout(enyo.bind(this, _playNextAnimationAfterDelay), 0.5);
		},

		/**
		* start Transition Layer animation on current panel while going to previous panel
		*
		* @private
		*/
		_startPrevsAnimation: function(i) {
			// remove the previous animation class
			this._traveseStack.length = 0;
			var element = this._getPanels()[i];
			this._removeChildAnimation(element, false);
			// remove the previous animation class
			this._traveseStack.length = 0;
			//removing child animations from current panel
			var currentPanelIndex = (i + 1) % this._panelCount;
			this._traverseAndCalculate(this._getPanels()[currentPanelIndex]);
			this._traveseStack.length = 0;
			this._removeChildAnimation(this._getPanels()[currentPanelIndex], false);
			// function to be called to execute previous movement animation
			var _playPrevAniAfterDelay = function() {
				var animatedPanel = (i + 1) % this._panelCount;
				var animElement = this._getPanels()[animatedPanel];
				if (animElement.layerEffect === true || animElement.layerEffect === undefined) {
					this._traveseStack.length = 0;
					this._executePrevPanelAnimation(animElement);
				}
			};
			/*setting time out for 0.5 ms because adding property
			immidetly after removing same class is not working properly*/
			setTimeout(enyo.bind(this, _playPrevAniAfterDelay), 0.5);
		},

		/**
		* in case of List and Grid find the minimum and maximum index of visible items of view
		*
		* @private
		*/
		_findListMinMaxIndex: function(childArr) {
			var childCount = childArr.length;
			var i, j;
			var result = {isListGrid: false,min: -1,max: -1};
			//check if is list or grid component it has page1 page2 and buffer as child.
			if ((childCount === 3) && ((childArr[0].name === "page1") || (childArr[1].name === "page2") || (childArr[2].name === "buffer"))) {
				for (i = 0; i < childCount; i++) {
					var listChildArr = childArr[i].children;
					var listChildCount = listChildArr.length;
					for (j = 0; j < listChildCount; j++) {

						var itemIndex = listChildArr[j].index;
						//iterate through all child and find min and max index
						if (itemIndex !== undefined && itemIndex !== -1) {

							if (result.min === -1) {
								result.min = itemIndex;
							} else if (itemIndex < result.min) {
								result.min = itemIndex;
							}
							if (result.max === -1) {
								result.max = itemIndex;
							} else if (itemIndex > result.max) {
								result.max = itemIndex;
							}
						}
					}
				}
				//set list/grid found to true
				result.isListGrid = true;
			}
			//return result
			return result;
		},

		/**
		* calculate next and previous movement animation time per child
		*
		* @private
		*/
		_calculateEffectTimePerChild: function(traveseNode,childCount) {
			var timeData = {forwardsTime:0,reverseTime:0};
			// calculate next movement animation time per child
			timeData.forwardsTime = (traveseNode._animationTime / childCount);
			//calculate previous movement animation time per child
			timeData.reverseTime = (traveseNode._reverseAnimationTime / childCount);
			//giving threshold value
			if ((timeData.forwardsTime < (this._panelChildAnimationTime / 4))) {
				timeData.forwardsTime = this._panelChildAnimationTime / 4;
			}
			if ((timeData.reverseTime < (this._panelChildAnimationTime / 4))) {
				timeData.reverseTime = this._panelChildAnimationTime * 2;
			}
			return timeData;
		},

		/**
		* calculate next and previous movement animation time per index item
		*
		* @private
		*/
		_getAniTimePerIndex: function(traveseNode,timeData,i) {
			var animTime = {next:0,previous:0};
			var childCount = traveseNode.children.length;
			var itemIndex = traveseNode.children[i].index;
			var parentMinIndex = traveseNode.listMinAnimIndex;
			// calculate next movement animation time
			var animIndex = i + 1;
			var revanimIndex = childCount-i;
			if ((parentMinIndex !== undefined) && ((itemIndex !== undefined) || (itemIndex !== -1))) {
				animIndex = (itemIndex - parentMinIndex + 1);
				revanimIndex = (traveseNode.listMaxAnimIndex - parentMinIndex) - (itemIndex - parentMinIndex) + 1;
			}
			animTime.next = timeData.forwardsTime * (animIndex / this._childSpeedFactor);
			// calculate previous movement animation time
			animTime.previous = (timeData.reverseTime * revanimIndex);
			return animTime;
		},

		/**
		* Traverse and calculate no of panel and their children and sub children if any,
		* and assign relative time to each panel component and children and sub children so on.
		*
		* @private
		*/
		_traverseAndCalculate: function(traveseNode) {
			if (traveseNode !== undefined) {
				var childArr = traveseNode.children.slice(0);
				var childCount = childArr.length;
				var i;
				var result = {isListGrid:false,min:-1,max:-1};
				var timeData = {forwardsTime:0,reverseTime:0};
				var animTime = {next:0,previous:0};
				if (childCount !== 0) {
					result = this._findListMinMaxIndex(childArr);
					timeData = this._calculateEffectTimePerChild(traveseNode,childCount);
					for (i = 0; i < childCount; i++) {
						var isPrototypeException = this._findPrototypeException(childArr[i]);
							if (!isPrototypeException) {
							animTime = this._getAniTimePerIndex(traveseNode,timeData,i);
							childArr[i]._animationTime = animTime.next;
							// calculate previous movement animation time
							childArr[i]._reverseAnimationTime = animTime.previous;
							if ((childArr[i].layerEffect === true) || (childArr[i].layerEffect === undefined)) {
								if (result.isListGrid === true) {
									childArr[i].listMinAnimIndex = result.min;
									childArr[i].listMaxAnimIndex = result.max;
									childArr[i]._animationTime = traveseNode._animationTime;
									childArr[i]._reverseAnimationTime = traveseNode._reverseAnimationTime;
								}
								this._traveseStack.push(childArr[i]);
							}
						}else{
							this._removeAnimation(childArr[i].parent);

						}
					}
					result = {isListGrid: false,min: -1,max: -1};
				}
				// traverse to next control in tree
				this._traverseAndCalculate(this._traveseStack.pop());
			}
		},

		/**
		* traverse through the panel child tree and execute the animation
		*
		* @private
		*/
		_executeChildAnimation: function(traveseNode) {
			if (traveseNode !== undefined) {
				var childArr = traveseNode.children;
				var childCount = childArr.length;
				var i;
				if (childCount !== 0) {
					for (i = 0; i < childCount; i++) {
						if ((childArr[i].layerEffect === true) || (childArr[i].layerEffect === undefined)) {
							var isPrototypeException = this._findPrototypeException(childArr[i]);
							if (!isPrototypeException) {
								this._traveseStack.push(childArr[i]);
								//if it is not scroller or circle do animate
									if (childArr[i].hasNode()) {
										childArr[i].addClass("g-panelset-depth-transition-card-next-child-effect");
										if (enyo.platform.firefox) {
											childArr[i].hasNode().style.animationDuration = (childArr[i]._animationTime) + "s";
										} else {
											childArr[i].hasNode().style.webkitAnimationDuration = (childArr[i]._animationTime) + "s";
										}
									}
								}
						}
					}
				}
				//traverse through the next panel child in tree
				this._executeChildAnimation(this._traveseStack.pop());
			}
		},

		/**
		* remove the added animation class from the all children of the panel
		*
		* @private
		*/
		_removeChildAnimation: function(traveseNode, dirFlag) {
			if (traveseNode !== undefined) {
				var childArr = traveseNode.children;
				var childCount = childArr.length;
				var i;
				if (childCount !== 0) {
					for (i = 0; i < childCount; i++) {
						var childElement = childArr[i];
						if ((childElement.layerEffect === true) || (childElement.layerEffect === undefined)) {
							this._traveseStack.push(childElement);
							// remove the both animation class from all children
							if (childElement.hasNode()) {
								childElement.removeClass("g-panelset-depth-transition-card-next-child-effect");
								childElement.removeClass("g-panelset-depth-transition-previous-child-effect");
							}
						}
					}
				}
				// travese through next children
				this._removeChildAnimation(this._traveseStack.pop(), dirFlag);
			}
		},

		/**
		* Get panel array and start calculating animation time for children
		*
		* @private
		*/
		_initAnimationCalculation: function() {
			var i, panelArray = this.getClientControls();
			for (i = 0; i < this._panelCount; i++) {
				if ((panelArray[i].layerEffect === true) || (panelArray[i].layerEffect === undefined)) {
					this._traveseStack.push(panelArray[i]);
					panelArray[i]._animationTime = this._panelChildAnimationTime;
					panelArray[i]._reverseAnimationTime = this._panelChildAnimationTime;
				}
			}
			// init calculation of panel child
			this._traverseAndCalculate(this._traveseStack.pop());
		},

		/**
		* _executePrevPanelAnimation Executes the animation for previous panel
		*
		* @private
		*/
		_executePrevPanelAnimation: function(traveseNode) {
			if (traveseNode !== undefined) {
				var childArr = traveseNode.children;
				var childCount = childArr.length;
				var i = 0;
				if (childCount !== 0) {
					for (i = 0; i < childCount; i++) {
						var childElement = childArr[i];
						if ((childElement.layerEffect === true) || (childElement.layerEffect === undefined)) {
							var isPrototypeException = this._findPrototypeException(childArr[i]);
							if (!isPrototypeException) {
								this._traveseStack.push(childElement);
									if (childArr[i].hasNode()) {
										childArr[i].addClass("g-panelset-depth-transition-previous-child-effect");
										if (enyo.platform.firefox) {
											childArr[i].hasNode().style.animationDuration = (childElement._reverseAnimationTime) + "s";
										} else {
											childArr[i].hasNode().style.webkitAnimationDuration = (childElement._reverseAnimationTime) + "s";
										}
									}

							}
						}
					}
				}
				// traverse through child tree
				this._executePrevPanelAnimation(this._traveseStack.pop());
			}
		},

		/**
		* @private
		*/
		_waterfallStopLayerEvent: function() {
			this.waterfallDown("onLayerEffectEnd");
		},

		/**
		* remove animation classes at the animationend event
		*
		* @private
		*/
		animationEnded: function(inSender, inEvent) {
			// handle panel transition animation
			if (inEvent.originator) {
				var direction;
				if (inEvent.animationName === this.animationFromNext) {
					direction = "next";
				} else if (inEvent.animationName === this.animationFromPrevious) {
					direction = "previous";
				}

				if (direction !== undefined) {
					inEvent.originator.waterfall("onEndPanelAnimation", {effect: this.effect, direction: direction});
				}
			}

			// handle layer effect animation
			var childElement = inEvent.originator;
			if (childElement.hasNode()) {
				childElement.removeClass("g-panelset-depth-transition-card-next-child-effect");
				childElement.removeClass("g-panelset-depth-transition-previous-child-effect");
			}

			return true;
		},

		/**
		* @private
		*/
		_removeAnimation:function(element){
			if(element === undefined) return;
			if((element === null) || (element === undefined)||(element.kind == "g.Panel")){
				return;
			}
			element.set("_animationTime", "0");
			element.set("_reverseAnimationTime", "0");
			this._removeAnimation(element.parent);
		},

		/**
		* find if the node have exception prototype
		*
		* @private
		*/
		_findPrototypeException: function(traveseNode) {
			var result = false;
			var i ;
			var proExclength = this._prototypeExceptions.length;
			for (i = 0; i < proExclength; i++) {
				if (this._prototypeExceptions[i].prototype.isPrototypeOf(traveseNode)) {
					return true;
				}
			}
			return result;
		},

		/**
		* checks for prototype exceptions such as  enyo.Popup, g.Popup etc,
		* also checks for runtime prototype exceptions such as g.Arc
		* and do not animate those component example: g.Arc, enyo.Popup, g.Popup,
		* g.WheelDatePickerController, g.WheelPicker, g.WheelSlider, g.WheelSectionListController, g.ScrollerKnob];
		*
		* @private
		*/
		_refreshProtoExceptions: function() {
			this._prototypeExceptions = [g.Arc, enyo.Popup, g.Popup, g.WheelDatePickerController, g.WheelSlider, g.WheelSectionListController, g.ScrollerKnob];
		},

		/**
		* @private
		*/
		visibilitychanged: function() {
			if (this.resume) {
				var $p = this._getPanels();
				$p[this.index] && $p[this.index].waterfall("onAppResume", {type: "onAppResume"});
			}
		}
	});

})(enyo, g, this);
