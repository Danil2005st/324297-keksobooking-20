'use strict';

(function () {
  var infoForm = document.querySelector('.ad-form');
  var infoFormRoomNumber = infoForm.querySelector('#room_number');
  var infoFormCapacity = infoForm.querySelector('#capacity');
  var infoFormType = infoForm.querySelector('#type');
  var infoFormPrice = infoForm.querySelector('#price');
  var infoFormTimein = infoForm.querySelector('#timein');
  var infoFormTimeout = infoForm.querySelector('#timeout');

  var validateRooms = function () {
    var rooms = Number(infoFormRoomNumber.value);
    var guest = Number(infoFormCapacity.value);

    if (rooms === 1 && guest !== 1) {
      infoFormCapacity.setCustomValidity('доступно только для 1 гостя');
    } else if (rooms === 2 && guest > 2 || rooms === 2 && guest === 0) {
      infoFormCapacity.setCustomValidity('доступно только для 1 или 2 гостей');
    } else if (rooms === 3 && guest > 3 || rooms === 3 && guest === 0) {
      infoFormCapacity.setCustomValidity('доступно только для 1/2/3 гостей');
    } else if (rooms === 100 && guest !== 0) {
      infoFormCapacity.setCustomValidity('не для гостей');
    } else {
      infoFormCapacity.setCustomValidity('');
    }
  };

  var changePriceRoom = function () {
    var pricePerNight;
    switch (infoFormType.value) {
      case 'flat':
        pricePerNight = 1000;
        break;
      case 'bungalo':
        pricePerNight = 0;
        break;
      case 'house':
        pricePerNight = 5000;
        break;
      case 'palace':
        pricePerNight = 10000;
        break;
    }
    infoFormPrice.setAttribute('min', pricePerNight);
    infoFormPrice.setAttribute('placeholder', pricePerNight);
  };

  var changeTime = function (timeFirst, timeSecond) {
    var options = timeFirst.getElementsByTagName('option');
    for (var i = 0; i < options.length; i++) {
      if (options[i].value === timeSecond.value) {
        options[i].selected = true;
      }
    }
  };

  validateRooms();
  changePriceRoom();
  infoFormRoomNumber.addEventListener('change', validateRooms);
  infoFormCapacity.addEventListener('change', validateRooms);
  infoFormType.addEventListener('change', changePriceRoom);
  infoFormTimein.addEventListener('change', function () {
    changeTime(infoFormTimeout, infoFormTimein);
  });
  infoFormTimeout.addEventListener('change', function () {
    changeTime(infoFormTimein, infoFormTimeout);
  });
})();

