'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_ARROW_HEIGHT = 22;

  window.pin = {
    getCoordinatesMainPin: function (pin, isPageActive) {
      var top = pin.style.top.replace('px', '');
      var left = pin.style.left.replace('px', '');
      var coorX = Math.ceil(left - MAIN_PIN_WIDTH / 2);
      var coorY = isPageActive ? Math.ceil(top - MAIN_PIN_HEIGHT - MAIN_PIN_ARROW_HEIGHT) : Math.ceil(top - MAIN_PIN_HEIGHT / 2);

      return coorX + ', ' + coorY;
    }
  };
})();

