'use strict';

(function () {
  var infoForm = document.querySelector('.ad-form');
  var infoFormRoomNumber = infoForm.querySelector('#room_number');
  var infoFormCapacity = infoForm.querySelector('#capacity');

  var infoFormTitle = infoForm.querySelector('#title');
  /* var infoFormType = infoForm.querySelector('#type');
  var infoFormPrice = infoForm.querySelector('#price');
  var infoFormAQddress = infoForm.querySelector('#address');
  var infoFormTimein = infoForm.querySelector('#timein');
  var infoFormTimeout = infoForm.querySelector('#timeout');
  var infoFormAvatar = infoForm.querySelector('#avatar');
  var infoFormImages = infoForm.querySelector('#images');*/

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

  var validateTitle = function () {

    if (infoFormTitle.value.length < 30) {
      infoFormCapacity.setCustomValidity('Длина заголовка должна быть больше 30 символов');
    } else if (infoFormTitle.value.length >= 100) {
      infoFormCapacity.setCustomValidity('Длина заголовка должна быть меньше 100 символов');
    } else {
      infoFormCapacity.setCustomValidity('');
    }
  };

  var infoFormRoomNumber = infoForm.querySelector('#room_number');
  var infoFormCapacity = infoForm.querySelector('#capacity');

  validateRooms();
  infoFormRoomNumber.addEventListener('change', validateRooms);
  infoFormCapacity.addEventListener('change', validateRooms);
  // infoFormTitle.addEventListener('input', validateTitle);
})();
