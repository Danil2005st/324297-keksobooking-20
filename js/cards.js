'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters-container');
  var mapCard = document.querySelector('#card').content.querySelector('.map__card');

  var getCardType = function (item) {
    var typeRoom;
    switch (item) {
      case 'flat':
        typeRoom = 'Квартира';
        break;
      case 'bungalo':
        typeRoom = 'Бунгало';
        break;
      case 'house':
        typeRoom = 'Дом';
        break;
      case 'palace':
        typeRoom = 'Дворец';
        break;
    }
    return typeRoom;
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

  var createElement = function (item) {
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

    if (item.offer.title) {
      cardTitle.textContent = item.offer.title;
    } else {
      cardTitle.classList.add('visually-hidden');
    }

    if (item.offer.address) {
      cardAddress.textContent = item.offer.address;
    } else {
      cardAddress.classList.add('visually-hidden');
    }

    if (item.offer.price) {
      cardPrice.textContent = item.offer.price + '₽/ночь';
    } else {
      cardPrice.classList.add('visually-hidden');
    }

    if (item.offer.type) {
      cardType.textContent = getCardType(item.offer.type);
    } else {
      cardType.classList.add('visually-hidden');
    }

    if (item.offer.rooms !== 0 || item.offer.guests !== 0) {
      cardCapacity.textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    } else {
      cardCapacity.classList.add('visually-hidden');
    }

    if (item.offer.checkin || item.offer.checkout) {
      cardCheckTime.textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    } else {
      cardCheckTime.classList.add('visually-hidden');
    }

    if (item.offer.features) {
      cardFeaturese.textContent = '';
      cardFeaturese.appendChild(getCardFeaturese(item.offer.features));
    } else {
      cardFeaturese.classList.add('visually-hidden');
    }

    if (item.offer.photos) {
      cardPhotos.textContent = '';
      cardPhotos.appendChild(getCardPhotos(item.offer.photos, cardPhoto));
    } else {
      cardPhotos.classList.add('visually-hidden');
    }

    if (item.offer.description) {
      cardDescription.textContent = item.offer.description;
    } else {
      cardDescription.classList.add('visually-hidden');
    }

    if (item.author.avatar) {
      avatarPhoto.src = item.author.avatar;
    } else {
      avatarPhoto.classList.add('visually-hidden');
    }
    return newCard;
  };

  var onEscPress = function () {
    close();
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
