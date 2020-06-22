'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPinElement = function (pin, index) {
    var newPin = mapPin.cloneNode(true);
    var img = newPin.querySelector('img');
    newPin.setAttribute('data-opener', index);
    newPin.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    newPin.style.top = pin.location.y - PIN_HEIGHT + 'px';
    img.src = pin.author.avatar;
    img.alt = pin.offer.title;


    newPin.addEventListener('click', function () {
      window.insertCards(pin);
    });

    return newPin;
  };

  window.createMapPins = function (pins) {
    var pinsList = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      pinsList.appendChild(createPinElement(pins[i], i));
    }

    mapPins.appendChild(pinsList);
  };
})();
