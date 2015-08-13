(function(enyo, g, scope) {
    /**
    * _g.PageIndicator_ is a control that displays the index of the screen on the top of a {@link g.Panel}.
    * The index for the current page is highlighted among the indicators.
    *
    * @class g.PageIndicator
    * @private
    */
    enyo.kind(
        /** @lends g.PageIndicator.prototype */
        {

            /**
            * @private
            */
            name: "g.PageIndicator",

            /**
            * @private
            */
            published:
            /** @lends g.PageIndicator.prototype */
            {

                /**
                * Page index of the currently viewed page. Displayed as enabled.
                * Range: [0-count]
                *
                * @type {Number}
                * @default 0
                * @public
                */
                value: 0,

                /**
                * Maximum number of indicators to display.
                *
                * Range: [0-4]
                *
                * @type {Number}
                * @default 4
                * @public
                */
                max: 4,

                /**
                * Indicates whether to enable automatic hiding of this PageIndicator.
                * If `true`, this PageIndicator gets hidden automatically.
                *
                * Range: [`true`, `false`]
                * - `true`: This PageIndicator is hidden after 2 seconds.
                * - `false`: This PageIndicator is displayed always.
                *
                * @type {Boolean}
                * @default false
                * @private
                */
                autoHide: false
            },

            /**
            * Option to show the indicator over the panel.
            * Range: [true, false], Default: true
            * - true: Indicator is shown over the component.
            * - false: Indicator is not shown over the component.
            *
            * @type {Boolean}
            * @default true
            * @private
            */
            _open: true,

            /**
            * @private
            */
            classes: "g-page-indicator",

            /**
            * @private
            */
            tools: [{
                name: "client",
                kind: "ToolDecorator",
                classes: "g-page-indicator-decorator"
            }, {
                name: "showHideAnimator",
                kind: "g.StyleAnimator",
                onComplete: "animationComplete"
            }],

            /**
            * @method
            * @private
            */
            create: enyo.inherit(function(sup) {
                return function() {
                    sup.apply(this, arguments);

                    this.createComponents(this.tools);
                    this._createIndicators();
                };
            }),

            /**
            * @method
            * @private
            */
            rendered: enyo.inherit(function(sup) {
                return function() {
                    this.valueChanged(this.value);
                    sup.apply(this, arguments);
                };
            }),

            /**
            * @private
            */
            valueChanged: function(inOld) {
                if(this.autoHide) {
                    this.stopJob("show");
                    this.stopJob("hide");
                    this.$.client.removeClass("hide");
                    this._show();
                    this.startJob("hide", this._hide, 2000);
                }
                if (this.value !== undefined && this.value <= this.max) {
                    var children = this.$.client.children;
                    children[inOld] && children[inOld].removeClass("current");
                    children[this.value] && children[this.value].addClass("current");
                } else {
                    var children = this.$.client.children;
                    children[inOld] && children[inOld].removeClass("current");
                }
            },

            /**
            * @private
            */
            maxChanged: function() {
                if(this.max > 4) {

                    this.max = 4;
            	}
                if (this.max !== undefined) {
                    this.$.client.destroyClientControls();
                    this._createIndicators();
                    this.render();
                }
            },

            /**
             * @private
             */
            _createIndicators: function() {
                if(this.max > 4) {
                    this.max = 4;
                }
                for (var i = 0; i < this.max; i++) {
                    this.$.client.createComponent({
                        kind: "Control",
                        classes: "g-page-indicator-icon" + ((this.value == i) ? " current" : "")
                    });
                }

            },

            /**
             * @private
             */
            _hide: function() {
                this._open = false;
                if( this.getStyle() != "opacity: 0;" ) {
                    this.$.showHideAnimator.play(this.createHideAnimation().name);
                }
            },

            /**
             * @private
             */
            _show: function() {
                this._open = true;
                if( this.getStyle() != "opacity: 1;" ) {
                    this.$.showHideAnimator.play(this.createShowAnimation().name);
                }
            },

            /**
             * @private
             */
            _hideNoAnimation: function() {
                this._open = false;
                if( this.getStyle() != "opacity: 0;" ) {
                    this.applyStyle("opacity", "0");
                }
            },

            /**
             * @private
             */
            _showNoAnimation: function() {
                this._open = true;
                if( this.getStyle() != "opacity: 1;" ) {
                    this.applyStyle("opacity", "1");
                }
            },

            /**
             * @private
             */
            createShowAnimation: function() {
                var fadeInOutSet = {
                    open: "1",
                    close: "0"
                };
                return this.$.showHideAnimator.newAnimation({
                    name: "show",
                    duration: 500,
                    timingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                    keyframes: {
                        0: [{
                            control: this,
                            properties: {
                                "opacity": fadeInOutSet.close
                            }
                        }],
                        100: [{
                            control: this,
                            properties: {
                                "opacity": fadeInOutSet.open
                            }
                        }]
                    }
                });
            },

            /**
             * @private
             */
            createHideAnimation: function() {
                var fadeInOutSet = {
                    open: "1",
                    close: "0"
                };
                return this.$.showHideAnimator.newAnimation({
                    name: "hide",
                    duration: 500,
                    timingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                    keyframes: {
                        0: [{
                            control: this,
                            properties: {
                                "opacity": fadeInOutSet.open
                            }
                        }],
                        100: [{
                            control: this,
                            properties: {
                                "opacity": fadeInOutSet.close
                            }
                        }]
                    }
                });
            },

            /**
			* @private
			*/
			eventHandler: function(inSender, inEvent) {
				return this.$.eventDelegate.eventHandler(inSender, inEvent);
			},

            /**
            * @private
            */
            animationComplete: function () {
                this.setStyle();
                if(this._open == true) {
                    this.setStyle("opacity: 1;");
                } else if(this._open == false){
                    this.setStyle("opacity: 0;");
                }
            },

            /**
            * @private
            */
            stopRequestShowHide: function() {
                this.stopJob("show");
                this.stopJob("hide");
            }
        });

})(enyo, g, this);
