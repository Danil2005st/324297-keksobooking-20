'use strict';

(function () {
  var HIDDEN_CLASS = 'visually-hidden';
  var KEY_CODE_ESCAPE = 'Escape';
  var TypeRoom = {
    BUNGALO: 'Бунгало',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters-container');
  var mapCard = document.querySelector('#card').content.querySelector('.map__card');

  var getCardType = function (item) {
    var value = item.toUpperCase();
    var typeRoom = TypeRoom[value];

    return typeRoom;
  };

  var getCardFeatures = function (items) {
    var featuresList = document.createDocumentFragment();
    items.forEach(function (item) {
      var featuresListItem = document.createElement('li');
      featuresListItem.classList.add('popup__feature');
      featuresListItem.classList.add('popup__feature--' + item);
      featuresList.appendChild(featuresListItem);
    });
    return featuresList;
  };

  var getCardPhotos = function (photosData, photo) {
    var photosList = document.createDocumentFragment();

    photosData.forEach(function (item) {
      var cardPhoto = photo.cloneNode(true);
      cardPhoto.src = item;
      photosList.appendChild(cardPhoto);
    });
    return photosList;
  };

  var createElement = function (item) {
    var newCard = mapCard.cloneNode(true);
    var cardTitle = newCard.querySelector('.popup__title');
    var cardAddress = newCard.querySelector('.popup__text--address');
    var cardPrice = newCard.querySelector('.popup__text--price');
    var cardType = newCard.querySelector('.popup__type');
    var cardCapacity = newCard.querySelector('.popup__text--capacity');
    var cardCheckTime = newCard.querySelector('.popup__text--time');
    var cardFeatures = newCard.querySelector('.popup__features');
    var cardDescription = newCard.querySelector('.popup__description');
    var cardPhotos = newCard.querySelector('.popup__photos');
    var cardPhoto = cardPhotos.querySelector('img');
    var avatarPhoto = newCard.querySelector('.popup__avatar');

    if (item.offer.title) {
      cardTitle.textContent = item.offer.title;
    } else {
      cardTitle.classList.add(HIDDEN_CLASS);
    }

    if (item.offer.address) {
      cardAddress.textContent = item.offer.address;
    } else {
      cardAddress.classList.add(HIDDEN_CLASS);
    }

    if (item.offer.price) {
      cardPrice.textContent = item.offer.price + '₽/ночь';
    } else {
      cardPrice.classList.add(HIDDEN_CLASS);
    }

    if (item.offer.type) {
      cardType.textContent = getCardType(item.offer.type);
    } else {
      cardType.classList.add(HIDDEN_CLASS);
    }

    if (item.offer.rooms !== 0 || item.offer.guests !== 0) {
      cardCapacity.textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    } else {
      cardCapacity.classList.add(HIDDEN_CLASS);
    }

    if (item.offer.checkin || item.offer.checkout) {
      cardCheckTime.textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    } else {
      cardCheckTime.classList.add(HIDDEN_CLASS);
    }

    if (item.offer.features) {
      cardFeatures.textContent = '';
      cardFeatures.appendChild(getCardFeatures(item.offer.features));
    } else {
      cardFeatures.classList.add(HIDDEN_CLASS);
    }

    if (item.offer.photos) {
      cardPhotos.textContent = '';
      cardPhotos.appendChild(getCardPhotos(item.offer.photos, cardPhoto));
    } else {
      cardPhotos.classList.add(HIDDEN_CLASS);
    }

    if (item.offer.description) {
      cardDescription.textContent = item.offer.description;
    } else {
      cardDescription.classList.add(HIDDEN_CLASS);
    }

    if (item.author.avatar) {
      avatarPhoto.src = item.author.avatar;
    } else {
      avatarPhoto.classList.add(HIDDEN_CLASS);
    }
    return newCard;
  };

  var onEscPress = function (evt) {
    if (evt.key === KEY_CODE_ESCAPE) {
      close();
    }
  };

  var open = function (data) {
    var cardElement = createElement(data);
    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      close();
    });
    close();
    mapFilters.before(cardElement);
    document.addEventListener('keydown', onEscPress);
  };

  var close = function () {
    var element = document.querySelector('.map__card');
    if (element) {
      element.remove();
    }

    document.removeEventListener('keydown', onEscPress);
  };

  window.card = {
    open: open,
    close: close
  };
})();
