'use strict';

(function () {
  var formFilters = document.querySelector('.map__filters');
  var formFilterType = formFilters.querySelector('#housing-type');
  var formFilterPrice = formFilters.querySelector('#housing-price');
  var formFilterRooms = formFilters.querySelector('#housing-rooms');
  var formFilterGuests = formFilters.querySelector('#housing-guests');

  var formFeaturesList = [];
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;
  var filteredCards = [];

  var getFilterParams = function (data) {
    var typeValue = formFilterType.value;
    var priceValue = formFilterPrice.value;
    var roomsValue = formFilterRooms.value;
    var guestsValue = formFilterGuests.value;
    var formFilterFeatures = formFilters.querySelectorAll('#housing-features input:checked');

    for (var i = 0; i < data.length; i++) {
      if (it.offer.type === typeValue) {
        filteredCards = filteredCards.concat(data[i]);
      }
      formFeaturesList = formFeaturesList.concat(data[i]);
      console.log(222, formFeaturesList);

      if (priceValue === 'any') {
        continue;
      }
      formFeaturesList = formFeaturesList.concat(data[i]);
      console.log(111, formFeaturesList);
    }

    /* if (typeValue !== 'any') {
      var sameTypeCards = data.filter(function (it) {
        return it.offer.type === typeValue;
      });
      filteredCards = filteredCards.concat(sameTypeCards);
    }

    if (priceValue !== 'any') {
      var samePriceCards = data.filter(function (it) {
        var price = '';

        if (it.offer.price <= PRICE_LOW) {
          price = 'low';
        } else if (it.offer.price >= PRICE_HIGH) {
          price = 'high';
        } else {
          price = 'middle';
        }

        return priceValue === price;
      });

      filteredCards = filteredCards.concat(samePriceCards);
    }

    if (roomsValue !== 'any') {
      var sameRoomsCards = data.filter(function (it) {
        return it.offer.rooms === Number(roomsValue);
      });
      filteredCards = filteredCards.concat(sameRoomsCards);
    }

    if (guestsValue !== 'any') {
      var sameGuestsCards = data.filter(function (it) {
        return it.offer.guests === Number(guestsValue);
      });
      filteredCards = filteredCards.concat(sameGuestsCards);
    }

    if (formFilterFeatures.length > 0) {
      formFilterFeatures.forEach(function (item) {
        var sameFeaturesCards = data.filter(function (it) {
          return it.offer.features.indexOf(item.value) !== -1;
        });

        formFeaturesList = formFeaturesList.concat(sameFeaturesCards);

        var featuresList = formFeaturesList.filter(function (it, i) {
          return formFeaturesList.indexOf(it) === i;
        });

        filteredCards = filteredCards.concat(featuresList);
      });
    }*/

    var uniqueCards = filteredCards.filter(function (it, i) {
      return filteredCards.indexOf(it) === i;
    });

    return uniqueCards;
  };

  var onFilterChange = function (data) {
    formFilters.addEventListener('change', window.debounce(function () {
      window.pins.remove();
      window.card.close();
      window.createMapPins(getFilterParams(data));
    }));
  };

  window.filter = {
    onFilterChange: onFilterChange
  };
})();
