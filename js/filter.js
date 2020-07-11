'use strict';

(function () {
  var formFilters = document.querySelector('.map__filters');
  var formFilterType = formFilters.querySelector('#housing-type');
  var formFilterPrice = formFilters.querySelector('#housing-price');
  var formFilterRooms = formFilters.querySelector('#housing-rooms');
  var formFilterGuests = formFilters.querySelector('#housing-guests');

  var formFeaturesList = [];
  var anyValue = 'any';
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;

  var getFilterParams = function (data) {
    var filteredCards = [];
    var typeValue = formFilterType.value;
    var priceValue = formFilterPrice.value;
    var roomsValue = Number(formFilterRooms.value);
    var guestsValue = Number(formFilterGuests.value);
    var formFilterFeatures = formFilters.querySelectorAll('#housing-features input:checked');
    var formFlagFeatures = false;

    for (var i = 0; i < data.length; i++) {
      if (typeValue !== anyValue) {
        if (typeValue !== data[i].offer.type) {
          continue;
        }
      }

      if (priceValue !== anyValue) {
        var price = data[i].offer.price;
        if (price <= PRICE_LOW) {
          price = 'low';
        } else if (price >= PRICE_HIGH) {
          price = 'high';
        } else {
          price = 'middle';
        }
        if (priceValue !== price) {
          continue;
        }
      }

      if (roomsValue !== anyValue && !isNaN(roomsValue)) {
        if (roomsValue !== data[i].offer.rooms) {
          continue;
        }
      }

      if (guestsValue !== anyValue && !isNaN(guestsValue)) {
        if (guestsValue !== data[i].offer.guests) {
          continue;
        }
      }

      if (formFilterFeatures.length > 0) {
        for (var j = 0; j < formFilterFeatures.length; j++) {
          console.log(111, data[i].offer.features);
          console.log(222, formFilterFeatures[j].value);
          if (data[i].offer.features.indexOf(formFilterFeatures[j].value) === -1) {
            formFlagFeatures = true;
          }
        }
        if(formFlagFeatures === true) {
          continue;
        }
      }


      filteredCards.push(data[i]);

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

    /*  var uniqueCards = filteredCards.filter(function (it, i) {
      return filteredCards.indexOf(it) === i;
    });*/

    console.log(9999999, filteredCards);
    return filteredCards;
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
