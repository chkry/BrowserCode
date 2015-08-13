if (!window.PalmSystem) {
    var w = this;
    var responseSet = [
        "luna://com.webos.applicationManager/closeByAppId", "./watch/returns/closeApplication.json",
        "luna://com.webos.settingsservice/getSafetyCareStatus", "./watch/returns/getSafetyCareStatus.json",
        "luna://com.webos.settingsservice/getSafetyCareNumber", "./watch/returns/getSafetyCareNumber.json",
        "luna://com.webos.settingsservice/getSafetyCareName", "./watch/returns/getSafetyCareName.json",
        "luna://com.webos.settingsservice/getEulaStatus", "./watch/returns/getEulaStatus.json",
        "luna://com.webos.settingsservice/saveSafetycareStatus", "./watch/returns/saveSafetyCareStatus.json",
        "luna://com.webos.settingsservice/saveContactDetailsInDB", "./watch/returns/saveContactDetailsInDB.json",
       "luna://com.lge.watchmanager/startActivityOnPeer", "./watch/returns/launchEula.json",
     ];

    function getAJAX(strURL, aParams, fCallback) {
      //  console.log("strURL is : "+strURL + " the aParams is : "+aParams + " fCallback is : "+fCallback);
        var oXHR = new XMLHttpRequest();
        oXHR.open("GET", strURL, true);
        oXHR.onreadystatechange = function() {
            if (this.readyState == 4) {
                var returnValue = this.response;
                fCallback(returnValue);
            }
        };
        oXHR.send();
    };

    console.debug("▶WEB OS SYSTEM API◀ Initializing 'PalmServiceBridge'");
    w.PalmServiceBridge = function() {};
    w.PalmServiceBridge.prototype.call = function(aServiceId, aParams) {
        console.log("The service Id is : " + aServiceId  + " aParams is : " +aParams);
        var nCommandSet = responseSet.indexOf(aServiceId);
        var strServiceName = aServiceId.split("/")[3];
        var strResturnJSON = JSON.stringify({"returnValue":false, "errorCode":-1, "errorText": "Unknown method \"" + strServiceName + "\" for category \"/\""});

        if (nCommandSet >= 0) {
            getAJAX(responseSet[++nCommandSet], aParams, this.onservicecallback);
        } else {
            this.onservicecallback(strResturnJSON);
        }
    };
    w.PalmSystem = {
  deviceInfo: '{ "modelName": "LGE Open webOS Device", "modelNameAscii": "webOS Device", "platformVersion": "3.4.0-gd8a3893-dirty", "platformVersionMajor": 3, "platformVersionMinor": 4, "platformVersionDot": 0, "carrierName": "Unknown", "serialNumber": "Unknown", "screenWidth": 240, "screenHeight": 240, "minimumCardWidth": 240, "minimumCardHeight": 84, "maximumCardWidth": 240, "maximumCardHeight": 216, "touchableRows": 4, "keyboardAvailable": false, "keyboardSlider": false, "keyboardType": "Unknown", "wifiAvailable": false, "bluetoothAvailable": false, "carrierAvailable": false, "coreNaviButton": false, "swappableBattery": false, "dockModeEnabled": true }',
  stageReady: function() {},
  enableFullScreenMode: function() {},

  // Testing for Random Play right after launch
  // launchParams: '{"action": "PLAY_RANDOM"}'

  // Testing for Play All right after launch
  // launchParams: '{"action": "PLAY_ALL"}'

  // Testing for normal launch
  launchParams: ""
 }
    w.PalmServiceBridge.prototype.cancel = function() {};

    console.debug("▶WEB OS SYSTEM API◀ Initializing 'PalmSystem'");
    w.PalmSystem = {
        deviceInfo: '{ "modelName": "LGE Open webOS Device", "modelNameAscii": "webOS Device", "platformVersion": "3.4.0-gd8a3893-dirty", "platformVersionMajor": 3, "platformVersionMinor": 4, "platformVersionDot": 0, "carrierName": "Unknown", "serialNumber": "Unknown", "screenWidth": 240, "screenHeight": 240, "minimumCardWidth": 240, "minimumCardHeight": 84, "maximumCardWidth": 240, "maximumCardHeight": 216, "touchableRows": 4, "keyboardAvailable": false, "keyboardSlider": false, "keyboardType": "Unknown", "wifiAvailable": false, "bluetoothAvailable": false, "carrierAvailable": false, "coreNaviButton": false, "swappableBattery": false, "dockModeEnabled": true }',
        stageReady: function() {},
        enableFullScreenMode: function() {}
    };
}

(function(){
    LocalSystem = {};
    LocalSystem.registerBroadcastReceiver = function(){}
})();

function iframeLoaded() {}

function clickBtnUp() {
    console.log("Up");
}

function clickBtnCenter() {
    console.log("Center");
}

function clickBtnDown() {
    console.log("Down");
}

function function1() {
    console.log("Function1");
}

function function2() {
    console.log("Function2");
}
