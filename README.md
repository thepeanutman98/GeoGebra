# GeoGebra-Java-to-HTML5
Takes old webpages with embedded GeoGebra applets using Java and replaces it with the new GeoGebra HTML player.

```javascript
function getGeoParams(applet) {
  var params = {}; 
  for (i in applet.children) {
    if (applet.children[i].nodeName === "PARAM") {
      params[applet.children[i].name] = applet.children[i].value
    }
  } 
  if (applet.getAttribute("width") != null) {
    params["width"] = applet.getAttribute("width")
  }; 
  if (applet.getAttribute("height") != null) {
    params["height"] = applet.getAttribute("height")
  }; 
  return params
}
```

```javascript
function newGeoFrame(url, hidden = true) {
  document.body.append(document.createElement("iframe")); 
  frame = document.body.lastChild; 
  if (hidden) {
    frame.style.display = "none";
  } 
  frame.src = url; 
  return frame
}
```

```javascript
function getGeoApplets(doc = document) {
  var applets = []; 
  for (i in Array.from(doc.getElementsByTagName("applet"))) {
    try {
      var tester = doc.getElementsByTagName("applet")[i].getAttribute("codebase").indexOf("geogebra")
    } catch (err) {
      var tester = -2
    }; 
    if (tester >= 0) {
      applets.push(doc.getElementsByTagName("applet")[i])
    }
  } 
  return applets
}
```

```javascript
function paramsLocalGeoFileToGitHubFile(params) {
  var params2 = params; 
  params2["filename"] = "https://raw.githubusercontent.com/thepeanutman98/GeoGebra-Java-to-HTML5/master/files/" + params2["filename"]; 
  return params2
}
```

```javascript
function geoGebraAppletInjectCode(params, varName, div) {
  return "var " + varName + " = new GGBApplet(" + JSON.stringify(params) + ', true); window.addEventListener("load", function(){' + varName + ".inject('" + div + "', 'preferHTML5')});"
}
```

```javascript
function getRespectiveGeoParams(applets) {
  var params = [];
  for (i in applets) {
    params.push(getGeoParams(applets[i]);
  }
  return params
}
```
