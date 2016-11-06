# GeoGebra-Java-to-HTML5
Takes old webpages with embedded GeoGebra applets using Java and replaces it with the new GeoGebra HTML player.

function getGeoParams(applet) {var params = {}; for (i in applet.children) {if (applet.children[i].nodeName === "PARAM") {params[applet.children[i].name] = applet.children[i].value}} if (applet.getAttribute("width") != null) {params["width"] = applet.getAttribute("width")}; if (applet.getAttribute("height") != null) {params["height"] = applet.getAttribute("height")}; return params}

