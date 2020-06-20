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

  window.insertCards = function (data) {
    mapFilters.before(getCardInfo(data));
  };
})();
