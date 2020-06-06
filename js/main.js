'use strict';
var Y_MIN = 130;
var Y_MAX = 630;
var map = document.querySelector('.map');
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
map.classList.remove('map--faded');

function randomInteger(min, max) {
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
    locationObj.x = randomInteger(0, map.offsetWidth);
    locationObj.y = randomInteger(Y_MIN, Y_MAX);
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

for (var i = 0; i < 8; i++) {
  var newPin = mapPin.cloneNode(true);
  newPin.style.left = 0 + 'px';
  newPin.style.top = 0 + 'px';

  map.appendChild(newPin);
}
