'use strict';
var Y_MIN = 130;
var Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mapFilters = map.querySelector('.map__filters-container');
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCard = document.querySelector('#card').content.querySelector('.map__card');


var getRandomInteger = function(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

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
    offerObj.checkout = checkoutTimes[Math.ceil(i - 1 % checkoutTimes.length)];
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

var firstCardInfo = pinsData[0];

var getCardType = function(item) {
  var message = '';
  if(item === 'flat') {
    message = 'Квартира';
  } else if(item === 'bungalo') {
    message = 'Бунгало';
  } else if(item === 'house') {
    message = 'Дом';
  } else if(item === 'palace') {
    message = 'Дворец';
  }
  return message;
};

var getCardFeaturese = function(items) {
  var featuresList = document.createDocumentFragment();

  for(var i=0; i<items.length;i++) {
    var featuresListItem = document.createElement('li');
    featuresListItem.classList.add('popup__feature');
    featuresListItem.classList.add('popup__feature--' + items[i]);
    featuresList.appendChild(featuresListItem);
  }

  console.log(featuresList);

  return featuresList;
};

var getCardInfo = function(item) {
  var newCard = mapCard.cloneNode(true);
  var cardTitle = newCard.querySelector('.popup__title');
  var cardAddress = newCard.querySelector('.popup__text--address');
  var cardPrice = newCard.querySelector('.popup__text--price');
  var cardType = newCard.querySelector('.popup__type');
  var cardCapacity = newCard.querySelector('.popup__text--capacity');
  var cardCheckTime = newCard.querySelector('.popup__text--time');
  var cardFeaturese = newCard.querySelector('.popup__features');







  cardTitle.textContent = item.offer.title;
  cardAddress.textContent = item.offer.address;
  cardPrice.textContent = item.offer.price + '₽/ночь';
  cardType.textContent = getCardType(item.offer.type);
  cardCapacity.textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
  cardCheckTime.textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  cardFeaturese.appendChild(getCardFeaturese(item.offer.features));



  mapFilters.before(newCard);
};



getCardInfo(firstCardInfo);

map.classList.remove('map--faded');

for (var i = 0; i < pinsData.length; i++) {
  var newPin = mapPin.cloneNode(true);
  var img = newPin.querySelector('img');
  newPin.style.left = pinsData[i].location.x - PIN_WIDTH / 2 + 'px';
  newPin.style.top = pinsData[i].location.y - PIN_HEIGHT + 'px';
  img.src = pinsData[i].author.avatar;
  img.alt = pinsData[i].offer.title;
  mapPins.appendChild(newPin);
}
