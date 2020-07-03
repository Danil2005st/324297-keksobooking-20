'use strict';

(function () {
  var formFilters = document.querySelector('.map__filters');


  var getFilterParams = function (data) {
    var formFilterType = formFilters.querySelector('#housing-type').value;
    var formFilterPrice = formFilters.querySelector('#housing-price').value;
    var formFilterRooms = formFilters.querySelector('#housing-rooms').value;
    var formFilterGuests = formFilters.querySelector('#housing-guests').value;
    var formFilterFeatures = formFilters.querySelectorAll('#housing-features input:checked');
    var formFeaturesList = [];

    var PRICE_LOW = 10000;
    var PRICE_HIGH = 50000;
    var filteredCards = [];


    if (formFilterType !== 'any') {
      var sameTypeCards = data.filter(function (it) {
        return it.offer.type === formFilterType;
      });
      filteredCards = filteredCards.concat(sameTypeCards);
    }

    if (formFilterPrice !== 'any') {
      var samePriceCards = data.filter(function (it) {
        var price = '';

        if (it.offer.price <= PRICE_LOW) {
          price = 'low';
        } else if (it.offer.price >= PRICE_HIGH) {
          price = 'high';
        } else {
          price = 'middle';
        }

        return formFilterPrice === price;
      });

      filteredCards = filteredCards.concat(samePriceCards);
    }

    if (formFilterRooms !== 'any') {
      var sameRoomsCards = data.filter(function (it) {
        return it.offer.rooms === Number(formFilterRooms);
      });
      filteredCards = filteredCards.concat(sameRoomsCards);
    }

    if (formFilterGuests !== 'any') {
      var sameGuestsCards = data.filter(function (it) {
        return it.offer.guests === Number(formFilterGuests);
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
    }

    var uniqueCards = filteredCards.filter(function (it, i) {
      return filteredCards.indexOf(it) === i;
    });

    return uniqueCards;
  };

  window.filter = {
    onFilterChange: function (data) {
      formFilters.addEventListener('change', function () {
        window.pins.remove();
        window.card.close();
        window.createMapPins(getFilterParams(data));
      });
    }
  };
})();
