(function() {
	addEventListener('DOMContentLoaded', onLoad, false);

	function onLoad() {
		if ( content.document.contentType != 'text/html' ) return;

		// Environment variables
		var sandbox = Components.utils.Sandbox(content);

		sandbox.win = content;

		Components.utils.evalInSandbox('var env = new Array; for ( i in win.wrappedJSObject ) if ( typeof i === "string" ) env.push(i);', sandbox);

		var env = sandbox.env;

		// HTML
		var html = content.document.documentElement.innerHTML

		if ( html.length > 50000 ) html = html.substring(0, 25000) + html.substring(html.length - 25000, html.length);

		sendAsyncMessage('wappalyzer', {
			hostname: content.location.hostname,
			html:     html,
			env:      env,
			url:      content.location.href
			});
	}
})();
