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
  return "var " + varName + " = new GGBApplet(" + JSON.stringify(params) + ', true);window.addEventListener("load", function(){' + varName + ".inject('" + div + "', 'preferHTML5')});"
}
```

```javascript
function getRespectiveGeoParams(applets) {
  var params = [];
  for (i in applets) {
    params.push(getGeoParams(applets[i]));
  }
  return params
}
```

```javascript
function getRespectiveGeoAppletInjectCode(applets) {
  var code = [];
  var num = 0
  for (i in applets) {
    code.push(geoGebraAppletInjectCode(paramsLocalGeoFileToGitHubFile(getGeoParams(applets[i])), "applet" + num, "applet_container" + num));
    num++
  }
  return code
}
```

```javascript
function nullTest(str) {
  if (str == null) {
    return ""
  } else {
    return str
  }
}
```

```javascript
function download(filename, text, encode) {
  var element = document.createElement('a');
  if (encode) {
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));}
  else {
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + text);
  }
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
```

```javascript
var codes = getRespectiveGeoAppletInjectCode(getGeoApplets(frame.contentDocument)); var text = ""; for (i in codes) {console.log(codes[i]); text += codes[i].split(";").join(";\n") + '\n';} frame.contentDocument.body.insertAdjacentHTML( 'afterbegin', '<script type="text/javascript">' + text + '</script>'); frame.contentDocument.body.insertAdjacentHTML( 'afterbegin', '<script src="https://www.geogebra.org/scripts/deployggb.js"></script>'); var num = getGeoApplets(frame.contentDocument).length - 1; for (i in codes) {console.log(i); getGeoApplets(frame.contentDocument)[i].outerHTML = '<div id="applet_container' + num + '"></div>'; num--} download(frame.src.split("/").slice(-1)[0],frame.contentDocument.documentElement.outerHTML,true);
```

Not working:
```javascript
function replaceGeoAppletWithDiv(applet,divName) {
  var applet2 = applet
  applet2.outerHTML = '<div id="' + divName + '"></div>'
  return applet2
}
```
