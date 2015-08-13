(function (enyo, g, scope) {
	var nav = scope.navigator, doc = scope.document;
	/**
	* _initLocaleSpecificFontFamily_ is the API to set the fonts dynamically by locale
	*
	* @private
	*/
	initLocaleSpecificFontFamily = function() {
		var loc, language = "en", region = "US";
		if (scope.ilib) {
			loc = new ilib.Locale();
			language = loc.getLanguage();
			region = loc.getRegion();
		} else if (nav.language) {
			loc = nav.language.split("-");
			if (loc[0] != null)
				language = loc[0];
			if (loc[1] != null)
				region = loc[1];
		}

		var styleId = "garnet-localization-font-override",
			styleElem = doc.getElementById(styleId);

		var buildFontFamilies = function(strLang, strRegion, strDefaultFont) {
			if (strDefaultFont === undefined || strDefaultFont === null) {
				strDefaultFont = "WatchGothic";
			} else if (strDefaultFont.trim() === '') {
				strDefaultFont = "WatchGothic";
			}
			var strOut = '@font-face {\n' +
				'	font-family: "LGDisplay";\n' +
				'	src: local("' + strDefaultFont + '");\n';
			if (window.PalmSystem === undefined) {
				strOut += '	src: url("../fonts/' + strDefaultFont + '-Regular.ttf") format("truetype");\n';
			}
			strOut += '}\n';
			if (strLang === "ja") {
				strOut += '.g-font-family, .g-font-family input, .g-font-family textarea {\n' +
					'	font-family: "LGDisplay", "NotoSansJapanese", "NotoSansSChinese", "NotoSansTChinese", "Android Emoji";\n' +
					'}\n';
			} else if (strLang === "zh" && (strRegion === "HK" || strRegion === "TW")) {
				strOut += '.g-font-family, .g-font-family input, .g-font-family textarea {\n' +
					'	font-family: "LGDisplay", "NotoSansTChinese", "NotoSansSChinese", "Android Emoji";\n' +
					'}\n';
			} else if (strLang === "zh" && strRegion === "CN") {
				strOut += '.g-font-family, .g-font-family input, .g-font-family textarea {\n' +
					'	font-family: "LGDisplay", "NotoSansSChinese", "NotoSansTChinese", "Android Emoji";\n' +
					'}\n';
			} else {
				strOut += '.g-font-family, .g-font-family input, .g-font-family textarea {\n' +
				'	font-family: "LGDisplay", "NotoSansSChinese", "NotoSansTChinese", "Android Emoji";\n' +
				'}\n';
			}

			return strOut;
		};

		if (!styleElem) {
			styleElem = doc.createElement("style");
			styleElem.setAttribute("id", styleId);
			doc.head.appendChild(styleElem);
		}

		var buildHTMLBody = function(fontType) {
			styleElem.innerHTML = buildFontFamilies(language, region, fontType);
			if (doc.body && doc.body.getAttribute("class")) {
				var bodyAttribute = doc.body.getAttribute("class");
				if (bodyAttribute.indexOf("g-font-family") < 0) {
					if (bodyAttribute == "")
						bodyAttribute = "g-font-family";
					else
						bodyAttribute += " g-font-family";
					doc.body.setAttribute("class", bodyAttribute);
				}
			}
		};

		buildHTMLBody("WatchGothic");
	}

})(enyo, g, this);

enyo.ready(function() {
	initLocaleSpecificFontFamily();
});
