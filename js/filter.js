'use strict';

(function () {
  var formFilters = document.querySelector('.map__filters');
  var formFilterType = formFilters.querySelector('#housing-type');
  var formFilterPrice = formFilters.querySelector('#housing-price');
  var formFilterRooms = formFilters.querySelector('#housing-rooms');
  var formFilterGuests = formFilters.querySelector('#housing-guests');
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

    for (var i = 0; i < data.length; i++) {
      var offer = data[i].offer;
      var formFlagFeatures = false;

      if (typeValue !== anyValue && typeValue !== offer.type) {
        continue;
      }

      if (priceValue !== anyValue) {
        var price = offer.price;
        switch (true) {
          case (price <= PRICE_LOW):
            price = 'low';
            break;
          case (price >= PRICE_HIGH):
            price = 'high';
            break;
          default:
            price = 'middle';
        }

        if (priceValue !== price) {
          continue;
        }
      }

      if (roomsValue !== anyValue && !isNaN(roomsValue) && roomsValue !== offer.rooms) {
        continue;
      }

      if (guestsValue !== anyValue && !isNaN(guestsValue) && guestsValue !== offer.guests) {
        continue;
      }

      if (formFilterFeatures.length > 0) {
        for (var j = 0; j < formFilterFeatures.length; j++) {
          if (offer.features.indexOf(formFilterFeatures[j].value) === -1) {
            formFlagFeatures = true;
          }
        }
      }

      if (formFlagFeatures) {
        continue;
      }

      filteredCards.push(data[i]);
    }

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
