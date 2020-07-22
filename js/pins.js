'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_ARROW_HEIGHT = 22;

  var getCoordinates = function (pin, isPageActive) {
    var top = Number(pin.style.top.replace('px', ''));
    var left = Number(pin.style.left.replace('px', ''));
    var coordinateX = Math.ceil(left + MAIN_PIN_WIDTH / 2);
    var coordinateY = isPageActive ? Math.ceil(top + MAIN_PIN_HEIGHT + MAIN_PIN_ARROW_HEIGHT) : Math.ceil(MAIN_PIN_HEIGHT / 2 + top);
    return coordinateX + ', ' + coordinateY;
  };

  var onRemove = function () {
    var pinsList = document.querySelectorAll('[data-opener]');
    pinsList.forEach(function (pin) {
      pin.remove();
    });
  };

  window.pins = {
    getCoordinates: getCoordinates,
    remove: onRemove
  };
})();
