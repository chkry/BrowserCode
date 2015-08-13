enyo.kind({
	name: "Safetycare.AddContactView",
	published: {
		contactChanged: 0
	},
	noFooter: true,
	noHeader: true,
	components: [
		{kind: "sun.Header", title: $L({key: "wd_safetycare_emergency_contact_header", value: "Emergency contact"}), classes: "toggle-header", showBackButton: false},
		{name: "emergencyContactNumberBlock", classes: "add-number-block", components: [
			{name: "contactNumberTextBoxBlock", kind: "sun.InputDecorator", showing: true, classes: "input-box", components: [
				{name: "contactNumberTextBox", oninput: "readBackUpPin", kind: "sun.Input", type: "tel", classes: "contact-number-input", placeholder: $L({key: "wd_safetycare_emergency_contact_number", value: "Enter emergency number"})}
			]},
			{name: "addContactButton", kind: "sun.Button", classes: "sun-button-sample add-contact-image", ontap: "saveContactDetails"}
		]},
		{name: "cancelButton", kind: "sun.Button", classes: "cancel-button", content: $L({key: "wd_safetycare_add_emergency_contact_cancel", value: "Cancel"}), ontap: "backToHomeView", style: "border-right: 1px solid #AAAAAA;"},
		{name: "okButton", disabled: true, kind: "sun.Button", content: $L({key: "wd_safetycare_add_emergency_contact_ok", value: "OK"}), classes: "cancel-button add-button", ontap: "saveContact"},
		{name: "backkeySignal", kind: "Settings.BackkeySignal", onkeypress: "backButtonTapped"}
	],
	bindings: [{
		from: ".app.$.SafetycareController",
		to: "safetycareController"
	}, {
		from: ".safetycareController.newNumber",
		to: ".$.contactNumberTextBox.value", transform: function(v) {
			if (undefined === this.$.contactNumberTextBox) {
				console.log("in");
				return v;
			} else {
				console.log("in else");
				this.$.contactNumberTextBox.setValue(v);
			}
			return v;
		}
	}],
	readBackUpPin: function() {
		this.set("contactChanged", 1);
		var numberLength = this.$.contactNumberTextBox.getValue().length;
		if (numberLength < 3 || this.$.contactNumberTextBox.getValue() == "") {
			this.$.okButton.set('disabled', true);
		} else {
			this.$.okButton.set('disabled', false);
		}
		this.set("emergencyNumber", this.$.contactNumberTextBox.getValue());
	},
	backToHomeView: function() {
	var contactNumber = this.safetycareController.contactNumber;
		if (contactNumber === "") {
			this.safetycareController.set("safetycareStatus", false);
			this.safetycareController.saveSafetycareStatus(false);
		} else {
			if (this.safetycareController.emergencyNumber !== "") {
				this.safetycareController.set("contactNumber", this.safetycareController.emergencyNumber);
				this.safetycareController.set("contactName", this.safetycareController.emergencyName);
			} else {
				this.safetycareController.set("contactNumber", contactNumber);
			}
			this.safetycareController.set("newNumber", contactNumber);
			this.safetycareController.set("safetycareStatus", true);
			this.safetycareController.saveSafetycareStatus(true);
			if (this.safetycareController.emergencyNumber === "" && this.safetycareController.emergencyStatus) {
				console.log("in else if");
				this.safetycareController.set("safetycareStatus", false);
				this.safetycareController.saveSafetycareStatus(false);
				this.safetycareController.set("contactNumber", "");
				this.safetycareController.set("contactName", "");
				this.safetycareController.set("newNumber", "");
			}
			console.log(contactNumber);
			console.log(this.safetycareController.contactName);
		this.safetycareController.saveContactDetailsInDB(this.safetycareController.safetyNumber, this.safetycareController.safetyName, 1);
		if (this.safetycareController.safetyNumber === "") {
			this.safetycareController.saveSafetycareStatus(false);
		} else {
			this.safetycareController.saveSafetycareStatus(true);
		}
		setTimeout(function() {
			if (safetycare.$.SafetycareController.safetyNumber === "") {
				safetycare.$.SafetycareController.set("newNumber", "");
			}
		}, 100);
		enyo.Signals.send("onHomeView");
	}
},
	saveContact: function() {
		var contactNumber = this.$.contactNumberTextBox.value;
		if (contactNumber === "") {
			this.safetycareController.saveSafetycareStatus(false);
			this.safetycareController.set("contactNumber", contactNumber);
			this.safetycareController.set("newNumber", contactNumber);
			this.safetycareController.set("safetycareStatus", false);
			this.safetycareController.saveContactDetailsInDB(contactNumber, '', 1);
		} else {
			if (contactNumber == this.safetycareController.newNumber) {
				console.log(this.safetycareController.contactNumber);
				this.safetycareController.set("contactNumber", this.safetycareController.contactNumber);
				this.safetycareController.saveContactDetailsInDB(this.safetycareController.contactNumber, this.safetycareController.contactName, 1);
			} else {
				this.safetycareController.set("contactName", "");
				this.safetycareController.saveContactDetailsInDB(contactNumber, "", 1);
				this.safetycareController.set("contactNumber", contactNumber);
			}
			this.safetycareController.saveSafetycareStatus(true);
			this.safetycareController.set("safetycareStatus", true);
		}
		enyo.Signals.send("onHomeView");
	},
	saveContactDetails: function() {
		var contactNumber, contactName;
		if (this.contactChanged) {
			contactNumber = this.$.contactNumberTextBox.value;
			this.safetycareController.set("contactNumber", contactNumber);
			this.safetycareController.saveContactDetailsInDB(contactNumber, "", contactName);
			enyo.Signals.send("onHomeView");
			return true;
		} else {
			contactNumber = this.$.contactNumberTextBox.value;
			this.safetycareController.set("contactNumber", contactNumber);
			this.safetycareController.saveContactDetailsInDB(contactNumber, "", this.contactChanged);
			this.set("contactChanged", 0);
		}
	},
	editContactNumber: function(inSender, inEvent) {
		if (this.$.safetycareStatusToggle.$.knob.classes !== "sun-toggle-button-knob off") {
			this.$.contactNumberBlock.setShowing(false);
			this.$.contactNameBlock.setShowing(false);
			this.$.contactNumberTextBoxBlock.setShowing(true);
			this.$.contactNumberTextBox.setValue(this.$.contactNumberBlock.getContent());
		}
	},
	backButtonTapped: function() {
		console.log("in backButtonTapped in AddContactView");
		enyo.Signals.send("onHomeView");
		return true;
	},
	rendered: function() {
		if (this.$.contactNumberTextBox.getValue() != "") {
			this.$.okButton.set('disabled', false);
		}
	}
});
