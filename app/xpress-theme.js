(function() {
	'use strict';
	angular.module('app.cmn.theme').config(config).run(run);
	var primaryPalleteTemp = null;
	var ajax = {};
	config.$inject = [ '$mdThemingProvider' ];
	/* @ngInject */
	function config($mdThemingProvider) {
		console.log(dynamic_theme_url);
		var data = {
			user : null,
			requestContent : null,
			requestType : null
		};
		ajax.post(dynamic_theme_url,
				data, function(res) {
					var obj = JSON.parse(res);
					primaryPalleteTemp = obj.response.data;
				}, false);

		
		if (primaryPalleteTemp != null
				&& primaryPalleteTemp.primaryPallete != undefined
				&& primaryPalleteTemp.baseColor != defaultPrimaryBaseCode) {
			var primary = primaryPalleteTemp.primaryPallete;
			$mdThemingProvider.definePalette('primaryPallete', {
				'50' : primary.shade50,
				'100' : primary.shade100,
				'200' : primary.shade200,
				'300' : primary.shade300,
				'400' : primary.shade400,
				'500' : primary.shade500,
				'600' : primary.shade600,
				'700' : primary.shade700,
				'800' : primary.shade800,
				'900' : primary.shade900,
				'A100' : primary.shadeA100,
				'A200' : primary.shadeA200,
				'A400' : primary.shadeA400,
				'A700' : primary.shadeA700,
				'contrastDefaultColor' : primary.defaultContrast,
				'contrastDarkColors' : [ '50', '100', '200', '300', '400',
						'A100' ],
				'contrastLightColors' : undefined
			// could also specify this if default was 'dark'
			});
			currentPrimaryCode = primary.shade500;
			
		}

		$mdThemingProvider.theme('default').primaryPalette('primaryPallete')
				.accentPalette('purple').warnPalette('red').backgroundPalette(
						'grey');

	}

	run.$inject = [ '$rootScope' ];
	function run($rootScope) {
		$rootScope.currentPrimaryCode = currentPrimaryCode;
	}

	ajax.x = function() {
		if (typeof XMLHttpRequest !== 'undefined') {
			return new XMLHttpRequest();
		}
		var versions = [ "MSXML2.XmlHttp.6.0", "MSXML2.XmlHttp.5.0",
				"MSXML2.XmlHttp.4.0", "MSXML2.XmlHttp.3.0",
				"MSXML2.XmlHttp.2.0", "Microsoft.XmlHttp" ];

		var xhr;
		for ( var i = 0; i < versions.length; i++) {
			try {
				xhr = new ActiveXObject(versions[i]);
				break;
			} catch (e) {
			}
		}
		return xhr;
	};

	ajax.send = function(url, callback, method, data, async) {
		if (async === undefined) {
			async = true;
		}
		var x = ajax.x();

		x.open(method, url, async);

		x.onreadystatechange = function() {
			if (x.readyState == 4) {
				callback(x.responseText)
			}
		};
		if (method == 'POST') {
			x.setRequestHeader('Content-Type', 'application/json');
			x.send(JSON.stringify(data))
		}

	};

	ajax.post = function(url, data, callback, async) {
		ajax.send(url, callback, 'POST', data, async)
	};

})();
