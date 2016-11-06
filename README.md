# GeoGebra-Java-to-HTML5
Takes old webpages with embedded GeoGebra applets using Java and replaces it with the new GeoGebra HTML player.

function getGeoParams(applet) {var params = {}; for (i in applet.children) {if (applet.children[i].nodeName === "PARAM") {params[applet.children[i].name] = applet.children[i].value}} if (applet.getAttribute("width") != null) {params["width"] = applet.getAttribute("width")}; if (applet.getAttribute("height") != null) {params["height"] = applet.getAttribute("height")}; return params}

function newGeoFrame(url) {document.body.append(document.createElement("iframe")); frame = document.body.lastChild; frame.style.display = "none"; frame.src = url; return frame}

function getGeoApplets(doc) {var applets = []; for (i in Array.from(doc.getElementsByTagName("applet"))) {try {var tester = doc.getElementsByTagName("applet")[i].getAttribute("codebase").indexOf("geogebra")} catch (err) {var tester = -2}; if (tester >= 0) {applets.push(doc.getElementsByTagName("applet")[i])}} return applets}

