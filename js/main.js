'use strict';
var Y_MIN = 130;
var Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
map.classList.remove('map--faded');

function getRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

var createData = function () {
  var data = [];

  for (var i = 1; i <= 8; i++) {
    var obj = {};
    var authorObj = {};
    var offerObj = {};
    var locationObj = {};

    authorObj.avatar = 'img/avatars/user0' + i + '.png';
    locationObj.x = getRandomInteger(0, map.offsetWidth);
    locationObj.y = getRandomInteger(Y_MIN, Y_MAX);
    offerObj.title = 'заголовок предложения' + i;
    offerObj.address = locationObj.x + ' , ' + locationObj.y;
    offerObj.price = Math.ceil(Math.random() * i * 100);
    offerObj.type = types[Math.ceil(i % types.length)];
    offerObj.rooms = Math.ceil(Math.random() * i * 2);
    offerObj.guests = Math.ceil(Math.random() * i * 4);
    offerObj.checkin = checkinTimes[Math.ceil(i % checkinTimes.length)];
    offerObj.checkout = checkoutTimes[Math.ceil(i % checkoutTimes.length)];
    offerObj.features = features.slice(0, Math.ceil(Math.random() * features.length));
    offerObj.description = 'строка с описанием' + i;
    offerObj.photos = photos.slice(0, Math.ceil(Math.random() * photos.length));
    obj.author = authorObj;
    obj.offer = offerObj;
    obj.location = locationObj;
    data.push(obj);
  }
  return data;
};
var pinsData = createData();

var createPin = function (pin) {
  var newPin = mapPin.cloneNode(true);
  var img = newPin.querySelector('img');
  newPin.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
  newPin.style.top = pin.location.y - PIN_HEIGHT + 'px';
  img.src = pin.author.avatar;
  img.alt = pin.offer.title;
  return newPin;
};

var insertPinList = function (pins) {
  var pinsList = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    pinsList.appendChild(createPin(pins[i]));
  }

  mapPins.appendChild(pinsList);
};

insertPinList(pinsData);
