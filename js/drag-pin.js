'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');

  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_ARROW_HEIGHT = 22;
  var MAIN_PIN_MAX_TOP = 130 - MAIN_PIN_HEIGHT;
  var MAIN_PIN_MAX_BOTTOM = 630 - MAIN_PIN_ARROW_HEIGHT;
  var MAIN_PIN_MIN_LEFT = 0;
  var MAIN_PIN_MAX_LEFT = map.offsetWidth - MAIN_PIN_WIDTH;

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetTop - shift.y < MAIN_PIN_MAX_TOP) {
        mainPin.style.top = MAIN_PIN_MAX_TOP;
      } else if (mainPin.offsetTop - shift.y > MAIN_PIN_MAX_BOTTOM) {
        mainPin.style.top = MAIN_PIN_MAX_BOTTOM;
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      if (mainPin.offsetLeft - shift.x < MAIN_PIN_MIN_LEFT) {
        mainPin.style.left = MAIN_PIN_MIN_LEFT;
      } else if (mainPin.offsetLeft - shift.x > MAIN_PIN_MAX_LEFT) {
        mainPin.style.left = MAIN_PIN_MAX_LEFT;
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

    };

    addressField.value = window.getPinPosition.getCoordinatesMainPin(mainPin, false);

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      addressField.value = window.getPinPosition.getCoordinatesMainPin(mainPin, true);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
