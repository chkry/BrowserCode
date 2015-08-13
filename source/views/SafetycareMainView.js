enyo.kind({
	name: "Safetycare.SafetycareMainView",
	published: {
		contactChanged: 0
	},
	handlers: {
		onHidden: "hidePopup"
	},
	noFooter: true,
	noHeader: true,
	components: [
		{kind: "sun.Header", title: $L({key: "wd_safetycare_app_title", value: "Safety Care"}), classes: "toggle-header", onclick: "closeApp", showBackButton: false, components: [
			{name: "safetycareStatusToggle", onclick: "downKnob", ondragfinish: "downKnob", kind: "sun.ToggleSwitch"}
		]},
		{name: "emergencyContactNumberBlock", classes: "emergency-number-block", components: [
			{name: "emergencyContactHeader", content: $L({key: "wd_safetycare_emergency_contact_header", value: "Emergency contact"}), classes: "emergency-contact-header"},
			{name: "contactNameBlock", onclick: "editContactNumber", classes: "default-name"},
			{name: "contactNumberBlock", onclick: "editContactNumber", classes: "default-number"}
		]},
		{tag: "hr"},
		{name: "guiImage", classes: "gui-image", size: "large"},
		{name: "safetycareDescription", content: $L({key: "wd_safetycare_app_description", value: "You can press and hold the Back key on watch to call your emergency contact and send them a message with your location."}), classes: "app-description"},
		{name: "locationConsentPopup", kind: "sun.Popup", handlers: {onHide: "popupHided"}, classes: "sun-sample-popup pop-up-class", centered: true, animate: false, components: [
			{kind: "sun.Header", content: $L({key: "wd_safetycare_location_popup_header", value: "Location consent"})},
			{name: "locationConsentPopupBody", classes: "pop-up-content", content: $L({key: "wd_safetycare_location_popup_content", value: "Allow emergency messages to be sent with location info even when Location, Wi-Fi, and Mobile data on watch are off. Charges may apply"})},
			{name: "disagreeButton", kind: "sun.Button", content: $L({key: "wd_safetycare_location_popup_disagree", value: "Disagree"}), classes: "location-consent-pop-up-buttons", ontap: "hideLocationConsentPopup", style: "border-right: 1px solid #AAAAAA;"},
			{name: "agreeButton", kind: "sun.Button", content: $L({key: "wd_safetycare_location_popup_agree", value: "Agree"}), classes: "location-consent-pop-up-buttons", ontap: "hideLocationConsentPopup"}
		],
			popupHided: function(inSender, inEvent) {
				this.bubble("onHidden");
				return false;
			}
		},
		{name: "addContactPopup", kind: "sun.Popup", handlers: {onHide: "popupHided"}, classes: "sun-sample-popup pop-up-class", centered: true, animate: false, components: [
			{kind: "sun.Header", content: $L({key: "wd_safetycare_emergency_contact_header", value: "Emergency contact"})},
			{name: "addContactPopupBody", classes: "pop-up-content", content: $L({key: "wd_safetycare_add_emergency_contact_content", value: "Add contact for emergencies."})},
			{name: "okButton", kind: "sun.Button", content: $L({key: "wd_safetycare_add_emergency_contact_ok", value: "OK"}), classes: "add-contact-popup-button", ontap: "hideaddContactPopup"}
		],
			popupHided: function(inSender, inEvent) {
				this.bubble("onHidden");
				return false;
			}
		},
		{name: "backkeySignal", kind: "Settings.BackkeySignal", onkeypress: "backButtonTapped"}
	],
	bindings: [{
		from: ".app.$.SafetycareController",
		to: "safetycareController"
	}, {
		from: ".safetycareController.safetycareStatus",
		to: ".$.safetycareStatusToggle.active", transform: function(v) {
			if (v === false) {
				this.$.emergencyContactNumberBlock.applyStyle("opacity", 0.5);
			} else if (v === true) {
				this.$.emergencyContactNumberBlock.applyStyle("opacity", 1);
			}
			return v;
		}
	}, {
		from: ".safetycareController.contactNumber",
		to: ".$.contactNumberBlock.content", transform: function(v) {
			console.log("binding triggered" + v + " :: " + this.app.$.SafetycareController.contactNumber);
			if (v === "") {
				return $L({key: "wd_safetycare_add_emergency_contact", value: "Tap to add emergency contact"});
			} else {
				return v;
			}
		}
	}, {
		from: ".safetycareController.contactName",
		to: ".$.contactNameBlock.content"
	},{
		from: ".app.$.SafetycareController.zeroFlag",
		to: "zeroFlag", transform: function(v) {
			if(v === true) {
				var x = this.safetycareController.newNumber;
				console.log(x);
				//x = '0' + x;
				this.safetycareController.set("contactNumber",x);
			}
		}
	}],
	downKnob: function(inSender, inEvent) {
		if (this.safetycareController.eulaStatus === true) {
			if (this.$.safetycareStatusToggle.getActive() === true && !this.safetycareController.locationAgrees) {
				this.$.locationConsentPopup.show();
			} else if (this.$.safetycareStatusToggle.getActive() === true && this.safetycareController.contactNumber === "") {
				this.$.addContactPopup.show();
			} else if (this.$.safetycareStatusToggle.getActive() === true && this.safetycareController.contactNumber !== "") {
				this.safetycareController.saveSafetyCareStatus(true);
				this.$.emergencyContactNumberBlock.applyStyle("opacity", 1);
			} else {
				this.safetycareController.saveSafetyCareStatus(false);
				this.$.emergencyContactNumberBlock.applyStyle("opacity", 0.5);
			}
		} else {
			if (this.$.safetycareStatusToggle.getActive() === true) {
				this.$.locationConsentPopup.show();
				this.safetycareController.launchEula();
			} else if (this.$.safetycareStatusToggle.getActive() === false) {
				this.safetycareController.saveSafetyCareStatus(false);
				this.$.emergencyContactNumberBlock.applyStyle("opacity", 0.5);
			}
		}
	},
	hidePopup: function() {
		this.$.safetycareStatusToggle.setActive(false);
		this.$.safetycareStatusToggle.setAttribute("pressed", false);
	},
	closeApp: function() {
		this.safetycareController.closeApplication();
	},
	saveContactDetails: function() {
		var contactNumber, contactName;
		if (this.$.contactNumberTextBoxBlock.getShowing() === false) {
			contactNumber = this.$.contactNumberBlock.getContent();
			contactName = this.$.contactNameBlock.getContent();
			this.safetycareController.saveContactDetailsInDB(contactNumber, contactName);
		} else {
			contactNumber = this.$.contactNumberTextBox.value;
			this.$.contactNumberBlock.setContent(contactNumber);
			this.$.contactNumberTextBoxBlock.setShowing(false);
			this.$.contactNumberBlock.setShowing(true);
			this.safetycareController.saveContactDetailsInDB(contactNumber, "", this.contactChanged);
			this.set("contactChanged", 0);
		}
	},
	hideLocationConsentPopup: function(inSender, inEvent) {
		if (inSender.name === "disagreeButton") {
			this.$.safetycareStatusToggle.setActive(false);
			this.$.safetycareStatusToggle.setAttribute("pressed", false);
			this.$.locationConsentPopup.hide();
			return;
		} else {
			if (!this.safetycareController.contactNumber) {
				this.$.addContactPopup.show();
				this.$.locationConsentPopup.hide();
				return;
			} else {
				this.$.safetycareStatusToggle.setActive(true);
				this.$.safetycareStatusToggle.setAttribute("pressed", true);
				this.safetycareController.set("safetycareStatus", true);
				this.safetycareController.set("locationAgrees", true);
				this.safetycareController.saveSafetyCareStatus(true);
				this.$.locationConsentPopup.hide();
				this.$.emergencyContactNumberBlock.applyStyle("opacity", 1);
			}
		}
		this.$.safetycareStatusToggle.setActive(true);
		this.$.safetycareStatusToggle.setAttribute("pressed", true);
	},
	hideaddContactPopup: function() {
		this.$.addContactPopup.hide();
		this.safetycareController.set("locationAgrees", true);
		enyo.Signals.send("onAddContact");
		return true;
	},
	editContactNumber: function(inSender, inEvent) {
		console.log("editContactNumber");
		if (this.$.safetycareStatusToggle.$.knob.classes !== "sun-toggle-button-knob off") {
			this.safetycareController.set('contactNumber', this.$.contactNumberBlock.getContent());
			var formattedNumber = this.$.contactNumberBlock.getContent();
			this.safetycareController.set('newNumber', formattedNumber);
			enyo.Signals.send("onAddContact");
			return true;
		}
	},
	backButtonTapped: function() {
		this.safetycareController.finishActivity();
		return true; // MUST return true to block this event come to  background panels
	},
	rendered: function() {
		this.safetycareController.getEulaStatus();
		this.safetycareController.getSafetyCareStatus();
		this.safetycareController.getSafetyCareNumber();
		this.safetycareController.getSafetyCareName();
	}
});
