
  window.Detector = (function(window, document, undefined){
    Detector = {};
    var maxRatio=4.0;
    var supportDevicePixelRatio = function() {
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
      if (supportDevicePixelRatio) {
        var maxdpr = 1.0;
        for (var i=1.0; i<maxRatio; i+=0.1) {
          if (!window.matchMedia("(" + supportDevicePixelRatio + "device-pixel-ratio:" + i + ")").matches) {
            return maxdpr;
          }
        }
        return maxdpr;
      }
      return undefined;
    }();

    Detector.ddpx = function() {
      if (window.matchMedia) {
        for (var i=1.0; i<maxRatio; i+=0.1) {
          if (window.matchMedia("(min-resolution:" + i + "dppx)").matches) {
            return i;
          }
        }
      }
      return undefined;
    }();
    
    Detector.dpi = Detector.ddpx*96;
    //Detector.dpi = function() { return Detector.ddpx*96; }();
    
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