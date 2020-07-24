'use strict';

(function () {
  var ANY_VALUE = 'any';
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;

  var formFilters = document.querySelector('.map__filters');
  var formFilterType = formFilters.querySelector('#housing-type');
  var formFilterPrice = formFilters.querySelector('#housing-price');
  var formFilterRooms = formFilters.querySelector('#housing-rooms');
  var formFilterGuests = formFilters.querySelector('#housing-guests');

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

      if (typeValue !== ANY_VALUE && typeValue !== offer.type) {
        continue;
      }

      var checkPrice = false;
      switch (priceValue) {
        case 'any':
          checkPrice = true;
          break;
        case 'low':
          checkPrice = offer.price <= PRICE_LOW;
          break;
        case 'high':
          checkPrice = offer.price >= PRICE_HIGH;
          break;
        case 'middle':
          checkPrice = PRICE_LOW < offer.price && offer.price < PRICE_HIGH;
          break;
      }
      if (!checkPrice) {
        continue;
      }

      if (roomsValue !== ANY_VALUE && !isNaN(roomsValue) && roomsValue !== offer.rooms) {
        continue;
      }

      if (ANY_VALUE !== guestsValue && !isNaN(guestsValue) && guestsValue !== offer.guests) {
        continue;
      }

      if (formFilterFeatures.length > 0) {
        formFilterFeatures.forEach(function (item) {
          if (offer.features.indexOf(item.value) === -1) {
            formFlagFeatures = true;
          }
        });
      }

      if (formFlagFeatures) {
        continue;
      }

      filteredCards.push(data[i]);
    }

    return filteredCards;
  };

  var onChange = function (data) {
    formFilters.addEventListener('change', window.debounce(function () {
      window.pins.remove();
      window.card.close();
      window.map.cretePins(getFilterParams(data));
    }));
  };

  window.filter = {
    change: onChange
  };
})();
