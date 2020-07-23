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
    list.forEach(function(item) {
      if (value) {
        item.setAttribute('disabled', '');
      } else {
        item.removeAttribute('disabled');
      }
    });
  };

  var activateElements = function () {
    setDisabled(infoFormBlocks, false);
    setDisabled(mapFormSelects, false);
    setDisabled(mapFormBlocks, false);
    map.classList.remove(mapFadedClass);
    infoForm.classList.remove(formDisabledClass);
    infoFormAddress.value = window.pins.getCoordinates(mainMapPin, true);
  };

  var deactivateElements = function () {
    setDisabled(infoFormBlocks, true);
    setDisabled(mapFormSelects, true);
    setDisabled(mapFormBlocks, true);
    map.classList.add(mapFadedClass);
    infoForm.classList.add(formDisabledClass);
    window.pins.remove();
    window.card.close();
    window.map.centeringPin();
    window.form.reset();
    mainMapPin.addEventListener('click', activatePage);
  };

  var activatePage = function () {
    activateElements();
    window.load(URL, onSuccess);
    mainMapPin.removeEventListener('click', activatePage);
  };

  var onSuccess = function (data) {
    window.filter.change(data);
    window.map.cretePins(data);
  };
  deactivateElements();
  mainMapPin.addEventListener('click', activatePage);

  window.triggerActive = {
    activate: activateElements,
    deactivate: deactivateElements
  };
})();
