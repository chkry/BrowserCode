enyo.kind({
    name: "Settings.BackkeySignal",
    kind: "enyo.Component",
    //* @protected
    // needed because of early calls to bind DOM event listeners
    // to the enyo.Signals.send call.
    noDefer: true,
    create: enyo.inherit(function (sup) {
        return function() {
            sup.apply(this, arguments);
            Settings.BackkeySignal.addListener(this);
        };
    }),
    destroy: enyo.inherit(function (sup) {
        return function() {
            Settings.BackkeySignal.removeListener(this);
            sup.apply(this, arguments);
        };
    }),
    notify: function(inMsg, inPayload) {
        return this.dispatchEvent(inMsg, inPayload);
    },
    protectedStatics: {
        listeners: [],
        addListener: function(inListener) {
            window.__MashUp_LocalSystem && __MashUp_LocalSystem.setBackkeyBound(true);
            this.listeners.push(inListener);
        },
        removeListener: function(inListener) {
            enyo.remove(inListener, this.listeners);
            if(this.listeners.length === 0) {
                window.__MashUp_LocalSystem && __MashUp_LocalSystem.setBackkeyBound(false);
            }
        }
    },
    statics: {
        send: function(inMsg, inPayload) {
            var i = this.listeners.length-1, r;
            for(; i >= 0; i--) {
                r = this.listeners[i].notify(inMsg, inPayload);
                if(r) break;
            }
            return r;
        }
    }
});