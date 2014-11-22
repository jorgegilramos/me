
  window.Detector = (function(window, document, undefined){
    Detector = {};
    var maxRatio=4.0;
    Detector.supportDevicePixelRatio = function() {
      if (window.matchMedia) {
        var prefixes = "-webkit-min- min--moz- -o-min- -ms-min- -khtml-min- ".split(" ");
        var mediaQuery = "device-pixel-ratio:1.0";
        for (var i=0; i<prefixes.length; i++) {
          if (window.matchMedia("(" + prefixes[i] + mediaQuery + ")").matches) {
            return prefixes[i];
          }
        }
      }
      return undefined;
    }();
    
    Detector.dpr = function() {
      if (Detector.supportDevicePixelRatio) {
        var maxdpr = 1.0;
        var i=1.0;
        for (; i<=maxRatio; i=(i+0.1).toFixed(1)) {
          //console.log("trying dpr: " + i);
          if (!window.matchMedia("(only screen and (" + Detector.supportDevicePixelRatio + "device-pixel-ratio:" + i + "))").matches) {
            break;
          } else {
            maxdpr = i;
          }
        }
        return maxdpr;
      }
      return undefined;
    }();

    Detector.dppx = function() {
      if (window.matchMedia) {
        var maxdppx = 1.0;
        var i=1.0;
        for (; i<=maxRatio; i=(i+0.1).toFixed(1)) {
          console.log("trying dppx: " + i);
          console.log("(only screen and (min-resolution:" + i + "dppx))");
          if (!window.matchMedia("(only screen and (min-resolution:" + i + "dppx))").matches) {
            break;
          } else {
            maxdppx = i;
          }
        }
        return maxdppx;
      }
      return undefined;
    }();
    
    Detector.dpi = Detector.dppx*96;
    //Detector.dpi = function() { return Detector.dppx*96; }();
    
    /*var dpi = function() {
      if (window.matchMedia) {
        for (var i=1.0; i<maxRatio; i+=0.1) {
          if (window.matchMedia("(min-resolution:" + (i*96) + "dpi)").matches) {
            return i*96;
          }
        }
      }
      return undefined;
    }();
    */
    return Detector;
  })(this, this.document);