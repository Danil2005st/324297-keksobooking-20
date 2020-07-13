'use strict';

(function () {
  var map = document.querySelector('.map');
  var infoForm = document.querySelector('.ad-form');
  var infoFormBlocks = infoForm.querySelectorAll('fieldset');
  var infoFormAddress = infoForm.querySelector('#address');
  var mapForm = document.querySelector('.map__filters');
  var mapFormSelects = mapForm.querySelectorAll('select');
  var mapFormBlocks = mapForm.querySelectorAll('fieldset');
  var mainMapPin = document.querySelector('.map__pin--main');
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var mapFadedClass = 'map--faded';
  var formDisabledClass = 'ad-form--disabled';

  var setDisabled = function (list, value) {
    for (var i = 0; i < list.length; i++) {
      if (value) {
        list[i].setAttribute('disabled', '');
      } else {
        list[i].removeAttribute('disabled');
      }
    }
  };

  var activateElements = function () {
    setDisabled(infoFormBlocks, false);
    setDisabled(mapFormSelects, false);
    setDisabled(mapFormBlocks, false);
    map.classList.remove(mapFadedClass);
    infoForm.classList.remove(formDisabledClass);
    infoFormAddress.value = window.pins.getCoordinates(mainMapPin, true);
  };

  var disactivateElements = function () {
    setDisabled(infoFormBlocks, true);
    setDisabled(mapFormSelects, true);
    setDisabled(mapFormBlocks, true);
    map.classList.add(mapFadedClass);
    infoForm.classList.add(formDisabledClass);
    window.pins.remove();

    mainMapPin.addEventListener('click', activatePage);
  };

  var activatePage = function () {
    activateElements();
    window.load(URL, onSuccess, onError);
    mainMapPin.removeEventListener('click', activatePage);
  };

  var onSuccess = function (data) {
    window.filter.onFilterChange(data);
    window.createMapPins(data);
  };

  var onError = function () {
  };

  disactivateElements();
  mainMapPin.addEventListener('click', activatePage);

  window.triggerActive = {
    activateElements: activateElements,
    disactivateElements: disactivateElements
  };
})();
