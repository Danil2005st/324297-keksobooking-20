'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_ARROW_HEIGHT = 22;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');
  var mainPinMaxTop = 130 - MAIN_PIN_HEIGHT - MAIN_PIN_ARROW_HEIGHT;
  var mainPinMaxBottom = 630 - MAIN_PIN_HEIGHT - MAIN_PIN_ARROW_HEIGHT;
  var mainPinMinLeft = 0 - MAIN_PIN_WIDTH / 2;
  var mainPinMaxLeft = map.offsetWidth - MAIN_PIN_WIDTH / 2;

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

      if (mainPin.offsetTop - shift.y < mainPinMaxTop) {
        mainPin.style.top = mainPinMaxTop;
      } else if (mainPin.offsetTop - shift.y > mainPinMaxBottom) {
        mainPin.style.top = mainPinMaxBottom;
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      if (mainPin.offsetLeft - shift.x < mainPinMinLeft) {
        mainPin.style.left = mainPinMinLeft;
      } else if (mainPin.offsetLeft - shift.x > mainPinMaxLeft) {
        mainPin.style.left = mainPinMaxLeft;
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      addressField.value = window.pins.getCoordinates(mainPin, true);
    };

    addressField.value = window.pins.getCoordinates(mainPin, true);

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
