/**
 * @fileOverView:
 * @author: Srirama Singeri CSP1(Web App Development)
 * @version: v2.0.0
 * @createdDate: 09-01-2014
 * @modifiedDate: 29-04-2014
 */
enyo.kind({
	name: "Safetycare.PalmServiceBridge",
	callService: function(e, t, n) {
		try {
			var i = new PalmServiceBridge;
			i.onservicecallback = n, i.call(e, t)
		} catch (o) {
			console.log(o)
		}
	}
});

// lib/enyo-webos/source/ServiceRequest.js
enyo.kind({name: "enyo.ServiceRequest", kind: enyo.Async, resubscribeDelay: 1e4, published: {service: "", method: "", subscribe: !1, resubscribe: !1}, constructor: function(t) { enyo.mixin(this, t), this.inherited(arguments), void 0 == enyo._serviceCounter ? enyo._serviceCounter = 1 : enyo._serviceCounter++, this.id = enyo._serviceCounter}, go: function(t) { if (!PalmServiceBridge) return this.fail({errorCode: -1, errorText: "Invalid device for Palm services. PalmServiceBridge not found."}), void 0; this.params = t || {}, this.bridge = new PalmServiceBridge, this.bridge.onservicecallback = this.clientCallback = enyo.bind(this, "serviceCallback"); var e = this.service; return this.method.length > 0 && ("/" != e.charAt(e.length - 1) && (e += "/"), e += this.method), this.subscribe && (this.params.subscribe = this.subscribe), this.bridge.call(e, enyo.json.stringify(this.params)), this}, cancel: function() { this.cancelled = !0, this.responders = [], this.errorHandlers = [], this.resubscribeJob && enyo.job.stop(this.resubscribeJob), this.bridge && (this.bridge.cancel(), this.bridge = void 0)}, serviceCallback: function(t) { var e, i; if (!this.cancelled) { try {e = enyo.json.parse(t)} catch (n) { var i = {errorCode: -1, errorText: t}; return this.serviceFailure(i), void 0}e.errorCode || e.returnValue === !1 ? this.serviceFailure(e) : this.serviceSuccess(e)}}, serviceSuccess: function(t) { var e = void 0; this.responders.length > 0 && (e = this.responders[0]), this.respond(t), this.subscribe && e && this.response(e)}, serviceFailure: function(t) { var e = void 0; this.errorHandlers.length > 0 && (e = this.errorHandlers[0]), this.fail(t), this.resubscribe && this.subscribe && (e && this.error(e), this.resubscribeJob = this.id + "resubscribe", enyo.job(this.resubscribeJob, enyo.bind(this, "goAgain"), this.resubscribeDelay))}, goAgain: function() { this.go(this.params)}});
/*//source/apps/Mockup.js
if(!window.PalmSystem&&!window.__MashUp_LunaService){var PREFIX_PALM="palm://",PREFIX_LUNA="luna://";this.PalmSystem=function(){},this.__MashUp_callbacks={},this.__MashUp_LunaServiceCallback=function(t,e,n){var i;console.log("__MashUp_LunaServiceCallback "+t+" data: "+JSON.stringify(e)),i=__MashUp_callbacks[t],n||delete __MashUp_callbacks[t],i(JSON.stringify(e))},this.PalmServiceBridge=function(){},this.PalmServiceBridge.prototype={call:function(t,e){var n=JSON.parse(e);switch(t){case"luna://com.webos.settingsservice/getSystemSettings":return this.onservicecallback(this.getSystemSettings(n));case"luna://com.lge.settingmanager/setPreference":return this.onservicecallback(this.setPreference(n))}var i=t.replace(PREFIX_LUNA,"mockup/").replace(PREFIX_PALM,"mockup/"),o=new enyo.Ajax({url:i+".json"});return o.response(function(t,e){this.onservicecallback(JSON.stringify(e))}.bind(this)),o.go()},getSystemSettings:function(t){var e={settings:{},category:t.category,method:"getSystemSettings",returnValue:!0};return t.keys?t.keys.forEach(function(n){e.settings[n]=this.dummySystemSettings[t.category][n]}.bind(this)):e.settings=this.dummySystemSettings[t.category],JSON.stringify(e)},setPreference:function(t){return t.keys&&t.keys.forEach(function(e){this.dummySystemSettings[t.category][e]=t[e]}.bind(this)),JSON.stringify({returnValue:!0,errorText:"Error"})},dummySystemSettings:{Network:{wifiEnable:!0,nfcEnable:!0,bluetoothEnable:!0,hideOutOfRangeNetworkEnable:!0},AirplaneMode:{airplaneModeEnable:!1},TelephonyData:{dataRoaming:!1},Media:{amplitude:30,duration:30,mediaVolume:30,notiVolume:30,period:30,ringToneVolume:30,ringer:!1,vibrate:!1,touchSoundEnable:!0,ringTonePath:"/media/internal/Pablo Casals - Pablo Casals Special Edition - 01 - No1 In C Major Bwv 1007 Prelude (Moderato).mp3",notiSoundPath:"/media/internal/Pablo Casals - Pablo Casals Special Edition - 01 - No1 In C Major Bwv 1007 Prelude (Moderato).mp3"}}}}*/