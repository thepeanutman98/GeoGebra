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
function newGeoFrame(url, hidden = true) {
  document.body.append(document.createElement("iframe")); 
  frame = document.body.lastChild; 
  if (hidden) {
    frame.style.display = "none";
  } 
  frame.src = url; 
  return frame
}
function getGeoApplets(doc = document) {
  var applets = []; 
  for (i in Array.from(doc.getElementsByTagName("applet"))) {
    try {
      var tester = doc.getElementsByTagName("applet")[i].getAttribute("code").indexOf("geogebra")
    } catch (err) {
      var tester = -2
    }; 
    if (tester >= 0) {
      applets.push(doc.getElementsByTagName("applet")[i])
    }
  } 
  return applets
}
function paramsLocalGeoFileToGitHubFile(params) {
  var params2 = params; 
  params2["filename"] = "https://raw.githubusercontent.com/thepeanutman98/GeoGebra-Java-to-HTML5/master/files/" + params2["filename"]; 
  return params2
}
var geoGebraAppletInjectCode = function(params, varName, div) {
  this.defVar = "var " + varName + " = new GGBApplet(" + JSON.stringify(params) + ', true);';
  this.addListener = ';window.addEventListener("load", function(){' + varName + ".inject('" + div + "', 'preferHTML5')});";
  return "var " + varName + " = new GGBApplet(" + JSON.stringify(params) + ', true);window.addEventListener("load", function(){' + varName + ".inject('" + div + "', 'preferHTML5')});"
}
function getRespectiveGeoParams(applets) {
  var params = [];
  for (i in applets) {
    params.push(getGeoParams(applets[i]));
  }
  return params
}
function getRespectiveGeoAppletInjectCode(applets) {
  var code = [];
  var num = 0
  for (i in applets) {
    code.push(geoGebraAppletInjectCode(getGeoParams(applets[i]), "applet" + num, "applet_container" + num));
    num++
  }
  return code
}
function nullTest(str) {
  if (str == null) {
    return ""
  } else {
    return str
  }
}
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
var codes = getRespectiveGeoAppletInjectCode(getGeoApplets(document)); 
var text = "";
for (i in codes) {
  text += codes[i].split(";").join(";\n") + '\n';
  eval(codes[i].split(";")[0]);
} 
document.body.insertAdjacentHTML('afterbegin', '<script type="text/javascript">' + text + '</script>');
document.body.insertAdjacentHTML('afterbegin', '<script src="https://www.geogebra.org/scripts/deployggb.js"></script>');
var num = getGeoApplets(document).length - 1; 
for (i in codes) {
  getGeoApplets(document)[i].outerHTML = '<div id="applet_container' + num + '"></div>'; 
  num--;
  eval(codes[i].split(";")[1].split("{")[1].split("}")[0])
}

})()
  
