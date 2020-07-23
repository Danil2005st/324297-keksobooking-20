'use strict';

(function () {
  var infoForm = document.querySelector('.ad-form');
  var infoFormRoomNumber = infoForm.querySelector('#room_number');
  var infoFormCapacity = infoForm.querySelector('#capacity');
  var infoFormType = infoForm.querySelector('#type');
  var infoFormPrice = infoForm.querySelector('#price');
  var infoFormTimein = infoForm.querySelector('#timein');
  var infoFormTimeout = infoForm.querySelector('#timeout');
  var URL = 'https://javascript.pages.academy/keksobooking';
  var infoFormReset = infoForm.querySelector('.ad-form__reset');
  var infoFormAddress = infoForm.querySelector('#address');
  var mainMapPin = document.querySelector('.map__pin--main');
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var avatarDefaultImg = avatarPreview.querySelector('img');
  var photoChooser = document.querySelector('.ad-form__input');
  var photoPreview = document.querySelector('.ad-form__photo');

  var onChooseRooms = function () {
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

  var onChangePriceRoom = function () {
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

  var onChangeTime = function (timeFirst, timeSecond) {
    var options = timeFirst.getElementsByTagName('option');
    for (var i = 0; i < options.length; i++) {
      if (options[i].value === timeSecond.value) {
        options[i].selected = true;
      }
    }
  };

  var onSuccess = function () {
    window.triggerActive.deactivate();
    window.message.success();
  };

  var onError = function () {
    window.message.error();
  };

  var onReset = function () {
    window.photo.reset(avatarPreview, avatarDefaultImg);
    window.photo.remove(photoPreview);
    infoForm.reset();
  };

  onChooseRooms();
  onChangePriceRoom();
  infoFormRoomNumber.addEventListener('change', onChooseRooms);
  infoFormCapacity.addEventListener('change', onChooseRooms);
  infoFormType.addEventListener('change', onChangePriceRoom);
  infoFormTimein.addEventListener('change', function () {
    onChangeTime(infoFormTimeout, infoFormTimein);
  });
  infoFormTimeout.addEventListener('change', function () {
    onChangeTime(infoFormTimein, infoFormTimeout);
  });
  infoForm.addEventListener('submit', function (evt) {
    var formData = new FormData(infoForm);
    evt.preventDefault();
    window.load(URL, onSuccess, onError, formData);
  });

  infoFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    onReset();
    window.triggerActive.deactivate();
    infoFormAddress.value = window.pins.getCoordinates(mainMapPin, true);
  });

  avatarChooser.addEventListener('change', function () {
    window.photo.upload(avatarChooser, avatarPreview);
  });

  photoChooser.addEventListener('change', function () {
    window.photo.upload(photoChooser, photoPreview);
  });

  window.form = {
    reset: onReset
  };
})();
