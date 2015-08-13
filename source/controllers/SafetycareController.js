enyo.kind({
	name: "Safetycare.SafetycareController",
	kind: enyo.Controller,
	published: {
		safetycareStatus: "",
		contactNumber: "",
		contactName: "",
		locationAgrees: false,
		newNumber: "",
		eulaStatus: "",
		emergencyName: "",
		emergencyNumber: "",
		emergencyStatus: "",
		safetyNumber: "",
		safetyName: ""
	},
	create: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.getSafetyCareStatus();
			this.getSafetyCareNumber();
			this.getSafetyCareName();
			this.getEulaStatus();
		};
	}),
	components: [
		{name: "safetyCareService", kind: "Safetycare.PalmServiceBridge"}
	],
	closeApplication: function() {
		this.$.safetyCareService.callService("luna://com.webos.applicationManager/closeByAppId", JSON.stringify({"id": "com.lge.app.safetycare"}), enyo.bind(this, function(response) {
		}));
		return true;
	},
	getSafetyCareStatus: function() {
		this.$.safetyCareService.callService("luna://com.webos.settingsservice/getSafetyCareStatus", JSON.stringify({"keys": ["safetycareStatus"], "category": "option", "subscribe": true}), enyo.bind(this, function(response) {
			var parsedResponse = JSON.parse(response);
			if (parsedResponse.returnValue) {
				if (parsedResponse.settings.safetycareStatus === true) {
					this.set("safetycareStatus", true);
				} else {
					this.set("safetycareStatus", false);
				}
			}
		}));
	},
	getSafetyCareNumber: function() {
		this.$.safetyCareService.callService("luna://com.webos.settingsservice/getSafetyCareNumber", JSON.stringify({"keys": ["emergencyContactNumber"], "category": "option", "subscribe": true}), enyo.bind(this, function(response) {
			var parsedResponse = JSON.parse(response);
			if (parsedResponse.returnValue === true) {
				this.set("contactNumber", parsedResponse.settings.emergencyContactNumber);
				this.set("safetyNumber", parsedResponse.settings.emergencyContactNumber);
			}
		}));
	},
	getSafetyCareName: function() {
		this.$.safetyCareService.callService("luna://com.webos.settingsservice/getSafetyCareName", JSON.stringify({"keys": ["emergencyContactName"], "category": "option", "subscribe": true}), enyo.bind(this, function(response) {
			var parsedResponse = JSON.parse(response);
			if (parsedResponse.returnValue === true) {
				this.set("contactName", parsedResponse.settings.emergencyContactName);
				this.set("safetyName", parsedResponse.settings.emergencyContactName);
			}
		}));
	},
	getEulaStatus: function() {
		this.$.safetyCareService.callService("luna://com.webos.settingsservice/getEulaStatus", JSON.stringify({"keys": ["eulaAccepted"], "category": "option"}), enyo.bind(this, function(response) {
			var parsedResponse = JSON.parse(response);
			if (parsedResponse.returnValue === true) {
				this.set("eulaStatus", parsedResponse.settings.eulaAccepted);
				if (parsedResponse.settings.eulaAccepted === false) {
					this.set("safetycareStatus", false);
				} else {
					this.set("safetycareStatus", true);
				}
			}
		}));
	},
	saveSafetyCareStatus: function(status) {
		console.log(status);
		this.$.safetyCareService.callService("luna://com.webos.settingsservice/saveSafetycareStatus", JSON.stringify({"settings": {"safetycareStatus": status}, "category": "option"}), enyo.bind(this, function(response) {
			var parsedResponse = JSON.parse(response);
			if (parsedResponse.returnValue) {
				console.log("safetycareStatus is saved");
			}
		}));
	},
	saveContactDetailsInDB: function(contactNumber, contactName, contactChanged) {
		console.log(contactChanged + ' ' + contactNumber + ' ' + contactName);
		if (contactChanged) {
			this.$.safetyCareService.callService("luna://com.webos.settingsservice/saveContactDetailsInDB", JSON.stringify({"settings": {"emergencyContactNumber": contactNumber, "emergencyContactName": contactName}, "category": "option"}), enyo.bind(this, function(response) {
				var parsedResponse = JSON.parse(response);
				if (parsedResponse.returnValue) {
					console.log("contactNumber is saved");
				}
			}));
		}
		else {
				var obj = this.pickContact();
				console.log(obj);
				safetycare.$.SafetycareController.set("emergencyNumber",safetycare.$.SafetycareController.contactNumber);
				safetycare.$.SafetycareController.set("contactNumber", "");
				safetycare.$.SafetycareController.set("contactName", "");
				if(obj.phone !== "") {
					//console.log("if asf");
					if((/^[a-zA-Z0-9- ]*$/.test(obj.phone) == false)) {
						safetycare.$.SafetycareController.saveSafetycareStatus(false);
						safetycare.$.SafetycareController.set("contactNumber", "");
						safetycare.$.SafetycareController.set("contactName", "");
						safetycare.$.SafetycareController.set("newNumber","");
						safetycare.$.SafetycareController.set("safetycareStatus", false);
					} else {
						safetycare.$.SafetycareController.saveSafetycareStatus(true);
						safetycare.$.mainView.children[0].$.okButton.setDisabled(false)
						safetycare.$.SafetycareController.set("contactNumber", obj.phone);
						safetycare.$.SafetycareController.set("contactName", obj.name);
						safetycare.$.SafetycareController.set("newNumber",obj.phone);
					}
				} else {
					//console.log("else asdfgsdg");
					safetycare.$.SafetycareController.saveSafetycareStatus(false);
					safetycare.$.SafetycareController.set("contactNumber", "");
					safetycare.$.SafetycareController.set("contactName", "");
					safetycare.$.SafetycareController.set("newNumber","");
					safetycare.$.SafetycareController.set("safetycareStatus", false);
				}
			LocalSystem.pickPhoneNumber(function(obj) {
				safetycare.$.SafetycareController.set("emergencyNumber", safetycare.$.SafetycareController.contactNumber);
				safetycare.$.SafetycareController.set("emergencyName", safetycare.$.SafetycareController.contactName);
				safetycare.$.SafetycareController.set("emergencyStatus", 1);
				safetycare.$.SafetycareController.set("contactNumber", "");
				safetycare.$.SafetycareController.set("contactName", "");
				if (obj.phone !== "") {
					if (obj.phone === undefined) {
						safetycare.$.SafetycareController.saveSafetycareStatus(false);
						safetycare.$.SafetycareController.set("contactNumber", "");
						safetycare.$.SafetycareController.set("contactName", "");
						safetycare.$.SafetycareController.set("newNumber", "");
						safetycare.$.SafetycareController.set("safetycareStatus", false);
					} else {
						var formattedNumber = obj.phone.toString();
						formattedNumber = formattedNumber.replace(/[^a-z\d\s\' ']+/gi, "");
						formattedNumber = formattedNumber.replace(/ /g, '');
						safetycare.$.SafetycareController.saveSafetycareStatus(true);
						safetycare.$.mainView.children[0].$.okButton.setDisabled(false)
						safetycare.$.SafetycareController.set("contactNumber", formattedNumber);
						safetycare.$.SafetycareController.set("contactName", obj.name);
						safetycare.$.SafetycareController.set("newNumber", formattedNumber);
						safetycare.$.SafetycareController.set("contactChanged", 1);
					}
				} else {
					//console.log("else asdfgsdg");
					safetycare.$.SafetycareController.saveSafetycareStatus(false);
					safetycare.$.SafetycareController.set("contactNumber", "");
					safetycare.$.SafetycareController.set("contactName", "");
					safetycare.$.SafetycareController.set("newNumber", "");
					safetycare.$.SafetycareController.set("safetycareStatus", false);
				}
				//safetycare.$.SafetycareController.saveContactDetailsInDB(safetycare.$.SafetycareController.contactNumber, safetycare.$.SafetycareController.contactName, 1);
			});
		}
	},
	pickContact: function() {
		return obj = {
			phone: "9059057059",
			name: "CHAKRI REDDY"
		}
	},
	saveSafetycareStatus: function(status) {
		this.$.safetyCareService.callService("luna://com.webos.settingsservice/saveSafetycareStatus", JSON.stringify({"settings": {"safetycareStatus": status}, "category": "option"}), enyo.bind(this, function(response) {
			var parsedResponse = JSON.parse(response);
			if (parsedResponse.returnValue) {
				this.set("safetycareStatus", status)
			}
		}));
	},
	finishActivity: function() {
		LocalSystem.finishActivity()
	},
	launchEula: function() {
		console.log("Launching Eula");
		this.$.safetyCareService.callService("luna://com.lge.watchmanager/startActivityOnPeer", JSON.stringify({"peerIntent": {"action": "com.lge.swp.mashup.action.LOADURL", "extras": {"url": {"type": "string", "value": "file:///usr/palm/applications/com.lge.app.eula/settings/index.html"}}}}), enyo.bind(this, function(response) {
			
		}));
	},
	unregisterReceiver: function() {
		if (this.receiverId) {
			console.log("in unregisterReceiver");
			LocalSystem.unregisterBroadcastReceiver(this.receiverId);
		}
		this.receiverId = null;
	},
	constructed: enyo.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.receiverId = LocalSystem.registerBroadcastReceiver(
				{action: "com.lge.action.EULA_STATUS_CHANGE"},
				enyo.bind(this, function(intent) {
					console.log("in receive Broadcast " + intent.extras.eulaAccepted);
					if (intent.extras.eulaAccepted)
					safetycare.$.SafetycareController.set("eulaStatus", true);
					else
					LocalSystem.finishActivity();
				})
			);
			window.addEventListener('unload', this.unregisterReceiver, false);
		};
	})
});
