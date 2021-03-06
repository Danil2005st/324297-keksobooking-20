'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_ACTIVE = 'map__pin--active';

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainMapPin = document.querySelector('.map__pin--main');
  var pinPosition = mainMapPin.getAttribute('style');

  var centeringPin = function () {
    mainMapPin.setAttribute('style', pinPosition);
  };

  var removeActiveClass = function () {
    var activePin = document.querySelector('.' + PIN_ACTIVE);

    if (activePin) {
      activePin.classList.remove(PIN_ACTIVE);
    }
  };

  var createPinElement = function (pin, index) {
    var newPin = mapPin.cloneNode(true);
    var img = newPin.querySelector('img');
    newPin.setAttribute('data-opener', index);
    newPin.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    newPin.style.top = pin.location.y - PIN_HEIGHT + 'px';
    img.src = pin.author.avatar;
    img.alt = pin.offer.title;

    newPin.addEventListener('click', function () {
      removeActiveClass();
      newPin.classList.add(PIN_ACTIVE);
      window.card.open(pin);
    });
    return newPin;
  };

  var cretePins = function (pins) {
    var pinsList = document.createDocumentFragment();
    var MAX_PINS_COUNT = 5;
    var pinsLength = pins.length > MAX_PINS_COUNT ? MAX_PINS_COUNT : pins.length;

    for (var i = 0; i < pinsLength; i++) {
      pinsList.appendChild(createPinElement(pins[i], i));
    }

    mapPins.appendChild(pinsList);
  };

  window.map = {
    cretePins: cretePins,
    centeringPin: centeringPin,
    removeActiveClass: removeActiveClass
  };
})();
