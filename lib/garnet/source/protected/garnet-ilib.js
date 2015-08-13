(function (enyo, g, scope) {
	window.g = window.g || {};
	/**
	* _g.$L_ is a function to map the ilib resource by locale
	*
	* @returns the string value corresponding the key
	* @public
	*/
	if (window.ilib) {
		g.$L = (function() {
			var lfunc = function (string) {
				var str;
				if (!g.$L.rb) {
					g.$L.setLocale();
				}
				if (typeof(string) === 'string') {
					if (!g.$L.rb) {
						return string;
					}
					str = g.$L.rb.getString(string);
				} else if (typeof(string) === 'object') {
					if (typeof(string.key) !== 'undefined' && typeof(string.value) !== 'undefined') {
						if (!g.$L.rb) {
							return string.value;
						}
						str = g.$L.rb.getString(string.value, string.key);
					} else {
						str = "";
					}
				} else {
					str = string;
				}
				return str.toString();
			};
			lfunc.rb = new ilib.ResBundle({
				loadParams: {
					root: '$lib/garnet/resources'
				}
			});
			return lfunc;
		})();
	} else {
		g.$L = function(s) { return s.value; };
	}

})(enyo, g, this);
