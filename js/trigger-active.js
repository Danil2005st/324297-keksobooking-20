'use strict';

var map = document.querySelector('.map');
var infoForm = document.querySelector('.ad-form');
var infoFormBlocks = infoForm.querySelectorAll('fieldset');
var infoFormAddress = infoForm.querySelector('#address');
var mapForm = document.querySelector('.map__filters');
var mapFormSelects = mapForm.querySelectorAll('select');
var mapFormBlocks = mapForm.querySelectorAll('fieldset');
var mainMapPin = document.querySelector('.map__pin--main');
var housingType = [];

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
  map.classList.remove('map--faded');
  infoForm.classList.remove('ad-form--disabled');
  infoFormAddress.value = window.getPinPosition.getCoordinatesMainPin(mainMapPin, true);
};

var activatePage = function () {
  activateElements();
  window.load(onSuccess, onError);
  mainMapPin.removeEventListener('click', activatePage);
};

var updateHousingType = function () {

  var housingTypePlace = housingType.filter(function(it) {

    console.log(it.offer.type, '+++');

    //return it.colorCoat === coatColor;
  });
}

var onSuccess = function (data) {

  housingType = data;
  updateHousingType();

  window.createMapPins(data);
};

var onError = function () {
};

setDisabled(infoFormBlocks, true);
setDisabled(mapFormSelects, true);
setDisabled(mapFormBlocks, true);
infoFormAddress.value = window.getPinPosition.getCoordinatesMainPin(mainMapPin, false);
mainMapPin.addEventListener('click', activatePage);
