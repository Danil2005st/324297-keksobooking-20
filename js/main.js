'use strict';
var Y_MIN = 130;
var Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_ARROW_HEIGHT = 22;


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

var getRandomInteger = function (min, max) {
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

var getCardType = function (item) {
  switch (item) {
    case 'flat': return 'Квартира';
    case 'bungalo': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
  }
};

var getCardFeaturese = function (items) {
  var featuresList = document.createDocumentFragment();

  for (var i = 0; i < items.length; i++) {
    var featuresListItem = document.createElement('li');
    featuresListItem.classList.add('popup__feature');
    featuresListItem.classList.add('popup__feature--' + items[i]);
    featuresList.appendChild(featuresListItem);
  }

  return featuresList;
};

var getCardPhotos = function (photosData, photo) {
  var photosList = document.createDocumentFragment();

  for (var i = 0; i < photosData.length; i++) {
    var cardPhoto = photo.cloneNode(true);
    cardPhoto.src = photosData[i];
    photosList.appendChild(cardPhoto);
  }
  return photosList;
};

var getCardInfo = function (item) {
  var newCard = mapCard.cloneNode(true);
  var cardTitle = newCard.querySelector('.popup__title');
  var cardAddress = newCard.querySelector('.popup__text--address');
  var cardPrice = newCard.querySelector('.popup__text--price');
  var cardType = newCard.querySelector('.popup__type');
  var cardCapacity = newCard.querySelector('.popup__text--capacity');
  var cardCheckTime = newCard.querySelector('.popup__text--time');
  var cardFeaturese = newCard.querySelector('.popup__features');
  var cardDescription = newCard.querySelector('.popup__description');
  var cardPhotos = newCard.querySelector('.popup__photos');
  var cardPhoto = cardPhotos.querySelector('img');
  var avatarPhoto = newCard.querySelector('.popup__avatar');

  if (item.offer.title.length !== null) {
    cardTitle.textContent = item.offer.title;
  } else {
    cardTitle.classList.add('visually-hidden');
  }

  if (item.offer.address.length !== null) {
    cardAddress.textContent = item.offer.address;
  } else {
    cardAddress.classList.add('visually-hidden');
  }

  if (item.offer.price !== null) {
    cardPrice.textContent = item.offer.price + '₽/ночь';
  } else {
    cardPrice.classList.add('visually-hidden');
  }

  if (item.offer.type !== null) {
    cardType.textContent = getCardType(item.offer.type);
  } else {
    cardType.add('visually-hidden');
  }

  if (item.offer.rooms !== null || item.offer.guests !== null) {
    cardCapacity.textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
  } else {
    cardCapacity.add('visually-hidden');
  }

  if (item.offer.checkin !== null || item.offer.checkout !== null) {
    cardCheckTime.textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  } else {
    cardCheckTime.add('visually-hidden');
  }

  if (item.offer.features !== null) {
    cardFeaturese.textContent = '';
    cardFeaturese.appendChild(getCardFeaturese(item.offer.features));
  } else {
    cardFeaturese.add('visually-hidden');
  }

  if (item.offer.description !== null) {
    cardPhotos.textContent = '';
    cardPhotos.appendChild(getCardPhotos(item.offer.photos, cardPhoto));
  } else {
    cardPhotos.add('visually-hidden');
  }

  if (item.offer.description !== null) {
    cardDescription.textContent = item.offer.description;
  } else {
    cardDescription.add('visually-hidden');
  }

  if (item.author.avatar !== null) {
    avatarPhoto.src = item.author.avatar;
  } else {
    avatarPhoto.add('visually-hidden');
  }
  return newCard;
};

var insertCardInfo = function (firstCardInfo) {
  mapFilters.before(getCardInfo(firstCardInfo));
};

var pinsData = createData();
var firstCardInfo = pinsData[0];

var createPinElement = function (pin) {
  var newPin = mapPin.cloneNode(true);
  var img = newPin.querySelector('img');
  newPin.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
  newPin.style.top = pin.location.y - PIN_HEIGHT + 'px';
  img.src = pin.author.avatar;
  img.alt = pin.offer.title;
  return newPin;
};

var insertPins = function (pins) {
  var pinsList = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    pinsList.appendChild(createPinElement(pins[i]));
  }

  mapPins.appendChild(pinsList);
};


//getCardInfo(firstCardInfo);
//insertCardInfo(firstCardInfo);


var infoForm = document.querySelector('.ad-form');
var infoFormBlocks = infoForm.querySelectorAll('fieldset');
var infoFormAddress = infoForm.querySelector('#address');
var mapForm = document.querySelector('.map__filters');
var mapFormSelects = mapForm.querySelectorAll('select');
var mapFormBlocks = mapForm.querySelectorAll('fieldset');
var mainMapPin = document.querySelector('.map__pin--main');

var putDisabled = function(elements){
  elements.forEach(element => {
    element.setAttribute("disabled", "");
  });
}

var removeDisabled = function(elements){
  elements.forEach(element => {
    element.removeAttribute("disabled");
  });
}

putDisabled(infoFormBlocks);
putDisabled(mapFormSelects);
putDisabled(mapFormBlocks);

var getСoordinatesMainPin = function(pin,isPageActive){
  var top = pin.style.top.replace('px', '');
  var left = pin.style.left.replace('px', '');
  if(isPageActive) {
    var mainPinСoordinates = Math.ceil(left - MAIN_PIN_WIDTH/2) + ', ' + Math.ceil(top - MAIN_PIN_HEIGHT - MAIN_PIN_ARROW_HEIGHT );
  } else {
    var mainPinСoordinates = Math.ceil(left - MAIN_PIN_WIDTH/2) + ', ' + Math.ceil(top - MAIN_PIN_HEIGHT/2 );
  }
  return (mainPinСoordinates);
}

infoFormAddress.value = getСoordinatesMainPin(mainMapPin, false);

var activatePage = function(evt) {
  if(evt.button === 0 ||  evt.key === 'Enter'){
    removeDisabled(infoFormBlocks);
    removeDisabled(mapFormSelects);
    removeDisabled(mapFormBlocks);
    insertPins(pinsData);
    map.classList.remove('map--faded');
    infoForm.classList.remove('ad-form--disabled');
    infoFormAddress.value = getСoordinatesMainPin(mainMapPin, true);

    mainMapPin.removeEventListener('mousedown', activatePage);
    mainMapPin.removeEventListener('keydown', activatePage);
  }
}

mainMapPin.addEventListener('mousedown', activatePage);
mainMapPin.addEventListener('keydown', activatePage);
